import { Box, Button, IconButton, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import TextEditor from '../../../../component/TextEditor'
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Divider } from 'antd';
import { API_FormFile, API } from "../../../../component/callApi"
import "./css/ReactQuill.css"

const FirstStep = ({
  onClickNext,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseShortDescription, setCourseShortDescription] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [courseGoal, setCourseGoal] = useState('');
  const [courseLevel, setCourseLevel] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState({
    courseName: false,
    courseShortDescription: false,
    courseDescription: false,
    courseGoal: false,
  });
  const handleNext = () => {
    API.get('/Course/GetCourseIdByName?name=' + courseName)
      .then(response => {
        console.log(response.data);
        onClickNext(response.data);
      })
    //onClickNext(response);
  }
  const handleImageChange = (event) => {
    event.preventDefault();
    setCourseImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleChangeSelect = (event) => {
    setCourseLevel(event.target.value);
  };


  const isDisabled = () => {
    // Kiểm tra xem có bất kỳ thuộc tính nào trong `errors` bằng `true`
    const hasErrors = Object.values(errors).some(value => value === true);

    // Kiểm tra xem `courseImage` có phải là chuỗi trống không và `courseLevel` có bằng `0` không
    const isCourseImageEmpty = courseImage === null;
    const isCourseLevelZero = courseLevel === 0;

    // Nếu có bất kỳ thuộc tính nào trong `errors` bằng `true`, hoặc `courseImage` là chuỗi trống, hoặc `courseLevel` bằng `0`, trả về `true`
    return hasErrors || isCourseImageEmpty || isCourseLevelZero;
  };

  const onChangeCourseName = (event) => {
    const value = event.target.value;
    if (value.length < 5 || value.length > 100) {
      setErrors({
        ...errors,
        courseName: true,
      });
    } else {
      setErrors({
        ...errors,
        courseName: false,
      });
    }

    setCourseName(value);
  }
  const onChangeCourseShortDescription = (event) => {
    const value = event.target.value;

    if (value.length < 50 || value.length > 500) {
      setErrors({
        ...errors,
        courseShortDescription: true,
      });
    } else {
      setErrors({
        ...errors,
        courseShortDescription: false,
      });
    }

    setCourseShortDescription(value);
  }
  const onChangeCourseDescription = (value) => {
    if (value.length < 100 || value.length > 2000) {
      setErrors({
        ...errors,
        courseDescription: true,
      });
    } else {
      setErrors({
        ...errors,
        courseDescription: false,
      });
    }

    setCourseDescription(value);
  }
  const onChangeCourseGoal = (value) => {
    if (value.length < 100 || value.length > 2000) {
      setErrors({
        ...errors,
        courseGoal: true,
      });
    } else {
      setErrors({
        ...errors,
        courseGoal: false,
      });
    }

    setCourseGoal(value);
  }
  const saveChange = () => {
    const formData = new FormData();
    formData.append('CourseName', courseName);
    formData.append('CourseDescription', courseDescription);
    formData.append('Image', courseImage);
    formData.append('ShortDescription', courseShortDescription);
    formData.append('CourseGoal', courseGoal);
    formData.append('CourseLevel', courseLevel);
    API_FormFile.post('/Course/AddCourse', formData)
      .then(res => {
        console.log(res);
        setIsUpdate(true);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <Box width='100%' >
      <Typography fontSize='30px' fontWeight='500'>
        Giới thiệu khóa học
      </Typography>
      <Box mt='3%' bgcolor='white'>
        <Box display='flex' flexDirection='column' ml='3%' >

          <Typography
            fontSize='22px'
            fontWeight='bold'
            sx={{ marginTop: '5%' }}
          >
            Tiêu đề khóa học
          </Typography>
          <TextField
            sx={{
              width: '90%',
              marginTop: '1%',
              '& .MuiInputBase-input': {
                fontSize: '20px',
                '&::placeholder': {
                  color: 'rgb(0 0 0 / 100%)',
                  fontStyle: 'italic',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: errors.courseName ? 'red' : '',
                },
                '&:hover fieldset': {
                  borderColor: errors.courseName ? 'red' : '',
                },
                '&.Mui-focused fieldset': {
                  borderColor: errors.courseName ? 'red' : '',
                },
              },
            }}
            onChange={onChangeCourseName}
            placeholder='Tiêu đề khóa học'
            variant="outlined"
          />
          <Typography sx={{
            fontSize: '18px',
            mt: '0.5%',
            ml: '1%',
          }}>
            * Tiêu đề khóa học tối thiểu 5 kí tự tối đa 100 kí tự
          </Typography>

          <Typography
            fontSize='22px'
            fontWeight='bold'
            sx={{ marginTop: '2%' }}
          >
            Giới thiệu ngắn
          </Typography>
          <TextField
            sx={{
              width: '90%',
              marginTop: '1%',
              '& .MuiInputBase-input': {
                fontSize: '20px', // Tăng kích thước của chữ trong TextField
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgb(0 0 0 / 100%)',
                fontStyle: 'italic',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: errors.courseShortDescription ? 'red' : '',
                },
                '&:hover fieldset': {
                  borderColor: errors.courseShortDescription ? 'red' : '',
                },
                '&.Mui-focused fieldset': {
                  borderColor: errors.courseShortDescription ? 'red' : '',
                },
              },
            }}
            onChange={onChangeCourseShortDescription}
            placeholder='Giới thiệu ngắn'
            variant="outlined"
          />
          <Typography sx={{
            fontSize: '18px',
            mt: '0.5%',
            ml: '1%',
          }}>
            * Giới thiệu tối thiểu 50 kí tự tối đa 500 kí tự
          </Typography>
          <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
            Mô tả khóa học
          </Typography>
          <TextEditor handleTextEditor={onChangeCourseDescription} isError={errors.courseDescription} />
          <Typography sx={{
            fontSize: '18px',
            mt: '0.5%',
            ml: '1%',
          }}>
            * Mô tả tối thiểu 100 kí tự và tối đa 2000 ký tự
          </Typography>
          <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
            Học được gì sau khóa học ?
          </Typography>
          <TextEditor handleTextEditor={onChangeCourseGoal} isError={errors.courseGoal} />
          <Typography sx={{
            fontSize: '18px',
            mt: '0.5%',
            ml: '1%',
          }}>
            * Kết quả thu được sau khóa học tối thiểu 100 kí tự và tối đa 2000 ký tự
          </Typography>
          <Box width='90%' display='flex' mt='2%'>
            <Box width='45%'>
              <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
                Trình độ khóa học
              </Typography>
              <Select
                value={courseLevel}
                onChange={handleChangeSelect}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ width: '80%', marginTop: '1%', fontSize: '20px' }}
                placeholder='Trình độ khóa học'
              >
                <MenuItem sx={{ fontSize: '20px' }} value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1} sx={{ fontSize: '20px' }}>Toeic 500 +</MenuItem>
                <MenuItem value={2} sx={{ fontSize: '20px' }}>Toeic 600 +</MenuItem>
                <MenuItem value={3} sx={{ fontSize: '20px' }}>Toeic 700 +</MenuItem>
              </Select>
            </Box>

            <Box width='50%'>
              <Typography fontSize='22px' fontWeight='bold' sx={{ marginTop: '2%' }}>
                Chọn hình khóa học
              </Typography>
              <Typography fontSize='18px' color='rgba(0, 0, 0, 0.6)'>
                * Bạn nên chọn khung ảnh có tỉ lệ 1x1
              </Typography>
              <Box style={{ padding: '20px', textAlign: 'center' }}>
                {selectedImage && (
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Typography variant="h6" gutterBottom>
                    </Typography>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: '300px' }} />
                  </div>
                )}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-input"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-input">
                  <Button component="span" variant="contained" color="primary" sx={{ fontSize: '15px' }}>
                    Choose Image
                  </Button>
                </label>


              </Box>
            </Box>
          </Box>
          <Divider />
          {
            isDisabled() ? (
              <Typography sx={{ fontSize: '18px', color: 'red', mt: '1%', m: '0 auto' }}>
                Bạn cần điền đầy đủ thông tin
              </Typography>
            ) : ('')
          }
          <Button
            disabled={isDisabled()}
            onClick={() => saveChange()}
            startIcon={<SaveIcon sx={{ color: 'white' }} />}
            sx={{
              m: '0 auto',
              bgcolor: isDisabled() ? 'gray' : 'green',
              borderRadius: '5px',
              width: '180px',
              mb: '5%',
              textTransform: 'none',
            }}
          >
            <Typography fontSize='22px' fontWeight='bold' color='white' ml='1%' >
              Cập nhật
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ ml: '45%', mt: '3%' }}>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            mr: '8%',
            textTransform: 'none'
          }}
          disabled
        >
          Back
        </Button>
        <Button
          variant='contained'
          sx={{
            fontSize: '22px',
            textTransform: 'none'
          }}
          onClick={handleNext}
          disabled={!isUpdate}
        >
          Next
        </Button>
      </Box>
    </Box >
  )
}

export default FirstStep