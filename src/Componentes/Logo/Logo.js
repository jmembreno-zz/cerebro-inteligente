//import react from 'react';
import Tilt from 'react-tilt';
import brain from './brain5.png';
import './Logo.css';
 


const Logo = ()=>{
    return(
        <div className='ma4 mt0'>

            <Tilt className="Tilt br2 shadow-0" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                     <div className="Tilt-inner pa3"> 
                        <img style={{paddingTop: '5px'}} alt='Logo' src={brain}/>
                     </div>
            </Tilt>

        </div>
    )
}

export default Logo

