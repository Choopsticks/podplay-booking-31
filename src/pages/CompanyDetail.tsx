
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  getCompany, 
  getActivitiesByCompany, 
  Company, 
  Activity 
} from "@/lib/activity-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Filter 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = getCompany(id);
  const allActivities = getActivitiesByCompany(id);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get unique categories across all activities
  const uniqueCategories = Array.from(
    new Set(allActivities.flatMap(activity => activity.categories))
  ).sort();
  
  // Filter activities based on selected category
  const filteredActivities = selectedCategory
    ? allActivities.filter(activity => 
        activity.categories.includes(selectedCategory)
      )
    : allActivities;

  if (!company) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
        <p className="mb-8">The company you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  // Helper function to get category color class
  const getCategoryColorClass = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Theme Park": "bg-craft-coral/20 text-craft-coral hover:bg-craft-coral/30",
      "Educational": "bg-craft-blue/20 text-craft-blue hover:bg-craft-blue/30",
      "Arts & Crafts": "bg-craft-purple/20 text-craft-purple hover:bg-craft-purple/30",
      "Outdoor": "bg-craft-green/20 text-craft-green hover:bg-craft-green/30",
      "Indoor": "bg-craft-yellow/20 text-craft-yellow hover:bg-craft-yellow/30",
      "Wildlife": "bg-craft-teal/20 text-craft-teal hover:bg-craft-teal/30",
      "Entertainment": "bg-craft-pink/20 text-craft-pink hover:bg-craft-pink/30",
      "Role-play": "bg-craft-purple/20 text-craft-purple hover:bg-craft-purple/30",
      "Science": "bg-craft-blue/20 text-craft-blue hover:bg-craft-blue/30",
      "Museum": "bg-craft-teal/20 text-craft-teal hover:bg-craft-teal/30",
      "Marine Life": "bg-craft-blue/20 text-craft-blue hover:bg-craft-blue/30",
      "Family": "bg-craft-yellow/20 text-craft-yellow hover:bg-craft-yellow/30",
    };
    
    return categoryMap[category] || "bg-gray-200 text-gray-700 hover:bg-gray-300";
  };

  const handleContactClick = (type: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Contact Information Copied",
        description: `${value} has been copied to your clipboard.`,
        duration: 3000,
      });
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      {/* Company Banner */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-craft-dark to-craft-dark/80 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-60 bg-black flex items-center">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{company.name}</h1>
              <div className="flex items-center mb-4">
                <MapPin className="text-white mr-2" size={18} />
                <span className="text-white">{company.location}</span>
                <span className="mx-2 text-white">•</span>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" size={18} />
                  <span className="text-white">{company.rating.toFixed(1)}</span>
                  <span className="text-white ml-1">({company.reviewCount} reviews)</span>
                </div>
              </div>
              <p className="text-white text-opacity-90 text-lg max-w-xl">{company.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        {/* Company Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {company.description}
                </p>

                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.categories.map((category) => (
                      <Badge key={category} variant="outline" className={getCategoryColorClass(category)}>
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.contactInfo.phone && (
                  <div 
                    className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
                    onClick={() => handleContactClick("phone", company.contactInfo.phone!)}
                  >
                    <Phone className="mr-3 text-craft-dark" size={18} />
                    <span>{company.contactInfo.phone}</span>
                  </div>
                )}
                
                {company.contactInfo.email && (
                  <div 
                    className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
                    onClick={() => handleContactClick("email", company.contactInfo.email!)}
                  >
                    <Mail className="mr-3 text-craft-dark" size={18} />
                    <span>{company.contactInfo.email}</span>
                  </div>
                )}
                
                {company.contactInfo.website && (
                  <div 
                    className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
                    onClick={() => handleContactClick("website", company.contactInfo.website!)}
                  >
                    <Globe className="mr-3 text-craft-dark" size={18} />
                    <span>{company.contactInfo.website}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click on any contact information to copy to clipboard
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Activities Section */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Programs & Activities
            </h2>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <Filter size={20} className="mr-2 text-craft-dark" />
              <span className="mr-3">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Badge>
                
                {uniqueCategories.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1 ${selectedCategory === category ? 'bg-craft-dark text-white' : getCategoryColorClass(category)}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No activities found</h3>
              <p className="text-gray-500 mb-4">Try selecting a different category filter</p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                Show All Activities
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  getCategoryColorClass={getCategoryColorClass}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ActivityCardProps {
  activity: Activity;
  getCategoryColorClass: (category: string) => string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, getCategoryColorClass }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-transform hover:shadow-lg hover:scale-[1.01]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={activity.imageUrls[0]} 
          alt={activity.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex flex-wrap gap-1">
            {activity.categories.slice(0, 2).map(category => (
              <Badge key={category} className={getCategoryColorClass(category)}>
                {category}
              </Badge>
            ))}
            {activity.categories.length > 2 && (
              <Badge variant="secondary">+{activity.categories.length - 2}</Badge>
            )}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2">{activity.title}</CardTitle>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Calendar className="mr-1" size={14} />
          <span>{activity.dateRange}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {activity.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span>{activity.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">({activity.reviewCount})</span>
          </div>
          <div className="text-craft-dark font-semibold">
            {activity.priceRange}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <Link to={`/activity/${activity.id}`} className="w-full">
          <Button className="w-full bg-craft-dark hover:bg-craft-dark/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanyDetail;
