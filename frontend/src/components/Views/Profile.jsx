'use client'

import { motion } from "framer-motion"
import { DollarSign, LogOut } from 'lucide-react'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { getUserDetails } from "../../Helpers/apiComms"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`


export default function Profile() {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [feedback, setFeedback] = useState("")
  const [credits, setCredits] = useState(0)
  const [avatar, setAvatar] = useState("")
  const auth = useAuth();
  const [username, setUsername] = useState(auth.user.username);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Simulated API call
        const userDetails = await getUserDetails();
        setUsername(userDetails.username)
        setCredits(userDetails.credits)
        setAvatar(userDetails.profileImage)
      } catch (error) {
      }
    };
    fetchUserDetails();
  }, [])



  const handlePasswordChange = async () => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPassword("")
      setNewPassword("")
    } catch (error) {
    }
  };

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", feedback)
    setFeedback("");  
  };

  const handleLogout = () => {
    console.log("User logged out");
    auth.logout();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-black via-slate-950 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className= {`lg:col-span-1 bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${shimmer}`}>
              <CardContent className="flex flex-col items-center space-y-4 pt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {/* <Avatar className="w-24 h-24 cursor-pointer border-4 border-white/20 hover:border-white/40 transition-colors">
                    <AvatarImage src={avatar} alt="User Avatar" />
                    <AvatarFallback>{username[0]}</AvatarFallback>
                  </Avatar> */}
                  <div className="relative group mb-4">
                    <div className="absolute inset-0 p-4 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 transition-all opacity-100 blur-lg z-0 group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:via-fuchsia-500 group-hover:to-blue-500"></div>
                    <img src={avatar} alt="avatar" className="relative rounded-full z-10"/>
                  </div>
                </motion.div>
                <CardTitle className="text-2xl font-bold text-white">{username}</CardTitle>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-white" />
                  <span className="text-white">{credits} Credits</span>
                </div>
                <Link to='/pricing' className="text-sm font-thin text-white/70 hover:text-white hover:underline">
                  Check out pricing plans
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full mt-4 bg-white/10 text-white hover:bg-white/20 border-white/20"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className={`lg:col-span-2 bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${shimmer}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium text-white">
                    Current Password
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium text-white">
                    New Password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter new password"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="py-14">
                  <Button onClick={handlePasswordChange} className="w-full bg-white text-black hover:bg-white/90">
                    Change Password
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className={`bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${shimmer}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Your feedback is valuable to us..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={handleFeedbackSubmit} className="w-full bg-white text-black hover:bg-white/90">
                  Submit Feedback
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>


        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className={`bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${shimmer}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-white hover:text-white/80">
                    How do I change my avatar?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    Click on your current avatar image to open the file picker. Select a new image file to update your avatar.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-white hover:text-white/80">
                    Is my feedback anonymous?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    Your feedback is associated with your account to help us better address your concerns. However, we respect your privacy and handle all feedback confidentially.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-white hover:text-white/80">
                    How often can I change my password?
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    You can change your password as often as you like. We recommend updating your password regularly for security reasons.
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
