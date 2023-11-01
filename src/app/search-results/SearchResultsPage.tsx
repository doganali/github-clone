import React from 'react';
import {useLocation} from 'react-router-dom';
import {GithubRepositoriesPayload} from "../../api/model/response/GithubRepository";
import {GithubUsersPayload} from "../../api/model/response/GithubUser";

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as {
        repoResults: GithubRepositoriesPayload;
        userResults: GithubUsersPayload;
    };

    const repoResults = state.repoResults
    const userResults = state.userResults

    return (
        <div>
            <h1>Repository Results</h1>
            <ul>
                {repoResults.items.map((repo) => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.full_name}
                        </a>
                        - Stars: {repo.stargazers_count}
                    </li>
                ))}
            </ul>
            <h1>User Results</h1>
            <ul>
                {userResults.items.map((user) => (
                    <li key={user.id}>
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            {user.login}
                        </a>
                        - Followers: {user.followers_url.length}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsPage;
