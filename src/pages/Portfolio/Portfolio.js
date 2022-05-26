import React from 'react';

const Portfolio = () => {
    return (
        <div className='my-12 md:px-20 px-4'>
            <div className='text-center'>
                <p className='text-3xl font-bold'>Tasnim Tanzim Pricila</p>
                <p className='font-semibold'>Email: tasnimtanzim55@gmail.com</p>

            </div>
            <div className='mt-12'>
                <p className='text-xl font-bold pb-2 border-b-2 border-black'>Educational Background:</p>
                <div className='mt-4'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-center">
                            <thead>
                                <tr>
                                    <th>Degree</th>
                                    <th>Institution</th>
                                    <th> GPA </th>
                                    <th> Scale </th>
                                    <th> Subject </th>
                                    <th> Passing Year </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th>B.Sc</th>
                                    <td>Southeast University</td>
                                    <td>3.83</td>
                                    <td>4.00</td>
                                    <td>Computer Science &amp; Engineering </td>
                                    <td>2021</td>
                                </tr>

                                <tr>
                                    <th>HSC</th>
                                    <td>Narsingdi Govt. College </td>
                                    <td>5.00</td>
                                    <td>5.00</td>
                                    <td>Science </td>
                                    <td>2015</td>
                                </tr>

                                <tr>
                                    <th>SSC</th>
                                    <td>Brahmondi Girls' High School</td>
                                    <td>5.00</td>
                                    <td>5.00</td>
                                    <td>Science </td>
                                    <td>2013</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className='mt-12'>
                <p className='text-xl font-bold pb-2 border-b-2 border-black mb-4'>Skills:</p>
                <p><b>Expertise: </b> HTML5, CSS3, Bootstrap, Tailwind, JavaScript, ES6, React, Firebase.</p>
                <p><b>Comfortable: </b> NodeJs, Mongodb, ExpressJs.</p>
                <p><b>Familiar: </b>PHP, Material UI.</p>
                <p><b>Tools: </b> : Github, Heroku, Netlify, VS Code, Figma</p>

            </div>
            <div className='mt-12'>
                <p className='text-xl font-bold pb-2 border-b-2 border-black mb-4'>Projects:</p>
                <div>
                    <p><b>Warehouse Management</b></p>
                    <p><b><li>Features:</li></b></p>

                    <li>Single page application website where users can add more items.</li>
                    <li> Users can update the stock of a product through an input field.</li>
                    <li> Delete button for users to delete any items.</li>
                    <p><b>Technologies Used:</b> HTML,CSS,Tailwind,React,Firebase,NodeJs,Mongodb,ExpressJs.</p>
                    <p><b>Link: </b>
                    <a href="https://warehouse-management-54c43.web.app/" alt='' className='text-blue-500 hover:underline font-semibold'>Live Website </a></p>
                </div>
                <div className='mt-4'>
                    <p><b>Wedding Photographer</b></p>
                    <p><b><li>Features:</li></b></p>
                    <ul>
                        <li>Used React router to route page without reloading.</li>
                        <li>Firebase authenticated signup and login system for users</li>
                        <li>Animation added when hovering in the photo gallery.</li>
                    </ul>
                    <p><b>Technologies Used:</b>: HTML,CSS,Tailwind,React,Firebase.</p>
                    <p><b>Link: </b>
                    <a href="https://wedding-photographer-d8763.web.app/" alt='' className='text-blue-500 hover:underline font-semibold'>Live Website </a></p>
                </div>
                <div className='mt-4'>
                    <p><b>WildFlower Clothing</b></p>
                    <p><b><li>Features:</li></b></p>
                    <ul>
                        <li>Customers review loaded from data shown with an amazing star rating.</li>
                        <li>Users can explore different types of charts in the dashboard page.</li>
                        <li>Fully responsive user experience for mobile, tablet and PC users.</li>
                    </ul>
                    <p><b>Technologies Used: </b> HTML, CSS, Tailwind, React, Netlify.</p>
                    <p><b>Link: </b><a href="https://wildflower-clothing.netlify.app/" alt='' className='text-blue-500 hover:underline font-semibold'>Live Website </a></p>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;