import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validationSchema,
  initialValues,
} from "@/validations/login-validations";
import { z } from "zod";
import { Button, Input } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { openAxiosInstance } from "@/hooks/axios";
import { setCookie } from "@/lib/cookies";
import { useSetAtom } from "jotai/react";
import { userDetailsAtom } from "@/lib/global";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const setUserDetails = useSetAtom(userDetailsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const { mutate: login } = useMutation({
    mutationFn: (data: z.infer<typeof validationSchema>) => {
      return openAxiosInstance.post("/iam/login/", data);
    },
    onSuccess: (data) => {
      const response = data.data;
      console.log(
        data,
        response,
        response?.access_token,
        response?.refresh_token,
        " response DD"
      );
      setCookie("accessToken", response?.access, 1);
      setCookie("refreshToken", response?.refresh, 7);
      setUserDetails(response?.user);
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      console.log(error, " error DD");
    },
  });

  function onSubmit(data: z.infer<typeof validationSchema>) {
    login(data);
  }

  const fieldsDisabled = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
      <Button
        type="submit"
        disabled={fieldsDisabled}
        className="mt-3 mx-auto w-32 bg-primary text-background"
      >
        Login
      </Button>
    </form>
  );
}
