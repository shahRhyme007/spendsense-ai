"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Sparkles 
} from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-sm font-medium border-0 shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Financial Intelligence
            <motion.div
              className="ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Manage Your Finances
          </span>
          <br />
          <motion.span 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            with Intelligence
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          An AI-powered financial management platform that helps you track, analyze, and optimize your spending with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
            real-time insights
          </span>{" "}
          and predictive analytics.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
              >
                <Star className="w-5 h-5 fill-current" />
              </motion.div>
            ))}
          </div>
          <span className="text-gray-600 font-medium">4.9/5 from 50,000+ users</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
          
          </motion.div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-16 text-sm text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: TrendingUp, text: "AI Insights" },
            { icon: Users, text: "50K+ Users" },
            { icon: Award, text: "Bank-Level Security" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          className="hero-image-wrapper relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
          <div ref={imageRef} className="hero-image relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/banner.jpg"
                width={1280}
                height={720}
                alt="SpendSense AI Dashboard Preview"
                className="rounded-2xl shadow-2xl border border-gray-200 mx-auto"
                priority
              />
            </motion.div>
            
            {/* Floating UI Elements */}
            <motion.div
              className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Live Tracking</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">+24% Savings</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-4 shadow-lg border"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Processing</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
