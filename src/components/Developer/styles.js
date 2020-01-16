import styled from 'styled-components';

export const Container = styled.li`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.02);
  padding: 20px;

  header {
    align-items: center;
    display: flex;
    flex-direction: row;

    img {
      border-radius: 50%;
      height: 54px;
      width: 54px;
    }

    div {
      margin-left: 10px;

      strong {
        color: #333;
        display: block;
        font-size: 16px;
      }

      span {
        color: #999;
        font-size: 13px;
        margin-top: 2px;
      }
    }
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0px;
  }

  a {
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      color: #5a2ea6;
    }
  }
`;
