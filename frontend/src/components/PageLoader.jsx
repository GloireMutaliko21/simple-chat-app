import React from 'react'
import CardLoader from './CardLoader'

const PageLoader = () => {
    return (
        <div className="grid place-items-center bg-white h-screen w-screen">
            <div className="w-full h-full bg-white rounded-md shadow-xl m-3">
                <div className="h-44 bg-gray-300 rounded-t-md animate-pulse m-5"></div>
                <div className="p-5">
                    <div className="h-32 flex flex-col justify-center p-5 rounded-sm bg-gray-300 duration-75 animate-pulse mb-4">
                        <div className="h-3 mt-2 w-1/2 rounded-sm bg-gray-400"></div>
                        <div className="h-5 mt-2 w-1/3 rounded-sm bg-gray-400"></div>
                        <div className="h-5 mt-2 w-2/3 rounded-sm bg-gray-400"></div>
                    </div>
                    <div className="animate-pulse">
                        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
                            <div className="border-t-black animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>

                        </div>
                        <div className='flex flex-wrap justify-around'>
                            <CardLoader />
                            <CardLoader />
                            <CardLoader />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageLoader