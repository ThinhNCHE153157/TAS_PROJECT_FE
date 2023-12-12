import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ClassEditionModal from './ClassEditionModal';
import { useState } from 'react';

export default function ClassListComponent({
  id,
  url,
  className,
  maxStudentInClass,
  teacher,
  description
}) {

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  return (
    <Card sx={{
      maxWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <CardMedia
        sx={{ height: 200, width: 'auto' }}
        image={url}
        title={className}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {className}
        </Typography>
        <ul>
          <li>
            <b>Number of Student: </b> {maxStudentInClass}
          </li>
          <li>
            <b>Lecture: </b> {teacher}
          </li>
        </ul>
        <Typography variant="body1" color="text.secondary">

          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/Admin/ClassList/Detail/${id}`}>
          <Button variant='outlined' sx={{ marginLeft: 'auto' }}>Detail</Button>
        </Link>
        <Button variant='contained' onClick={() => setIsOpenEditModal(true)} sx={{ marginLeft: 2 }}>Edit</Button>
      </CardActions>

      <ClassEditionModal
        open={isOpenEditModal}
        onClose={() => {
          setIsOpenEditModal(false);
        }}
      />

    </Card>
  );
}