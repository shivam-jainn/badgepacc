"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useSwipeable } from 'react-swipeable';

export default function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'up') {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    } else if (direction === 'down') {
      setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe('up'),
    onSwipedDown: () => handleSwipe('down'),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    swipeDuration: 500,
  });

  const cards = [
    { id: 0, name: "Manu Arora", designation: "Senior Software Engineer", content: "Content of the card 0" },
    { id: 1, name: "Elon Musk", designation: "Senior Shitposter", content: "Content of the card 1" },
    { id: 2, name: "Tyler Durden", designation: "Manager Project Mayhem", content: "Content of the card 2" }
  ];

  return (
    <div {...handlers} className="relative flex justify-center items-center h-full">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${(index - currentIndex + 3) % 3 * 2}rem`, zIndex: (index - currentIndex + 3) % 3 === 0 ? 2 : 1 }}
        >
          <Card className="bg-white rounded-lg shadow-md p-6">
            <p className="font-semibold text-lg mb-2">{cards[(index - currentIndex + 3) % 3].name}</p>
            <p className="text-gray-500">{cards[(index - currentIndex + 3) % 3].designation}</p>
            <p className="mt-4">{cards[(index - currentIndex + 3) % 3].content}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}
