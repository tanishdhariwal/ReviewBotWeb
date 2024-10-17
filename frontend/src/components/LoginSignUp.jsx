import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { SignUpUser, LoginUser } from "../Helpers/apiComms";
import { useAuth } from "../Context/AuthContext";

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
    const payload = { email, password, username };
    console.log(payload);
    try {
      if (!isSignin) {
        try {
          const Loginpayload = {"email":email,"password":password};
          await auth.login(Loginpayload);
        } catch (error) {
          console.error("Login failed:", error);
          alert("Login failed. Please check your credentials and try again.");
        }
      } else {
        try {
          const data = await SignUpUser(payload);
            alert("Sign up successful! Please log in.");
            setisSignin(false);
            navigate("/login");
          
        } catch (error) {
          console.error("Sign up failed:", error);
          alert("Sign up failed. Please try again.");
        }
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleForm = () => setisSignin(!isSignin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-12"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] px-4 sm:px-0"
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-xl">
          <CardHeader
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-purple-600 to-blue-500"
          >
            <Typography variant="h3" color="white">
              {isSignin ? "Join Us" : "Welcome Back"}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {isSignin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      type="text"
                      label="Name"
                      size="lg"
                      value={username}
                      onChange={(e) => setuserName(e.target.value)}
                      icon={<FaUser className="h-5 w-5 text-blue-gray-300" />}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Input
                type="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<FaEnvelope className="h-5 w-5 text-blue-gray-300" />}
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <div
                    className="absolute inset-y-0 right-8 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-blue-gray-300" />
                    ) : (
                      <FaEye className="h-5 w-5 text-blue-gray-300" />
                    )}
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-blue-gray-300" />
                </div>
              </div>
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              {isSignin ? "Sign Up" : "Sign In"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              {isSignin ? "Already have an account?" : "Don't have an account?"}
              <Typography
                as="span"
                variant="small"
                color="blue"
                className="ml-1 font-bold cursor-pointer hover:text-purple-500 transition-colors duration-300"
                onClick={toggleForm}
              >
                {isSignin ? "Sign in" : "Sign up"}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}