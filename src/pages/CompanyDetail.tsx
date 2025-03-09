import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCompany, getActivitiesByCompany, Company, Activity } from "@/lib/activity-data";
import { MapPin, Phone, Mail, Globe, ChevronRight, Filter, Users, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const companyData = getCompany(id);
      const activitiesData = getActivitiesByCompany(id);
      
      setCompany(companyData);
      setActivities(activitiesData);
      setFilteredActivities(activitiesData);
      
      // Extract unique categories
      const categories = activitiesData.flatMap(activity => activity.categories);
      setUniqueCategories([...new Set(categories)]);
    }
  }, [id]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
        activities.filter(activity => 
          activity.categories.some(category => selectedCategories.includes(category))
        )
      );
    }
  }, [selectedCategories, activities]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  if (!company) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-craft-dark mb-4">Company Not Found</h1>
        <p className="text-gray-600 mb-8">The company you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-light/10">
      {/* Company Banner */}
      <div className="relative w-full h-[300px] bg-craft-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url(${company.logo})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-craft-dark/90" />
        <div className="container mx-auto h-full flex items-end pb-10 relative z-10">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{company.name}</h1>
            <div className="flex items-center mt-2">
              <MapPin size={18} className="mr-1" />
              <span>{company.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Information */}
          <div className="md:w-1/3 space-y-6">
            <Card className="p-6 bg-white border-craft-light shadow-sm">
              <h2 className="text-2xl font-semibold text-craft-dark mb-4">About {company.name}</h2>
              <p className="text-gray-700 mb-6">{company.description}</p>
              
              <h3 className="text-lg font-medium text-craft-dark mb-3">Contact Information</h3>
              <ul className="space-y-3">
                {company.contactInfo.phone && (
                  <li className="flex items-center">
                    <Phone size={18} className="text-craft-dark mr-2" />
                    <span>{company.contactInfo.phone}</span>
                  </li>
                )}
                {company.contactInfo.email && (
                  <li className="flex items-center">
                    <Mail size={18} className="text-craft-dark mr-2" />
                    <span>{company.contactInfo.email}</span>
                  </li>
                )}
                {company.contactInfo.website && (
                  <li className="flex items-center">
                    <Globe size={18} className="text-craft-dark mr-2" />
                    <a 
                      href={company.contactInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-craft-blue hover:underline"
                    >
                      {company.contactInfo.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-craft-dark mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {company.categories.map((category, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline"
                      className="bg-craft-pastel text-craft-dark border-craft-light"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Activities List */}
          <div className="md:w-2/3">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-craft-dark">
                Activities & Programs
                <span className="ml-2 text-lg font-normal text-gray-500">
                  ({filteredActivities.length})
                </span>
              </h2>
              
              <div className="relative inline-block">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-white border-craft-light"
                >
                  <Filter size={16} />
                  <span>Filter by Category</span>
                </Button>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-craft-light p-3">
                  <div className="flex flex-col gap-2">
                    {uniqueCategories.map(category => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded border-craft-light text-craft-primary focus:ring-craft-primary"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredActivities.map(activity => (
                  <Link 
                    key={activity.id} 
                    to={`/activity/${activity.id}`}
                    className="block"
                  >
                    <Card className="overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow bg-white border-craft-light">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img 
                          src={activity.imageUrls[0]} 
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-craft-dark mb-2">{activity.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {activity.categories.slice(0, 3).map((category, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline"
                                className="bg-craft-pastel/50 text-craft-dark border-craft-light"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center">
                              <Users size={16} className="text-craft-dark mr-2" />
                              <span>{activity.ageRange}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign size={16} className="text-craft-dark mr-2" />
                              <span>{activity.priceRange}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={16} className="text-craft-dark mr-2" />
                              <span>{activity.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="text-craft-dark mr-2" />
                              <span>{activity.duration || "Varies"}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button 
                            variant="outline" 
                            className="text-craft-dark border-craft-light flex items-center gap-1"
                          >
                            <span>View Details</span>
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 text-center rounded-lg border border-craft-light">
                <h3 className="text-xl font-semibold text-craft-dark mb-3">No Activities Found</h3>
                <p className="text-gray-600 mb-4">
                  There are no activities matching your selected filters. Try adjusting your filter criteria.
                </p>
                {selectedCategories.length > 0 && (
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCategories([])}
                    className="text-craft-dark border-craft-light"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
