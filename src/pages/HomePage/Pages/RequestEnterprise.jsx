import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../layout/Header'
import Footer from '../../../layout/Footer'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddEnterprise } from '../../../Services/ManageEnterprise'
import { alertError, alertSuccess } from '../../../component/AlertComponent'
import { ToastContainer } from 'react-toastify'

const RequestEnterprise = () => {
  const accountId = useSelector((state) => state.user?.User?.accountId);
  const [error, setError] = useState('')
  const [response, setResponse] = useState({})
  const handleOnChange = (event) => {
    const { name, value } = event.target
    setResponse({ ...response, [name]: value })
  }
  const checkValidate = (response) => {
    var isEmpty = false
    for (const key in response) {
      if (response[key] === '') {
        isEmpty = true
        break
      }
    }
    if (isEmpty) {
      setError('*Vui lòng điền đầy đủ thông tin')
      return false
    }

    return true
  }
  const submit = () => {
    response.accountId = accountId
    console.log('response: ', response)
    const isValid = checkValidate(response)
    if (isValid) {
      AddEnterprise(response).then((res) => {
        console.log(res)
        setError('')
        alertSuccess({ message: 'Đăng kí thành công' })
      }).catch((err) => {
        console.log(err)
        alertError({ message: 'Đăng kí thất bại' })
      })
    }
  }
  return (
    <Box>
      <ToastContainer />
      <Header />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        minHeight='0'
        width='100%'
      >
        <Box
          width='1000px'
          minHeight='0'
          mt='3%'
          display='flex'
          justifyContent='center'
          alignItems='flex-start' // Căn lề Typography sang bên trái
          flexDirection='column'
        >
          <Typography fontSize='36px' fontWeight='500' mt='3%'>
            Đăng kí tài khoản doanh nghiệp
          </Typography>
          <Typography fontSize='18px' mt='1%' fontStyle='italic'>
            Khi trở thành tài khoản doanh nghiệp, bạn sẽ có thể tạo
            các khóa học và quản lý các khóa học của mình.
          </Typography>
        </Box>

        <Box
          minHeight='0'
          display='flex'
          width='1000px'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mt='3%'
          bgcolor='#ffefd8'
          border='1px solid #dbc7a9'
          borderRadius='7px'
        >
          <Typography fontSize='18px' m='2%' color='#855a1f'>
            Chú ý: Bạn cần điền đầy đủ thông tin để chúng tôi có thể xác nhận
          </Typography>
        </Box>
        <Box
          width='1000px'
          minHeight='0'
          mt='3%'
          display='flex'
          justifyContent='center'
          alignItems='flex-start' // Căn lề Typography sang bên trái
          flexDirection='column'
        >
          <Typography fontSize='18px' mt='1%' fontStyle='italic'>
            {error}
          </Typography>
        </Box>
        <Box
          minHeight='0'
          display='flex'
          width='1000px'
          justifyContent='space-between'
          height='500px'
          mt='3%'
          border='1px solid #dbc7a9'
        >
          <Box
            width='44%'
            display='flex'
            flexDirection='column'
            ml='2%'
          >
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Mã số doanh nghiệp
            </Typography>
            <TextField
              name='enterpriseCode'
              onChange={handleOnChange}
              value={response.enterpriseCode}
            />
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Tên doanh nghiệp viết bằng tiếng nước ngoài
            </Typography>
            <TextField
              name='enterpriseName'
              onChange={handleOnChange}
              value={response.enterpriseName}
            />
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Mã số doanh nghiệp
            </Typography>
            <TextField />
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Địa chỉ trụ sở chính
            </Typography>
            <TextField
              name='officeAddress'
              onChange={handleOnChange}
              value={response.officeAddress}
            />
          </Box>
          <Box
            width='45%'
            display='flex'
            flexDirection='column'
            mr='2%'
          >
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Tên doanh nghiệp
            </Typography>
            <TextField
              name='foreignName'
              onChange={handleOnChange}
              value={response.foreignName}
            />
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Tên viết tắt của doanh  nghiệp
            </Typography>
            <TextField
              name='shortName'
              onChange={handleOnChange}
              value={response.shortName}
            />
            <Typography fontSize='18px' m='2%' color='#855a1f'>
              Người đại diện theo pháp luật
            </Typography>
            <TextField
              name='representativeName'
              onChange={handleOnChange}
              value={response.legalRepresentative}
            />
          </Box>
          <Button
            sx={{
              position: 'absolute',
              bottom: '3%',
              right: '46%',
              width: '150px',
            }}
            onClick={submit}
            variant='outlined'
          >
            <Typography fontSize='18px' m='2%'>
              Đăng kí
            </Typography>
          </Button>
        </Box>
        <Box
          width='800px'
          minHeight='0'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mt='10px'
        >

        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default RequestEnterprise