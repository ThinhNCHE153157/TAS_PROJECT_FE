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
        <source src={testAudio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio >
      <Grid container columns={12} rowGap={3} ml='3%'>
        {
          listQuestion.map((question, index) => (
            <Grid item xs={6}>
              <SecondPartCard ques={question} key={index} listAnswer={listAnswer} hanldeAddAnswer={hanldeAddAnswer} />
            </Grid>
          ))
        }
      </Grid>
    </>

  )
}

export default Part2