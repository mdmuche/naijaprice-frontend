export const newDate = () => {
  const date = new Date();

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return formatted;
};
