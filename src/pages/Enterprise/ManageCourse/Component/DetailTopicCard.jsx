import { Box, Button, Collapse, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';

const DetailTopicCard = ({
  Videos
}) => {
  const [isBox2Visible, setIsBox2Visible] = useState(0);
  const [selectedVideoSrc, setSelectedVideoSrc] = useState('');
  const handleSettingsClick = (value) => {
    setIsBox2Visible(value);
  };
  const handleRarFileChange = (event) => {
    const selectedRarFile = event.target.files[0];
    // Xử lý tệp RAR đã chọn ở đây
    console.log('Selected RAR File:', selectedRarFile);
  };

  const handleVideoChange = (event, videoId) => {
    const selectedVideo = event.target.files[0];

    console.log('videoId:', videoId);
    console.log('Selected Video:', selectedVideo);
    const videoUrl = URL.createObjectURL(selectedVideo);
    setSelectedVideoSrc(videoUrl);
  };
  return (
    <>
      {
        Videos.map((video, index) => (
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
                  <IconButton sx={{ padding: '0' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <IconButton sx={{ mr: '3%' }} onClick={() => handleSettingsClick(video.videoId)}>
                <SettingsOutlinedIcon />
              </IconButton>
            </Box>
            <Collapse in={isBox2Visible === video.videoId}>
              <Box display='flex' justifyContent='space-between' id='Box2'>
                <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='400px' border='1px solid gray' ml='3%'>
                  <input
                    accept="video/mp4"
                    style={{ display: 'none' }}
                    id="video-input"
                    type="file"
                    onChange={(event) => handleVideoChange(event, video.videoId)}

                  />
                  <label htmlFor="video-input">
                    <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}>
                      Choose Video
                    </Button>
                  </label>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='center' width='45%' height='400px' border='1px solid gray' mr='3%'>
                  {selectedVideoSrc && (
                    <video
                      width="100%"
                      height="400px"
                      controls
                      src={selectedVideoSrc}
                    />
                  )}
                  {/* <input
                    accept=".rar/*"
                    style={{ display: 'none' }}
                    id="file-input"
                    type="file"
                    onChange={(event) => handleRarFileChange(event)}
                  />
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