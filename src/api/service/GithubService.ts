import {GithubUsersPayload} from "../model/response/GithubUser";
import {GithubRepositoriesPayload} from "../model/response/GithubRepository";

const GITHUB_REPOSITORIES_API_URL = 'https://api.github.com/search/repositories';
const GITHUB_USERS_API_URL = 'https://api.github.com/search/users';

// TODO: Implement authentication? works without it somehow?

export const searchRepositories = async (
    query: string,
    sort: string = 'stars',
    order: 'asc' | 'desc' = 'desc',
    page: number = 1,
    perPage: number = 30
): Promise<GithubRepositoriesPayload> => {


    const queryParams = new URLSearchParams({
        q: query,
        sort,
        order,
        page: page.toString(),
        per_page: perPage.toString(),
    });

    const response = await fetch(`${GITHUB_REPOSITORIES_API_URL}?${queryParams}`, {
        headers: {
            Accept: 'application/vnd.github+json'
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub repositories API responded with status ${response.status}`);
    }

    return await response.json();
};

export const searchUsers = async (
    query: string,
    sort: string = 'best match',
    order: 'asc' | 'desc' = 'desc',
    page: number = 1,
    perPage: number = 30
): Promise<GithubUsersPayload> => {
    const queryParams = new URLSearchParams({
        q: query,
        sort,
        order,
        page: page.toString(),
        per_page: perPage.toString(),
    });

    const response = await fetch(`${GITHUB_USERS_API_URL}?${queryParams}`, {
        headers: {
            Accept: 'application/vnd.github.v3.text-match+json',
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub users API responded with status ${response.status}`);
    }

    return await response.json();
};
