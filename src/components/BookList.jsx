import React from 'react';
import { BookOpen } from 'lucide-react';

export default function BookList({ books, onSelectBook, selectedBook }) {
  if (!books || books.length === 0) return null;

  return (
    <div className="w-full max-h-[500px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book) => {
          const isSelected = selectedBook?.key === book.key;
          return (
            <div
              key={book.key}
              onClick={() => onSelectBook(book)}
              className={`w-full glass-panel rounded-xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-brand/20 ${
                isSelected ? 'ring-2 ring-brand bg-dark-card border-brand' : ''
              }`}
            >
              <div className="flex items-start gap-3 h-full">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand/20 text-brand' : 'bg-dark-border text-dark-muted'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-dark-text truncate" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-dark-muted truncate mt-1" title={book.author_name?.[0] || 'Autor desconhecido'}>
                    {book.author_name ? book.author_name[0] : 'Autor desconhecido'}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-dark-border rounded-md text-dark-muted">
                      {book.first_publish_year || 'S/ Data'}
                    </span>
                    {book.language && (
                      <span className="text-xs font-medium text-brand uppercase">
                        {book.language[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
