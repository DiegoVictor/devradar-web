import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  max-width: 1200px;
  padding: 60px 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
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
