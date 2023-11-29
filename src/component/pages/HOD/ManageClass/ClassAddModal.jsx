import { Box, Button, Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldBase from '../../common/TextFieldBase'
import { FetchAllTeacher, FetchClassCodes } from '../../common/CallAPI';
import DatePickerBase from '../../common/DatePickerBase';

const ClassAddModal = ({
  open,
  onClose,
  onSubmit,
  // errors,
  onChangeErrors,
  onChange
}) => {
  const [addData, setAddData] = useState({});
  const [errors, setErrors] = useState({
    err_className: '',
    err_maxStudentInClass: '',
    err_teacher: '',
    err_classCode: '',
    err_description: '',
    err_startTime: '',
    err_endTime: ''
  })
  const [classCodes, setClassCodes] = useState([])
  const [teacherName, setTeacherName] = useState([])

  useEffect(() => {
    FetchClassCodes()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setClassCodes(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });
    FetchAllTeacher()
      .then(response => {
        console.log('Dữ liệu từ API:', response);
        setTeacherName(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      });

  }, []);

  const handleOnChangeStartDate = (e) => {
    var startDate = e.startTime ? e.startTime : '';
    var endDate = addData.endTime ? addData.endTime : '';
    if (endDate === '') {
      const updateData = { ...addData, ...e }
      setAddData(updateData)
      setErrors({ ...errors, err_startTime: '' })
    } else {
      if (startDate > endDate) {
        setErrors({ ...errors, err_startTime: 'Start date can not be larger than end date' })
      } else {
        const updateData = { ...addData, ...e }
        setAddData(updateData)
        setErrors({ ...errors, err_startTime: '' })
      }
    }
  }

  const handleOnChangeEndDate = (e) => {
    var endDate = e.endTime ? e.endTime : '';
    var startDate = addData.startTime ? addData.startTime : '';
    if (startDate === '') {
      const updateData = { ...addData, ...e }
      setAddData(updateData)
      setErrors({ ...errors, err_endTime: '' })
    } else {
      if (startDate > endDate) {
        setErrors({ ...errors, err_endTime: 'Start date can not be larger than end date' })
      } else {
        const updateData = { ...addData, ...e }
        setAddData(updateData)
        setErrors({ ...errors, err_endTime: '' })
      }
    }
  }

  const isExistClassCode = (value) => {
    return classCodes.some((element) => {
      let class_code = element && element.classCode ? element.classCode : '';
      return value.toString().toLowerCase().trim() === class_code.toLowerCase();
    });
  }
  const isExistTeacher = (value) => {
    return teacherName.some((element) => {
      let teacher = element && element.teacher ? element.teacher : '';
      return value.toString().toLowerCase().trim() === teacher.toLowerCase();
    });
  }

  const isPositiveNumber = (value) => {
    if (!Number.isFinite(value)) {
      return false;
    }
    const number = Number(value);
    return number > 0;
  }
  const handleOnChangeTeacher = (value) => {
    var teacher = value.teacher ? value.teacher : '';
    var isValid = isExistTeacher(teacher);
    if (isValid) {
      const updateData = { ...addData, ...value }
      setAddData(updateData)
      setErrors({ ...errors, err_teacher: '' })
    } else {
      setErrors({ ...errors, err_teacher: 'That teacher does not exist in system' })
    }
  }
  const handleOnChangeClassCode = (value) => {
    var classCode = value.classCode ? value.classCode : ''
    var isValid = isExistClassCode(classCode);
    if (isValid) {
      setErrors({ ...errors, err_classCode: 'This code is already existed' })
    } else {
      const updatedData = { ...addData, ...value }
      setAddData(updatedData);
      setErrors({ ...errors, err_classCode: '' })
    }
  }

  const handleOnChangeStudentNum = (value) => {
    var stuNum = value.maxStudentInClass ? value.maxStudentInClass : '';
    var isValid = isPositiveNumber(stuNum);
    if (isValid) {
      const updatedData = { ...addData, ...value }
      setAddData(updatedData);
      setErrors({ ...errors, err_maxStudentInClass: '' })
    } else {
      setErrors({ ...errors, err_classCode: 'This is not an positive number' })
    }
  }

  const handleOnChangeNotEmpty = (e) => {
    const keys = Object.keys(e);
    const firstKey = keys[0];
    const firstValue = e[firstKey];
    console.log("firstKey", firstKey)
    console.log("firstValue", firstValue)
    if (firstValue.trim().length === 0) {

      setErrors({ ...errors, ['err_' + firstKey]: 'This field can not be empty' })
    } else {
      const updatedData = { ...addData, ...e };
      console.log(updatedData)
      setAddData(updatedData);
      setErrors({ ...errors, ['err_' + firstKey]: '' })

    }
  }

  const handelOnChange = (e) => {
    const updatedData = { ...addData, ...e };
    console.log(updatedData)
    setAddData(updatedData);
    onChange(updatedData);
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
    FetchClassCodes()
      .then(response => {
        console.log(response)
        setClassCodes(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);
      })
    FetchAllTeacher()
      .then(response => {
        console.log(response)
        setTeacherName(response)
      })
      .catch(error => {
        console.error('Lỗi khi gọi API:', error);

      })
  }, []);

  const handleSubmit = () => {
    // Thực hiện lưu các thay đổi
    console.log(addData)
    onSubmit(addData);
  };

  const handleClose = () => {
    onClose();
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
        }}
      >
        <h2 sx={{ m: 2 }} id="edit-modal-title">Thêm user</h2>
        <Grid container spacing={2} rowSpacing={2} justifyContent='flex-start'>
          <Grid item xs={6}>
            <TextFieldBase
              label='Class name'
              name='className'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_className ? errors.err_className : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Number Of Students'
              name='maxStudentInClass'
              onChange={handleOnChangeStudentNum}
              isRequire={true}
              error={errors.err_maxStudentInClass ? errors.err_maxStudentInClass : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Lecturer'
              name='teacher'
              onChange={handleOnChangeTeacher}
              isRequire={true}
              error={errors.err_teacher ? errors.err_teacher : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Class Code'
              name='classCode'
              onChange={handleOnChangeClassCode}
              isRequire={true}
              error={errors.err_classCode ? errors.err_classCode : ''}
            />
          </Grid>
          <Grid item xs={9} >
            <TextFieldBase
              label='Description'
              name='description'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_description ? errors.err_description : ''}
              multiline={true}
              rows={4}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePickerBase
              label='Start Date'
              name='startTime'
              onChange={handleOnChangeStartDate}
              error={errors.err_startTime ? errors.err_startTime : ''}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePickerBase
              label='End Date'
              name='endTime'
              onChange={handleOnChangeEndDate}
              error={errors.err_endTime ? errors.err_endTime : ''}
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Button item onClick={handleSubmit}>Thêm</Button>
            </Grid>
            <Grid item xs={3}>
              <Button item onClick={handleClose}>Hủy</Button>
            </Grid>
          </Grid>
        </Grid>


      </Box>
    </Modal>
  )
}

export default ClassAddModal