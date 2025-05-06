import './positionselect.css'
import videoBg from './assets/bg.mp4';


function Positionselect({onPosition}) {
    return (
        <>
            <div className='head'>
                <video autoPlay loop muted playsInline className="video-bg">
                    <source src={videoBg} type="video/mp4" />
                </video>
                <nav id="bar" class="navbar navbar-expand-lg ">
                    <div id='top' class="container-md">
                        <a class="navbar-brand" href="#" >TechM Employers Work Performance Tracker</a>
                    </div>
                </nav>
                <div id="but">
                    <h1>Are You !?</h1>
                    <button id="mgn" type="button" onClick={()=> onPosition('manager')} class="btn btn-lg">Manager</button>
                    <button id="emp" type="button" onClick={()=> onPosition('employer')} class="btn btn-lg">Employer</button>
                </div>
            </div>
        </>
    );
}

export default Positionselect