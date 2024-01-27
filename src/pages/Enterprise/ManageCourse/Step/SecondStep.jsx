import { Box, Button, Collapse, Divider, IconButton, Modal, TextField, Typography } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import React, { useEffect } from 'react'
import { useState } from 'react';
import AddTopicModel from '../AddModal/AddTopicModel';
import TopicCard from '../Component/TopicCard';
import SaveIcon from '@mui/icons-material/Save';
import { getTopicBycourseId, AddTopic, AddVideo } from '../../../../Services/AddCourseService';
import { alertSuccess, alertError } from '../../../../component/AlertComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';
import { API_FormFile } from '../../../../component/callApi';

const SecondStep = ({
  onClickNext,
  onClickBack,
  id
}) => {
  const [refresh, setRefresh] = useState(false);
  const [listVideo, setListVideo] = useState([]);
  const [data, setData] = useState([]);
  const [topicId, setTopicId] = useState(0);
  const [videoId, setVideoId] = useState(0);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [isOpenCollapse, setIsOpenCollapse] = useState([]);
  const [error, setError] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [responseData, setResponseData] = useState([
    // {
    //   topicId: 1,
    //   topicName: "ABC",
    //   topicDescription: "des",
    //   videos: [
    //     {
    //       videoId: 1,
    //       videoTitle: "abc",
    //       videoDescription: "des",
    //       videoUrl: "abd",
    //       videoAttachment: "asd"
    //     }
    //   ]
    // },
    // {
    //   topicId: 2,
    //   topicName: "DFD",
    //   topicDescription: "des",
    //   videos: [
    //     {
    //       videoId: 2,
    //       videoTitle: "abc",
    //       videoDescription: "des",
    //       videoUrl: "abd",
    //       videoAttachment: "asd"
    //     }
    //   ]
    // }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(data)
  const [topicName, setTopicName] = useState({});
  const [videoTitle, setVideoTitle] = useState({});

  // useEffect(() => {
  //   getTopicBycourseId(14).then(res => {
  //     console.log(res.data)
  //     setData(res.data)
  //     console.log(data)
  //   })
  // }, [refresh])
  // useEffect(() => {
  //   //setRefresh(!refresh)
  // }, [topicName, videoTitle])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  const handleSettingsClick = (videoId) => {
    if (isOpenCollapse.includes(videoId)) {
      setIsOpenCollapse(isOpenCollapse.filter(id => id !== videoId));
    } else {
      var temp = [...isOpenCollapse];
      temp.push(videoId);
      console.log('temp', temp)
      console.log(temp)
      setIsOpenCollapse(temp);
    }
  }


  const validateCourse = (course) => {
    // Kiểm tra xem có ít nhất 2 chủ đề không
    if (course.length < 2) {
      return 'Bạn cần có ít nhất 2 chủ đề cho khóa học';
    }

    // Tạo một Set để lưu trữ tên của các chủ đề
    const topicNames = new Set();

    for (let topic of course) {
      // Thêm tên chủ đề vào Set
      topicNames.add(topic.topicName);

      // Kiểm tra xem chủ đề có ít nhất một video không
      if (!topic.videos || topic.videos.length === 0) {
        return 'Bạn cần có ít nhất một bài giảng cho mỗi chủ đề';
      }

      for (let video of topic.videos) {
        // Kiểm tra xem video có videoUrl và videoAttachment không trống, null, hoặc undefined không
        if (!video.videoUrl || !video.videoAttachment) {
          return 'Bạn cần video và file tài liệu cho mỗi bài giảng';
        }
      }
    }

    // Kiểm tra xem tất cả các tên chủ đề có khác nhau không
    if (topicNames.size !== course.length) {
      return 'Tên chủ đề không được trùng nhau';
    }
    return 'true'
  }

  const getListVideo = () => {
    console.log('responseData', responseData)
    const lVideo = []
    for (var topic in responseData) {
      for (var video in responseData[topic].videos) {
        const temp = { topicName: responseData[topic].topicName, ...responseData[topic].videos[video] }
        lVideo.push(temp)
      }
    }
    console.log('videosWithTopicName', lVideo)
    return lVideo;
  }
  const getListTopic = () => {
    const lTopic = []
    for (var topic in responseData) {
      const temp = { courseId: id, topicName: responseData[topic].topicName, topicDescription: responseData[topic].topicDescription }
      lTopic.push(temp)
    }
    console.log('topics', lTopic)
    return lTopic;
  }
  const handleSubmit = () => {
    const validate = validateCourse(responseData);
    if (validate !== 'true') {
      setError(validate);
      setIsUpdate(false);
      return;
    } else {
      setError('');
    }
    const lVideo = getListVideo()
    const lTopic = getListTopic()
    AddTopic(lTopic).then(res => {
      console.log(res.data)
      var count = 0;
      lVideo.forEach(e => {
        const formData = new FormData();
        formData.append('topicName', e.topicName);
        formData.append('videoTitle', e.videoTitle);
        formData.append('videoDescription', e.videoDescription);
        formData.append('videoAttachment', e.videoAttachment);
        formData.append('videoUrl', e.videoUrl);
        API_FormFile.post('/Video/AddVideo', formData)
          .then(res => {
            count += 1;
            console.log(res);
            if (count == lVideo.length) {
              alertSuccess({ message: 'Cập nhật thành công' })
              setIsUpdate(true);
            }
          })
          .catch(err => {
            console.log("first error", err)
            alertError({ message: 'Cập nhật thất bại' })
          })

      });
      // alertSuccess({ message: 'Cập nhật thành công' })
    }).catch(err => {
      console.log("second error", err)
      alertError({ message: 'Cập nhật thất bại' })
    })
  }
  const handleEditVideo = (data) => {
    const videoId = data.videoId;
    const videoTitle = data.videoTitle;
    const videoDescription = data.videoDescription;
    const temp = [...responseData];
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].videos.length; j++) {
        if (temp[i].videos[j].videoId == videoId) {
          temp[i].videos[j].videoTitle = videoTitle;
          temp[i].videos[j].videoDescription = videoDescription;
        }
      }
    }
    setResponseData(temp);
  }
  const handleChangeVideo = (event, tpId) => {
    console.log('topicId', tpId)
    const selectedVideoId = localStorage.getItem('selectedVideoId');
    console.log('selectedVideoId', selectedVideoId)
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    console.log('file', file)
    console.log('videoUrl', videoUrl)
    const isExist = videos.findIndex(video => video.videoId == selectedVideoId);
    console.log('isExist', isExist)
    if (isExist !== -1) {
      const update = [...videos];
      update[isExist].videoAttachment = file;
      update[isExist].videoUrl = videoUrl;
      setVideos(update);
      const temp = [...responseData];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].topicId == tpId) {
          for (let j = 0; j < temp[i].videos.length; j++) {
            if (temp[i].videos[j].videoId == selectedVideoId) {
              temp[i].videos[j].videoUrl = file;
            }
          }
        }
      }

      console.log('temp', temp)
      setResponseData(temp);

      console.log('update', update)
    }
    else {
      const newVideo = {
        videoId: selectedVideoId,
        videoAttachment: file,
        videoUrl: videoUrl
      }
      const update = [...videos];
      update.push(newVideo);
      console.log('update', update)
      setVideos(update);
      const temp = [...responseData];
      console.log('temp', temp)
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].topicId == tpId) {
          console.log('temp[i].videos', temp[i].topicId)
          for (let j = 0; j < temp[i].videos.length; j++) {
            if (temp[i].videos[j].videoId == selectedVideoId) {
              temp[i].videos[j].videoUrl = file;
            }
          }
        }
      }
      console.log('temp', temp)
      setResponseData(temp);
    }
  }

  const handleChangeFile = (event, topicId) => {
    const selectedVideoId = localStorage.getItem('selectedVideoId');
    console.log('selectedVideoId', selectedVideoId)
    const file = event.target.files[0];
    const rFile = URL.createObjectURL(file);
    console.log('file', file)
    console.log('rFile', rFile)
    const isExist = files.findIndex(video => video.videoId == selectedVideoId);
    console.log('isExist', isExist)
    if (isExist !== -1) {
      const update = [...files];
      update[isExist].videoAttachment = file;
      update[isExist].rFile = rFile;
      update[isExist].name = file.name;
      setFiles(update);
      const temp = [...responseData];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].topicId == topicId) {
          for (let j = 0; j < temp[i].videos.length; j++) {
            if (temp[i].videos[j].videoId == selectedVideoId) {
              temp[i].videos[j].videoAttachment = file;
            }
          }
        }
      }
      setResponseData(temp);
      console.log('update', update)
    }
    else {
      const newVideo = {
        videoId: selectedVideoId,
        videoAttachment: file,
        name: file.name,
      }
      const update = [...files];
      update.push(newVideo);
      console.log('update', update)
      setFiles(update);
      const temp = [...responseData];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].topicId == topicId) {
          for (let j = 0; j < temp[i].videos.length; j++) {
            if (temp[i].videos[j].videoId == selectedVideoId) {
              temp[i].videos[j].videoAttachment = file;
            }
          }
        }
      }
      setResponseData(temp);
    }

  }

  const handleAddVideoTitle = (value) => {
    var tempId = videoId + 1
    setVideoId(tempId)
    var rData = {
      'videoId': tempId,
      'videoTitle': value.videoTitle,
      'videoDescription': value.videoDescription
    }
    console.log('rData: ', rData)
    var topic = responseData.find(topic => topic.topicId == value.topicId);
    if (topic.videos) {
      // If videos exists, add rData to it
      topic.videos = [...topic.videos, rData];
    } else {
      // If videos does not exist, create a new array with rData
      topic.videos = [rData];
    }
    console.log('topic: ', [...responseData])
    setResponseData([...responseData]);
    // AddVideo(JSON.stringify({
    //   'topicId': value.topicId,
    //   'videoTitle': value.title,
    // }))
    //   .then(res => {
    //     alertSuccess({ message: 'Thêm video thành công' })
    //     setIsModalOpen(false);
    //     console.log(res.data)
    //     setRefresh(!refresh)
    //   })
    // setVideoTitle({ ...videoTitle, 'videoTitle': value.title })

  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVideo = (video) => {
    console.log('video: ', video)
    var i = listVideo.findIndex(v => v.videoId === video.videoId)
    var updateData = [...listVideo]
    if (i !== -1) {
      updateData[i].videoUrl = video.videoUrl
    } else {
      updateData.push(video);
    }

    console.log('updateData: ', updateData)
    setListVideo(updateData)
  }
  const handleDeleteVideo = (videoId) => {
    console.log('videoId: ', videoId)
    const temp = [...responseData];
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].videos.length; j++) {
        if (temp[i].videos[j].videoId == videoId) {
          temp[i].videos.splice(j, 1);
        }
      }
    }
    setResponseData(temp);
  }

  const handleDeleteTopic = (topicId) => {
    console.log("topicId: ", topicId)
    const temp = [...responseData];
    const index = temp.findIndex(topic => topic.topicId == topicId);
    if (index !== -1) {
      temp.splice(index, 1);
      setResponseData(temp);
    }
  }

  const handleEditTopic = (data) => {
    const topicId = data.topicId;
    const topicName = data.topicName;
    const topicDescription = data.topicDescription;
    const temp = [...responseData];
    const index = temp.findIndex(topic => topic.topicId == topicId);
    if (index !== -1) {
      temp[index].topicName = topicName;
      temp[index].topicDescription = topicDescription;
      setResponseData(temp);
    }
  }

  const handleAddTopicName = (value, topicDescription) => {
    var tempId = topicId + 1
    setTopicId(tempId)
    var rData = {
      'topicId': tempId,
      'topicName': value,
      'topicDescription': topicDescription
    }
    var tempData = [...responseData, rData]
    console.log('rData: ', tempData)
    setResponseData(tempData)
    setIsModalOpen(false);
    // console.log(value)
    // console.log(topicId)
    // AddTopic(JSON.stringify({
    //   'courseId': id,
    //   'topicName': value,
    //   'topicDescription': 'This is topic description'
    // }))
    //   .then(res => {
    //     alertSuccess({ message: 'Thêm topic thành công' })
    //     setIsModalOpen(false);
    //     console.log(res.data)
    //     setRefresh(!refresh)
    //   })
    // setTopicName({ ...topicName, 'topicName': value })
  }

  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack()
  }
  return (
    <Box width='100%'>
      <ToastContainer />
      <Typography fontSize='30px' fontWeight='500'>
        Chương trình giảng dạy
      </Typography>
      <Box mt='3%' bgcolor='white' display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='space-between' mt='20px' mb='20px' alignItems='center'>
          <Typography fontSize='28px' ml='2%'>
            Chương trình giảng dạy
          </Typography>
          <IconButton
            sx={{
              mr: '3%',
              bgcolor: '#1976D2',
              borderRadius: '10px'
            }}
            onClick={handleOpenModal}
          >
            <AddCardIcon sx={{ color: 'white' }} />
            <Typography
              fontSize='22px'
              fontWeight='500'
              color='white'
              ml='2%'
              sx={{ whiteSpace: 'nowrap' }}
            >
              Thêm topic mới
            </Typography>
          </IconButton>
        </Box>
      </Box>
      {
        responseData.length === 0 ? ('') : (
          responseData.map((topic, index) => (
            <TopicCard topic={topic} key={index} handleAddTitle={handleAddVideoTitle} handleAddVideo={handleAddVideo} handleDeleteVideo={handleDeleteVideo} handleSettingsClick={handleSettingsClick} isOpenCollapse={isOpenCollapse}
              handleChangeVideo={handleChangeVideo} videoss={videos} files={files} handleChangeFile={handleChangeFile}
              topicId={topic.topicId} handleDeleteTopic={handleDeleteTopic}
              handleEditTopic={handleEditTopic}
              handleEditVideo={handleEditVideo}
            />
          ))
        )

      }
      <Divider />
      <Box width='100%' display='flex' mt='3%' flexDirection='column'>
        <Typography
          fontSize='20px'
          fontWeight='500'
          color='red'
          fontStyle='italic'
          m='0 auto'
        >
          {error}
        </Typography>
        <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }}
          onClick={() => handleSubmit()}
        >
          <SaveIcon sx={{ color: 'white' }} />
          <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
            Cập nhật
          </Typography>
        </IconButton>
      </Box>

      <Box sx={{ ml: '44%', mt: '2%' }}>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            mr: '8%',
            textTransform: 'none'
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            textTransform: 'none'
          }}
          onClick={handleNext}
          disabled={!isUpdate}
        >
          Next
        </Button>
      </Box>
      <AddTopicModel isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleAdd={handleAddTopicName} />
    </Box >
  )
}

export default SecondStep