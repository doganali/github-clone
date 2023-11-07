// ResultsList.tsx
import React from "react";
import { ResultItem } from "./ResultItem"; // Import the ResultItem component

// Define the Item type
export interface Item {
    id: number;
    name: string;
    description: string;
    html_url: string;
    avatar_url:string;
}

interface ResultsListProps {
    items: Item[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ items }) => {
    return (
            <div>
                {items.map(item => (
                    <ResultItem
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        html_url={item.html_url}
                        avatar_url={item.avatar_url}
                     id={item.id}/>
                ))}
            </div>
    );
};

export default ResultsList;
