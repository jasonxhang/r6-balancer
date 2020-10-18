import styled from 'styled-components';

export const SuggestionList = styled.ul`
  position: absolute;
  background-color: white;
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  max-height: 180px;
  overflow-y: auto;
  padding-left: 0;
  width: calc(300px + 1rem);
  top: 62px;
  letter-spacing: normal;
  white-space: pre;
  text-transform: none;
  z-index: 10;
`;

export const SuggestionItem = styled.li`
  padding: 0.5rem;
  font-family: ${(props) => (props.active ? `Scout-Bold` : '')};
  background: ${(props) => (props.active ? `#cfcfcf` : '')};
  font-size: ${(props) => (props.active ? `18px` : '')};
  cursor: ${(props) => (props.active ? `pointer` : '')};
  font-weight: ${(props) => (props.active ? `700` : '')};
  &:hover {
    background-color: #cfcfcf;
    cursor: pointer;
    font-weight: 700;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;

export const NoSuggestions = styled(SuggestionList)`
  color: #999;
  padding: 0.5rem;
  z-index: 10;
`;

export const PlayerInput = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  position: relative;
`;
