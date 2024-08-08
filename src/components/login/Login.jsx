import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice.js";
import { Button, Input, Logo } from "../index.js";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth.js";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import conf from "../../conf/conf.js";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlelogin = async (data) => {
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("Could not login user. Error: ", error.message);
      toast.error("Could not login user.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-black h-[70vh] px-4">
      <Toaster richColors position="bottom-right" />
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 md:border md:border-zinc-200 md:shadow-lg md:shadow-zinc-600`}
      >
        <div className="mb-2 flex justify-center">
          <div className="w-full flex justify-center">
            <img src={conf.scribblrLogo} alt="scribblr-logo" className="w-12" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-zinc-500">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <form onSubmit={handleSubmit(handlelogin)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-700 mt-1 text-sm">Email is required.</p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-700 mt-1 text-sm">Password is required.</p>
            )}
            <Button
              type="submit"
              className="w-full hover:bg-zinc-200 hover:text-zinc-900 hover:font-semibold duration-200"
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
