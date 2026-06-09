import React from 'react';
import { Calendar, User, Globe2, Image as ImageIcon } from 'lucide-react';

export default function BookDetails({ book }) {
  if (!book) return null;

  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-start h-full">
      <div className="w-full md:w-48 shrink-0 flex flex-col items-center justify-center bg-dark-bg/50 rounded-xl aspect-[2/3] overflow-hidden shadow-lg border border-dark-border">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={`Capa do livro ${book.title}`} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-dark-muted">
            <ImageIcon className="w-12 h-12 opacity-50" />
            <span className="text-sm font-medium">Sem capa</span>
          </div>
        )}
      </div>

      <div className="flex-1 w-full space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-dark-text leading-tight">
            {book.title}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-dark-muted bg-dark-bg/30 p-3 rounded-lg">
            <User className="w-5 h-5 text-brand" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold opacity-70">Autor</p>
              <p className="text-dark-text font-medium">{book.author_name ? book.author_name.join(', ') : 'Desconhecido'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-dark-muted bg-dark-bg/30 p-3 rounded-lg">
            <Calendar className="w-5 h-5 text-brand" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold opacity-70">Primeira Publicação</p>
              <p className="text-dark-text font-medium">{book.first_publish_year || 'Não informada'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-dark-muted bg-dark-bg/30 p-3 rounded-lg">
            <Globe2 className="w-5 h-5 text-brand" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold opacity-70">Idioma Principal</p>
              <p className="text-dark-text font-medium uppercase">{book.language ? book.language[0] : 'Não especificado'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
