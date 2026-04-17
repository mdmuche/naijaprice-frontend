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
    profilePic: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    notifications: [],
  },
];

export const initialReports = [
  {
    id: 101,
    title: "Big Mama Rice",
    price: 85000,
    market: "Mile 12 Market",
    status: "verified",
    source: "official",
    image: "/images/rice.jpg",
  },
];
