"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format, subMonths, subYears } from "date-fns";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  TrendingDown,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Plane,
  Heart,
  Briefcase,
  DollarSign,
  CreditCard,
  Zap,
  Coffee,
  Gift,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
  "#FFB347",
  "#87CEEB",
  "#DDA0DD",
];

const TIME_PERIODS = [
  { value: "1month", label: "Last Month", months: 1 },
  { value: "6months", label: "Last 6 Months", months: 6 },
  { value: "1year", label: "Last Year", months: 12 },
];

// Category icons mapping
const CATEGORY_ICONS = {
  "Food & Dining": <Utensils className="h-4 w-4" />,
  "Transportation": <Car className="h-4 w-4" />,
  "Shopping": <ShoppingCart className="h-4 w-4" />,
  "Entertainment": <Gift className="h-4 w-4" />,
  "Bills & Utilities": <Zap className="h-4 w-4" />,
  "Healthcare": <Heart className="h-4 w-4" />,
  "Travel": <Plane className="h-4 w-4" />,
  "Home": <Home className="h-4 w-4" />,
  "Business": <Briefcase className="h-4 w-4" />,
  "Income": <DollarSign className="h-4 w-4" />,
  "Coffee": <Coffee className="h-4 w-4" />,
  "Other": <MoreHorizontal className="h-4 w-4" />
};

// Category colors mapping
const CATEGORY_COLORS = {
  "Food & Dining": "bg-orange-100 text-orange-700 border-orange-200",
  "Transportation": "bg-blue-100 text-blue-700 border-blue-200",
  "Shopping": "bg-purple-100 text-purple-700 border-purple-200",
  "Entertainment": "bg-pink-100 text-pink-700 border-pink-200",
  "Bills & Utilities": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Healthcare": "bg-red-100 text-red-700 border-red-200",
  "Travel": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Home": "bg-green-100 text-green-700 border-green-200",
  "Business": "bg-gray-100 text-gray-700 border-gray-200",
  "Income": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Coffee": "bg-amber-100 text-amber-700 border-amber-200",
  "Other": "bg-slate-100 text-slate-700 border-slate-200"
};

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("1month");

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for selected time period
  const currentDate = new Date();
  const selectedPeriod = TIME_PERIODS.find(p => p.value === selectedTimePeriod);
  const periodStartDate = selectedPeriod.months === 12 
    ? subYears(currentDate, 1)
    : subMonths(currentDate, selectedPeriod.months);

  const periodExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate >= periodStartDate &&
      transactionDate <= currentDate
    );
  });

  // Group expenses by category
  const expensesByCategory = periodExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      name: category,
      value: parseFloat(amount.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value); // Sort by amount descending

  // Calculate total expenses for the period
  const totalExpenses = pieChartData.reduce((sum, item) => sum + item.value, 0);

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    return CATEGORY_ICONS[category] || CATEGORY_ICONS["Other"];
  };

  // Helper function to get category color
  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"];
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-semibold text-gray-800">
                Recent Transactions
              </CardTitle>
            </div>
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[140px] border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentTransactions.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No recent transactions</p>
                    <p className="text-sm text-gray-400">Your transactions will appear here</p>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.01, 
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Category Icon */}
                        <motion.div 
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border",
                            getCategoryColor(transaction.category)
                          )}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getCategoryIcon(transaction.category)}
                        </motion.div>

                        {/* Transaction Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {transaction.description || "Untitled Transaction"}
                            </p>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs px-2 py-0.5",
                                getCategoryColor(transaction.category)
                              )}
                            >
                              {transaction.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                            <span className="text-gray-300">•</span>
                            <span className="font-medium">
                              {format(new Date(transaction.date), "h:mm a")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Amount and Type Indicator */}
                      <div className="flex items-center gap-2">
                        <motion.div
                          className={cn(
                            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold",
                            transaction.type === "EXPENSE"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-green-50 text-green-700 border border-green-200"
                          )}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {transaction.type === "EXPENSE" ? (
                            <ArrowDownRight className="h-3 w-3" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3" />
                          )}
                          <span>
                            {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toFixed(2)}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer with summary if there are transactions */}
            {recentTransactions.length > 0 && (
              <motion.div 
                className="px-4 py-3 bg-gray-50 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Showing last {recentTransactions.length} transactions</span>
                  <Link href="/transaction">
                    <motion.div
                      className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View all
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Breakdown Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-base font-normal">
                Expense Breakdown
              </CardTitle>
            </div>
            <Select
              value={selectedTimePeriod}
              onValueChange={setSelectedTimePeriod}
            >
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {TIME_PERIODS.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0 pb-5">
            <AnimatePresence mode="wait">
              {pieChartData.length === 0 ? (
                <motion.div
                  key="no-data"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="flex flex-col items-center gap-2">
                    <TrendingDown className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No expenses for {selectedPeriod.label.toLowerCase()}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`chart-${selectedTimePeriod}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Summary Stats */}
                  <div className="px-6 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Expenses</span>
                      <motion.span 
                        className="font-semibold text-red-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        ${totalExpenses.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Categories</span>
                      <motion.span 
                        className="font-semibold"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {pieChartData.length}
                      </motion.span>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value, percent }) => 
                            `${name}: ${(percent * 100).toFixed(1)}%`
                          }
                          animationBegin={0}
                          animationDuration={800}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [
                            `$${value.toFixed(2)}`,
                            name
                          ]}
                          labelFormatter={() => ""}
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Legend 
                          wrapperStyle={{
                            paddingTop: "10px",
                            fontSize: "12px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Categories List */}
                  <div className="px-6">
                    <h4 className="text-sm font-medium mb-3">Top Categories</h4>
                    <div className="space-y-2">
                      {pieChartData.slice(0, 3).map((item, index) => (
                        <motion.div
                          key={item.name}
                          className="flex items-center justify-between py-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            ${item.value.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
