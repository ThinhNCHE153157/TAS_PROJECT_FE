import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
// const props = {
//   name: 'file',
//   multiple: true,
//   // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };
const UploadFile = () => {
  const checkFile = (file) => {
    // const isMp4 = file.type === 'video/mp4';
    const isLt50M = file.size / 1024 / 1024 < 50;

    // if (!isMp4) {
    //   message.error('Chỉ hỗ trợ tệp tin MP4!');
    // }

    if (!isLt50M) {
      message.error('Tệp tin phải nhỏ hơn 50MB!');
    }

    // return isMp4 && isLt50M;
    return isLt50M;
  };

  const handleChange = info => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Dragger
      action={"http://localhost:3000"}
      beforeUpload={checkFile}
      onChange={handleChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag video to this area to upload</p>
      {/* <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p> */}
    </Dragger>
  )
};
export default UploadFile;