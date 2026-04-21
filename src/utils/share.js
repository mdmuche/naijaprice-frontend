export const handleGeneralShare = async ({ title, market, price, id }) => {
  const priceSentence = price ? ` It's currently selling for ${price}!` : "";
  const shareData = {
    title: `Price Update: ${title}`,
    text: `Check out the current price of ${title} at ${market}. ${priceSentence}`,
    url: `${window.location.origin}/commodities/${id}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(
        `${shareData.text} \nView here: ${shareData.url}`,
      );
      alert("Link copied to clipboard!");
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Error sharing:", err);
    }
  }
};
