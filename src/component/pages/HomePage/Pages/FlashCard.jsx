import React, { useState } from 'react'
import Header from '../../../layout/Header'
import { Alert, Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
import bgPic from '../../../../Assets/img/flashcard_header.png'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { TabContext } from '@mui/lab';
import { Add, Toys } from '@mui/icons-material';
import Footer from '../../../layout/Footer';
const FlashCard = () => {
  const [tabValue, setTabValue] = useState('1')
  const [flashcards, setflashcards] = useState([1, 2, 3, 4, 5])

  const renderTab1 = () => {
    return (
      <Box
        mt='2%'
        width='100%'
        minHeight='0'
      >
        <Box width='60%' minHeight='0' margin='auto' bgcolor='pink' height='auto'>
          <Alert sx={{ borderRadius: '10px' }} severity="info">
            Bạn có thể sang mục 'Khám phá' để có thể chọn flashcards do
            chúng tôi đã tạo trước và chia theo các theo các chuyên mục
            từ vựng
          </Alert>
          <Typography fontSize='20px' fontWeight='500' mt='3%'>
            List từ tự tạo:
          </Typography>
          <Grid container
            direction='row'
            justifyContent='left'
            columns={15}
          >
            <Grid item xs={3}>
              <Button sx={{ width: '80%', textTransform: 'none' }} >
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%',
                    height: 160,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <AddIcon fontSize='large' sx={{ color: 'blue' }} />
                  <Typography sx={{ color: 'blue', fontWeight: '420' }}>Tạo list từ</Typography>
                </Paper>
              </Button>
            </Grid>
            {
              flashcards.map((card, index) => (
                <Grid item xs={3} key={index} sx={{
                  minHeight: '0',
                  mb: '5%'
                }}>

                  <Button
                    sx={{
                      width: '80%',
                      textTransform: 'none',
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        bgcolor: '#e9ecf0',

                      }}
                    >
                      <Box mt='5%' ml='8%' width='100%' minHeight='0' mb='15%'>
                        <Typography textAlign='left' sx={{ fontWeight: '450', fontSize: '17px' }}>Cambridge Vocabulary for IELTS</Typography>

                        <Box display='flex' color='textSecondary' width='100%' flexDirection='column' justifyItems='left'>
                          <Box display='flex' color='textSecondary' width='100%' alignItems='center'>
                            <QuizOutlinedIcon sx={{ fontSize: '15px', color: 'textSecondary' }} />
                            <Typography minWidth='0' color='textSecondary' sx={{ ml: '3%', fontWeight: '450', fontSize: '14px' }}>50 từ</Typography>
                          </Box>
                          <Typography textAlign='left' color='textSecondary' sx={{ fontSize: '13.2px', fontStyle: 'italic', mt: '2%' }}>Cambridge Vocabulary for IELTS (20 units)</Typography>
                          <Box display='flex' color='textSecondary' width='100%' alignItems='center' mt='5%'>
                            <Avatar src='' sx={{ width: '24px', height: '24px' }} />
                            <Typography color='textSecondary' sx={{ ml: '3%', fontSize: '12px' }}>vinh2312001</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Button>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
    )
  }

  return (
    <div>
      <Header />
      <Box
        mt='3%'
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

      {
        tabValue === '1' ? (renderTab1()) : ('')
      }

      <Footer />
    </div >
  )
}

export default FlashCard