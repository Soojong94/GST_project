// App.js
import React from 'react';
import './../mainpage/startbootstrap-grayscale-gh-pages/css/styles.css'; // Import your CSS just like you would in a regular .js file
import Navbar from './startbootstrap-grayscale-gh-pages/js/Navbar'; // Assuming that Navbar.js is in the same directory
import { useEffect, useState } from 'react';
import axios from 'axios';

function Mainpage() {


    const signup = () => {
        window.location.href = 'http://localhost:5000/signup';
      }
    
      const login = () => {
        window.location.href = 'http://localhost:5000/login';
      }

    useEffect(()=>{

        console.log('메인 화면 세팅 완료')
        axios.get('http://localhost:5000/session')
        .then(res => {
            console.log('넘어온 세션',res.data)
            sessionStorage.setItem("user", JSON.stringify(res.data)); 
        
        })

    },[])
      
    
    // 로그아웃 구현 하려면 이렇게.
    // setItem('user',{})

  return (
    <div className="mainpage">
    <Navbar signup={signup} login={login} />
    <header class="masthead" id="about">

<div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
    <div class="d-flex justify-content-center">
        <div class="text-center">


            

            <h2 class="text-white-50 mx-auto mt-2 mb-5"> <a href="#Personal_Schedule"
                    id="Personal_Schedule_text">Personal
                    Schedule </a> </h2>

            <h2 class="text-white-50 mx-auto mt-2 mb-5"> <a href="#LOL_Pro_Team_Subscribe"
                    id="LOL_Pro_Team_Subscribe_text">LOL Pro Team
                    Subscribe </a></h2>
            <h2 class="text-white-50 mx-auto mt-2 mb-5"> <a href="#Clan_Schedule" id="Clan_Schedule_text">Clan
                    Schedule</a></h2>

            <a class="btn btn-primary" href="#about">GST Start</a>

        </div>
    </div>
</div>
</header>




{/* <!-- Projects--> */}
<section class="projects-section bg-light" id="projects">
<div class="container px-4 px-lg-5">
    {/* <*--Featured Project Row--> */}
    <div class="row gx-0 mb-4 mb-lg-5 align-items-center" id="Personal_Schedule">
        <div class="col-xl-8 col-lg-7">개인 일정 관리 사진</div>
        <div class="col-xl-4 col-lg-5">
            <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                    <div class="project-text w-100 my-auto text-center text-lg-left">
                        <h4 class="text-white">개인 일정 관리 안내</h4>
                        <p class="mb-0 text-white-50">어쩌고 저쩌고</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Project One Row--> */}

    <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
        <div class=" col-lg-6" id="LOL_Pro_Team_Subscribe"> 팀 구독 관리 사진
            <div class="col-lg-6">
                <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-left">
                            <h4 class="text-white">팀 구독 관리 안내</h4>
                            <p class="mb-0 text-white-50">어쩌고 저쩌고</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Project Two Row--> */}
    <div class="row gx-0 justify-content-center">
        <div class="col-lg-6" id="Clan_Schedule">클랜 일정 관리 사진</div>
        <div class="col-lg-6 order-lg-first">
            <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                    <div class="project-text w-100 my-auto text-center text-lg-right">
                        <h4 class="text-white">클랜 일정 관리 안내 </h4>
                        <p class="mb-0 text-white-50">어쩌고 저쩌고</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>

  </div>
);
}

export default Mainpage;