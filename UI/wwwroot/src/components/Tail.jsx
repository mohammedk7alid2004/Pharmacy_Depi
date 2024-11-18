import footerBg from '../assets/footerBg.png';
import visa from '../assets/Visa.svg';
import master from '../assets/Mastercard.svg';
import cash from '../assets/Cash.svg';
import CIB from '../assets/CIB.svg';

function Tail() {
  return (
    <div className=" flex flex-col justify-center items-center mt-5" >
        <img src={footerBg} alt="logo" className='w-[2.5%] h-[2.5%] mb-5'/>
        <p className="text-sm text-center max-w-[70%] font-semibold">Bloom Pharmacy © 2024 - All Rights Reserved</p>
        <div className="flex gap-4 items-center justify-center my-6 ">
            <img src={visa} alt="logo" className='w-[100%] h-[100%]'/>
            <img src={master} alt="logo" className='w-[100%] h-[100%]'/>
            <img src={CIB} alt="logo" className='w-[100%] h-[100%]'/>
            <img src={cash} alt="logo" className='w-[100%] h-[100%]'/>
        </div>
    </div>
  )
}

export default Tail
