import { z } from "zod";

const validationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  due_date: z.date().nullable().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  is_check_list: z.boolean(),
});

const initialValues: z.infer<typeof validationSchema> = {
  title: "",
  description: "",
  due_date: null,
  priority: "MEDIUM",
  status: "PENDING",
  is_check_list: false,
};

export { initialValues, validationSchema };
