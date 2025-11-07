import { protectedAxiosInstance } from "@/hooks/axios";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/lib/types";
import { CommonLoader, TaskCard } from "@/components";

export default function MyTasks() {
  const { data: myTasks, isLoading } = useQuery<Task[]>({
    queryKey: ["get-my-tasks"],
    queryFn: async () => {
      // The axios interceptor already returns response.data, so this returns Task[] directly
      const response = await protectedAxiosInstance.get<Task[]>("/tasks/");
      return response as unknown as Task[];
    },
    gcTime: 1000 * 60 * 10, // 10 minutes - cache time
  });

  const sortedTasks = myTasks?.sort((a: Task, b: Task) => a.sequence - b.sequence);

  return (
    <div className="py-5 sm:py-10 max-w-[90%] xl:max-w-7xl mx-auto">
      <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 [&>*]:mb-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CommonLoader
                key={index}
                className="w-full min-h-32 sm:min-h-48 h-fit rounded-lg sm:rounded-3xl bg-linear-to-br from-tertiary/30 via-50% via-transparent to-tertiary/5"
              />
            ))
          : sortedTasks?.map((task: Task) => (
              <div key={task.id} className="break-inside-avoid">
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  due_date={task.due_date}
                  priority={task.priority}
                  is_check_list={task.is_check_list}
                  is_pinned={task.is_pinned}
                  sequence={task.sequence}
                />
              </div>
            ))}
      </div>
    </div>
  );
  }