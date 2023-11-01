import React, {useState} from 'react';
import SearchBar from '../../design-system/components/SearchBar';
import Image from '../../design-system/components/Image';
import githubLogo from '../../assets/github-mark.png';
import {useNavigate} from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    let navigate = useNavigate();

    const handleSearchChange = (newValue: string) => {
        setSearchQuery(newValue);
        // Add debounce later?
    };

    const handleSearch = async () => {
        navigate('/results', {state: {searchQuery}});
    };

    return (
        <div style={{textAlign: 'center', padding: '50px'}}>
            <Image
                src={githubLogo}
                alt="GitHub Logo"
                style={{width: '250px', margin: '0 auto 30px'}}
            />
            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onSearch={() => handleSearch()}
                    placeholder="Search for repositories or users..."
                />
            </div>
        </div>
    );
};

export default DashboardPage;
