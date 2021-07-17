//import react from 'react'
import './ReconociFacial.css'

const ReconociFacial = ({ imageUrl, caja})=>{
    return(

        <div className='center'>

            <div className='absolute mt2'>

              <img id='input_imagen' alt='' src={imageUrl} width='500px' heigh='auto'/>
              <div className='bounding-box' style={{top: caja.primera_fila, right: caja.column_derecha, bottom: caja.ultima_fila, left: caja.column_izquierda}}></div>

            </div>

            

        </div>
       
    ); 
}

export default ReconociFacial