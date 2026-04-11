export const filterByDays = (data, days) => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return data.filter((item) => {
    const itemDate = new Date(item.createdAt).getTime();
    return itemDate >= cutoff.getTime();
  });
};

export const groupByDay = (data) => {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  return grouped;
};

export const buildChartData = (groupedData) => {
  return Object.entries(groupedData).map(([date, items]) => {
    const point = { day: date };

    items.forEach((item) => {
      const key = item.title.toLowerCase();
      point[key] = item.price;
    });

    return point;
  });
};

export const generateTrendsFromHistory = (history, market, timeframe) => {
  const daysMap = {
    "7d": 7,
    "14d": 14,
    "30d": 30,
  };

  const filtered = history.filter((item) => item.market === market);

  const timeFiltered = filterByDays(filtered, daysMap[timeframe]);
  console.log("filtered", timeFiltered);

  const grouped = groupByDay(timeFiltered);

  return buildChartData(grouped);
};
