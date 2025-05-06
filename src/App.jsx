import React, { useState } from 'react';
import Manager from './manager';
import Employer from './employer';
import Positionselect from './positionselect';
import Managerprofile from './managerprofile'
import Employerprofile from './employerprofile'
import Employerdashboard from './employerdashboard.jsx'

function App() {
  const [position, setPosition] = useState(null);
  

  return (
    <>
    <div>
      {position === 'manager' && <Manager onPosition={setPosition} />}
      {position === 'employer' && <Employer onPosition={setPosition}/>}
      {position === null && <Positionselect onPosition={setPosition} />}
      {position === 'managerprofile' && <Managerprofile  onPosition={setPosition}/>}
      {position === 'employerprofile' && <Employerprofile  onPosition={setPosition}/>}
      {position === 'managerdashboard' && <Managerdashboard  onPosition={setPosition}/>}
      {position === 'employerdashboard' && <Employerdashboard  onPosition={setPosition}/>}
    </div>
    </>
  )
}

export default App
