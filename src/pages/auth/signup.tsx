import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validationSchema,
  initialValues,
} from "@/validations/signup-validations";
import { z } from "zod";
import { Button, Input } from "@/components";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  function onSubmit(data: z.infer<typeof validationSchema>) {
    console.log(data, "data DD");
  }

  const fieldsDisabled = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
      <Input
        label="First Name"
        id="first_name"
        type="text"
        placeholder="First Name"
        {...register("first_name")}
        variant="colored"
        error={errors.first_name?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Input
        label="Last Name"
        id="last_name"
        type="text"
        placeholder="Last Name"
        {...register("last_name")}
        variant="colored"
        error={errors.last_name?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Input
        label="Username"
        id="username"
        type="text"
        placeholder="Username"
        {...register("username")}
        variant="colored"
        error={errors.username?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="Email"
        {...register("email")}
        variant="colored"
        error={errors.email?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="Password"
        {...register("password")}
        variant="colored"
        error={errors.password?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Input
        label="Confirm Password"
        id="cpassword"
        type="password"
        placeholder="Confirm Password"
        {...register("cpassword")}
        variant="colored"
        error={errors.cpassword?.message}
        disabled={fieldsDisabled}
        required={true}
      />
      <Button
        type="submit"
        disabled={fieldsDisabled}
        className="mt-3 mx-auto w-32 col-span-full bg-primary text-background"
      >
        Signup
      </Button>
    </form>
  );
}
