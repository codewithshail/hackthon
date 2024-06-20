import { clerkClient } from '@clerk/nextjs/server';

export const ClerkAPI = {
  async updateUser(userId: string, data: any) {
    try {
      await clerkClient.users.updateUser(userId, data);
    } catch (error) {
      console.error('Error updating user on Clerk:', error);
    }
  }
};
