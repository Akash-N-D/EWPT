import './employerprofile.css'
import React from "react";
import epic from './assets/managerpic.jpg'
import videoeBg from './assets/bg.mp4';

function Employerprofile({onPosition}) {
    return (
        <>
            <div id="edash">
                <video autoPlay loop muted playsInline className="videoebg">
                    <source src={videoeBg} type="video/mp4" />
                </video>
                <nav id="ebar" class="navbar navbar-expand-lg ">
                    <div id='etop2' class="container-md">
                        <a class="navbar-brand" href="#" >TechM Employers Work Performance Tracker</a>
                        <button id="back" onClick={()=> onPosition('employer')} class="btn btn-sm " type="button">Back</button>
                    </div>
                </nav>
                <div>
                    <h1 id="eh">Welcome, Achiever !!</h1>
                    <div id="eprofile" class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img id="epic" src={epic} class="img-fluid rounded-start" alt="Error Loading Image"></img>
                            </div>
                            <div class="col-md-7">
                                <div id="edata" class="card-body">
                                    <h3 class="card-title">Good to see you again! AK</h3>
                                    <h5 class="card-text">
                                        Your dedication drives the mission.
                                        Even small steps make a big difference.
                                        Let today be another great one
                                    </h5>
                                    <h4>Role: </h4>
                                    <h4>Department: </h4>
                                    <h4>Manager Assigned:</h4>
                                    <h4>Projects Handled:</h4>
                                    <h4>Experience: </h4>
                                    <button id='dbtn' onClick={()=> onPosition('employerdashboard')} type="button" class="btn  btn-lg">Enter DashBoard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Employerprofile