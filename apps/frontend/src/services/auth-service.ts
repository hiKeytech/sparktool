import type { EmailPasswordCredentials, UpdateUser } from "@/types";
import {
  changePasswordFn,
  getSessionDataFn,
  getUserByIdFn,
  resetUserPasswordFn,
  signInWithPasswordFn,
  signOutUserFn,
  updateUserProfileFn,
} from "@/server/auth";

export const authService = {
  session: async () => await getSessionDataFn(),
  getCurrentUser: async (userId: null | string) => {
    return getUserByIdFn({ data: userId });
  },

  signInWithEmailAndPassword: async (credentials: EmailPasswordCredentials) => {
    return signInWithPasswordFn({ data: credentials });
  },

  signOut: async (_variables: { userId?: string }) => {
    return signOutUserFn();
  },

  changePassword: async (variables: {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    return changePasswordFn({ data: variables });
  },

  resetUserPassword: async (variables: {
    newPassword: string;
    userId: string;
  }) => {
    return resetUserPasswordFn({ data: variables });
  },

  updateProfile: async (variables: {
    skipActivityLog?: boolean;
    updates: Partial<UpdateUser>;
    userId: string;
  }) => {
    const { skipActivityLog = false, updates, userId } = variables;

    const updatedUserId = await updateUserProfileFn({
      data: {
        updates,
        userId,
      },
    });

    if (!skipActivityLog) {
      return updatedUserId;
    }

    return updatedUserId;
  },
};
