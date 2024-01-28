import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './../css/style.css'
import { useEffect } from "react";
import { FlashAuto } from "@mui/icons-material";


export default function AddFlashCard({
  isOpenAddFlashCardModal,
  handleCloseAddFlashCardModal,
  handleAddMultipleWords,
  doRefresh
}) {
  const initialRows = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    newWord: '',
    defination: '',
    example: '',
    note: '',
  }));
  const [rows, setRows] = useState(initialRows);
  useEffect(() => {
    console.log('rows', rows)
  }, [rows])
  const columns = React.useMemo(() => [
    {
      field: 'id', // Tên trường của cột không có tên
      headerName: '', // Tên hiển thị của cột không có tên (rỗng để không hiển thị)
      flex: 0.3,
      showCellVerticalBorder: true,
      showColumnRightBorder: true,
      filterable: false,
      sortable: false,
      cellClassName: 'unnamed-column', // Tên lớp để định dạng cột không có tên
      renderHeader: () => null, // Ẩn tiêu đề cột
      renderCell: (params) => <strong >{params.value}</strong>, // Nội dung của ô
    },
    {
      field: 'newWord',
      headerName: 'Từ mới',
      editable: true,
      flex: 1,
      showCellVerticalBorder: true,
      showColumnRightBorder: true,
      filterable: false,
      sortable: false,
      valueSetter: (params) => {
        let value = params.value; //<-- this contains the new value
        let oldValue = params.row.newWord;//<-- this contains the old value
        let id = params.row.id;
        if (value != oldValue) {
          const updatedRows = [...rows];
          const index = updatedRows.findIndex((row) => row.id === id);
          if (index !== -1) {
            updatedRows[index].newWord = value;
            setRows(updatedRows);
          }
        }
        return params.row
      }
    },
    {
      field: 'defination',
      headerName: 'Định nghĩa',
      editable: true,
      flex: 2,
      showCellVerticalBorder: true,
      showColumnRightBorder: true,
      filterable: false,
      sortable: false,
      valueSetter: (params) => {
        console.log(params)
        let value = params.value; //<-- this contains the new value
        let oldValue = params.row.defination;//<-- this contains the old value
        let id = params.row.id;
        if (value != oldValue) {
          const updatedRows = [...rows];
          const index = updatedRows.findIndex((row) => row.id === id);
          if (index !== -1) {
            updatedRows[index].defination = value;
            setRows(updatedRows);
          }
        }
        return params.row
      }
    },
    {
      field: 'example',
      headerName: 'Ví dụ',
      editable: true,
      flex: 2,
      showCellVerticalBorder: true,
      showColumnRightBorder: true,
      sortable: false,
      filterable: false,
      valueSetter: (params) => {
        console.log('params', params)
        let value = params.value; //<-- this contains the new value
        let oldValue = params.row.example;//<-- this contains the old value
        let id = params.row.id;
        if (value != oldValue) {
          const updatedRows = [...rows];
          const index = updatedRows.findIndex((row) => row.id === id);
          if (index !== -1) {
            updatedRows[index].example = value;
            setRows(updatedRows);
          }
        }
        return params.row
      }
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      editable: true,
      flex: 2,
      showCellVerticalBorder: true,
      showColumnRightBorder: true,
      filterable: false,
      sortable: false,
      valueSetter: (params) => {
        console.log('params', params)
        let value = params.value; //<-- this contains the new value
        let oldValue = params.row.note;//<-- this contains the old value
        let id = params.row.id;
        if (value != oldValue) {
          const updatedRows = [...rows];
          console.log('rows', rows)
          const index = updatedRows.findIndex((row) => row.id === id);
          console.log('index', index)
          if (index !== -1) {
            updatedRows[index].note = value;
            console.log('updatedRows', updatedRows)
            setRows(updatedRows);
          }
        }
        return params.row
      }
    },
  ], [rows]);



  const handleSave = () => {
    console.log(rows)
    var newRows = rows.filter((row) => row.newWord !== '' && row.defination !== '' && row.example !== '' && row.note !== '')
    const newData = newRows.map(item => {
      const newItem = { ...item };
      delete newItem.id;
      return newItem;
    });
    handleAddMultipleWords(newData)
  }
  const handleCellEditStop = React.useCallback(
    (event) => {
      // Handle cell edit stop here
      console.log(event);
      if (event.id === rows.length) {
        const updatedRows = [...rows];
        updatedRows.push({ id: rows.length + 1, newWord: '', defination: '', example: '', note: '' })
        console.log('updatedRows', updatedRows)
        setRows(updatedRows)
      }
    },
    [rows]
  );



  return (
    <Modal
      open={isOpenAddFlashCardModal}
      // onClose={handleCloseAddModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton sx={{ width: '20px', left: '99%', padding: '0px 8px' }} onClick={handleCloseAddFlashCardModal}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: '20px' }}>
          Thêm từ mới
        </Typography>
        <Box sx={{ height: 'auto', width: '100%', overflow: 'auto', maxHeight: '600px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onCellEditStop={handleCellEditStop}
            // onCellEditStop={(params, event) => {
            //   console.log(params)
            //   console.log(event)
            //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            //     event.defaultMuiPrevented = true;
            //   }
            // }}
            hideFooter
            autoHeight
            editMode="cell"
            showCellVerticalBorder={true}
            showColumnRightBorder={true}
            rowHeight={40}        // Chiều cao của các hàng dữ liệu
            headerHeight={60}
            headerClass
          />
        </Box>

        <Button variant="contained" color="primary" sx={{ mt: 2, width: '10%', ml: '90%' }} onClick={handleSave}>
          Lưu
        </Button>
      </Box>
    </Modal>
  );
}