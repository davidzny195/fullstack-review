import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [users, setUsers] = useState([])

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
      const users = res.map((item) => ({ username: item.owner_name, url: item.owner_url  })).filter((v, i, a) => a.findIndex(v2 => (v2.username === v.username)) === i)

      setUsers(users)
      setRepos(res)
    })
  }

  React.useEffect(() => {
    getRepos()
  }, [])

  const styles = {

  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <div style={{ 'display': 'flex', 'justifyContent': 'space-between'}}>
        <div style={{ 'width': '80%' }}>
          <RepoList repos={repos}/>
        </div>
        <div style={{ 'width': '20%', 'paddingLeft': '30px' }}>
          <UserList users={users}/>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));