import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import Banner from "../Component/Banner";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Course = () => {

    return (
        <>
            <Header />
            <div class="container-fluid" style={{ marginTop: "70.09px" }}>
                <div className="row" style={{ marginTop: "80px", marginBottom: "10px" }}>
                    <div className="col-12" style={{ padding: 0 }}>
                        <Banner />
                    </div>
                </div>
            </div>
            <div class="container-fluid" style={{ minHeight: "100vh", width: '100%', padding: "0" }}>
                <AppBar sx={{ backgroundColor: "white", color: "black" }} position="static">
                    <Toolbar>
                        <div>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <li style={{ marginRight: '15px' }}>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Mục tiêu khoá học
                                    </Link>
                                </li>
                                <li style={{ marginRight: '15px' }}>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Thông tin khoá học
                                    </Link>
                                </li>
                                <li style={{ marginRight: '15px' }}>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Chương trình học
                                    </Link>
                                </li>
                                <li style={{ marginRight: '15px' }}>
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Đánh giá
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Footer />
        </>
    );
}
export default Course;
