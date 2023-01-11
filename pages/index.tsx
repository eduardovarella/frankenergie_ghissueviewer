import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

import GithubService from '../services/GithubService'
import { IGithubIssue, IGithubRepository } from '../types/interfaces';
import IssueCard from '../components/IssueCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false);
  const [repositorySearchKey, setRepositorySearchKey] = useState<string>("");
  const [repository, setRepository] = useState<IGithubRepository | undefined>(undefined);
  const [issues, setIssues] = useState<Array<IGithubIssue> | undefined>(undefined);

  const [page, setPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>("created");
  const [sortDirection, setSortDirection] = useState<string>("desc");

  const service = new GithubService();
  
  const searchRepository = async () => {
    
    setLoading(true);
    setRepository(undefined);
    setIssues(undefined);

    const _repo = await service.getRepo(repositorySearchKey);
    if(_repo){
      setRepository(_repo);
      setPage(0);
      setIssues(await getIssues(0, sortField, sortDirection));
    }
    else {
      alert("Repository not found")
    }
    
    setLoading(false);
    
  }

  const updateSort = async (field: string, direction: string) => {

    setLoading(true);
    setPage(0);
    setSortField(field);
    setSortDirection(direction);
    setIssues(await getIssues(0, field, direction));
    setLoading(false);

  }

  const getIssues = async (p: number, field: string, direction: string) => {
    return await service.listIssues(repositorySearchKey, 15, p, field, direction);
  }

  const onScroll = async () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      const _issues = (issues || []).concat(await getIssues(page + 1, sortField, sortDirection));
      setIssues(_issues);
      setPage(page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [issues]);

  return (
    <>
      <Head>
        <title>Frank Energie Assessment - Eduardo Varella</title>
        <meta name="description" content="Frank Energie Assessment - Eduardo Varella" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.search}>
            <p>Please input repository name:</p>            
            <input type={"text"} value={repositorySearchKey} onChange={(e) => setRepositorySearchKey(e.target.value)}/>
            <input disabled={repositorySearchKey === ""} type={"button"} value="Go" onClick={searchRepository}/>
        </div>

        { loading && <div className={styles.search}><p>Loading...</p></div> }
        
        { !loading && repository && 
          <>
          <div className={styles.repo}>
            <h2>Repo Info</h2>
            <div className={styles.reponame}>{repository.full_name}</div>
            <div className={styles.repodescription}>{repository.description}</div>
            <div className={styles.repoowner}>
              <div style={{ background: `url('${repository.owner?.avatar_url}')`}}></div>
              <div>{repository.owner?.login}</div>
            </div>
          </div>
          </>
        }

        { !loading && issues && 
          <>
          <div className={styles.issues}>
          <div className={styles.issuesheader}>
                <div>
                  <h2>Repo Issues</h2>
                  { issues.length === 0 ? <span>No issues found</span> : <span>(click on an issue to see details)</span> }
                </div>
                <div>
                  Sort by:&nbsp;
                  <select value={sortField} onChange={(e) => updateSort(e.target.value, sortDirection)}>
                    <option value="created">created</option>
                    <option value="comments">comments</option>
                  </select>
                  <select value={sortDirection} onChange={(e) => updateSort(sortField, e.target.value)}>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                  </select>
                </div>
              </div>
              { issues.map(issue => <IssueCard key={issue.id} issue={issue}/>) }
          </div>
          </>
        }
      </main>
    </>
  )
}
