import { useState, useEffect } from 'react';

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentTime = date.toLocaleTimeString();
  const currentDate = date.toLocaleDateString();

  return (
    <div>
      {/* <h1>Current Time:</h1> */}
      <h6>{currentTime} {currentDate}</h6>
      {/* <h1>Current Date:</h1> */}
      
    </div>
  );
}
