import type { Task } from "@/lib/types";
import {
  Badge,
  EditableInput,
  Select,
  Typography,
  Datepicker,
  Button,
} from "..";
import { cn, formatDate, formatFullDate } from "@/lib/utils";
import { ChevronDown, Minus, ChevronUp, Trash, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { protectedAxiosInstance } from "@/hooks/axios";
import { getColorsByDueDate, invalidateQueries } from "@/lib/utils";
import { toast } from "sonner";
import ConfirmationPopover from "../confirmation-popover/confirmation-popover";

export default function TaskCard({
  id,
  title,
  description,
  status,
  due_date,
  priority,
  is_pinned,
  isDragging = false,
  dragListeners,
}: Task & { isDragging?: boolean; dragListeners?: any }) {
  const [dueDate, setDueDate] = useState<Date | undefined>(
    due_date ? new Date(due_date) : undefined
  );
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [selectedPriority, setSelectedPriority] = useState(priority);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const { mutate: updateTask } = useMutation({
    mutationFn: (data: {
      status?: string;
      priority?: string;
      title?: string;
      description?: string | null;
      due_date?: string;
      is_pinned?: boolean;
    }) => {
      return protectedAxiosInstance.patch(`/tasks/${id}/`, data);
    },
    onSuccess: () => {
      invalidateQueries(["get-my-tasks"]);
    },
  });

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => {
      return protectedAxiosInstance.delete(`/tasks/${id}/`);
    },
    onSuccess: () => {
      invalidateQueries(["get-my-tasks"]);
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  function handlePriorityChange(priority: string) {
    updateTask({ priority });
    setSelectedPriority(priority);
  }

  function handleStatusChange(status: string) {
    updateTask({ status });
    setSelectedStatus(status);
  }

  function handleDateChange(date: Date) {
    setDueDate(date);
    const dateString = date.toLocaleDateString("en-CA")?.split("T")[0];
    updateTask({ due_date: dateString });
  }

  const priorityIcon = {
    LOW: <ChevronDown className="size-3 sm:size-5 text-yellow-500" />,
    MEDIUM: <Minus className="size-3 sm:size-4 text-amber-200" />,
    HIGH: <ChevronUp className="size-3 sm:size-5 text-orange-600" />,
  };

  // Variables
  const priorityOption = PRIORITY_OPTIONS.find(
    (option) => option.value === priority
  );
  const priorityTooltipContent = priorityOption ? priorityOption.label : "";
  const dueDateTooltipContent = !due_date
    ? undefined
    : `Due date by ${formatFullDate(due_date)}`;
  const statusTooltipContent = `Task is ${
    status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase()
  }`;
  const statusVariant = selectedStatus
    ? STATUS_OPTIONS.find((option) => option.value === selectedStatus)?.label
    : "";

  return (
    <div
      {...dragListeners}
      className={cn(
        "min-h-32 sm:min-h-48 h-fit bg-linear-to-br from-tertiary/30 via-80% via-transparent to-tertiary/5 border-2 border-background/50 bg-blur-md backdrop-blur-sm2 py-3 px-7 sm:p-7 flex flex-col justify-between gap-2 rounded-lg sm:rounded-3xl relative hover:border-tertiary/10 transition-all duration-150 cursor-grab overflow-hidden group",
        isDragging && "cursor-grabbing"
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 rounded-br-xl md:rounded-br-2xl",
          is_pinned
            ? "bg-tertiary/80 group-hover:bg-tertiary/90 opacity-100"
            : "bg-tertiary/20 group-hover:bg-tertiary/30 opacity-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          className="p-1 h-6 w-6 md:h-8 md:w-8"
          onClick={() => updateTask({ is_pinned: !is_pinned })}
        >
          <Pin className="size-3 text-white" />
        </Button>
      </div>
      <div className="absolute top-0 right-0 bg-red-500/60 rounded-bl-xl md:rounded-bl-2xl">
        <ConfirmationPopover
          trigger={
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              className="p-1 h-6 w-6 md:h-8 md:w-8"
            >
              <Trash className="size-3 text-white" />
            </Button>
          }
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onConfirm={() => deleteTask(id)}
          isLoading={isDeleting}
        />
      </div>
      <div className="flex justify-between items-start flex-wrap">
        <div className="px-1 w-[calc(100%-156px)] flex items-center gap-2">
          <div>
            <Select
              options={PRIORITY_OPTIONS}
              value={selectedPriority}
              onChange={handlePriorityChange}
              tooltipContent={statusTooltipContent}
              className="bg-background/30"
              isCustomSelector={true}
            >
              <Typography
                variant="p"
                className="text-tertiary/80 bg-white/10 rounded-sm sm:rounded-md p-0.5 sm:p-1"
                tooltipContent={priorityTooltipContent}
              >
                {priorityIcon[priority as keyof typeof priorityIcon]}
              </Typography>
            </Select>
          </div>

          <div>
            <EditableInput
              value={title}
              handleSave={(value) => updateTask({ title: value })}
              className="!text-base md:!text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div>
            <Datepicker
              id={`due-date-${id}`}
              date={dueDate}
              setDate={handleDateChange}
            >
              <Badge
                size="sm"
                variant="DUE_DATE"
                tooltipContent={dueDateTooltipContent}
                className={cn("", getColorsByDueDate(due_date))}
              >
                {due_date ? formatDate(due_date) : "Set Due"}
              </Badge>
            </Datepicker>
          </div>
          <div>
            <Select
              options={STATUS_OPTIONS}
              value={selectedStatus}
              onChange={handleStatusChange}
              tooltipContent={statusTooltipContent}
              isCustomSelector={true}
              className="bg-background/70"
            >
              <Badge
                variant={selectedStatus ? selectedStatus : ""}
                tooltipContent={
                  statusTooltipContent ? statusTooltipContent : undefined
                }
              >
                {selectedStatus ? statusVariant : ""}
              </Badge>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <EditableInput
          value={description?.length > 0 ? description : ""}
          handleSave={(value) =>
            updateTask({ description: value?.length > 0 ? value : null })
          }
          isTextArea={true}
          className={cn(
            "mb-auto text-tertiary/80 overflow-hidden text-ellipsis line-clamp-5 sm:line-clamp-7 !text-xs md:!text-sm font-normal",
            !description ? "min-h-fit italic text-tertiary/50" : "min-h-[50px]"
          )}
        />
      </div>
    </div>
  );
}
