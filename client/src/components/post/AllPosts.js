import React, { Fragment, useEffect, useState } from 'react';
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
import { Form } from '../common/SignIn-SignUp';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { StyledFiltersList, StyledFiltersUl } from '../common/Filters'

const PostsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1em;
  `;

const AllPostsContainer = styled.div`
  position: relative;
  top: 5em;
  width: 85%;
  margin: 0 auto;
  color: white;
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

    // console.log('posts: ', posts)

    let filters = {}

    const [filterParams, setFilterparams] = useState(filters)

    const [designCheck, setDesignCheck] = useState(true)
    const [developmentCheck, setDevelopmentCheck] = useState(true)
    const [designChecked, setDesignChecked] = useState(false)
    const [developmentChecked, setDevelopmentChecked] = useState(false)
    const [formData, setFormData] = useState({
        technologies: ''
    });

    const {
        technologies
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const designClickHandler = () => {
        setDesignCheck(!designCheck)
        setDesignChecked(!designChecked)
        if (designCheck === true) {
            setDevelopmentCheck(true)
            setDevelopmentChecked(false)
            filters.profile.registeredAs = 'designer'
            setFilterparams(filters);
            getPosts(filters);
        } else {
            delete filters.jobField;
            setFilterparams(filters);
            getPosts(filters);
        }
    }

    const developmentClickHandler = () => {
        setDevelopmentCheck(!developmentCheck)
        setDevelopmentChecked(!developmentChecked)
        if (developmentCheck === true) {
            setDesignCheck(true)
            setDesignChecked(false)
            filters.jobField = 'development'
            setFilterparams(filters)
            getPosts(filters);
        } else {
            delete filters.jobField;
            setFilterparams(filters)
            getPosts(filters);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (technologies !== '') {
            filters.technologies = technologies;
            getPosts(filters);
        }
        else {
            getPosts(filters)
        }
        console.log('filters: ', filters)
    }

    return loading ? (
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
                                <Paragraph filters={true}>design </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                        checked={designChecked}
                                        onChange={designClickHandler} />
                                    />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <StyledFiltersList>
                                <Paragraph filters={true}>development </Paragraph>
                                <SwitchLabel>
                                    <CheckBoxInput
                                        type="checkbox"
                                        checked={developmentChecked}
                                        onChange={developmentClickHandler} />
                                    />
                                    <Slider round={true}></Slider>
                                </SwitchLabel>
                            </StyledFiltersList>
                            <Form onSubmit={e => onSubmit(e)} filters={true}>
                                <Input
                                    type='text'
                                    placeholder='eg: inDesign'
                                    name='technologies'
                                    value={technologies}
                                    onChange={e => onChange(e)}
                                />
                                <Button type='submit' value='search'>search</Button>
                            </Form>
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
            </Fragment >
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
