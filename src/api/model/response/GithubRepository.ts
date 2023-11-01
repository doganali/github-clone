
export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        id: number;
    };
    private: boolean;
    html_url: string;
    description: string;
    stargazers_count:number;
}

export interface GithubRepositoriesPayload {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepository[];
}



