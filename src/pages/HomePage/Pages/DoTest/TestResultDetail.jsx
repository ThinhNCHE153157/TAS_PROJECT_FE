import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../../../../layout/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TestResultCard from './PartCardComponent/TestResultCard'
import { useSelector } from 'react-redux'
import { API } from '../../../../component/callApi'


const list2 = [
  {
    questionId: 2,
    userAnswer: "Enders Game",
  },
  {
    questionId: 3,
    userAnswer: "The Martian",
  },
  {
    questionId: 4,
    userAnswer: "The Hunger Games",
  },
  {
    questionId: 5,
    userAnswer: "2001",
  },
]
const list1 = [
  {
    questionId: 1,
    correctAnswer: "Dune",
    question: "What science fiction book, originally published in 1965, is set in a future where interstellar travel is common and noble houses vie for control of a desert planet?",
    options: ['Dune', 'Foundation', '1984', 'The Hitchhikers Guide to the Galaxy']
  },
  {
    questionId: 2,
    correctAnswer: "Brave New World",
    question: "Which science fiction novel, written by Orson Scott Card, follows a young boy named Ender Wiggin as he trains at a space military academy to prepare for an alien invasion?",
    options: ['Enders Game', 'Brave New World', 'Neuromancer', 'The War of the Worlds']
  },
  {
    questionId: 3,
    correctAnswer: "The Martian",
    question: "What science fiction novel, written by Andy Weir, tells the story of an astronaut stranded alone on Mars and his struggle to survive?",
    options: ['The Martian', 'Ready Player One', 'Snow Crash', 'The Left Hand of Darkness']
  },
  {
    questionId: 4,
    correctAnswer: "The Hunger Games",
    question: "What science fiction series, written by Suzanne Collins, is set in a dystopian future where teenagers are forced to fight to the death in an annual televised event?",
    options: ['The Hunger Games', 'Divergent', 'The Maze Runner', 'The Giver']
  },
  {
    questionId: 5,
    correctAnswer: "Enders Game",
    question: "What science fiction comedy series, written by Douglas Adams, follows the adventures of an ordinary human and his alien friend as they travel through space?",
    options: ['The Hitchhikers Guide to the Galaxy', 'Starship Troopers', 'Enders Game', '2001']
  },
  {
    questionId: 6,
    correctAnswer: "Brave New World",
    question: "What science fiction novel, written by Aldous Huxley, is set in a future where society is divided into genetically engineered classes and people are controlled by drugs and technology?",
    options: ['Brave New World', '1984', 'Fahrenheit 451', 'The Handmaids Tale']
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
    </Box>
  )
}

export default TestResultDetail