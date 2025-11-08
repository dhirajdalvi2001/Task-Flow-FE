import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {Typography} from "..";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatepickerProps = {
  label?: string;
  required?: boolean;
  parentClassName?: string;
  date?: Date;
  setDate?: (date: Date) => void;
  className?: string;
  id?: string;children?: React.ReactNode;
  error?: string;
  disabled?: boolean;
};

export default function Datepicker({ label, required, parentClassName, className, id = "date", children, date, setDate, error, disabled   }: DatepickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn("", parentClassName)}>
      {label && (
        <Typography
          variant="small"
          htmlFor={id}
          className="block text-white/80"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant={children ? "ghost" : "outline"}
            id={id}
            className={cn(
              "justify-between font-normal border-none",
              !date ? "text-tertiary/50" : "",
              children ? "m-0 p-0" : "w-48",
              className
            )}
            disabled={disabled}
          >
            {children ? (
              children
            ) : (
              <>
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-fit overflow-hidden rounded-lg md:rounded-2xl border-[1px] border-background/50"
          align="start"
        >
          <Calendar
            id={id}
            mode="single"
            selected={date}
            className={cn(
              "bg-linear-to-br from-tertiary/80 via-50% via-tertiary/60 to-tertiary/50 border-background/50 hover:ring-[1px] ring-ring/50 focus-visible:ring-[2px] focus-visible:ring-ring/50 rounded-lg md:rounded-2xl"
            )}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate?.(date as Date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <Typography variant="small" className="absolute text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}
