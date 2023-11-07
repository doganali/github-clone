
import React from "react";

interface FilterOptionProps {
    name: string;
    count: number;
    selected: boolean;
    onSelect: () => void;
}

export const FilterOption: React.FC<FilterOptionProps> = ({ name, count, selected, onSelect }) => {
    const optionStyle = {
        padding: '12px',
        paddingLeft: selected ? '8px' : '12px',
        cursor: 'pointer',
        backgroundColor: selected ? '#e0e0e0' : 'transparent',
        borderLeft: selected ? '4px solid blue' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    };

    const countStyle = {
        borderRadius: '50%',
        backgroundColor: '#A9A9A9',
        color: 'white',
        minWidth: '16px',
        minHeight: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.7rem',
        padding: '4px',
    };

    return (
        <div style={optionStyle} onClick={onSelect}>
            {name}
            <span style={countStyle}>{count}</span>
        </div>
    );
};

export default FilterOption;
