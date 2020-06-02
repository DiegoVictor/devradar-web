import styled, { css, keyframes } from 'styled-components';

export const Bar = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 30px;
  width: 100%;
  z-index: 2;
`;

export const SearchBar = styled.div`
  align-items: center;
  background-color: #7d49e7;
  border-radius: 25px;
  box-shadow: 0px 0px 3px #aaa;
  display: flex;
  height: 50px;
  padding-right: 4px;
  min-width: 50px;
  transition: all 0.5s;

  ${props =>
    props.compact &&
    css`
      padding: 0px;
      justify-content: center;
    `}

  input {
    background-color: transparent;
    border: 0px;
    border-radius: 25px;
    color: #fff;
    font-weight: 600;
    height: 100%;
    padding: 0px 17px;
    transition: all 0.5s;
    width: 313px;

    ${props =>
      props.compact &&
      css`
        padding: 0px;
        width: 0px;
      `}

    &::-webkit-input-placeholder {
      color: #c095ed;
    }
  }
`;

export const Button = styled.button`
  background-color: #7d49e7;
  border: 0px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  height: 40px;
  line-height: 10px;
  transition: all 0.25s;
  width: 40px;

  &:hover {
    opacity: 0.8;
  }
`;

export const Clear = styled(Button)`
  margin-right: 3px;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const Search = styled(Button)`
  background-color: #fff;
  color: #7d49e7;
  line-height: 12px;
`;

export const Link = styled.a`
  align-items: center;
  background-color: #33e850;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #aaa;
  color: #fff;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  margin-left: 5px;
  overflow: hidden;
  padding: 0px 11px 0px 12px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.5s;
  width: 40px;

  &:hover {
    border-radius: 20px;
    width: 97px;

    span {
      left: 31px;
    }
  }

  span {
    left: 39px;
    position: absolute;
    transition: all 0.5s;
    min-width: 54px;
  }
`;

export const SignIn = styled(Link)`
  background: #e8df4a;
  color: #24292e;

  &:hover {
    width: 94px;
  }
`;
  }
`;

export const Aside = styled.aside`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0p 0p 14px 0px rgba(0, 0, 0, 0.02);
  padding: 30px 20px;
  width: 320px;

  @media (max-width: 1000px) {
    width: 100%;
  }

export const Profile = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  form {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 3px #aaa;
    margin-top: 10px;
    opacity: ${props => (props.show ? 1 : 0)};
    position: absolute;
    right: 50%;
    transform: translateX(calc(50% - 25px));
    transition: display 0.1s, opacity 0.5s;
    pointer-events: ${props => (props.show ? 'all' : 'none')};
    top: 50px;

    > div {
      padding: 15px 15px;

      > label:first-child {
        margin-top: 0px;
      }

      label {
        color: #888;
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        margin-top: 15px;
      }

      input,
      textarea {
        background-color: white;
        border: 1px solid #e7e7e7;
        border-radius: 8px;
        min-height: 40px;

        padding: 5px 10px;
        min-width: 100%;

        & + span {
          color: red;
        }
      }
    }
  }
`;

export const Col = styled.div`
  display: flex;
  justify-content: space-between;

  div:first-child {
    margin-right: 5px;
  }

  div:last-child {
    margin-left: 5px;
  }
`;

export const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Footer = styled.div`
  border-top: 1px solid #eee;
  background: #eee;
  border-radius: 0px 0px 10px 10px;
  padding: 9px 15px;
  display: flex;
  justify-content: space-between;

  > div {
    align-self: right;
    display: flex;
    justify-content: center;

    button,
    a {
      background-color: transparent;
      border: 0px;
      border-radius: 20px;
      color: #888;
      cursor: pointer;
      display: flex;
      height: 35px;
      padding: 9px 9px;

      &:last-child {
        background-color: #c5c5c5;
        color: white;
      }
    }
  }
`;

export const Logout = styled.button`
  align-items: center;
  background: transparent;
  border: 0px;
  color: #888;
  display: flex;
  padding: 0px;

  svg {
    margin-right: 5px;
  }
`;

export const AnimatedButton = styled.button`
  ${props =>
    props.animate &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
        animation-direction: reverse;
      }
    `}
`;
