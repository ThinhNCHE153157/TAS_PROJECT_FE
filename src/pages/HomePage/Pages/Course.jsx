import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Banner from "../Component/Banner";
import { AppBar, Avatar, AvatarGroup, Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Grid, Tab, Tabs, TextField, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { format, set } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { ToastContainer } from "react-toastify";
import { GetCourseById } from "../../../Services/HomepageService";
import OrderCourse from "../Component/OrderCourse";
import { useSelector } from "react-redux";
import { API } from '../../../component/callApi'

const Course = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [tabValue, setTabValue] = useState(0)
    const contentRefs = [useRef(), useRef(), useRef(), useRef()]; // Mỗi ref tương ứng với một tab
    const [course, setCourse] = useState({ discount: 20, courseCost: 100000000 })
    const maxTeacher = 2;
    const [teachers, setTeachet] = useState(['Alice', 'Jayce', 'Annie', 'Mobby']);
    const [expandTopic, setExpandTopic] = useState([]);
    const handleTopicExpand = (topicId) => {
        setExpandTopic((prevExpandedTopics) => {
            if (prevExpandedTopics.includes(topicId)) {
                return prevExpandedTopics.filter((id) => id !== topicId);
            } else {
                return [...prevExpandedTopics, topicId];
            }
        });
    }
    const smoothScroll = (targetRef) => {
        const targetElement = targetRef.current;
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            const run = easeInOutQuad(timeElapsed, startPosition, distance, 500);
            window.scrollTo(0, run);

            if (timeElapsed < 500) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    const formatCurrency = (amount) => {
        return amount?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    }
    useEffect(() => {
        // Di chuyển đến vùng nội dung của tab khi tab thay đổi
        if (contentRefs[tabValue].current) {
            smoothScroll(contentRefs[tabValue]);
        }
    }, [tabValue]);

    const [courses, setCourses] = useState({})
    useEffect(() => {
        GetCourseById(id).then((res) => {
            setCourses(res)
            console.log(res)
            setPrice(res?.courseCost - res?.courseCost * res?.discount / 100)
            setDescription(`Mua Khoá Học ${user?.accountId} ${res?.courseId}`)
        })
    }
        , [id])


    const user = useSelector((state) => state.user?.User);
    const [orderType, setOrderType] = useState('Mua Khoá Học');
    const [customerName, setCustomerName] = useState(`${user?.firstName} ${user?.lastName}`);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleOrderSubmit = () => {
        // You can perform any logic with the form values here
        console.log('Submitting Order:', user.accountId)
        console.log('Order Submitted:', user.accountId, {
            orderType,
            customerName,
            price,
            description,
        });
        API.post(`/Payment/CreatePaymentUrl`,
            JSON.stringify({
                OrderType: orderType,
                Name: customerName,
                Amount: price,
                OrderDescription: description,
            }),
        )
            .then((res) => {
                console.log(res);
                window.location.href = res.data.paymentUrl;
            });
        handleCloseOrderForm();
    };
    const [openOrderForm, setOpenOrderForm] = useState(false);
    const handleOpenOrderForm = () => {
        setOpenOrderForm(true);
    };

    const handleCloseOrderForm = () => {
        setOpenOrderForm(false);
    };


    return (
        <>
            <Header />
            <Box width='100%' height='400px'></Box>
            <div ref={contentRefs[0]} class="container-fluid" style={{ marginTop: "-480px" }}>
                <div className="row" style={{ marginTop: "80px", marginBottom: "10px" }}>
                    <div className="col-12" style={{ padding: 0 }}>
                        <Banner />
                    </div>
                </div>
            </div>
            <div class="container-fluid" style={{ minHeight: "auto", width: '80%', padding: "0", marginLeft: '8%' }}>
                <AppBar
                    sx={{
                        backgroundColor: "white",
                        color: "black",
                        width: '55%',
                        boxShadow: 'none',
                        borderBottom: '2px solid #ecedda',
                    }}
                    position="static">
                    <Toolbar sx={{
                        // justifyContent: 'center',
                    }}>
                        <div>
                            <Tabs
                                value={tabValue}
                                onChange={(event, newValue) => setTabValue(newValue)}
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '16px'
                                    },
                                }}
                            >
                                <Tab value={1} label={<Typography fontSize='22px'>Thông tin khóa học </Typography>} id="tab-1" />
                                <Tab value={2} label={<Typography fontSize='22px'>Mục tiêu khóa học </Typography>} id="tab-2" />
                                <Tab value={3} label={<Typography fontSize='22px'>Chương trình học</Typography>} id="tab-3" />
                            </Tabs>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Box minWidth='0' mt='30px' display='flex' flexDirection='column'>
                {/* Nội dung của tab */}
                <div ref={contentRefs[1]} style={{ backgroundColor: "#e9eaf5", minHeight: '0', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box width='55%' height='100%' ml='8%'>
                        <Typography fontSize='40px' fontWeight='500'>
                            {courses.courseName}
                        </Typography>
                        <Typography mt='2%' fontSize='22px'>
                            {courses.shortDescription}
                        </Typography>
                        <Box mt='2%' display='flex' alignItems='center'>
                            <Avatar src="https://source.unsplash.com/400x400?avatar?1" />
                            <Typography fontSize='22px' ml='6px'>
                                Tên giảng viên:
                            </Typography>
                            <Button variant="text" sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}>
                                <Typography
                                    fontSize='22px'
                                    color="textSecondary"
                                    ml='6px'
                                    sx={{
                                        textDecorationLine: 'underline',
                                        display: 'inline-block'
                                    }}
                                >
                                    Tên giảng viên
                                </Typography>
                            </Button>
                        </Box>

                        {/* <Box mt='2%' display='flex' alignItems='center'>
                            <AvatarGroup max={3}>
                                <Avatar src="https://source.unsplash.com/400x400?avatar?1" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?2" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?3" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?4" />
                            </AvatarGroup>
                            {renderTeacher(teachers, maxTeacher)}
                        </Box> */}
                        <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
                            <DialogTitle>Hoá đơn</DialogTitle>
                            <DialogContent>
                                <TextField
                                    label="Loại đơn hàng"
                                    fullWidth
                                    margin="normal"
                                    disabled
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                />
                                <TextField
                                    label="Tên khách hàng"
                                    fullWidth
                                    margin="normal"
                                    disabled
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <TextField
                                    label="Đơn giá"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    disabled
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <TextField
                                    label="Nội dung"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={3}
                                    disabled
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
                                    Xác nhận
                                </Button>
                                <Button variant="contained" onClick={handleCloseOrderForm}>
                                    Đóng
                                </Button>
                            </DialogContent>
                        </Dialog>
                        <Button variant="contained" sx={{ mt: '5%', textTransform: 'none', width: '180px' }} onClick={handleOpenOrderForm}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography width='100%' fontSize='20px' fontWeight='bold'>Enroll</Typography>
                                <Typography fontSize='22px'>Starts {format(new Date(), 'MMM dd')}</Typography>
                            </div>
                        </Button>
                        <Typography mt='3%' fontSize='15px' color='textSecondary'>Sponsored by 'Enterprise Name'</Typography>
                        <Box display='flex' mt='3%'>
                            <Typography fontSize='18px' fontWeight='bold' mr='5px'>50</Typography>
                            <Typography fontSize='18px'>already enrolled</Typography>
                        </Box>
                        <Box width='100%' padding='20px'></Box>
                    </Box>

                    <Card elevation={6} sx={{ mt: '1%', width: '18%', marginRight: '10%', borderRadius: '10px', height: '450px' }}>
                        <CardMedia
                            component="img"
                            height="160px"
                            image='https://source.unsplash.com/400x400?avatar?1'
                            alt={'title image'}
                        />
                        <CardContent>
                            <Typography fontSize='24px' fontWeight={500} component="div">
                                {courses.courseName}
                            </Typography>
                            <Typography fontSize='20px' color="text.secondary">
                                {courses.shortDescription}
                            </Typography>
                            <Divider sx={{ bgcolor: 'black', mt: '1%' }} />
                            <Typography fontSize='20px' mt='3%'>
                                {(courses.courseLevel === 1) ? 'Sơ cấp' : (courses.courseLevel === 2) ? 'Trung cấp' : 'Cao cấp'}
                            </Typography>
                            <Box display='flex' mt='1%' >
                                {
                                    courses.discount ? (
                                        <>
                                            <Typography fontSize='22px' fontWeight='bold' mr='8px'>
                                                Giá tiền:
                                            </Typography>
                                            <Typography fontSize='22px' fontWeight='bold' color='red' mr='10px'>
                                                {formatCurrency(courses.courseCost * (100 - courses.discount) / 100)}
                                            </Typography>
                                            <Typography fontSize='22px' color='textSecondary' style={{ textDecoration: 'line-through' }} >
                                                {formatCurrency(courses.courseCost)}
                                            </Typography>
                                        </>

                                    ) : (
                                        <Typography fontSize='22px' fontWeight='bold'>
                                            Giá tiền: {formatCurrency(courses.courseCost)}
                                        </Typography>
                                    )
                                }
                            </Box>
                            {
                                courses.discount ? (
                                    <Typography fontSize='16px' fontWeight='bold' color='red'>
                                        (Giảm giá: {courses.discount}%)
                                    </Typography>
                                ) : (
                                    ''
                                )
                            }
                            <Box mt='10%' display='flex' justifyContent='right'>
                                <Button variant="contained" sx={{ textTransform: 'none', }}>
                                    <Typography fontSize='22px'>
                                        Mua khóa học
                                    </Typography>
                                </Button>
                            </Box>


                        </CardContent>
                    </Card >
                </div>
                <div
                    ref={contentRefs[2]}
                    style={{
                        // backgroundColor: "#bdeaf0",
                        width: '100%'
                    }}
                >
                    <Box maxWidth='100vw' height='100%' ml='8%' display='flex' flexDirection='column'>
                        <Box width='50%' height='100%'>
                            <Box display='flex' width='100%' alignItems='center'>
                                <CardMembershipIcon sx={{ fontSize: "40px", color: '#4070ad' }} />
                                <Typography color='#4070ad' fontSize='32px' fontWeight='bold' mt='2%' mb='2%' ml='1%'>
                                    Mục tiêu khóa học
                                </Typography>
                            </Box>
                            <div
                                style={{
                                    fontSize: '22px',
                                    lineHeight: '1.5',
                                }}
                                dangerouslySetInnerHTML={{ __html: courses.courseGoal }}
                            />

                        </Box>
                    </Box>
                </div>
                <div ref={contentRefs[3]} style={{ minHeight: '0', width: '100%' }}>
                    <Box maxWidth='100vw' height='100%' ml='8%' display='flex' flexDirection='column'>
                        <Box width='50%' height='100%'>
                            <Box display='flex' width='100%' alignItems='center'>
                                <ContentPasteIcon sx={{ fontSize: "40px", color: '#4070ad' }} />
                                <Typography color='#4070ad' fontSize='32px' fontWeight='bold' mt='2%' mb='2%' ml='1%'>
                                    Khóa học gồm 5 chủ đề
                                </Typography>
                            </Box>
                            <div
                                style={{
                                    marginTop: '2%',
                                    fontSize: '22px',
                                    lineHeight: '1.5',
                                }}
                                dangerouslySetInnerHTML={{ __html: courses.courseDescription }}
                            />
                        </Box>
                        <Box width='100%' height='100%' mt='3%'>
                            <Grid container columnGap='20px' width='100%'>
                                <Grid item xs={7} sx={{ border: "2px solid gray", borderRadius: '10px' }}>
                                    {
                                        courses?.topics?.map((topic, index) => (
                                            <Box mt='2%' ml='3%' width='90%' >
                                                <div style={{ display: 'flex' }}>
                                                    <Typography
                                                        fontSize='28px'
                                                        fontWeight='500'
                                                        sx={{
                                                            textDecorationLine: 'underline',
                                                        }}
                                                    >
                                                        {topic.topicName}
                                                    </Typography>

                                                    <Button
                                                        variant="text"
                                                        sx={{
                                                            textTransform: 'none',
                                                            padding: 0,
                                                            minWidth: 0,
                                                            ml: '62%',
                                                            display: 'flex'
                                                        }}
                                                        onClick={() => handleTopicExpand(topic.topicId)}
                                                    >
                                                        <Typography display='inline-block' fontSize='20px' fontWeight='500' >Course details</Typography>
                                                        {expandTopic.includes(topic.topicId) ? <ExpandLess fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}

                                                    </Button>
                                                </div>

                                                <Typography fontSize='22px' mt='1%'>Topic {index + 1} - 5 videos - 1 testing</Typography>

                                                {expandTopic.includes(topic.topicId) ? (
                                                    <div>
                                                        <Typography fontSize='22px' fontWeight='bold' mt='2%'>Nội dung topic</Typography>
                                                        <Typography fontSize='22px' mt='1%' mb='2%'>
                                                            Start creating your world. A game world is not just a backdrop for your
                                                            game—be it minimal or detailed, contained or part of a much bigger universe,
                                                            it provides the context for your player. Ultimately, a game world should feel
                                                            alive and wholly unique to any player who will experience it.
                                                        </Typography>
                                                        <Divider sx={{ height: '2px', backgroundColor: 'gray' }} />
                                                    </div>

                                                ) : (
                                                    <Divider sx={{ height: '2px', backgroundColor: 'gray' }} />
                                                )
                                                }

                                            </Box>
                                        ))
                                    }
                                </Grid>
                                <Grid item xs={1} >
                                </Grid>
                                <Grid item xs={3} >
                                    <Box width='90%' ml='4%' sx={{ border: "2px solid gray", borderRadius: '10px' }}>
                                        <Box mt='3%' ml='4%'>
                                            <Typography fontSize='20px' fontWeight='500'>Instructors</Typography>
                                            {
                                                teachers.map((teacher, index) => (
                                                    <Box Box display='flex' mt='5%' ml='3%' mb='5%'>
                                                        <Avatar src="https://source.unsplash.com/400x400?avatar?1" sx={{ width: '50px', height: '50px', mr: '2%', border: '2px solid gray' }} />
                                                        <Box>
                                                            <Typography
                                                                fontSize='16px'
                                                                fontWeight='500'
                                                                sx={{
                                                                    textDecorationLine: 'underline',
                                                                }}
                                                            >
                                                                {teacher}
                                                            </Typography>
                                                            <Typography fontSize='14px'>California Institute of the Arts</Typography>
                                                            <Typography fontSize='14px'>3 courses</Typography>
                                                        </Box>
                                                    </Box>


                                                ))
                                            }
                                        </Box>

                                    </Box>


                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </div >
            </Box >
            <Footer />
        </>
    );
}
export default Course;
