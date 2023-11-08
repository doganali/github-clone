import React, { useEffect, useState } from 'react';
import { GitHubUser } from '../../api/model/response/GithubUser';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../api/service/GithubService';
import UserDetailColumn from "./components/UserDetailColumn";
import RepositorySearchBar from "./components/UserRepositorySearchBar";
import UserTabs from "./components/UserTabs";

const UserProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUserData] = useState<GitHubUser | null>(null);
    const [repositories, setRepositories] = useState([]);

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

    const RepositoriesList = ({ reposUrl }: { reposUrl: string }) => {
        // carry this into tabs
        return <div>Repositories List Component</div>;
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: 'auto', display: 'flex', gap: '20px', padding: '20px' }}>
            <UserDetailColumn user={user} />
            {/*<div style={{width: '1px', backgroundColor: '#e1e4e8', marginRight: '20px'}}></div>*/}
            <div style={{ flex: 2 }}>
                <UserTabs reposUrl={user.repos_url} />
            </div>
        </div>
    );
};

export default UserProfilePage;
