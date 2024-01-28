import { Grid } from '@mui/material'
import React from 'react'
import SecondPartCard from '../PartCardComponent/SecondPartCard'
import testAudio from '../../../../../Assets/img/ThisLove.mp3'

const Part2 = ({
  testPart = null,
  listAnswer,
  hanldeAddAnswer
}) => {
  const listQuestion = testPart?.questions

  return (
    <>

      {testPart == null ? ('') : (
        <Grid container columns={12} rowGap={3} ml='3%'>
          {
            listQuestion?.map((question, index) => {
              const answerObject = listAnswer?.find(answer => answer.id === question.id);
              return (
                <Grid item xs={6}>
                  <SecondPartCard
                    ques={question}
                    indexQues={question?.indexQues - 2}
                    key={index}
                    userAnswer={answerObject ? answerObject.userAnswer : null}
                    hanldeAddAnswer={hanldeAddAnswer}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      )}
    </>
  )
}

export default Part2