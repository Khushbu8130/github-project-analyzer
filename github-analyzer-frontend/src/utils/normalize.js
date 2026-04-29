export const normalize = (value) => {
  if (!value) return 0;
  return Math.max(5, Math.round(Math.log10(value + 1) * 30));
};