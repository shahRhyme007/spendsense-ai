"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function AnimatedTestimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <motion.div 
      className="relative max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Testimonial Card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="w-full"
          >
            <Card className="mx-4 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-md">
              <CardContent className="p-8 md:p-12 text-center relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
                
                {/* Quote Icon */}
                <motion.div 
                  className="flex justify-center mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl relative z-10">
                      <Quote className="h-10 w-10 text-white" />
                    </div>
                    <motion.div 
                      className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>

                {/* Achievement Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 text-sm font-semibold border-0 shadow-lg">
                    {testimonials[currentIndex].icon}
                    {testimonials[currentIndex].achievement}
                  </Badge>
                </motion.div>

                {/* Quote */}
                <motion.blockquote 
                  className="text-2xl md:text-3xl font-medium text-gray-800 mb-10 leading-relaxed relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="text-6xl text-blue-200 absolute -top-4 -left-4 font-serif">&ldquo;</span>
                  {testimonials[currentIndex].quote}
                  <span className="text-6xl text-blue-200 absolute -bottom-8 -right-4 font-serif">&rdquo;</span>
                </motion.blockquote>

                {/* Star Rating */}
                <motion.div 
                  className="flex justify-center gap-1 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.4, type: "spring" }}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                    >
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Author Info */}
                <motion.div 
                  className="flex items-center justify-center gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-xl"
                      />
                      <motion.div 
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-md"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  <div className="text-left">
                    <motion.div 
                      className="font-bold text-xl text-gray-900 mb-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      {testimonials[currentIndex].name}
                    </motion.div>
                    <motion.div 
                      className="text-blue-600 font-semibold text-lg mb-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    >
                      {testimonials[currentIndex].role}
                    </motion.div>
                    <motion.div 
                      className="text-gray-500 text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.4 }}
                    >
                      {testimonials[currentIndex].company}
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200/50"
        onMouseEnter={() => setIsAutoPlaying(false)}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
      </motion.button>

      <motion.button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200/50"
        onMouseEnter={() => setIsAutoPlaying(false)}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
      </motion.button>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Dots Indicator */}
      <motion.div 
        className="flex justify-center gap-3 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-white/40 hover:bg-white/60"
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: index === currentIndex ? 1.25 : 1,
            }}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Auto-play Controls */}
      <motion.div 
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center gap-2 text-sm px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            isAutoPlaying
              ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
              : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isAutoPlaying ? "Auto-playing" : "Paused"} • Click to {isAutoPlaying ? "pause" : "play"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 