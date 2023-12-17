import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import { useState } from 'react';
import QuestionCard from '../Component/QuestionCard';
import AddQuestion from '../AddModal/AddQuestion';
import SaveIcon from '@mui/icons-material/Save';

const ThirdStep = ({
  onClickNext,
  onClickBack
}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [questions, setQuestions] = useState([1, 2, 3]);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  }
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  }
  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack();
  }
  return (
    <Box width='100%'>
      <Typography fontSize='30px' fontWeight='500'>
        Câu hỏi ôn tập
      </Typography>
      <Box mt='3%' bgcolor='white' display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' mt='20px' mb='20px' alignItems='center'>
          <Typography fontSize='28px' ml='2%'>
            Câu hỏi ôn tập
          </Typography>
          <IconButton
            sx={{
              mr: '3%',
              bgcolor: '#1976D2',
              borderRadius: '10px',
              '&:hover': {
                bgcolor: 'black',
              }
            }}
            onClick={handleOpenAddModal}
          >
            <AddCardIcon sx={{ color: 'white' }} />
            <Typography
              fontSize='22px'
              fontWeight='500'
              color='white'
              ml='2%'
              sx={{ whiteSpace: 'nowrap' }}
            >
              Thêm câu hỏi mới
            </Typography>
          </IconButton>
        </Box>
      </Box>
      {
        questions.map((question, index) => (
          <QuestionCard />
        ))
      }
      <Divider />
      <Box width='100%' display='flex' mt='3%'>
        <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }}>
          <SaveIcon sx={{ color: 'white' }} />
          <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
            Cập nhật
          </Typography>
        </IconButton>
      </Box>
      <AddQuestion isOpenModal={openAddModal} handleCloseModal={handleCloseAddModal} />

      <Box sx={{ ml: '44%', mt: '2%' }}>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            mr: '8%',
            textTransform: 'none'
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            textTransform: 'none'
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box >
  )
}

export default ThirdStep