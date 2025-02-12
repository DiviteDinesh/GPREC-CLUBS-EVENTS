const blacklistedTokens = new Set(); // Store invalidated tokens in memory

export const addToBlacklist = (token) => {
  blacklistedTokens.add(token);
};

export const isBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};
