import React from 'react'
import FirstPartCard from '../PartCardComponent/FirstPartCard'
import testAudio from '../../../../../Assets/img/ThisLove.mp3'
const Part1 = ({
  testPart = null,
  listAnswer,
  hanldeAddAnswer
}) => {
  return (
    <>
      {
        testPart === null ? (
          ''
        ) : (
          <div>
            <audio controls style={{ marginLeft: '4%', width: '80%', height: '60px', marginBottom: '3%' }}>
              <source src={testPart.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio >
            {

              testPart.questions.map((question, index) => {
                const answerObject = listAnswer.find(answer => answer.id === question.id);
                return (
                  <FirstPartCard
                    ques={question}
                    indexQues={question.indexQues}
                    key={index}
                    userAnswer={answerObject ? answerObject.userAnswer : null}
                    hanldeAddAnswer={hanldeAddAnswer}
                  />
                )
              }
              )
            }
          </div>

        )
      }


    </>
  )
}

export default Part1