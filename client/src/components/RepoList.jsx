import React from 'react';

const RepoList = ({ repos }) => {

  return (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <div>
      {repos.map((repo, idx) => {
        return (
          <div key={idx}>
            <p>Owner: {repo.owner_name}</p>
            <p>Repo Name: {repo.repo_name}</p>
            <p>Forks: {repo.forks}</p>
            <a href={repo.url}>Link to github</a>
            <hr></hr>
          </div>
        )
      })}
    </div>
  </div>
  )


}

export default RepoList;