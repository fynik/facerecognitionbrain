import './App.css';
import ParticlesBg from 'particles-bg';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from './components/Rank/Rank';
import { useState } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ClarifaiHTTP from "./services/ClarifaiHTTP";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const loadUser = (signedUser) => {
    setUser({
      id: signedUser.id,
      name: signedUser.name,
      email: signedUser.email,
      entries: signedUser.entries,
      joined: signedUser.joined
    })

  }
  const onInputChange = (event) => setInput(event.target.value);
  
  const calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      left: faceBox.left_col * width,
      right: width - faceBox.right_col * width,
      top: faceBox.top_row * height,
      bottom: height - faceBox.bottom_row * height
    }
  }
  
  const displayFaceBox = (coords) => {
    setBox(coords);
  }
  
  const onDetectButtonSubmit = () => {
    setImageUrl(input);
    
    ClarifaiHTTP
      .getFaceDetection(input)
      .then(result => {
        if (result) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({id: user.id})
          })
          .then(res => res.json())
          .then(count => {
            const newUser = {...user, entries: count};
            setUser(newUser);
          });
        }
        displayFaceBox(calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));
  }

  const onRouteChange = (page) => {
    if (page === 'signout') {
      setSignedIn(false);
    } else if (page === 'home') {
      setSignedIn(true);
    }
    setRoute(page);
  }  

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} signedIn={signedIn} />
      { route === "home"
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onDetectButtonSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : (
            route === "signin"
            ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
            : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
          )
      }
    </div>
  );
}

export default App;
