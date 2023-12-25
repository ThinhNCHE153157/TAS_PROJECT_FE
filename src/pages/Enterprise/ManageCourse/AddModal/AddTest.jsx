import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { isFulfilled } from '@reduxjs/toolkit'
import React from 'react'
import { useState } from 'react'

const AddTest = ({
  isOpenAddTestModal,
  handleCloseAddModal,
  handleAdd,
  topicId,
}) => {
  const [type, setType] = useState(0);
  const [audioFile, setAudioFile] = useState(null)
  const [audioUrl, setAudioUrl] = useState({})
  const [error, setError] = useState('')
  const [object, setObject] = useState({ 'topicId': topicId, 'type': 0, 'url': null })
  const handleAudioChange = (event) => {
    const selectedAudio = event.target.files[0];
    setAudioFile(selectedAudio)
    var updateData = { ...object, 'url': selectedAudio }
    setObject(updateData)
    const url = URL.createObjectURL(selectedAudio);
    setAudioUrl(url)
  };
  const handleRadioChange = (event) => {
    setType(event.target.value);
    var updateData = { ...object, 'type': event.target.value }

    if (event.target.value == 0) {
      if (object.hasOwnProperty('url')) {
        // delete updateData['url']
        updateData['url'] = null
        console.log('update:', updateData)
      }
      setAudioFile(null)
      setAudioUrl(null)
    }
    setObject(updateData)
  }

  const handleTextChange = (event) => {
    var text = event.target.value
    var updateData = { ...object, 'testName': text }
    console.log('updateData:', updateData)
    setObject(updateData)
  }

  const isValidObject = (object) => {
    if (Object.keys(object).length !== 4) {
      return false;
    }

    if ((object['type'] === 1 || object['type'] === '1') && object['url'] === null) {
      return false;
    }
    for (const key in object) {
      if (object[key] === '') {
        return false;
      }
    }
    return true;
  }

  const handleAddButton = () => {
    console.log('line 71:', object)
    if (isValidObject(object)) {
      setError('');
      console.log('result:', object)
      handleAdd(object)
    } else {
      setError('*Bạn cần nhập đủ các trường');
      console.log('result:', object)
    }
  }
  return (
    <Modal
      open={isOpenAddTestModal}
      onClose={handleCloseAddModal}
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
          Thêm bài thi mới
        </Typography>
        <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
          Tên bài thi*
        </Typography>
        <TextField
          onChange={(event) => handleTextChange(event)}
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
        />
        <FormControl>
          <Typography id='modal-description' sx={{ mt: 2 }} fontSize='25px'>
            Tên bài thi*
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={type}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value={0}
              control={<Radio />}
              label={<span style={{ fontSize: '20px' }}>Thi đọc</span>}
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={<span style={{ fontSize: '20px' }}>Thi nghe</span>}
            />
          </RadioGroup>
        </FormControl>
        {/* <input type='file' accept='.mp3' /> */}

        {
          type == 1 ? (
            <>
              {audioFile && (
                <Typography fontSize="22px" mt="1%" color="rgba(0, 0, 0, 0.8)">
                  {audioFile.name}
                </Typography>
              )}
              {audioFile && (
                <video
                  width="100%"
                  height="60px"
                  controls
                  src={audioUrl}
                  style={{
                    marginBottom: '10px'
                  }}
                />
              )}
              <input
                accept="mp3"
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
        <Typography ml='1%' color='red' fontSize='18px'>{error} </Typography>
        <Box mt='3%'>
          <Button sx={{ fontSize: '18px' }} variant='contained' onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button sx={{ fontSize: '18px', ml: '2%' }} variant='contained' onClick={handleAddButton}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddTest