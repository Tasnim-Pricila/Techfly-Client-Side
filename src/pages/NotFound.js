import React from 'react';
import notfound from '../../src/images/notfound.gif'

const NotFound = () => {
    return (
        <div>
            <img src={notfound} alt="" className='h-[90vh] w-screen object-cover' />
        </div>
    );
};

export default NotFound;