// src/data/HotelsData.js
import hotel1 from '../assets/hotels/hotel1.jpeg';
import hotel2 from '../assets/hotels/hotel2.jpeg';
import hotel3 from '../assets/hotels/hotel3.jpeg';
import hotel4 from '../assets/hotels/hotel4.jpeg';
import hotel5 from '../assets/hotels/hotel5.jpeg';
import hotel6 from '../assets/hotels/hotel6.jpeg';
import hotel7 from '../assets/hotels/hotel7.jpeg';
import hotel8 from '../assets/hotels/hotel8.jpeg';
import hotel9 from '../assets/hotels/hotel9.jpeg';
import hotel10 from '../assets/hotels/hotel10.jpeg';
import hotel11 from '../assets/hotels/hotel11.jpeg';
import hotel12 from '../assets/hotels/hotel12.jpeg';
import hotel13 from '../assets/hotels/hotel13.jpeg';
import hotel14 from '../assets/hotels/hotel14.jpeg';
import hotel15 from '../assets/hotels/hotel15.jpeg';

export const hotelCategories = [
  {
    id: 1,
    title: "Safari Lodges",
    description: "Experience Kenya's wildlife in luxury",
    image: hotel1,
    places: [
      {id: 1, name: "Angama Mara", location: "Maasai Mara", rating: 4.9, price: "$850", image: hotel1, capacity: "30 guests"},
      {id: 2, name: "Giraffe Manor", location: "Nairobi", rating: 4.8, price: "$1200", image: hotel2, capacity: "20 guests"},
      {id: 3, name: "Sand River", location: "Mara", rating: 4.7, price: "$1100", image: hotel3, capacity: "25 guests"}
    ]
  },
  {
    id: 2,
    title: "Beach Resorts",
    description: "Relax by the Indian Ocean in luxury",
    image: hotel4,
    places: [
      {id: 4, name: "Diani Sea Resort", location: "Diani", rating: 4.7, price: "$450", image: hotel4, capacity: "150 guests"},
      {id: 5, name: "Watamu Bay", location: "Watamu", rating: 4.6, price: "$520", image: hotel5, capacity: "100 guests"},
      {id: 6, name: "Pinewood", location: "Diani", rating: 4.5, price: "$380", image: hotel6, capacity: "80 guests"}
    ]
  },
  {
    id: 3,
    title: "Mountain Lodges",
    description: "Breathtaking highland retreats",
    image: hotel7,
    places: [
      {id: 7, name: "Mt. Kenya Club", location: "Nanyuki", rating: 4.8, price: "$720", image: hotel7, capacity: "50 guests"},
      {id: 8, name: "The Ark", location: "Aberdare", rating: 4.7, price: "$680", image: hotel8, capacity: "60 guests"}
    ]
  },
  {
    id: 4,
    title: "City Hotels",
    description: "Urban luxury in the heart of Kenya",
    image: hotel9,
    places: [
      {id: 9, name: "Tribe Hotel", location: "Nairobi", rating: 4.8, price: "$350", image: hotel9, capacity: "200 guests"},
      {id: 10, name: "Villa Rosa", location: "Nairobi", rating: 4.9, price: "$420", image: hotel10, capacity: "180 guests"},
      {id: 11, name: "Sarova Stanley", location: "Nairobi", rating: 4.6, price: "$380", image: hotel11, capacity: "150 guests"}
    ]
  },
  {
    id: 5,
    title: "Lake Retreats",
    description: "Serene stays by Kenya's beautiful lakes",
    image: hotel12,
    places: [
      {id: 12, name: "Naivasha Sopa", location: "Naivasha", rating: 4.5, price: "$320", image: hotel12, capacity: "120 guests"},
      {id: 13, name: "Lake Nakuru Lodge", location: "Nakuru", rating: 4.4, price: "$290", image: hotel13, capacity: "90 guests"},
      {id: 14, name: "Lake Naivasha Resort", location: "Naivasha", rating: 4.3, price: "$270", image: hotel14, capacity: "110 guests"},
      {id: 15, name: "Lake Baringo Club", location: "Baringo", rating: 4.2, price: "$250", image: hotel15, capacity: "80 guests"}
    ]
  }
];