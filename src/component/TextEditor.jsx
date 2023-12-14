import React, { useState } from 'react';
import { Box } from '@mui/material'
import ReactQuill from 'react-quill';
import '../component/css/customEditText.css'
import 'react-quill/dist/quill.snow.css';
const TextEditor = ({
  handleTextEditor
}) => {
  const [content, setContent] = useState('');
  const handleChange = (value) => {
    handleTextEditor(value);
    setContent(value);
  };
  return (
    <Box height='auto' width='90%' minHeight='0'>
      <ReactQuill
        theme='snow'
        value={content}
        onChange={handleChange}
        style={{ height: '100%', marginTop: '1%', fontSize: '20px' }} // Đặt chiều rộng cố định
        autoExpand={true} // Cho phép tự động mở rộng chiều cao
        placeholder='Nhập mô tả khóa học của bạn'
      />
    </Box>
  )
}

export default TextEditor