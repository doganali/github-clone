import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {searchRepositories, searchUsers} from "../../api/service/GithubService";
import {GithubRepositoriesPayload} from "../../api/model/response/GithubRepository";
import {GithubUsersPayload} from "../../api/model/response/GithubUser";
import SearchBar from "../../design-system/components/SearchBar";
import githubLogo from '../../assets/github-mark.png';
import FilterOption from "../../design-system/components/FilterOption";
import ResultsList from "../../design-system/components/ResultsList";

const SearchResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [repoResults, setRepoResults] = useState<GithubRepositoriesPayload>();
    const [userResults, setUserResults] = useState<GithubUsersPayload>();
    const [filter, setFilter] = useState<'repositories' | 'users'>('repositories');
    const [isLoading, setIsLoading] = useState(true);

    const initialSearchTerm = location.state.searchQuery;

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        const searchQuery = location.state?.searchQuery || '';
        setSearchTerm(searchQuery);

        if (searchQuery) {
            executeSearch();
        } else {
            setIsLoading(false);
        }
    }, []);

    const executeSearch = () => {
        console.log('Executing search for:', searchTerm);
        setIsLoading(true);
        Promise.all([
            searchRepositories(searchTerm),
            searchUsers(searchTerm),
        ]).then(([repoResponse, userResponse]) => {
            setRepoResults(repoResponse);
            setUserResults(userResponse);
            setIsLoading(false);
        });
    };

    const handleSearchTerm = (query: string) => {
        setSearchTerm(query);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    if (isLoading) {
        // TODO: implement loading animation or smth. Do not load everything, put skeletion animations on list tiles
        return <div>Loading results...</div>;
    }

    const navBarStyle = {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        padding: '0 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };


    const logoStyle = {
        height: '30px',
        cursor: 'pointer',
    };

    const repoCount = repoResults?.total_count || 0;
    const userCount = userResults?.total_count || 0;

    return (
        <div>
            <nav style={navBarStyle}>
                <img src={githubLogo} alt="Logo" onClick={handleLogoClick} style={logoStyle}/>
                <SearchBar value={searchTerm} onChange={handleSearchTerm} onSearch={executeSearch}
                           placeholder="Search..."/>
            </nav>
            <div style={{display: 'flex'}}>
                {/* Filters section with a title */}
                <div style={{minWidth: '200px', marginRight: '20px'}}>
                    <h2 style={{ borderBottom: '1px solid #e1e4e8', padding: '8px', }}>Filter By</h2>
                    <FilterOption name="Repositories" count={repoCount} selected={filter === 'repositories'}
                                  onSelect={() => setFilter('repositories')}/>
                    <FilterOption name="Users" count={userCount} selected={filter === 'users'}
                                  onSelect={() => setFilter('users')}/>
                </div>
                <div style={{width: '1px', backgroundColor: '#e1e4e8', marginRight: '20px'}}></div>
                <div style={{flex: 1}}>
                    <h2 style={{ borderBottom: '1px solid #e1e4e8', padding: '8px' }}>Results</h2>
                    {filter === 'repositories' ? (
                        <ResultsList items={repoResults?.items.map(repo => ({
                                id: repo.id,
                                name: repo.name,
                                description: repo.description,
                                html_url: repo.html_url,
                                avatar_url: repo.owner.avatar_url
                            })
                        ) || []}/>
                    ) : (
                        <ResultsList items={userResults?.items.map(user => ({
                            id: user.id,
                            name: user.login,
                            description:  "",
                            html_url: user.html_url,
                            avatar_url: user.avatar_url
                        })) || []}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
