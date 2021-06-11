import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addPostSave, removePostSave } from '../../actions/post';
import { Button } from '../common/Button';
import { getSavesById } from '../../actions/reactions';

const ActionsDiv = styled.div`
    display: flex;
    width: 10em;
`;

const Saves = ({
    addPostSave,
    removePostSave,
    auth,
    showActions,
    getSavesById,
    reaction: { saves },
    id
}) => {
    useEffect(() => {
        getSavesById(id);
    }, [saves]);

    const saving = saves.filter(save => save.user === auth.user._id);

    return (
        <>
            <ActionsDiv>
                {showActions && (
                    <Fragment>
                        {saving.length > 0 ? (
                            <Button
                                bttnLight={true}
                                onClick={e => removePostSave(id)}
                            >
                                <i className='fas fa-thumbs-up'></i>{' '}
                                <span>
                                    {saves.length > 0 && (
                                        <span>{saves.length}</span>
                                    )}
                                </span>
                            </Button>
                        ) : (
                            <Button
                                bttnLight={true}
                                onClick={e => addPostSave(id)}
                            >
                                <i className='far fa-thumbs-up'></i>
                                <span>
                                    {saves.length > 0 && (
                                        <span>{saves.length}</span>
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

Saves.defaultProps = {
    showActions: true
};

Saves.propTypes = {
    auth: PropTypes.object.isRequired,
    addPostSave: PropTypes.func.isRequired,
    removePostSave: PropTypes.func.isRequired,
    reaction: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    reaction: state.reaction
});

export default connect(mapStateToProps, {
    addPostSave,
    removePostSave,
    getSavesById
})(Saves);
