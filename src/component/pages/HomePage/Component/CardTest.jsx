import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ForumIcon from '@mui/icons-material/Forum';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
const CardTest = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card
      width="160px"
      height="240px"
      margin="8px"
      sx={{ maxWidth: 250 }}
    >
      <CardContent sx={{ ml: "10px", marginRight: "10px" }}>
        <Typography variant="h6" fontWeight="bold" mb="10px">
          {data.testName}
        </Typography>
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "5px"
          }}
        >
          <AccessTimeIcon fontSize='small' />
          <Typography variant="body1" color="textSecondary" ml="5px">
            {data.testDuration}
          </Typography>
        </Box>

        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "5px"
          }}
        >
          <ForumIcon fontSize='small' />
          <Typography variant="body1" color="textSecondary" ml="5px">
            Lượt bình luận
          </Typography>
        </Box>

        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "5px"
          }}
        >
          <PersonOutlineIcon fontSize='small' />
          <Typography variant="body1" color="textSecondary" ml="5px">
            Số người đã làm
          </Typography>
        </Box>

        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="textSecondary" ml="5px">
            {data.totalPart} Part | {data.testTotalQuestion} câu hỏi
          </Typography>
        </Box>
        {/* <Typography variant="body1" color="textSecondary">
            <AccessTimeIcon fontSize='small'/>
            Time|
            <ForumIcon fontSize='small' />
          </Typography> */}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          color="primary"
          size="large"
          children="Chi tiết"
          variant='outlined'
          onClick={() => navigate(`/TestDetail/${data.testId}`)}
        />
      </CardActions>
    </Card>
  )
}

export default CardTest