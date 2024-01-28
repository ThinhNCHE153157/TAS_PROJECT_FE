import React, { useState } from 'react'
import Header from '../../../../layout/Header'
import { Alert, Avatar, Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import bgPic from '../../../../Assets/img/flashcard_header.png'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Footer from '../../../../layout/Footer';
import AddListFlashcard from './Component/AddListFlashcard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetFlashcardByAccountId } from '../../../../Services/FlascardService';
import { Navigate, useNavigate } from 'react-router-dom';

var lf = [
  { flashcardId: 1, accountId: 101, flashcardName: "Travel", description: "Discover different cultures and explore new places.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 20 },
  { flashcardId: 1, accountId: 101, flashcardName: "School", description: "Learn new subjects and expand your knowledge.", isOwn: 0, createUser: "Other", numberOfItem: 15 },
  { flashcardId: 1, accountId: 101, flashcardName: "Technology", description: "Explore the latest advancements in technology.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 25 },
  { flashcardId: 1, accountId: 101, flashcardName: "Food", description: "Discover delicious cuisines from around the world.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 18 },
  { flashcardId: 1, accountId: 101, flashcardName: "History", description: "Learn about significant events and historical figures.", isOwn: 0, createUser: "User5", numberOfItem: 22 },
  { flashcardId: 1, accountId: 101, flashcardName: "Science", description: "Explore the wonders of the natural world.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 30 },
  { flashcardId: 1, accountId: 101, flashcardName: "Art", description: "Appreciate and understand various forms of art.", isOwn: 0, createUser: "User7", numberOfItem: 12 },
  { flashcardId: 1, accountId: 101, flashcardName: "Music", description: "Enjoy different genres of music and their histories.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 28 },
  { flashcardId: 1, accountId: 101, flashcardName: "Sports", description: "Learn about sports and their impact on society.", isOwn: 0, createUser: "User9", numberOfItem: 24 },
  { flashcardId: 1, accountId: 101, flashcardName: "Nature", description: "Connect with the beauty of the natural environment.", isOwn: 1, createUser: "vinhtrt12", numberOfItem: 16 },
];

const FlashCard = () => {

  const [tabValue, setTabValue] = useState('1')
  const [flashcards, setflashcards] = useState(lf)
  const [isOpenAddFlashcard, setIsOpenAddFlashcard] = useState(false)
  const userId = useSelector((state) => state.user?.User?.accountId);
  const nav = useNavigate();
  const handleAddFlashcard = (value) => {

  }
  useEffect(() => {
    GetFlashcardByAccountId(userId).then(res => {
      setflashcards(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  const renderTab1 = () => {
    return (
      <Box
        mt='2%'
        width='100%'
        minHeight='0'
      >
        <Box width='60%' minHeight='0' margin='auto' height='auto'>
          <Alert sx={{ borderRadius: '10px' }} severity="info">
            Bạn có thể sang mục 'Khám phá' để có thể chọn flashcards do
            chúng tôi đã tạo trước và chia theo các theo các chuyên mục
            từ vựng
          </Alert>
          <Typography fontSize='20px' fontWeight='500' mt='3%'>
            List từ tự tạo:
          </Typography>
          <Grid
            container
            columns={15}
            mt='2%'
          >
            <Grid item xs={3} minHeight='0px'>
              <Button sx={{ width: '95%', textTransform: 'none' }} >
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%',
                    height: 170,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  onClick={() => setIsOpenAddFlashcard(true)}
                >
                  <AddIcon fontSize='large' sx={{ color: 'blue' }} />
                  <Typography sx={{ color: 'blue', fontWeight: '420' }}>Tạo list từ</Typography>
                </Paper>
              </Button>
            </Grid>
            {
              flashcards?.filter(card => card.isOwn === true).map((card, index) => (
                <Grid item xs={3} key={index} sx={{
                  minHeight: '0px',
                  mb: '5%',
                  height: '100%'
                }}>

                  <Button
                    sx={{
                      width: '100%',
                      textTransform: 'none',
                    }}
                    onClick={() => {
                      nav(`/FlashCardDetail/${card.flashcardId}`)
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        bgcolor: '#f8f9fa',
                        minHeight: '0px'
                      }}
                    >
                      <Box mt='5%' ml='8%' width='100%' minHeight='0' mb='15%'>
                        <Grid container>
                          <Grid item xs={11}>
                            <Typography textAlign='left' sx={{ fontWeight: '450', fontSize: '17px' }}>{card.flashcardName}</Typography>

                            <Box display='flex' color='textSecondary' width='100%' flexDirection='column' justifyItems='left'>
                              <Box display='flex' color='textSecondary' width='100%' alignItems='center'>
                                <QuizOutlinedIcon sx={{ fontSize: '15px', color: 'textSecondary' }} />
                                <Typography minWidth='0' color='textSecondary' sx={{ ml: '3%', fontWeight: '450', fontSize: '14px' }}>{card.numberOfItem} từ</Typography>
                              </Box>
                              <Typography textAlign='left' color='textSecondary' sx={{ fontSize: '13.2px', fontStyle: 'italic', mt: '2%' }}>{card.description}</Typography>
                              <Box display='flex' color='textSecondary' width='100%' alignItems='center' mt='5%'>
                                <Avatar src='' sx={{ width: '24px', height: '24px' }} />
                                <Typography color='textSecondary' sx={{ ml: '3%', fontSize: '12px' }}>{card.createUser}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>

                      </Box>
                    </Paper>
                  </Button>
                </Grid>
              ))
            }

          </Grid>
          <Typography fontSize='20px' fontWeight='500'>
            List từ đã lưu:
          </Typography>
          <Grid
            container
            columns={15}
            mt='2%'
          >
            {
              flashcards?.filter(card => card.isOwn === false).map((card, index) => (
                <Grid item xs={3} key={index} sx={{
                  minHeight: '0px',
                  mb: '5%',
                  height: '100%'
                }}>

                  <Button
                    sx={{
                      width: '100%',
                      textTransform: 'none',
                    }}
                    onClick={() => {
                      nav(`/FlashCardDetail/${card.flashcardId}`)
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        bgcolor: '#f8f9fa',
                        minHeight: '0px'
                      }}
                    >
                      <Box mt='5%' ml='8%' width='100%' minHeight='0' mb='15%'>
                        <Grid container>
                          <Grid item xs={11}>
                            <Typography textAlign='left' sx={{ fontWeight: '450', fontSize: '17px' }}>{card.flashcardName}</Typography>

                            <Box display='flex' color='textSecondary' width='100%' flexDirection='column' justifyItems='left'>
                              <Box display='flex' color='textSecondary' width='100%' alignItems='center'>
                                <QuizOutlinedIcon sx={{ fontSize: '15px', color: 'textSecondary' }} />
                                <Typography minWidth='0' color='textSecondary' sx={{ ml: '3%', fontWeight: '450', fontSize: '14px' }}>{card.numberOfItem} từ</Typography>
                              </Box>
                              <Typography textAlign='left' color='textSecondary' sx={{ fontSize: '13.2px', fontStyle: 'italic', mt: '2%' }}>{card.description}</Typography>
                              <Box display='flex' color='textSecondary' width='100%' alignItems='center' mt='5%'>
                                <Avatar src='' sx={{ width: '24px', height: '24px' }} />
                                <Typography color='textSecondary' sx={{ ml: '3%', fontSize: '12px' }}>{card.createUser}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={1}>
                            <Box sx={{ position: 'absolute', top: 0, right: 0, p: 1 }}>
                              <IconButton sx={{ padding: 0 }}>
                                <BookmarkIcon sx={{ color: '#e5cd12' }}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                  }} />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>

                      </Box>
                    </Paper>
                  </Button>
                </Grid>
              ))
            }

          </Grid>
        </Box>
      </Box >
    )
  }

  return (
    <div>
      <Header />
      <Box
        width='100%'
        minHeight='0'
        sx={{
          backgroundImage: `url(${bgPic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // display: 'flex',
          // alignItems: 'center',
          // alignContent: 'center'
        }}
      >
        <Box width='100%' height='2px'></Box>
        <Box width='60%' minHeight='0' margin='auto' mt='4%' position='relative' display='flex' alignItems='center'>
          <QuizOutlinedIcon fontSize='large' />
          <Typography fontSize='30px' fontWeight='500'>Flashcards</Typography>
        </Box>
        <Box width='60%' minHeight='0' margin='auto' mt='1%' mb='1%' position='relative' display='flex' alignItems='center'>
          <Box display='flex' mb='2%'>
            <Button
              variant='outlined'
              onClick={() => setTabValue('1')}
              sx={{
                textTransform: 'none',
                color: 'black',
                borderRadius: '20px',
                bgcolor: tabValue === '1' ? '#83cdde' : '#abe7f5',
                border: 'none',
                fontWeight: tabValue === '1' ? 'bold' : ''
              }}
            >
              List từ của tôi
            </Button>
            <Button
              variant='outlined'
              onClick={() => setTabValue('2')}
              sx={{
                textTransform: 'none',
                color: 'black',
                ml: '10px',
                borderRadius: '20px',
                bgcolor: tabValue === '2' ? '#83cdde' : '#abe7f5',
                fontWeight: tabValue === '2' ? 'bold' : '',
                border: 'none'
              }}
            >
              Khám phá
            </Button>
          </Box>

        </Box>
      </Box>
      <AddListFlashcard
        isOpenAddFlashcard={isOpenAddFlashcard}
        onCloseAddFlashcard={() => setIsOpenAddFlashcard(false)}
        handleAddFlashcard={handleAddFlashcard}
      />

      {
        tabValue === '1' ? (renderTab1()) : ('')
      }

      <Footer />
    </div >
  )
}

export default FlashCard