import React, {useEffect, useState} from 'react';
import {GitHubUser} from '../../api/model/response/GithubUser';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchUserData} from '../../api/service/GithubService';
import UserDetailColumn from "./components/UserDetailColumn";
import RepositorySearchBar from "./components/UserRepositorySearchBar";
import UserTabs from "./components/UserTabs";
import GithubNavbar from "../../design-system/components/Navbar";

const UserProfilePage: React.FC = () => {
    const {username} = useParams<{ username: string }>();
    const [user, setUserData] = useState<GitHubUser | null>(null);
    const [repositories, setRepositories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchTerm = (query: string) => {
        setSearchTerm(query);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

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

    useEffect(() => {
        if (username) {
            fetchUserData(username)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error(`Failed to fetch user data for ${username}:`, error);
                });
        }
    }, [username]);

    const executeSearch = async () => {
        navigate('/results', {state: {searchTerm}});
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <GithubNavbar
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTerm}
                onSearchExecute={executeSearch}
                onLogoClick={handleLogoClick}
            />
            <div style={{margin: 'auto', display: 'flex', gap: '20px', padding: '20px'}}>
                <UserDetailColumn user={user}/>
                {/*<div style={{width: '1px', backgroundColor: '#e1e4e8', marginRight: '20px'}}></div>*/}
                <div style={{flex: 2}}>
                    <UserTabs username={user.login} reposUrl={user.repos_url}/>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
