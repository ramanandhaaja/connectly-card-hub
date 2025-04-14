
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-connectly-400 to-connectly-600 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Connectly</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/cards" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              My Cards
            </Link>
            <Link to="/analytics" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/create">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Card
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
