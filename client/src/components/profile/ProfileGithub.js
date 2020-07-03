import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import { Anchor, H4Styled, Paragraph } from '../common/Edit-Create-Profile';

const GithubContainer = styled.div`
  :last-child {
    flex: 3;
    flex-basis: 20%;
  }
`;

const GithubRepo = styled.div`
  display: flex;
  border-bottom: 1px solid #55524e;
  > :first-child {
    flex: 7;
    flex-basis: 70%;
  }
`;

const GithubBadgeList = styled.li`
  padding: 0.1rem;
  text-align: center;
  margin: 0.3rem;
  color: #bfbdbc;
`;

const RepoTitle = styled.h4`
  color: #9c4526;
  margin-top: 5px;
  font-size: 20px;

  @media (max-width: 450px) {
    font-size: 1.5em;
  }
`;

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <GithubContainer>
      <H4Styled>Github repos</H4Styled>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map(repo => (
          <GithubRepo key={repo.id}>
            <div>
              <RepoTitle>
                <Anchor
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  reponame='true'
                >
                  {repo.name}
                </Anchor>
              </RepoTitle>
              <Paragraph>{repo.description}</Paragraph>
            </div>
            <div>
              <ul>
                <GithubBadgeList>
                  Stars:{' '}
                  <span
                    style={{
                      color: '#AD4D2A',
                      fontSize: '1,5em',
                      fontWeight: 'bold'
                    }}
                  >
                    {repo.stargazers_count}
                  </span>
                </GithubBadgeList>
                <GithubBadgeList>
                  Watchers:{' '}
                  <span
                    style={{
                      color: '#AD4D2A',
                      fontSize: '1,5em',
                      fontWeight: 'bold'
                    }}
                  >
                    {repo.watchers_count}
                  </span>
                </GithubBadgeList>
                <GithubBadgeList>
                  Forks:{' '}
                  <span
                    style={{
                      color: '#AD4D2A',
                      fontSize: '1,5em',
                      fontWeight: 'bold'
                    }}
                  >
                    {repo.forks_count}
                  </span>
                </GithubBadgeList>
              </ul>
            </div>
          </GithubRepo>
        ))
      )}
    </GithubContainer>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
