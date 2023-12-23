import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Collapse } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Header from '../../../layout/Header';
import VideoPlayer from '../Component/VideoPlayer'
import { BASE_URL } from '../../../Utils/Constants';

const drawerWidth = 320;

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
const styles = {
  drawer: {
    marginTop: '4.5%', // Change this value to adjust the margin-top
  },
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function TestSideBar({
  // Topics,
  // Course
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentVideo, setCurrentVideo] = useState('')
  const Topics = [
    {
      topicId: '1',
      topicName: 'There is topic 1 name',
      videos: [

        { videoTitle: 'Video 1', videoId: '1', videoUrl: `${BASE_URL}Video/PreviewVideo?fileName=Miles Away - Bring Me Back (Official Lyric Video) ft. Claire Ridgely.mp4` },
        { videoTitle: 'Video 2', videoId: '2', videoUrl: 'https://www.youtube.com/watch?v=jNgP6d9HraI' },
        { videoTitle: 'Video 3', videoId: '3', videoUrl: 'https://www.youtube.com/watch?v=oUFJJNQGwhk' },
      ]
    },
    {
      topicId: '2',
      topicName: 'There is topic 2 name',
      videos: [

        { videoTitle: 'Video 4', videoId: '4', videoUrl: 'https://www.youtube.com/watch?v=jNgP6d9HraI' },
        { videoTitle: 'Video 5', videoId: '5', videoUrl: 'https://www.youtube.com/watch?v=oUFJJNQGwhk' },
        { videoTitle: 'Video 6', videoId: '6', videoUrl: 'https://www.youtube.com/watch?v=oUFJJNQGwhk' },
      ]
    },

  ]


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
    <>

      <Header />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Drawer
          sx={{

            marginTop: styles.drawer.marginTop,
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              ...styles.drawer,
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant='h6' color='Highlight' ml='5%'>
              Tên khóa học
            </Typography>

          </DrawerHeader>
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
          <Divider />

        </Drawer>
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
    </>

  );
}