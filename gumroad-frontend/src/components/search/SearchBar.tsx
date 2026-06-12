'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  onSearch?: (query: string) => void;
  size?: 'sm' | 'lg';
}

export function SearchBar({ placeholder = 'Search for products...', buttonText = 'Search', onSearch, size = 'lg' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const isLarge = size === 'lg';

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`flex items-center bg-white border-2 border-black ${isLarge ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150`}>
        <div className={`${isLarge ? 'pl-5' : 'pl-4'} flex items-center text-gray-400`}>
          <Search size={isLarge ? 20 : 16} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 ${isLarge ? 'px-4 py-4 text-base' : 'px-3 py-2.5 text-sm'} bg-transparent outline-none text-black placeholder-gray-400 font-medium`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        />
        <button
          type="submit"
          className={`${isLarge ? 'px-6 py-4 text-base' : 'px-4 py-2.5 text-sm'} bg-black text-white font-bold hover:bg-gray-900 transition-colors`}
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
