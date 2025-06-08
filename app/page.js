"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import { AnimatedTestimonials } from "@/components/animated-testimonials";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award
} from "lucide-react";

// Enhanced Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Handle different value formats
    let numericValue;
    let isRating = value.includes('/5');
    
    if (isRating) {
      // Special handling for rating format like "4.9/5"
      numericValue = parseFloat(value.split('/')[0]);
    } else if (value.includes('.')) {
      // Handle decimal numbers like "99.9%"
      numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    } else {
      numericValue = parseInt(value.replace(/[^\d]/g, ''));
    }
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      if (isRating || value.includes('.')) {
        setCount(parseFloat((easeOutQuart * numericValue).toFixed(1)));
      } else {
        setCount(Math.floor(easeOutQuart * numericValue));
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return <span>{value.includes('K') ? `${count}K+` : 
               value.includes('B') ? `$${count}B+` : 
               value.includes('%') ? `${count}%` : 
               value.includes('/5') ? `${count}/5` : count}</span>;
};

const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Floating Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="fixed top-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 pointer-events-none z-0"
      />
      <motion.div 
        style={{ y: y2 }}
        className="fixed top-40 left-10 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 pointer-events-none z-0"
      />

      {/* Trust Indicators */}
      <motion.section 
        className="py-12 md:py-16 bg-white border-y border-gray-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 50,000+ Users
            </Badge>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60">
              {['Microsoft', 'Google', 'Apple', 'Amazon', 'Tesla'].map((brand, i) => (
                <motion.div
                  key={brand}
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  variants={fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 0.8 }}
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Stats Section */}
      <motion.section 
        className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16 px-4"
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Real-time Analytics
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Join professionals worldwide who are already managing their finances smarter
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
          >
            {statsData.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <motion.div 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                    <AnimatedCounter value={stat.value} duration={1.5 + index * 0.2} />
                </motion.div>
                <motion.div 
                    className="text-blue-100 font-medium text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                >
                  {stat.label}
                </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Features Section */}
      <motion.section 
        id="features" 
        className="py-16 md:py-24 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12 md:mb-20 px-4"
            variants={fadeInUp}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Everything you need to manage your finances
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI-powered tools designed to give you complete control over your financial future
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 group-hover:from-blue-50 group-hover:to-indigo-50">
                  <CardContent className="p-6 sm:p-8">
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ 
                        rotate: 5,
                        scale: 1.1,
                        transition: { duration: 0.3 } 
                      }}
                    >
                      <div className="text-white">
                      {feature.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                    <motion.div 
                      className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced How It Works Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-20 px-4"
            variants={fadeInUp}
          >
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get started in 3 simple steps
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined onboarding process gets you up and running in minutes, not hours
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
            variants={staggerContainer}
          >
            {/* Connection Lines - Hidden on mobile */}
            <div className="hidden lg:block absolute top-24 left-1/4 w-1/4 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 z-0"></div>
            <div className="hidden lg:block absolute top-24 right-1/4 w-1/4 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 z-0"></div>
            
            {howItWorksData.map((step, index) => (
              <motion.div 
                key={index} 
                className="text-center relative"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 relative"
                  whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                    transition: { duration: 0.6 }
                    }}
                  >
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-gray-900">
                    {index + 1}
                  </div>
                  <div className="text-white text-xl sm:text-2xl">
                    {step.icon}
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5 }}
                >
                  {step.description}
                </motion.p>
                
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.3 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 75% 75%, #6366f1 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-20 px-4"
            variants={fadeInUp}
          >
            <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
              <Award className="w-4 h-4 mr-2" />
              Customer Success
            </Badge>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Real Results from Real Users
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
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

      {/* Enhanced CTA Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 px-6 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Start Your Financial Journey
            </Badge>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
          >
            Ready to Take Control of Your Finances?
          </motion.h2>
            
          <motion.p 
              className="text-lg sm:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
              Join thousands of users who are already managing their finances smarter with AI-powered insights
          </motion.p>
            
          <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
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
                    className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                >
                  Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
              
              <motion.div 
                className="flex items-center text-white/80 text-sm"
                whileHover={{ scale: 1.02 }}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                No credit card required
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-8 md:mt-12 text-center px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-blue-200 text-sm mb-4">Trusted by professionals at</p>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60">
                {['Google', 'Microsoft', 'Apple', 'Tesla', 'Netflix'].map((company, index) => (
                                  <motion.span
                  key={company}
                  className="text-white font-medium text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  {company}
                </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
