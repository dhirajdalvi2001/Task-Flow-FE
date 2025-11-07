import type { Task } from "@/lib/types";
import { Badge, EditableInput, Select , Typography } from "..";
import { cn, formatDate, formatFullDate } from "@/lib/utils";
import { ChevronDown, Minus, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { protectedAxiosInstance } from "@/hooks/axios";
import { invalidateQueries } from "@/lib/utils";

export default function TaskCard({ id,title, description, status, due_date, priority }: Task) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [selectedPriority, setSelectedPriority] = useState(priority);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const {mutate: updateTask} = useMutation({
    mutationFn: (data: { status?: string, priority?: string, title?: string, description?: string|null }) => {
      return protectedAxiosInstance.patch(`/tasks/${id}/`, data);
    },
    onSuccess: () => {
      invalidateQueries(["get-my-tasks"]);
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
  

  const priorityIcon = {
    LOW: <ChevronDown className="size-3 sm:size-5 text-yellow-500" />,
    MEDIUM: <Minus className="size-3 sm:size-4 text-amber-200" />,
    HIGH: <ChevronUp className="size-3 sm:size-5 text-orange-600" />,
  };

  // Variables
  const priorityOption = PRIORITY_OPTIONS.find((option) => option.value === priority);
  const priorityTooltipContent = priorityOption ? priorityOption.label : "";  
  const dueDateTooltipContent = `Due date for this Task is ${formatFullDate(due_date)}`;
const statusTooltipContent = `Status for this Task is ${
  status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase()
}`;

  return (
    <div className="min-h-32 sm:min-h-48 h-fit bg-linear-to-br from-tertiary/30 via-80% via-transparent to-tertiary/5 border-2 border-background/50 p-2 sm:p-7 flex flex-col justify-between gap-2 rounded-lg sm:rounded-3xl relative hover:border-tertiary/40 transition-all duration-150 cursor-default">
      <div className="flex justify-between items-start flex-wrap">
        <div className="w-[calc(100%-150px)] flex items-start gap-1 sm:gap-2">
          <Select
            options={PRIORITY_OPTIONS}
            value={selectedPriority}
            onChange={handlePriorityChange}
            tooltipContent={statusTooltipContent}
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

          <EditableInput
            value={title}
            handleSave={(value) => updateTask({ title: value })}
          />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {due_date ? (
            <Badge
              size="sm"
              variant="DUE_DATE"
              tooltipContent={dueDateTooltipContent}
            >
              {formatDate(due_date)}
            </Badge>
          ) : null}
          <Select
            options={STATUS_OPTIONS}
            value={selectedStatus}
            onChange={handleStatusChange}
            tooltipContent={statusTooltipContent}
            isCustomSelector={true}
          >
            <Badge
              variant={selectedStatus ? selectedStatus : ""}
              tooltipContent={
                statusTooltipContent ? statusTooltipContent : undefined
              }
            >
              {selectedStatus ? selectedStatus : ""}
            </Badge>
          </Select>
        </div>
      </div>
      <EditableInput
        value={description?.length > 0 ? description : ""}
        handleSave={(value) =>
          updateTask({ description: value?.length > 0 ? value : null })
        }
        isTextArea={true}
        className={cn(
          "mb-auto text-tertiary/80 overflow-hidden text-ellipsis line-clamp-5 sm:line-clamp-7 text-xs md:text-sm font-normal",
          !description ? "min-h-fit italic text-tertiary/50" : "min-h-[50px]"
        )}
      />
    </div>
  );
}
