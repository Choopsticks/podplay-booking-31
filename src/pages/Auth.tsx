
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LetterDecoration = ({ letter, color, className, style }: { letter: string; color: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`letter-decoration font-qanelas text-4xl font-bold ${className}`} style={{ color, ...style }}>
    {letter}
  </div>
);

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-light flex flex-col relative overflow-hidden dark:bg-gray-900">
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        {/* Decorative elements */}
        <LetterDecoration letter="K" color="#f06f5d" className="top-20 left-[15%]" style={{ '--rotation': '-15deg', '--delay': '0s' } as React.CSSProperties} />
        <LetterDecoration letter="I" color="#425e9c" className="top-40 right-[20%]" style={{ '--rotation': '10deg', '--delay': '0.5s' } as React.CSSProperties} />
        <LetterDecoration letter="D" color="#ad59b0" className="bottom-32 left-[25%]" style={{ '--rotation': '8deg', '--delay': '1s' } as React.CSSProperties} />
        <LetterDecoration letter="S" color="#41dbbe" className="bottom-20 right-[25%]" style={{ '--rotation': '-5deg', '--delay': '1.5s' } as React.CSSProperties} />
        
        <div className="container max-w-md mx-auto py-12 px-6 relative z-10">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-kidsgo-brown/10 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-qanelas font-bold text-kidsgo-brown dark:text-white">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h1>
              <p className="text-kidsgo-brown/70 mt-2 dark:text-gray-300">
                {isSignUp
                  ? "Join KidsGo to discover amazing kid-friendly activities"
                  : "Sign in to continue with KidsGo Philippines"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-kidsgo-brown dark:text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-kidsgo-brown/20 focus:border-kidsgo-brown focus:ring-kidsgo-brown rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-kidsgo-brown dark:text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-kidsgo-brown/20 focus:border-kidsgo-brown focus:ring-kidsgo-brown rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-kidsgo-brown hover:bg-kidsgo-brown/90 text-white rounded-full"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-kidsgo-coral hover:underline dark:text-kidsgo-coral"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
