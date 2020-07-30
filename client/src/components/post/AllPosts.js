import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { SwitchLabel, Slider, CheckBoxInput } from '../common/CheckBox';
import {
    LeftContainer,
    RightContainer,
    Paragraph
} from '../common/Edit-Create-Profile';
import { StyledFiltersList, StyledFiltersUl } from '../common/Filters'

const PostsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1em;
  `;

const AllPostsContainer = styled.div`
  position: relative;
  top: 5em;
  width: 75%;
  margin: 0 auto;
  color: white;
  /* padding: 5%; */
  display: flex; 
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  position: relative;
  top: 3em;
  text-align: center;
`
const PageTitle = styled.h1`
  display: inline-block;
  font-size: 2em;
  color: #EFEEED;
`

const AllPosts = ({
    getPosts,
    post: { posts, loading },
}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    console.log('posts: ', posts)

    return posts.length === 0 ? (
        <Spinner />
    ) : (
            <Fragment>
                <TitleWrapper>
                    <PageTitle>Browse Code<span style={{ color: '#F16350' }}>D</span>esign community <span style={{ color: '#F16350' }}>posts</span>!</PageTitle>
                </TitleWrapper>
                <AllPostsContainer>
                    <LeftContainer filters={true}>
                        <StyledFiltersUl>
                            <StyledFiltersList>
                                <Paragraph filters={true}>remote </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                    />
                                    <Slider
                                        round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>on location </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                    />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>design </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                    />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>development </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                    />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                        </StyledFiltersUl>
                    </LeftContainer>
                    <RightContainer>
                        <PostsList>
                            {posts.map(post => (
                                <PostItem
                                    key={post._id}
                                    post={post}
                                    size={true}
                                    showAction={true}
                                    showD={false}
                                />
                            ))}
                        </PostsList>
                    </RightContainer>
                </AllPostsContainer>
            </Fragment>
        );
};

AllPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    posts: state.posts,
    profiles: state.profiles,
    auth: state.auth
});
export default connect(mapStateToProps, {
    getPosts
})(AllPosts);
