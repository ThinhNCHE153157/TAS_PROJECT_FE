import { Grid } from '@mui/material'
import React from 'react'
import SecondPartCard from '../PartCardComponent/SecondPartCard'
import testAudio from '../../../../../Assets/img/ThisLove.mp3'

const Part2 = ({
  testPart,
  listAnswer,
  hanldeAddAnswer
}) => {
  const listQuestion = testPart.questions
  return (
    <>
      <audio controls style={{ marginLeft: '4%', width: '80%', height: '60px', marginBottom: '3%' }}>
        <source src="https://s3.cloudfly.vn/tas/EST22/EST22Part2.mp3?AWSAccessKeyId=PV92CA7JDT75TGOERRQL&Signature=OG50vJx%2BE%2BOK%2FyaD%2FuyOVZqz21w%3D&Expires=1703134109" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio >
      <Grid container columns={12} rowGap={3} ml='3%'>
        {
          listQuestion.map((question, index) => {
            const answerObject = listAnswer.find(answer => answer.id === question.id);
            return (
              <Grid item xs={6}>
                <SecondPartCard
                  ques={question}
                  indexQues={question.indexQues}
                  key={index}
                  userAnswer={answerObject ? answerObject.userAnswer : null}
                  hanldeAddAnswer={hanldeAddAnswer}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </>

  )
}

export default Part2