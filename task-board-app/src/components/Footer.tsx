import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white mt-10 px-6 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Branding or message */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} TaskBoard. All rights reserved.
        </div>

        {/* Right: Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
