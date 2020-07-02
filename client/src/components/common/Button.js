import styled from 'styled-components';

const Button = styled.button`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: ${props => props.deleteAccount ? null : '100%'};
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  cursor: pointer;
  color: gray;
  :focus {
    outline: none !important;
  }
  :hover{
    color: #AD4D2A;
  }
`;

export { Button };
