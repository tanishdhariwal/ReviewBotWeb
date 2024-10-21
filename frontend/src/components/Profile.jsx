import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Textarea,
} from "@material-tailwind/react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaQuestionCircle,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openAccordion, setOpenAccordion] = useState(0);
  const auth = useAuth();
  const [username, setUsername] = useState(auth.user.username);

  const handleOpenAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  const handleAvatarChange = (e) => {
    console.log("Avatar changed:", e.target.files?.[0]);
  };

  const handlePasswordChange = () => {
    console.log("Password changed");
    setPassword("");
    setNewPassword("");
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  const handleLogout = () => {
    console.log("User logged out");
    toast.success("Logout successful!", {
      duration: 2000,
      style: { background: "green", color: "white", zIndex: 1 },
    });
    auth.logout();
    // Implement logout logic here
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto space-y-8"
      >
        <motion.div
          {...fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="md:col-span-1 bg-white/80 backdrop-filter backdrop-blur-lg">
            <CardBody className="flex flex-col items-center space-y-4">
              <Avatar
                size="xxl"
                alt="User Avatar"
                src="/placeholder.svg"
                className="cursor-pointer border-4 border-purple-200 hover:border-purple-300 transition-colors"
                onClick={() => document.getElementById("avatar-input")?.click()}
              />
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <Typography variant="h4" className="text-purple-600">
                {username}
              </Typography>
              <div className="flex items-center space-x-2 border border-purple-200 focus:border-purple-500 p-2 rounded-md">
                <FaUser className="h-5 w-5 text-purple-500" />
                <span>{username}</span>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt className="h-5 w-5" />
                Logout
              </Button>
            </CardBody>
          </Card>

          <Card className="md:col-span-2 bg-white/80 backdrop-filter backdrop-blur-lg">
            <CardBody className="space-y-4">
              <Typography variant="h5" className="text-purple-800">
                Change Password
              </Typography>
              <Input
                type="password"
                label="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<FaLock className="h-5 w-5 text-purple-500" />}
                className="border-purple-200 focus:border-purple-500"
              />
              <Input
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<FaLock className="h-5 w-5 text-purple-500" />}
                className="border-purple-200 focus:border-purple-500"
              />
              <Button
                onClick={handlePasswordChange}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Change Password
              </Button>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className="bg-white/80 backdrop-filter backdrop-blur-lg">
            <CardBody className="space-y-4">
              <Typography variant="h5" className="text-purple-800">
                Feedback
              </Typography>
              <Textarea
                label="Your Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
              <Button
                onClick={handleFeedbackSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Submit Feedback
              </Button>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className="bg-white/80 backdrop-filter backdrop-blur-lg">
            <CardBody>
              <Typography variant="h5" className="mb-4 text-purple-800">
                FAQ
              </Typography>
              <Accordion open={openAccordion === 1}>
                <AccordionHeader
                  onClick={() => handleOpenAccordion(1)}
                  className="text-blue-800 hover:text-blue-900"
                >
                  How do I change my avatar?
                </AccordionHeader>
                <AccordionBody className="text-purple-700">
                  Click on your current avatar image to open the file picker.
                  Select a new image file to update your avatar.
                </AccordionBody>
              </Accordion>
              <Accordion open={openAccordion === 2}>
                <AccordionHeader
                  onClick={() => handleOpenAccordion(2)}
                  className="text-blue-800 hover:text-blue-900"
                >
                  Is my feedback anonymous?
                </AccordionHeader>
                <AccordionBody className="text-purple-700">
                  Your feedback is associated with your account to help us
                  better address your concerns. However, we respect your privacy
                  and handle all feedback confidentially.
                </AccordionBody>
              </Accordion>
              <Accordion open={openAccordion === 3}>
                <AccordionHeader
                  onClick={() => handleOpenAccordion(3)}
                  className="text-blue-800 hover:text-blue-900"
                >
                  How often can I change my password?
                </AccordionHeader>
                <AccordionBody className="text-purple-700">
                  You can change your password as often as you like. We
                  recommend updating your password regularly for security
                  reasons.
                </AccordionBody>
              </Accordion>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
