import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { GetlistTest } from '../../../Services/HomepageService'
import { useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';
import CardTest from "../Component/CardTest";

const testArray = [];
for (let i = 0; i < 20; i++) {
    const id = i + 1;
    const name = `test ${i}`;
    const time = new Date();

    testArray.push({
        id,
        name,
        time,
    });
}



const Tests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // const [tests, setTests] = useState([]);
    const [tests, setTests] = useState(testArray);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const [testOnPage, setTestOnPage] = useState([]);


    useEffect(() => {
        const TestData = async () => {
            const data = await GetlistTest();
            console.log(data);
            setTests(data);
            setTotalPage(Math.ceil(data.length / 12))
            setTestOnPage(data.slice(0, 12))
        };
        TestData();
    }, []);
    // useEffect(() => {
    //     setTotalPage(Math.ceil(tests.length / 12))
    //     setTestOnPage(tests.slice(0, 12))
    // }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (event, value) => {
        //0 -> 12; 12(page -1) -> 12*page-1
        var start = 12 * (value - 1)
        var end = 12 * value
        var temp = value < totalPage ? tests.slice(start, end) : tests.slice(start)
        console.log(temp)
        setTestOnPage(temp)
        setPage(value);
    };

    const renderTests = () => {
        return (
            <Grid container rowGap={3}>
                {
                    testOnPage.map(item => {
                        console.log(item)
                        return (
                            <Grid item xs={4} key={item.testId}>
                                <CardTest data={item} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        );
    };

    return (
        <>
            <Header />
            <Box
                sx={{
                    position: 'relative',
                    width: '100vw',
                    height: '50vh',
                    backgroundColor: '#f3f6f9',
                }}
            >
                <Grid container position='absolute' marginLeft='15%' marginTop="8%" width='70vw'>
                    <Grid item xs={10}>
                        <Typography variant="h4">Thư viện đề thi</Typography>
                    </Grid>
                    {/* <Grid item container xs */}
                    <Grid item xs={8} sx={{ mt: "20px" }}>
                        <TextField
                            label="Tìm kiếm"
                            placeholder="Nhập từ khóa bạn muốn tìm kiếm (dạng câu hỏi): listening, reading, ..."
                            value={searchTerm}
                            onChange={handleSearch}
                            variant="outlined"
                            fullWidth={true}
                            sx={{ maxWidth: 820 }}
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
                </Grid>
            </Box >
            <div className="container" style={{ marginTop: "3%", marginLeft: '15%', minHeight: "100vh" }}>
                <Grid container>
                    <Grid item xs={8}>
                        {tests.length > 0 ? renderTests() : <h3>Không có bài kiểm tra nào phù hợp</h3>}
                    </Grid>
                    <Grid item xs={12} mt={4} >
                        <Pagination
                            count={totalPage}
                            color='primary'
                            variant='outlined'
                            size='medium'
                            // defaultPage={page}
                            showFirstButton
                            showLastButton
                            onChange={handlePageChange}
                        />
                    </Grid>
                </Grid>
            </div >
            <Footer />
        </>
    );
}
export default Tests;