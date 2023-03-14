import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserView from '../src/views/Users';
import ClassView from '../src/views/Classes';
import RegView from '../src/views/Registration';
import CcView from '../src/views/CC';
import picture from '../src/images/Fancy.png'

function App() {
  const appStyle = {
    backgroundImage: `url(${picture})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    margin: 0,
    fontSize: "1.2rem",
    color: "white",
    
  };

  const mainStyle = {
    height: 'calc(100vh)', // subtract the height of the nav bar
    overflow: 'auto',
    padding: '200px'
  };

  return (
    <Router>
      <div style={appStyle}>
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: 'black', height: '3rem' }}>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <li style={{ display: 'inline-block', marginRight: '1rem' }}>
      <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}>Users</Link>
    </li>
    <li style={{ display: 'inline-block', marginRight: '1rem' }}>
      <Link to="/classes" style={{ textDecoration: 'none', color: 'white' }}>Classes</Link>
    </li>
    <li style={{ display: 'inline-block', marginRight: '1rem'}}>
      <Link to="/registration" style={{ textDecoration: 'none', color: 'white' }}>Registration</Link>
    </li>
    <li style={{ display: 'inline-block' }}>
      <Link to="/cc" style={{ textDecoration: 'none', color: 'white' }}>CC</Link>
    </li>
  </ul>
</nav>

        <main style={mainStyle}>
          <Routes>
            <Route path="/users" element={<UserView />} />
            <Route path="/classes" element={<ClassView />} />
            <Route path="/registration" element={<RegView />} />
            <Route path="/cc" element={<CcView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;