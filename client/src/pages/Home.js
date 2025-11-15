import { useNavigate } from "react-router-dom";
import NavLinks from "../components/Links";
import React from "react";
import { ethers } from "ethers";
import VotingFactory from "../contracts/Voting.sol/VotingFactory.json"
import { useState, useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const [campaignsData, setCampaignsData] = useState([]);
    const Request = async () => {
        const contract_address = "0xC38C397A5682d3B9A522ad5B5718a79CfdCf205f";
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Web3provider.getSigner();
        const Address = await signer.getAddress();

        const provider = new ethers.providers.JsonRpcProvider(
            "HTTP://127.0.0.1:7545"
        );

        const contract = new ethers.Contract(
            contract_address,
            VotingFactory.abi,
            provider
        );

        const getAllCampaigns = contract.filters.VotingCreated(null);
        // console.log(getAllCampaigns);
        const AllCampaigns = await contract.queryFilter(getAllCampaigns);
        const AllData = AllCampaigns.map((e) => {
            return {
                name: e.args._campaign_name,
                address: e.args.CampaignAddress
            }
        })
        setCampaignsData(AllData)
    }

    useEffect(() => {
        Request();
    }, [])


    const handleClick = (e) => {
        navigate(`/${e.address}`, { state: e });
    }
    return (
        <div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 mb-[60px]">
                <NavLinks />
            </div>
            <div className="bg-[#1c1c24] rounded-[10px] sm:p-10 p-4">
                <table className="table-auto w-full font-epilogue text-white text-[24px]">
                    <thead className="text-left">
                        <tr>
                            <th className="w-1/8  text-center border-b-4 sm:py-4">#</th>
                            <th className="w-1/2  text-center border-b-4">E-Voting Campaign Address</th>
                            <th className="w-1/3  text-center border-b-4">Campaign Name</th>
                            {/* <th className="w-1/4  text-center border-b-4">Car Model</th>
                        <th className="w-1/8  text-center border-b-4">Status</th> */}
                        </tr>
                    </thead>

                    {campaignsData.map((e, index) => {
                        return (
                            <tbody>
                                <tr className="cursor-pointer hover:bg-[#1c1c24]-opacity-30" onClick={() => handleClick(e)}>
                                    <td className="border-b-2 text-center  sm:py-4">{index + 1}</td>
                                    <td className="border-b-2 text-center ">{e.address}</td>
                                    <td className="border-b-2 text-center  ">{e.name}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

            </div>

        </div>
    );
}

export default Home;



