import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    let data = { username: term }
     return fetch('http://localhost:1128/api/repos', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status !== 201) {
        throw new Error ('Error fetching')
      }
      getRepos()
    }).catch((err) => {
      console.log('Error fetching')
    })
  }

  const getRepos = () => {
    return fetch('http://localhost:1128/api/repos', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      return data.json()
    }).then((res) => {
      setRepos(res)
    })
  }

  React.useEffect(() => {
    getRepos()
  }, [])

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));