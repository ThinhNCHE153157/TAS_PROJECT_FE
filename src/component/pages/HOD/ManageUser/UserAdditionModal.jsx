import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Box, Button, Grid } from '@mui/material';
import TextFieldBase from '../../common/TextFieldBase';


const statusOptions = {
  1: 'admin',
  2: 'center',
  3: 'teacher',
  4: 'student',
  5: 'guest',
};

const UserAdditionModal = ({
  open,
  onClose,
  onSubmit,
  data,
}) => {
  const [addData, setAddData] = useState({});
  const [errors, setErrors] = useState({
    err_email: '',
    err_username: '',
    err_fisrtName: '',
    err_lastName: '',
    err_roles: '',
    err_phone: '',
  })

  // const handelOnChange = (e) => {
  //   console.log(addData)
  //   const updatedData = { ...addData, ...e };
  //   console.log(updatedData)
  //   setAddData(updatedData);

  // }


  const handleOnChangeEmail = (e) => {
    var email = e.email ? e.email : '';
    var isValid = isValidEmail(email);
    if (isValid) {
      const updatedData = { ...addData, ...e };
      console.log(updatedData)
      setAddData(updatedData);
      setErrors({ ...errors, err_email: '' })
    } else {
      setErrors({ ...errors, err_email: 'This is not a valid email' })
    }
  }

  const handleOnChangeRoles = (e) => {
    var temp = e.roles ? e.roles : '';
    console.log(temp)
    var listRoles = temp.split(/,\s*/);
    listRoles = listRoles.map((element) => element.toLowerCase());
    console.log('listRoles', listRoles)
    var isAllValid = isAllRolesValid(listRoles);
    var isDuplicate = isDuplicateRoles(listRoles);
    if (isAllValid) {
      if (isDuplicate) {
        setErrors({ ...errors, err_roles: 'Duplicate role' })
      } else {
        const roleKeys = listRoles.map((role) => {
          for (const key in statusOptions) {
            if (statusOptions[key] === role) {
              return { "roleId": key };
            }
          }
          return null; // Trong trường hợp không tìm thấy khớp
        });
        const updatedData = { ...addData, 'roles': roleKeys };
        console.log(updatedData)
        setAddData(updatedData);
        setErrors({ ...errors, err_roles: '' })
      }
    } else {
      setErrors({ ...errors, err_roles: 'Please insert the valid roles' })
    }
  }

  const handleOnChangeNotEmpty = (e) => {
    const keys = Object.keys(e);
    const firstKey = keys[0];
    const firstValue = e[firstKey];
    console.log("firstKey", firstKey)
    console.log("firstValue", firstValue)
    if (firstValue.trim().length === 0) {

      setErrors({ ...errors, ['err_' + firstKey]: 'Can not be an empty name' })
    } else {
      const updatedData = { ...addData, ...e };
      console.log(updatedData)
      setAddData(updatedData);
      setErrors({ ...errors, ['err_' + firstKey]: '' })

    }
  }

  const handleOnChangePhone = (e) => {
    var phone = e.phone ? e.phone : '';
    var isValid = isValidPhone(phone);
    if (isValid) {
      const updatedData = { ...addData, ...e };
      console.log(updatedData)
      setAddData(updatedData);
      setErrors({ ...errors, err_phone: '' })
    } else {
      setErrors({ ...errors, err_phone: 'This is not a valid phone number' })
    }
  }



  const handleOnChangeUsername = (e) => {
    var username = e.username ? e.username : '';
    if (isExistUsername(username)) {
      setErrors({ ...errors, err_username: 'This username have alreadly registed in system' })
    } else {
      const updatedData = { ...addData, ...e };
      console.log(updatedData)
      setAddData(updatedData);
      setErrors({ ...errors, err_username: '' })
    }
  }

  const isHavingError = () => {
    for (const key in errors) {
      if (errors[key] !== '') {
        return true;
      }
    }
    return false;
  }

  const isExistUsername = (username) => {
    return data.some((element) => {
      let u = element && element.username ? element.username : '';
      return username.toString().toLowerCase().trim() === u.toLowerCase();
    });
  }
  const isDuplicateRoles = (roles) => {
    // Sử dụng Set để loại bỏ các phần tử trùng lặp
    const uniqueRoles = new Set(roles);
    // Nếu kích thước của Set khác với kích thước của mảng gốc, có ít nhất một phần tử trùng lặp
    return uniqueRoles.size !== roles.length;
  }
  const isAllRolesValid = (roles) => {
    return roles.every((role) => Object.values(statusOptions).includes(role.toLowerCase()));
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email) || email.trim() === '';
  }
  const isValidPhone = (phone) => {
    const phoneRegex = /^(0\d{9,10})$/;
    return phoneRegex.test(phone);
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
  }, [addData]);

  const handleSubmit = () => {
    if (!isHavingError()) {
      console.log(addData)
      onSubmit(addData);
      onClose();
    }
    // Thực hiện lưu các thay đổi

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
              label='Email'
              name='email'
              onChange={handleOnChangeEmail}
              isRequire={true}
              error={errors.err_email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Username'
              name='username'
              onChange={handleOnChangeUsername}
              isRequire={true}
              error={errors.err_username}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Phone'
              name='phone'
              onChange={handleOnChangePhone}
              error={errors.err_phone}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='First Name'
              name='firstName'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_firstName}
            />
          </Grid>
          <Grid item xs={6} >
            <TextFieldBase
              label='Last Name'
              name='lastName'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_lastName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              label='Roles'
              name='roles'
              onChange={handleOnChangeRoles}
              isRequire={true}
              error={errors.err_roles}
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
  );
}

export default UserAdditionModal