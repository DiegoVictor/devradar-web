import styled from 'styled-components';

export const Avatar = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    z-index: 2;
    ~ div {
      display: block;
    }
  }

  img {
    border: 2px solid #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 3px #aaa;
    height: 54px;
    width: 54px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &:hover ${Avatar} {
    z-index: 2;
  }
`;

export const Description = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  color: white;
  display: none;
  min-width: 120px;
  position: relative;
  z-index: 2;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 3px #aaa;
  color: #888;
  margin-top: 2px;

  &:hover {
    display: block;
  }

  strong {
    display: block;
    font-size: 12px;
  }

  span {
    display: block;
  }

  a {
    align-items: center;
    background-color: #eee;
    border-radius: 0px 0px 8px 8px;
    color: #7a7a7a;
    display: flex;
    font-weight: bold;
    justify-content: center;
    padding: 7px 0px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;

    svg {
      margin-right: 4px;
    }
  }
`;
