import { useState } from 'react';
import { IGithubIssue } from "../types/interfaces";
import styles from '../styles/Home.module.css'
import moment from 'moment';

export interface IssueCardProps {
    issue: IGithubIssue
}

export default function IssueCard(props: IssueCardProps){

    const [showBody, setShowBody] = useState<boolean>(false);
    return <div className={styles.issue} onClick={() => setShowBody(!showBody)}>
    <p>
      <span><b>{ moment(props.issue.created_at).format("YYYY-MM-DD, HH:mm")} - {props.issue.user.login}:</b> {props.issue.title} ({props.issue.comments} comments)</span>
      { showBody && <div dangerouslySetInnerHTML={{__html: props.issue.body.split("\n").join("<br/>")}}></div>}
    </p>
    </div>
  }