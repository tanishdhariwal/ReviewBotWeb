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
import { SignUpUser } from "../../Helpers/apiComms";
import { useAuth } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function LoginSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSignin, setisSignin] = useState(true);

  const [trail, setTrail] = useState([]);

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

  const handleMouseMove = (e) => {
    setTrail((prevTrail) => [
      ...prevTrail,
      {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 2 + 4, // Random size for the comet particles
        opacity: 1,
        timestamp: Date.now(),
      },
    ]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const interval = setInterval(() => {
      setTrail((prevTrail) =>
        prevTrail.filter((trailItem) => Date.now() - trailItem.timestamp < 800)
      );
    }, 200);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900  to-[#130b48] relative overflow-hidden">
      <Toaster />
      <div className="absolute shadow-lg blur-sm inset-0 backdrop-blur-sm bg-[#0D1117] transform -skew-y-12"></div>

      {/* Comet Trail */}
      {trail.map((particle, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: `${particle.y - particle.size / 2}px`,
            left: `${particle.x - particle.size / 2}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: particle.opacity,
          }}
          animate={{
            opacity: 0,
            y: particle.y - 20, // Fade and move upward
          }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] px-4 sm:px-0"
      >
        <Card className="bg-white/80 z-20 backdrop-blur-md shadow-xl">
          <CardHeader
            color="blue-gray"
            className="mb-4 grid h-28 place-items-center bg-gradient-to-tr from-deep-purple-800 to-blue-800"
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
                      icon={<FaUser className="h-5 w-5 text-blue-gray-900" />}
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
                icon={<FaEnvelope className="h-5 w-5 text-blue-gray-900" />}
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
                      <FaEyeSlash className="h-5 w-5 text-blue-gray-900" />
                    ) : (
                      <FaEye className="h-5 w-5 text-blue-gray-900" />
                    )}
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-blue-gray-900" />
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
              className="bg-gradient-to-r from-deep-purple-800 to-blue-800 hover:from-purple-700 hover:to-blue-600 transition-all ease-in duration-100"
            >
              {isSignin ? "Sign Up" : "Sign In"}
            </Button>
            <Typography variant="small" className="mt-4 text-center">
              {isSignin ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={toggleForm}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={toggleForm}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </Typography>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
