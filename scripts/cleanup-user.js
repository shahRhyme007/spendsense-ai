// Manual cleanup script for removing a user and all their data
// Usage: node scripts/cleanup-user.js <clerkUserId>

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupUser(clerkUserId) {
  try {
    console.log(`Starting cleanup for user: ${clerkUserId}`);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        accounts: true,
        transactions: true,
        budgets: true,
      },
    });

    if (!user) {
      console.log('User not found in database');
      return;
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    console.log(`- Accounts: ${user.accounts.length}`);
    console.log(`- Transactions: ${user.transactions.length}`);
    console.log(`- Budgets: ${user.budgets.length}`);

    // Delete user (cascading deletes will handle related data)
    await prisma.user.delete({
      where: { clerkUserId },
    });

    console.log('✅ User and all related data deleted successfully');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get clerkUserId from command line argument
const clerkUserId = process.argv[2];

if (!clerkUserId) {
  console.error('Please provide a Clerk User ID');
  console.error('Usage: node scripts/cleanup-user.js <clerkUserId>');
  process.exit(1);
}

cleanupUser(clerkUserId); 