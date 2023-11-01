import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {searchRepositories, searchUsers} from "../../api/service/GithubService";
import {GithubRepositoriesPayload} from "../../api/model/response/GithubRepository";
import {GithubUsersPayload} from "../../api/model/response/GithubUser";

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const [repoResults, setRepoResults] = useState<GithubRepositoriesPayload>();
    const [userResults, setUserResults] = useState<GithubUsersPayload>();
    const [isLoading, setIsLoading] = useState(true);

    const searchTerm = location.state.searchQuery;

    useEffect(() => {
        console.log('searching: ', searchTerm)
        if (searchTerm) {
            setIsLoading(true);
            Promise.all([
                searchRepositories(searchTerm),
                searchUsers(searchTerm),
            ]).then(([repoResponse, userResponse]) => {
                setRepoResults(repoResponse);
                setUserResults(userResponse);
                setIsLoading(false);
            });
        }
    }, [searchTerm]);

    if (isLoading) {
        // TODO: implement a loading UI
        return <div>Loading results...</div>;
    }

    return (
        <div>
            <h1>Repository Results</h1>
            <ul>
                {repoResults?.items.map(repo => (
                    <li key={repo.id}>{repo.full_name}</li>
                ))}
            </ul>

            <h1>User Results</h1>
            <ul>
                {userResults?.items.map(user => (
                    <li key={user.id}>{user.login}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsPage;
