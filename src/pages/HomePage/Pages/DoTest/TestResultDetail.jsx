import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../../../../layout/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TestResultCard from './PartCardComponent/TestResultCard'
import { useSelector } from 'react-redux'
import { API } from '../../../../component/callApi'
import Footer from '../../../../layout/Footer'


const list2 = [
  {
    questionId: 2,
    userAnswer: "Enders Game",
  },

]
const list1 = [
  {
    questionId: 1,
    correctAnswer: "Dune",
    question: "What science fiction book, originally published in 1965, is set in a future where interstellar travel is common and noble houses vie for control of a desert planet?",
    options: ['Dune', 'Foundation', '1984', 'The Hitchhikers Guide to the Galaxy']
  },
]
const TestResultDetail = () => {
  // const [parts, setParts] = useState([])
  const user = useSelector(state => state.user?.User)
  const { id } = useParams();
  const [listQuestion, setListQuestion] = useState(list1)
  const [listAnswer, setListAnswer] = useState(list2)
  const [response, setResponse] = useState({})

  useEffect(() => {
    API.get(`/Test/TestResultDetail?testId=${id}&accountId=${user.accountId}`)
      .then(res => {
        localStorage.removeItem('startTime');
        localStorage.removeItem('countdownTimerTime');
        localStorage.removeItem('countdownTimerTimestamp');
        localStorage.removeItem('countdownTimerStamp');
        localStorage.removeItem('countDownTimer');
        setResponse(res.data)
        setListQuestion(res.data.questionDtos)
        setListAnswer(res.data.userAnswers)
      })
  }, [id, user.accountId])


  return (
    <Box
      backgroundColor='#f3f6f9'
      minHeight='0'
      display='flex'
      flexDirection='column'
    >
      <Header />
      <Typography fontSize='30px' fontWeight='bold' m='0 auto' marginTop='5%' >
        Kết quả thi
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

        <Box
          width='80%'
          sx={{
            marginTop: '2%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: '10px',
            ml: '1%'
          }}
        >
          {
            listQuestion.map((question, index) => {
              var indexMatch = listAnswer.findIndex(answer => answer.questionId === question.questionId)
              console.log(`index ${index}: ${indexMatch}`)
              var usa = ''
              if (indexMatch !== -1) {
                usa = listAnswer[indexMatch].userAnswer;
              }
              return (
                <TestResultCard ques={question} userAnswer={usa} indexQues={index + 1} key={index + 1} />
              )
            })
          }
        </Box>
        <Box width='17%'
          sx={{
            height: '300px',
            marginTop: '2%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: '10px',
            mr: '1%'

          }}>
          <Typography fontSize='25px' fontWeight='500' mt='5%' ml='5%'>{response.testName}</Typography>
          <Typography fontSize='20px' fontWeight='500' mt='5%' ml='7%'>Số câu đúng: {response.numCorrect}/{response.questionDtos?.length}</Typography>
          <Typography fontSize='20px' fontWeight='500' mt='5%' ml='7%'>Điểm: {parseFloat((response.numCorrect / response.questionDtos?.length * 10).toFixed(2))}</Typography>
          <Box mt='18%' ml='32%' display='flex'>
            <Button variant='contained'>
              <Typography fontSize='18px' fontWeight='500'>Làm lại </Typography>
            </Button>
            <Button variant='contained' sx={{ ml: '3%' }}>
              <Typography fontSize='18px' fontWeight='500'>Hoàn thành</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default TestResultDetail