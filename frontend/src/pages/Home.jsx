import React from 'react'

import Contact from '../components/Contact';
import Messages from '../components/Messages';
import Navbar from '../components/Navbar';
import Chat from './Chat';

const Home = () => {
    return (
        <div className='flex justify-around'>
            <div className='border-0 md:border-r md:pr-20'>
                <Navbar />
                <Contact />
                <Messages />
            </div>
            <div className='hidden md:block'>
                <Chat />
            </div>
        </div>
    )
}

export default Home