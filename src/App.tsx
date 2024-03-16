import Game from './game/Game/Game';
import { AppContainer, Title, ContentWrapper } from './App.styles';
import { Ad } from './components';
import ad1 from './assets/przycieta1.png';
import ad2 from './assets/przycieta2.png';

const App = () => {
  return (
    <AppContainer>
      <Title>Card Wars</Title>
      <ContentWrapper>
        <Ad img={ad1}/>
        <Game />
        <Ad img={ad2}/>
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
