import { Box, Typography } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({
  url,
  title
}) => {
  return (
    <div>
      <Box mt="2%" ml='3% ' alignContent='center'>
        <Typography variant='h6'>{title}</Typography>
        <ReactPlayer
          url={url} // Replace with your video URL
          controls={true} // Show video controls
          width="85%" // Set the width of the player
          height="70vh" // Set the height of the player
        />
      </Box>

    </div>
  )
}

export default VideoPlayer