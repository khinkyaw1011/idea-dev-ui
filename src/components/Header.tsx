import { Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <span>IdeaDrop</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-4 items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Ideas
          </Link>
          <Link
            to="/ideas/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            New Idea
          </Link>
        </nav>
      </div>
    </header>
  );
}