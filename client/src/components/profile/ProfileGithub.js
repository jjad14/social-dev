import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRepositories } from '../../actions/profile';

const ProfileGithub = ({ username, getRepositories, repos }) => {
  useEffect(() => {
    getRepositories(username);
  }, [getRepositories, username]);
  
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map(repo => (
        <div key={repo.id} className="repo bg-white p-1 my-1 card">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary p-2 card">
                Stars: {repo.stargazers_count}
              </li>
              <li className="badge badge-dark p-2 card">
                Watchers: {repo.watchers_count}
              </li>
              <li className="badge badge-light p-2 card">
                Forks: {repo.forks_count}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getRepositories: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};
  
const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, { getRepositories })(ProfileGithub);