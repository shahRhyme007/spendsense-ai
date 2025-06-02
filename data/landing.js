import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  TrendingUp,
  Target,
  DollarSign,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Alexandra Chen",
    role: "Tech Entrepreneur",
    company: "InnovateLab",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "SpendSense AI helped me reduce business expenses by 40% in just 3 months. The AI predictions are incredibly accurate!",
    achievement: "40% Cost Reduction",
    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Investment Banker",
    company: "Goldman Sachs",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Finally, a financial tool that thinks like I do. The real-time insights have saved me over $50,000 in potential losses.",
    achievement: "$50K+ Saved",
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Financial Consultant",
    company: "WealthMax Advisory",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "My clients' portfolio performance improved by 35% after implementing SpendSense AI's recommendations. It's a game-changer!",
    achievement: "35% Performance Boost",
    icon: <Target className="h-5 w-5 text-green-500" />,
    rating: 5,
  },
];
