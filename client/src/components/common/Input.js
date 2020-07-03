import styled from 'styled-components';

const Input = styled.input`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  /* color: #bfbdbc; */
  color: ${props => (props.submitProfile ? '#F16350' : '#bfbdbc')};
  cursor: ${props => (props.submitProfile ? 'pointer' : 'default')};
  :focus {
    outline: none !important;
  }
  :hover {
    background: ${props => (props.submitProfile ? '#34170d' : null)};
  }
`;

export { Input };
