import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { GetlistTest } from '../Services/HomepageService'
import { useState, useEffect } from "react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, InputAdornment, List, ListItem, ListItemText, Pagination, Tab, TextField, Typography } from "@mui/material";
import { Tabs } from "antd";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';


const Tests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [tests, setTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // useEffect(() => {
    //     const TestData = async () => {
    //         const data = await GetlistTest();
    //         console.log(data);
    //         setTests(data);
    //     };
    //     TestData();
    // }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const renderTests = () => {
        return (
            <List>
                {tests.slice((currentPage - 1) * 10, currentPage * 10).map((test) => (
                    <ListItem key={test.id}>
                        <ListItemText
                            primary={`${test.volume} - ${test.type} - ${test.number}`}
                            secondary={
                                `Thời gian: ${test.duration} | Số câu hỏi: ${test.question_count}`
                            }
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <>
            <Header />
            <div class="container" style={{ marginTop: "10%", marginLeft: '10%', minHeight: "100vh" }}>
                <div className="row" style={{ marginTop: "100px", marginBottom: "10px" }}>
                    <Typography variant="h4">Thư viện đề thi</Typography>
                </div>
                <Grid container spacing={11}>
                    <Grid item xs={8} sx={{ mt: "20px" }}>
                        <TextField
                            label="Tìm kiếm"
                            placeholder="Nhập từ khóa bạn muốn tìm kiếm (dạng câu hỏi): listening, reading, ..."
                            value={searchTerm}
                            onChange={handleSearch}
                            variant="outlined"
                            fullWidth={true}
                            sx={{ maxWidth: 700 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 370 }}>
                            <CardHeader
                                avatar={
                                    // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    //     V
                                    // </Avatar>
                                    <Avatar src='https://source.unsplash.com/400x400/?avatar?11' />
                                }
                                title='Username here'
                                subheader='Email here'

                            />
                            <Divider variant="middle" sx={{ borderColor: 'black', borderBottomWidth: 1 }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Thống kê
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Bạn có thể kiểm tra quá trình học của mình bằng cách xem thông tin phân tích bên dưới
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    color="primary"
                                    size="large"
                                    children="Thống kê kết quả"
                                    startIcon={<AutoGraphIcon />}
                                />
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        {tests.length > 0 ? renderTests() : <h3>Không có bài kiểm tra nào phù hợp</h3>}
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs
                            value={currentPage}
                            onChange={handlePageChange}
                            indicatorColor="primary"
                            labelColor="primary"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                                <Tab key={page} label={`Trang ${page}`} />
                            ))}
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <Pagination
                            count={totalPages}
                            color="primary"
                            showNextButton
                            showPreviousButton
                        />
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    );
}
export default Tests;