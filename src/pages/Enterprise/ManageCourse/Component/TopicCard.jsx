import { Box, Button, Collapse, IconButton, Typography } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailTopicCard from './DetailTopicCard';
import AddVideoTitle from '../AddModal/AddVideoTitle';
import { useState } from 'react';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Edit } from '@mui/icons-material';
import EditVideoModal from '../AddModal/EditVideoModal';
import EditTopicModal from '../AddModal/EditTopicModal';

const TopicCard = ({
  topic,
  handleAddTitle,
  handleAddVideo,
  handleDeleteVideo,
  handleDeleteTopic,
  isOpenCollapse,
  handleSettingsClick,
  handleChangeVideo,
  videoss,
  handleChangeFile,
  files,
  handleEditTopic,
  handleEditVideo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenEditTopicModal, setIsOpenEditTopicModal] = useState(false);
  const [isOpenEditVideoModal, setIsOpenEditVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});//[videoId, videoTitle, videoDescription]
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseEditTopicModal = () => {
    setIsOpenEditTopicModal(false);
  }

  const handleCloseEditVideoModal = () => {
    setIsOpenEditVideoModal(false);
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
          <IconButton
            onClick={() => {
              setIsOpenEditTopicModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDeleteTopic(topic.topicId)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography fontSize='18px' ml='3%' color='rgba(0, 0, 0, 0.6)'>
        Tổng số bài giảng : {topic?.videos?.length || 0}
      </Typography>
      {
        topic?.videos?.length === 0 ? ('') : (
          topic?.videos?.map((video, index) => (
            <Box ml='3%' width='95%' bgcolor='#edeff5' mt='1%' mb='1% ' key={index}>
              <Box display='flex' justifyContent='space-between' minHeight='80px' id='Box1'>
                <Box width='90%' display='flex' alignItems='center'>
                  <Typography fontSize='22px' ml='3%' fontWeight='600'>
                    <PlayCircleOutlineOutlinedIcon sx={{ mr: '8px' }} />
                    {video.videoTitle}
                  </Typography>
                  <Box ml='3%'>
                    <IconButton
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsOpenEditVideoModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                      handleDeleteVideo(video.videoId)
                    }} sx={{ padding: '0' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box display='flex' alignItems='center' alignContent='center' sx={{ mr: '3%' }}>
                  <IconButton onClick={() => {
                    handleSettingsClick(video.videoId);
                  }}
                  >
                    <SettingsOutlinedIcon />
                  </IconButton>

                </Box>

              </Box>
              <Collapse in={isOpenCollapse.includes(video.videoId)} timeount="auto" unmountOnExit>
                <Box display='flex' justifyContent='space-between' id='Box2'>
                  <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='500px' border='1px solid gray' ml='3%' flexDirection='column'>
                    {videoss.find(x => x.videoId == video.videoId) != undefined ? (
                      <video
                        width="100%"
                        height="380px"
                        controls
                        src={videoss.find(x => x.videoId == video.videoId)?.videoUrl}
                      >
                      </video>

                    ) : ('')}

                    <p>{topic.topicId}</p>
                    <input
                      accept="video/mp4"
                      style={{ display: 'none' }}
                      id="video-input"
                      type="file"
                      onChange={(event) => {
                        const topicId = localStorage.getItem('topicId')
                        console.log('topicId', topicId)
                        handleChangeVideo(event, topicId)
                      }}
                    />
                    <label htmlFor="video-input">
                      <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px', mt: '10px' }}
                        onClick={() => {
                          localStorage.setItem('selectedVideoId', video.videoId);
                          localStorage.setItem('topicId', topic.topicId);
                        }}
                      >
                        Choose Video
                      </Button>
                    </label>

                  </Box>
                  <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='500px' border='1px solid gray' mr='3%' flexDirection='column'>
                    {
                      files.find(x => x.videoId == video.videoId) != undefined ? (
                        <Typography fontSize='15px' mt='10px'>
                          {files.find(x => x.videoId == video.videoId)?.name}
                        </Typography>
                      ) : ('')
                    }
                    <input
                      accept=".rar"
                      style={{ display: 'none' }}
                      id="file-input"
                      type="file"
                      key={topic.topicId}
                      onChange={(event) => {
                        const topicId = localStorage.getItem('topicId')
                        handleChangeFile(event, topicId)

                      }
                      }
                    />
                    <label htmlFor="file-input">
                      <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}
                        onClick={() => {
                          localStorage.setItem('selectedVideoId', video.videoId);
                          localStorage.setItem('topicId', topic.topicId);
                        }}
                      >
                        Choose file
                      </Button>
                    </label>
                  </Box>
                </Box>
                <Box width='100%' height='30px'>

                </Box>
              </Collapse>

            </Box>
          ))
        )
      }
      <Box display='flex' alignItems='center' alignContent='center' bgcolor='black' height='70px'>
        <IconButton sx={{ ml: '1%', width: '15%' }} onClick={handleOpenModal}>
          <AddCircleOutlineIcon fontSize='large' sx={{ color: 'white' }} />
          <Typography color='white' fontSize='25px' ml='10px'>
            Tạo bài giảng
          </Typography>
        </IconButton>
      </Box>

      <AddVideoTitle topicId={topic.topicId} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleAdd={handleAddTitle} />
      <EditVideoModal
        isOpenEditVideoModal={isOpenEditVideoModal}
        handleCloseEditVideoModal={handleCloseEditVideoModal}
        handleEditVideo={handleEditVideo}
        selectedVideo={selectedVideo}
      />
      <EditTopicModal
        topicId={topic.topicId}
        isOpenEditTopicModal={isOpenEditTopicModal}
        handleCloseEditTopicModal={handleCloseEditTopicModal}
        handleEditTopic={handleEditTopic}
        topicName={topic.topicName}
        topicDescription={topic.topicDescription}
      />
    </Box>
  )
}

export default TopicCard