"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
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
    }, 4000);

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
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Testimonial Card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="mx-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 md:p-12 text-center">
                {/* Quote Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                {/* Achievement Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {testimonials[currentIndex].icon}
                  {testimonials[currentIndex].achievement}
                </motion.div>

                {/* Quote */}
                <motion.blockquote 
                  className="text-xl md:text-2xl font-medium text-gray-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </motion.blockquote>

                {/* Star Rating */}
                <motion.div 
                  className="flex justify-center gap-1 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Author Info */}
                <motion.div 
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={60}
                      height={60}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </motion.div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-blue-600 font-medium">{testimonials[currentIndex].role}</div>
                    <div className="text-sm text-gray-500">{testimonials[currentIndex].company}</div>
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
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
      </motion.button>

      <motion.button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
      </motion.button>

      {/* Dots Indicator */}
      <motion.div 
        className="flex justify-center gap-3 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: index === currentIndex ? 1.25 : 1 }}
          />
        ))}
      </motion.div>

      {/* Auto-play indicator */}
      <motion.div 
        className="flex justify-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
            isAutoPlaying
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? "Auto-playing" : "Paused"} • Click to {isAutoPlaying ? "pause" : "play"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 