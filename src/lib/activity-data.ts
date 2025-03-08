
import { format, addDays, subDays } from 'date-fns';

export interface TimeSlot {
  id: string;
  time: string;
  date: Date;
  available: boolean;
  // Add these properties to fix TypeScript errors
  totalSlots?: number;
  bookedSlots?: number;
}

export interface Activity {
  id: string;
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
  // Add these properties to fix TypeScript errors
  duration?: string;
  instructor?: string;
  price?: number;
}

// Mock data for our application
export const sampleActivities: Activity[] = [
  {
    id: "1",
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
        bookedSlots: 45
      },
      {
        id: "1-2",
        time: "1:00 PM",
        date: new Date(),
        available: true,
        totalSlots: 100,
        bookedSlots: 60
      }
    ],
    contactInfo: {
      phone: "+63 (49) 541-3535",
      email: "info@enchantedkingdom.ph",
      website: "https://www.enchantedkingdom.ph"
    },
    duration: "Full day",
    instructor: "Various park staff",
    price: 1100
  },
  {
    id: "2",
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
        bookedSlots: 30
      },
      {
        id: "2-2",
        time: "2:00 PM",
        date: addDays(new Date(), 1),
        available: true,
        totalSlots: 80,
        bookedSlots: 25
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8567-7777",
      email: "info@manilaoceanpark.com",
      website: "https://www.manilaoceanpark.com"
    },
    duration: "3-4 hours",
    instructor: "Marine educators",
    price: 990
  },
  {
    id: "3",
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
        id: "3-1",
        time: "10:00 AM",
        date: addDays(new Date(), 2),
        available: true,
        totalSlots: 120,
        bookedSlots: 90
      },
      {
        id: "3-2",
        time: "1:00 PM",
        date: addDays(new Date(), 2),
        available: false,
        totalSlots: 120,
        bookedSlots: 120
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8844-5539",
      email: "manila.inquiry@kidzania.com",
      website: "https://manila.kidzania.com"
    },
    duration: "5 hours",
    instructor: "Role-play supervisors",
    price: 1200
  },
  {
    id: "4",
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
        id: "4-1",
        time: "9:00 AM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 35
      },
      {
        id: "4-2",
        time: "1:00 PM",
        date: addDays(new Date(), 3),
        available: true,
        totalSlots: 100,
        bookedSlots: 55
      }
    ],
    contactInfo: {
      phone: "+63 (2) 7909-6463",
      email: "inquiry@themindmuseum.org",
      website: "https://www.themindmuseum.org"
    },
    duration: "2-3 hours",
    instructor: "Science educators",
    price: 825
  },
  {
    id: "5",
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
        id: "5-1",
        time: "9:00 AM",
        date: addDays(new Date(), 4),
        available: true,
        totalSlots: 20,
        bookedSlots: 12
      }
    ],
    contactInfo: {
      phone: "+63 (2) 8697-1015",
      email: "info@pintoartmuseum.com",
      website: "https://www.facebook.com/pintoartmuseum"
    },
    duration: "3 hours",
    instructor: "Professional artists",
    price: 1000
  },
  {
    id: "6",
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
        id: "6-1",
        time: "8:00 AM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 10
      },
      {
        id: "6-2",
        time: "1:00 PM",
        date: addDays(new Date(), 5),
        available: true,
        totalSlots: 30,
        bookedSlots: 5
      }
    ],
    contactInfo: {
      phone: "+63 (82) 271-2337",
      email: "info@philippineeaglefoundation.org",
      website: "https://www.philippineeaglefoundation.org"
    },
    duration: "1-2 hours",
    instructor: "Wildlife conservationists",
    price: 150
  }
];

