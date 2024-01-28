import { Box, Button, Collapse, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { API_FormFile } from '../../../../component/callApi';

const DetailTopicCard = ({
  Videos,
  handleAddVideo,
  handleDeleteVideo
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);


  //Set collapse
  const handleSettingsClick = (videoId) => {
    console.log(videoId)
    console.log(isOpenCollapse)
    if (isOpenCollapse.includes(videoId)) {
      setIsOpenCollapse(isOpenCollapse.filter(id => id !== videoId));
    } else {
      var temp = [...isOpenCollapse, videoId];
      console.log(temp)
      setIsOpenCollapse(temp);
    }
  }

  //Add or change video 
  const onVideoChange = (event, videoId) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    console.log('file', file)
    console.log('videoId', videoId)
    console.log('videoUrl', videoUrl)
    const isExist = videos.find(video => video.videoId === videoId);
    if (isExist) {
      setVideos(videos.map(video => video.videoId === videoId ? { ...video, videoAttachment: file } : video));
    }
    else {
      setVideos([...videos, { videoId: videoId, videoAttachment: file }]);
    }
  }
  return (
    <>
      {
        Videos?.map((video, index) => (
          <Box ml='3%' width='95%' bgcolor='#edeff5' mt='1%' mb='1% ' key={index}>
            <Box display='flex' justifyContent='space-between' minHeight='80px' id='Box1'>
              <Box width='40%' display='flex' alignItems='center'>
                <Typography fontSize='22px' ml='3%' fontWeight='600'>
                  <PlayCircleOutlineOutlinedIcon sx={{ mr: '8px' }} />
                  {video.videoTitle}
                </Typography>
                <Box ml='3%'>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteVideo(video.videoId)} sx={{ padding: '0' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box display='flex' alignItems='center' alignContent='center' sx={{ mr: '3%' }}>
                {/* <IconButton>
                  <SaveIcon sx={{ color: 'green' }} onClick={() => handleSaveVideo(video.videoId)} />
                </IconButton> */}
                <IconButton onClick={() => handleSettingsClick(video.videoId)}>
                  <SettingsOutlinedIcon />
                </IconButton>

              </Box>

            </Box>
            <Collapse in={isOpenCollapse.includes(video.videoId)} timeount="auto" unmountOnExit>
              <Box display='flex' justifyContent='space-between' id='Box2'>
                <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='500px' border='1px solid gray' ml='3%' flexDirection='column'>
                  {/* {selectedVideoSrc[video.videoId] && (
                    <video
                      width="100%"
                      height="380px"
                      controls
                      src={selectedVideoSrc[video.videoId]}
                    />
                  )} */}
                  <input
                    accept="video/mp4"
                    style={{ display: 'none' }}
                    id="video-input"
                    type="file"
                    onChange={(event) => onVideoChange(event, video.videoId)}
                  />
                  <label htmlFor="video-input">
                    <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px', mt: '10px' }}>
                      Choose Video
                    </Button>
                  </label>
                  {/* {videoName[video.videoId] && (
                    <Typography fontSize="22px" mt="1%" color="rgba(0, 0, 0, 0.8)">
                      {videoName[video.videoId]}
                    </Typography>
                  )} */}

                </Box>
                <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='500px' border='1px solid gray' mr='3%' flexDirection='column'>
                  {/* <input
                    accept=".rar"
                    style={{ display: 'none' }}
                    id="file-input"
                    type="file"
                    onChange={(event) => handleRarFileChange(event)}
                  />
                  {
                    rarName[video.videoId] && (
                      <Typography fontSize="22px" mt="1%" color="rgba(0, 0, 0, 0.8)">
                        {rarName[video.videoId]}
                      </Typography>
                    )
                  }
                  <label htmlFor="file-input">
                    <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}>
                      Choose file
                    </Button>
                  </label> */}
                </Box>
              </Box>
              <Box width='100%' height='30px'>

              </Box>
            </Collapse>

          </Box>
        ))
      }

    </>

  )
}

export default DetailTopicCard