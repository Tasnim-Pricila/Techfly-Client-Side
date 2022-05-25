import React from 'react';
import Slider from 'react-slick';


const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    // Banner Array
    const carsBanner = [
        {
            image: 'https://i.ibb.co/NLwYvWJ/banner-1.jpg',
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2016',
        },
        {
            image: 'https://i.ibb.co/vzCZd7J/banner-2.jpg',
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2016',
        },
        {
            image: 'https://i.ibb.co/LZJFjxB/banner3.jpg',
            smallTitle: 'Techfly MANUFACTURING',
            title: 'Providing',
            title1: 'BEST PRODUCTS',
            description: 'We won Many Industrial Awards and Got Many Certificates Since 2001-2016',
        },
    ]
    return (
        <div>
           {/* Banner Section  */}
           <Slider {...settings} className='max-w-full overflow-hidden'>
                {
                    carsBanner.map ((banner, index) =>
                        <div key={index}>
                            <div style={{ backgroundImage: `url('${banner.image}')` }} className='bg-cover h-[90vh] bg-no-repeat bg-blend-overlay 
                            bg-[#0000009b] bg-center object-cover'>
                                <div className='h-full flex flex-col justify-center items-center text-white'>   
                                    <p className='text-3xl tracking-wider uppercase font-extralight'>{banner.smallTitle}</p>
                                    <p className='font-bold text-8xl text-yellow-500 uppercase'>{banner.title}</p>
                                    <p className='text-9xl font-light'>{banner.title1}</p>
                                    <p className='text-3xl py-6 italic font-thin'>{banner.description}</p>
                                    <button className='text-white px-8 py-4 border-2 rounded-lg border-yellow-500 font-semibold uppercase hover:bg-yellow-500 hover:duration-700 mt-4'>Go To Shop</button>
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