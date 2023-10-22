import React, { useEffect } from 'react'

function Error({DialogOff,statusCode}) {

    useEffect(()=>{
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        }
    },[]);

    // console.log({statusCode})

  return (
    <>
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-300 z-10 opacity-50' onClick={DialogOff}></div>
        <div className='fixed min-w-min text-orange-500 top-1/3 left-[35%] py-4 px-8 flex flex-col items-center font-serif bg-white z-20 justify-center rounded-lg shadow-lg'>
            <h2 className=' text-3xl font-medium p-1'>Error {statusCode}</h2>
            <p className='p-2 text-lg text-[20px] '>Something went wrong, Please try again.</p>
            <button onClick={DialogOff} className='bg-orange-500 text-white py-1 px-4 rounded-lg mt-4 cursor-pointer text-xl font-medium'>OK</button>
        </div>
    </>
  )
}

export default Error
