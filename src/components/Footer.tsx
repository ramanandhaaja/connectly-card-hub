
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-connectly-400 to-connectly-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">C</span>
          </div>
          <span className="font-medium text-sm text-gray-900">Connectly</span>
        </div>
        <div className="flex gap-8">
          <Link to="/privacy" className="text-xs text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
          <Link to="/help" className="text-xs text-gray-600 hover:text-gray-900">
            Help Center
          </Link>
        </div>
        <div className="text-xs text-gray-600">
          © 2025 Connectly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
