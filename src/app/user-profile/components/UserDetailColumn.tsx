import React from 'react';
import { GitHubUser } from '../../../api/model/response/GithubUser';

interface UserDetailColumnProps {
    user: GitHubUser;
}

const UserDetailColumn: React.FC<UserDetailColumnProps> = ({ user }) => {
    return (
        <div style={{ flex: 1 }}>
            <img src={user.avatar_url} alt={`${user.login} avatar`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h1>{user.name || user.login}</h1>
            <p>{`@${user.login}`}</p>
            <p>{user.bio}</p>
            <button style={{ margin: '10px 0' }}>Follow</button>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{user.followers_url.length} Followers</span>
                <span>{user.following_url.length} Following</span>
                <span>Stars</span>
            </div>
            <p>{user.email}</p>
        </div>
    );
};

export default UserDetailColumn;
