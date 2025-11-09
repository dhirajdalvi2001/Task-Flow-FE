import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { protectedAxiosInstance } from "@/hooks/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Task } from "@/lib/types";
import { CommonLoader, TaskCard } from "@/components";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { invalidateQueries } from "@/lib/utils";
import CreateTask from "./components/create-task";
import { getCookie } from "@/lib/cookies";

export default function MyTasks() {
  const accessToken = getCookie("accessToken");
  const [sortedPinnedTasks, setSortedPinnedTasks] = useState<Task[]>([]);
  const [sortedUnpinnedTasks, setSortedUnpinnedTasks] = useState<Task[]>([]);

  const { mutate: changeSequence } = useMutation({
    mutationFn: (data: { id: string; sequence: number }) => {
      return protectedAxiosInstance.post(`/tasks/change-sequence/`, {
        id: data.id,
        sequence: data.sequence,
      });
    },
    onSuccess: () => {
      invalidateQueries(["get-my-tasks"]);
    },
  });

  const { data: myTasks, isLoading } = useQuery<Task[]>({
    queryKey: ["get-my-tasks", accessToken],
    queryFn: async () => {
      // The axios interceptor already returns response.data, so this returns Task[] directly
      const response = await protectedAxiosInstance.get<Task[]>("/tasks/");
      return response as unknown as Task[];
    },
    gcTime: 1000 * 60 * 10, // 10 minutes - cache time
    enabled: !!accessToken,
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // 🧩 Update local state whenever tasks load
  useEffect(() => {
    if (myTasks) {
      const filteredTasksData = myTasks.filter((task) => task.is_pinned);
      const filteredUnpinnedTasksData = myTasks.filter(
        (task) => !task.is_pinned
      );
      const sortedPinnedTasksData = filteredTasksData.sort(
        (a, b) => a.sequence - b.sequence
      );
      const sortedUnpinnedTasksData = filteredUnpinnedTasksData.sort(
        (a, b) => a.sequence - b.sequence
      );
      setSortedPinnedTasks(sortedPinnedTasksData);
      setSortedUnpinnedTasks(sortedUnpinnedTasksData);
    }
  }, [myTasks]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSortedUnpinnedTasks((items) => {
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);

      changeSequence({ id: active.id, sequence: newIndex + 1 });
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="mx-auto max-sm:py-7 w-full max-w-[90%] xl:max-w-7xl flex flex-col gap-4">
      <CreateTask />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedPinnedTasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          <div className="py-5 sm:py-10 w-full mx-auto columns-1 md:columns-2 xl:columns-3 gap-4 [&>*]:mb-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CommonLoader
                    key={index}
                    className="w-full min-h-32 sm:min-h-48 h-fit rounded-lg sm:rounded-3xl bg-linear-to-br from-tertiary/30 via-50% via-transparent to-tertiary/5"
                  />
                ))
              : sortedPinnedTasks?.map((task: Task) => (
                  <div key={task.id} className="break-inside-avoid">
                    <SortableTaskCard task={task} />
                  </div>
                ))}
          </div>
        </SortableContext>
        {sortedPinnedTasks.length > 0 && !isLoading && (
          <hr className="my-4 border-tertiary/50" />
        )}
        <SortableContext
          items={sortedUnpinnedTasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          <div className="py-5 sm:py-10 w-full mx-auto columns-1 md:columns-2 xl:columns-3 gap-4 [&>*]:mb-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CommonLoader
                    key={index}
                    className="w-full min-h-32 sm:min-h-48 h-fit rounded-lg sm:rounded-3xl bg-linear-to-br from-tertiary/30 via-50% via-transparent to-tertiary/5"
                  />
                ))
              : sortedUnpinnedTasks?.map((task: Task) => (
                  <div key={task.id} className="break-inside-avoid">
                    <SortableTaskCard task={task} />
                  </div>
                ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableTaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard {...task} isDragging={isDragging} dragListeners={listeners} />
    </div>
  );
}
