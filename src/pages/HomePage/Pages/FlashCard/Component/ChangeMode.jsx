import { Box, Button, Collapse, Divider, Modal, Switch, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './../css/changeMode.css'
import { useState } from 'react';
const ChangeMode = ({
  isOpenChangeMode = true,
  handleCloseChangeMode,
  handleChangeMode,
  checkedMode,
}) => {
  const [isShowCollapse, setIsShowCollapse] = useState(false)
  const [isCheckedMode, setIsCheckedMode] = useState(checkedMode);
  const handleChange = (mode) => {
    const index = isCheckedMode.indexOf(mode);
    const newChecked = [...isCheckedMode];
    if (index === -1) {
      newChecked.push(mode);
    } else {
      newChecked.splice(index, 1);
    }
    console.log('newChecked', newChecked)
    setIsCheckedMode(newChecked);
  };
  const onClose = () => {
    handleChangeMode(isCheckedMode)
    handleCloseChangeMode()
  }
  return (
    <Modal
      open={isOpenChangeMode}
      onClose={handleCloseChangeMode}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '45%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <CloseIcon
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer'
            }}
            onClick={() => onClose()}
          />
          <Typography fontSize='32px' fontWeight={500}>
            Tùy chọn
          </Typography>
          <Box display='flex' mt='4%'>
            <Box width='93%' display='flex' flexDirection='column'>
              <Typography fontSize='18px' fontWeight='bold'>
                Học lại thuật ngữ đã thuộc
              </Typography>
              <Typography fontSize='18px' mt='1%'>
                Tính năng này giúp bạn học lại những từ đã thuộc để củng cố lại kiến thức, có thể kiến thức đã học nhưng vẫn cần thiết cho bạn để học.
              </Typography>

            </Box>
            <Switch
              checked={isCheckedMode.includes(0)}
              onChange={() => handleChange(0)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>

          <Box display='flex' mt='3%'>
            <Box width='93%' display='flex' flexDirection='column'>
              <Typography fontSize='18px' fontWeight='bold'>
                Học những thuật ngữ chưa thuộc
              </Typography>
              <Typography fontSize='18px' mt='1%'>
                Học những từ chưa thuộc giúp bạn có thể học những từ mới, những từ chưa thuộc để có thể nâng cao vốn từ vựng của mình.
              </Typography>

            </Box>
            <Switch
              checked={isCheckedMode.includes(1)}
              onChange={() => handleChange(1)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>

          <Box display='flex' mt='3%'>
            <Box width='93%' display='flex' flexDirection='column'>
              <Typography fontSize='18px' fontWeight='bold'>
                Học thuật ngữ có gắn sao
              </Typography>
              <Typography fontSize='18px' mt='1%'>
                Bạn có thể gắn sao các thuật ngữ bạn cho là quan trọng để có thể học lại sau này. Tính năng này giúp bạn có thể học lại những từ đã gắn sao.
              </Typography>

            </Box>
            <Switch
              checked={isCheckedMode.includes(2)}
              onChange={() => handleChange(2)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>

        </Box>
        <Box width='100%' borderTop='1px solid black' mt='3%' display='flex' flexDirection='column' >
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography fontSize='18px' fontWeight='bold' >
              Phím tắt bàn phím
            </Typography>
            <Button
              endIcon={isShowCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                fontSize: '18px',
                textTransform: 'none',
              }}
              onClick={() => setIsShowCollapse(!isShowCollapse)}
            >
              {isShowCollapse ? 'Ẩn' : 'Hiện'}
            </Button>
          </Box>
          <Collapse in={isShowCollapse} timeout="auto" unmountOnExit>
            <Box mt='2%' ml='2%'>
              <Box display='flex' justifyContent='space-between' borderBottom='1px solid black' paddingBottom='10px'>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Trước</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>←</kbd>
                </Box>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Tiếp theo</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>→</kbd>
                </Box>
              </Box>

              <Box display='flex' justifyContent='space-between' borderBottom='1px solid black' paddingBottom='10px' mt='10px'>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Lật thẻ</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>↑</kbd>
                </Box>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Lật thẻ</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>→</kbd>
                </Box>
              </Box>

              <Box display='flex' justifyContent='space-between' borderBottom='1px solid black' paddingBottom='10px' mt='10px'>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Gắn sao</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>s</kbd>
                </Box>
                <Box width='48%' display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography fontSize='18px' >Đã thuộc</Typography>
                  <kbd className='UIKeyboardInput' style={{
                    fontSize: '18px',
                    width: '40px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>d</kbd>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>

    </Modal >
  )
}

export default ChangeMode