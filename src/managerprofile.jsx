import './managerprofile.css'
import React from "react";
import mpic from './assets/managerpic.jpg'
import videomBg from './assets/bg.mp4';

function Managerprofile({onPosition}) {
    return (
        <>
            <div id="mdash">
                <video autoPlay loop muted playsInline className="videombg">
                    <source src={videomBg} type="video/mp4" />
                </video>
                <nav id="mbar" class="navbar navbar-expand-lg ">
                    <div id='top2' class="container-md">
                        <a class="navbar-brand" href="#" >TechM Employers Work Performance Tracker</a>
                        <button id="back" onClick={()=> onPosition('manager')} class="btn btn-sm " type="button">Back</button>
                    </div>
                </nav>
                <div>
                    <h1 id="mh">Welcome Back Manager Ak !!</h1>
                    <div id="mprofile" class="card mb-3">
                        <div class="row g-0">
                            <div  class="col-md-5">
                                <img id="mpic" src={mpic} class="img-fluid rounded-start" alt="Error Loading Image"></img>
                            </div>
                            <div class="col-md-7">
                                <div id="mdata" class="card-body">
                                    <h3 class="card-title">Back in action, AK</h3>
                                    <h5 class="card-text">
                                        Your team thrives on your clarity and focus.
                                        Lead today with intention and confidence.
                                        Success is in every step you guide.
                                    </h5>
                                    <h4>Role: </h4>
                                    <h4>Department: </h4>
                                    <h4>Team Size:</h4>
                                    <h4>Projects Handled:</h4>
                                    <h4>Experience: </h4>
                                    <button id='dbtn' onClick={()=> onPosition('managerdashboard')} type="button" class="btn  btn-lg">Go To DashBoard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Managerprofile