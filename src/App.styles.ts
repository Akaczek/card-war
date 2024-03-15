import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #444444;
`;

export const Title = styled.h1`
  font-family: "Anta", sans-serif;
  text-transform: uppercase;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 1rem;
  padding: 20px 0 10px 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
