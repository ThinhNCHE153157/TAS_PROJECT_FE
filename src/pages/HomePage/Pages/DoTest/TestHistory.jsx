import { Box, Typography, Card, CardContent } from '@mui/material'
import React from 'react'
import Header from '../../../../layout/Header'

const TestHistory = () => {
  // Giả sử dữ liệu lịch sử kiểm tra
  const testHistoryData = [
    { testName: 'Test 1', score: 85, date: '2022-01-01' },
    { testName: 'Test 2', score: 90, date: '2022-01-15' },
    { testName: 'Test 3', score: 88, date: '2022-02-01' },
    // Thêm thêm dữ liệu tương tự ở đây...
  ];

  return (
    <Box
      backgroundColor='#f3f6f9'
      minHeight='0'
      display='flex'
      flexDirection='column'
    >
      <Header />
      <Typography fontSize='30px' fontWeight='bold' m='0 auto' marginTop='5%'>
        Các bài thi đã làm
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
        {testHistoryData.map((test, index) => (
          <Card key={index} sx={{ width: '80%', marginBottom: '2%' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {test.testName}
              </Typography>
              <Typography variant="body2">
                Điểm: {test.score}
              </Typography>
              <Typography variant="body2">
                Ngày: {test.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default TestHistory