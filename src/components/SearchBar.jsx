import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, isLoading }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-dark-muted group-focus-within:text-brand transition-colors" />
      </div>
      <input
        type="text"
        className="w-full bg-dark-card border border-dark-border rounded-full py-3 pl-12 pr-32 text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all shadow-lg"
        placeholder="Pesquise por um livro (ex: The Lord of the Rings)..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="absolute right-1 top-1 bottom-1 bg-brand hover:bg-brand-hover text-white px-6 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Buscando
          </span>
        ) : (
          'Buscar'
        )}
      </button>
    </form>
  );
}
