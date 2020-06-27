import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Input } from './Input';

const PasswordInputWrapper = styled.div`
  display: flex;
  /* ~ div {
    margin-bottom: 8px;
  } */
`;

const PasswordInputStyled = styled(Input).attrs(props => ({
  type: 'password',
  placeholder: props.confirmPass ? 'confirm password' : 'password'
}))`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ToogleButton = styled.div`
  height: 40px;
  border: 1px solid gray;
  box-sizing: border-box;
  font-size: 0.9em;
  display: flex;
  padding: 8px;
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: #bfbdbc;
`;

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <PasswordInputWrapper>
        <PasswordInputStyled {...props} />
        <ToogleButton onClick={() => setShowPassword(s => !s)}>
          {showPassword ? 'Hide' : 'Show'}
        </ToogleButton>
      </PasswordInputWrapper>
      <div>{showPassword ? props.value : ''}</div>
    </>
  );
}
