import React, { useEffect } from 'react'
import Header from '../../../layout/Header'
import { Avatar, Box, Button, CardMedia, IconButton, Paper, Tab, Tooltip, Typography, tooltipClasses } from '@mui/material'
import { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Footer from '../../../layout/Footer'
import { GetUserById } from '../../../Services/UserProfileService'
import { useSelector } from 'react-redux'
import PreviewIcon from '@mui/icons-material/Preview';
import { Space, Table } from 'antd'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { GetTestResultByAccount } from '../../../Services/TestService'
import { GetListCourseByAccountId } from '../../../Services/AddCourseService'
import API from '../../../component/callApi'


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'black',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    fontSize: '16px',
  },
}));

const secondsToMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Sử dụng template literals để tạo chuỗi định dạng mm:ss
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return formattedTime;
}

const temp = [
  {
    testId: 1,
    testName: 'sfsdfsdf',
    testFinish: 4333,
    testScore: 5
  },
  {
    testId: 2,
    testName: 'sdffms,sdffmsd.f',
    testFinish: 2100,
    testScore: 5
  },
]


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

  {
    courseId: 3,
    isCompleted: 1,
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
        topicId: 6,
        isCompleted: 1,
        topicName: 'Interactivity with JavaScript',
        topicDescription: 'This Specialization covers the basics of how web pages are created '
          + '– from writing syntactically correct HTML '
          + 'and CSS to adding JavaScript to create an interactive experience.'
      },
      {
        topicId: 7,
        isCompleted: 1,
        topicName: 'Introduction to CSS3',
        topicDescription: 'The web today is almost unrecognizable from the early days'
          + 'of white pages with lists of blue links. Now, sites are designed with'
          + 'complex layouts, unique fonts, and customized color schemes. This course will show you the basics of Cascading Style Sheets (CSS3).'
          + 'The emphasis will be on learning how to write CSS rules, how to test code, and how to establish good programming habits.'
      }
    ]
  },
]


const StudyProgress = () => {
  const [tabValue, setTabValue] = useState('2')
  const [courses, setCourses] = useState(data);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [testResult, setTestResult] = useState([]);
  const [userdata, setUserdata] = useState()
  const [refresh, setRefresh] = useState(false)
  const userId = useSelector(state => state.auth?.user?.id)
  const [loading, setLoading] = useState(false);
  const [historyTest, setHistoryTest] = useState([{}]);
  const navigate = useNavigate();
  useEffect(() => {
    API.get(`/Course/GetListCourseByAccountId?accountId=${userId}`)
      .then(res => {
        setCourses(res.data)
      })
  }, [refresh]);

  useEffect(() => {
    API.get(`/Test/GetTestResultByAccount?accountId=${userId}`)
      .then(res => {
        setHistoryTest(res.data)
      })
  }, [refresh]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    GetTestResultByAccount(userId).then(res => {
      setTestResult(res)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    GetListCourseByAccountId(userId).then(res => {
      setCourses(res)
    }
    ).catch(err => {
      console.log(err)
    })
  }, []);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setLoading(true); // Set loading state while fetching new data
      // Fetch data based on the new pagination parameters
      // After fetching data, set setLoading(false) to stop loading state
      // setData(newData);
    }
  };
  const columns = [
    {
      title: 'Bài thi thử',
      dataIndex: 'testName',
      sorter: true,
    },
    {
      title: 'Thời gian',
      dataIndex: 'testFinish',
      width: 400,
      resizable: true,
      render: (_, record) => (
        secondsToMinutesAndSeconds(record.testFinish)
      )
    },
    {
      title: 'Điểm',
      dataIndex: 'testScore',
    },
    {
      title: 'Số câu đúng',
      dataIndex: 'testNumberCorrect',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <BootstrapTooltip title="Chi tiết" placement="top">
            <IconButton onClick={() => navigate(`/TestResultDetail/${record.testId}`)}>
              <PreviewIcon />
            </IconButton>
          </BootstrapTooltip>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    GetUserById(userId).then(res => {
      setUserdata(res)
    })
  }, [refresh])

  const renderTopicComp = () => {
    const foundIndex = courses
      .map(course => course.topics) // Tạo một mảng các topics từ mảng các courses
      .flat() // Làm phẳng mảng
      .findIndex(topic => topic.topicId === selectedTopic);
    const foundTopic = courses
      .map(course => course.topics)
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


          <Typography fontSize='14px' mt='2%'>
            {foundTopic.topicDescription}
          </Typography>
          <Button variant='outlined' sx={{
            textTransform: 'none',
            ml: '55%',
            mt: '2%'

          }}>
            Go to topic
          </Button>
        </Box>
      </Box>
    )
  }
  const renderTab0 = () => {

    return (
      <Box display='flex' flexDirection='column' alignItems='start' width='100%'>
        <Typography fontSize='26px' fontWeight='500' mb='3%'>Khóa học của tôi</Typography>
        {
          courses.map((course, index) => (
            <Paper elevation={3} sx={{ width: '100%', display: 'flex', padding: '10px', mb: '3px' }} key={course.courseId}>
              <img width='100px' height='100px' src='https://source.unsplash.com/400x400?study?1' loading='lazy' />
              <Box ml='10px' >
                <Typography fontSize='20px' fontWeight='500' >{course.courseName}</Typography>
                <Typography fontSize='14px' color='textSecondary' mb='2%'>University of Michigan</Typography>
                <Typography fontSize='14px' fontWeight='200' mb='3%'>
                  {course.shortDescription}
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography fontSize='15px' fontWeight='500' mr='1%'>Topic :</Typography>
                  {
                    course.topics?.map((topic, index) => (
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

                    ))
                  }
                </Box>
              </Box>
              {course.topics?.some((topic) => topic.topicId === selectedTopic) && (
                renderTopicComp()
              )}

            </Paper>
          ))
        }
      </Box>
    )
  }

  const renderTab2 = () => {

    return (

      <Box display='flex' flexDirection='column' alignItems='start' width='100%'>
        <Typography fontSize='26px' fontWeight='500' >Lịch sử thi</Typography>
        <Table
          columns={columns}
          dataSource={testResult}
          style={{ width: '100%', marginTop: '5%' }}
          rowKey={(record) => record.testId}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        >

        </Table>
      </Box>
    )
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
            src={userdata?.avatar}
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

                <Tab value='2' label='Kết quả luyện thi'></Tab>

              </TabList>
            </Box>
            <TabPanel value='0' sx={{ padding: 0 }}>{renderTab0()}</TabPanel>
            <TabPanel value='2' sx={{ padding: 0 }}>{renderTab2()}</TabPanel>
          </TabContext>

        </Box>

      </Box >
      <Footer />
    </>
  )
}

export default StudyProgress