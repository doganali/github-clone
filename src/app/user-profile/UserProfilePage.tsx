import React, {useEffect, useState} from 'react';
import { GitHubUser } from "../../api/model/response/GithubUser";
import {useLocation, useParams} from "react-router-dom";


const UserProfilePage: React.FC = () => {
    const { username } = useParams();
    const [user, setUserData] = useState<GitHubUser | null>(null);

    useEffect(() => {
        if (username) {
            // fetchUserData(username)
            //     .then(data => {
            //         setUserData(data);
            //     })
            //     .catch(error => {
            //         // Handle the error case
            //         console.error('Failed to fetch user data:', error);
            //     });
        }
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <section style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
                <img src={user.avatar_url} alt={user.login} style={{ width: '100px', borderRadius: '50%' }} />
                <div>
                    <h1>{user.login}</h1>
                    <p>{user.type}</p>
                    {/* Additional user info like followers, following, etc. */}
                </div>
            </section>
            <section>
                <h2>Repositories</h2>
                {/* The repositories list would be a separate component that takes user.repos_url as a prop */}
            </section>
        </div>
    );
};

export default UserProfilePage;
