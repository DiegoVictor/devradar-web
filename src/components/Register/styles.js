import styled from 'styled-components';

export const Block = styled.div`
  label {
    color: #acacac;
    display: block;
    font-size: 14px;
    font-weight: bold;
  }

  input {
    border: 0px;
    border-bottom: 1px solid #eee;
    color: #666;
    font-size: 14px;
    height: 32px;
    width: 100%;
  }

  & + & {
    margin-top: 20px;
  }
`;

export const Group = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;

  ${Block} {
    margin-top: 0px;
  }
`;

export const Submit = styled.button`
  background-color: #7d49e7;
  border: 0px;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  padding: 15px 20px;
  transition: background 0.5s;
  width: 100%;

  &:hover {
    background-color: #6931ca;
  }
`;
