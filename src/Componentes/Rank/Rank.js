//import react from 'react';


const Rank = ({nombre,ingresos})=>{
    return(
        <div>
            <div className='white f3'>
                {`${nombre}, tu actual rango es ....`}
            </div>
            <div className='white f3'>
               {ingresos}
            </div>
           
        </div>
    )
}

export default Rank