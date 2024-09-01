import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './LoveLetter.css';
import audioFile from './kushi.mp3';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0); // For message tracking
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state
  const audioRef = useRef(null);

  // Define the messages to be displayed
  const messages = [
    "Heyy Assalamualikum ! Keep Clikin to read the Next Message.",
    "You Asked Me a Greeting Card I've Created a Greeting App 😉:)",
    "Sending you Loads of Love & Luck on your Birthday Antara 💃:)",
    "And i Wish you Many More Happy Returns of the Dayyy🥳🎁🎊",
    "Enjoy Your Day and Be Prepared to Give Me Daawat😅 See You!"
  ];

  const totalMessages = messages.length;

  // Handle opening or updating the letter
  const handleOpenLetter = () => {
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
      triggerConfetti(); // Trigger confetti on each click
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
      setShowConfetti(false); // Stop confetti
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Confetti duration
  };

  return (
    <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleOpenLetter}>
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />} {/* Confetti component */}
      <div className="flap"></div>
      <div className="body"></div>
      <div className={`letter ${isFullSize ? 'fullSize' : ''}`}>
        {messages[messageIndex]}
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;
