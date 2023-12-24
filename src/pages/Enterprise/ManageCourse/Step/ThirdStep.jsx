import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import { useState } from 'react';
import QuestionCard from '../Component/QuestionCard';
import AddQuestion from '../AddModal/AddQuestion';
import SaveIcon from '@mui/icons-material/Save';
import { getTopicBycourseId } from '../../../../Services/AddCourseService';
import DescriptionIcon from '@mui/icons-material/Description';
import AddTest from '../AddModal/AddTest';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const ThirdStep = ({
  onClickNext,
  onClickBack,
  id,
}) => {
  const [openAddTestModal, setOpenAddTestModal] = useState(false);
  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
  const [datas, setDatas] = useState([]);
  const [listQuesTest, setListQuesTest] = useState([
    {
      testId: 3,
      questions: [
        {
          questionId: 1,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 1,
        },
        {
          questionId: 2,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 4,
        },
        {
          questionId: 3,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 1,
        }
      ]
    },
    {
      testId: 4,
      questions: [
        {
          questionId: 4,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 1,
        },
        {
          questionId: 5,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 1,
        },
        {
          questionId: 6,
          description: 'What is true number?',
          resultA: 1,
          resultB: 2,
          resultC: 3,
          resultD: 4,
          correctResult: 1,
        }
      ]
    }
  ])
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTopicBycourseId(id).then(res => {
      console.log(res.data)
      setDatas(res.data)
      console.log(res.data)
    })
  }, [])
  const renderQuestion = (test) => {
    console.log(test)
    var i = listQuesTest.findIndex(x => x.testId === test.testId)
    var temp = []
    if (i !== -1) {
      temp = listQuesTest[i].questions
    }
    return (
      <>
        {
          temp.length && (
            temp.map((question, index) => {
              console.log('description: ', question.description)
              return (
                <QuestionCard question={question} number={index + 1} />

              )
            })
          )
        }
      </>

    )
  }
  const handleCloseTest = () => {
    setOpenAddTestModal(false);
  }
  const handleAddTest = (object) => {

  }

  const handleAddQuestion = (object) => {

  }
  const handleCloseQuestion = () => {
    setOpenAddQuestionModal(false);
  }
  const handleNext = () => {
    onClickNext();
  }
  const handleBack = () => {
    onClickBack();
  }
  return (
    <Box width='100%'>
      <Typography fontSize='30px' fontWeight='500'>
        Câu hỏi ôn tập
      </Typography>
      <Box mt='3%' display='flex' flexDirection='column'>
        {
          datas?.map((data, index) => {

            return (
              <Box display='flex' flexDirection='column' bgcolor='white' mt='20px' mb='20px'>
                <Box display='flex' justifyContent='space-between' alignItems='center' padding='10px 0px'>

                  <AddTest isOpenAddTestModal={openAddTestModal} handleCloseAddModal={handleCloseTest} handleAdd={handleAddTest} topicId={data.topicId} />

                  <Typography fontSize='26px' ml='2%' fontWeight='bold'>
                    {`Topic ${index}: ${data?.topicName}`}
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
                    onClick={() => setOpenAddTestModal(true)}
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
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
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
                          <IconButton sx={{ ml: '1%' }} onClick={() => setOpenAddQuestionModal(true)}>
                            <AddCircleOutlineIcon sx={{ color: 'white', fontSize: '30px' }} />
                            <Typography fontSize='25px' color='white' ml='10px'>
                              Thêm câu hỏi
                            </Typography>
                          </IconButton>

                        </Box>
                        <AddQuestion isOpenModal={openAddQuestionModal} handleCloseModal={handleCloseQuestion} handleAdd={handleAddQuestion} testId={test.testId} />

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
      </Box>
    </Box >
  )
}

export default ThirdStep