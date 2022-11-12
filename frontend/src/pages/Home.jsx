import React from 'react'

import Contact from '../components/Contact';
import Messages from '../components/Messages';
import Chat from './Chat';

const Home = () => {
    return (
        <div className='flex'>
            <div>
                <Contact />
                <Messages />
            </div>
            <div>
                <Chat />
            </div>
        </div>
    )
}

export default Home