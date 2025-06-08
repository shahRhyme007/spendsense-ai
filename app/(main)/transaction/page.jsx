import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserAccounts, getUserTransactions } from "@/actions/dashboard";
import TransactionsPage from "./_components/transactions-page";

export const metadata = {
  title: "Transactions - SpendSense AI",
  description: "View and manage all your transactions",
};

async function TransactionsDataLoader() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const accounts = await getUserAccounts();
  const transactions = await getUserTransactions();

  return (
    <TransactionsPage 
      accounts={accounts} 
      transactions={transactions} 
    />
  );
}

export default function TransactionsLayout() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage all your financial transactions
        </p>
      </div>
      
      <Suspense 
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <TransactionsDataLoader />
      </Suspense>
    </div>
  );
} 