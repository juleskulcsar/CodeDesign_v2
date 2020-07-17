import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const RequiredText = styled.p`
  padding: 0 0 0 16px;
  margin: 0;
`;

const Paragraph = styled.p`
  color: ${props => (props.about ? 'white' : '#BFBDBC')};
  line-height: 1.6;
  margin-top: ${props => props.details ? '0' : null};
`;

const StyledSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  color: #bfbdbc;
  :focus {
    outline: none !important;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  line-height: 1.6;
  ${props => props.details ? css`
    color: #AD4D2A;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 2em;
    /* border-bottom: 1px solid #BFBDBC; */
    width: fit-content;
    :hover {
      color: #BFBDBC;
    }
  `: css`
    color: #f16350;
    font-size: 1em;
    padding: 1px 16px 16px 16px;
  `}
`;

const StyledDiv = styled.div`
  margin: 1.2rem 0;
`;

const ProfileTopDiv = styled.div`
  /* height: 175px; */
  display: inline-block;
  ${props =>
    props.name
      ? css`
          vertical-align: top;
          padding-left: 5em;
        `
      : css``}
`;
const ProfileBottomDiv = styled.div`
  margin: 1em;
  position: relative;
  top: 1%;
`;

const Container = styled.div`
  color: white;
  padding: 5%;
  display: flex;
  width: 75%;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  float: left;
  width: 100%;
  max-width: 200px;
`;

const RightContainer = styled.div`
  width: 100%;
  padding-left: 5em;
  padding-top: 1em;
`;

const ProfileTop = styled.div`
  grid-area: top;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #55524e;
  /* border-bottom: 1px solid #682e19; */
  padding: 0.5em;
  z-index: 500;
`;
const RoundImage = styled.img`
  border-radius: 50%;
  border: 2px solid #f16350;
  object-fit: cover;
  width: 175px;
  height: 175px;
  padding: 2px;
  background: #8e8c89;
  margin-left: ${props => props.details ? '0' : '1em'};
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;
const Anchor = styled.a`
  color: ${props => (props.reponame ? '#9C4526' : '#f16350')};
  margin: 0 0.5rem 0 0;
  text-decoration: none;
  ${props =>
    props.reponame
      ? css`
          :hover {
            color: gray;
          }
        `
      : null}
`;
const H4Styled = styled.h2`
  color: #bfbdbc;
  margin-top: 5px;

  @media (max-width: 450px) {
    font-size: 1.5em;
  }
`;

export {
  RequiredText,
  StyledSelect,
  StyledLink,
  StyledDiv,
  ProfileTopDiv,
  ProfileBottomDiv,
  Container,
  LeftContainer,
  RightContainer,
  ProfileTop,
  RoundImage,
  Anchor,
  H4Styled,
  Paragraph
};
