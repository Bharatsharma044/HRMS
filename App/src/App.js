import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login/login';
import Signup from './component/Signup/signup';
import Nav from './component/Navbar/navbar';
import UserHome from './component/User/userHome';
import AdminHome from './component/Admin/admin';
import EmployeeModule from './component/User/employee/employee';
import CandidateModule from './component/User/candidate/candidate';
import ExpensesModule from './component/User/expenses/expenses';
import HelpcenterModule from './component/User/helpcentre/helpcenter';
import ConsultancyModule from './component/User/consultancy/consultancy';
import SkillModule from './component/User/skill/skill';
import ProfileModule from './component/User/profile/profile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/user" element={<UserHome />}/>
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/employee" element={<EmployeeModule />}/>
          <Route path="/Footer" element={<footer />} />
          <Route path="/candidate" element={<CandidateModule />}/>
          <Route path="/expenses" element={<ExpensesModule />}/>
          <Route path="/helpcenter" element={<HelpcenterModule />}/>
          <Route path="/consultancy" element={<ConsultancyModule />}/>
          <Route path="/skills" element={<SkillModule />}/>
          <Route path="/profile" element={<ProfileModule />}/>

        
        </Routes>
      </Router>

    </div>
  );
}

export default App;
