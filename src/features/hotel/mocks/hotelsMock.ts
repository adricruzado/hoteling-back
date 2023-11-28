import { type HotelStructure } from "../types";

export const hotelsMock: HotelStructure[] = [
  {
    _id: "656492010f2c29b15944b0d8",
    name: "Four Seasons Hotel George V",
    country: "France",
    city: "Paris",
    rating: 9.5,
    price: 800,
    isFavourite: true,
    picture: "https://i.ibb.co/Rg1NpjF/four-seasons-final.webp",
    description:
      "The Four Seasons Hotel George V, located in Paris, is known for its elegance and luxury. With a prime location just steps from the Champs-Élysées, it offers exquisitely decorated rooms and suites, exceptional service, and award-winning restaurants.",
  },
  {
    _id: "656492250f2c29b159453185",
    name: "The Ritz-Carlton",
    country: "USA",
    city: "New York",
    rating: 9.8,
    price: 1200,
    isFavourite: false,
    picture: "https://i.ibb.co/9bnjWw0/ritz-carlton-final.webp",
    description:
      "The Ritz-Carlton in New York is an icon of luxury and sophistication. It offers luxurious rooms with stunning views, impeccable service, and an ideal location in the heart of Manhattan, close to the city's iconic landmarks.",
  },
];
