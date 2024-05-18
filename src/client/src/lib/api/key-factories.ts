export const authKeys = {
  profile: ['profile'] as const,
  signIn: ['sign-in'] as const,
  signUp: ['sign-up'] as const,
};

export const userKeys = {
  users: ['users'] as const,
  profile: ['profile'] as const,
  all: () => [...userKeys.users, ...userKeys.profile] as const,
  updateUser: () => [...userKeys.all(), 'update'] as const,
};
