import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { isFulfilled } from '@reduxjs/toolkit'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const EditTest = ({
  isOpenEditTestModal,
  handleCloseEditTestModal,
  handleEditTest,
  test,
}) => {

  const [type, setType] = useState(test?.parts[0]?.type);
  const [testName, setTestName] = useState(test?.testName)
  const [testDescription, setTestDescription] = useState(test?.testDescription)
  const [url, setUrl] = useState(test?.parts[0]?.url)
  const [response, setResponse] = useState({})

  // useEffect(() => {
  //   setType(test?.parts[0]?.type)
  //   setTestName(test?.testName)
  //   setTestDescription(test?.testDescription)
  //   setUrl(test?.parts[0]?.url)
  //   setResponse({})
  // }, [test])
  // const [object, setObject] = useState(test)

  const handleAudioChange = (event) => {
    const selectedAudio = event.target.files[0];
    console.log('line 20:', selectedAudio)
    setResponse({ ...response, url: selectedAudio });
    setUrl(URL.createObjectURL(selectedAudio));
  };

  const handleRadioChange = (event) => {
    console.log('line 37:', event.target.value)
    console.log('line 38:', event.target.value == 'true')
    setType(event.target.value);
  }

  const handleTextChange1 = (event) => {
    var text = event.target.value
    setTestName(text)
  }
  const handleTextChange = (event) => {
    var text = event.target.value
    setTestDescription(text)
  }
  // const isValidObject = (object) => {
  //   if (Object.keys(object).length !== 5) {
  //     return false;
  //   }

  //   if ((object['type'] === 1 || object['type'] === '1') && object['url'] === null) {
  //     return false;
  //   }
  //   for (const key in object) {
  //     if (object[key] === '') {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  const handleAddButton = () => {
    var object = {
      testId: test.testId,
      testName: testName,
      testDescription: testDescription,
      type: type,
      url: response.url || null,
    }
    console.log('line 73:', object)
  }

  return (
    <Modal
      open={isOpenEditTestModal}
      onClose={handleCloseEditTestModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Nội dung của modal */}
        <Typography id='modal-title' variant='h4' component='div'>
          Chỉnh sửa bài thi
        </Typography>
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Tên bài thi*
        </Typography>
        <TextField
          onChange={(event) => handleTextChange1(event)}
          name='testName'
          component='div'
          sx={{
            mt: '1%',
            width: '90%',
            '& .MuiInputBase-input': {
              fontSize: '20px', // Tăng kích thước của chữ trong TextField
            },
            '& .MuiFormHelperText-root': {
              fontSize: '18px', // Tăng kích thước của chữ trong helperText
            },
          }}
          placeholder='Tên bài thi'
          defaultValue={testName}
        />
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Mô tả*
        </Typography>
        <TextField
          onChange={(event) => handleTextChange(event)}
          component='div'
          name='description'
          sx={{
            mt: '1%',
            width: '90%',
            '& .MuiInputBase-input': {
              fontSize: '20px', // Tăng kích thước của chữ trong TextField
            },
            '& .MuiFormHelperText-root': {
              fontSize: '18px', // Tăng kích thước của chữ trong helperText
            },
          }}
          placeholder='Mô tả'
          defaultValue={testDescription}
        />

        <FormControl>
          <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
            Chọn dạng đề
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={type}
            onChange={(event) => handleRadioChange(event)}
          >
            <FormControlLabel
              value={'false'}
              control={<Radio />}
              label={<span style={{ fontSize: '20px' }}>Thi đọc</span>}
            />
            <FormControlLabel
              value={'true'}
              control={<Radio />}
              label={<span style={{ fontSize: '20px' }}>Thi nghe</span>}
            />
          </RadioGroup>
        </FormControl>

        {
          (type == 'true' || type == true) ? (
            <>
              {response.url && (
                <Typography fontSize="20px" mt="1%" color="rgba(0, 0, 0, 0.8)" fontStyle='italic'>
                  {response.url.name}
                </Typography>
              )}
              <video
                width="100%"
                height="60px"
                controls
                src={url}
                style={{
                  marginBottom: '10px'
                }}
              />
              <input
                accept=".mp3"
                style={{ display: 'none' }}
                id="audio-input"
                type="file"
                onChange={(event) => handleAudioChange(event)}
              />
              <label htmlFor="audio-input">
                <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}>
                  Chọn tệp âm thanh
                </Button>
              </label>

            </>
          ) : ('')
        }
        {/* <Typography ml='1%' color='red' fontSize='18px'>{error} </Typography> */}
        <Box mt='3%'>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseEditTestModal}>
            Hủy bỏ
          </Button>
          <Button sx={{ fontSize: '18px', ml: '2%' }} variant='contained'
            onClick={handleAddButton}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditTest