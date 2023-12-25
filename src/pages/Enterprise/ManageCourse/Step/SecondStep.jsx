import { Box, Button, Collapse, Divider, IconButton, Modal, TextField, Typography } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import React, { useEffect } from 'react'
import { useState } from 'react';
import AddTopicModel from '../AddModal/AddTopicModel';
import TopicCard from '../Component/TopicCard';
import SaveIcon from '@mui/icons-material/Save';
import { getTopicBycourseId, AddTopic, AddVideo } from '../../../../Services/AddCourseService';
import { alertSuccess, alertError } from '../../../../component/AlertComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';

const SecondStep = ({
  onClickNext,
  onClickBack,
  id
}) => {
  const [refresh, setRefresh] = useState(false);
  const [listVideo, setListVideo] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    getTopicBycourseId(id).then(res => {
      console.log(res.data)
      setData(res.data)
      console.log(data)
    })
  }, [refresh])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(data)
  const [topicName, setTopicName] = useState({});
  const [videoTitle, setVideoTitle] = useState({});
  useEffect(() => {
    console.log('renderer')
    //setRefresh(!refresh)
  }, [topicName, videoTitle])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddTitle = (value) => {
    console.log(value)
    AddVideo(JSON.stringify({
      'topicId': value.topicId,
      'videoTitle': value.title,
    }))
      .then(res => {
        alertSuccess({ message: 'Thêm video thành công' })
        setIsModalOpen(false);
        console.log(res.data)
        setRefresh(!refresh)
      })
    setVideoTitle({ ...videoTitle, 'videoTitle': value.title })

  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVideo = (video) => {
    console.log('video: ', video)
    var i = listVideo.findIndex(v => v.videoId === video.videoId)
    var updateData = [...listVideo]
    if (i !== -1) {
      updateData[i].videoUrl = video.videoUrl
    } else {
      updateData.push(video);
    }

    console.log('updateData: ', updateData)
    setListVideo(updateData)
  }
  const handleDeleteVideo = (videoId) => {
    console.log("videoId: ", videoId)
  }

  const handleAddTopicName = (value, topicId) => {
    console.log(value)
    console.log(topicId)
    AddTopic(JSON.stringify({
      'courseId': id,
      'topicName': value,
      'topicDescription': 'This is topic description'
    }))
      .then(res => {
        alertSuccess({ message: 'Thêm topic thành công' })
        setIsModalOpen(false);
        console.log(res.data)
        setRefresh(!refresh)
      })
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
      <ToastContainer />
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
        data.length === 0 ? ('') : (
          data.map((topic, index) => (
            <TopicCard topic={topic} key={index} handleAddTitle={handleAddTitle} handleAddVideo={handleAddVideo} handleDeleteVideo={handleDeleteVideo} />
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