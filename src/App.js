import React, { useState, useEffect } from 'react';
import SearchBox from './components/Search-box.js';
import './App.css';


const App = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(interval);
    };
  }, []);
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
   
    setCurrentTime(getCurrentTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCurrentTime = () => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const currentTime = new Date().toLocaleString('en-US', options);
    return currentTime;
  };
  return (
    <div>
      <div className='App'>
      <SearchBox/>
      <div className='date'>
            <h2>Current Date and Time:</h2>
            <p>{formatDate(currentDate)} </p>
            {currentTime && <p className="current-time">Current Time: {currentTime}</p>}
        </div>
      </div>
        
    </div>
  );
};
export default App;
