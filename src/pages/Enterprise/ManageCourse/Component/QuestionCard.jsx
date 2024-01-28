import { Box, Collapse, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useState } from 'react';
import EditQuestion from '../AddModal/EditQuestion';
import { useEffect } from 'react';
import { UpdateQuestion } from '../../../../Services/ManageCourseService';
import { alertError, alertSuccess } from '../../../../component/AlertComponent';

const options = ['A', 'B', 'C', 'D', 'E'];
const QuestionCard = ({
  question = {},
  number,
  handleDeleteQuestion,
  handleReload
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false)
  const [isOpenEditQuestionModal, setIsOpenEditQuestionModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenEditQuestionModal(false)
  }
  const editQuestion = (data) => {
    var form = new FormData()
    form.append('questionId', data.questionId)
    form.append('description', data.description)
    form.append('image', data.image)
    form.append('questionAnswers', data.questionAnswers)
    console.log('form: ', form)
    UpdateQuestion(form).then(res => {
      console.log(res)
      alertSuccess('Sửa câu hỏi thành công')
      handleReload()
      setIsOpenEditQuestionModal(false)
    }).catch(err => {
      alertError('Sửa câu hỏi thất bại')
    })
  }

  useEffect(() => {
    if (isOpenCollapse) {
      setIsOpenEditQuestionModal(false)
    }
  }, [isOpenCollapse])
  return (
    <Box display='flex' flexDirection='column'>
      <Box mt='1%' bgcolor='white' display='flex' justifyContent='space-between' minHeight='80px' alignItems='center'>
        <Box width='90%' ml='1%' display='flex' alignItems='center'>
          <HelpOutlineOutlinedIcon sx={{ fontSize: '30px', mr: '10px' }} />
          <Typography fontSize='22px' fontWeight='bold'>
            {`${number}. ${question.description}`}
          </Typography>
          <IconButton onClick={() => setIsOpenCollapse(!isOpenCollapse)}>
            {
              isOpenCollapse ? (
                <ExpandLessOutlinedIcon sx={{ fontSize: '30px', fontWeight: 'bold' }} />
              ) : (
                <ExpandMoreOutlinedIcon sx={{ fontSize: '30px', fontWeight: 'bold' }} />
              )
            }
          </IconButton>
        </Box>
        <Box mr='3%'>
          <IconButton
            onClick={() => {
              setIsOpenEditQuestionModal(true)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDeleteQuestion(question.questionId)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

      </Box>
      <Collapse in={isOpenCollapse} >
        <Box display='flex' justifyContent='space-between'>
          <Box display='flex' bgcolor='white' flexDirection='column' width='70%'>
            {
              question.questionAnswers.map((item, index) => (
                <Box
                  key={item}
                  display='flex'
                  justifyContent='space-between'
                  width='100%'
                  bgcolor={item.iscorrect == true ? '#d1e3d2' : ''}
                  padding='15px'
                >
                  <Typography width='90%' ml='3%' fontSize='21px'>
                    {options[index]} : {item.answer}
                  </Typography>
                  {
                    item.iscorrect == true ? (
                      <CheckOutlinedIcon sx={{ color: 'green', mr: '3%', fontSize: '30px' }} />
                    ) : (
                      <CloseOutlinedIcon sx={{ color: 'red', mr: '3%', fontSize: '30px' }} />
                    )
                  }
                </Box>
              ))
            }
            <Box width='100%' height='15px'></Box>
          </Box>
          <Box width='28%'>
            {
              !question.image ? (
                ''
              ) : (
                <img src={question.image} width='90%' height='auto' alt="Ảnh câu hỏi" />
              )
            }

          </Box>
        </Box>

      </Collapse >
      <Divider sx={{ bgcolor: 'black' }} />
      <EditQuestion isOpenModal={isOpenEditQuestionModal} question={question} handleCloseModal={handleCloseModal}
        editQuestion={editQuestion}
      />
    </Box >

  )
}

export default QuestionCard