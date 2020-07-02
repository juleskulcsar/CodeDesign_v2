import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const RequiredText = styled.p`
  padding: 0 0 0 16px;
  margin: 0;
`;

const Paragraph = styled.p`
  color: ${props => (props.about ? 'white' : '#BFBDBC')};
  line-height: 1.6;
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
  color: #f16350;
  text-decoration: none;
  font-size: 1em;
  padding: 1px 16px 16px 16px;
  line-height: 1.6;
`;

const StyledDiv = styled.div`
  margin: 1.2rem 0;
`;

const ProfileTopDiv = styled.div`
  height: 175px;
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
  /* z-index: -1; */
`;

const Container = styled.div`
  color: white;
  padding: 5%;
  display: flex;
`;

const LeftContainer = styled.div`
  float: left;
  width: 100%;
  max-width: 200px;
  /* z-index: -1; */
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
  border-bottom: 1px solid gray;
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
  margin-left: 1em;
`;
const Anchor = styled.a`
  color: #f16350;
  margin: 0 0.5rem 0 0;
`;
const H4Styled = styled.h4`
  color: #bfbdbc;
  margin-top: 5px;
  font-size: 20px;

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
