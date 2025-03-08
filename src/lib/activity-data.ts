
export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
}

export interface TimeSlot {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  ageRange: string;
  priceRange: string;
  location: string;
  dateRange: string;
  phone: string;
  email: string;
  url: string;
  imageUrls: string[];
  reviews: Review[];
  availableSlots: TimeSlot[];
  categories: string[];
  rating: number;
}

export const sampleActivities: Activity[] = [
  {
    id: 1,
    title: "Manila Ocean Park Adventure",
    description: "Explore marine life with interactive exhibits perfect for curious young minds.",
    longDescription: "Manila Ocean Park offers an immersive underwater journey through various marine habitats. Children can observe diverse aquatic species up close, participate in feeding sessions, and enjoy educational presentations about marine conservation. The park also features touch pools where kids can safely interact with starfish and other gentle sea creatures under supervision. This experience combines entertainment with valuable learning about ocean ecosystems and the importance of protecting our marine environment.",
    ageRange: "3-12 years",
    priceRange: "₱600 - ₱950",
    location: "Rizal Park, Manila",
    dateRange: "Open daily, 10AM - 8PM",
    phone: "+63 2 8567 7777",
    email: "info@manilaoceanpark.com",
    url: "https://www.manilaoceanpark.com",
    imageUrls: [
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      "https://images.unsplash.com/photo-1564144006388-615d45e6f3cd"
    ],
    reviews: [
      {
        id: 1,
        author: "Carlos M.",
        rating: 5,
        comment: "My kids loved the penguin exhibit! Very educational and the staff were extremely friendly.",
        date: "2023-10-15"
      },
      {
        id: 2,
        author: "Janine P.",
        rating: 4,
        comment: "Great place for a family day out. A bit crowded on weekends but worth the visit.",
        date: "2023-09-28"
      },
      {
        id: 3,
        author: "Miguel S.",
        rating: 5,
        comment: "The sea lion show was the highlight for my 6-year-old. We'll definitely come back!",
        date: "2023-11-05"
      }
    ],
    availableSlots: [
      {
        id: 1,
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: 2,
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        startTime: "2:00 PM",
        endTime: "4:00 PM"
      }
    ],
    categories: ["Educational", "Nature", "Indoor"],
    rating: 4.3
  },
  {
    id: 2,
    title: "Art Workshop at Pinto Art Museum",
    description: "Nurture creativity through guided art sessions in a beautiful gallery setting.",
    longDescription: "The Pinto Art Museum's children's workshop provides a creative haven where young artists can express themselves through various mediums. Expert instructors guide participants through age-appropriate art projects including painting, collage-making, and clay sculpture. Set within the museum's serene gardens and surrounded by contemporary Filipino art, children gain inspiration while developing fine motor skills and artistic confidence. Each participant takes home their completed artworks and receives a certificate of participation. All materials are provided and carefully selected for safety.",
    ageRange: "5-14 years",
    priceRange: "₱800 - ₱1,200",
    location: "Antipolo, Rizal",
    dateRange: "Weekends, 9AM - 12PM",
    phone: "+63 2 8697 1015",
    email: "workshops@pintoartmuseum.com",
    url: "https://www.pintoart.org",
    imageUrls: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
      "https://images.unsplash.com/photo-1536924430914-91f9e2041b83"
    ],
    reviews: [
      {
        id: 1,
        author: "Eleanor L.",
        rating: 5,
        comment: "Such a wonderful experience for my daughter. The instructors were patient and encouraging.",
        date: "2023-11-12"
      },
      {
        id: 2,
        author: "Rafael T.",
        rating: 4,
        comment: "Beautiful venue and well-organized workshop. My son created amazing art pieces.",
        date: "2023-10-22"
      }
    ],
    availableSlots: [
      {
        id: 1,
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        startTime: "9:00 AM",
        endTime: "12:00 PM"
      }
    ],
    categories: ["Arts & Crafts", "Educational", "Creative"],
    rating: 4.8
  },
  {
    id: 3,
    title: "Enchanted Kingdom Day Pass",
    description: "Thrilling rides and magical experiences at the Philippines' premier theme park.",
    longDescription: "Enchanted Kingdom offers a full day of excitement and wonder for children of all ages. From gentle carousels for toddlers to adrenaline-pumping roller coasters for older kids, the park provides attractions suited to different age groups and courage levels. Families can enjoy spectacular shows featuring costumed performers, magic acts, and musical productions throughout the day. The park's themed zones transport visitors to different worlds, from a space adventure area to a whimsical fairy tale land. Food outlets and rest areas are conveniently located throughout the park, making it easy to plan a full day visit.",
    ageRange: "All ages",
    priceRange: "₱950 - ₱1,200",
    location: "Santa Rosa, Laguna",
    dateRange: "Weekends and holidays, 10AM - 7PM",
    phone: "+63 2 8830 3535",
    email: "info@enchantedkingdom.ph",
    url: "https://www.enchantedkingdom.ph",
    imageUrls: [
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9",
      "https://images.unsplash.com/photo-1517521481748-c625228a9cf2",
      "https://images.unsplash.com/photo-1560184611-aa3371864a65"
    ],
    reviews: [
      {
        id: 1,
        author: "Diana R.",
        rating: 5,
        comment: "Perfect weekend getaway for the family. The wizard show was spectacular!",
        date: "2023-09-18"
      },
      {
        id: 2,
        author: "Bryan M.",
        rating: 3,
        comment: "Fun rides but long queues during peak hours. Go early to avoid crowds.",
        date: "2023-10-30"
      },
      {
        id: 3,
        author: "Lucia G.",
        rating: 5,
        comment: "My kids had a blast! The Space Shuttle ride was their absolute favorite.",
        date: "2023-11-14"
      }
    ],
    availableSlots: [
      {
        id: 1,
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        startTime: "10:00 AM",
        endTime: "7:00 PM"
      },
      {
        id: 2,
        date: new Date(new Date().setDate(new Date().getDate() + 12)),
        startTime: "10:00 AM",
        endTime: "7:00 PM"
      }
    ],
    categories: ["Amusement Park", "Outdoor", "Entertainment"],
    rating: 4.5
  },
  {
    id: 4,
    title: "Kidzoona Indoor Playground",
    description: "Safe and climate-controlled play areas with soft structures and imaginative zones.",
    longDescription: "Kidzoona provides a weather-proof play solution perfect for toddlers and young children. The soft play areas feature ball pits, slides, climbing structures, and tunnels designed with safety in mind. Role-play zones let children explore different professions through costumes and props, encouraging imaginative play and social skills development. Parents can relax in the comfortable seating areas while maintaining visual contact with their children throughout the facility. The venue is regularly sanitized and features staff supervision to ensure all children play safely and harmoniously.",
    ageRange: "1-8 years",
    priceRange: "₱400 - ₱550",
    location: "Multiple malls across Metro Manila",
    dateRange: "Daily, mall hours",
    phone: "+63 2 8812 9909",
    email: "customerservice@kidzoona.ph",
    url: "https://www.kidzoonaph.com",
    imageUrls: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
      "https://images.unsplash.com/photo-1564429097439-475b37566f5a",
      "https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5"
    ],
    reviews: [
      {
        id: 1,
        author: "Patricia L.",
        rating: 4,
        comment: "Great indoor option during rainy season. My toddler loves the ball pit!",
        date: "2023-08-24"
      },
      {
        id: 2,
        author: "Marvin C.",
        rating: 5,
        comment: "Clean facilities and attentive staff. Worth the entrance fee.",
        date: "2023-10-05"
      }
    ],
    availableSlots: [
      {
        id: 1,
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        startTime: "10:00 AM",
        endTime: "8:00 PM"
      },
      {
        id: 2,
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        startTime: "10:00 AM",
        endTime: "8:00 PM"
      }
    ],
    categories: ["Indoor", "Play Area", "Entertainment"],
    rating: 4.2
  },
  {
    id: 5,
    title: "Mind Museum Science Workshop",
    description: "Hands-on experiments and demonstrations that make science exciting for kids.",
    longDescription: "The Mind Museum's specialized workshops transform complex scientific concepts into accessible, hands-on activities for children. Each session focuses on a specific theme like robotics, chemistry, astronomy, or biology with age-appropriate content. Participants engage in guided experiments using real scientific equipment under the supervision of trained science educators. The museum's state-of-the-art facilities provide an inspiring environment for learning, and the workshops complement the museum's interactive exhibits. These sessions are designed to spark curiosity, develop critical thinking skills, and foster a love for scientific inquiry in a fun, collaborative atmosphere.",
    ageRange: "7-14 years",
    priceRange: "₱750 - ₱1,000",
    location: "BGC, Taguig City",
    dateRange: "Selected weekends, scheduled sessions",
    phone: "+63 2 7909 7691",
    email: "inquiry@themindmuseum.org",
    url: "https://www.themindmuseum.org",
    imageUrls: [
      "https://images.unsplash.com/photo-1567827552311-3b1c447a7d4c",
      "https://images.unsplash.com/photo-1581091019743-b9c2f6b90a06",
      "https://images.unsplash.com/photo-1494059980473-813e73ee784b"
    ],
    reviews: [
      {
        id: 1,
        author: "George T.",
        rating: 5,
        comment: "The robotics workshop was fantastic! My son was engaged the entire time.",
        date: "2023-11-20"
      },
      {
        id: 2,
        author: "Fiona M.",
        rating: 5,
        comment: "Excellent instructors who explained concepts in a kid-friendly way.",
        date: "2023-09-15"
      },
      {
        id: 3,
        author: "Louie K.",
        rating: 4,
        comment: "Well-organized workshop with quality materials. My daughter loved it.",
        date: "2023-10-28"
      }
    ],
    availableSlots: [
      {
        id: 1,
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      },
      {
        id: 2,
        date: new Date(new Date().setDate(new Date().getDate() + 14)),
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      }
    ],
    categories: ["Educational", "Science", "Workshop"],
    rating: 4.7
  }
];

// Method to get a single activity
export const getActivity = (id: number): Activity | undefined => {
  return sampleActivities.find(activity => activity.id === id);
};
