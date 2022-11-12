import React from 'react'

import Contact from '../components/Contact';
import Messages from '../components/Messages';

const Home = () => {
    return (
        <div className='w-screen h-screen'>
            <Contact />
            <Messages />
        </div>
    )
}

export default Home