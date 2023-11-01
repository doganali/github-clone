import React, { useState } from 'react';
import SearchBar from '../../design-system/components/SearchBar';
import Image from '../../design-system/components/Image';
import githubLogo from '../../assets/github-mark.png';
import {searchRepositories, searchUsers } from "../../api/service/GithubService";
import {GithubRepositoriesPayload} from "../../api/model/response/GithubRepository";
import {GithubUsersPayload} from "../../api/model/response/GithubUser";
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [, setRepositorySearchResults] = useState<GithubRepositoriesPayload>();
    const [, setUserSearchResults] = useState<GithubUsersPayload>();
    let navigate = useNavigate();

    const handleSearchChange = (newValue: string) => {
        setSearchQuery(newValue);
        // Add debounce later?
    };

    const handleSearch = async (query: string) => {
        console.log('Searching for:', query);

        // TODO: add pagination later
        const [repoResults, userResults] = await Promise.all([
            searchRepositories(query),
            searchUsers(query)
        ]);

        console.log('Repository Search Results: ', repoResults);
        console.log('User Search Results: ', userResults);
        setRepositorySearchResults(repoResults);
        setUserSearchResults(userResults);
        navigate('/results', { state: { repoResults, userResults } });
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Image
                src={githubLogo}
                alt="GitHub Logo"
                style={{ width: '250px', margin: '0 auto 30px' }}
            />
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onSearch={() => handleSearch(searchQuery)}
                    placeholder="Search for repositories or users..."
                />
            </div>
        </div>
    );
};

export default DashboardPage;
