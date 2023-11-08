import React, {useCallback, useEffect, useState} from 'react';
import SearchBar from "../../../design-system/components/SearchBar";
import _ from 'lodash';
import {searchRepositories} from "../../../api/service/GithubService";
import {GithubRepositoriesPayload} from "../../../api/model/response/GithubRepository"; // Make sure to install lodash if not already

interface RepositorySearchBarProps {
    username: string;
    reposUrl: string;
    onSearch: (results: GithubRepositoriesPayload) => void;
}

const RepositorySearchBar: React.FC<RepositorySearchBarProps> = ({username, reposUrl, onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [languageFilter, setLanguageFilter] = useState('all');

    const debouncedSearch = useCallback(
        _.debounce((query: string) => {
            console.log('Search for:', query, 'with type:', typeFilter, 'and language:', languageFilter);

            searchRepositories(query, languageFilter, username)
                .then(data => {
                    onSearch(data); // Assuming the results are in data.items
                });
        }, 1000),
        [typeFilter, languageFilter] // Recreate the debounce function if these values change
    );

    useEffect(() => {
        debouncedSearch(searchTerm);

    }, [searchTerm, debouncedSearch]);

    useEffect(() => {
        if (searchTerm.length >= 3) {
            debouncedSearch(searchTerm);
        }
    }, [typeFilter, languageFilter, debouncedSearch]);

    return (
        <div style={{padding: '10px', display: 'flex', gap: '10px', alignItems: 'center'}}>
            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={debouncedSearch}
                placeholder="Search repositories..."
            />
            <select
                name="type"
                id="type-filter"
                style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                onChange={(e) => setTypeFilter(e.target.value)}
            >
                {/* Mock options for type */}
                <option value="all">All Types</option>
                <option value="forks">Forks</option>
                <option value="sources">Sources</option>
                <option value="archived">Archived</option>
                <option value="mirrors">Mirrors</option>
            </select>
            <select
                name="language"
                id="language-filter"
                style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
                onChange={(e) => setLanguageFilter(e.target.value)}
            >
                {/* Mock options for language */}
                <option value="all">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
                <option value="java">Java</option>
            </select>
        </div>
    );
};

export default RepositorySearchBar;
