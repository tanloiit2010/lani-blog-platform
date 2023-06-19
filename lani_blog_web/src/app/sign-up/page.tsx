"use client";

import Button from "../components/atoms/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../components/form/FormInput";
import { signIn } from "next-auth/react";
import useSignUp, { SignUpParams } from "../hooks/useSignUp";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const schema = yup.object().shape({
    username: yup.string().nullable().required("Please input username"),
    password: yup.string().nullable().required("Please input password"),
    confirmPassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please input confirm password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: yupResolver(schema),
  });

  const { mutate: signUp, isLoading } = useSignUp(
    () => {
      signIn(undefined, { callbackUrl: "/" });
      toast.success("Sign up successfully");
    },
    () => {
      toast.error("Something went wrong while signing up");
    }
  );

  const onSubmit = (values: SignUpParams) => signUp(values);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="User Name"
            name="username"
            control={control}
            error={errors.username}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            control={control}
            error={errors.password}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            control={control}
            error={errors.confirmPassword}
          />
          <div>
            <Button type="submit" className="!w-full" loading={isLoading}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
