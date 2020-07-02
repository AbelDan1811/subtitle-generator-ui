import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return <div className='static bg-gray-800 py-4'>
        <div className='mx-auto container flex justify-between items-center'>
            <Link to={'/'} className='text-white font-black uppercase text-2xl'>
                Subtitle Generator
            </Link>
            <Link to={'/records'} className='text-white font-bold'>
                <i className='fas fa-archive mr-2'/>Records
            </Link>
        </div>
    </div>
}

export default Header