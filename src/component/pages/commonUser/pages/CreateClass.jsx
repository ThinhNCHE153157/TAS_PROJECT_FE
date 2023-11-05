import React, { useState } from 'react';
import { Typography, Grid, TextField, TextareaAutosize, Button, Paper } from '@mui/material';

const CreateClass = () => {
    const [className, setClassName] = useState('');
    const [classDescription, setClassDescription] = useState('');
    const [classCode, setClassCode] = useState('');
    const [subject, setSubject] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleClassNameChange = (e) => {
        setClassName(e.target.value);
    };

    const handleClassDescriptionChange = (e) => {
        setClassDescription(e.target.value);
    };

    const handleClassCodeChange = (e) => {
        setClassCode(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handleCreateClass = () => {
        // Thực hiện logic để tạo lớp mới và gửi thông tin lớp lên máy chủ ở đây
    };

    return (
        <div>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>
                Create a New Class
            </Typography>
            <Grid container spacing={2} style={{ padding: '20px 20px 0 20px' }}>
                <Grid item xs={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <TextField
                            label="Class Name"
                            fullWidth
                            value={className}
                            onChange={handleClassNameChange}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Class Code"
                            fullWidth
                            value={classCode}
                            onChange={handleClassCodeChange}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Subject"
                            fullWidth
                            value={subject}
                            onChange={handleSubjectChange}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Start Time"
                            type="time"
                            fullWidth
                            value={startTime}
                            onChange={handleStartTimeChange}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="End Time"
                            type="time"
                            fullWidth
                            value={endTime}
                            onChange={handleEndTimeChange}
                            variant="outlined"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <TextField
                            label="Creator"
                            fullWidth
                            value="Tên người tạo"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            label="Date created"
                            fullWidth
                            value="Ngày tạo"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            value={classDescription}
                            onChange={handleClassDescriptionChange}
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleCreateClass}>
                        Create Class
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default CreateClass;
