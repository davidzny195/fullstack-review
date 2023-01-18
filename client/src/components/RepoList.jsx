import React from 'react';

const RepoList = ({ repos }) => {

  console.log(repos)
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
            <a href={repo.url}>Link to github</a>
            <hr></hr>
          </div>
        )
      })}
    </div>
  </div>
  )


}

// {repos.map((repo) =>
//   Object.keys(repo).map((key, idx) => {
//   return (
// <div key={idx}>
//   {key !== 'url' ? <div> {key} : {repo[key]}</div> : <a href={repo[key]}>{repo[key]}</a>}
//   </div>
//  )
// })
// )}

export default RepoList;