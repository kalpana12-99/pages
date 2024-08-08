import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice.js";
import { Button, Input, Logo, Select } from "../index.js";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/auth.js";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import conf from "../../conf/conf.js";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlesignup = async (data) => {
    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("Could not create account. Error: ", error.message);
      toast.error("Could not create account.", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
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
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-zinc-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>

        <form onSubmit={handleSubmit(handlesignup)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <p className="text-red-700 mt-1 text-sm">
                Full mame is required.
              </p>
            )}
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
