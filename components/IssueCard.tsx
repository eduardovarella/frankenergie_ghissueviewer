import { useState } from 'react';
import { IGithubIssue } from "../types/interfaces";
import styles from '../styles/Home.module.css'

export interface IssueCardProps {
    issue: IGithubIssue
}

export default function IssueCard(props: IssueCardProps){

    const [showBody, setShowBody] = useState<boolean>(false);
    return <div className={styles.issue} onClick={() => setShowBody(!showBody)}>
    <p>
      <span>{props.issue.created_at} - {props.issue.user.login}: {props.issue.title}</span>
      { showBody && <div dangerouslySetInnerHTML={{__html: props.issue.body.split("\n").join("<br/>")}}></div>}
    </p>
    </div>
  }