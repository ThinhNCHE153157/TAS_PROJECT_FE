import React from 'react'
import Header from '../../../layout/Header'
import { Avatar, Box, Button, CardMedia, IconButton, Paper, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const data = [
  {
    courseId: 1,
    isCompleted: 0,
    courseName: 'Web Design for Everybody: Basics of Web Development & Coding',
    courseDescription: 'This Specialization covers the basics of how web pages are created –'
      + 'from writing syntactically correct HTML and CSS to adding JavaScript'
      + 'to create an interactive experience. While building your skills in'
      + 'these topics you will create websites that work seamlessly on mobile,'
      + 'tablet, and large screen browsers. During the capstone you will develop'
      + 'a professional-quality web portfolio demonstrating your growth as a web'
      + 'developer and your knowledge of accessible web design.',
    Topics: [
      {
        topicId: 1,
        isCompleted: 0,
        topicName: 'Interactivity with JavaScript',
        topicDescription: 'This Specialization covers the basics of how web pages are created '
          + '– from writing syntactically correct HTML '
          + 'and CSS to adding JavaScript to create an interactive experience.'
      },
      {
        topicId: 2,
        isCompleted: 1,
        topicName: 'Introduction to CSS3',
        topicDescription: 'The web today is almost unrecognizable from the early days'
          + 'of white pages with lists of blue links. Now, sites are designed with'
          + 'complex layouts, unique fonts, and customized color schemes. This course will show you the basics of Cascading Style Sheets (CSS3).'
          + 'The emphasis will be on learning how to write CSS rules, how to test code, and how to establish good programming habits.'
      }
    ]
  },
  {
    courseId: 2,
    isCompleted: 0,
    courseName: 'Game Design: Art and concepts',
    courseDescription: 'This Specialization covers the basics of how web pages are created –'
      + 'from writing syntactically correct HTML and CSS to adding JavaScript'
      + 'to create an interactive experience. While building your skills in'
      + 'these topics you will create websites that work seamlessly on mobile,'
      + 'tablet, and large screen browsers. During the capstone you will develop'
      + 'a professional-quality web portfolio demonstrating your growth as a web'
      + 'developer and your knowledge of accessible web design.',
    Topics: [
      {
        topicId: 3,
        isCompleted: 1,
        topicName: 'Interactivity with JavaScript',
        topicDescription: 'This Specialization covers the basics of how web pages are created '
          + '– from writing syntactically correct HTML '
          + 'and CSS to adding JavaScript to create an interactive experience.'
      },
      {
        topicId: 4,
        isCompleted: 1,
        topicName: 'Introduction to CSS3',
        topicDescription: 'The web today is almost unrecognizable from the early days'
          + 'of white pages with lists of blue links. Now, sites are designed with'
          + 'complex layouts, unique fonts, and customized color schemes. This course will show you the basics of Cascading Style Sheets (CSS3).'
          + 'The emphasis will be on learning how to write CSS rules, how to test code, and how to establish good programming habits.'
      },
      {
        topicId: 5,
        isCompleted: 0,
        topicName: 'Advanced Styling with Responsive Design',
        topicDescription: 'The web today is almost unrecognizable from the early days'
          + 'of white pages with lists of blue links. Now, sites are designed with'
          + 'complex layouts, unique fonts, and customized color schemes. This course will show you the basics of Cascading Style Sheets (CSS3).'
          + 'The emphasis will be on learning how to write CSS rules, how to test code, and how to establish good programming habits.'
      }
    ]
  },
]

const StudyProgress = () => {
  const [tabValue, setTabValue] = useState('0')
  const [courses, setCourses] = useState(data);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const renderTopicComp = () => {
    const foundIndex = courses
      .map(course => course.Topics) // Tạo một mảng các topics từ mảng các courses
      .flat() // Làm phẳng mảng
      .findIndex(topic => topic.topicId === selectedTopic);
    const foundTopic = courses
      .map(course => course.Topics)
      .flat()
      .find((topic, index) => index === foundIndex);
    return (
      <Box
        ml='10px'
        width='150%'
        display='flex'
        borderLeft='2px dotted gray'>
        <IconButton
          onClick={() => setSelectedTopic(null)}
          sx={{
            height: '20px',
            mt: '5.5%',
            '&:hover': {
              color: 'blue',  // Thay đổi màu của icon khi hover
              backgroundColor: 'transparent',  // Giữ màu nền là trong 
            },
          }}
        >
          <NavigateNextIcon />
        </IconButton>
        <Box mt='5%'>
          <Typography fontSize='17px' fontWeight='500'>Topic {foundIndex + 1} :  {foundTopic.topicName}</Typography>
          {
            foundTopic.isCompleted === 1 ? (
              <Box display='flex' alignItems='center' mt='1%' alignContent='center'>
                <CheckCircleIcon fontSize='small' sx={{ color: 'green' }} />
                <Typography fontSize='13px' fontWeight='600' color='green'>Completed</Typography>
              </Box>
            ) : (
              ''
            )
          }

          <Typography fontSize='14px' mt='2%'>
            {foundTopic.topicDescription}
          </Typography>

          {
            foundTopic.isCompleted === 1 ? (
              <Button variant='outlined' sx={{
                textTransform: 'none',
                ml: '55%',
                borderColor: 'green',
                color: 'green'
              }}>
                Review
              </Button>
            ) : (
              <Button variant='outlined' sx={{
                textTransform: 'none',
                ml: '55%',
              }}>
                Go to topic
              </Button>
            )
          }
        </Box>
      </Box>
    )
  }
  const renderTab0 = () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='start' width='100%'>
        <Typography fontSize='26px' fontWeight='500' mb='3%'>My course</Typography>
        {
          courses.map((course, index) => (
            <Paper elevation={3} sx={{ width: '100%', display: 'flex', padding: '10px', mb: '3px' }} key={course.courseId}>
              <img width='100px' height='100px' src='https://source.unsplash.com/400x400?study?1' loading='lazy' />
              <Box ml='10px' >
                <Typography fontSize='20px' fontWeight='500' >{course.courseName}</Typography>
                <Typography fontSize='14px' color='textSecondary' mb='2%'>University of Michigan</Typography>
                <Typography fontSize='14px' fontWeight='200' mb='3%'>
                  This Specialization covers the basics of how web pages are created –
                  from writing syntactically correct HTML and CSS to adding JavaScript
                  to create an interactive experience. While building your skills in
                  these topics you will create websites that work seamlessly on mobile,
                  tablet, and large screen browsers. During the capstone you will develop
                  a professional-quality web portfolio demonstrating your growth as a web
                  developer and your knowledge of accessible web design.
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography fontSize='15px' fontWeight='500' mr='1%'>Topic :</Typography>
                  {
                    course.Topics.map((topic, index) => (
                      topic.isCompleted === 0 ? (
                        <Button
                          key={topic.topicId}
                          variant="outlined"
                          sx={{
                            borderRadius: '50%',
                            height: '40px',
                            minWidth: '20px',
                            fontSize: '15px',
                            border: selectedTopic === topic.topicId ? '' : '1px solid gray',
                            bgcolor: selectedTopic === topic.topicId ? '#d1e3eb' : '',
                            color: 'black',
                            mr: '15px'
                          }}
                          onClick={() => setSelectedTopic(topic.topicId)}
                        >
                          {index + 1}
                        </Button>
                      ) : (
                        <Button
                          key={topic.topicId}
                          variant="text"
                          sx={{
                            borderRadius: '50%',
                            height: '41px',
                            minWidth: '41px',
                            fontSize: '15px',
                            bgcolor: 'rgb(31, 131, 84)',
                            color: 'White',
                            mr: '15px'
                          }}
                          onClick={() => setSelectedTopic(topic.topicId)}
                        >
                          {index + 1}
                        </Button>
                      )

                    ))
                  }
                </Box>
              </Box>
              {course.Topics.some((topic) => topic.topicId === selectedTopic) && (
                renderTopicComp()
              )}
            </Paper>
          ))
        }
      </Box>
    )
  }

  const renderTab1 = () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='start' width='100%'>
        <Typography fontSize='26px' fontWeight='500' mb='3%'>My course</Typography>
        {
          courses.map((course, index) => (
            <Paper elevation={3} sx={{ width: '100%', display: 'flex', padding: '10px', mb: '3px' }} key={course.courseId}>
              <img width='100px' height='100px' src='https://source.unsplash.com/400x400?study?1' loading='lazy' />
              <Box ml='10px' >
                <Typography fontSize='20px' fontWeight='500' >{course.courseName}</Typography>
                <Typography fontSize='14px' color='textSecondary' mb='2%'>University of Michigan</Typography>
                <Typography fontSize='14px' fontWeight='200' mb='3%'>
                  {course.courseDescription}
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography fontSize='15px' fontWeight='500' mr='1%'>Topic :</Typography>
                  {
                    course.Topics.map((topic, index) => (
                      <Button
                        key={topic.topicId}
                        variant="text"
                        sx={{
                          borderRadius: '50%',
                          height: '38px',
                          minWidth: '38px',
                          fontSize: '15px',
                          bgcolor: 'rgb(31, 131, 84)',
                          color: 'White',
                          mr: '15px'
                        }}
                        onClick={() => setSelectedTopic(topic.topicId)}
                      >
                        {index + 1}
                      </Button>
                    ))
                  }
                </Box>
                <Box mt='2%' display='flex'>
                  <Button
                    sx={{
                      padding: '0',
                      fontSize: '15px',
                      fontWeight: '500',
                      textTransform: 'none',
                      color: 'black'
                    }}
                  >
                    <WorkspacePremiumIcon sx={{ color: 'green' }} />
                    View certificate
                  </Button>

                </Box>
              </Box>
              {course.Topics.some((topic) => topic.topicId === selectedTopic) && (
                renderTopicComp()
              )}
            </Paper>
          ))
        }
      </Box>
    )
  }
  const renderTab2 = () => {

  }

  return (
    <>
      <Header />
      <Box
        mt='8%'
        ml='3%'
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        display='flex'
        flexDirection='column'
      >
        <CardMedia
          sx={{ height: '140px', width: '60%', borderRadius: '10px' }}
          image='https://source.unsplash.com/random/?nature'
          alt='Random Img'

        >
          <Avatar
            src='https://source.unsplash.com/400x400?portrait?1'
            sx={{ width: '15%', height: 'auto', m: '0 auto', mt: '50px', border: '3px solid white' }}
          />

        </CardMedia >
        <Box sx={{ height: 'auto', m: '0 auto', mt: '4%', mb: '50px' }} display='flex' flexDirection='column' alignItems='center'>
          <Typography fontSize='28px' fontWeight='600'>
            vinh2312001
          </Typography>
          <Button
            variant='outlined'
            sx={{
              color: 'black',
              width: '100px',
              textTransform: 'none',
              boxShadow: 'none',
            }}
          >
            Profile
          </Button>
        </Box>
        <Box width='60%'>
          <TabContext value={tabValue}>
            <Box mb='20px' sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={(event, newValue) => setTabValue(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '16px',
                  },
                }}
              >
                <Tab value='0' label='Đang học' ></Tab>
                <Tab value='1' label='Đã hoàn thành'></Tab>
                <Tab value='2' label='Kết quả luyện thi'></Tab>

              </TabList>
            </Box>
            <TabPanel value='0' sx={{ padding: 0 }}>{renderTab0()}</TabPanel>
            <TabPanel value='1' sx={{ padding: 0 }}>{renderTab1()}</TabPanel>
            <TabPanel value='2' sx={{ padding: 0 }}>{renderTab2()}</TabPanel>
          </TabContext>

        </Box>

      </Box >
    </>
  )
}

export default StudyProgress