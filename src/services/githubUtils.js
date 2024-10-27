import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
export const fetchIssues = async (username, token) => {
    const response = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue+state:closed`, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    const data = await response.json();
    return data.items || []; // Retorna uma lista vazia se não houver issues
  };
  
  export const saveIssueToFirestore = async (issue, userId) => {
    await setDoc(doc(db, 'users', userId, 'issues', issue.id), issue);
  };
  