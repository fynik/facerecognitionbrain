import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
  return (
    <Tilt 
      className="Tilt br2 shadow-2"
      tiltMaxAngleX = { 55 } 
      tiltMaxAngleY = { 55 }>
      <div className='pa3'>
        <img src={ brain } alt="logo" />
      </div>
    </Tilt>
  )
}

export default Logo;