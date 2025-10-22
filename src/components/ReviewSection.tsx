import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

interface ReviewSectionProps {
  movieTitle: string;
  reviews?: Review[];
}

export default function ReviewSection({ movieTitle, reviews = [] }: ReviewSectionProps) {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>(reviews);

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0) {
      const review: Review = {
        id: Date.now(),
        author: 'Вы',
        rating: newRating,
        text: newReview,
        date: new Date().toLocaleDateString('ru-RU')
      };
      setAllReviews([review, ...allReviews]);
      setNewReview('');
      setNewRating(0);
      setIsWritingReview(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const filled = interactive 
        ? (hoveredStar !== null ? i < hoveredStar : i < rating)
        : i < rating;
      
      return (
        <Icon
          key={i}
          name="Star"
          size={interactive ? 24 : 16}
          className={`${
            filled ? 'fill-primary text-primary' : 'text-muted-foreground'
          } ${interactive ? 'cursor-pointer transition-all hover:scale-125' : ''}`}
          onMouseEnter={() => interactive && setHoveredStar(i + 1)}
          onMouseLeave={() => interactive && setHoveredStar(null)}
          onClick={() => interactive && onRate && onRate(i + 1)}
        />
      );
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Отзывы о фильме "{movieTitle}"</h2>
        {!isWritingReview && (
          <Button
            onClick={() => setIsWritingReview(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            Написать отзыв
          </Button>
        )}
      </div>

      {isWritingReview && (
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/30 animate-scale-in">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Ваша оценка</label>
              <div className="flex items-center gap-2">
                {renderStars(newRating, true, setNewRating)}
                {newRating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {newRating} из 5
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
              <Textarea
                placeholder="Поделитесь своими впечатлениями о фильме..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-32 bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                disabled={!newReview.trim() || newRating === 0}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsWritingReview(false);
                  setNewReview('');
                  setNewRating(0);
                }}
              >
                Отмена
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {allReviews.length === 0 ? (
          <Card className="p-8 text-center bg-card/50">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              Пока нет отзывов. Станьте первым!
            </p>
          </Card>
        ) : (
          allReviews.map((review) => (
            <Card key={review.id} className="p-6 bg-gradient-to-br from-card to-card/80 hover:border-primary/30 transition-all duration-300 animate-slide-up">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-secondary">
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                    {review.author[0]}
                  </div>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{review.author}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="ThumbsUp" size={16} />
                      <span>Полезно</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="MessageCircle" size={16} />
                      <span>Ответить</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
