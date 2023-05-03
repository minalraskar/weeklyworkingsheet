import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import './App.css'

import React, { useState, useEffect } from "react";


function App() {
   const [startDate, setStartDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC-0");
  
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    setCurrentWeek(getWeekDays(startDate));
    getCurrentDate(new Date);
  }, [startDate]);

  function getCurrentDate(newDate)
  {
    let month = newDate.toLocaleString('default', { month: 'short' });
    let dayOfMonth = newDate.getDate();
    let year=newDate.getFullYear();
   
    let fullDate=month + " "+dayOfMonth+" "+year
    setCurrentDate(fullDate)

  }

  function getWeekDays(date) {
    let days = [];
    for (let i = 1; i <= 5; i++) {
      const day = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    
      days.push({
        day: day.toLocaleDateString(),
        timeSlots: getDailyTimeSlots(),
      dayName:day.toLocaleDateString('en-US',{weekday:'short'})
      });
    }
    return days;
  }

  function getDailyTimeSlots() {
    let timeSlots = [];
    for (let i = 8; i <= 23; i++) {
      timeSlots.push({ time: i + ":00", isChecked: false });
   
    }
    return timeSlots;
  }

  function handleTimeZoneChange(e) {
    setSelectedTimeZone(e.target.value);
  }

  function handleCheckboxChange(dayIndex, timeIndex) {
    const updatedWeek = [...currentWeek];
    updatedWeek[dayIndex].timeSlots[timeIndex].isChecked = !updatedWeek[dayIndex]
      .timeSlots[timeIndex].isChecked;
    setCurrentWeek(updatedWeek);
  }


  function handleSwipe(direction) {
    const today = new Date();

    
    const daysToSubtract = today.getDay() === 0 ? 6 : today.getDay() - 1
    const startOfWeek = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);

    const increment = direction === "next" ? 7 : -7;
    setStartDate(new Date(startOfWeek.getTime() + increment * 24 * 60 * 60 * 1000));
  }
  
  return (
     
    <>
      <Table responsive>
        <thead>
          <tr>
            <td ><Button variant="light" onClick={() => handleSwipe("prev")}>Previous Week</Button>{''}</td>
            <td colSpan={20}>{currentDate}</td>
            <td><Button variant="light" onClick={() => handleSwipe("next")}>Next Week</Button>{''}</td>
          </tr>
          <tr>
            <td ></td>
            <td colSpan={20}>
              <label>Time Zone:</label>
              <select value={selectedTimeZone} onChange={handleTimeZoneChange} id="wgtmsr">
                <option value="UTC-0">UTC-0</option>
                <option value="UTC+5.5">UTC+5.5</option>
              </select></td>
            <td></td>
          </tr>
          <tr>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>


        

          {currentWeek.map((day, dayIndex) => (
            <tr key={day.day}>
              
              <td>{day.dayName}{day.day}</td>
              {day.timeSlots.map((slot, timeIndex) => (
                <td key={slot.time}>{slot.time}
                  <input
                    type="checkbox"
                    checked={slot.isChecked}
                    onChange={() => handleCheckboxChange(dayIndex, timeIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
