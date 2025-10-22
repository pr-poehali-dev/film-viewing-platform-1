import { useState } from 'react';
import Navigation from '@/components/Navigation';
import MovieCard from '@/components/MovieCard';
import ReviewSection from '@/components/ReviewSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  year: number;
  userRating?: number;
}

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Тёмный рассвет',
    description: 'Захватывающий триллер о борьбе за выживание в постапокалиптическом мире, где каждое решение может стать последним.',
    rating: 4.5,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/56251d21-17d5-4fd3-90d6-c89cc4257c2d.jpg',
    genre: 'Боевик',
    year: 2024
  },
  {
    id: 2,
    title: 'Звёздный путь: Новая эра',
    description: 'Эпическое космическое приключение о команде исследователей, открывающих тайны далёких галактик и неизведанных миров.',
    rating: 4.8,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/213c14ff-cd0c-4d86-ae88-456ea9abe848.jpg',
    genre: 'Фантастика',
    year: 2024
  },
  {
    id: 3,
    title: 'Любовь в большом городе',
    description: 'Лёгкая романтическая комедия о случайной встрече двух людей в шумном мегаполисе, которая меняет их жизни навсегда.',
    rating: 4.2,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/bdff5821-5e31-4572-b5cd-865ce3dec07e.jpg',
    genre: 'Комедия',
    year: 2024
  },
  {
    id: 4,
    title: 'Тёмный рассвет',
    description: 'Захватывающий триллер о борьбе за выживание в постапокалиптическом мире, где каждое решение может стать последним.',
    rating: 4.5,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/56251d21-17d5-4fd3-90d6-c89cc4257c2d.jpg',
    genre: 'Боевик',
    year: 2024
  },
  {
    id: 5,
    title: 'Звёздный путь: Новая эра',
    description: 'Эпическое космическое приключение о команде исследователей, открывающих тайны далёких галактик и неизведанных миров.',
    rating: 4.8,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/213c14ff-cd0c-4d86-ae88-456ea9abe848.jpg',
    genre: 'Фантастика',
    year: 2024
  },
  {
    id: 6,
    title: 'Любовь в большом городе',
    description: 'Лёгкая романтическая комедия о случайной встрече двух людей в шумном мегаполисе, которая меняет их жизни навсегда.',
    rating: 4.2,
    poster: 'https://cdn.poehali.dev/projects/5cd0fc90-bfcd-449b-b64b-26c693986818/files/bdff5821-5e31-4572-b5cd-865ce3dec07e.jpg',
    genre: 'Комедия',
    year: 2024
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleRateMovie = (movieId: number, rating: number) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId ? { ...movie, userRating: rating } : movie
      )
    );
  };

  const handleWatchMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsReviewDialogOpen(true);
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      home: 'Популярное сегодня',
      top: 'Топ фильмов',
      genres: 'Жанры',
      favorites: 'Избранное',
      catalog: 'Каталог фильмов'
    };
    return titles[activeSection] || 'Главная';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {getSectionTitle()}
          </h2>
          <p className="text-muted-foreground">
            Откройте для себя лучшие фильмы и оставьте свои отзывы
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard
                {...movie}
                onWatch={() => handleWatchMovie(movie)}
                onRate={(rating) => handleRateMovie(movie.id, rating)}
              />
            </div>
          ))}
        </div>
      </main>

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-background to-background/95">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedMovie?.title}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            {selectedMovie && (
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Видеоплеер</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Описание</h3>
                    <p className="text-foreground">{selectedMovie.description}</p>
                  </div>
                  
                  <div className="flex gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-1">Жанр</h3>
                      <p className="text-foreground">{selectedMovie.genre}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-1">Год</h3>
                      <p className="text-foreground">{selectedMovie.year}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-1">Рейтинг</h3>
                      <p className="text-foreground">{selectedMovie.rating} / 5</p>
                    </div>
                  </div>
                </div>

                <ReviewSection 
                  movieTitle={selectedMovie.title}
                  reviews={[
                    {
                      id: 1,
                      author: 'Алексей Иванов',
                      rating: 5,
                      text: 'Потрясающий фильм! Визуальные эффекты на высшем уровне, сюжет держит в напряжении от начала до конца. Обязательно пересмотрю ещё раз!',
                      date: '20.10.2024'
                    },
                    {
                      id: 2,
                      author: 'Мария Петрова',
                      rating: 4,
                      text: 'Очень интересная история, хотя местами темп немного проседает. В целом рекомендую к просмотру!',
                      date: '19.10.2024'
                    }
                  ]}
                />
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}