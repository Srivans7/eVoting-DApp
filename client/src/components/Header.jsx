import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Wallet from './Wallet';


const Header = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    //const address = '0xabc';
    // const { connect, address, searchCampaigns } = useStateContext();


    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="font-montserrat text-[#1DC071] text-6xl cursor-pointer" onClick={()=>{navigate("/")}}>
                E-Voting dApp
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <Wallet/>
            </div>
        </div >
    )
}

export default Header