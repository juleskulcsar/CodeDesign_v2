import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Post from '../post/Post';
import '../profile-form/Portfolios.css';

const ProfilePosts = ({ profile: { profile, loading } }) => {
  return profile.posts === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <div>
          <div className='timeline-grid-container'>
            <div className='timeline-posts-list'>
              {profile.posts.map(post => (
                <Post
                  key={post._id}
                  post={post}
                  size={true}
                  showAction={true}
                  showD={false}
                />
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
};

ProfilePosts.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {})(ProfilePosts);
