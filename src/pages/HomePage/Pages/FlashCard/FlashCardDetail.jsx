import React, { useEffect, useState } from 'react'
import Header from '../../../../layout/Header'
import { Box, Button, IconButton, Typography } from '@mui/material'
import bgPic from '../../../../Assets/img/flashcard.png'
import Footer from '../../../../layout/Footer'
import AddFlashCard from './Component/AddFlashCard'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AddNewWord from './Component/AddNewWord'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import EditFlashCard from './Component/EditFlashCard'
import EditItemCard from './Component/EditItemCard'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateItemCard, GetFlashCardByFlashcardId, GetFlashcardByAccountId } from '../../../../Services/FlascardService'
import { alertSuccess } from '../../../../component/AlertComponent'
import { useSelector } from 'react-redux'
const itemsPerPage = 10;
const temp = {
  id: 1,
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
      status: 0,
      note: 'Hello, how are you?',
    },
    {
      id: 3,
      newWord: 'Quixotic',
      spelling: 'kwɪkˈsɒt.ɪk',
      defination: 'extremely idealistic; unrealistic and impractical',
      example: 'His quixotic quest for the Holy Grail was doomed from the start.',
      type: 'adjective',
      status: 0,
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
      status: 0,
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
const FlashCardDetail = () => {
  const accountId = useSelector((state) => state.user?.User?.accountId);
  const { id } = useParams();
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenAddFlashCardModal, setIsOpenAddFlashCardModal] = useState(false);
  const [isOpenEditFlashCardModal, setIsOpenEditFlashCardModal] = useState(false);
  const [isOpenAddNewWordModal, setIsOpenAddNewWordModal] = useState(false);
  const [isOpenEditItemCardModal, setIsOpenEditItemCardModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedItemCard, setSelectedItemCard] = useState(null);
  const [currentDataOnPage, setCurrentDataOnPage] = useState([])
  const [data, setData] = useState(temp)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  useEffect(() => {
    GetFlashCardByFlashcardId(id, accountId).then(res => {
      console.log(res)
      setCurrentDataOnPage(res.data.itemCards.slice(indexOfFirstItem, indexOfLastItem))
      setData(res.data)
    }
    ).catch(err => {
      console.log(err)
    })
  }, [refresh, currentPage])


  const doRefresh = () => {
    setRefresh(!refresh)
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const flagElement = document.getElementById('flag');
    if (flagElement) {
      const offsetTop = flagElement.offsetTop;
      const currentY = window.scrollY;
      const distance = Math.abs(currentY - offsetTop);
      const duration = 500; // Thời gian di chuyển (milliseconds)

      const startTime = performance.now();

      function animateScroll() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;

        window.scrollTo(0, easeInOutQuad(elapsed, currentY, offsetTop - currentY, duration));

        if (elapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      }

      animateScroll();
    }
  };
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  const handleCloseAddFlashCardModal = () => {
    setIsOpenAddFlashCardModal(!isOpenAddFlashCardModal);
  }
  const handleCloseAddNewWordModal = () => {
    setIsOpenAddNewWordModal(!isOpenAddNewWordModal);
  }
  const handleCloseEditFlashCardModal = () => {
    setIsOpenEditFlashCardModal(!isOpenEditFlashCardModal);
  }
  const handleCloseEditItemCardModal = () => {
    setIsOpenEditItemCardModal(!isOpenEditItemCardModal);
  }
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
    window.speechSynthesis.speak(utterance);
  }
  const handleAddMultipleWords = (data) => {
    const newData = data.map(item => ({
      ...item,
      flashcardId: id,
    }));
    console.log('newData', newData)
    CreateItemCard(newData).then(res => {
      alertSuccess('Thêm từ thành công')
      setIsOpenAddFlashCardModal(false)
      setRefresh(!refresh)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <Box >
      <Header />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        minHeight='0'
        width='100%'
        bgcolor='#f8f9fa'
      >
        <Box
          width='60%'
          minHeight='0'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
        >
          <img src={bgPic} width='100%' height='auto' />
          <Box display='flex' width='100%' alignItems='center' alignContent='center' mt='4%' flexDirection='column'>
            <Box display='flex' width='90%' alignItems='center' alignContent='center'>
              <Typography fontSize='35px' sx={{ fontWeight: 'bold' }} align='left'>
                Flashcard: {data.flashcardName}
              </Typography>
              {
                data.isOwn === true && (
                  <>
                    <Button
                      variant='contained'
                      sx={{ textTransform: 'none', ml: '25px', fontSize: '18px' }}
                      onClick={() => setIsOpenEditFlashCardModal(true)}
                    >Chỉnh sửa </Button>
                    <Button
                      variant='contained'
                      sx={{ textTransform: 'none', ml: '15px', fontSize: '18px', }}
                      onClick={() => {
                        console.log('click')
                        setIsOpenAddNewWordModal(true)
                      }}
                    >Thêm từ</Button>
                    <Button
                      variant='contained'
                      sx={{ textTransform: 'none', ml: '15px', fontSize: '18px' }}
                      onClick={() => setIsOpenAddFlashCardModal(true)}
                    >
                      Tạo hàng loạt
                    </Button>
                  </>
                )
              }

            </Box>

            <Typography fontSize='18px' mt='2%' align='left' width='90%' fontStyle='italic'>
              {data.description}
            </Typography>


            <Box border='1px solid #c8ead6' borderRadius='5px' width='90%' bgcolor='#d8f0e2' mt='4%'>
              <Typography fontSize='18px' m='1%' align='left' width='98%' fontStyle='italic'>
                Chú ý: nếu như list từ vựng của bạn là tiếng Trung, Nhật, hay Hàn, click vào nút chỉnh sửa để thay đổi ngôn ngữ. Audio mặc định là tiếng Anh-Anh và Anh-Mỹ. Các ngôn ngữ khác chỉ hỗ trợ trên máy tính.
              </Typography>
            </Box>

            <Box mt='2%' width='90%' id="flag">
              <Button sx={{ width: '100%', color: '#1e2022', bgcolor: '#e8f2ff', border: '1px solid #35509a' }}
                onClick={() => nav(`/LearningFlashCard/${id}`)}
              >
                Luyện tập flashcard
              </Button>
            </Box>

            <Box mt='2%' width='90%' border='1px solid #e0e0e0' borderRadius='5px' display='flex' justifyContent='space-between' bgcolor='white' boxShadow='0 4px 0 0 rgba(143,156,173,.2)'>
              <Typography fontSize='20px' m='3%' fontWeight='500' color='#88869d'>
                Tổng số từ: <strong style={{ color: 'black' }}>{data.itemCards.length}</strong>
              </Typography>
              <Typography fontSize='20px' m='3%' fontWeight='500' color='#88869d'>
                Số từ đã nhớ: <strong style={{ color: 'black' }}>{data.itemCards.filter(x => x.status === 1).length}</strong>
              </Typography>
              <Typography fontSize='20px' m='3%' fontWeight='500' color='#88869d'>
                Cần ôn tập: <strong style={{ color: '#c34040' }}>{data.itemCards.filter(x => x.status === 0).length}</strong>
              </Typography>
            </Box>

            <Box mt='3%' width='90%'>
              <Typography fontSize='20px' fontWeight='500' >
                Danh sách các từ:
              </Typography>
            </Box>

            {
              currentDataOnPage.map((item, index) => (
                <Box mt='1.5%' width='90%' border='1px solid #e0e0e0' borderRadius='5px' display='flex' flexDirection='column' justifyContent='space-between' bgcolor='white' boxShadow='0 4px 0 0 rgba(143,156,173,.2)' key={item.id}>
                  <Box m='2%' width='96%' display='flex' justifyContent='space-between'>
                    <Box width='68%' display='flex' flexDirection='column'>
                      <Box display='flex' alignItems='center' >
                        <Typography fontSize='22px' fontWeight='600'>
                          {item.newWord} - {item.spelling}
                        </Typography>
                        <IconButton
                          sx={{
                            ml: '5px',
                            mr: '3px',
                            bgcolor: '#e8f2ff'
                          }}
                          onClick={() => handleSpeakUS(item.newWord)}
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
                          onClick={() => handleSpeakUK(item.newWord)}
                        >
                          <VolumeUpIcon sx={{ color: '#1976d2', fontSize: '20px' }} />
                        </IconButton>
                        UK
                      </Box>

                      <Typography fontSize='18px' fontWeight='500' >
                        {item.type}
                      </Typography>

                      <Typography fontSize='18px' fontWeight='500' mt='2%'>
                        Định nghĩa:
                      </Typography>
                      <Typography fontSize='18px' paddingLeft='20px'>
                        {item.defination}
                      </Typography>
                      <Typography fontSize='18px' fontWeight='500' mt='2%'>
                        Ví dụ:
                      </Typography>
                      <Typography fontSize='18px' paddingLeft='20px'>
                        {item.example}
                      </Typography>
                      <Typography fontSize='18px' fontWeight='500' mt='2%' fontStyle='italic'>
                        *Ghi chú:
                      </Typography>
                      <Typography fontSize='18px' paddingLeft='20px' fontStyle='italic'>
                        {item.note}
                      </Typography>
                    </Box>
                    <Box width='30%' display='flex' justifyContent='space-between' alignItems='center'>
                      <img src={item.image} width='100%' height='auto' />
                    </Box>
                  </Box>
                  {
                    data.isOwn === true && (
                      <Box width='100%' display='flex' alignItems='center' justifyContent='end' >
                        <IconButton onClick={() => {
                          setIsOpenEditItemCardModal(true)
                          setSelectedItemCard(item)
                        }}
                        >
                          <DriveFileRenameOutlineOutlinedIcon sx={{ color: '#5757abed' }} />
                        </IconButton>
                        <IconButton sx={{ mr: '1%' }}>
                          <DeleteForeverIcon sx={{ color: '#cd3131', }} />
                        </IconButton>
                      </Box>
                    )
                  }

                </Box>
              ))
            }
            <Box display='flex' mt='2%' width='90%' >
              {data.itemCards.length > itemsPerPage && (
                <>
                  {Array.from({ length: Math.ceil(data.itemCards.length / itemsPerPage) }, (_, index) => (
                    <Button
                      variant='outlined'

                      onClick={() => handlePageChange(index + 1)}
                      sx={{
                        padding: '6px',
                        minWidth: '40px',
                        minHeight: '45px',
                        mr: '5px',
                        backgroundColor: index + 1 === currentPage ? '#e8f2ff' : 'white',

                      }}
                    >
                      <Typography fontWeight={index + 1 === currentPage ? 'bold' : 'normal'}>{index + 1}</Typography>
                    </Button>
                  ))}
                </>
              )}
            </Box>
          </Box>

        </Box>
      </Box>
      <Footer />
      <AddFlashCard isOpenAddFlashCardModal={isOpenAddFlashCardModal} handleCloseAddFlashCardModal={handleCloseAddFlashCardModal}
        handleAddMultipleWords={handleAddMultipleWords}
        doRefresh={doRefresh}
      />
      <AddNewWord isOpenAddNewWordModal={isOpenAddNewWordModal} handleCloseAddNewWordModal={handleCloseAddNewWordModal} flashcardName={data.flashcardName} flashcardId={id}
        doRefresh={doRefresh}
      />
      <EditFlashCard isOpenEditFlashCardModal={isOpenEditFlashCardModal} flashcardName={data.flashcardName} description={data.description} handleCloseEditFlashCardModal={handleCloseEditFlashCardModal} flashcardId={id}
        doRefresh={doRefresh}
      />
      {
        selectedItemCard && (
          <EditItemCard isOpenEditItemCardModal={isOpenEditItemCardModal} ItemCard={selectedItemCard} handleCloseEditItemCardModal={handleCloseEditItemCardModal} flashcardName={data.flashcardName}
            doRefresh={doRefresh}
          />
        )
      }
    </Box >
  )
}

export default FlashCardDetail