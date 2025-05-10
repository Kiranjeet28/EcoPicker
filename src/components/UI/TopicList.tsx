"use client";
import React, { useState } from 'react';
import Box from './List/Box';
import { useGlobalContext } from '@/context/GlobalContext';

function TopicList() {
  const economicTopics = [
    'Inflation',
    'GDP Growth',
    'Trade Balance',
    'Stock Market',
    'Interest Rates',
    'Exports',
    'Imports'
  ];

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { setTopic } = useGlobalContext();

  const handleBoxClick = (topic: string) => {
    setSelectedTopic(topic);
    setTopic(topic);
    // Optional: use this topic to render related content
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-2 px-4 py-2 w-max">
        {economicTopics.map((topic, index) => (
          <Box
            key={index}
            text={topic}
            selected={selectedTopic === topic}
            onClick={() => handleBoxClick(topic)}
          />
        ))}
      </div>
    </div>
  );
}

export default TopicList;
