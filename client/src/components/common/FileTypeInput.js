import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';

const FileTypeInputStyled = styled(Input).attrs(props => ({ type: 'file' }))`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
`
export default function FileTypeInput(props) {
    return (
        <>
            <FileTypeInputStyled {...props} />
        </>
    );
}