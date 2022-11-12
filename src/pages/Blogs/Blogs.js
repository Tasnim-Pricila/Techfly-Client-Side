import React from 'react';

const Blogs = () => {
    return (
        <div className='flex flex-col gap-6 mb-12 md:px-20 px-4'>
            <p className='text-center text-secondary text-2xl my-12 uppercase font-bold'>Blogs</p>
            <div className='border-4 px-4 py-2'>
                <p className='text-xl text-primary font-semibold mb-2'>How will you improve the performance of a React Application?</p>
                <div>
                </div>
                <li>
                    During the re-render process, only re-rendering the components which was necessary for the change and skipping the components which was not nececssary.
                </li>
                <li>
                    By Using custom hook and avoid writing same code.
                </li>
                <li>
                    By optimizing our images
                </li>
                <li>
                    By not using too much animations.
                </li>
                <li>
                    Removing console log.
                </li>
            </div>

            <div className='border-4 py-2 px-4'>
                <p className='text-xl text-primary font-semibold mb-2'>What are the different ways to manage a state in a React application?</p>
                <p>
                    <li> <b>useState:</b>  It can store any primitive and object values and its values can be pass to the other components.</li>
                    <li><b>useEffect:</b>: To fetch data from server we use useState and useEffect. When data is loading we need to add a spinner using useState.</li>
                    <li><b>useLocation:</b>: in react router we know about our path location using useLocation() state.</li>
                    <li><b>useParams:</b> : For dynamic route in react router we use useParams().</li>
                    <li><b>useNavigate:</b> : It is used in react router to go any specific url.</li>
                </p>
            </div>

            <div className='border-4 py-2 px-4'>
                <p className='text-xl text-primary font-semibold mb-2'>
                    14.5 You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name
                </p>
                
                    {`const myArray = [
                        {
                            productName:'productA',
                            price: 500, 
                            description: 'This is Product A. '
                        },
                        {
                            productName: 'productB',
                            price: 1500, 
                            description:'This is Product B. '
                        },
                        {
                            productName: 'productC',
                            price: 2500, 
                            description: 'This is Product C. '
                        }  
                    ]
                    const search = myArray.filter(a => a.productName == a.productName.match('productB'));
                    console.log(search);`}
                    <p className='text-primary pt-4'>Explanation:</p>
                    At first, I will pass a filter() method through the array of products.The filter() method creates a new array with all elements that pass the test implemented by the provided function. Inside the function I will match a string with the product name. If the match() method matches, it will return an array and null if no matches found. That's how I will  implement a search to find products by name.
                
            </div>

            <div className='border-4 py-2 px-4'>
                <p className='text-xl text-primary font-semibold mb-2'>
                    Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts.
                </p>
                <p>
                    If we set the state directly (products = [...]) it won't re-render the componenet. But when we use setProducts it scheduled an update to the component and responds with re-renders when state changed.
                </p>
            </div>

            <div className='border-4 py-2 px-4'>
                <p className='text-xl text-primary font-semibold mb-2'>What is a unit test? Why should write unit tests?</p>
                <p>
                    Unit test is a software testing technique where operating procedures are tested to ensures that all code meets quality standards before it is deployed. We should  write unit tests to verify the correctness of code, to test every function and procedure, and to refine code and make sure the module works properly.
                </p>
            </div>

            <div className='border-4 py-2 px-4'>
                <p className='text-xl text-primary font-semibold mb-2'>How does prototypical inheritance work?</p>
                <p> Prototypical inheritance is a method that inherits the properties and methods of another object.  <br />
                When we want to access a property of an object, JavaScript will first search on it's own object. If it is not found then it will search the object,s prototype.Every object in JavaScript has a built-in property, which is called its prototype. If no match is found after searching both the object and its prototype , JavaScript will check the prototype of the linked object and continue searching until the end of the prototype chain is reached.</p>
            </div>
        </div>
    );
};

export default Blogs;