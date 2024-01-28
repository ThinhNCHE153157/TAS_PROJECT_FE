import { Box, Button, FormControlLabel, IconButton, InputLabel, Modal, Radio, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { AddNewQuestion } from '../../../../Services/TestService';

const options = ['A', 'B', 'C', 'D', 'E'];
const EditQuestion = ({
  isOpenModal,
  handleCloseModal,
  question,
  editQuestion,
  testId
}) => {
  // const [selectedValue, setSelectedValue] = useState('');
  const [listAnswer, setListAnswer] = useState([])
  const [selectedImage, setSelectedImage] = useState(question?.image)
  const [description, setDescription] = useState(question?.description)
  const [questionAnswers, setQuestionAnswers] = useState(question?.questionAnswers)
  const [rImage, setRImage] = useState(null)
  const [index, setIndex] = useState(0)
  // const [error, setError] = useState('')
  // const [responseData, setResponseData] = useState({})
  const handleChangeOption = (event) => {
    var questionAnswerId = event.target.value
    var temp = [...questionAnswers]
    temp.forEach((answer) => {
      if (answer.questionAnswerId == questionAnswerId) {
        answer.iscorrect = true
      } else {
        answer.iscorrect = false
      }
    })
    console.log('temp: ', temp)
    setQuestionAnswers(temp)
  };

  const addAnswer = () => {
    if (questionAnswers.length === 5) {
      // setError('*Số lượng câu trả lời tối đa là 5')
      return
    }
    setIndex(index - 1)
    const temp = [...questionAnswers]
    temp.push({ questionAnswerId: index - 1, answer: '', iscorrect: false })
    setQuestionAnswers(temp)
  }

  const deleteAnswer = (questionAnswerId) => {
    const temp = [...questionAnswers]
    temp.pop(questionAnswerId)
    setQuestionAnswers(temp)
    console.log('temp: ', temp)
  }

  // const checkValidate = (response) => {
  //   var set = new Set()
  //   var flag = false
  //   var isEmpty = false
  //   if (response.description === '') {
  //     setError('*Câu hỏi không được để trống')
  //     return false
  //   }
  //   if (!response.questionAnswer || response.questionAnswer.length < 2) {
  //     setError('*Số lượng câu trả lời tối thiểu là 2')
  //     return false
  //   }
  //   response.questionAnswer.forEach((answer) => {
  //     set.add(answer.answer)
  //     console.log('sdfsdfsdf:', answer.answer === '')
  //     if (answer.answer === '') {
  //       isEmpty = true
  //     }
  //     if (answer.correct === true) {
  //       flag = true
  //     }
  //   })
  //   if (isEmpty === true) {
  //     setError('*Câu trả lời không được để trống')
  //     return false
  //   }
  //   if (flag === false) {
  //     setError('*Phải có ít nhất 1 đáp án đúng')
  //     return false
  //   }
  //   if (set.size !== response.questionAnswer.length) {
  //     setError('*Câu trả lời không được trùng nhau')
  //     return false
  //   }
  //   return true;
  // }

  const handleImageChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let fileUrl = URL.createObjectURL(file);
    setSelectedImage(fileUrl);
    setRImage(file)
  }
  const handAddButton = () => {
    var temp = [...questionAnswers]
    console.log('temp: ', temp)
    var rList = JSON.stringify(temp)
    var returnData = {
      questionId: question.questionId,
      description: description,
      questionAnswers: rList,
      image: rImage,
    }
    editQuestion(returnData)
    console.log('returnData: ', returnData)

    // var temp = { ...responseData }
    // temp.description = description
    // temp.questionAnswer = listAnswer
    // temp.testId = testId
    // temp.questionAnswer.map((item, index) => {
    //   if (!item.correct) {
    //     item.correct = false
    //   }
    // })
    // console.log('temp: ', temp)
    // var isValidate = checkValidate(temp)
    // setResponseData(temp)


    // if (isValidate !== false) {
    //   setError('')
    //   handleAdd(temp)
    //   return;
    // }
  }

  const handleChangeText = (event) => {
    var text = event.target.value
    console.log('text: ', text)
    var name = event.target.name
    console.log('name: ', name)
    var temp = [...questionAnswers]
    temp.forEach((answer) => {
      if (answer.questionAnswerId == name) {
        answer.answer = text
      }
    })
    setQuestionAnswers(temp)
  }



  return (
    <Modal
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box ml='2%'>

          <Typography id='modal-title' variant='h4' component='div'>
            Thêm câu hỏi mới
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2 }} fontSize='23px'>
            Câu hỏi
          </Typography>
          <TextField
            onChange={(event) => setDescription(event.target.value)}
            component='div'
            sx={{
              mt: '1%',
              width: '97%',
              '& .MuiInputBase-input': {
                fontSize: '20px', // Tăng kích thước của chữ trong TextField
              },
              '& .MuiFormHelperText-root': {
                fontSize: '18px', // Tăng kích thước của chữ trong helperText
              },
              '& .MuiInputLabel-root': {
                fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
              },
            }}
            label="Câu hỏi"
            defaultValue={description}
            required
            multiline
            name='description'
            rows={2}
          />

          <Box width='100%' sx={{ mt: 2 }}>
            <Box display='flex' justifyContent='space-between' width='97%' alignItems={'center'}>
              <Typography id='modal-description' fontSize='23px'>
                Câu trả lời
              </Typography>
              <Button
                variant='outlined'
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => addAnswer()}
              >
                <Typography id='modal-description' fontSize='20px'>
                  Thêm câu trả lời
                </Typography>
              </Button>
            </Box>

            {
              questionAnswers?.map((answer, index) => (
                <Box display='flex' justifyContent='space-between' padding='5px' alignItems='center' mt='1%'>
                  <IconButton
                    onClick={() => deleteAnswer(answer.questionAnswerId)}
                  >
                    <CloseIcon sx={{ color: 'red' }} />
                  </IconButton>
                  <TextField
                    component='div'
                    sx={{
                      width: '70%',
                      '& .MuiInputBase-input': {
                        fontSize: '20px', // Tăng kích thước của chữ trong TextField
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '18px', // Tăng kích thước của chữ trong helperText
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '20px', // Tăng kích thước của chữ trong InputLabel
                      },
                    }}
                    label={`Nhập đáp án`}
                    onChange={(event) => handleChangeText(event)}
                    required
                    name={answer.questionAnswerId}
                    defaultValue={answer.answer}
                    multiline
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={answer.iscorrect === true}
                        value={answer.questionAnswerId}
                        onChange={handleChangeOption}

                      />
                    }
                    label={
                      <Typography variant="body1" style={{ fontSize: '19px' }}>
                        Chọn đáp án đúng
                      </Typography>
                    }
                    labelPlacement="end"
                    sx={{
                      fontSize: '20px',
                      mr: '3%'
                    }}
                  />
                </Box>
              ))
            }
          </Box>
          <Typography id='modal-description' sx={{ mt: 2 }} fontSize='23px'>
            Ảnh minh họa
          </Typography>
          <Box m='1% auto' width='90%' bgcolor='white' display='flex' flexDirection='column'>
            {selectedImage && (
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <img src={selectedImage} alt="Selected" style={{ width: 'auto', height: '200px' }} />
              </div>
            )}
            <Box display='flex' alignItems='center'>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-input"
                type="file"
                onChange={(event) => handleImageChange(event)}
              />
              <label htmlFor="image-input">
                <Button component="span" color="primary" sx={{ fontSize: '15px', textTransform: 'none', bgcolor: '#efefef', color: 'black', border: '1px solid black' }}>
                  Chọn ảnh
                </Button>
              </label>
            </Box>
          </Box>
          {/* <Typography ml='1%' color='red' fontSize='18px' width={'80%'}>{error} </Typography> */}
        </Box>

        <Box mt='3%' ml='2%'>
          <Button sx={{ fontSize: '18px', mr: '10px' }} variant='contained'
            onClick={handAddButton}
          >
            Add
          </Button>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Box>

    </Modal >
  )
}

export default EditQuestion