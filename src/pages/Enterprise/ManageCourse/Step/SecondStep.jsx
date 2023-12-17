import { Box, Button, Collapse, Divider, IconButton, Modal, TextField, Typography } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import React, { useEffect } from 'react'
import { useState } from 'react';
import AddTopicModel from '../AddModal/AddTopicModel';
import TopicCard from '../Component/TopicCard';
import SaveIcon from '@mui/icons-material/Save';

const SecondStep = ({
  onClickNext,
  onClickBack
}) => {

  const data = {

    Topics: [
      {
        topicName: 'This is topic name',
        Videos: [
          {
            videoName: 'This is videoName 1'
          },
          {
            videoName: 'This is videoName 2'
          }
        ],
      },
      {
        topicName: 'This is topic name',
        Videos: [
          {
            videoName: 'This is videoName 1'
          },
          {
            videoName: 'This is videoName 3'
          }
        ],
      }
    ],
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(data)
  const [topicName, setTopicName] = useState({});
  const [videoTitle, setVideoTitle] = useState({});
  useEffect(() => {
    console.log('renderer')
  }, [topicName, videoTitle])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddTitle = (value) => {
    console.log(value)
    setVideoTitle({ ...videoTitle, 'videoTitle': value })

  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTopicName = (value) => {
    console.log(value)
    setTopicName({ ...topicName, 'topicName': value })
  }

  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack()
  }
  return (
    <Box width='100%'>
      <Typography fontSize='30px' fontWeight='500'>
        Chương trình giảng dạy
      </Typography>
      <Box mt='3%' bgcolor='white' display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' mt='20px' mb='20px' alignItems='center'>
          <Typography fontSize='28px' ml='2%'>
            Chương trình giảng dạy
          </Typography>
          <IconButton
            sx={{
              mr: '3%',
              bgcolor: '#1976D2',
              borderRadius: '10px'
            }}
            onClick={handleOpenModal}
          >
            <AddCardIcon sx={{ color: 'white' }} />
            <Typography
              fontSize='22px'
              fontWeight='500'
              color='white'
              ml='2%'
              sx={{ whiteSpace: 'nowrap' }}
            >
              Thêm topic mới
            </Typography>
          </IconButton>
        </Box>
      </Box>
      {
        course.Topics.length === 0 ? ('') : (
          course.Topics.map((topic, index) => (
            <TopicCard topic={topic} key={index} handleAddTitle={handleAddTitle} />
          ))
        )

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
      <AddTopicModel isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleAdd={handleAddTopicName} />
    </Box >
  )
}

export default SecondStep