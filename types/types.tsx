import { IGithubIssue, IGithubRepository } from "./interfaces";

export type GetRepository = (searchKey: string) => Promise<IGithubRepository>;

export type ListIssues = (ssearchKey: string, per_page: number, page: number) => Promise<Array<IGithubIssue>>;