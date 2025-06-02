import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    
    // Use upsert to handle both create and update in one operation
    // This eliminates race conditions and unique constraint errors
    const dbUser = await db.user.upsert({
      where: {
        clerkUserId: user.id,
      },
      update: {
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
      },
      create: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    
    // If upsert still fails for some reason, try a simple find as fallback
    try {
      const existingUser = await db.user.findUnique({
        where: {
          clerkUserId: user.id,
        },
      });
      
      if (existingUser) {
        return existingUser;
      }
    } catch (findError) {
      console.error("Error finding existing user:", findError.message);
    }
    
    // If we still can't find/create the user, return null
    return null;
  }
};
