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
import DownloadIcon from '@mui/icons-material/Download';
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
import QuizIcon from '@mui/icons-material/Quiz';
import Footer from '../../../layout/Footer';

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

// const res = [
//   {
//     courseName: "Thinh",
//     topicId: 1,
//     topicName: "Test",
//     videos: [
//       {
//         videoId: 1,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: "Test",
//       },
//       {
//         videoId: 2,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: "Test",
//       },
//       {
//         videoId: 3,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: "Test",
//       }
//     ],
//     tests: [
//       {
//         testId: 1,
//         testName: "Test",
//       },
//       {
//         testId: 2,
//         testName: "Test",
//       },
//       {
//         testId: 3,
//         testName: "Test",
//       }
//     ],
//     partId: null
//   },
//   {
//     courseName: "Thinh",
//     topicId: 2,
//     topicName: "Test",
//     videos: [
//       {
//         videoId: 4,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: "Test",
//       },
//       {
//         videoId: 5,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: "Test",
//       },
//       {
//         videoId: 6,
//         videoTitle: "Test",
//         videoUrl: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoAttachment: "https://www.youtube.com/watch?v=3sQEb9TSuYU",
//         videoDescription: `
//         <div>
//           <h1>Welcome to My Website</h1>
//           <p>This is a longer example of <strong>raw</strong> HTML content.</p>
//           <p>Here are some key features:</p>
//           <ul>
//             <li><a href="#section1">Section 1</a></li>
//             <li><a href="#section2">Section 2</a></li>
//             <li><a href="#section3">Section 3</a></li>
//           </ul>
//           <section id="section1">
//             <h2>Section 1</h2>
//             <p>This is the first section of the content.</p>
//           </section>
//           <section id="section2">
//             <h2>Section 2</h2>
//             <p>Here is the second section with some <em>italicized</em> text.</p>
//           </section>
//           <section id="section3">
//             <h2>Section 3</h2>
//             <p>And finally, the third section to conclude the content.</p>
//           </section>
//         </div>
//         `,
//       }
//     ],
//     tests: [
//       {
//         testId: 1,
//         testName: "Test",
//       },
//       {
//         testId: 2,
//         testName: "Test",
//       },
//       {
//         testId: 3,
//         testName: "Test",
//       }
//     ],
//   }
// ]

// const res1 = [
//   {
//     testId: 1,
//     url: 'dsa',
//     questions: [
//       {
//         questionId: 1,
//         quesDescription: 'dsa',
//         image: 'dsa',
//         resultA: 'sdf',
//         resultB: 'gdsfg',
//         resultC: 'sdlkfj',
//         resultD: 'sdlfk',
//         correctAnswer: 'dsa',
//       },
//       {
//         questionId: 2,
//         quesDescription: 'dsa',
//         image: 'dsa',
//         resultA: 'sdf',
//         resultB: 'gdsfg',
//         resultC: 'sdlkfj',
//         resultD: 'sdlfk',
//         correctAnswer: 'dsa',
//       },
//       {
//         questionId: 3,
//         quesDescription: 'dsa',
//         image: 'dsa',
//         resultA: 'sdf',
//         resultB: 'gdsfg',
//         resultC: 'sdlkfj',
//         resultD: 'sdlfk',
//         correctAnswer: 'dsa',
//       }
//     ]
//   }
// ]

export default function TestSideBar({
  // Topics,
  // Course
}) {
  const { id } = useParams();
  const theme = useTheme();
  const [expandedTopics, setExpandedTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentVideo, setCurrentVideo] = useState('1')
  const [currentTest, setCurrentTest] = useState('')
  const [Topics, setTopics] = useState([])
  const [tabs, setTabs] = useState(1)
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
    // setTopics(res)
    // setCurrentTopic(res[0])
    // setCurrentVideo(res[0].videos[0])
    // setExpandedTopics([res[0].topicId])
    // setListQuesTest(res1)
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

            {Topics?.map((topic, index) => (
              <>
                <ListItem
                  key={topic.topicId}
                  disablePadding
                  sx={{ display: 'block' }}
                  onClick={() => handleTopicToggle(topic?.topicId)}>
                  <ListItemButton>
                    <Typography
                      variant='body1'
                      children={`Topic ${index + 1}: ${topic?.topicName}`}
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

                                <QuizIcon fontSize='medium' />
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
                  <Typography variant='body1' sx={{ mr: '8px' }}>{currentTopic?.topicName} </Typography>
                  <ArrowForwardIosIcon fontSize='small' sx={{ mr: '8px' }} />
                  <Typography variant='body1' sx={{ mr: '8px' }}>{currentVideo?.videoTitle}</Typography>
                </Box>
                <VideoPlayer url={currentVideo.videoUrl} title={currentVideo?.videoTitle} />
                <Box display='flex' flexDirection='column'>
                  <Box display='flex' >
                    <Button
                      sx={{
                        mt: '2%',
                        ml: '3%',
                        bgcolor: tabs === 1 ? '#c8cdd3' : 'white',
                      }}
                      onClick={() => setTabs(1)}
                    >
                      Thông tin khóa học
                    </Button>
                    <Button
                      sx={{
                        mt: '2%',
                        bgcolor: tabs === 2 ? '#c8cdd3' : 'white',
                      }}
                      onClick={() => setTabs(2)}
                    >
                      Tài liệu khóa học
                    </Button>

                  </Box>
                  <Divider sx={{ width: '30%', ml: '3%', bgcolor: 'black' }} />
                  {
                    tabs === 1 ? (
                      <Box ml='3%' minHeight={'200px'} mt='1%'>
                        <div dangerouslySetInnerHTML={{ __html: currentVideo?.videoDescription }} />
                      </Box>
                    ) : (
                      <Box minHeight={'200px'} mt='1%'>
                        <a href={currentVideo?.videoAttachment} download='ten file tai ve' display='flex' style={{ marginLeft: '3%', display: 'flex' }}>
                          <DownloadIcon sx={{ mr: '8px' }} />
                          <Typography variant='body1'>Tải tài liệu khóa học</Typography>
                        </a>
                      </Box>
                    )
                  }
                </Box>

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
                {
                  currentTest?.testId && <GenderTest id={currentTest?.testId} />
                }
                {/* <GenderTest id={currentTest?.testId} /> */}
              </Box>
            </Main>
          )
        }
      </Box >
    </>

  );
}