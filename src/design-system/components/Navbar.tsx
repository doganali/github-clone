// GithubNavbar.tsx

import React from 'react';
import SearchBar from "../../design-system/components/SearchBar";
import githubLogo from '../../assets/github-mark.png';

/**
 * Props for the GithubNavbar component.
 * @typedef {Object} GithubNavbarProps
 * @property {string} searchTerm - The current value of the search input.
 * @property {function} onSearchTermChange - Callback for search input changes.
 * @property {function} onSearchExecute - Callback for when the search is executed.
 * @property {function} onLogoClick - Callback for when the GitHub logo is clicked.
 */

/**
 * Represents a navigation bar with a search component for GitHub.
 *
 * The navigation bar contains the GitHub logo and a search bar component.
 * The GitHub logo is clickable and will execute the onLogoClick callback when clicked.
 * The search bar allows for user input and will execute the onSearchExecute callback when a search is initiated.
 *
 * @param {GithubNavbarProps} props - The props for the component.
 * @returns {React.FC} The React functional component.
 */

type GithubNavbarProps = {
    searchTerm: string;
    onSearchTermChange: (query: string) => void;
    onSearchExecute: () => void;
    onLogoClick: () => void;
};
const GithubNavbar: React.FC<GithubNavbarProps> = ({
                                                       searchTerm,
                                                       onSearchTermChange,
                                                       onSearchExecute,
                                                       onLogoClick
                                                   }) => {
    // Styles for the navigation bar container
    const navBarStyle = {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        padding: '0 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    // Styles for the GitHub logo image
    const logoStyle = {
        height: '30px',
        cursor: 'pointer',
    };

    // Render the navigation bar with a logo and search bar
    return (
        <nav style={navBarStyle}>
            <img
                src={githubLogo}
                alt="GitHub Logo"
                onClick={onLogoClick}
                style={logoStyle}
            />
            <SearchBar
                value={searchTerm}
                onChange={onSearchTermChange}
                onSearch={onSearchExecute}
                placeholder="Search..."
            />
        </nav>
    );
};

export default GithubNavbar;
