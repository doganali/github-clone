/**
 * DashboardPage Component
 *
 * This file defines the DashboardPage component which acts as the landing page of the application.
 * It includes a search bar that users can use to search for GitHub repositories or users.
 *
 * Usage:
 * ```jsx
 * <DashboardPage />
 * ```
 *
 * The DashboardPage leverages the SearchBar component to capture user input and the Image component
 * to display the GitHub logo.
 *
 * Upon entering a search term, the application will navigate to the `/results` route, passing the
 * search term in the navigation state for subsequent API calls.
 */

import React, { useState } from 'react';
import SearchBar from '../../design-system/components/SearchBar';
import Image from '../../design-system/components/Image';
import githubLogo from '../../assets/github-mark.png';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    let navigate = useNavigate();

    /**
     * Updates the searchQuery state with the new value from the search bar.
     *
     * @param {string} newValue - The current value of the search input field.
     */
    const handleSearchChange = (newValue: string) => {
        setSearchQuery(newValue);
        // Potential improvement: Add debounce to optimize performance during rapid input.
    };

    /**
     * Handles the search operation when the user initiates a search.
     * It navigates to the `/results` route with the current search query.
     */
    const handleSearch = async () => {
        navigate('/results', { state: { searchQuery } });
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
                    onSearch={handleSearch}
                    placeholder="Search for repositories or users..."
                />
            </div>
        </div>
    );
};

export default DashboardPage;
