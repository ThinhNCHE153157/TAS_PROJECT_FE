import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Homepage = () => {
    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "64px", minHeight: "100vh" }}>
                <div className="row">
                    <div className="col-12">
                        <h1>Homepage</h1>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}
export default Homepage;
