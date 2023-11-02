import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import ClassListComponent from './ClassListComponent'
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClassAddModal from './ClassAddModal'

const data = [
  {
    class_id: '1',
    url: 'https://source.unsplash.com/400x400/?portrait?1',
    className: 'Class Name 1',
    NumOfStudents: 'NumOfStudents 1',
    lecturer: 'Lecturer 1',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '2',
    url: 'https://source.unsplash.com/400x400/?portrait?2',
    className: 'Class Name 2',
    NumOfStudents: 'NumOfStudents 2',
    lecturer: 'Lecturer 2',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '3',
    url: 'https://source.unsplash.com/400x400/?portrait?3',
    className: 'Class Name 3',
    NumOfStudents: 'NumOfStudents 3',
    lecturer: 'Lecturer 3',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '4',
    url: 'https://source.unsplash.com/400x400/?portrait?4',
    className: 'Class Name 4',
    NumOfStudents: 'NumOfStudents 4',
    lecturer: 'Lecturer 4',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '5',
    url: 'https://source.unsplash.com/400x400/?portrait?5',
    className: 'Class Name 5',
    NumOfStudents: 'NumOfStudents 5',
    lecturer: 'Lecturer 5',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '6',
    url: 'https://source.unsplash.com/400x400/?portrait?6',
    className: 'Class Name 6',
    NumOfStudents: 'NumOfStudents 6',
    lecturer: 'Lecturer 6',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '7',
    url: 'https://source.unsplash.com/400x400/?portrait?7',
    className: 'Class Name 7',
    NumOfStudents: 'NumOfStudents 7',
    lecturer: 'Lecturer 7',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '8',
    url: 'https://source.unsplash.com/400x400/?portrait?8',
    className: 'Class Name 8',
    NumOfStudents: 'NumOfStudents 8',
    lecturer: 'Lecturer 8',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
  {
    class_id: '9',
    url: 'https://source.unsplash.com/400x400/?portrait?9',
    className: 'Class Name 9',
    NumOfStudents: 'NumOfStudents 9',
    lecturer: 'Lecturer 9',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
  },
];

const forRows = data.map(item => {
  const { class_id, ...otherFields } = item;
  return {
    ...otherFields,
    class_id: class_id,
    id: class_id
  };
});
const ClassList = () => {
  const [rows, setRows] = useState(forRows);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errors, setErrors] = useState({})
  const [newRow, setNewRows] = useState({});
  const onClose = () => {
    setIsAddModalOpen(false);
    setErrors({});
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onChange = (e) => {
    console.log(e)
    setNewRows(prev => ({ ...prev, ...e }));
  }
  const onChangeErrors = (e) => {
    console.log(e)
    const err = { ...errors, ...e }
    setErrors(err)
  }

  const handleSubmit = () => {
    console.log(newRow)
    if (newRow.className && newRow.numOfStudents && newRow.lecturer && newRow.description) {
      console.log('addData', newRow)
      const class_id_max = Math.max(...data.map(item => item.class_id)) + 1;
      const temp = { ...newRow, 'id': class_id_max, 'class_id': class_id_max, 'url': `https://source.unsplash.com/400x400/?portrait?${class_id_max}` }
      const updateRows = [...rows]
      updateRows.push(temp)
      setRows(updateRows)
      setNewRows({})
      onClose();
      console.log('errors: ', errors)
    } else {
      let err_temp = {};
      err_temp = !newRow.className ? { ...err_temp, ...{ 'err_className': 'You need to field this field' } } : err_temp
      err_temp = !newRow.numOfStudents ? { ...err_temp, ...{ 'err_numOfStudents': 'You need to field this field' } } : err_temp
      err_temp = !newRow.lecturer ? { ...err_temp, ...{ 'err_lecturer': 'You need to field this field' } } : err_temp
      err_temp = !newRow.description ? { ...err_temp, ...{ 'err_description': 'You need to field this field' } } : err_temp
      console.log("err_temp", err_temp)
      setErrors(err_temp);
    }
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3, m: 2 }}>

          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Class Manager
          </Typography>

          <Box sx={{ height: 50 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
            <Box sx={{ flexGrow: 1, ml: 2 }}>
              {/* Thanh Search ở góc bên trái */}
              <TextField
                label="Search"
                variant="outlined"
                placeholder='Class name'
                fullWidth
                sx={{ maxWidth: 400 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ mr: 2 }}>
              {/* Nút Add ở góc bên phải */}
              <Button
                color="primary"
                cursor="pointer"
                size='Large'
                variant="outlined"

                onClick={() => {
                  setIsAddModalOpen(true);
                }}
              >
                <AddCircleOutlineIcon />
                <Typography variant="body" sx={{ marginLeft: 1 }}>
                  ADD COURSE
                </Typography>
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {rows.map(item => (
              <Grid item xs={3} key={item.id}>
                <ClassListComponent
                  id={item.id}
                  className={item.className}
                  NumOfStudents={item.NumOfStudents}
                  description={item.description}
                  lecturer={item.lecturer}
                  url={item.url} />
              </Grid>
            ))}

          </Grid>
          {/* Add modal */}
          <ClassAddModal
            open={isAddModalOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onChangeErrors={onChangeErrors}
            errors={errors}
            onChange={onChange}
          />
        </Box>
      </Box>
    </div >
  )
}

export default ClassList