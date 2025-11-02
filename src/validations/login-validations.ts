import { z } from "zod";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export { initialValues, validationSchema };
