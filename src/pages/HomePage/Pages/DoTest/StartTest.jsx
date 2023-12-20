import { AppBar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../../layout/Header'
import { useState } from 'react';
import FirstPartCard from './PartCardComponent/FirstPartCard';
import Part1 from './PartComponent/Part1';
import Part2 from './PartComponent/Part2';
import Part3 from './PartComponent/Part3';
import CountDownTimer from './PartCardComponent/CountDownTimer';
import { useEffect } from 'react';

const parts = [
  {
    partId: 1,
    urlSound: '',
    questions: [
      {
        id: "1",
        question: "What is the capital of France?",
        correctAnswer: "Paris",
        options: ["Paris", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "2",
        question: "Who painted the Mona Lisa?",
        correctAnswer: "Leonardo da Vinci",
        options: ["Canberra", 'Leonardo da Vinci', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "3",
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
        options: ["Canberra", 'abvdd', 'Jupiter', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 2,
    urlSound: '',
    questions: [
      {
        id: "4",
        question: "What is the chemical symbol for gold?",
        correctAnswer: "Au",
        options: ["Canberra", 'abvdd', 'Au', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "5",
        question: "Who wrote the play Romeo and Juliet?",
        correctAnswer: "William Shakespeare",
        options: ["Canberra", 'abvdd', 'asdfasdfasdf', 'William Shakespeare'],
        urlPic: ''
      },
      {
        id: "6",
        question: "What is the tallest mountain in the world?",
        correctAnswer: "Mount Everest",
        options: ["Canberra", 'abvdd', 'Mount Everest', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 3,
    urlSound: '',
    questions: [
      {
        id: "7",
        question: "What is the formula for water?",
        correctAnswer: "H2O",
        options: ["Canberra", 'H2O', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "8",
        question: "Who is the current president of the United States?",
        correctAnswer: "Joe Biden",
        options: ["Canberra", 'abvdd', 'asdfasdfasdf', 'Joe Biden'],
        urlPic: ''
      },
      {
        id: "9",
        question: "What is the largest ocean on Earth?",
        correctAnswer: "Pacific Ocean",
        options: ["Canberra", 'Pacific Ocean', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 4,
    urlSound: '',
    questions: [
      {
        id: "10",
        question: "What is the square root of 64?",
        correctAnswer: "8",
        options: ["Canberra", 'abvdd', '8', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "11",
        question: "Who invented the telephone?",
        correctAnswer: "Alexander Graham Bell",
        options: ["Canberra", 'Alexander Graham Bell', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "12",
        question: "What is the capital of Japan?",
        correctAnswer: "Tokyo",
        options: ["Canberra", 'abvdd', 'Tokyo', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 5,
    urlSound: '',
    questions: [
      {
        id: "13",
        question: "What is the boiling point of water in Celsius?",
        correctAnswer: "100",
        options: ["Canberra", '100', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "14",
        question: "Who wrote the novel Pride and Prejudice?",
        correctAnswer: "Jane Austen",
        options: ["Canberra", 'abvdd', 'Jane Austen', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "15",
        question: "What is the largest country in the world by land area?",
        correctAnswer: "Russia",
        options: ["Canberra", 'Russia', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 6,
    urlSound: '',
    questions: [
      {
        id: "16",
        question: "What is the symbol for the element oxygen?",
        correctAnswer: "O",
        options: ["Canberra", 'O', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "17",
        question: "Who discovered gravity?",
        correctAnswer: "Isaac Newton",
        options: ["Canberra", 'abvdd', 'Isaac Newton', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "18",
        question: "What is the capital of Australia?",
        correctAnswer: "Canberra",
        options: ["Canberra", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
    ]

  },
  {
    partId: 7,
    urlSound: '',
    questions: [
      {
        id: "19",
        question: "What is the square root of 81?",
        correctAnswer: "9",
        options: ["Canberra", '9', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      },
      {
        id: "20",
        question: "Who painted the Starry Night?",
        correctAnswer: "Vincent van Gogh",
        options: ["Vincent van Gogh", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        urlPic: ''
      }
    ]

  },
]

const partsWithIndex = parts.map((part, partIndex) => ({
  ...part,
  questions: part.questions.map((question, questionIndex) => ({
    ...question,
    indexQues: partIndex * part.questions.length + questionIndex + 1
  }))
}));
const StickyComponent = (listQuestion, listAnswer, listPart) => {
  const handleSubmit = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn nộp bài?");
    if (isConfirmed) {
      var numberCorrectAnswer = 0;
      console.log(listQuestion);
      console.log(listAnswer);

      listQuestion.forEach((question) => {
        const i = listAnswer.findIndex(x => x.id === question.id);
        if (i !== -1 && listAnswer[i].hasOwnProperty('userAnswer')) {
          var userAns = listAnswer[i].userAnswer;

          if (question.correctAnswer === userAns) {
            numberCorrectAnswer++;
          }
        }
      });
      const totalPoint = parseFloat((numberCorrectAnswer / listQuestion.length * 10).toFixed(2))
      console.log('NumberCorrectAnswer: ', numberCorrectAnswer)
      console.log('Total point:', totalPoint)
    } else {

    }
  };
  return (
    <Box
      display='flex'
      style={{
        minHeight: '0',
        width: '350px',
        position: 'sticky',
        marginTop: '2%',
        left: '85%',
        backgroundColor: 'white',
        paddingTop: '16px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        transition: 'margin-top 0.3s ease-in-out', // Thêm hiệu ứng chuyển động
      }}
    >
      <Box display='flex' flexDirection='column' justifyItems='center' alignItems='center'>
        <Typography fontSize='27px' fontWeight='400'>
          Thời gian còn lại
        </Typography>
        <CountDownTimer initialTime={7200} />
        <Button variant='contained' sx={{ mt: '2%' }} onClick={handleSubmit} >
          <Typography fontSize='20px' width='100px'>
            Nộp bài
          </Typography>
        </Button>
        <Grid container sx={{ ml: '5%', mt: '50px' }}>
          {
            listPart.map((part) => {

              return (
                <>
                  <Typography fontSize='25px' mb='15px' fontWeight={500}>Part {part.partId}</Typography>
                  <Box width='100%'>
                    <Grid container columns={15} mb='30px' >
                      {
                        part.questions.map((question) => {
                          var indexButton = listQuestion.findIndex(x => x.id === question.id)
                          return (
                            <Grid xs={3}>
                              <Button variant='outlined'>
                                <Typography fontSize='20px'>{indexButton + 1}</Typography>
                              </Button>
                            </Grid>
                          )
                        })
                      }

                    </Grid>
                  </Box>

                  <Divider sx={{ width: '90%', height: '1px', bgcolor: 'black' }} />
                </>
              )
            })
          }
          <Grid item xs={2}>
            <Button>

            </Button>
          </Grid>
        </Grid>

      </Box>


    </Box >
  );
}

const StartTest = () => {
  const [tabValue, setTabValue] = useState(1);
  const [listPart, setListPart] = useState(partsWithIndex)
  const [listQuestion, setListQuestion] = useState([])
  const [listAnswer, setListAnswer] = useState([])
  useEffect(() => {
    const updatedList = [];
    partsWithIndex.forEach(part => {
      part.questions.forEach(question => {
        const { id, correctAnswer, indexQues } = question;
        updatedList.push({ id, correctAnswer, indexQues });
      });
    });
    console.log(updatedList)

    // console.log(partsWithIndex);
    // Cập nhật state listQuestion
    setListQuestion(updatedList);
  }, [])

  const hanldeAddAnswer = (id, userAnswer) => {
    const existingIndex = listAnswer.findIndex(x => x.id === id)
    if (existingIndex !== -1) {
      const updatedList = [...listAnswer];
      updatedList[existingIndex].userAnswer = userAnswer;

      setListAnswer(updatedList);
    } else {
      const updatedList = [...listAnswer];
      updatedList.push({ id, userAnswer })
      // setListAnswer(prevList => [...prevList, { id, userAnswer }]);
      setListAnswer(updatedList);
    }
  }

  return (
    <Box
      backgroundColor='#f3f6f9'
      minHeight='0'
      display='flex'
      flexDirection='column'
    >
      <Header />

      <Box sx={{ marginTop: '5%', display: 'flex', justifyContent: 'center', }}>
        <Typography fontSize='30px' fontWeight='bold'>
          Tên đề test
        </Typography>
      </Box>
      <Box
        backgroundColor='#f3f6f9'
        minHeight='0'
        display='flex'
      >
        <Box
          width='83%'
          sx={{
            marginTop: '2%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: '10px',
            ml: '1%'
          }}
        >
          <Box display='flex' mb='2%' mt='2%'>
            {
              listPart.length !== 1 ? (
                listPart.map((part, index) => (
                  <Button
                    key={index}
                    variant='outlined'
                    onClick={() => setTabValue(index + 1)}
                    sx={{
                      textTransform: 'none',
                      color: 'black',
                      borderRadius: '20px',
                      bgcolor: tabValue === index + 1 ? '#83cdde' : '#abe7f5',
                      border: 'none',
                      fontWeight: tabValue === index + 1 ? 'bold' : '',
                      ml: '2%',
                      width: '120px'
                    }}
                  >
                    <Typography fontSize='20px'>
                      {'Part ' + (index + 1)}
                    </Typography>
                  </Button>
                ))
              ) : ('')

            }

          </Box>
          {tabValue === 1 ? (< Part1 testPart={listPart[0]} listAnswer={listAnswer} hanldeAddAnswer={hanldeAddAnswer} />) : ('')}
          {tabValue === 2 ? (< Part2 testPart={listPart[1]} listAnswer={listAnswer} hanldeAddAnswer={hanldeAddAnswer} />) : ('')}
          {tabValue === 3 ? (< Part3 testPart={listPart[2]} listAnswer={listAnswer} hanldeAddAnswer={hanldeAddAnswer} />) : ('')}

        </Box>
        {StickyComponent(listQuestion, listAnswer, listPart)}

      </Box>



    </Box>
  )
}

export default StartTest