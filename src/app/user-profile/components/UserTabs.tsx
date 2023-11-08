import React, {useCallback, useState} from 'react';
import {HiOutlineBookOpen} from "react-icons/hi";
import {RiGitRepositoryLine} from "react-icons/ri";
import {IoStatsChartOutline} from "react-icons/io5";

import RepositorySearchBar from "./UserRepositorySearchBar";
import {GithubRepositoriesPayload} from "../../../api/model/response/GithubRepository";
import ResultsList from "../../../design-system/components/ResultsList";

interface UserTabsProps {
    username:string,
    reposUrl: string;
}

const UserTabs: React.FC<UserTabsProps> = ({username, reposUrl}) => {
    const [activeTab, setActiveTab] = useState('repositories');
    const [hoverTab, setHoverTab] = useState<string | null>(null);
    const [reposSearchResults, setReposSearchResults] = useState<GithubRepositoriesPayload | null>(null);

    const icons = {
        overview: <HiOutlineBookOpen/>,
        repositories: <RiGitRepositoryLine/>,
        projects: <IoStatsChartOutline/>,
    };

    const tabContainerStyle = {
        display: 'flex',
        borderBottom: '1px solid #ddd',
        paddingLeft: '16px',
        paddingTop: '8px',
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

    const handleSearch = useCallback((results: GithubRepositoriesPayload) => {
        setReposSearchResults(results);
    }, []);

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
                {activeTab === 'repositories' && (
                    <div>
                        <RepositorySearchBar username={username} reposUrl={reposUrl} onSearch={handleSearch}/>
                        <ResultsList items= {
                            reposSearchResults?.items.map(repo => ({
                                id: repo.id,
                                name: repo.full_name,
                                description: repo.description,
                                html_url: repo.html_url,
                                avatar_url: repo.owner.avatar_url
                            })
                        ) || []}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTabs;