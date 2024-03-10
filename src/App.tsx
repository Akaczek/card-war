import Game from './game/Game/Game';
import { AppContainer, Title } from './App.styles';

const App = () => {
  return (
    <AppContainer>
      <Title>Card Wars</Title>
      <Game />
    </AppContainer>
  );
};

export default App;
