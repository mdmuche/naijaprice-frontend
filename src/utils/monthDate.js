export const newDate = (date) => {
  const d = date ? new Date(date) : new Date();
  const formatted = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return formatted;
};
