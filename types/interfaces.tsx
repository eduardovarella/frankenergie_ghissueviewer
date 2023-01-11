export interface IGithubUser {
    login: string,
    avatar_url: string
}

export interface IGithubRepository {
    full_name: string,
    description: string,
    owner: IGithubUser
}

export interface IGithubIssue {
    title: string,
    body: string,
    user: IGithubUser,
    created_at: string
}