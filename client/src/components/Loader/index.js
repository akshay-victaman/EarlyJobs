import {Oval} from 'react-loader-spinner'
import './style.css'

const Loader = () => {
    return (
        <div className='suspense-loader-container'>
            <Oval
                visible={true}
                height="40"
                width="40"
                color="#EB6A4D"
                secondaryColor="#EB6A4D80"
                ariaLabel="oval-loading"
                strokeWidth="4"
                strokeWidthSecondary="4"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader