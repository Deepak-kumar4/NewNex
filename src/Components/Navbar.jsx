import React, { useState } from 'react';

function Navbar({ onCategoryChange, selectedCategory }) {
  const categories = ['top', 'entertainment', 'business', 'sports', 'technology'];
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full bg-amber-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-amber-900">NewsNex</div>

        {/* Hamburger Button - Only on small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="flex flex-col space-y-1">
            <span className="w-6 h-0.5 bg-amber-900 block"></span>
            <span className="w-6 h-0.5 bg-amber-900 block"></span>
            <span className="w-6 h-0.5 bg-amber-900 block"></span>
          </button>
        </div>

        {/* Category Buttons - Desktop */}
        <div className="hidden md:flex space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded transition duration-200 border hover:bg-amber-100 ${
                selectedCategory === cat ? 'bg-amber-300 font-semibold' : ''
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Menu - Mobile */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onCategoryChange(cat);
                setMenuOpen(false);
              }}
              className={`px-4 py-2 rounded border text-left hover:bg-amber-100 ${
                selectedCategory === cat ? 'bg-amber-300 font-semibold' : ''
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;


