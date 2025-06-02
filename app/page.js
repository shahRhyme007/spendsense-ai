"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import { AnimatedTestimonials } from "@/components/animated-testimonials";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <motion.section 
        className="py-20 bg-blue-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {statsData.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <motion.div 
                  className="text-4xl font-bold text-blue-600 mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features" 
        className="py-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            Everything you need to manage your finances
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="space-y-4 pt-4">
                    <motion.div
                      whileHover={{ 
                        rotate:10, 
                        scale: 1.1,
                        transition: { duration: 0.3 } 
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 bg-blue-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
          >
            {howItWorksData.map((step, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ 
                    backgroundColor: "#3b82f6",
                    scale: 1.1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Real Results from Real Users
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              See how SpendSense AI is transforming financial management for professionals worldwide
            </motion.p>
          </motion.div>
          <AnimatedTestimonials testimonials={testimonialsData} />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-blue-600"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            Ready to Take Control of Your Finances?
          </motion.h2>
          <motion.p 
            className="text-blue-100 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of users who are already managing their finances
            smarter with SpendSense AI
          </motion.p>
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Start Free Trial
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
