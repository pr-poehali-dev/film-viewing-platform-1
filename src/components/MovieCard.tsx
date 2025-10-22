import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface MovieCardProps {
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  year: number;
  onWatch: () => void;
  onRate: (rating: number) => void;
  userRating?: number;
}

export default function MovieCard({ 
  title, 
  description, 
  rating, 
  poster, 
  genre, 
  year,
  onWatch,
  onRate,
  userRating
}: MovieCardProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (count: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = interactive 
        ? (hoveredStar !== null ? i < hoveredStar : i < (userRating || 0))
        : i < Math.round(count);
      
      return (
        <Icon
          key={i}
          name={filled ? "Star" : "Star"}
          size={interactive ? 20 : 16}
          className={`${
            filled ? 'fill-primary text-primary' : 'text-muted-foreground'
          } ${interactive ? 'cursor-pointer transition-all hover:scale-110' : ''}`}
          onMouseEnter={() => interactive && setHoveredStar(i + 1)}
          onMouseLeave={() => interactive && setHoveredStar(null)}
          onClick={() => interactive && onRate(i + 1)}
        />
      );
    });
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="aspect-[2/3] overflow-hidden">
          <img 
            src={poster} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground font-semibold">
            {year}
          </Badge>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <Icon 
              name="Heart" 
              size={18} 
              className={`transition-all ${isFavorite ? 'fill-primary text-primary scale-110' : 'text-white'}`}
            />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-muted-foreground font-semibold">
              {rating.toFixed(1)}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
            {genre}
          </Badge>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          <div className="space-y-3">
            <Button 
              onClick={onWatch}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
            >
              <Icon name="Play" size={18} className="mr-2" />
              Смотреть
            </Button>

            <div className="flex items-center justify-center gap-1 pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground mr-2">Ваша оценка:</span>
              {renderStars(userRating || 0, true)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
