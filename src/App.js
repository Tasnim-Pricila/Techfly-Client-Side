import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs/Blogs';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Portfolio from './pages/Portfolio/Portfolio';
import PurchaseParts from './pages/PurchaseParts/PurchaseParts';
import RequireAuth from './pages/RequireAuth';
import Signup from './pages/Signup';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import MyOrders from './pages/Dashboard/Users/MyOrders';
import AddReview from './pages/Dashboard/Users/AddReview';
import AddProduct from './pages/Dashboard/Admin/AddProduct';
import MakeAdmin from './pages/Dashboard/Admin/MakeAdmin';
import ManageOrder from './pages/Dashboard/Admin/ManageOrder';
import ManageProducts from './pages/Dashboard/Admin/ManageProducts';
import MyProfile from './pages/Dashboard/MyProfile';
import EditProfile from './pages/Dashboard/EditProfile';
import Payment from './pages/Dashboard/Users/Payment';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import useAdmin from './CustomHook/useAdmin';

function App() {
  const [user, loading] = useAuthState(auth);
  const [admin] = useAdmin(user);
  // console.log(user.email)

  if (loading) {
      <p>Loading...</p>
  }
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/portfolio' element={<Portfolio />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <PurchaseParts />
          </RequireAuth>
        }></Route>
        <Route path='/*' element={<NotFound />}></Route>

        <Route path='/dashboard' element={
          <RequireAuth> <Dashboard /> </RequireAuth>}>
            {
              !admin &&
              <Route index element={<MyOrders/>}> </Route>
            }
            {
              admin &&
              <Route index element={<ManageProducts/>}> </Route>
            }
          <Route path='review' element={<AddReview/>}> </Route>
          <Route path='manageOrders' element={<ManageOrder/>}> </Route>
          <Route path='addProduct' element={<AddProduct/>}> </Route>
          <Route path='makeAdmin' element={<MakeAdmin/>}> </Route>
          <Route path='myProfile' element={<MyProfile/>}></Route>
          <Route path='editProfile/:email' element={<EditProfile/>}></Route>
          <Route path='payment/:id' element={<Payment/>}></Route>
        </Route>

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
