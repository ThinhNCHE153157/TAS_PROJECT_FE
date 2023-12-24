import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
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
import Header from '../../../layout/Header';
import VideoPlayer from '../Component/VideoPlayer'
import { BASE_URL } from '../../../Utils/Constants';
import { getQuestionByCourseId, getTopicBycourseId } from '../../../Services/AddCourseService'
import { useParams } from 'react-router-dom';
import GenderTest from '../Component/GenderTest';

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
  const { id } = useParams();
  const theme = useTheme();
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentVideo, setCurrentVideo] = useState('')
  const [currentTest, setCurrentTest] = useState('')
  const [Topics, setTopics] = useState([])
  const [listQuesTest, setListQuesTest] = useState([])
  useEffect(() => {
    getTopicBycourseId(id).then((res) => {
      console.log('res: ', res.data)
      setTopics(res.data)
      setCurrentTopic(res.data[0])
      setCurrentVideo(res.data[0].videos[0])
      setExpandedTopics([res.data[0].topicId])
    })
    getQuestionByCourseId(id).then(res1 => {
      setListQuesTest(res1.data)
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
    <>

      <Header />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box sx={{ ml: '3%', mt: '1%', height: '20px' }}>

        </Box>

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
          open={true}
        >
          <DrawerHeader>
            <Toolbar >
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
              >
                <Typography variant='h6' color='Highlight' >
                  {Topics.length > 0 ? Topics[0].courseName : ''}
                </Typography>

              </Stack>

            </Toolbar>
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
                        setCurrentTest('')
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
                  {
                    topic.tests.map((test, index) => {
                      var i = listQuesTest.findIndex(x => x.testId == test.testId)
                      if (i !== -1) {
                        return (
                          <ListItem
                            key={test.testId}
                            disablePadding
                            sx={{
                              display: 'block',
                              backgroundColor: test.testId === currentTest.testId ? '#f7f7f7' : 'inherit',
                              borderLeft: '',
                              borderLeftColor: ''
                            }}>
                            <ListItemButton onClick={() => {
                              setCurrentTopic(topic)
                              setCurrentTest(test)
                              setCurrentVideo('')
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
                                  Test:
                                  <Typography display='inline' variant='body1' sx={{ ml: '2%', width: 'auto' }}>{test.testName}</Typography>
                                </Typography>
                              </Box>
                            </ListItemButton>
                          </ListItem>
                        )
                      } else {
                        return ('')
                      }

                    })
                  }
                </Collapse>
              </>


            ))}
          </List>
          <Divider />

        </Drawer>
        {
          currentVideo ? (
            <Main open={true}>
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
                {/* <Box mt="3%" ml='10%' height="80vh">
              <Typography variant='h6'>{currentVideo.videoTitle}</Typography>
              <ReactPlayer controls={true} url={currentVideo.urlVideo} height="70%" width='90%' />
            </Box> */}
              </Box>
            </Main>
          ) : (
            <Main open={true}>
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
                  <Typography variant='body1' sx={{ mr: '8px' }}>{currentTest.testName}</Typography>
                </Box>
                <GenderTest id={currentTest.testId} />
              </Box>
            </Main>
          )
        }

      </Box >
    </>

  );
}