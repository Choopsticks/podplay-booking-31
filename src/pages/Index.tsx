
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sampleActivity } from "@/lib/activity-data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-sand-light">
      <header className="border-b border-sand-dark/20 bg-white backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-craft-dark">LittleBranch</span>
          </div>
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 transition-colors hover:text-craft-dark">
                  For Educators
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-9 w-16 bg-gray-200 animate-pulse rounded-md"></div>
            ) : user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark"
                  onClick={() => navigate("/auth")}
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-craft hover:bg-craft-dark"
                  onClick={() => navigate("/auth", { state: { isSignUp: true } })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-medium leading-tight text-gray-900 md:text-5xl">
              Enriching learning pods for young explorers
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Connect with expert-led pods designed for children ages 2-8
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" className="bg-craft-dark hover:bg-craft text-white">
                Find Pods
              </Button>
              <Button size="lg" variant="outline" className="border-craft text-craft-dark hover:bg-craft-pastel hover:text-craft-dark">
                Host a Pod
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-center text-3xl font-medium text-gray-900">Featured Activities</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link 
              to={`/activity/${sampleActivity.id}`}
              className="group relative overflow-hidden rounded-xl bg-white"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-h-3 aspect-w-4 relative overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={`${sampleActivity.imageUrls[0]}?w=600&auto=format&q=75`}
                  alt={sampleActivity.title}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}></div>
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full bg-craft-pastel px-3 py-1 text-xs font-medium text-craft-dark">
                  {sampleActivity.ageRange}
                </span>
                <h3 className="mt-4 text-xl font-medium text-gray-900">{sampleActivity.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">with {sampleActivity.instructor}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{sampleActivity.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-medium text-gray-900">${sampleActivity.price}</span>
                  <span className="text-sm text-gray-500">{sampleActivity.duration}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-semibold text-craft-dark">LittleBranch</span>
              <p className="mt-4 text-sm text-gray-600">Connecting families with enriching learning experiences for children.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">About</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Support</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">FAQs</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-craft-dark">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Stay Updated</h3>
              <p className="mt-4 text-sm text-gray-600">Subscribe to our newsletter for new activities and updates.</p>
              <div className="mt-4 flex">
                <input type="email" placeholder="Your email" className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:border-craft focus:outline-none focus:ring-1 focus:ring-craft" />
                <Button className="rounded-l-none rounded-r-md bg-craft hover:bg-craft-dark">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
