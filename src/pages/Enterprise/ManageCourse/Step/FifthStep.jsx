import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import PublishIcon from '@mui/icons-material/Publish';
import { alertInfo } from '../../../../component/AlertComponent';
import importCourse from '../../../../../src/Assets/img/dd.png'
import { requestPending } from '../../../../Services/AddCourseService';
const FifthStep = ({
  id
}) => {
  const notify = () => {
    var rData = {
      courseId: id,
      status: 2
    }
    requestPending(rData).then(res => {
      console.log(res)
      alertInfo({ message: "Khóa học của bạn đang chờ phê duyệt" });
    }).catch(err => {
      console.log(err)
    })

  }
  return (
    <Box width='100%'>
      <Box width='100%' display='flex' mt='3%' flexDirection='column' alignItems='center'>
        <Typography fontSize='28px' ml='2%' mb='2%' fontWeight='bold'>
          Xuất bản khóa học
        </Typography>
        <img src={importCourse} alt='importCourse' width='50%' />
        <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }} onClick={notify}>
          <PublishIcon sx={{ color: 'white' }} />
          <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
            Xuất bản
          </Typography>
        </IconButton>
      </Box>
    </Box>

  )
}

export default FifthStep