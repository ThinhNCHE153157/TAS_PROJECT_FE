import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Button, Collapse, Stack } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VideoPlayer from '../../../HomePage/Component/VideoPlayer';
import { getTopicBycourseId } from '../../../../Services/AddCourseService';

const Step2 = ({
  id
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentVideo, setCurrentVideo] = useState('')
  const [Topics, setTopics] = useState([])
  const drawerWidth = 300;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  useEffect(() => {
    getTopicBycourseId(id).then((res) => {
      console.log('id:', id)
      console.log('res: ', res.data)
      setTopics(res.data)
      setCurrentTopic(res.data[0])
      setCurrentVideo(res.data[0].videos[0])
      setExpandedTopics([res.data[0].topicId])
    })
  }, [id])

  const handleTopicToggle = (topicId) => {
    setExpandedTopics((prevExpandedTopics) => {
      if (prevExpandedTopics.includes(topicId)) {
        return prevExpandedTopics.filter((id) => id !== topicId);
      } else {
        return [...prevExpandedTopics, topicId];
      }
    });
  };

  return (
    <Box
      sx={{
        border: '1px solid black',
        padding: '5px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box sx={{ ml: '3%', mt: '1%', height: '20px' }}>

        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography fontSize='24px' fontWeight='500' color='#3d5563'>
            Tên khóa học
          </Typography>
          <Divider />
          <List disablePadding >

            {Topics.map((topic, index) => (
              <>
                <ListItem
                  key={topic.topicId}
                  disablePadding
                  sx={{ display: 'block' }}
                  onClick={() => handleTopicToggle(topic.topicId)}>
                  <ListItemButton>
                    <Typography
                      variant='body1'
                      children={`Topic ${index + 1}: ${topic.topicName}`}
                      sx={{ fontWeight: 'bold' }}
                    />
                    {expandedTopics.includes(topic.topicId) ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={expandedTopics.includes(topic.topicId)} timeount="auto" unmountOnExit>
                  {topic.videos.map((video, index) => (
                    <ListItem
                      key={video.videoId}
                      disablePadding
                      sx={{
                        display: 'block',
                        backgroundColor: video.videoId === currentVideo.videoId ? '#f7f7f7' : 'inherit',
                        borderLeft: '',
                        borderLeftColor: ''
                      }}>
                      <ListItemButton onClick={() => {
                        setCurrentTopic(topic)
                        setCurrentVideo(video)
                      }}>

                        <Box
                          display='flex'
                          width='90%'

                        >

                          <PlayCircleOutlineIcon fontSize='medium' />
                          <Typography
                            variant='body1' sx={{ ml: '5%', fontWeight: 'bold' }}
                            width='100%'
                          >
                            Video:
                            <Typography display='inline' variant='body1' sx={{ ml: '2%', width: 'auto' }}>{video.videoTitle}</Typography>
                          </Typography>
                        </Box>


                      </ListItemButton>
                    </ListItem>
                  ))}
                </Collapse>
              </>


            ))}
          </List>
        </Box>

        <Divider />
        <Main open={open}>
          <Box
            sx={{
              width: '100%',
              height: '100%',

            }}
          >
            <Box display='flex'>
              <AccountBalanceIcon sx={{ mr: '8px' }} />
              <ArrowForwardIosIcon fontSize='small' sx={{ mr: '8px' }} />
              <Typography variant='body1' sx={{ mr: '8px' }}>{currentTopic.topicName} </Typography>
              <ArrowForwardIosIcon fontSize='small' sx={{ mr: '8px' }} />
              <Typography variant='body1' sx={{ mr: '8px' }}>{currentVideo.videoTitle}</Typography>
            </Box>
            <VideoPlayer url={currentVideo.videoUrl} title={currentVideo.videoTitle} />
          </Box>
        </Main>
      </Box >
    </Box>
  )
}

export default Step2