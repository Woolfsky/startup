import React from 'react';

import './community.css';

export function Community() {

  const [quote, setQuote] = React.useState('Loading...');

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);

    fetch('https://api.adviceslip.com/advice')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.slip.advice)
      })
      .catch();
    }, []);
  
    const [chatStatus, setChatStatus] = React.useState(true);
    const [name, setName] = React.useState("");

    React.useEffect(() => {
      setChatStatus(name === "");
    }, [name]);


  return (
    <main>
      <div id="community_holder" >
            <h2 className="tips_title">Community Tips & Tricks for Studying</h2>

            <img className="mountain" id="image" src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2747&q=80" alt="nature" width="1400"></img>

            <div id="second_holder" >
                <h2 className="tips_title">General Study Tips</h2>
                <p>
                    Everyone learns differently, so there is no one-size-fits-all approach to studying. 
                    However, there are some general tips that can help you study more effectively.
                </p>
                <p>
                    Two tips that are often very effective include:
                </p>
                <ul>
                    <p><strong>• Teach the material.</strong> Teaching the material to someone else or even to yourself out loud forces your mind to 
                        re-organize the information in a way that makes sense to you. Try teaching each main chapter or idea to your 
                        roommate or to your pillow, or stand up and walk around like you're teaching a class.</p>
                    <p><strong>• Quiz yourself.</strong> The most effective way to quiz yourself is to write out a practice test of your own creation. 
                        As you study each section of the book, write 2-5 multiple choice or fill in the blank questions. 
                        Try to make them as realistic as possible. Then, take the test in your next study session or the next day.</p>
                </ul>
                <p>
                    Other general study tips include:
                </p>
                <ul>
                    <p><strong>• Find a study space that works for you.</strong> Some people prefer to study in a quiet library, while others prefer to study at home or in a coffee shop. Experiment to find a space where you can focus and avoid distractions.</p>
                    <p><strong>• Set realistic goals.</strong> Don't try to cram all of your studying into one night. Instead, break down your studying into smaller, more manageable chunks.</p>
                    <p><strong>• Take breaks.</strong> It's important to take breaks while you're studying to avoid burnout. Get up and move around every 20-30 minutes, or take a longer break for lunch or dinner.</p>
                    <p><strong>• Reward yourself.</strong> When you reach a study goal, reward yourself with something you enjoy. This will help you stay motivated.</p>
                </ul>
              </div>

              <div id="advice" >
                <h2 className="tips_title">Advice of the Day!</h2>
                <div id="quote">{quote}</div>
                
              </div>


              <div id="community_chat" >
                <h2 className="tips_title">Community Forum</h2>
                <h6 >
                  <span className="name-controls" >Enter your name:</span>
                  <input
                    id="my-name"
                    type="text"
                    defaultValue=""
                    onChange={(e) => setName(e.target.value)}
                  />
                </h6>
                
            
                <div id="chat-messages" ></div>

                <div className="input-group mb-3" >
                  <fieldset className="fieldset" id="chat-controls" disabled={chatStatus}>
                    <div id="lower_div" >
                      <input id="new-msg" type="text" placeholder="Type your message"/>
                      <span className="input-group-append"><button className="btn btn-outline-secondary" onClick={() => sendMessage()}>Send</button></span>
                    </div>
                  </fieldset>
                </div>
                
            
                <div id="chat-messages" ></div>


            </div>
          </div>
    </main>
  );
}