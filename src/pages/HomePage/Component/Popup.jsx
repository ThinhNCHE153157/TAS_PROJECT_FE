import React, { useState } from 'react';
import dict from "../../../Assets/img/dictionary.png"

const Popup = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div className="popup-container" style={{ position: "relative" }}>

            <button onClick={togglePopup} style={{
                position: "fixed",
                top: "62vh",
                right: "20px",
                padding: "10px",
                backgroundColor: "#fff",
                color: "#fff",
                border: "1px solid #ccc",
                borderRadius: "50%",
                cursor: "pointer",

            }}>
                <img src={dict} alt="Từ điển" height={30} />
            </button>
            {
                isPopupVisible && (
                    <div className="popup" style={{
                        position: "fixed",
                        top: "40vh",
                        right: "-130px",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        zIndex: "1",
                    }}>
                        <iframe title='tudien' loading="lazy" frameborder="1" src="https://m.dict.laban.vn/" style={{ height: "40vh" }}></iframe>

                    </div>
                )
            }
        </div >

    );
};

export default Popup;
