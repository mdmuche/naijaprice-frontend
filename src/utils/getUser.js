export const getStoredUser = () => {
  const saved = localStorage.getItem("naijaprice_current_session");
  return saved ? JSON.parse(saved) : null;
};
