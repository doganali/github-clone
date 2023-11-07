import React, { useState } from 'react';
import RepositorySearchBar from "./UserRepositorySearchBar";

interface UserTabsProps {
    reposUrl: string;
}

const UserTabs: React.FC<UserTabsProps> = ({ reposUrl }) => {
    const [activeTab, setActiveTab] = useState('repositories');

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button onClick={() => setActiveTab('overview')}>Overview</button>
                <button onClick={() => setActiveTab('repositories')}>Repositories</button>
                <button onClick={() => setActiveTab('projects')}>Projects</button>
            </div>
            <div>
                {activeTab === 'overview' && (
                    <div>
                        {/* Overview content */}
                    </div>
                )}
                {activeTab === 'repositories' && (
                    <div>
                        <RepositorySearchBar /* Pass needed props */ />
                        {/*<RepositoriesList reposUrl={reposUrl} />*/}
                        {/*use the same component with main search?*/}
                    </div>
                )}
                {activeTab === 'projects' && (
                    <div>
                        {/* Projects content */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTabs;
