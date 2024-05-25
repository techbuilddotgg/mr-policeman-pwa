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

export const contributionsKeys = {
  contributions: ['contributions'] as const,
  all: () => [...contributionsKeys.contributions] as const,
  createContribution: () => [...contributionsKeys.contributions, 'create'] as const,
};

export const controlKeys = {
  controls: ['controls'] as const,
  getById: (id: string) => [...controlKeys.controls, id] as const,
  createControl: () => [...controlKeys.controls, 'create'] as const,
};
