import React from 'react'
import { useState } from 'react';
import './../css/fliping.css'
import { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const FlipingCard = ({
  item,
}) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      setFlipped(!flipped);
    }
  };
  const handleSpeakUS = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Đặt ngôn ngữ là tiếng Anh (Mỹ)
    utterance.rate = 1.0; // Tốc độ đọc, 1.0 là tốc độ bình thường
    window.speechSynthesis.speak(utterance);
  }
  const handleSpeakUK = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-UK'; // Đặt ngôn ngữ là tiếng Anh (Mỹ)
    utterance.rate = 1.0; // Tốc độ đọc, 1.0 là tốc độ bình thường
    const voices = window.speechSynthesis.getVoices();

    // Tìm giọng đọc tiếng Anh (UK) nữ
    const ukFemaleVoice = voices.find(voice => voice.lang === 'en-GB' && voice.gender === 'female');

    // Nếu tìm thấy, sử dụng giọng đọc này
    if (ukFemaleVoice) {
      utterance.voice = ukFemaleVoice;
    }
    window.speechSynthesis.speak(utterance);
  }
  useEffect(() => {
    setFlipped(false);
  }, [item]);
  useEffect(() => {
    // Thêm sự kiện lắng nghe khi component được mount
    document.addEventListener('keydown', handleKeyDown);

    // Clean up sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [flipped]);
  return (
    <Box>
      <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <CheckCircleIcon
                  sx={{
                    color: item.status === 1 ? '#4c79e1' : '#bdbdbd',
                  }}
                />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <StarIcon
                  sx={{
                    color: item.status === 2 ? '#4c79e1' : '#bdbdbd',
                  }}
                />
              </IconButton>
            </Box>

            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' height='100%' mb='10%'>
              <Box display='flex' alignItems='center'>
                <Typography fontSize='32px' fontWeight='500'>
                  {item.newWord}
                </Typography>
                <IconButton
                  sx={{
                    ml: '5px',
                    mr: '3px',
                    bgcolor: '#e8f2ff'
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSpeakUS(item.newWord)
                  }}
                >
                  <VolumeUpIcon sx={{ color: '#1976d2', fontSize: '20px' }} />
                </IconButton>
                US
                <IconButton
                  sx={{
                    ml: '10px',
                    mr: '3px',
                    bgcolor: '#e8f2ff'
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSpeakUK(item.newWord)
                  }}
                >
                  <VolumeUpIcon sx={{ color: '#1976d2', fontSize: '20px' }} />
                </IconButton>
                UK
              </Box>
              <Typography fontSize='18px' fontWeight='500'>
                {item.spelling}
              </Typography>
            </Box>

          </div>
          <div className="flip-card-back">
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <CheckCircleIcon
                  sx={{
                    color: item.status === 1 ? '#4c79e1' : '#bdbdbd',
                  }}
                />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <StarIcon
                  sx={{
                    color: item.status === 2 ? '#4c79e1' : '#bdbdbd',
                  }}
                />
              </IconButton>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' height='100%' mb='5%'>
              <Box display='flex' justifyContent='center' alignItems='center' width='95%'>
                <Box display='flex' flexDirection='column' width='64%' mr='2%'>
                  <Typography fontSize='17px' fontWeight='500' mt='2%'>
                    Định nghĩa:
                  </Typography>
                  <Typography fontSize='17px' paddingLeft='20px'>
                    {item.definition}
                  </Typography>
                  <Typography fontSize='17px' fontWeight='500' mt='2%'>
                    Ví dụ:
                  </Typography>
                  <Typography fontSize='17px' paddingLeft='20px'>
                    {item.example}
                  </Typography>
                </Box>
                <img src={item.image} alt='Không hiển thị' style={{ maxWidth: '33%' }} height='auto' />
              </Box>
            </Box>

          </div>
        </div>
      </div>
    </Box>

  );
}

export default FlipingCard