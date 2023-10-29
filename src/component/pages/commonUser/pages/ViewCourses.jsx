import React, { useState } from 'react';
import Header from '../layout/Header';
import css from './css/viewcourses.css';
import toeic300 from '../../../../image/300.png';
import toeic600 from '../../../../image/600.png';
import toeic800 from '../../../../image/800.png';
import {
    Paper,
} from '@mui/material';

function ViewCourses() {
    const paperStyle = { padding: '30px 50px', width: 300, margin: '20px auto' };
    const marginTop = { marginTop: 13 };
    return (
        <div>
            <Header />
            <h1 align="center">Xây Lộ Trình Luyện Thi TOEIC</h1>
            <p align="center">Lộ trình học chi tiết, phù hợp và dành riêng cho bạn</p>
            <h4 align="center">Hãy chọn trình độ hiện tại của bạn</h4>
            <div align='center' className='list'>
                <Paper elevation={1} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <div className='container'>
                        <div className='image'>
                            <img src={toeic300}></img>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 1-295</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>

                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 300</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>

                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={1} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <div className='container'>
                        <div className='image'>
                            <img src={toeic600}></img>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 300-595</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 600</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={1} style={paperStyle} sx={{ borderRadius: '20px' }}>
                    <div className='container'>
                        <div className='image'>
                            <img src={toeic800}></img>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 600-650</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                        <div className='content'>
                            <div className='title'>
                                <h3>TOEIC 800+</h3>
                            </div>
                            <div className='body'>
                                <p> Chi Tiết courses<br />
                                    Lộ trình Mất Gốc đến 295<br />
                                    Danh sách bài: 23 bài <br />
                                    Thời gian hoàn thành: 2 tháng <br />
                                    Số người đã học: 5238+
                                </p>
                            </div>
                        </div>
                        <div className='btn'>
                            <button><a>View Toeic</a></button>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
}
export default ViewCourses;
