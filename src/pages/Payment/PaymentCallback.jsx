import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../component/callApi';
import Header from '../../layout/Header';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Button, Flex, Result, Spin } from 'antd';
import { CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const PaymentCallback = () => {
    const location = useLocation();
    const user = useSelector((state) => state.user?.User);
    const nav = useNavigate();
    const params = new URLSearchParams(location.search);
    const gotohomepage = () => {
        nav('/');
    };
    const gotobuy = () => {
        nav('/');
    };

    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState(null);

    const vnp_Amount = params.get('vnp_Amount');
    const vnp_BankCode = params.get('vnp_BankCode');
    const vnp_BankTranNo = params.get('vnp_BankTranNo');
    const vnp_CardType = params.get('vnp_CardType');
    const vnp_OrderInfo = params.get('vnp_OrderInfo');
    const vnp_PayDate = params.get('vnp_PayDate');
    const vnp_ResponseCode = params.get('vnp_ResponseCode');
    const vnp_TmnCode = params.get('vnp_TmnCode');
    const vnp_TransactionNo = params.get('vnp_TransactionNo');
    const vnp_TransactionStatus = params.get('vnp_TransactionStatus');
    const vnp_TxnRef = params.get('vnp_TxnRef');
    const vnp_SecureHash = params.get('vnp_SecureHash');
    const string = "vnp_Amount=" + vnp_Amount + "&vnp_BankCode=" + vnp_BankCode + "&vnp_BankTranNo=" + vnp_BankTranNo + "&vnp_CardType=" + vnp_CardType + "&vnp_OrderInfo=" + vnp_OrderInfo + "&vnp_PayDate=" + vnp_PayDate + "&vnp_ResponseCode=" + vnp_ResponseCode + "&vnp_TmnCode=" + vnp_TmnCode + "&vnp_TransactionNo=" + vnp_TransactionNo + "&vnp_TransactionStatus=" + vnp_TransactionStatus + "&vnp_TxnRef=" + vnp_TxnRef + "&vnp_SecureHash=" + vnp_SecureHash;

    useEffect(() => {
        setIsLoading(true);
        API.get('/Payment/PaymentCallback?' + string).then((res) => {
            setTimeout(() => {
                setIsLoading(false);
                setResult(res.data);
                console.log(res.data);
            }, 3000);
        });
    }, []);

    return (
        <div>
            <Header />
            {isLoading ? (

                <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }} >
                    <CircularProgress size={80} style={{ margin: 'auto', marginTop: '10%' }} />
                    <Typography style={{ margin: 'auto', marginTop: '3%' }} >Đang xử lý thanh toán vui lòng chờ trong giây lát...</Typography>
                </div>) :
                result?.vnPayResponseCode === "00" ? (
                    (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }} >
                            <Result style={{ margin: 'auto', marginTop: '5%' }}
                                status="success"
                                title="Mua khoá học thành công!"
                                extra={[
                                    <Button type="primary" key="console" onClick={gotohomepage} >
                                        Trở về trang chủ
                                    </Button>,
                                    <Button key="buy" onClick={gotobuy}>Mua tiếp</Button>,
                                ]}
                            />
                        </div>
                    )) : (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }} >
                        <Result style={{ margin: 'auto', marginTop: '5%' }}
                            status="error"
                            title="Mua khoá học thất bại!"
                            extra={[
                                <Button type="primary" key="console" onClick={gotohomepage} >
                                    Trở về trang chủ
                                </Button>,
                                <Button key="buy" onClick={gotobuy}>Mua tiếp</Button>,
                            ]}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default PaymentCallback;
