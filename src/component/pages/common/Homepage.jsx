import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Homepage = () => {
    return (
        <>
            <Header />
            <div class="container" style={{ marginTop: "69.47px", minHeight: "100vh" }}>
                <div className="row">
                    Banner
                </div>
                <div className="row">
                    <div className="col-12">
                        <h1>Khoá học online</h1>
                        <p>
                            Những khoá học tiếng Anh online chất lượng cao được thiết kế theo chương trình tiếng Anh chuẩn CEFR (A1-C2) của đại học Cambridge và Oxford (Anh) với hệ thống bài giảng, bài tập phong phú đa dạng. Bạn có thể học thử miễn phí trước khi đặt mua sản phẩm.
                        </p>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}
export default Homepage;
