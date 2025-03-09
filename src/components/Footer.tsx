
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LetterDecoration = ({ letter, color, className, style }: { letter: string; color: string; className?: string; style?: React.CSSProperties }) => (
  <div className={`letter-decoration font-qanelas text-4xl font-bold ${className}`} style={{ color, ...style }}>
    {letter}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-sand-light dark:bg-gray-800 py-12 border-t border-kidsgo-brown/10 dark:border-gray-700 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <span className="text-xl font-qanelas font-extrabold">
              <span className="text-kidsgo-brown">Kids</span><span className="text-kidsgo-coral">Go</span> <span className="text-kidsgo-purple text-base font-semibold">Philippines</span>
            </span>
            <p className="mt-4 text-sm text-kidsgo-brown/70 dark:text-gray-300">Connecting families with enriching experiences for children across the Philippines.</p>
          </div>
          <div>
            <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Explore</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Popular Activities</Link></li>
              <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">By Location</a></li>
              <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">By Category</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Contact Us</a></li>
              <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">FAQs</a></li>
              <li><a href="#" className="text-sm text-kidsgo-brown/70 dark:text-gray-300 hover:text-kidsgo-coral dark:hover:text-kidsgo-coral">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-qanelas font-bold text-kidsgo-brown dark:text-white">Stay Updated</h3>
            <p className="mt-4 text-sm text-kidsgo-brown/70 dark:text-gray-300">Subscribe to our newsletter for new activities and updates.</p>
            <div className="mt-4 flex">
              <Input type="email" placeholder="Your email" className="w-full rounded-l-full dark:bg-gray-700 dark:border-gray-600 border-kidsgo-brown/20" />
              <Button className="rounded-l-none rounded-r-full bg-kidsgo-coral hover:bg-kidsgo-coral/90 dark:bg-kidsgo-coral dark:hover:bg-kidsgo-coral/90">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <LetterDecoration letter="P" color="#f06f5d" className="bottom-10 right-[8%]" style={{ '--rotation': '12deg', '--delay': '0.7s' } as React.CSSProperties} />
      <LetterDecoration letter="Q" color="#425e9c" className="bottom-32 left-[10%]" style={{ '--rotation': '-8deg', '--delay': '1.2s' } as React.CSSProperties} />
    </footer>
  );
};

export default Footer;
