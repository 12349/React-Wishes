import React, { useState, useRef } from 'react';
import './LoveLetter.css';
import Confetti from 'react-confetti';
import audioFile from './kushi.mp3';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0); // For message tracking
  const [showConfetti, setShowConfetti] = useState(false); // To manage confetti visibility
  const audioRef = useRef(null);

  // Define the messages to be displayed
  const messages = [
    "Heyy Assalamualikum! Keep clicking to read the next message.",
    "You asked me for a greeting card, so I created a greeting app 😉:)",
    "Sending you loads of love & luck on your birthday, Antara 💃:)",
    "And I wish you many more happy returns of the dayyy 🥳🎁🎊",
    "Enjoy your day and be prepared to give me daawat 😅 See you!"
  ];

  const totalMessages = messages.length;

  // Handle opening or updating the letter
  const handleOpenLetter = () => {
    setShowConfetti(true); // Show confetti on each click

    if (!isOpen) {
      // Start by opening the envelope and playing music
      setIsOpen(true);
      setTimeout(() => {
        setIsFullSize(true);
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => console.log("Playback succeeded"))
            .catch(e => console.error("Playback failed:", e));
        }
      }, 800);
    } else if (messageIndex < totalMessages - 1) {
      // Show next message
      setMessageIndex(prevIndex => prevIndex + 1);
    } else {
      // Close the envelope and stop the music
      setIsFullSize(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset audio to start
          setIsOpen(false); // Close the envelope
        }
      }, 800);
      setMessageIndex(0); // Reset message index
    }

    // Hide confetti after 2 seconds
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleOpenLetter}>
      <div className="flap"></div>
      <div className="body"></div>
      <div className={`letter ${isFullSize ? 'fullSize' : ''}`}>
        {messages[messageIndex]}
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
      {showConfetti && <Confetti />}
    </div>
  );
};

export default LoveLetter;
