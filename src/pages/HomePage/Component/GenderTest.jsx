import { AppBar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import Part1 from '../Pages/DoTest/PartComponent/Part1';
import CountDownTimer from '../Pages/DoTest/PartCardComponent/CountDownTimer';
import { useEffect } from 'react';
import { useRef } from 'react';
import API from '../../../component/callApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Timer } from '@mui/icons-material';
const StickyComponent = (listQuestion, listAnswer, listPart, id, testDuration) => {
  const user = useSelector(state => state.user?.User)
  const nav = useNavigate();

  const handleSubmit = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn nộp bài?");
    if (isConfirmed) {
      var numberCorrectAnswer = 0;
      const startTime = localStorage.getItem('startTime');
      const endTime = Date.now();
      const elapsedTimeInSeconds = Math.floor((endTime - parseInt(startTime, 10)) / 1000);

      // Chuyển đổi thời gian thành định dạng mm:ss
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      const seconds = elapsedTimeInSeconds % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // Hiển thị thời gian đã làm bài
      console.log('Thời gian đã làm bài:', formattedTime);

      listQuestion.forEach((question) => {
        const i = listAnswer.findIndex(x => x.questionId === question.questionId);
        if (i !== -1 && listAnswer[i].hasOwnProperty('userAnswer')) {
          var userAns = listAnswer[i].userAnswer;
          var correctAnswer = question.questionAnswers.find(x => x.iscorrect === true);
          console.log('correctAnswer: ', correctAnswer)
          console.log('userAns: ', userAns)
          if (correctAnswer?.answer === userAns) {
            numberCorrectAnswer++;
          }
        }
      });

      const totalPoint = parseFloat((numberCorrectAnswer / listQuestion.length * 10).toFixed(2))
      const object = { 'accountId': user.accountId, 'testId': id, 'testScore': totalPoint, 'testFinish': elapsedTimeInSeconds, 'testNumberCorrect': numberCorrectAnswer + "", listAnswer }
      API.post('/Test/SubmitTest', object)
        .then(res => {
          nav(`/testresultdetail/${id}`)

          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })

      console.log('object: ', object)
    } else {

    }
  };
  const handOnTimeOut = () => {

  }
  return (
    <Box
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
        <CountDownTimer initialTime={testDuration !== null ? testDuration : 7200} onTimeout={handOnTimeOut} />
        <Button variant='contained' sx={{ mt: '2%' }} onClick={handleSubmit} >
          <Typography fontSize='20px' width='100px'>
            Nộp bài
          </Typography>
        </Button>
        <Grid container sx={{ ml: '5%', mt: '50px' }}>
          {
            listPart.map((part, index) => {

              return (
                <>
                  <Typography fontSize='25px' mb='15px' fontWeight={500}>Part {index + 1}</Typography>
                  <Box width='100%'>
                    <Grid container columns={15} mb='30px' rowSpacing='10px' >
                      {
                        part.questions.map((question) => {
                          // console.log('listAnswer: ', listAnswer)
                          var isChecked = listAnswer.findIndex(x => x.questionId === question.questionId);
                          // console.log('isChecked: ', isChecked);
                          var indexButton = listQuestion.findIndex(x => x.questionId === question.questionId)
                          return (
                            <Grid xs={3}>
                              <Button
                                variant={isChecked === -1 ? 'outlined' : 'contained'}
                              >
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

const GenderTest = ({
  id = 1
}) => {
  const nav = useNavigate();
  const [tabValue, setTabValue] = useState(1);
  const [listPart, setListPart] = useState([])
  const [listQuestion, setListQuestion] = useState([])
  const [listAnswer, setListAnswer] = useState([])
  const [TestPart, setTestPart] = useState([])
  const [testDuration, setTestDuration] = useState(null)
  const [testName, setTestName] = useState(null)

  useEffect(() => {
    API.get(`/Test/GetTestById?TestId=${id}`)
      .then(res => {
        var listParts = res.data.parts
        setTestDuration(res.data.testDuration)
        setTestName(res.data.testName)
        var partsWithIndex = listParts.map((part, partIndex) => ({
          ...part,
          questions: part.questions.map((question, questionIndex) => ({
            ...question,
            indexQues: partIndex * part.questions.length + questionIndex + 1
          }))
        }));
        const updatedList = [];
        partsWithIndex.forEach(part => {
          part.questions.forEach(question => {
            const { questionAnswers, indexQues, questionId } = question;
            updatedList.push({ questionAnswers, indexQues, questionId });
          });
        });
        setListPart(partsWithIndex)
        console.log('partsWithIndex: ', partsWithIndex)
        console.log('updatedListádflaskdfjslakdfjlaskd ', updatedList)
        console.log(updatedList)
        setListQuestion(updatedList);
      })
      .catch(err => {
        nav('/NotFound')
      })
  }, [listAnswer])


  const startTime = localStorage.getItem('startTime');
  if (startTime === null) {
    localStorage.setItem('startTime', Date.now());
  }
  const hanldeAddAnswer = (questionId, userAnswer) => {
    const existingIndex = listAnswer.findIndex(x => x.questionId === questionId)
    if (existingIndex !== -1) {
      const updatedList = [...listAnswer];
      updatedList[existingIndex].userAnswer = userAnswer;

      setListAnswer(updatedList);
    } else {
      const updatedList = [...listAnswer];
      updatedList.push({ questionId, userAnswer })
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
      <Box sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center', }}>
        <Typography fontSize='30px' fontWeight='bold'>
          {testName}
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

        </Box>
        {StickyComponent(listQuestion, listAnswer, listPart, id, testDuration)}

      </Box>



    </Box>
  )
}

export default GenderTest