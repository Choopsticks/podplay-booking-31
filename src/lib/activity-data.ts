
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
  totalSlots: number;
  bookedSlots: number;
}

export interface Activity {
  id: number;
  title: string;
  ageRange: string;
  price: number;
  duration: string;
  instructor: string;
  description: string;
  longDescription: string;
  materials: string[];
  benefits: string[];
  imageUrls: string[];
  reviews: Review[];
  availableSlots: TimeSlot[];
}

export const sampleActivity: Activity = {
  id: 1,
  title: "Paper Arts and Crafts",
  ageRange: "2-4 years",
  price: 25,
  duration: "45 minutes",
  instructor: "Ms. Sophie",
  description: "Engage your child's creativity with fun paper crafting activities designed specifically for little hands.",
  longDescription: "Our Paper Arts and Crafts sessions are thoughtfully designed to foster creative thinking and fine motor skills development in young children. Each week features a new theme, introducing children to various paper manipulation techniques like folding, tearing, cutting with safety scissors, and gluing. All activities are age-appropriate and supervised by experienced early childhood educators. Children will create beautiful take-home projects while developing concentration, coordination, and social skills in a supportive group environment.",
  materials: [
    "Child-safe scissors",
    "Eco-friendly paper",
    "Non-toxic glue",
    "Washable markers",
    "Reusable craft materials"
  ],
  benefits: [
    "Develops fine motor skills",
    "Enhances creativity and imagination",
    "Builds concentration and focus",
    "Introduces basic concepts of shapes and colors",
    "Fosters social interaction in a group setting"
  ],
  imageUrls: [
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
  ],
  reviews: [
    {
      id: 1,
      author: "Emma T.",
      rating: 5,
      comment: "My daughter absolutely loves these craft sessions! Ms. Sophie is so patient and kind with the children.",
      date: "2023-10-15"
    },
    {
      id: 2,
      author: "Michael J.",
      rating: 4,
      comment: "Great activities for little ones. My son looks forward to the pod each week.",
      date: "2023-09-28"
    },
    {
      id: 3,
      author: "Sarah P.",
      rating: 5,
      comment: "Beautifully organized sessions with just the right amount of structure and free exploration for toddlers.",
      date: "2023-11-05"
    }
  ],
  availableSlots: [
    {
      id: 1,
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 3
    },
    {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "11:15 AM",
      endTime: "12:00 PM",
      totalSlots: 8,
      bookedSlots: 5
    },
    {
      id: 3,
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      startTime: "09:30 AM",
      endTime: "10:15 AM",
      totalSlots: 8,
      bookedSlots: 2
    },
    {
      id: 4,
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 6
    },
    {
      id: 5,
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 1
    },
    {
      id: 6,
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      startTime: "09:30 AM",
      endTime: "10:15 AM",
      totalSlots: 8,
      bookedSlots: 4
    },
    {
      id: 7,
      date: new Date(new Date().setDate(new Date().getDate() + 6)),
      startTime: "11:00 AM",
      endTime: "11:45 AM",
      totalSlots: 8,
      bookedSlots: 0
    },
    {
      id: 8,
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 3
    },
    {
      id: 9,
      date: new Date(new Date().setDate(new Date().getDate() + 9)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 5
    },
    {
      id: 10,
      date: new Date(new Date().setDate(new Date().getDate() + 12)),
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      totalSlots: 8,
      bookedSlots: 2
    }
  ]
};
