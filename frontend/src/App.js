import React from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  // Redirect,
  Navigate,
} from 'react-router-dom';
import LoginPage from './authPages/LoginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import Dashboard from './Dashboard/Dashboard';
import './App.css';
import AlertNotifications from './shared/components/AlertNotifications';

function App() {
  return (
    // React Fragments
    <>
      <Router>
        {/* If you are using react-router-dom v6 it looks like Switch has been replaced with Routes

 */}
        {/* Routes replaced Switch in v6 */}
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />

          {/* Redirect got removed from v6 */}
          {/* <Redirect to="/dashboard" /> */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
          {/* <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />}/>
           */}
        </Routes>
      </Router>
      <AlertNotifications />
    </>
  );
}

// Another thing we could do is enable rightClick (contextmenu) and detect it and do the same console.log
// Great feature for security
document.addEventListener('keydown', function (event) {
  if (event.key.startsWith('F1')) {
    console.log(
      '%c Hold Up!',
      'font-size: 5rem; color: #5865F2;  -webkit-text-stroke: 2px black;'
    );
  } else if (
    (event.ctrlKey && event.shiftKey && event.key === 'i') ||
    (event.ctrlKey && event.shiftKey && event.key === 'I')
  ) {
    console.log(
      '%c Hold Up!',
      'font-size: 5rem; color: #5865F2;  -webkit-text-stroke: 2px black;'
    );
  }
});

setInterval(() => {}, 5000);

export default App;
