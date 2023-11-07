import React from "react";
import {useNavigate} from "react-router-dom";

interface ResultItemProps {
    id: number;
    name: string;
    description: string;
    html_url: string;
    avatar_url: string;
}

export const ResultItem: React.FC<ResultItemProps> = ({
                                                          id,
                                                          name,
                                                          description,
                                                          html_url,
                                                          avatar_url,
                                                      }) => {


    const navigate = useNavigate(); // Hook for navigation

    const handleItemClick = () => {
        navigate(`/${name}`); // Navigate to user profile page when item is clicked
    };

    const itemStyle: React.CSSProperties = {
        padding: '16px',
        borderBottom: '1px solid #e1e4e8',
        display: 'flex',
        alignItems: 'center',
    };

    const avatarStyle: React.CSSProperties = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        marginRight: '16px',
    };

    const titleStyle: React.CSSProperties = {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#0366d6',
    };

    const descriptionStyle: React.CSSProperties = {
        fontSize: '14px',
        color: '#586069',
        marginTop: '4px',
    };

    return (
        <div style={itemStyle}>
            <img src={avatar_url} alt={`${name} avatar`} style={avatarStyle} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <button onClick={handleItemClick} style={{...titleStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                    {name}
                </button>
                <div style={descriptionStyle}>{description}</div>
            </div>
        </div>
    );

};

export default ResultItem;
