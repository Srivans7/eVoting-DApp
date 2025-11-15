// import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';

import Header from './components/Header';
// import CreateInsurance from './pages/Customer/C_CreateInsurance';
// import CustomerDashboard from './pages/Customer/C_DashBoard';
// import CPolicyDetails from './pages/Customer/C_PolicyDetails';
import Home from './pages/Home';
import CreateVoting from './pages/createVoting';
// import InsurerDashboard from './pages/Insurer/I_DashBoard';

import Voting from './pages/Voting';

import { Route, Routes } from 'react-router-dom';
import VotingResult from './pages/VotingResult';
// import IPolicyDetails from './pages/Insurer/I_PolicyDetails';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-voting" element={<CreateVoting />} />
          <Route path="/:add" element={<Voting />} />
          <Route path="/result/:add" element={<VotingResult/>} />
          {/* <Route path="/create-policy" element={<CreateInsurance />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/insurer-dashboard" element={<InsurerDashboard />} />
          <Route path="/customer/:add" element={<CPolicyDetails />} />
          <Route path="/insurer/:add" element={<IPolicyDetails />} /> */}
        </Routes>
      </div>
    </div>

  );
}

export default App;
