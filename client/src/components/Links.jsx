import React from "react";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const NavLinks = () =>{
    const navigate = useNavigate()
    return (<div className="flex flex-row justify-start items-center gap-10">
        <div className="flex justify-center items-center mt-[20px]">
            <CustomButton
                title="Dashboard"
                handleClick={() => {
                    navigate("/")
                }}
                styles="bg-[#1dc071] text-[25px] h-[55px]"
            />
        </div>
        <div className="flex justify-center items-center mt-[20px]">
            <CustomButton
                title="Create an E-Voting Campaign"
                handleClick={() => {
                    navigate("/create-voting")
                }}
                styles="bg-[#1dc071] text-[25px] h-[55px]"
            />
        </div>
    </div>);
}

export default NavLinks