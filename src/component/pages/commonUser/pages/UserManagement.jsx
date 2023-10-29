import React, { useState } from 'react';
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

const UserManagement = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Pham Tien Dat',
            dateCreated: '27/10/2023',
            role: 'Teacher',
            isActive: true,
        },
        {
            id: 2,
            name: 'Nguyen Van A',
            dateCreated: '27/10/2023',
            role: 'Student',
            isActive: false,
        },
        {
            id: 3,
            name: 'Nguyen Van C',
            dateCreated: '27/10/2023',
            role: 'Enterprise',
            isActive: false,
        },
        {
            id: 4,
            name: 'Nguyen Van C',
            dateCreated: '27/10/2023',
            role: 'Student',
            isActive: false,
        },
        {
            id: 5,
            name: 'Nguyen Van C',
            dateCreated: '27/10/2023',
            role: 'Student',
            isActive: false,
        },
        {
            id: 6,
            name: 'Nguyen Van C',
            dateCreated: '27/10/2023',
            role: 'Student',
            isActive: false,
        },
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleToggle = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleStatusChange = () => {
        const updatedData = data.map((item) => {
            if (item.id === selectedId) {
                return { ...item, isActive: !item.isActive };
            }
            return item;
        });
        setData(updatedData);
        setOpenDialog(false);
    };

    const handleEdit = (id) => {
        // Xử lý sự kiện khi người dùng ấn nút Edit
    };

    return (
        <div style={{ backgroundColor: '#299be4', padding: '20px', margin: '20px 20px 0 20px', borderRadius: '3px' }}>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '10px' }}>
                <Grid item xs={5}>
                    <h2 style={{ color: 'white', margin: 0 }}>User Management</h2>
                </Grid>
                <Grid item xs={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<FolderIcon />}
                        style={{
                            color: 'white',
                            backgroundColor: '#0047b3',
                            marginRight: '10px',
                        }}
                    >
                        Export to Excel
                    </Button>
                    <Button startIcon={<AddIcon />} style={{ color: 'white', backgroundColor: '#0047b3' }}>
                        Add New User
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Date Created</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <img src={`/examples/images/avatar/${row.id}.jpg`} className="avatar" alt="" />
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.dateCreated}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.isActive}
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

export default UserManagement;
