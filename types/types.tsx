import { IGithubIssue, IGithubRepository } from "./interfaces";

export type GetRepository = (searchKey: string) => Promise<IGithubRepository>;

export type ListIssues = (searchKey: string, per_page: number, page: number, field: string, direction: string) => Promise<Array<IGithubIssue>>;