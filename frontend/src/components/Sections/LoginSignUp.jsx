import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useAuth } from "../../Context/AuthContext";
import { SignUpUser } from "../../Helpers/apiComms";
import { Checkbox } from "../ui/checkbox";
import { HeroHighlight } from "../ui/hero-highlight";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSignin, setisSignin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password, username };
    try {
      if (!isSignin) {
        const Loginpayload = { email, password };
        const response = await auth.login(Loginpayload);
        if (response.success) {
          navigate("/");
        }
      } else {
        const response = await SignUpUser(payload);
        if (response.success) {
          setisSignin(false);

        }
      }
    } catch (error) {
      console.error(error);

    }
  };

  const toggleForm = () => setisSignin(!isSignin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSocialLogin = (provider) => {
    // Removed alert - function is currently unused
  };

  return (
    <div className="bg-black">
      <HeroHighlight className="min-h-screen flex items-center justify-end px-4 sm:px-6 lg:px-8">
        {/* <motion.div className="w-full max-w-full sm:max-w-lg md:max-w-xl"> */}
          <div className="lg:w-[460px] md:w-[370px] md:rounded-[20px] mx-auto p-4 sm:p-6 md:p-8 shadow-[0px_0px_16px_0px_#ffffff4d] hover:shadow-[0px_0px_24px_0px_#ffffff4d] transition-all ease-in bg-black">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-neutral-200">

              {isSignin ? "Join Us" : "Welcome Back"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-sm mt-2 text-slate-300">
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
                      className="text-white bg-[#272729]"
                      value={username}
                      onChange={(e) => setuserName(e.target.value)}
                    />
                  </LabelInputContainer>
                </div>
              )}
              <LabelInputContainer className="mb-4 ">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  className="text-white bg-[#272729]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className=" bg-[#272729] text-white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </LabelInputContainer>
              {/* <div className="flex items-center mb-4">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2 text-neutral-700 dark:text-neutral-300">
                  Remember Me
                </Label>
              </div> */}
              <button
                className="bg-gradient-to-br relative group/btn from-zinc-800 to-black w-full mt-4 text-white rounded-md h-10 font-medium"
                type="submit"
                onClick={handleSubmit}
              >
                {isSignin ? "Sign Up" : "Log in"} &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent  via-neutral-700 to-transparent my-8 h-[1px] w-full" />
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
                 
                  <BottomGradient />
                </button>
              </div> */}
              <div className="mt-4 text-center">
                <small className="text-neutral-300">
                  {isSignin ? (
                    <>
                      Already have an account?{" "}
                      <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
                        Log in
                      </span>
                      <span>
                         {" "+ "here"}
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
