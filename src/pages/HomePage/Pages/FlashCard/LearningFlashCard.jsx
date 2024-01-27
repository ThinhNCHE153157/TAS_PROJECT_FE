import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../../layout/Header'
import FlipingCard from './Component/FlipingCard'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useState } from 'react';
import Footer from '../../../../layout/Footer';
import { useEffect } from 'react';
import ChangeMode from './Component/ChangeMode';
const temp = {
  id: 1,
  accountId: 101,
  flashcardName: "Travel",
  description: "Discover different cultures and explore new places.",
  isOwn: 1,
  createUser: "User1",
  numberOfWords: 20,
  itemCards: [
    {
      id: 1,
      newWord: 'Hello',
      spelling: 'həˈloʊ',
      defination: 'used as a greeting or to begin a conversation',
      example: 'Hello, how are you?',
      type: 'interjection',
      status: 0,
      note: 'Hello, how are you?',
      img: 'https://source.unsplash.com/800x600/random'
    },
    {
      id: 2,
      newWord: 'Serendipity',
      spelling: 'ˌser.ənˈdɪp.ɪ.t̬i',
      defination: 'the fact of finding interesting or valuable things by chance',
      example: 'She discovered the restaurant by serendipity.',
      type: 'noun',
      status: 1,
      note: 'Hello, how are you?',
    },
    {
      id: 3,
      newWord: 'Quixotic',
      spelling: 'kwɪkˈsɒt.ɪk',
      defination: 'extremely idealistic; unrealistic and impractical',
      example: 'His quixotic quest for the Holy Grail was doomed from the start.',
      type: 'adjective',
      status: 2,
      note: 'Hello, how are you?',
    },
    {
      id: 4,
      newWord: 'Ephemeral',
      spelling: 'ɪˈfɛm.ər.əl',
      defination: 'lasting for a very short time',
      example: 'The beauty of the cherry blossoms is ephemeral.',
      type: 'adjective',
      status: 1,
      note: 'Hello, how are you?',
    },
    {
      id: 5,
      newWord: 'Ubiquitous',
      spelling: 'juːˈbɪk.wə.təs',
      defination: 'present, appearing, or found everywhere',
      example: 'The company aims to make its product ubiquitous in the market.',
      type: 'adjective',
      status: 1,
      note: 'Hello, how are you?',
    },
    {
      id: 6,
      newWord: 'Idyllic',
      spelling: 'ɪˈdɪl.ɪk',
      defination: 'extremely pleasant, beautiful, or peaceful',
      example: 'We spent an idyllic week in a seaside cottage.',
      type: 'adjective',
      status: 1,
      note: 'Hello, how are you?',
    },
    {
      id: 7,
      newWord: 'Sycophant',
      spelling: 'ˈsɪk.ə.fənt',
      defination: 'a person who acts obsequiously toward someone important in order to gain advantage',
      example: 'He was surrounded by a group of sycophants who praised everything he said.',
      type: 'noun',
      status: 1,
      note: 'Hello, how are you?',
    },
    {
      id: 8,
      newWord: 'Pernicious',
      spelling: 'pərˈnɪʃ.əs',
      defination: 'having a harmful effect, especially in a gradual or subtle way',
      example: 'The pernicious influence of gossip can harm relationships.',
      type: 'adjective',
      status: 0,
      note: 'Hello, how are you?',
    },
    {
      id: 9,
      newWord: 'Effervescent',
      spelling: 'ˌef.ɚˈves.ənt',
      defination: 'bubbling, fizzy; vivacious and enthusiastic',
      example: 'Her effervescent personality brightened up the room.',
      type: 'adjective',
      status: 0,
      note: 'Hello, how are you?',
    },
    {
      id: 10,
      newWord: 'Nefarious',
      spelling: 'nəˈfer.i.əs',
      defination: 'wicked, villainous, or criminal',
      example: 'The nefarious activities of the criminal organization were finally exposed.',
      type: 'adjective',
      status: 0,
      note: 'Hello, how are you?',
    },
    {
      id: 11,
      newWord: 'Nefarious',
      spelling: 'nəˈfer.i.əs',
      defination: 'wicked, villainous, or criminal',
      example: 'The nefarious activities of the criminal organization were finally exposed.',
      type: 'adjective',
      status: 2,
      note: 'Hello, how are you?',
    },
    {
      id: 12,
      newWord: 'Nefarious',
      spelling: 'nəˈfer.i.əs',
      defination: 'wicked, villainous, or criminal',
      example: 'The nefarious activities of the criminal organization were finally exposed.',
      type: 'adjective',
      status: 0,
      note: 'Hello, how are you?',
    },
  ]
}

const LearningFlashCard = () => {
  const [data, setData] = useState(temp)
  const [index, setIndex] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [mode, setMode] = useState([0, 1, 2]) // 0: not done, 1: done, 2: star
  const [isOpenChangeMode, setIsOpenChangeMode] = useState(false)
  let filteredItemCards = data.itemCards;
  if (mode.length > 0) {
    filteredItemCards = data.itemCards.filter(item => mode.includes(item.status))
  }
  const item = filteredItemCards[index];

  useEffect(() => {
    setIndex(0)
  }, [mode])
  console.log('render')
  const handlePressKey = (event) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      setIndex(pre => pre - 1)
    }
    if (event.key === 'ArrowRight' && index < filteredItemCards.length - 1) {
      setIndex(pre => pre + 1)
    }
    if (event.key === 's') {
      setData(prevData => {
        const newData = { ...prevData };
        if (newData.itemCards[index].status === 2) {
          newData.itemCards[index].status = 0;
        } else {
          newData.itemCards[index].status = 2;
        }
        return newData;
      });
    }
    if (event.key === 'd') {
      setData(prevData => {
        const newData = { ...prevData };
        if (newData.itemCards[index].status === 1) {
          newData.itemCards[index].status = 0;
        } else {
          newData.itemCards[index].status = 1;
        }
        return newData;
      });
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handlePressKey)
    return () => {
      document.removeEventListener('keydown', handlePressKey)
    }
  }, [index])
  const handleChangeMode = (listMode) => {
    setMode(listMode)
  }
  const handleCloseChangeMode = () => {
    setIsOpenChangeMode(false)
  }
  return (
    <Box>
      <Header />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        minHeight='0'
        width='100%'
      >
        <Box
          width='800px'
          minHeight='0'
          mt='3%'
          display='flex'
          justifyContent='center'
          alignItems='flex-start' // Căn lề Typography sang bên trái
          flexDirection='column'
        >
          <Typography fontSize='36px' fontWeight='500' mt='3%'>
            Flashcard: {data.flashcardName}
          </Typography>
          <Typography fontSize='18px' mt='1%' fontStyle='italic'>
            {data.description}
          </Typography>
        </Box>

        <Box
          minHeight='0'
          display='flex'
          width='800px'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mt='3%'
          bgcolor='#ffefd8'
          border='1px solid #dbc7a9'
          borderRadius='7px'
        >
          <Typography fontSize='18px' m='2%' color='#855a1f'>
            Chú ý: Bạn nên học tối đa 20 từ mới một ngày. Đây là lượng từ phù hợp để bạn có thể học hiệu quả, hãy học mỗi ngày để có thể nâng cao vốn từ vựng của mình.
          </Typography>
        </Box>

        <Box
          minHeight='0'
          display='flex'
          width='800px'
          justifyContent='space-between'
          alignItems='center'
          mt='3%'
        >
          <Button sx={{ textTransform: 'none', fontSize: '18px' }} startIcon={<SettingsIcon />} onClick={() => setIsOpenChangeMode(true)}>
            Chọn chế độ
          </Button>
          <Button sx={{ textTransform: 'none', fontSize: '18px' }} startIcon={<ShuffleIcon />}>
            Xáo trộn
          </Button>
        </Box>
        <Box
          width='800px'
          minHeight='0'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mt='10px'
        >
          <Box>
            <FlipingCard item={item} isFliped={true} />
          </Box>
          <Box display='flex' alignItems='center' mt='3%'>
            <IconButton
              disabled={index === 0}
              sx={{
                border: index !== 0 ? '1px solid #757575' : '1px solid #bdbdbd'
              }}
              onClick={() => setIndex(pre => pre - 1)}
            >
              <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography fontSize='20px' fontWeight='bold' m='0 10px'>{index + 1}/{filteredItemCards.length}</Typography>
            <IconButton
              disabled={index === filteredItemCards.length - 1}
              sx={{
                border: index !== filteredItemCards.length - 1 ? '1px solid #757575' : '1px solid #bdbdbd'
              }}
              onClick={() => setIndex(pre => pre + 1)}
            >
              <ArrowForwardOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Footer />
      <ChangeMode
        isOpenChangeMode={isOpenChangeMode}
        handleCloseChangeMode={handleCloseChangeMode}
        handleChangeMode={handleChangeMode}
        checkedMode={mode}
      />
    </Box>
  )
}

export default LearningFlashCard