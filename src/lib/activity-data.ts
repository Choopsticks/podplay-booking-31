
import { format, addDays, subDays } from 'date-fns';

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  date: Date;
  available: boolean;
  totalSlots?: number;
  bookedSlots?: number;
  startTime?: string;
  endTime?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  categories: string[];
}

export interface Activity {
  id: string;
  companyId: string;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  imageUrls: string[];
  rating: number;
  reviewCount: number;
  categories: string[];
  ageRange: string;
  priceRange: string;
  dateRange: string;
  timeSlots?: TimeSlot[];
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  duration?: string;
  instructor?: string;
  price?: number;
  reviews: Review[];
  phone?: string;
  email?: string;
  url?: string;
  availableSlots?: TimeSlot[];
}

// Sample reviews data that can be used across activities
const sampleReviews: Review[] = [
  {
    id: 1,
    author: "Maria Santos",
    date: "March 5, 2023",
    rating: 5,
    comment: "My kids had an amazing time! The staff was very attentive and the activities were perfect for their age. We'll definitely return!"
  },
  {
    id: 2,
    author: "Juan Reyes",
    date: "February 20, 2023",
    rating: 4,
    comment: "Great experience overall. The place was clean and well-maintained. My only suggestion would be more food options."
  },
  {
    id: 3,
    author: "Ana Gomez",
    date: "January 15, 2023",
    rating: 5,
    comment: "This was our third visit and it gets better every time. The new activities they've added are fantastic!"
  },
  {
    id: 4,
    author: "Miguel Lim",
    date: "December 28, 2022",
    rating: 3,
    comment: "The activities were good but it was too crowded when we visited. Maybe consider limiting the number of visitors during peak days."
  }
];

// Companies data
export const sampleCompanies: Company[] = [
  {
    id: "comp1",
    name: "Enchanted Kingdom",
    logo: "https://images.unsplash.com/photo-1570825926767-f471bef300c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "The Philippines' premier theme park offering magical fun for the whole family.",
    location: "Santa Rosa, Laguna",
    rating: 4.7,
    reviewCount: 1283,
    contactInfo: {
      phone: "+63 (49) 541-3535",
      email: "info@enchantedkingdom.ph",
      website: "https://www.enchantedkingdom.ph"
    },
    categories: ["Theme Park", "Entertainment", "Family"]
  },
  {
    id: "comp2",
    name: "Manila Ocean Park",
    logo: "https://images.unsplash.com/photo-1574068861413-5c91f3d36899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "An oceanarium and marine-themed park in Manila offering educational marine life experiences.",
    location: "Manila",
    rating: 4.3,
    reviewCount: 876,
    contactInfo: {
      phone: "+63 (2) 8567-7777",
      email: "info@manilaoceanpark.com",
      website: "https://www.manilaoceanpark.com"
    },
    categories: ["Oceanarium", "Educational", "Marine Life"]
  },
  {
    id: "comp3",
    name: "KidZania Manila",
    logo: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "An interactive children's city combining inspiration, fun and learning through realistic role-play.",
    location: "Bonifacio Global City, Taguig",
    rating: 4.5,
    reviewCount: 754,
    contactInfo: {
      phone: "+63 (2) 8844-5539",
      email: "manila.inquiry@kidzania.com",
      website: "https://manila.kidzania.com"
    },
    categories: ["Educational", "Role-play", "Interactive"]
  },
  {
    id: "comp4",
    name: "Mind Museum",
    logo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "The first world-class science museum in the Philippines with over 250 interactive exhibits.",
    location: "Bonifacio Global City, Taguig",
    rating: 4.6,
    reviewCount: 643,
    contactInfo: {
      phone: "+63 (2) 7909-6463",
      email: "inquiry@themindmuseum.org",
      website: "https://www.themindmuseum.org"
    },
    categories: ["Science", "Educational", "Museum"]
  },
  {
    id: "comp5",
    name: "Pinto Art Museum",
    logo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Contemporary art museum featuring Filipino art in a beautiful garden setting.",
    location: "Antipolo, Rizal",
    rating: 4.8,
    reviewCount: 412,
    contactInfo: {
      phone: "+63 (2) 8697-1015",
      email: "info@pintoartmuseum.com",
      website: "https://www.facebook.com/pintoartmuseum"
    },
    categories: ["Art", "Museum", "Cultural"]
  },
  {
    id: "comp6",
    name: "Philippine Eagle Center",
    logo: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Conservation breeding facility focused on the endangered Philippine Eagle.",
    location: "Davao City",
    rating: 4.9,
    reviewCount: 328,
    contactInfo: {
      phone: "+63 (82) 271-2337",
      email: "info@philippineeaglefoundation.org",
      website: "https://www.philippineeaglefoundation.org"
    },
    categories: ["Wildlife", "Conservation", "Educational"]
  }
];

// Mock data for our application
export const sampleActivities: Activity[] = [
  {
    id: "1",
    companyId: "comp1",
    title: "Enchanted Kingdom Adventure",
    description: "Experience magical rides and attractions perfect for kids of all ages at the Philippines' premier theme park.",
    longDescription: "Enchanted Kingdom is the first and only world-class theme park in the Philippines where guests of all ages can experience magical fun. With over 20 rides and attractions spread across 7 themed zones, children will be thrilled by everything from gentle carousels to exciting roller coasters. The park also features spectacular shows, a 4D theater, and interactive experiences designed especially for families. Located in Santa Rosa, Laguna, this award-winning attraction has been delighting visitors for over 25 years with its unique blend of entertainment, education, and Filipino culture.",
    location: "Santa Rosa, Laguna",
    imageUrls: [
      "https://images.unsplash.com/photo-1570825926767-f471bef300c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.7,
    reviewCount: 1283,
    categories: ["Theme Park", "Outdoor", "Family"],
    ageRange: "Ages 3-15",
    priceRange: "₱950 - ₱1,100 per person",
    dateRange: "Open daily, 10AM - 7PM",
    timeSlots: [
      {
        id: "1-1",
        time: "10:00 AM",
        date: new Date(),
        available: true,
        totalSlots: 100,
        bookedSlots: 45,
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "1-2",
        time: "1:00 PM",
        date: new Date(),
        available: true,
        totalSlots: 100,
        bookedSlots: 60,
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "1-1",
        time: "10:00 AM",
        date: new Date(),
        available: true,
        totalSlots: 100,
        bookedSlots: 45,
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "1-2",
        time: "1:00 PM",
        date: new Date(),
        available: true,
        totalSlots: 100,
        bookedSlots: 60,
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (49) 541-3535",
      email: "info@enchantedkingdom.ph",
      website: "https://www.enchantedkingdom.ph"
    },
    duration: "Full day",
    instructor: "Various park staff",
    price: 1100,
    reviews: [...sampleReviews],
    phone: "+63 (49) 541-3535",
    email: "info@enchantedkingdom.ph",
    url: "https://www.enchantedkingdom.ph"
  },
  {
    id: "2",
    companyId: "comp2",
    title: "Manila Ocean Park Tour",
    description: "Discover marine life and underwater wonders at this oceanarium complex in the heart of Manila.",
    longDescription: "Manila Ocean Park is a world-class marine theme park and premier educational facility located behind the Quirino Grandstand at Rizal Park in Manila. The oceanarium features thousands of marine creatures from around 300 species indigenous to the Philippines and Southeast Asia. Children can explore different sections including the Oceanarium, Jellies Exhibit, Sea Lion Show, and the Birds of Prey Kingdom. Interactive experiences like the Fish Spa, Shark Encounter, and Mermaid Swim Experience make learning about marine conservation both fun and educational. The park's prime location offers stunning views of Manila Bay, especially during sunset.",
    location: "Manila",
    imageUrls: [
      "https://images.unsplash.com/photo-1574068861413-5c91f3d36899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    ],
    rating: 4.3,
    reviewCount: 876,
    categories: ["Educational", "Indoor", "Marine Life"],
    ageRange: "Ages 2-12",
    priceRange: "₱700 - ₱990 per person",
    dateRange: "Open daily, 10AM - 8PM",
    timeSlots: [
      {
        id: "2-1",
        time: "10:00 AM",
        date: addDays(new Date(), 1),
        available: true,
        totalSlots: 80,
        bookedSlots: 30,
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "2-2",
        time: "2:00 PM",
        date: addDays(new Date(), 1),
        available: true,
        totalSlots: 80,
        bookedSlots: 25,
        startTime: "2:00 PM",
        endTime: "4:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "2-1",
        time: "10:00 AM",
        date: addDays(new Date(), 1),
        available: true,
        totalSlots: 80,
        bookedSlots: 30,
        startTime: "10:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "2-2",
        time: "2:00 PM",
        date: addDays(new Date(), 1),
        available: true,
        totalSlots: 80,
        bookedSlots: 25,
        startTime: "2:00 PM",
        endTime: "4:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8567-7777",
      email: "info@manilaoceanpark.com",
      website: "https://www.manilaoceanpark.com"
    },
    duration: "3-4 hours",
    instructor: "Marine educators",
    price: 990,
    reviews: [...sampleReviews],
    phone: "+63 (2) 8567-7777",
    email: "info@manilaoceanpark.com",
    url: "https://www.manilaoceanpark.com"
  },
  {
    id: "3",
    companyId: "comp2",
    title: "Behind the Scenes Aquarium Tour",
    description: "Exclusive access to the behind-the-scenes areas of Manila Ocean Park's aquarium operations.",
    longDescription: "This special tour gives children and families a unique opportunity to see how Manila Ocean Park operates behind the scenes. Participants will learn about water filtration systems, animal care routines, and food preparation for the various marine creatures. The tour includes a visit to research facilities where conservation efforts are developed and monitored. A marine biologist guide provides in-depth information about the park's role in marine conservation and rehabilitation programs. This educational experience is perfect for curious minds who want to understand the science and dedication required to maintain a world-class aquarium.",
    location: "Manila",
    imageUrls: [
      "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    ],
    rating: 4.7,
    reviewCount: 152,
    categories: ["Educational", "Indoor", "Marine Life"],
    ageRange: "Ages 8-16",
    priceRange: "₱1,200 per person",
    dateRange: "Weekends only, 9AM - 11AM",
    timeSlots: [
      {
        id: "3-1",
        time: "9:00 AM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 15,
        bookedSlots: 8,
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      }
    ],
    availableSlots: [
      {
        id: "3-1",
        time: "9:00 AM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 15,
        bookedSlots: 8,
        startTime: "9:00 AM",
        endTime: "11:00 AM"
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8567-7777",
      email: "tours@manilaoceanpark.com",
      website: "https://www.manilaoceanpark.com/tours"
    },
    duration: "2 hours",
    instructor: "Marine Biologist",
    price: 1200,
    reviews: [...sampleReviews],
    phone: "+63 (2) 8567-7777",
    email: "tours@manilaoceanpark.com",
    url: "https://www.manilaoceanpark.com/tours"
  },
  {
    id: "4",
    companyId: "comp3",
    title: "Kidzania Manila Experience",
    description: "A child-sized city where kids can role-play various professions and learn through interactive experiences.",
    longDescription: "KidZania is an interactive children's city that combines inspiration, fun, and learning through realistic role-play. Children can independently explore a scaled city environment with over 65 establishments including a hospital, fire station, bank, radio station, and more. Each venue offers real-life activities where kids can role-play different professions, earn KidZos (KidZania's official currency), and learn the fundamentals of financial literacy. The experience helps develop key skills such as independence, decision-making, and social skills in a fun and safe environment. Located at Park Triangle, Bonifacio Global City, KidZania Manila is perfect for children aged 4-14 who want to try what it's like to be a grown-up for a day.",
    location: "Bonifacio Global City, Taguig",
    imageUrls: [
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.5,
    reviewCount: 754,
    categories: ["Educational", "Indoor", "Role-play"],
    ageRange: "Ages 4-14",
    priceRange: "₱900 - ₱1,200 per child",
    dateRange: "Wed-Sun, 10AM - 4PM",
    timeSlots: [
      {
        id: "4-1",
        time: "10:00 AM",
        date: addDays(new Date(), 2),
        available: true,
        totalSlots: 120,
        bookedSlots: 90,
        startTime: "10:00 AM",
        endTime: "3:00 PM"
      },
      {
        id: "4-2",
        time: "1:00 PM",
        date: addDays(new Date(), 2),
        available: false,
        totalSlots: 120,
        bookedSlots: 120,
        startTime: "1:00 PM",
        endTime: "6:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "4-1",
        time: "10:00 AM",
        date: addDays(new Date(), 2),
        available: true,
        totalSlots: 120,
        bookedSlots: 90,
        startTime: "10:00 AM",
        endTime: "3:00 PM"
      },
      {
        id: "4-2",
        time: "1:00 PM",
        date: addDays(new Date(), 2),
        available: false,
        totalSlots: 120,
        bookedSlots: 120,
        startTime: "1:00 PM",
        endTime: "6:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8844-5539",
      email: "manila.inquiry@kidzania.com",
      website: "https://manila.kidzania.com"
    },
    duration: "5 hours",
    instructor: "Role-play supervisors",
    price: 1200,
    reviews: [...sampleReviews],
    phone: "+63 (2) 8844-5539",
    email: "manila.inquiry@kidzania.com",
    url: "https://manila.kidzania.com"
  },
  {
    id: "5",
    companyId: "comp4",
    title: "Mind Museum Scientific Adventure",
    description: "Interactive science museum with hands-on exhibits that make learning fun for curious young minds.",
    longDescription: "The Mind Museum is the first world-class science museum in the Philippines dedicated to providing an extraordinary educational experience. The museum features over 250 interactive exhibits spread across five main galleries: Atom, Life, Universe, Earth, and Technology. Each gallery offers hands-on activities that explain scientific concepts in fun, accessible ways for children. Highlights include the T-Rex fossil replica, human brain model you can walk through, planetarium shows, and regular science demonstrations. The outdoor Science in the Park area provides additional play-based learning opportunities. Located at Bonifacio Global City, Taguig, The Mind Museum makes science exciting and accessible for children of all ages.",
    location: "Bonifacio Global City, Taguig",
    imageUrls: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.6,
    reviewCount: 643,
    categories: ["Educational", "Indoor", "Science"],
    ageRange: "Ages 6-16",
    priceRange: "₱750 - ₱825 per person",
    dateRange: "Tue-Sun, 9AM - 6PM",
    timeSlots: [
      {
        id: "5-1",
        time: "9:00 AM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 35,
        startTime: "9:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "5-2",
        time: "1:00 PM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 55,
        startTime: "1:00 PM",
        endTime: "4:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "5-1",
        time: "9:00 AM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 35,
        startTime: "9:00 AM",
        endTime: "12:00 PM"
      },
      {
        id: "5-2",
        time: "1:00 PM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 55,
        startTime: "1:00 PM",
        endTime: "4:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (2) 7909-6463",
      email: "inquiry@themindmuseum.org",
      website: "https://www.themindmuseum.org"
    },
    duration: "2-3 hours",
    instructor: "Science educators",
    price: 825,
    reviews: [...sampleReviews],
    phone: "+63 (2) 7909-6463",
    email: "inquiry@themindmuseum.org",
    url: "https://www.themindmuseum.org"
  },
  {
    id: "6",
    companyId: "comp5",
    title: "Art Class at Pinto Art Museum",
    description: "Creative art workshops for kids among the beautiful gardens and galleries of this contemporary art museum.",
    longDescription: "Pinto Art Museum offers specialized art workshops for children set within its stunning Spanish-inspired architecture and lush gardens in Antipolo. These workshops are designed to nurture creativity and artistic expression in young minds through various mediums including painting, sculpture, and mixed media. Professional artists guide children through age-appropriate projects that introduce them to different art techniques while encouraging personal expression. Between creative sessions, families can explore the museum's extensive collection of contemporary Filipino art displayed across multiple galleries and garden spaces. The serene environment provides both inspiration and a chance to appreciate nature, making it a holistic creative experience for children.",
    location: "Antipolo, Rizal",
    imageUrls: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    ],
    rating: 4.8,
    reviewCount: 412,
    categories: ["Arts & Crafts", "Educational", "Outdoor"],
    ageRange: "Ages 5-12",
    priceRange: "₱850 - ₱1,000 per child",
    dateRange: "Saturdays, 9AM - 12PM",
    timeSlots: [
      {
        id: "6-1",
        time: "9:00 AM",
        date: addDays(new Date(), 4),
        available: true,
        totalSlots: 20,
        bookedSlots: 12,
        startTime: "9:00 AM",
        endTime: "12:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "6-1",
        time: "9:00 AM",
        date: addDays(new Date(), 4),
        available: true,
        totalSlots: 20,
        bookedSlots: 12,
        startTime: "9:00 AM",
        endTime: "12:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8697-1015",
      email: "info@pintoartmuseum.com",
      website: "https://www.facebook.com/pintoartmuseum"
    },
    duration: "3 hours",
    instructor: "Professional artists",
    price: 1000,
    reviews: [...sampleReviews],
    phone: "+63 (2) 8697-1015",
    email: "info@pintoartmuseum.com",
    url: "https://www.facebook.com/pintoartmuseum"
  },
  {
    id: "7",
    companyId: "comp6",
    title: "Philippine Eagle Center Tour",
    description: "Educational wildlife experience focusing on conservation of the endangered Philippine Eagle and other species.",
    longDescription: "The Philippine Eagle Center offers a unique opportunity for children to learn about wildlife conservation while observing the majestic Philippine Eagle – one of the largest and rarest eagles in the world. Located in Davao City, this 8-hectare center serves as a conservation breeding facility and nature park that's home to over 30 Philippine Eagles and other indigenous animals. Guided tours educate visitors about the eagles' behavior, habitat, and the conservation efforts to protect this critically endangered species. Children can observe these magnificent birds up close in naturalistic enclosures, learn about their role in the ecosystem, and understand the importance of protecting Philippine biodiversity. The center also features forest trails where families might spot wild birds and other native wildlife.",
    location: "Davao City",
    imageUrls: [
      "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    rating: 4.9,
    reviewCount: 328,
    categories: ["Educational", "Wildlife", "Outdoor"],
    ageRange: "Ages 5+",
    priceRange: "₱150 per person",
    dateRange: "Mon-Sun, 8AM - 5PM",
    timeSlots: [
      {
        id: "7-1",
        time: "8:00 AM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 10,
        startTime: "8:00 AM",
        endTime: "10:00 AM"
      },
      {
        id: "7-2",
        time: "1:00 PM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 5,
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      }
    ],
    availableSlots: [
      {
        id: "7-1",
        time: "8:00 AM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 10,
        startTime: "8:00 AM",
        endTime: "10:00 AM"
      },
      {
        id: "7-2",
        time: "1:00 PM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 5,
        startTime: "1:00 PM",
        endTime: "3:00 PM"
      }
    ],
    contactInfo: {
      phone: "+63 (82) 271-2337",
      email: "info@philippineeaglefoundation.org",
      website: "https://www.philippineeaglefoundation.org"
    },
    duration: "1-2 hours",
    instructor: "Wildlife conservationists",
    price: 150,
    reviews: [...sampleReviews],
    phone: "+63 (82) 271-2337",
    email: "info@philippineeaglefoundation.org",
    url: "https://www.philippineeaglefoundation.org"
  }
];

// Helper function to get an activity by ID
export function getActivity(id: string | number | undefined): Activity | undefined {
  if (!id) return undefined;
  // Convert number ID to string if needed
  const stringId = typeof id === 'number' ? id.toString() : id;
  return sampleActivities.find(activity => activity.id === stringId);
}

// Helper function to get a company by ID
export function getCompany(id: string | undefined): Company | undefined {
  if (!id) return undefined;
  return sampleCompanies.find(company => company.id === id);
}

// Helper function to get activities by company ID
export function getActivitiesByCompany(companyId: string | undefined): Activity[] {
  if (!companyId) return [];
  return sampleActivities.filter(activity => activity.companyId === companyId);
}

// dayzed extension - adding the type for ExtendedDateObj
export interface ExtendedDateObj {
  date: Date;
  selected: boolean;
  selectable: boolean;
  today: boolean;
  prevMonth: boolean;
  nextMonth: boolean;
  getDateProps: (props?: any) => any;
}
