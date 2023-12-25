import { Box, Container, Pagination } from '@mui/material'
import React from 'react'

const Paging = () => {
  return (
    <Container component={Box} py={3} >
      <Pagination
        count={10}
        color='primary'
        variant='outlined'
        size='medium'
        showFirstButton
        showLastButton
      />

    </Container>
  )
}

export default Paging