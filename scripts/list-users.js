// List all users in the database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function listUsers() {
  try {
    console.log('Fetching all users from database...\n');

    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            accounts: true,
            transactions: true,
            budgets: true,
          },
        },
      },
    });

    if (users.length === 0) {
      console.log('No users found in database');
      return;
    }

    console.log(`Found ${users.length} user(s):\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. User ID: ${user.id}`);
      console.log(`   Clerk ID: ${user.clerkUserId}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Accounts: ${user._count.accounts}`);
      console.log(`   Transactions: ${user._count.transactions}`);
      console.log(`   Budgets: ${user._count.budgets}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('   ---');
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers(); 