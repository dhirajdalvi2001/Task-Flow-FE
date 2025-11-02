import { z } from "zod";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  cpassword: "",
};

const validationSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9]+$/, { message: "Invalid username" }),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    cpassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  });

export { initialValues, validationSchema };
