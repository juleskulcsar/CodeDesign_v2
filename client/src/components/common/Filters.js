import styled, { css } from 'styled-components'

const StyledFiltersDiv = styled.div`
  border-right: 1px solid #682e19;
  padding-left: 1em;
  margin-top: 1.5em;
  padding-right: 1.5em;
`;

const StyledFiltersUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledFiltersList = styled.li`
  padding: 5px;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
`;

export { StyledFiltersDiv, StyledFiltersList, StyledFiltersUl }