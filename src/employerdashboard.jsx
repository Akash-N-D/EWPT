import './employerdashboard.css'
import { useState } from 'react';
import './manager.jsx'
import projectpic from './assets/project.jpg'
import creport from './assets/creport.jpg'
import preport from './assets/preport.jpg'
import mreport from './assets/mreport.jpg'
import meet1 from './assets/meeting1.jpg'
import meet2 from './assets/meeting2.jpg'
import meet3 from './assets/meeting3.jpg'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Colors,
} from 'chart.js';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);


function Employerdashboard() {

    const [selected, setSelected] = useState("projects");

    const data = {
        labels: ['Week Score', 'Team Work', 'Time Management', 'Quality of Work','Client Handling', 'Attitude'],
        datasets: [
            {
                label: 'Performance (%)',
                data: [70, 68, 90, 65, 73, 90],
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'black',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
        scales: {
            y: {
                ticks:{
                    color:'white'
                },
                grid: {
                    color: 'lightgrey' 
                },
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    color: 'white',
                    text: 'Score (%)',
                },
            },
            x: {
                ticks:{
                    color:'white'
                },
                grid: {
                    color: 'lightgrey' 
                },
                title: {
                    display: true,
                    color: 'white',
                    text: 'Areas',
                },
            },
        },
    };


    return (
        <>
            <nav id="eptop" class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a id="epnav" class="navbar-brand" href="#">TechM Employer Portal</a>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a id="epnav" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="#">Log Out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="d-flex" id="wrapper">
                <div class=" border-end text-white p-3" id="sidebar-wrapper" >
                    <div id="value" class="list-group list-group-flush">
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("projects"); }} class="list-group-item list-group-item-action ">My Projects <i class="bi bi-person-workspace"></i></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("notifications"); }} class="list-group-item list-group-item-action ">Notifications <i class="bi bi-bell"></i></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("reports"); }} class="list-group-item list-group-item-action ">Reports <i class="bi bi-upload"></i></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("meetings"); }} class="list-group-item list-group-item-action ">Upcoming Meetings <i class="bi bi-calendar-heart"></i></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("review"); }} class="list-group-item list-group-item-action ">Manager Review <i class="bi bi-journal-bookmark-fill"></i></a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setSelected("summary"); }} class="list-group-item list-group-item-action ">Performance Summary <i class="bi bi-emoji-laughing-fill"></i></a>
                    </div>
                </div>
                <div className="p-4" style={{ flex: 1 }}>
                    {
                        selected === "projects" &&
                        <div>
                            <div id="pcard" class="card-group">
                                <div class="card">
                                    <img src={projectpic} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h3 class="card-title">Project 1</h3>
                                        <h2>Manager Assigned</h2>
                                        <p class="card-text">Status</p>
                                        <p class="card-text">Deadline</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src={projectpic} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h3 class="card-title">Project 2</h3>
                                        <h2>Manager Assigned</h2>
                                        <p class="card-text">Status</p>
                                        <p class="card-text">Deadline</p>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src={projectpic} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h3 class="card-title">Project 3</h3>
                                        <h2>Manager Assigned</h2>
                                        <p class="card-text">Status</p>
                                        <p class="card-text">Deadline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selected === "notifications" &&
                        <div>
                            <h1>No Notifications Yet</h1>
                        </div>
                    }
                    {
                        selected === "reports" &&
                        <div>
                            <div class="card-group">
                                <div class="card">
                                    <img src={preport} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Project Report</h5>
                                        <p class="card-text">
                                            The <strong>Project Report</strong> outlines the progress, challenges, and achievements of the assigned task.
                                            It includes detailed timelines, completed milestones, and resource utilization.
                                            Key performance metrics and outcomes are summarized for quick assessment.
                                            It serves as an official submission to evaluate project execution and delivery.
                                        </p>
                                        <button type="button" class="btn ">Upload</button>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src={mreport} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Report to Manager</h5>
                                        <p class="card-text">
                                            The <strong>Weekly Report</strong> provides a concise summary of tasks completed and goals achieved.
                                            It outlines work in progress, blockers faced, and dependencies, if any.
                                            Key performance highlights and time spent on each task are included.
                                            The report ensures transparency and helps in aligning priorities.
                                            It facilitates feedback and guidance for the upcoming week.
                                        </p>
                                        <button type="button" class="btn ">Report</button>
                                    </div>
                                </div>
                                <div class="card">
                                    <img id="creport" src={creport} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Client Updates</h5>
                                        <p class="card-text">
                                            The <strong>client reviews and updates</strong> for ongoing or completed projects.
                                            Include feedback received during meetings, emails, or support channels.
                                            Highlight any change requests, improvement suggestions, or satisfaction ratings.
                                            This helps maintain a transparent record of client interactions and expectations.
                                            Regular submissions support project refinement and performance tracking.
                                        </p>
                                        <button type="button" class="btn ">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selected === "meetings" &&
                        <div id="slide" className="p-4 d-flex justify-content-center">
                            <div id="carouselExampleCaptions" class="carousel slide ">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={meet1} class="d-block w-100" alt="..."></img>
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>Manager Meeting</h5>
                                            <p>Manager Meeting is scheduled on</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src={meet2} class="d-block w-200" alt="..."></img>
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>Team Meeting</h5>
                                            <p>Team Meeting is scheduled on</p>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img src={meet3} class="d-block w-100" alt="..."></img>
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>Team Out</h5>
                                            <p>Team Out is planned on</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    }
                    {
                        selected === "review" &&
                        <div id="review">
                            <h1>Reviews From Manager AK!!</h1>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Individual Week Performance
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            This week, you've demonstrated exceptional consistency in delivering your tasks on time.
                                            Your attention to detail has ensured high-quality outcomes across all assignments.
                                            You managed your workload efficiently, showing great time management skills.
                                            Progress updates were clear, timely, and helpful for team coordination.
                                            You remained focused even under tight deadlines and shifting priorities.
                                            Your proactive approach to challenges improved overall task execution.
                                            The clarity in your documentation added value to project transparency.
                                            Keep up the momentum — your dedication is clearly making an impact!
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Team Work
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            You’ve shown excellent collaboration and a strong sense of team spirit this week.
                                            Your willingness to assist teammates has created a more supportive work environment.
                                            You actively participated in discussions and offered constructive input.
                                            Your respectful communication fostered trust and openness within the team.
                                            You handled conflicts, if any, with maturity and professionalism.
                                            Group tasks were completed smoothly, thanks in part to your coordination skills.
                                            You encouraged quieter members to contribute, enhancing team balance.
                                            Great job maintaining harmony and boosting team morale!
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Adabtability & Learning
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            You have demonstrated a fair ability to adapt to changing tasks and environments.
                                            While there’s been some progress in learning new tools, there is still room to deepen your understanding.
                                            You responded to feedback positively and made efforts to adjust your approach.
                                            At times, adapting to new priorities took longer than expected.
                                            Your willingness to learn is evident, but consistency could be improved.
                                            You've shown potential when exploring unfamiliar areas, though support was occasionally needed.
                                            Continued practice and exposure will help you become more agile.
                                            Keep pushing your learning boundaries and seeking feedback actively
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Quality Of Work
                                        </button>
                                    </h2>
                                    <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            Your work consistently reflects a high standard of quality and precision.
                                            You show great attention to detail and rarely require rework or corrections.
                                            Deliverables are well-structured, clear, and meet all specified requirements.
                                            You take ownership of your tasks and ensure they are completed with care.
                                            There is evident pride in the outcomes you produce.
                                            Feedback from peers and managers frequently highlights your excellent craftsmanship.
                                            You maintain consistency even under tight deadlines or shifting priorities.
                                            Continue setting the benchmark for quality within the team.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            Time Management
                                        </button>
                                    </h2>
                                    <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            You manage your time exceptionally well, always meeting or beating deadlines.
                                            Tasks are prioritized effectively, allowing you to handle multiple responsibilities with ease.
                                            You consistently plan ahead, which minimizes last-minute issues or delays.
                                            Your punctuality in meetings and submissions is commendable.
                                            You allocate time wisely between urgent tasks and long-term goals.
                                            Your organized workflow enhances both your productivity and the team's.
                                            You stay calm and focused even when timelines are tight.
                                            Keep up the disciplined approach—it's a valuable asset to the project’s success.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                            Things Need To Be Improved
                                        </button>
                                    </h2>
                                    <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            While your contributions are valuable, there’s room for refinement in certain areas.
                                            Improving attention to detail can help reduce minor errors in deliverables.
                                            Communication clarity, especially in status updates, would enhance collaboration.
                                            Time allocation for complex tasks needs more balance to avoid rushed outcomes.
                                            Seeking feedback more regularly can help align efforts with expectations.
                                            Proactive problem-solving could be strengthened with deeper analysis.
                                            Taking more ownership in cross-functional tasks will elevate your impact.
                                            Focused improvement in these areas will support your continued growth and success.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selected === "summary" &&
                        <div>
                            <div id="chrt" className="card">
                                <h5 className="card-title mb-3">Preformance</h5>
                                <Line data={data} options={options} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Employerdashboard