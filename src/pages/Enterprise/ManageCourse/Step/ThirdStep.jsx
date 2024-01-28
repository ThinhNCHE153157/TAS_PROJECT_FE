import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import { useState } from 'react';
import QuestionCard from '../Component/QuestionCard';
import AddQuestion from '../AddModal/AddQuestion';
import SaveIcon from '@mui/icons-material/Save';
import { getQuestionByCourseId, getTopicBycourseId } from '../../../../Services/AddCourseService';
import DescriptionIcon from '@mui/icons-material/Description';
import AddTest from '../AddModal/AddTest';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddNewQuestion, AddNewTest, DeleteTest } from '../../../../Services/TestService';
import { alertError, alertSuccess } from '../../../../component/AlertComponent';
import EditTest from '../AddModal/EditTest';


const ThirdStep = ({
  onClickNext,
  onClickBack,
  id,
}) => {
  const [openAddTestModal, setOpenAddTestModal] = useState(false);
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [datas, setDatas] = useState([]);
  const [listQuesTest, setListQuesTest] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [chooseTopic, setChooseTopic] = useState()
  const [chooseTest, setChooseTest] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTest, setSelectedTest] = useState();
  const [isOpenEditTestModal, setIsOpenEditTestModal] = useState(false);
  const [isOpenEditquestionModal, setIsOpenEditQuestionModal] = useState(false);

  useEffect(() => {
    getTopicBycourseId(id).then(res => {
      setDatas(res.data)
    })
    getQuestionByCourseId(id).then(res => {
      setListQuesTest(res.data)
    })

  }, [refresh, chooseTopic, chooseTest])

  useEffect(() => {
    if (isOpenEditTestModal === false) {
      setSelectedTest()
    }
  }, [isOpenEditTestModal])
  const renderQuestion = (test) => {
    var i = listQuesTest.findIndex(x => x.testId === test.testId)
    var temp = []
    if (i !== -1) {
      temp = listQuesTest[i].questions
    }
    return (
      <>
        {
          temp.length != 0 ? (
            temp.map((question, index) => {
              return (
                <QuestionCard question={question} number={index + 1} handleReload={handleReload} />
              )
            })
          ) : ('')
        }
      </>

    )
  }
  const handleCloseTest = () => {
    setIsLoading(true)
    setOpenAddTestModal(false);
  }
  const handleReload = () => {
    setRefresh(!refresh)
  }
  const handleAddTest = (object) => {
    AddNewTest(object).then(res => {
      console.log(res)
      alertSuccess({ message: 'Thêm thành công bài thi' })
      setRefresh(!refresh)
      handleCloseTest()
    })
      .catch(
        err => alertError({ message: 'Không thành công ' })
      )

  }

  const handleAddQuestion = (object) => {
    var form = new FormData()
    const newQuestionAnswer = object.questionAnswer.map(item => ({
      answer: item.answer,
      iscorrect: item.correct,
    }));
    form.append('testId', object.testId)
    form.append('description', object.description)
    form.append('image', object.image)
    form.append('questionAnswers', JSON.stringify(newQuestionAnswer))
    console.log('form: ', form)
    AddNewQuestion(form).then(res => {
      console.log(res)
      alertSuccess({ message: 'Thêm thành công câu hỏi' })
      setRefresh(!refresh)
      handleCloseQuestion()
    }).catch(err => {
      alertError({ message: 'Thêm không thành công' })
    })
  }
  const handleCloseQuestion = () => {
    setIsLoading(true)
    setOpenAddQuestionModal(false);
  }
  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack();
  }
  const handleDeleteTest = (testId) => {
    console.log('testId: ', testId)
    DeleteTest(testId).then(res => {
      console.log(res)
      alertSuccess({ message: 'Xóa thành công bài thi' })
      setRefresh(!refresh)
    }).catch(err => {
      alertError({ message: 'Xóa không thành công' })
    })
  }

  const handleEditTest = (testId) => {

  }
  const handleCloseEditTestModal = () => {
    setIsOpenEditTestModal(false)
  }
  return (
    <Box width='100%'>
      {
        isLoading == false ? (
          <>
            <AddTest isOpenAddTestModal={openAddTestModal} handleCloseAddModal={handleCloseTest} handleAdd={handleAddTest} topicId={chooseTopic} />
            <AddQuestion isOpenModal={openAddQuestionModal} handleCloseModal={handleCloseQuestion} handleAdd={handleAddQuestion} testId={chooseTest} />
          </>
        ) : (
          ''
        )
      }


      <Typography fontSize='30px' fontWeight='500'>
        Câu hỏi ôn tập
      </Typography>
      <Box mt='3%' display='flex' flexDirection='column'>
        {
          datas?.map((data, index) => {

            return (
              <Box display='flex' flexDirection='column' bgcolor='white' mt='20px' mb='20px'>
                <Box display='flex' justifyContent='space-between' alignItems='center' padding='10px 0px'>
                  <Typography fontSize='26px' ml='2%' fontWeight='bold'>
                    {`Topic ${index + 1}: ${data?.topicName}`}
                  </Typography>
                  <IconButton
                    sx={{
                      mr: '3%',
                      bgcolor: '#1976D2',
                      borderRadius: '10px',
                      '&:hover': {
                        bgcolor: 'black',
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenAddTestModal(true)
                      setChooseTopic(data.topicId)
                      setIsLoading(false)
                      console.log(chooseTopic)
                      console.log('data.topicId: ', data.topicId)
                    }}
                  >
                    <AddCardIcon sx={{ color: 'white' }} />
                    <Typography
                      fontSize='22px'
                      fontWeight='500'
                      color='white'
                      ml='2%'
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Thêm bài kiểm tra
                    </Typography>
                  </IconButton>
                </Box>
                <Typography fontSize='18px' ml='2%' color='textSecondary'>
                  {`Tổng số bài thi: ${data.tests.length}`}
                </Typography>
                {
                  data.tests.map((test, index) => {

                    return (
                      <Box width='100%'>
                        <Box mt='20px' bgcolor='#edeff5' display='flex' justifyContent='space-between'>
                          <Box display='flex' width='80%' alignItems='center' ml='2%' padding='18px 0'>
                            <DescriptionIcon sx={{ fontSize: '30px' }} />
                            <Typography ml='10px' fontSize='24px' fontWeight='500'>
                              {test?.testName}
                            </Typography>
                          </Box>
                          <Box display='flex' mr='3%'>
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedTest(test)
                                setIsOpenEditTestModal(true)
                                // setIsLoading(false)
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                handleDeleteTest(test.testId)
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box>
                          {
                            renderQuestion(test)
                          }
                        </Box>
                        <Box width='100%' bgcolor='black' display='flex' padding='10px 0px'>
                          <IconButton sx={{ ml: '1%' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenAddQuestionModal(true)
                              setChooseTest(test.testId)
                              setIsLoading(false)
                            }}>
                            <AddCircleOutlineIcon sx={{ color: 'white', fontSize: '30px' }} />
                            <Typography fontSize='25px' color='white' ml='10px'>
                              Thêm câu hỏi
                            </Typography>
                          </IconButton>
                        </Box>
                      </Box>

                    )
                  })
                }
              </Box>

            )
          })
        }

      </Box>
      <Divider />
      <Box width='100%' display='flex' mt='3%'>
        <IconButton sx={{ m: '0 auto', bgcolor: 'green', borderRadius: '5px', width: '180px', mb: '5%' }}>
          <SaveIcon sx={{ color: 'white' }} />
          <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
            Cập nhật
          </Typography>
        </IconButton>
      </Box>
      {/* <AddQuestion isOpenModal={openAddQuestionModal} handleCloseModal={handleCloseQuestion} handleAdd={handleAddQuestion} testId={}/> */}
      {/* <AddTest isOpenAddTestModal={openAddTestModal} handleCloseAddModal={handleCloseTest} handleAdd={handleAddTest} /> */}

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
        >
          Next
        </Button>
        {
          selectedTest ? (
            <EditTest isOpenEditTestModal={isOpenEditTestModal} handleCloseEditTestModal={handleCloseEditTestModal} handleEditTest={handleEditTest} test={selectedTest} />
          ) : ('')
        }

      </Box>
    </Box >
  )
}

export default ThirdStep