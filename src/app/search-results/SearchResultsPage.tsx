import './SearchResultsPage.css';

import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {searchRepositories, searchUsers} from "../../api/service/GithubService";
import {GithubRepositoriesPayload} from "../../api/model/response/GithubRepository";
import {GithubUsersPayload} from "../../api/model/response/GithubUser";
import FilterOption from "../../design-system/components/FilterOption";
import ResultsList from "../../design-system/components/ResultsList";
import GithubNavbar from "../../design-system/components/Navbar";

/**
 * A component that displays the search results for repositories and users.
 * It allows users to filter the search results based on the category and
 * provides navigation to different parts of the application.
 */
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
    }, [location.state?.searchQuery]);

    /**
     * Executes the search for both repositories and users based on the searchTerm.
     */
    const executeSearch = () => {
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

    /**
     * Updates the searchTerm state when the search term is changed in the search bar.
     * @param {string} query - The new search term.
     */
    const handleSearchTerm = (query: string) => {
        setSearchTerm(query);
    };

    /**
     * Navigates to the home page when the GitHub logo is clicked.
     */
    const handleLogoClick = () => {
        navigate('/');
    };

    if (isLoading) {
        // Loading state needs a better UX implementation.
        // TODO: Implement skeleton screens for each result item.
        return <div>Loading results...</div>;
    }

    const repoCount = repoResults?.total_count || 0;
    const userCount = userResults?.total_count || 0;

    // Inline styles removed for readability and maintainability, not all pages followed this convention due to time constraints
    // Styles should be placed in CSS/SCSS files and applied using class names.

    return (
        <div>
            <GithubNavbar
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTerm}
                onSearchExecute={executeSearch}
                onLogoClick={handleLogoClick}
            />
            <div className="filter-and-results-container">
                <aside className="filters-section">
                    <h2>Filter By</h2>
                    <FilterOption
                        name="Repositories"
                        count={repoCount}
                        selected={filter === 'repositories'}
                        onSelect={() => setFilter('repositories')}
                    />
                    <FilterOption
                        name="Users"
                        count={userCount}
                        selected={filter === 'users'}
                        onSelect={() => setFilter('users')}
                    />
                </aside>
                <div className="results-divider"></div>
                <main className="results-section">
                    <h2>Results</h2>
                    {/* Conditional rendering based on the selected filter */}
                    <ResultsList items={filter === 'repositories' ?
                        (repoResults?.items.map(repo => ({
                            id: repo.id,
                            name: repo.full_name,
                            description: repo.description,
                            html_url: repo.html_url,
                            avatar_url: repo.owner.avatar_url
                        })) || []) :
                        (userResults?.items.map(user => ({
                            id: user.id,
                            name: user.login,
                            description: "",
                            html_url: user.html_url,
                            avatar_url: user.avatar_url
                        })) || [])
                    }
                    />
                </main>
            </div>
        </div>
    );
};

export default SearchResultsPage;
