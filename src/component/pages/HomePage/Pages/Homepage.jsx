import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { Grid } from "@mui/material";
import CourseCard from "../Component/CourseCard";
import { GetlistCourse } from '../HomepageService'
import { useEffect, useState } from "react";
import Banner from "../Component/Banner";

const Homepage = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const CourseData = async () => {
            const data = await GetlistCourse();
            setCourses(data);
        };
        CourseData();
    }, []);
    console.log(courses);
    return (
        <>
            <Header />
            <div class="container" style={{ marginTop: "69.47px", minHeight: "100vh" }}>
                <div className="row" style={{ marginTop: "100px", marginBottom: "10px" }}>
                    <div className="col-12">
                        <Banner />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Khoá học online</h2>
                        <p>
                            Những khoá học tiếng Anh online chất lượng cao được thiết kế theo chương trình tiếng Anh chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford (Anh) với hệ thống bài giảng, bài tập phong phú đa dạng. Bạn có thể học thử miễn phí trước khi đặt mua sản phẩm.
                        </p>
                    </div>
                    <div className="col-12">
                        <h2>Top 4 khoá học nổi bật:</h2>
                        <Grid container spacing={2}>
                            {courses.map((course) => (
                                <Grid item key={course.courseId} xs={12} sm={6} md={4} lg={3}>
                                    <CourseCard
                                        id={course.courseId}
                                        image="https://picsum.photos/300/400"
                                        name={course.courseName}
                                        description={course.courseDescription}
                                        level={course.courseLevel}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="col-12">
                        <h2>Danh sách khoá học:</h2>
                        <Grid container spacing={2}>
                            {courses.map((course) => (
                                <Grid item key={course.courseId} xs={12} sm={6} md={4} lg={3}>
                                    <CourseCard
                                        id={course.courseId}
                                        image="https://picsum.photos/300/400"
                                        name={course.courseName}
                                        description={course.courseDescription}
                                        level={course.courseLevel}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="col-12">
                        <h2>Khoá học miễn phí:</h2>
                        <Grid container spacing={2}>
                            {courses.map((course) => (
                                <Grid item key={course.courseId} xs={12} sm={6} md={4} lg={3}>
                                    <CourseCard
                                        id={course.courseId}
                                        image="https://picsum.photos/300/400"
                                        name={course.courseName}
                                        description={course.courseDescription}
                                        level={course.courseLevel}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}
export default Homepage;
