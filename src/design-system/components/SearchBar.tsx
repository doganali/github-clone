import React, {KeyboardEvent} from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    onSearch: (searchValue: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange, onSearch, placeholder}) => {

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value)
        }
    }
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px 15px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
            }}
        />
    );
};

export default SearchBar;
