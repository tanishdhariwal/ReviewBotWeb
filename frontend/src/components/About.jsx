import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

// Team member data
const teamMembers = [
  {
    name: "Alice Johnson",
    description: "Full-stack developer with a passion for React and Node.js",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/alice",
    linkedin: "https://linkedin.com/in/alice",
    instagram: "https://instagram.com/alice",
    twitter: "https://twitter.com/alice"
  },
  {
    name: "Bob Smith",
    description: "UI/UX designer creating beautiful and intuitive interfaces",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/bob",
    linkedin: "https://linkedin.com/in/bob",
    instagram: "https://instagram.com/bob",
    twitter: "https://twitter.com/bob"
  },
  {
    name: "Charlie Brown",
    description: "DevOps engineer ensuring smooth deployments and scalability",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/charlie",
    linkedin: "https://linkedin.com/in/charlie",
    instagram: "https://instagram.com/charlie",
    twitter: "https://twitter.com/charlie"
  },
  {
    name: "Diana Ross",
    description: "Product manager with a keen eye for market trends",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/diana",
    linkedin: "https://linkedin.com/in/diana",
    instagram: "https://instagram.com/diana",
    twitter: "https://twitter.com/diana"
  },
  {
    name: "Ethan Hunt",
    description: "Security expert keeping our systems safe and sound",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/ethan",
    linkedin: "https://linkedin.com/in/ethan",
    instagram: "https://instagram.com/ethan",
    twitter: "https://twitter.com/ethan"
  },
  {
    name: "Fiona Apple",
    description: "Data scientist turning raw data into actionable insights",
    image: "/placeholder.svg?height=200&width=300",
    github: "https://github.com/fiona",
    linkedin: "https://linkedin.com/in/fiona",
    instagram: "https://instagram.com/fiona",
    twitter: "https://twitter.com/fiona"
  }
];

const MemberCard = ({ member }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="w-72 bg-teal-50 shadow-lg overflow-hidden">
        <CardBody className="p-0">
          <div className="p-4">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {member.name}
            </Typography>
            <Typography className="text-sm text-blue-gray-600 mb-4">
              {member.description}
            </Typography>
          </div>
          <div className="relative w-full h-48">
            <img
              src={"https://placehold.co/600x400"}
              alt={member.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <motion.div 
            className="flex justify-center space-x-2 p-4"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <IconButton size="sm" color="purple" variant="text" href={member.github} target="_blank">
              <FaGithub size="20" />
            </IconButton>
            <IconButton size="sm" color="light-blue" variant="text" href={member.linkedin} target="_blank">
              <FaLinkedin size="20" />
            </IconButton>
            <IconButton size="sm" color="pink" variant="text" href={member.instagram} target="_blank">
              <FaInstagram size="20" />
            </IconButton>
            <IconButton size="sm" color="light-blue" variant="text" href={member.twitter} target="_blank">
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
    <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4">
      <Typography variant="h2" color="blue-gray" className="text-center mb-12">
        Our Team
      </Typography>
      <motion.div 
        className="flex flex-wrap justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <MemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}