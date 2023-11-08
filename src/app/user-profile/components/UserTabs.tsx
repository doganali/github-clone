import React, { useState } from 'react';
import {HiOutlineBookOpen} from "react-icons/hi";
import {RiGitRepositoryLine} from "react-icons/ri";
import {IoStatsChartOutline} from "react-icons/io5";

// import RepositorySearchBar from "./UserRepositorySearchBar";

interface UserTabsProps {
    reposUrl: string;
}

const UserTabs: React.FC<UserTabsProps> = ({ reposUrl }) => {
    const [activeTab, setActiveTab] = useState('repositories');
    const [hoverTab, setHoverTab] = useState<string | null>(null);

    const icons = {
        overview: <HiOutlineBookOpen />,
        repositories: <RiGitRepositoryLine />,
        projects: <IoStatsChartOutline />,
    };

    const tabContainerStyle = {
        display: 'flex',
        borderBottom: '1px solid #ddd',
        paddingLeft: '16px',
        paddingTop:'8px',
    };

    const tabStyle = (tabName: string) => ({
        padding: '10px 20px',
        cursor: 'pointer',
        borderBottom: activeTab === tabName ? '2px solid orange' : 'none',
        fontWeight: activeTab === tabName ? 'bold' : 'normal',
        maxWidth: '150px',
        backgroundColor: hoverTab === tabName && activeTab !== tabName ? '#f5f5f5' : 'transparent',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    });

    return (
        <div>
            <div style={tabContainerStyle}>
                {Object.entries(icons).map(([tabName, icon]) => (
                    <div
                        key={tabName}
                        style={tabStyle(tabName)}
                        onClick={() => setActiveTab(tabName)}
                        onMouseEnter={() => setHoverTab(tabName)}
                        onMouseLeave={() => setHoverTab(null)}
                    >
                        {icon} {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                    </div>
                ))}
            </div>
            <div>
                {/* Tab content */}
            </div>
        </div>
    );
};

export default UserTabs;