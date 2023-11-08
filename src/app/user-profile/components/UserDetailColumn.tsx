import React from 'react';
import {GitHubUser} from '../../../api/model/response/GithubUser';

interface UserDetailColumnProps {
    user: GitHubUser;
}

const UserDetailColumn: React.FC<UserDetailColumnProps> = ({user}) => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            paddingTop: '24px',
            paddingLeft: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        avatar: {
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            alignSelf: 'center'
        },
        followButton: {
            width: '100%',
            margin: '10px 0',
            padding: '10px',
            borderRadius: '20px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#9b9a9a',
            color: 'black'
        },
        statsRow: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '10px'
        },
        stat: {
            margin: '0 5px',
        },
        bullet: {
            margin: '0 5px',
            fontWeight: 'bold'
        },
        emailRow: {
            marginTop: '10px'
        }, userName: {
            marginBottom: '0em'
        },
        userLogin: {
            marginTop: '0em',
            color: '#808080',
        }
    };


    function mockFollowerCount() {
        return 42
    }

    function mockFollowingCount() {
        return 345;
    }

    return (
        <div style={styles.container}>
            <img src={user.avatar_url} alt={`${user.login} avatar`} style={styles.avatar}/>
            <h1 style={styles.userName}>{user.name || user.login}</h1>
            <p style={styles.userLogin}>{`@${user.login}`}</p>
            {user.bio && <p>{user.bio}</p>}
            <button style={styles.followButton}>Follow</button>
            <div style={styles.statsRow}>
                <span style={styles.stat}>{mockFollowerCount()} followers</span>
                <span style={styles.bullet}>&bull;</span>
                <span style={styles.stat}>{mockFollowingCount()} following</span>
            </div>
            {user.email && <p style={styles.emailRow}>{user.email}</p>}
        </div>
    );
};

export default UserDetailColumn;
