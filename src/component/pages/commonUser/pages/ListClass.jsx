import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/AddBox';
import { Link } from '@mui/icons-material';

const ListClass = () => {
    // Sử dụng useState để tạo một state cho danh sách lớp học
    const [classList, setClassList] = useState([]);

    // Hàm này được sử dụng để thêm lớp học vào danh sách
    const addClass = (className) => {
        setClassList([...classList, className]);
    };

    const [data, setData] = useState([]);
    const [listaccount, setListAccount] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const requestUrl = 'https://localhost:5000/api/';

            try {
                const response = await fetch(requestUrl);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        fetchData();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const formatCreateDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleStatusChange = () => {
        const updatedRowStatus = { ...rowStatus };
        updatedRowStatus[selectedId] = !rowStatus[selectedId];
        setRowStatus(updatedRowStatus);
        setOpenDialog(false);
    };
    const handleToggle = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [rowStatus, setRowStatus] = useState({});

    const handleEdit = (id) => {
        // Xử lý sự kiện khi người dùng ấn nút Edit
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ backgroundColor: '#299be4', padding: '20px', margin: '20px 20px 0 20px', borderRadius: '3px' }}>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '10px' }}>
                <Grid item xs={5}>
                    <h2 style={{ color: 'white', margin: 0 }}>Class List</h2>
                </Grid>
                <Grid item xs={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<FolderIcon />}
                        style={{
                            color: 'white',
                            backgroundColor: '#0047b3',
                            marginRight: '10px',
                        }}
                        // onClick={handleExportToExcel} //Add an onClick handler
                    >
                        Export to Excel
                    </Button>
                    <Button
                        startIcon={<AddIcon />}
                        href="/commonUser/CreateClass"
                        style={{ color: 'white', backgroundColor: '#0047b3' }}
                    >
                        Add New Class
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Class Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Class ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Start Time</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>End Time</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Creator</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.accountId}>
                                <TableCell>{row.accountId}</TableCell>
                                <TableCell>
                                    <img src={`/examples/images/avatar/${row.id}.jpg`} className="avatar" alt="" />
                                    {row.username}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{formatCreateDate(row.createDate)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Switch
                                        checked={!row.isActive}
                                        onChange={() => handleToggle(row.id)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(row.id)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Status Change</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to change the status?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStatusChange} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListClass;
