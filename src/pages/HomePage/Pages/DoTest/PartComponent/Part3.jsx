import React from 'react'
import testAudio from '../../../../../Assets/img/ThisLove.mp3'
import ThirdPartCart from '../PartCardComponent/ThirdPartCart'

const Part3 = ({
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
      {

        listQuestion.map((question, index) => (
          <ThirdPartCart />
        ))
      }
    </>
  )
}

export default Part3