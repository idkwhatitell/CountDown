import React, { useEffect, useRef, useState } from 'react';
import './App.css';


const App = () => {
  const meetings = [
    {
      name: "Delta Package",
      day: 2,
      time: "13:30:00"
    },
    {
      name: "Master Data Meeting",
      day: 2,
      time: "10:00:00"
    },
    {
      name: "General implementation-issues",
      day: 3,
      time: "15:00:00"
    },
    {
      name: "General Test Meeting",
      day: 4,
      time: "15:00:00"
    }
  ];

  const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0);
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  const [meetingName, setMeetingName] = useState(meetings[currentMeetingIndex].name);

  let interval = useRef();

  const getNextMeetingIndex = (currentMeetingIndex) => {
    let nextMeetingIndex = currentMeetingIndex + 1;
    if (nextMeetingIndex >= meetings.length) {
      nextMeetingIndex = 0;
    }
    return nextMeetingIndex;
  }

  const startTimer = () => {
    let meetingTime = new Date().getTime();
    interval.current = setInterval(() => {
      const currentDate = new Date();
      const currentDay = new Date().getDay();

      const currentMeeting = meetings[currentMeetingIndex];
      if (currentMeeting.day !== currentDay) {
        setCurrentMeetingIndex(getNextMeetingIndex(currentMeetingIndex));
        setMeetingName(meetings[getNextMeetingIndex(currentMeetingIndex)].name);
        return;
      }

      meetingTime = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentMeeting.time}`).getTime();
      const now = currentDate.getTime();
      const distance = meetingTime - now;

      if (distance < 0) {
        setCurrentMeetingIndex(getNextMeetingIndex(currentMeetingIndex));
        setMeetingName(meetings[getNextMeetingIndex(currentMeetingIndex)].name);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // update timer
      setTimerDays(days < 10 ? `0${days}` : days);
      setTimerHours(hours < 10 ? `0${hours}` : hours);
      setTimerMinutes(minutes < 10 ? `0${minutes}` : minutes);
      setTimerSeconds(seconds < 10 ? `0${seconds}` : seconds);
    }, 1000);
  };

  // componentDidMount
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <section className="timer-container">
      <section className= "timer">
        <div>
          <span className ="mdi mdi-calendar-clock timer-icon"></span>
          <h2>Countdown for Meeting</h2>
          <p>{meetingName}</p>
        </div>
        <div>
          <section>
            <p>{timerDays}</p>
            <p><small>Days</small></p>
          </section>
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <p><small>Hours</small></p>
          </section>
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <p><small>Minutes</small></p>
          </section>
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <p><small>Seconds</small></p>
          </section>
        </div>
      </section>
    </section>  
    );
};

export default App;
