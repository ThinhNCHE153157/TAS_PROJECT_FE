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
const UserEditionModal = ({
  open,
  onClose,
  rowToEdit,
  onSave,
}) => {
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState({
    err_fisrtName: '',
    err_lastName: '',
    err_roles: '',
    err_phone: '',
  })


  const handelOnChange = (e) => {
    console.log(editedData)
    const updatedData = { ...editedData, ...e };
    console.log(updatedData)
    setEditedData(updatedData);
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
        const updatedData = { ...editedData, 'roles': roleKeys };
        console.log(updatedData)
        setEditedData(updatedData);
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
      const updatedData = { ...editedData, ...e };
      console.log(updatedData)
      setEditedData(updatedData);
      setErrors({ ...errors, ['err_' + firstKey]: '' })

    }
  }

  const handleOnChangePhone = (e) => {
    var phone = e.phone ? e.phone : '';
    var isValid = isValidPhone(phone);
    if (isValid) {
      const updatedData = { ...editedData, ...e };
      console.log(updatedData)
      setEditedData(updatedData);
      setErrors({ ...errors, err_phone: '' })
    } else {
      setErrors({ ...errors, err_phone: 'This is not a valid phone number' })
    }
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

  const isValidPhone = (phone) => {
    const phoneRegex = /^(0\d{9,10})$/;
    return phoneRegex.test(phone);
  }

  // Sử dụng useEffect để theo dõi sự thay đổi của editedData và log nó
  useEffect(() => {
    setEditedData(rowToEdit)
  }, [rowToEdit]);

  const handleSave = () => {
    // Thực hiện lưu các thay đổi
    console.log(editedData)
    onSave(editedData);
    onClose();
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
        <h2 sx={{ m: 2 }} id="edit-modal-title">Chỉnh sửa thông tin</h2>
        <Grid container spacing={2} rowSpacing={2} justifyContent='flex-start'>
          <Grid item xs={6}>
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.email ? rowToEdit.email : ''}
              label='Email'
              name='email'
              disable={true} />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.username ? rowToEdit.username : ''}
              label='Username'
              name='username'
              disable={true}

            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.phone ? rowToEdit.phone : ''}
              label='Phone'
              name='phone'
              onChange={handleOnChangePhone}
              isRequire={true}
              error={errors.err_phone}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.firstName ? rowToEdit.firstName : ''}
              label='First Name'
              name='firstName'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_firstName}
            />
          </Grid>
          <Grid item xs={6} >
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.lastName ? rowToEdit.lastName : ''}
              label='Last Name'
              name='lastName'
              onChange={handleOnChangeNotEmpty}
              isRequire={true}
              error={errors.err_lastName}
            />

          </Grid>
          <Grid item xs={6}>
            <TextFieldBase
              defaultValue={rowToEdit && rowToEdit.roleNames ? rowToEdit.roleNames : ''}
              label='Roles'
              name='roles'
              onChange={handleOnChangeRoles}
              isRequire={true}
              error={errors.err_roles}
            />
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Button item onClick={handleSave}>Lưu</Button>
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

export default UserEditionModal