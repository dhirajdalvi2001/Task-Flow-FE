import { Button, Datepicker, Input, Popup, Select, Textarea } from '@/components';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validationSchema, initialValues } from '@/validations/create-task-validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PRIORITY_OPTIONS } from '@/lib/constants';
import useMediaQuery from '@/hooks/use-media-query';
import { cn, invalidateQueries } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { protectedAxiosInstance } from '@/hooks/axios';
import { toast } from 'sonner';

export default function CreateTask() {
    const [open, setOpen] = useState(false);
    const { isMobile } = useMediaQuery();

    const { register, handleSubmit, formState: { errors }, watch, setValue, setError, reset } = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: initialValues,
    });

    const {mutate: createTask, isPending} = useMutation({
        mutationFn: (data: z.infer<typeof validationSchema>) => {
            return protectedAxiosInstance.post('/tasks/', data);
        },
        onSuccess: () => {
            invalidateQueries(["get-my-tasks"]);
            toast.success('Task created successfully');
            setOpen(false);
            reset();
        },
        onError: (error: any) => {
            const errors = error.response.data;
            Object.entries(errors).forEach(([key, value]) => {
                setError(key as keyof z.infer<typeof validationSchema>, {
                    message: value as string,
                });
            });
            toast.error('Failed to create task');
        },
    });

    function onSubmit(data: z.infer<typeof validationSchema>) {
    const dateString = data.due_date?.toLocaleDateString("en-CA")?.split("T")[0];
        const payload = {
            ...data,
            due_date: dateString,
        };
        createTask(payload as z.infer<typeof validationSchema>);
    }

    const fieldsDisabled = isPending;   

    return (
      <div className="w-full flex justify-center">
        <Button
          variant="ghost"
          className="mx-auto w-[60%] max-w-[90%] sm:max-w-xl text-background rounded-md sm:rounded-lg bg-linear-to-br from-tertiary/30 to-tertiary/15 border-2 border-background/50"
          onClick={() => setOpen(true)}
          size="icon"
        >
          <Pen className="size-4 text-background" />
          Create a new task
        </Button>
        <Popup title="Create a new task" open={open} onOpenChange={setOpen}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-3", isMobile ? "p-3" : "")}
          >
            <Input
              label="Title"
              id="title"
              type="text"
              placeholder="Title"
              {...register("title")}
              variant="colored"
              error={errors.title?.message}
              disabled={fieldsDisabled}
            />
            <Textarea
              label="Description"
              id="description"
              placeholder="Description"
              {...register("description")}
              className="min-h-[100px]"
              variant="colored"
              error={errors.description?.message}
              disabled={fieldsDisabled}
            />
            <div className="flex items-center gap-3">
              <Datepicker
                label="Due Date"
                id="due_date"
                date={watch("due_date") as Date}
                setDate={(date) => setValue("due_date", date as Date)}
                error={errors.due_date?.message}
                disabled={fieldsDisabled}
              />
              <Select
                label="Priority"
                id="priority"
                options={PRIORITY_OPTIONS}
                value={watch("priority")}
                onChange={(value) =>
                  setValue("priority", value as "LOW" | "MEDIUM" | "HIGH")
                }
                error={errors.priority?.message}
                disabled={fieldsDisabled}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              className="mt-4 w-fit border-none bg-primary text-background"
              disabled={fieldsDisabled}
            >
              Create
            </Button>
          </form>
        </Popup>
      </div>
    );
}
