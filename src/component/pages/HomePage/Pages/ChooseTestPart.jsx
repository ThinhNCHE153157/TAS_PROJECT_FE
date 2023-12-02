import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../layout/Header';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Tab, Typography } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { TabContext, TabList, TabPanel } from '@mui/lab';
const ChooseTestPart = () => {
  const [tabValue, setTabValue] = useState('1');
  const [tests, setTests] = useState([]);
  const [comments, setComments] = useState([]);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  const renderTab1 = () => {
    return (
      <>
        Tab1
        <br></br>
        <Button variant='outlined' color="primary">
          Luyện tập
        </Button>
      </>

    )
  }

  const renderTab2 = () => {
    return (
      <>
        Tab2
      </>
    )
  }

  const { data } = useParams();
  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f3f6f9',
        }}
      >
        <Grid container ml='15%' width='70%' mt='8%' position='absolute' spacing={4}>
          <Grid item xs={9}>
            <Box
              sx={{
                width: 'auto',
                height: '700px',
                backgroundColor: 'white',
                borderRadius: '10px', // Adjust the value as needed
              }}
            >
              <Grid item xs={12} marginLeft="15px" >
                <Box height="30px" />
                <Typography gutterBottom variant="h4" component="div" fontWeight='bold' >
                  IELTS Simulation Reading test 1
                </Typography>
                <Box marginBottom='20px'>
                  <Button
                    sx={{ fontSize: '15px', background: '#e8f2ff', color: "#35509a", borderRadius: '10px', mr: '10px' }}
                  >
                    Thông tin đề thi
                  </Button>
                  <Button
                    sx={{ fontSize: '15px', background: '#e8f2ff', color: "#35509a", borderRadius: '10px' }}
                  >
                    Đáp án/Transcript
                  </Button>
                </Box>
                <Box component='span' sx={{ display: 'flex', alignItems: 'center', mb: '5px' }}>
                  <AccessTimeIcon fontSize='small' />
                  <Typography variant="body1" color="textSecondary" ml="5px">
                    Thời gian làm bài: x phút | y phần thi | z câu hỏi | m bình luận
                  </Typography>
                </Box>
                <Box component='span' sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
                  <PersonOutlineIcon fontSize='small' />
                  <Typography variant="body1" color="textSecondary" ml="5px">
                    a người đã luyện tập đề thi này
                  </Typography>
                </Box>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Luyện Thi" value="1" />
                        <Tab label="Thảo luận" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">{renderTab1()}</TabPanel>
                    <TabPanel value="2">{renderTab2()}</TabPanel>
                  </TabContext>
                </Box>


              </Grid>

            </Box>
          </Grid >
          <Grid item xs={3}>
            <Card sx={{ maxWidth: 370, borderRadius: '10px' }}>
              <CardHeader
                avatar={
                  // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  //     V
                  // </Avatar>
                  <Avatar src='https://source.unsplash.com/400x400/?avatar?11' />
                }
                title='Username here'
                subheader='Email here'

              />
              <Divider variant="middle" sx={{ borderColor: 'black', borderBottomWidth: 1 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Thống kê
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bạn có thể kiểm tra quá trình học của mình bằng cách xem thông tin phân tích bên dưới
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  size="large"
                  children="Thống kê kết quả"
                  startIcon={<AutoGraphIcon />}
                />
              </CardActions>
            </Card>
          </Grid>
        </Grid >
      </Box >

    </>

  )
}

export default ChooseTestPart