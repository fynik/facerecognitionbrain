import './App.css';
import ParticlesBg from 'particles-bg';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from './components/Rank/Rank';

function App() {
  return (
    <div>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <ParticlesBg type="cobweb" bg={true} />
    </div>
  );
}

export default App;
