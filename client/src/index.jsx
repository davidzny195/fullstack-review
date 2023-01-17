import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = async (term) => {
    const res = await fetch('http://127.0.0.1:3000/repos', {
      method: "POST",
      headers: {
        'Content-Type': 'text/plain' //'application/json'
      },
      body: JSON.stringify(term)
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));