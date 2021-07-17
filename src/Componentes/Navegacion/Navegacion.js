//import react from 'react'

const Navegacion = ({ onRouteChange, estasingresando }) => {
        
        if (estasingresando) {

            return(

                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('salir')} className='f3 link dim black underline pa3 pointer'>Salir</p>
                </nav>

            )

        } else {

            return (

                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('ingresar')} className='f3 link dim black underline pa3 pointer'>Ingresar</p>
                    <p onClick={() => onRouteChange('registrarse')} className='f3 link dim black underline pa3 pointer'>Registrarse</p>
                </nav>

            );

        }
   
}

export default Navegacion