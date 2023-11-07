import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import DashboardPage from './app/dashboard/DashboardPage';
import SearchResultsPage from './app/search-results/SearchResultsPage';
import UserProfilePage from "./app/user-profile/UserProfilePage";


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Define your Route to DashboardPage */}
                <Route path="/dashboard" element={<DashboardPage/>}/>

                <Route path="/results" element={<SearchResultsPage/>} />

                <Route path="/:username" element={<UserProfilePage />} />

                <Route path="/" element={<Navigate replace to="/dashboard"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
