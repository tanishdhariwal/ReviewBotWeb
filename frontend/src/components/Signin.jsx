import { useState } from "react";
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
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function SignInCard({ isLogin, toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    const payload = { email, password, ...(isLogin ? {} : { name }) };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(isLogin ? "Login successful" : "Registration successful", data);
        localStorage.setItem("isAuthenticated", true);
        navigate("/");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-xl">
      <CardHeader
        color="blue-gray"
        className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-purple-600 to-blue-500"
      >
        <Typography variant="h3" color="white">
          {isLogin ? "Welcome Back" : "Join Us"}
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
          <Input
            type="password"
            label="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock className="h-5 w-5 text-blue-gray-300" />}
          />
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
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Typography
            as="span"
            variant="small"
            color="blue"
            className="ml-1 font-bold cursor-pointer hover:text-purple-500 transition-colors duration-300"
            onClick={toggleForm}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}