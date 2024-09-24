import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarsProps {
  stars: number;
}

function roundToHalf(stars: number): number {
  return Math.round(stars * 2) / 2;
}

const Stars: React.FC<StarsProps> = ({ stars }) => {
  const roundedStars = roundToHalf(stars);
  const fullStars = Math.floor(roundedStars);
  const hasHalfStar = roundedStars % 1 !== 0;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <React.Fragment key={star}>
          {star <= fullStars ? (
            <Star className="h-4 w-4 text-yellow-500" />
          ) : star === fullStars + 1 && hasHalfStar ? (
            <StarHalf className="h-4 w-4 text-yellow-500" />
          ) : (
            <Star className="h-4 w-4 text-gray-300" />
          )}
        </React.Fragment>
      ))}
      <span className="ml-2 text-gray-600">({roundedStars.toFixed(1)})</span>
    </div>
  );
}

export default Stars;