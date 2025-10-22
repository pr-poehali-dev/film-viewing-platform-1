import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'top', label: 'Топ', icon: 'TrendingUp' },
    { id: 'genres', label: 'Жанры', icon: 'Film' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart' },
    { id: 'catalog', label: 'Каталог', icon: 'Library' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ONLINE CINEMA
            </h1>

            <div className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  <Icon name={section.icon as any} size={18} />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSearchOpen ? (
              <div className="animate-scale-in">
                <Input
                  type="text"
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-card border-primary/30 focus:border-primary"
                  autoFocus
                />
              </div>
            ) : null}
            
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            >
              <Icon name={isSearchOpen ? "X" : "Search"} size={20} />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                  : 'text-muted-foreground bg-card'
              }`}
            >
              <Icon name={section.icon as any} size={16} />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
