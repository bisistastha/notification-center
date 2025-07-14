import React, { useEffect, useState } from 'react';
import NotificationCenter from './components/NotificationCenter';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <NotificationCenter darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default App;