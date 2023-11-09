import {GitHubUser, GithubUsersPayload} from "../model/response/GithubUser";
import {GithubRepositoriesPayload} from "../model/response/GithubRepository";

const GITHUB_REPOSITORIES_API_URL = 'https://api.github.com/search/repositories';
const GITHUB_USERS_SEARCH_API_URL = 'https://api.github.com/search/users';
const GITHUB_USERS_API_URL = 'https://api.github.com/users';


// TODO: Implement authentication? it works for now (when you already logged in the browser..)

export const searchRepositories = async (
    query: string,
    language?: string,
    user?: string,
    type?: string, // is not used at the moment
    sort: string = 'stars',
    order: 'asc' | 'desc' = 'desc',
    page: number = 1,
    perPage: number = 30,
): Promise<GithubRepositoriesPayload> => {

    let queryString =`q=${query}`;

    if (user) {
        queryString += encodeURIComponent(` user:${user}`)
    }

    if (language) {
        queryString += encodeURIComponent(` language:${language}`)
    }
    console.log(`encoded: ${queryString}`)
    // const queryParams = new URLSearchParams({
    //     q: queryString,
    //     sort,
    //     order,
    //     page: page.toString(),
    //     per_page: perPage.toString(),
    // });

    // console.log(`Fetching: ${GITHUB_REPOSITORIES_API_URL}?${queryParams}`);
    const response = await fetch(`${GITHUB_REPOSITORIES_API_URL}?${queryString}`, {
        headers: {
            Accept: 'application/vnd.github+json'
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub repositories API responded with status ${response.status}`);
    }

    const result: GithubRepositoriesPayload = await response.json();
    console.log(`results: ${result.items.length}`)
    return result
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

    const response = await fetch(`${GITHUB_USERS_SEARCH_API_URL}?${queryParams}`, {
        headers: {
            Accept: 'application/vnd.github.v3.text-match+json',
        },
    });

    if (!response.ok) {
        throw new Error(`GitHub users API responded with status ${response.status}`);
    }

    return await response.json();
};

export const fetchUserData = async (username: string): Promise<GitHubUser | null> => {
    const headers = new Headers({
        'Accept': 'application/vnd.github+json',
        // 'Authorization': `Bearer ${token}`,
    });

    const response = await fetch(`${GITHUB_USERS_API_URL}/${username}`, {headers});

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
};