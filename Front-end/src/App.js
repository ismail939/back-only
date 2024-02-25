import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/mainpages/Home';
import Login from './pages/Forms/Login';
import SignUp from './pages/Forms/Sign-up';
import WorkSpaces from './pages/mainpages/WorkSpaces';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import CreateOffer from './pages/Forms/CreateOffer';
import OfferList from './pages/mainpages/OfferList';
import Dashboard from './pages/AdminPages/Dashboard';
import DiscoverAdmin from './pages/AdminPages/DiscoverAdmin';
import OfferAdmin from './pages/AdminPages/OfferAdmin';
import CreateFullWorkSpace from './pages/Forms/CreateFullWorkSpace';
import RequireAuth from './components/RequireAuth';
import DashboardProfile from './pages/DashboardProfile';
import WorkSpaceProfile from './pages/WorkSpaceProfile/WorkSpaceProfile';
import RoomList from './pages/WorkSpaceProfile/RoomList';
import CreateRoom from './pages/Forms/CreateRoom';
import Requests from './pages/Requests';
import BookingRoom from './pages/WorkSpaceProfile/BookingRoom';
import Books from './pages/Books';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='sign-up' element={<SignUp />}></Route>
        <Route path='workspaces' element={<><Outlet /></>}>
          <Route path="" element={<WorkSpaces />} />
          <Route path=":cwID" element={<WorkSpaceProfile />} />
        </Route>
        <Route path='offers' element={<OfferList />}></Route>
        <Route element={<RequireAuth allowedRoles={["owner", "client"]} />} >
          <Route path='dashboardProfile' element={<DashboardProfile />}></Route>
          <Route path='discoverEdit' element={<DiscoverAdmin />}></Route>
          <Route path='offerEdit' element={<OfferAdmin />}></Route>
          <Route path='workspaces/:cwID/rooms' element={<><Outlet /></>}>
            <Route path="" element={<RoomList />} />
            <Route path=":roomid" element={<BookingRoom />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["owner"]} />} >
          <Route path='createworkspace' element={<CreateFullWorkSpace />}></Route>
          <Route path='createOffer' element={<CreateOffer />}></Route>
          <Route path='createRoom' element={<CreateRoom />}></Route>
          <Route path='requests' element={<Requests />}></Route>
          <Route path='books' element={<Books />}></Route>
        </Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
