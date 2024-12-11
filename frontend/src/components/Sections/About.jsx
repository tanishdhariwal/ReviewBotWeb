import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

// Team member data
const teamMembers = [
  {
    name: "Bharadwaj Reddy Vancha",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/736x/8d/c8/6f/8dc86f723d091565d49653efebc1af03.jpg",
    github: "https://github.com/alice",
    linkedin: "https://linkedin.com/in/alice",
    instagram: "https://instagram.com/alice",
    twitter: "https://twitter.com/alice",
  },
  {
    name: "Kushal Bang",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/736x/7f/71/c4/7f71c49250176c1bec930f4da0e2055a.jpg",
    github: "https://github.com/bob",
    linkedin: "https://linkedin.com/in/bob",
    instagram: "https://instagram.com/bob",
    twitter: "https://twitter.com/bob",
  },
  {
    name: "Abhinav",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/564x/c4/2b/1f/c42b1f344c9b2e4e6d5580b87860d094.jpg",
    github: "https://github.com/charlie",
    linkedin: "https://linkedin.com/in/charlie",
    instagram: "https://instagram.com/charlie",
    twitter: "https://twitter.com/charlie",
  },
  {
    name: "Tanish Dhariwal",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/736x/a2/5d/7d/a25d7d199534433db30e4bb2c8ddbc4e.jpg",
    github: "https://github.com/diana",
    linkedin: "https://linkedin.com/in/diana",
    instagram: "https://instagram.com/diana",
    twitter: "https://twitter.com/diana",
  },
  {
    name: "Tanay Bansal",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/564x/fc/2a/a3/fc2aa3137772116ce0de5bc67d59b431.jpg",
    github: "https://github.com/ethan",
    linkedin: "https://linkedin.com/in/ethan",
    instagram: "https://instagram.com/ethan",
    twitter: "https://twitter.com/ethan",
  },
  {
    name: "Gaurav Jain",
    description: "Full-stack developer with a passion for React and Node.js",
    image:
      "https://i.pinimg.com/736x/e0/6a/61/e06a61c28e68cfebecffd2ee5d3d7614.jpg",
    github: "https://github.com/fiona",
    linkedin: "https://linkedin.com/in/fiona",
    instagram: "https://instagram.com/fiona",
    twitter: "https://twitter.com/fiona",
  },
];

const MemberCard = ({ member }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-slate-500 to-violet-700 opacity-75 blur-[5px] animate-gradient rounded-lg"></div>
      <Card className="w-72 bg-gray-800 shadow-lg overflow-hidden rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-90 relative z-10">
        <CardBody className="p-0">
          <div className="p-4">
            <Typography variant="h5" color="white" className="mb-2">
              {member.name}
            </Typography>
            <Typography className="text-sm text-gray-300 mb-4">
              {member.description}
            </Typography>
          </div>
          <div className="relative w-full h-48">
            <img
              src={member.image}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-b-lg"
            />
          </div>
          <motion.div
            className="flex justify-center space-x-2 p-4"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <IconButton
              size="sm"
              color="purple"
              variant="text"
              href={member.github}
              target="_blank"
              className="hover:text-white"
            >
              <FaGithub size="20" />
            </IconButton>
            <IconButton
              size="sm"
              color="light-blue"
              variant="text"
              href={member.linkedin}
              target="_blank"
              className="hover:text-blue-500"
            >
              <FaLinkedin size="20" />
            </IconButton>
            <IconButton
              size="sm"
              color="pink"
              variant="text"
              href={member.instagram}
              target="_blank"
              className="hover:text-pink-500"
              style={{
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <FaInstagram size="20" />
            </IconButton>
            <IconButton
              size="sm"
              color="light-blue"
              variant="text"
              href={member.twitter}
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter size="20" />
            </IconButton>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-gray-900 py-12 px-4">
      <Typography variant="h2" color="white" className="font-semibold text-5xl text-center mb-12">
        Our Team
      </Typography>
      <motion.div
        className="flex flex-wrap justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Add the following CSS to your global stylesheet or within a <style> tag in your component
/*
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}
*/
