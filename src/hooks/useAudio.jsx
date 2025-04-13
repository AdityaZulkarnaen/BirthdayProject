// src/hooks/useAudio.js
import { useEffect, useRef, useState } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Notes for "Happy Birthday" melody
  const notes = [
    // Happy
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    // Birth-
    { note: 'D4', duration: 1 },
    // day
    { note: 'C4', duration: 1 },
    // to
    { note: 'F4', duration: 1 },
    // you
    { note: 'E4', duration: 2 },
    
    // Happy
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    // Birth-
    { note: 'D4', duration: 1 },
    // day
    { note: 'C4', duration: 1 },
    // to
    { note: 'G4', duration: 1 },
    // you
    { note: 'F4', duration: 2 },
    
    // Happy
    { note: 'C4', duration: 0.5 },
    { note: 'C4', duration: 0.5 },
    // Birth-
    { note: 'C5', duration: 1 },
    // day
    { note: 'A4', duration: 1 },
    // dear
    { note: 'F4', duration: 0.5 },
    { note: 'F4', duration: 0.5 },
    // [Name]
    { note: 'E4', duration: 1 },
    { note: 'D4', duration: 1 },
    
    // Happy
    { note: 'Bb4', duration: 0.5 },
    { note: 'Bb4', duration: 0.5 },
    // Birth-
    { note: 'A4', duration: 1 },
    // day
    { note: 'F4', duration: 1 },
    // to
    { note: 'G4', duration: 1 },
    // you
    { note: 'F4', duration: 2 },
  ];

  // Convert note name to frequency
  const noteToFrequency = (note) => {
    const notes = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11, Bb: 10 };
    const octave = parseInt(note.slice(-1));
    const noteName = note.slice(0, -1);
    
    // A4 is 440Hz
    const semitonesFromA4 = (octave - 4) * 12 + notes[noteName] - 9;
    return 440 * Math.pow(2, semitonesFromA4 / 12);
  };

  const playNote = (frequency, duration, time, volume = 0.2) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    gainNode.gain.value = volume;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start(time);
    oscillator.stop(time + duration);
  };

  const playBirthdaySong = () => {
    if (isPlaying) return;
    
    // Create a new audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const currentTime = audioContextRef.current.currentTime;
    let time = currentTime + 0.1; // Small delay to start
    
    // Slower tempo factor (0.5 is half speed of the original)
    const tempoFactor = 0.3; // Adjusted to be slower
    
    notes.forEach(({ note, duration }) => {
        const frequency = noteToFrequency(note);
        const noteDuration = duration * 0.5; // Adjust tempo
        
        playNote(frequency, noteDuration, time);
        time += noteDuration;
      });
      
      setIsPlaying(true);
    
    // Reset playing state after song is complete
    const totalDuration = notes.reduce((acc, { duration }) => acc + duration / tempoFactor, 0);
    setTimeout(() => {
      setIsPlaying(false);
    }, totalDuration * 1000);
  };

  const stopBirthdaySong = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      setIsPlaying(false);
    }
  };

  return { playBirthdaySong, stopBirthdaySong, isPlaying };
}