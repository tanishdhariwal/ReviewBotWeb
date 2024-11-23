import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { SignUpUser } from "../../Helpers/apiComms";
import { cn } from "../../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export default function LoginSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSignin, setisSignin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(
      isSignin ? "Signing up..." : "Logging in...",
      { duration: Infinity }
    );
    const payload = { email, password, username };
    console.log(payload);
    try {
      if (!isSignin) {
        const Loginpayload = { email, password };
        const response = await auth.login(Loginpayload);
        if (response.success) {
          toast.dismiss(toastId);
          navigate("/", { state: { successMessage: response.message } });
        } else {
          toast.dismiss(toastId);
          toast.error(response.message);
        }
      } else {
        const response = await SignUpUser(payload);
        toast.dismiss(toastId);
        if (response.success) {
          toast.success("Sign up successful! Please log in.", {
            duration: 4000,
          });
          setisSignin(false);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Login/Sign up failed. Please try again.");
    }
  };

  const toggleForm = () => setisSignin(!isSignin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider} is not implemented yet.`);
  };

  return (
    <div className="bg-black">
      <Toaster />
      <HeroHighlight className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* <motion.div className="w-full max-w-full sm:max-w-lg md:max-w-xl"> */}
          <div className="lg:w-[474px] md:w-[370px] md:rounded-[20px] mx-auto p-4 sm:p-6 md:p-8 shadow-[0px_0px_16px_0px_#ffffff4d] hover:shadow-[0px_0px_24px_0px_#ffffff4d] transition-all ease-in bg-white dark:bg-black">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200">
              {isSignin ? "Join Us" : "Welcome Back"}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg max-w-sm mt-2 dark:text-neutral-300">
              Welcome to EasyPick
            </p>
            <form onSubmit={handleSubmit} className="my-8">
              {isSignin && (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">Username</Label>
                    <Input
                      id="firstname"
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setuserName(e.target.value)}
                    />
                  </LabelInputContainer>
                </div>
              )}
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </LabelInputContainer>
              <div className="flex items-center mb-4">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2 text-neutral-700 dark:text-neutral-300">
                  Remember Me
                </Label>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium"
                type="submit"
                onClick={handleSubmit}
              >
                {isSignin ? "Sign Up" : "Sign In"} &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              {/* <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("GitHub")}
                  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black dark:text-white rounded-md h-10 font-medium"
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                  </span>
                  <BottomGradient />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black dark:text-white rounded-md h-10 font-medium"
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("OnlyFans")}
                  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black dark:text-white rounded-md h-10 font-medium"
                >
                  <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    OnlyFans
                  </span>
                  <BottomGradient />
                </button>
              </div> */}
              <div className="mt-4 text-center">
                <small className="text-neutral-700 dark:text-neutral-300">
                  {isSignin ? (
                    <>
                      Already have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                        Sign In
                      </span>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                        Sign Up
                      </span>
                    </>
                  )}
                </small>
              </div>
            </form>
          </div>
        {/* </motion.div> */}
      </HeroHighlight>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
