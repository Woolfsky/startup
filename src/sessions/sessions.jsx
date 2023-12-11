import React from 'react';

import './sessions.css';

export function Sessions() {
  return (
    <main>
      <h2 className="my_cards" >Sessions</h2>
      <div>
          <div>
            <label className="sessionTask" >Session Task:</label>
            <select id="taskSelect" className="btn btn-outline-secondary dropdown-toggle">
              <option defaultValue="default" >Select Task Card</option>
            </select>
          </div>
          <br></br>
          <div className="sessionHolder"> 
            <label id="sessionLength" htmlFor="minutes">Session length (mins):</label>
            <input id="minutes" type="number" min="1" className='form-control' defaultValue="25"></input>
          </div>
      </div>

      <div className="cards_and_timer_container" >
        <div className="cards_container">
          <div className="card" >
            <div className="card-body">
              <h5 id="blankNote" >Select a card to view from the dropdown menu</h5>
            </div>
          </div>
        </div>

        <div>
          <div className="card" id="timerCard_">
            <div id="timer" >00:00</div>
            <br></br>
            <div id="timerHolder">
              <button id="start_button" className="btn btn-outline-success" onClick={() => startTimer()}>Start</button> 
              <button className="btn btn-outline-danger" onClick={() => stopTimer()}>Stop</button> 
              <button className="btn btn-outline-secondary" onClick={() => resetTimer()}>Reset</button>
            </div>
          </div>
      </div>
      </div>
      
    </main>
  );
}