"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CreditCard,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Plane,
  Heart,
  Briefcase,
  DollarSign,
  Zap,
  Coffee,
  Gift,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Category icons mapping (same as transaction-overview)
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

// Category colors mapping (same as transaction-overview)
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

const ITEMS_PER_PAGE = 10;

export default function TransactionsPage({ accounts, transactions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Helper functions
  const getCategoryIcon = (category) => {
    return CATEGORY_ICONS[category] || CATEGORY_ICONS["Other"];
  };

  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"];
  };

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(transactions.map(t => t.category))];
    return cats.sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Account filter
    if (selectedAccount !== "all") {
      filtered = filtered.filter(t => t.accountId === selectedAccount);
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case "date":
          aVal = new Date(a.date);
          bVal = new Date(b.date);
          break;
        case "amount":
          aVal = a.amount;
          bVal = b.amount;
          break;
        case "description":
          aVal = a.description || "";
          bVal = b.description || "";
          break;
        case "category":
          aVal = a.category;
          bVal = b.category;
          break;
        default:
          aVal = new Date(a.date);
          bVal = new Date(b.date);
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, searchTerm, selectedAccount, selectedType, selectedCategory, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAccount, selectedType, selectedCategory]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>{filteredTransactions.length} transactions</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/transaction/create">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Transactions</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Sort by:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSort("date")}
                className="h-auto p-1 font-normal"
              >
                Date
                {sortBy === "date" && (
                  <ArrowUpDown className="h-3 w-3 ml-1" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSort("amount")}
                className="h-auto p-1 font-normal"
              >
                Amount
                {sortBy === "amount" && (
                  <ArrowUpDown className="h-3 w-3 ml-1" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            <AnimatePresence>
              {paginatedTransactions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No transactions found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </motion.div>
              ) : (
                paginatedTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Category Icon */}
                      <div 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border",
                          getCategoryColor(transaction.category)
                        )}
                      >
                        {getCategoryIcon(transaction.category)}
                      </div>

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
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            <span>
                              {accounts.find(a => a.id === transaction.accountId)?.name || "Unknown Account"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold",
                          transaction.type === "EXPENSE"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        )}
                      >
                        {transaction.type === "EXPENSE" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        <span>
                          {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} results
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 