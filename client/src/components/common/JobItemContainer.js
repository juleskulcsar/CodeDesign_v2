import styled, { css } from 'styled-components';

const JobItemContainer = styled.div`
  ${props =>
    props.details
      ? css`
          
        `
      : css`
          border-bottom: 1px solid #55524e;
          display: flex;
          margin-top: 2em;
          flex: 1;
        `}
  @media (max-width: 768px) {
    display: block;
  }
`;

const JobItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`;

const JobDescriptionDiv = styled.div`
  color: #bfbdbc;
  line-height: 1.6;
`;

const JobItemLeftContainer = styled.div`
  ${props =>
    props.details
      ? css`
          display: flex;
        `
      : css`
          justify-content: center;
          padding-right: 2em;
        `}
`;

const JobItemRightContainer = styled.div`
  width: 100%;
  padding-top: ${props => props.details ? '2em' : null};
`;

export {
  JobItemContainer,
  JobItemBottom,
  JobDescriptionDiv,
  JobItemLeftContainer,
  JobItemRightContainer
};
