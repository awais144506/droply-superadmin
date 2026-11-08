export const bankKeys = {
  all: ["bank-details"] as const,
  lists: () => [...bankKeys.all, "list"] as const,
};
