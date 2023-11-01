import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import DashboardPage from './app/dashboard/DashboardPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Define your Route to DashboardPage */}
                <Route path="/dashboard" element={<DashboardPage/>}/>

                {/* Other routes defined here */}
                {/* <Route path="/other" element={<OtherComponent />} /> */}

                <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
