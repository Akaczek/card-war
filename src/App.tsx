import Game from './game/Game/Game';
import { AppContainer, Title, ContentWrapper } from './App.styles';
import { Ad } from './components';

const App = () => {
  return (
    <AppContainer>
      <Title>Card Wars</Title>
      <ContentWrapper>
        <Ad />
        <Game />
        <Ad />
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
