import axios, { AxiosError } from 'axios';
import { IGithubRepository } from '../types/interfaces';
import { GetRepository, ListIssues } from '../types/types';

export default class GithubService {

    baseURL: string;

    constructor()
    {
        this.baseURL = "https://api.github.com";
    }

    getRepo: GetRepository = async (searchKey: string) => {
      try 
      {
        const response = await axios.get(`${this.baseURL}/repos/${searchKey}`);
        return response.data;
      } 
      catch (error) 
      {
        if(error instanceof AxiosError)
        {
          if(error.response?.status === 404){
            return null;
          }
        }
        throw error;
      }
    }

    listIssues: ListIssues = async (searchKey: string, per_page: number, page: number, field: string, direction: string) => {
      try 
      {
        const response = await axios.get(`${this.baseURL}/repos/${searchKey}/issues?sort=${field}&direction=${direction}&per_page=${per_page}&page=${page}`);
        return response.data;
      } 
      catch (error) 
      {
        throw error
      }
    }
}