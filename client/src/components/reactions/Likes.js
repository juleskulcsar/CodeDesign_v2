import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addPostLike, removePostLike } from '../../actions/post';
import { Button } from '../common/Button';
import { getLikesById } from '../../actions/reactions';

const ActionsDiv = styled.div`
    display: flex;
    width: 10em;
`;

const Likes = ({
    addPostLike,
    removePostLike,
    auth,
    showActions,
    getLikesById,
    reaction: { likes },
    id
}) => {
    useEffect(() => {
        getLikesById(id);
    }, [likes]);

    const liking = likes.filter(like => like.user === auth.user._id);

    return (
        <>
            <ActionsDiv>
                {showActions && (
                    <Fragment>
                        {liking.length > 0 ? (
                            <Button
                                bttnLight={true}
                                onClick={e => removePostLike(id)}
                            >
                                <i className='fas fa-thumbs-up'></i>{' '}
                                <span>
                                    {likes.length > 0 && (
                                        <span>{likes.length}</span>
                                    )}
                                </span>
                            </Button>
                        ) : (
                            <Button
                                bttnLight={true}
                                onClick={e => addPostLike(id)}
                            >
                                <i className='far fa-thumbs-up'></i>
                                <span>
                                    {likes.length > 0 && (
                                        <span>{likes.length}</span>
                                    )}
                                </span>
                            </Button>
                        )}
                    </Fragment>
                )}
            </ActionsDiv>
        </>
    );
};

Likes.defaultProps = {
    showActions: true
};

Likes.propTypes = {
    auth: PropTypes.object.isRequired,
    addPostLike: PropTypes.func.isRequired,
    removePostLike: PropTypes.func.isRequired,
    reaction: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    reaction: state.reaction
});

export default connect(mapStateToProps, {
    addPostLike,
    removePostLike,
    getLikesById
})(Likes);
