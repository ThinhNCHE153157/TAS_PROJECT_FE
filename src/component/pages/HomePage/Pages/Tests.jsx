import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { GetlistTest } from '../Services/HomepageService'
import { useState, useEffect } from "react";


const Tests = () => {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        const TestData = async () => {
            const data = await GetlistTest();
            console.log(data);
            setTests(data);
        };
        TestData();
    }, []);
    return (
        <>
            <Header />
            <div class="container" style={{ marginTop: "69.47px", minHeight: "100vh" }}>
                <div className="row" style={{ marginTop: "100px", marginBottom: "10px" }}>
                    <h2>Đề thi</h2>
                </div>
                <div className="row">
                    <ul>
                        {tests.map((test) => (
                            <li key={test.testId}>
                                <a href={`/test/${test.testId}`}>{test.testName}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Tests;