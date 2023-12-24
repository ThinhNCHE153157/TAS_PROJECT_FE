import { Button, Result } from 'antd';
import React from 'react'

const NotFound = () => {
    localStorage.removeItem('startTime');
    localStorage.removeItem('countdownTimerTime');
    localStorage.removeItem('countdownTimerTimestamp');
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={(e) => window.location.href = "/"}>Back Home</Button>}
        />
    );
}
export default NotFound;
