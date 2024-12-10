"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Check, X } from 'lucide-react'
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

const pricingPlans = [
    {
        name: "Free",
        monthlyPrice: "$0",
        annualPrice: "$0",
        description: "Ideal for Casual Users",
        features: [
            "Analyze up to 5 product URLs per month",
            "Basic product detail extraction",
            "Access to chat feature without chat history storage",
            "Limited support with email-based query resolution",
        ],
        limitations: [
            "No access to advanced features like sentiment analysis or chat history",
            "Ads displayed during usage",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        monthlyPrice: "$10",
        annualPrice: "$100",
        description: "For Enthusiasts and Small Businesses",
        features: [
            "Analyze up to 50 product URLs per month",
            "Comprehensive product details, including sentiment analysis and keyword extraction",
            "Persistent chat history with unlimited storage",
            "Multi-product management and comparison tools",
            "Priority email and chat support",
            "Ad-free experience",
        ],
        cta: "Upgrade to Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        monthlyPrice: "Custom",
        annualPrice: "Custom",
        description: "Tailored for Businesses",
        features: [
            "Unlimited product URL analyses",
            "Batch processing for bulk reviews and product data extraction",
            "Integration with business tools (e.g., CRM systems, analytics platforms)",
            "Team-based access with role management",
            "Dedicated support with a personal account manager and 24/7 availability",
            "API access for programmatic integration into custom workflows",
        ],
        cta: "Contact Sales",
        popular: false,
    },
]

const testimonials = [
    { name: "John Doe", role: "E-commerce Manager", text: "Easy Pick has streamlined our product research process, saving us countless hours!" },
    { name: "Jane Smith", role: "Online Shopper", text: "I love how Easy Pick helps me make informed decisions. It's like having a personal shopping assistant." },
    { name: "Alex Johnson", role: "Marketing Director", text: "The sentiment analysis feature has been invaluable for our brand monitoring efforts." },
    { name: "Emily Brown", role: "Small Business Owner", text: "Easy Pick's Pro plan has given us insights that we couldn't have gathered on our own. It's a game-changer!" },
]

export default function Pricing() {
    const [hoveredPlan, setHoveredPlan] = useState(null)
    const [isAnnual, setIsAnnual] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
            <div className="container mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Easy Pick Pricing Plans
                </motion.h1>
                <motion.p
                    className="text-lg sm:text-xl text-center mb-8 text-gray-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Choose the perfect plan for your product analysis needs
                </motion.p>

                <div className="flex items-center justify-center mb-8">
                    <Label htmlFor="annual-toggle" className="mr-2 text-sm sm:text-base">Monthly</Label>
                    <Switch
                        id="annual-toggle"
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                        className="bg-gray-600 data-[state=checked]:bg-white [&>span]:bg-gray-900 data-[state=checked]:[&>span]:bg-gray-900 border border-gray-700 shadow-inner w-12 h-6 p-1 rounded-full"
                    />
                    <Label htmlFor="annual-toggle" className="ml-2 text-sm sm:text-base">Annual (Save 10%)</Label>
                </div>

                <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-8">
                    <AnimatePresence>
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                onHoverStart={() => setHoveredPlan(plan.name)}
                                onHoverEnd={() => setHoveredPlan(null)}
                                className="w-full sm:w-[350px] max-w-[350px]"
                            >
                                <Card
                                    className={`h-full flex flex-col ${plan.popular
                                            ? "bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/80"
                                            : "bg-gray-900/50"
                                        } backdrop-blur-lg border border-gray-700 shadow-xl`}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-white">{plan.name}</CardTitle>
                                        <CardDescription className="text-white text-sm sm:text-base">{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                                            {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                            {plan.name !== "Enterprise" && <span className="text-lg sm:text-xl font-normal text-white">/{isAnnual ? 'year' : 'month'}</span>}
                                        </p>
                                        <ul className="space-y-2 mb-4">
                                            {plan.features.map((feature, featureIndex) => (
                                                <motion.li
                                                    key={feature}
                                                    className="flex items-start text-sm sm:text-base text-white"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.1 }}
                                                >
                                                    <Check className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-blue-400 mt-0.5" />
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                        {plan.limitations && (
                                            <ul className="space-y-2">
                                                {plan.limitations.map((limitation, limitationIndex) => (
                                                    <motion.li
                                                        key={limitation}
                                                        className="flex items-start text-sm sm:text-base text-gray-300"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 + limitationIndex * 0.1 }}
                                                    >
                                                        <X className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-red-400 mt-0.5" />
                                                        <span>{limitation}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className={`w-full ${plan.popular
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                                                    : "bg-gray-800 hover:bg-gray-700 text-white"
                                                } transition-all duration-300 ease-in-out text-sm sm:text-base`}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">What Our Customers Say</h2>
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        >
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-[280px] sm:w-[300px] mx-4">
                                    <Card className="h-full bg-gray-800/50 backdrop-blur-lg border border-gray-700">
                                        <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
                                            <p className="text-gray-100 mb-4 line-clamp-4 text-sm sm:text-base">"{testimonial.text}"</p>
                                            <div>
                                                <p className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</p>
                                                <p className="text-xs sm:text-sm text-gray-300">{testimonial.role}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

