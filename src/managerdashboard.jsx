import React, { useState } from 'react';
import './Managerdashboard.css';

const teamMembers = [
    {
        id: 1,
        name: 'AK',
        role: 'Frontend Developer',
        projects: [
            {
                title: 'Company Website Redesign',
                assigned: 'Aug 15, 2025',
                status: 'In Progress',
                deadline: 'Sep 30, 2025',
                description: 'Modernize the existing company website with updated UI/UX',
            },
            {
                title: 'Mobile App Development',
                assigned: 'Jul 1, 2025',
                status: 'In Progress',
                deadline: 'Oct 15, 2025',
                description: 'Develop a cross-platform mobile app for client',
            },
        ],
    },
    {
        id: 2,
        name: 'ARK',
        role: 'Backend Designer',
        projects: [],
    },
];

export default function ManagerDashboard() {

    const [selectedTab, setSelectedTab] = useState('Projects');

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleViewProfile = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleBack = () => {
        setSelectedEmployee(null);
    };

    return (
        <div className="manager-dashboard">
            {!selectedEmployee ? (
                <>
                  <nav id="eptop" class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a id="mngnav" class="navbar-brand" href="#">TechM Manager Portal</a>
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
                    <div className="search-container">
                        <h2 id="srch">Employee Search</h2>
                        <p id="srch">Search for an employee to view their performance and assign tasks.</p>
                        <div className="search-box">
                            <input type="text" placeholder="Search by name or ID" />
                            <button>Search</button>
                        </div>
                    </div>

                    <h3>Your Team</h3>
                    {teamMembers.map((member) => (
                        <div key={member.id} className="team-card">
                            <div className="avatar" />
                            <div className="info">
                                <strong>{member.name}</strong>
                                <p>{member.role}</p>
                            </div>
                            <button onClick={() => handleViewProfile(member)}>View Profile</button>
                        </div>
                    ))}
                </>
            ) : (
                <div className="profile-view">
                    <div className="profile-header">
                        <div className="avatar-large" />
                        <div>
                            <h2>{selectedEmployee.name}</h2>
                            <p>{selectedEmployee.role}</p>
                        </div>
                        <button className="back-btn" onClick={handleBack}>Back to Search</button>
                    </div>

                    <div className="tabs">
                        {['Projects', 'Information', 'Reviews', 'Meetings', 'Performance'].map((tab) => (
                            <button
                                key={tab}
                                className={selectedTab === tab ? 'active' : ''}
                                onClick={() => setSelectedTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>


                    {selectedTab === 'Projects' && (
                        <>
                            <h3>Project Assignment for {selectedEmployee.name}</h3>
                            <button className="assign-btn">+ Assign New Project</button>
                            <div className="projects-grid">
                                {selectedEmployee.projects.map((project, idx) => (
                                    <div key={idx} className="project-card">
                                        <h4>{project.title}</h4>
                                        <p className="assigned">📅 Assigned: {project.assigned}</p>
                                        <p>{project.description}</p>
                                        <hr />
                                        <p><strong>Status:</strong> {project.status}</p>
                                        <p><strong>Deadline:</strong> {project.deadline}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {selectedTab === 'Information' && (
                        <div className="info-form">
                            <h3>Send Information</h3>
                            <p>Send important information or instructions to {selectedEmployee.name}. This will appear in their notification center.</p>
                            <label>Subject</label>
                            <input type="text" placeholder="e.g., Project Update, Important Deadline" />
                            <label>Message</label>
                            <textarea rows="6" placeholder="Enter your message here..."></textarea>
                            <button className="assign-btn">Send Information</button>
                        </div>
                    )}

                    {selectedTab === 'Reviews' && (
                        <div className="tab-content">
                            <h2>Review Employee Submissions</h2>
                            <p>Review AK's project submissions and client reviews</p>
                            <div className="review-section">
                                <h3>Website Redesign</h3>
                                <p>Submitted on September 15, 2023</p>
                                <h4>Submitted Files</h4>
                                <div className="file-download">📎 home-page-mockup.pdf (2.4 MB)</div>
                                <div className="file-download">📎 user-flow-diagram.png (1.1 MB)</div>
                            </div>
                            <div className="review-section">
                                <h3>Client Review - Acme Corp</h3>
                                <p>Reviewed on September 16, 2023 ⭐⭐⭐⭐☆</p>
                                <div className="review-comment">
                                    "Great work on the redesign. The new layout is much more intuitive and modern."
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'Meetings' && (
                        <div className="tab-content">
                            <h2>Schedule Meetings</h2>
                            <p>Schedule meetings with AK for the upcoming two weeks</p>
                            <button className="new-meeting">+ New Meeting</button>
                            <div className="meeting-card">
                                <p>📅 No upcoming meetings scheduled</p>
                                <span>Schedule meetings for the next two weeks</span>
                            </div>
                        </div>
                    )}

                    {selectedTab === 'Performance' && (
                        <div className="tab-content">
                            <h2>Performance Review for AK</h2>
                            <p>Evaluate performance across different categories and provide feedback</p>
                            {[
                                ['Productivity', 70],
                                ['Quality', 75],
                                ['Teamwork', 80],
                                ['Innovation', 65],
                                ['Reliability', 85]
                            ].map(([label, score]) => (
                                <div key={label} className="performance-metric">
                                    <span>{label}</span>
                                    <input type="range" min="0" max="100" value={score} readOnly />
                                    <span>{score}/100</span>
                                </div>
                            ))}
                            <div className="performance-summary">
                                <h4>Overall Score</h4>
                                <input type="range" min="0" max="100" value="75" readOnly />
                                <div className="score-scale">
                                    <span>Poor</span>
                                    <span>Excellent</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}

        </div>
    );
}
