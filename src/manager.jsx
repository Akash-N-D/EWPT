import './manager.css'
import videobg from './assets/bg.mp4';
import React, { useState } from 'react';

function Manager({onPosition}) {

    return (
        <>
            <div class="manager">
                <video autoPlay loop muted playsInline className="videobg">
                                    <source src={videobg} type="video/mp4" />
                                </video>
                <nav id="bar1" class="navbar navbar-expand-lg ">
                    <div id='top1' class="container-md">
                        <a class="navbar-brand" href="#" >TechM Employers Work Performance Tracker</a>
                        <button id="bck" onClick={()=> onPosition(null)} class="btn btn-sm " type="button">Back</button>
                    </div>
                </nav>
                <h3>Welcome back, Manager! Your team is counting on you</h3>
                <form id="log" class="row g-3">
                    <div id="box" class="col-7">
                        <label for="manageId" class="form-label">Manager ID</label>
                        <input type="text" class="form-control" id="managerID"></input>
                    </div>
                    <div id="box" class="col-7">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4"></input>
                    </div>
                    <div id="box" class="col-7">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword4"></input>
                    </div>
                    <div class="col-md-6">
                        <button id='sign' type="submit" onClick={()=> onPosition('managerprofile')} class="btn ">Sign in</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Manager