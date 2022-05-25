import React from 'react';
import notfound from '../../src/images/notfound.jpg'

const NotFound = () => {
    return (
        <div>
            <img src={notfound} alt="" className='h-[95vh] md:w-screen md:object-cover w-auto' />
        </div>
    );
};

export default NotFound;