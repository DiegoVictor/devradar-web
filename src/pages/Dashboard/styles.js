import styled from 'styled-components';

export const Bar = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 30px;
  width: 100%;
  z-index: 2;
`;

export const Search = styled.div`
  align-items: center;
  background-color: #7d49e7;
  border-radius: 25px;
  box-shadow: 0px 0px 3px #aaa;
  display: flex;
  height: 50px;
  max-width: 400px;
  width: 100%;

  input {
    background-color: transparent;
    border: 0px;
    border-radius: 25px;
    color: #fff;
    font-weight: 600;
    height: 100%;
    padding: 0px 17px;
    width: calc(100% - 88px);
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

  strong {
    color: #333;
    display: block;
    font-size: 20px;
    text-align: center;
  }

  form {
    margin-top: 30px;
  }
`;

export const Main = styled.main`
  flex: 1;
  margin-left: 30px;

  @media (max-width: 1000px) {
    margin-left: 0px;
    margin-top: 30px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    list-style: none;

    @media (max-width: 650px) {
      grid-template-columns: 1fr;
    }
  }
`;
