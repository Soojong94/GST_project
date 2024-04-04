// App.js
import React from 'react';
import './css/styles.css'; // Import your CSS just like you would in a regular .js file
import Navbar from './js/Navbar'; // Assuming that Navbar.js is in the same directory
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import MainImage from './assets/img/hinoon.png';
import Main_team_img from './assets/img/mainpage_team_img.png';
import Main_calendar from './assets/img/main_calendar.png';
import Main_board_content from './assets/img/main_board_content.png';
import BigFaker from './assets/img/bigFaker.png'


function Mainpage() {


    const signup = () => {
        window.location.href = 'http://localhost:3000/SignUp';
    }

    const login = () => {
        window.location.href = 'http://localhost:3000/SignIn';
    }

    return (
        <div className="mainpage" style={{ width: '100%' }}>
            
        <Navbar signup={signup} login={login} />
            <header class="masthead" id="about">
            <img id = 'main_Image' src={MainImage} />
            </header>
            {/* <!-- Projects--> */}
            
            <section class="projects-section bg-light" id="projects">
                <div class="container px-4 px-lg-5">
                    {/* <*--Featured Project Row--> */}
                    <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="col-lg-6" id="LOL_Pro_Team_Subscribe"> 
                            <div class="col-lg-6">
                                <div class="bg-black text-center h-100 project">
                                    <div class="d-flex h-100">
                                        <div class="project-text w-100 my-auto text-center ">
                                            <h4 class="text-white">개인 일정 등록 기능</h4>
                                        </div>

                                    </div>
                                </div>
                                <img id ='Main_calendar' src={Main_calendar} />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Project One Row--> */}

                    <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="col-lg-6" id="LOL_Pro_Team_Subscribe"> 
                            <div class="col-lg-6">
                                <div class="bg-black text-center h-100 project">
                                    <div class="d-flex h-100">
                                        <div class="project-text w-100 my-auto text-center ">
                                            <h4 class="text-white">팀 구독, 경기 알림 문자 발송 기능</h4>
                                        </div>

                                    </div>
                                </div>
                                <img id ='Main_team_sub' src={Main_team_img} />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Project Two Row--> */}
                    <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="col-lg-6" id="LOL_Pro_Team_Subscribe"> 
                            <div class="col-lg-6">
                                <div class="bg-black text-center h-100 project">
                                    <div class="d-flex h-100">
                                        <div class="project-text w-100 my-auto text-center ">
                                            <h4 class="text-white">클랜 모집, 클랜 일정 공유 기능</h4>
                                        </div>

                                    </div>
                                </div>
                                <img id ='Main_team_sub' src={BigFaker} />
                            </div>
                        </div>
                    </div>
                    <br>
                    </br>
                    
                <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                    <div class="d-flex justify-content-center">
                        <div class="text-center">




                            

                            <Link to="/calendar" class="btn btn-primary" href="#about"><span id="bottom_btn">GST Start</span></Link>

                        </div>
                    </div>
                </div>
                </div>
            </section>
            <br></br>

        </div>
    );
}


    export default Mainpage;