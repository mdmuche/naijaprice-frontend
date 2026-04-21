import { priceHistory } from "./priceHistoryData";

export const initialUsers = [
  {
    id: "user_1775900230204",
    name: "System Admin",
    email: "admin@naijaprice.com",
    location: "Lagos, Nigeria",
    password: "Admin@123",
    role: "admin",
    isVerifiedUser: true, // Set to true so admin is already verified
    points: 100,
    profilePic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    notifications: [],
  },
  {
    id: "user_1775900466127",
    name: "Chiamaka O",
    email: "abulamartins@gmail.com",
    location: "Minna, Niger",
    password: "Test@123",
    role: "scout",
    isVerifiedUser: true,
    points: 50,
    profilePic: "/images/profile-dp.svg",
    notifications: [],
  },
];

const markets = [
  "Mile 12 Market",
  "Agege Market",
  "Agbalata Market",
  "Mushin Market",
  "Aratumi Market",
];

// Define a wider variety of items to avoid image fatigue
const commodityBlueprints = [
  {
    title: "Rice",
    unit: "50kg Bag",
    category: "Grains",
    price: 78000,
    image: "/images/rice.svg",
    createdAt: "2026-04-10T12:00:00Z",
    status: "pending",
  },
  {
    title: "Palm Oil",
    unit: "25L Gallon",
    category: "Oil",
    price: 32000,
    image: "/images/palmoil.svg",
    createdAt: "2026-04-11T12:00:00Z",
    status: "verified",
  },
  {
    title: "Habanero",
    unit: "Large Bag",
    category: "Vegetables",
    price: 22000,
    image: "/images/habanero.jpg",
    createdAt: "2026-04-11T12:00:00Z",
    status: "rejected",
  },
  {
    title: "Rice",
    unit: "Small Basket",
    category: "Grains",
    price: 15000,
    image: "/images/ofada.jpg",
    createdAt: "2026-04-11T12:00:00Z",
    status: "pending",
  },
  {
    title: "Beans",
    unit: "Paint Bucket",
    category: "Grains",
    price: 14500,
    image: "/images/oloyin-beans.jpg",
    createdAt: "2026-04-12T12:00:00Z",
    status: "verified",
  },
  {
    title: "Yam",
    unit: "5 Tubers",
    category: "Tubers",
    price: 18000,
    image: "/images/white-yam.jpg",
    createdAt: "2026-04-12T12:00:00Z",
    status: "verified",
  },
  {
    title: "Garri",
    unit: "50kg Bag",
    category: "Grains",
    price: 35000,
    image: "/images/yellow-garri.jpg",
    createdAt: "2026-04-12T12:00:00Z",
    status: "verified",
  },
  {
    title: "Chicken",
    unit: "Carton",
    category: "Meat",
    price: 42000,
    image: "/images/frozen-chicken.jpg",
    createdAt: "2026-04-12T12:00:00Z",
    status: "rejected",
  },
  {
    title: "Onions",
    unit: "Mesh Bag",
    category: "Vegetables",
    price: 25000,
    image: "/images/onions.svg",
    createdAt: new Date().toISOString(),
    status: "verified",
  },
  {
    title: "Potatoes",
    unit: "Basket",
    category: "Tubers",
    price: 8000,
    image: "/images/potatoes.jpg",
    createdAt: new Date().toISOString(),
    status: "verified",
  },
  {
    title: "Crayfish",
    unit: "Big Bag",
    category: "Seafood",
    price: 95000,
    image: "/images/crayfish.jpg",
    createdAt: new Date().toISOString(),
    status: "rejected",
  },
  {
    title: "Eggs",
    unit: "Crate",
    category: "Poultry",
    price: 4200,
    image: "/images/eggs.jpg",
    createdAt: new Date().toISOString(),
    status: "pending",
  },
  {
    title: "Iru",
    unit: "Pack",
    category: "Condiments",
    price: 1500,
    image: "/images/iru.jpg",
    createdAt: new Date().toISOString(),
    status: "verified",
  },
];

const generateReports = () => {
  const reports = [];

  const localData =
    JSON.parse(localStorage.getItem("naijaprice_commodities")) || [];

  // 2. Combine the static priceHistory with the local data
  const commodities = [...priceHistory, ...localData];
  // 1. Calculate Trend by comparing to the existing Redux state

  markets.forEach((marketName) => {
    // Distribute the 13 items per market
    commodityBlueprints.forEach((blueprint) => {
      let trendPercentage = 0;
      let trendDir = "neutral";
      const staticId = `${marketName.replace(/\s+/g, "-").toLowerCase()}-${blueprint.title.toLowerCase()}-${blueprint.unit.replace(/\s+/g, "-").toLowerCase()}`;

      const previousReport = commodities.find(
        (c) => c.title === blueprint.title && c.market === marketName,
      );
      if (previousReport && previousReport.price > 0) {
        const oldPrice = previousReport.price;
        const newPrice = Number(blueprint.price);
        // Calculate percentage: ((New - Old) / Old) * 100
        trendPercentage = ((newPrice - oldPrice) / oldPrice) * 100;
        trendPercentage = parseFloat(trendPercentage.toFixed(1)); // e.g. 5.2

        if (newPrice > oldPrice) trendDir = "up";
        else if (newPrice < oldPrice) trendDir = "down";
      }
      reports.push({
        id: staticId,
        userId: "user_1775900466127", // Linked to Chiamaka as per your CreatePrice logic
        title: blueprint.title,
        category: blueprint.category,
        market: marketName,
        price: blueprint.price,
        unit: `1 ${blueprint.unit}`, // Matches the 'item' state in your form
        snippet: blueprint.unit, // Matches the 'unit' state used in your cards
        image: blueprint.image,
        source: "crowdsourced",
        createdAt: blueprint.createdAt,
        status: blueprint.status,
        trend: Math.abs(trendPercentage),
        trendDirection: trendDir,
      });
    });
  });
  return reports;
};

export const initialReports = generateReports();
