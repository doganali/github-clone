// GithubNavbar.tsx
import React from 'react';
import SearchBar from "../../design-system/components/SearchBar";
import githubLogo from '../../assets/github-mark.png';

type GithubNavbarProps = {
    searchTerm: string;
    onSearchTermChange: (query: string) => void;
    onSearchExecute: () => void;
    onLogoClick: () => void;
};

const GithubNavbar: React.FC<GithubNavbarProps> = ({ searchTerm, onSearchTermChange, onSearchExecute, onLogoClick }) => {
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

    return (
        <nav style={navBarStyle}>
            <img src={githubLogo} alt="Logo" onClick={onLogoClick} style={logoStyle} />
            <SearchBar value={searchTerm} onChange={onSearchTermChange} onSearch={onSearchExecute} placeholder="Search..." />
        </nav>
    );
};

export default GithubNavbar;
