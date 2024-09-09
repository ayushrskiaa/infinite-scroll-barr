// src/App.js
import React, { useState, useEffect } from 'react';
import ScrollToTopButton from './ScrollToTopButton'; // Make sure this path is correct
import './App.css';

function App() {
  const allItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  
  const [visibleItems, setVisibleItems] = useState(allItems.slice(0, 10));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 50 && !loading) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const loadMoreItems = () => {
    if (page * 10 >= allItems.length) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems = allItems.slice(0, nextPage * 10);
      setVisibleItems(newItems);
      setPage(nextPage);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Infinite Scroll List</h1>
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {loading && <div className="loading">Loading more items...</div>}
      <ScrollToTopButton />
    </div>
  );
}

export default App;
