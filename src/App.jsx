import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import MapViewer from './components/MapViewer';
import { BookMarked, AlertCircle, Info } from 'lucide-react';

const openLibraryToRestCountriesJson = {
  ger: 'deu', // Alemão
  alb: 'sqi', // Albanês
  arm: 'hye', // Armênio
  baq: 'eus', // Basco
  bur: 'mya', // Birmanês
  cze: 'ces', // Checo
  chi: 'zho', // Chinês
  slo: 'slk', // Eslovaco
  fre: 'fra', // Francês
  wel: 'cym', // Galês
  geo: 'kat', // Georgiano
  gre: 'ell', // Grego
  dut: 'nld', // Holandês
  ice: 'isl', // Islandês
  mac: 'mkd', // Macedônio
  may: 'msa', // Malaio
  mao: 'mri', // Maori
  per: 'fas', // Persa
  rum: 'ron', // Romeno
  tib: 'bod'  // Tibetano
};

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [countries, setCountries] = useState([]);
  
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);
  
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleSearch = async (term) => {
    setIsSearchingBooks(true);
    setError('');
    setWarning('');
    setBooks([]);
    setSelectedBook(null);
    setCountries([]);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('Falha ao comunicar com a Open Library API.');
      
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs);
      } else {
        setWarning('Nenhum livro encontrado para este termo.');
      }
    } catch (err) {
      setError(err.message || 'Erro inesperado ao buscar livros.');
    } finally {
      setIsSearchingBooks(false);
    }
  };

  const handleSelectBook = async (book) => {
    setSelectedBook(book);
    setCountries([]);
    setError('');
    setWarning('');

    const langFromOpenLibrary = book.language ? book.language[0] : null;

    if (!langFromOpenLibrary) {
      setWarning(`O livro "${book.title}" não possui um idioma especificado nos registros. Não é possível exibir os países no mapa.`);
      return;
    }

    const searchLanguage = openLibraryToRestCountriesJson[langFromOpenLibrary] || langFromOpenLibrary;

    setIsFetchingCountries(true);
    try {
      // Usando repositório open-source mledoze/countries como alternativa gratuita
      const response = await fetch(`https://raw.githubusercontent.com/mledoze/countries/master/countries.json`);
      
      if (!response.ok) {
        throw new Error('Falha ao comunicar com a base de países (mledoze).');
      }

      const allCountries = await response.json();
      
      // Filtra os países que possuem o idioma da obra
      const matchedCountries = allCountries.filter(country => 
        country.languages && Object.keys(country.languages).includes(searchLanguage)
      );

      if (matchedCountries.length === 0) {
        setWarning(`A sigla de idioma "${searchLanguage}" não foi encontrada na base de países (pode ser uma língua morta, construída ou não catalogada).`);
      }

      setCountries(matchedCountries);
    } catch (err) {
      setError(err.message || 'Erro inesperado ao buscar os países.');
    } finally {
      setIsFetchingCountries(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto">
      <header className="mb-12 text-center mt-8">
        <div className="inline-flex items-center justify-center p-3 bg-brand/10 rounded-2xl mb-4">
          <BookMarked className="w-10 h-10 text-brand" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-accent tracking-tight mb-4">
          Explorador Literário
        </h1>
        <p className="text-dark-muted max-w-2xl mx-auto text-lg">
          Pesquise por uma obra e descubra no mapa todos os países que falam o idioma nativo daquele livro.
        </p>
      </header>

      <main className="flex-1 w-full flex flex-col gap-8">
        <SearchBar onSearch={handleSearch} isLoading={isSearchingBooks} />

        {error && (
          <div className="glass-panel border-red-500/30 bg-red-500/10 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {warning && (
          <div className="glass-panel border-yellow-500/30 bg-yellow-500/10 text-yellow-200 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
            <Info className="w-5 h-5 shrink-0" />
            <p>{warning}</p>
          </div>
        )}

        {books.length > 0 && (
          <section className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-dark-text/90 px-1">Resultados da Busca</h2>
            <BookList books={books} onSelectBook={handleSelectBook} selectedBook={selectedBook} />
          </section>
        )}

        {selectedBook && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 animate-slide-up">
            <BookDetails book={selectedBook} />
            <MapViewer countries={countries} isLoading={isFetchingCountries} />
          </section>
        )}
      </main>

      <footer className="mt-16 text-center text-dark-muted text-sm py-4 border-t border-dark-border/50">
        Desenvolvido com React, Vite, Tailwind CSS e Leaflet
      </footer>
    </div>
  );
}

export default App;
