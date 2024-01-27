import { Typography } from '@mui/material';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';

const Demo = () => {
  const [selectedText, setSelectedText] = useState('');
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef();
  const containerRef = useRef(null);

  const handleSpeak = () => {
    const text = textRef.current.value;

    // Tạo đối tượng SpeechSynthesisUtterance với văn bản và các tùy chọn
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Đặt ngôn ngữ là tiếng Anh (Mỹ)
    utterance.rate = 1.0; // Tốc độ đọc, 1.0 là tốc độ bình thường

    // Sử dụng SpeechSynthesis để đọc văn bản
    window.speechSynthesis.speak(utterance);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      setSelectedText(selectedText);

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setButtonPosition({
          top: rect.top - 30,
          left: rect.left + rect.width / 2,
        });
      }

      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleMouseUpOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      // Clicked outside the container, hide the button
      setShowButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUpOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside);
    };
  }, [containerRef]);
  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <Typography
        fontSize='35px'
        sx={{ fontWeight: 'bold' }}
        align='left'
        onMouseUp={handleTextSelection}
      >
        Flashcard: Tên của flash card
      </Typography>
      {showButton && (
        <button
          style={{
            position: 'absolute',
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
          onClick={() => alert(`Thêm nút cho: ${selectedText}`)}
        >
          Thêm
        </button>
      )}
      <div>
        <textarea ref={textRef} rows="5" cols="50" placeholder="Nhập văn bản cần đọc"></textarea>
        <br />
        <button onClick={handleSpeak}>Nghe</button>
      </div>
    </div>
  )
}

export default Demo