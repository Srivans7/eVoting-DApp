import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";
import CustomButton from "../components/CustomButton";
import Details from "../components/Details";
import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";
import EVoting from "../contracts/Voting.sol/EVoting.json"
import NavLinks from "../components/Links";

const VotingResult = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState();
    const [name, setName] = useState();
    const [sdate, setSDate] = useState();
    const [edate, setEDate] = useState();
    const [candidates, setcandidates] = useState([{
        id: '',
        name: '',
        votes: ''
    }])

    const [winner, setWinner] = useState("");

    const getWinner = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = Web3provider.getSigner();
            const Address = await signer.getAddress();
            const contract = new ethers.Contract(
                state.address,
                EVoting.abi,
                signer
            );
            const x = await contract.getWinner()    
            console.log(x);    
            setWinner(x);
    }

    const Request = async () => {
        getWinner();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Web3provider.getSigner();
        const Address = await signer.getAddress();

        const provider = new ethers.providers.JsonRpcProvider(
            "HTTP://127.0.0.1:7545"
        );

        const contract = new ethers.Contract(
            state.address,
            EVoting.abi,
            provider
        );
        const x = await contract.EndTime()
        setEDate(x.toString());

        const y = await contract.electionName()
        setName(y.toString());

        const n = await contract.candidatesCount();

        let cand = []
        for (let i = 1; i <= Number(n.toString()); i++) {
            let z = await contract.candidates(i)
            cand.push({ id: z[0].toNumber(), name: z[1], votes: z[2].toNumber() })
        }
        setcandidates(cand)
        console.log(candidates)
        // getWinner();
        // const vehicle = (await contract.VehicleDetails({ from: Address }));
        // const policy = (await contract.PolicyDetails({ from: Address }));
        // setVehicleData(vehicle);
        // setPolicyData(policy);
    }

    useEffect(() => {
        Request();
    }, [])

    // const handleSubmit= async (e) => {

    // }
    if (!candidates) {
        return (<Loader />);
    }
    else {
        return (
            <div>
                <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 mb-[60px]">
                    <NavLinks />
                </div>
                <div className="bg-[#1c1c24] rounded-[10px] sm:p-10 p-4">
                    <div className="w-full flex flex-col gap-[30px]">
                        <div className="flex justify-between items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                            <h1 className="pl-[30px] font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">{name}</h1>
                            <h1 className="pr-[30px] font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Voting Ended: {(new Date(edate * 1000)).toLocaleString('en-GB')}</h1>
                        </div>
                        {/* <div className="flex justify-between items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                            <h1 className="pl-[30px] font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white"></h1>
                            <h1 className="pr-[30px] font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Owner : 2e16dce0f5db6fa351c93b</h1>
                        </div> */}
                    </div>
                    <table className="table-auto w-full font-epilogue text-white text-[24px]">
                        <thead className="text-left">
                            <tr>
                                <th className="w-1/8  text-center border-b-4 sm:py-4">#</th>
                                <th className="w-0.8  text-center border-b-4">Candidate Name</th>
                                <th className="w-1/8  text-center border-b-4">Vote</th>
                                {/* <th className="w-1/4  text-center border-b-4">Car Model</th>
                        <th className="w-1/8  text-center border-b-4">Status</th> */}
                            </tr>
                        </thead>

                        {candidates.map((e) => {
                            return (
                                <tbody>
                                    <tr className="hover:bg-[#1c1c24]-opacity-30">
                                        <td className="border-b-2 text-center  sm:py-4">{e.id}</td>
                                        <td className="border-b-2 text-center ">{e.name}</td>
                                        <td className="border-b-2 text-center  ">{e.votes}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    <div className=" mt-[30px] w-full flex flex-col gap-[30px]">
                        <div className="flex justify-between items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                            <h1 className="pl-[30px] font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Election Winner : {winner} </h1>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default VotingResult;