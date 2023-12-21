import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailTopicCard from './DetailTopicCard';
import AddVideoTitle from '../AddModal/AddVideoTitle';
import { useState } from 'react';
const TopicCard = ({
  topic,
  handleAddTitle
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const AddTitle = (value) => {
    handleAddTitle(value)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box mt='2%' bgcolor='white' display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='space-between' mt='20px' mb='5px' alignItems='center'>
        <Typography fontSize='26px' ml='3%' fontWeight='600'>
          {topic.topicName}
        </Typography>
        <Box mr='3%'>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography fontSize='18px' ml='3%' color='rgba(0, 0, 0, 0.6)'>
        Tổng số bài giảng : {topic.videos.length}
      </Typography>
      {
        topic.videos.length === 0 ? ('') : (
          <DetailTopicCard Videos={topic.videos} />
        )
      }
      {/* {
        topic.Videos.length === 0 ? (<DetailTopicCard />) : (
          topic.Videos.map((video, index) => {
            <DetailTopicCard video={video} key={index} />
          })
        )
      } */}
      <Box display='flex' alignItems='center' alignContent='center' bgcolor='black' height='70px'>
        <IconButton sx={{ ml: '1%', width: '15%' }} onClick={handleOpenModal}>
          <AddCircleOutlineIcon fontSize='large' sx={{ color: 'white' }} />
          <Typography color='white' fontSize='25px' ml='10px'>
            Tạo bài giảng
          </Typography>
        </IconButton>
      </Box>

      <AddVideoTitle topicId={topic.topicId} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleAdd={handleAddTitle} />
    </Box>
  )
}

export default TopicCard