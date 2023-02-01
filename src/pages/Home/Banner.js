import React from 'react';
import Slider from 'react-slick';
import one from './../../images/banner-1.jpg'
import two from './../../images/banner-2.jpg'
import three from './../../images/banner-3.jpg'

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    // Banner Array
    const banners = [
        {
            image: one,
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2022',
        },
        {
            image: two,
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2022',
        },
        {
            image: three,
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2022',
        },
    ]
    return (
        <div>
           {/* Banner Section  */}
           <Slider {...settings} className='max-w-full overflow-hidden'>
                {
                    banners.map ((banner, index) =>
                        <div key={index}>
                            <div style={{ backgroundImage: `url('${banner.image}')` }} className='bg-cover h-[90vh] bg-no-repeat bg-blend-overlay 
                            bg-[#0000009b] bg-center object-cover'>
                                <div className='h-full flex flex-col justify-center items-center text-white'>   
                                    <p className='md:text-3xl text-xl tracking-wider uppercase font-extralight'>{banner.smallTitle}</p>
                                    <p className='font-bold md:text-8xl text-6xl text-yellow-500 uppercase'>{banner.title}</p>
                                    <p className='md:text-8xl text-4xl font-light'
                                    >{banner.title1}</p>
                                    <p className='md:text-3xl text-xl py-6 italic font-thin text-center'>{banner.description}</p>
                                    <a href='#parts' className='text-white px-8 py-4 border-2 rounded-lg border-yellow-500 font-semibold uppercase hover:bg-yellow-500 hover:duration-700 mt-4'>Go To Shop</a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default Banner;