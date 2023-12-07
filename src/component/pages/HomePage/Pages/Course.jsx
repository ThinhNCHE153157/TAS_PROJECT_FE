import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Banner from "../Component/Banner";
import { AppBar, Avatar, AvatarGroup, Box, Button, Divider, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StickyCard from "../Component/StickyCard";
import { useEffect, useRef, useState } from "react";
import { Settings } from "@mui/icons-material";
import { format } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';


const Topics = [
    {
        topicId: 1, topicName: 'There is topic 1', topicDescription: 'Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here'
    },
    {
        topicId: 2, topicName: 'There is topic 2', topicDescription: 'Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here'
    },
    {
        topicId: 3, topicName: 'There is topic 3', topicDescription: 'Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here'
    },
    {
        topicId: 4, topicName: 'There is topic 4', topicDescription: 'Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here Topic desciption here'
    },
]
const renderTeacher = (teachers, maxTeacher) => {
    const visibleTeachers = teachers.slice(0, maxTeacher);
    const remainingTeachersCount = teachers.length - maxTeacher;

    return (
        <Box display='flex' alignItems='center'>
            <Typography variant="body1" ml='6px' fontWeight='bold'>
                Instructors:
            </Typography>
            {visibleTeachers.map((teacher, index) => (
                <Button variant="text" sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        ml='6px'
                        sx={{
                            textDecorationLine: 'underline',
                            display: 'inline-block'
                        }}
                    >
                        {teacher}
                    </Typography>
                </Button>

            ))}
            {remainingTeachersCount > 0 && (
                <Typography variant="body1" color="textSecondary" ml='6px' fontWeight='bold'>
                    +{remainingTeachersCount} more
                </Typography>
            )}
        </Box>
    );
};
const Course = () => {
    const [tabValue, setTabValue] = useState(0)
    const contentRefs = [useRef(), useRef(), useRef(), useRef()]; // Mỗi ref tương ứng với một tab
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
    useEffect(() => {
        // Di chuyển đến vùng nội dung của tab khi tab thay đổi
        if (contentRefs[tabValue].current) {
            smoothScroll(contentRefs[tabValue]);
        }
    }, [tabValue]);

    return (
        <>
            <Header />
            <StickyCard />
            <div class="container-fluid" style={{ marginTop: "-640px" }}>
                <div className="row" style={{ marginTop: "80px", marginBottom: "10px" }}>
                    <div className="col-12" style={{ padding: 0 }}>
                        <Banner />
                    </div>
                </div>
            </div>
            <div class="container-fluid" style={{ minHeight: "auto", width: '100%', padding: "0", marginLeft: '8%' }}>
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
                                <Tab value={0} label="Thông tin khoá học" id="tab-0" />
                                <Tab value={1} label="Mục tiêu khoá học" id="tab-1" />
                                <Tab value={2} label="Chương trình học" id="tab-2" />
                                <Tab value={3} label="Đánh giá" id="tab-3" />
                            </Tabs>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Box width='100vw' mt='30px'>
                {/* Nội dung của tab */}
                <div ref={contentRefs[0]} style={{ backgroundColor: "#e9eaf5", minHeight: '0' }}>
                    <Box width='55%' height='100%' ml='8%'>
                        <Typography fontSize='40px' fontWeight='500'>
                            There is course name
                        </Typography>
                        <Typography mt='2%' variant="body1">
                            There is course description
                        </Typography>
                        <Box mt='2%' display='flex' alignItems='center'>
                            <AvatarGroup max={3}>
                                <Avatar src="https://source.unsplash.com/400x400?avatar?1" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?2" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?3" />
                                <Avatar src="https://source.unsplash.com/400x400?avatar?4" />
                            </AvatarGroup>
                            {renderTeacher(teachers, maxTeacher)}
                        </Box>
                        <Button variant="contained" sx={{ mt: '5%', textTransform: 'none', width: '180px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography width='100%' fontSize='20px' fontWeight='bold'>Enroll</Typography>
                                <Typography variant="body1">Starts {format(new Date(), 'MMM dd')}</Typography>
                            </div>
                        </Button>
                        <Typography mt='3%' fontSize='15px' color='textSecondary'>Sponsored by 'Enterprise Name'</Typography>
                        <Box display='flex' mt='3%'>
                            <Typography fontSize='18px' fontWeight='bold' mr='5px'>50</Typography>
                            <Typography fontSize='18px'>already enrolled</Typography>
                        </Box>
                        <Box width='100%' padding='30px'></Box>

                    </Box>
                </div>
                <div ref={contentRefs[1]} style={{ backgroundColor: "#bdeaf0", height: "500px" }}>

                </div>
                <div ref={contentRefs[2]} style={{ minHeight: '0' }}>
                    <Box width='100%' height='100%' ml='8%'>
                        <Box width='50%' height='100%'>
                            <Typography fontSize='32px' fontWeight='500'>
                                Khóa học bao gồm: 5 Topic
                            </Typography>
                            <Typography mt='3%' variant="body1">
                                Stemming from the principles of storytelling and design established in CalArts’
                                renowned Animation programs, this Specialization lays a primary foundation for
                                experimentation and exploration of video game design, story, character development,
                                and winning gameplay before programming begins. These four courses emphasize the
                                self-reliance and personal expression of the gaming artist, and encourage you to
                                take conceptual risks and develop new modes of expression and form through gaming.
                            </Typography>
                        </Box>
                        <Box width='100%' height='100%' mt='3%'>
                            <Grid container columnGap='20px'>
                                <Grid item xs={7} sx={{ border: "2px solid gray", borderRadius: '10px' }}>
                                    {
                                        Topics.map((topic, index) => (
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

                                                <Typography variant="body1" mt='1%'>Topic {index + 1} - 5 videos - 1 testing</Typography>

                                                {expandTopic.includes(topic.topicId) ? (
                                                    <div>
                                                        <Typography variant="body1" fontWeight='bold' mt='2%'>Nội dung topic</Typography>
                                                        <Typography variant="body1" mt='1%' mb='2%'>
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
                <div ref={contentRefs[3]} style={{ backgroundColor: "#e7e8d1", height: "500px" }}>
                    {/* Nội dung cho Đánh giá */}
                </div>
            </Box >
            <Footer />
        </>
    );
}
export default Course;
