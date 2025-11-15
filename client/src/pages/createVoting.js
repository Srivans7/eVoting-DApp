import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BigNumber, ethers } from 'ethers';

import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import NavLinks from '../components/Links';

import VotingFactory from "../contracts/Voting.sol/VotingFactory.json";

const CreateVoting = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [ename, setElectionName] = useState('');
    const [duration, setDuration] = useState('');
    const [inputs, setInputs] = useState();
    // const { createCampaign } = useStateContext();
    // const [form, setForm] = useState({
    //     num: 0,
    //     candidates: [],
    // });

    const [inputFields, setInputFields] = useState([{ name : ''}])

    const handleInputChange = (e) => {
        setInputs(e.target.value)
    }

    // const setNumOfCandidates = async(e) => {
    //     // setInputs(Number(form.num));
    //     setInputs(Array(form.num));
    //     for(let i=0;i<form.num;i++)
    //     {
    //         setInputs(inputs[i] = i);
    //     }
    //     console.log(inputs);
    // }

    const handleCandidate = (i,e) => {
        let data = [...inputFields];
        data[i] = e.target.value;
        setInputFields(data);
    }
    const renderFields = () => {
        const fields = [];

        for (let i = 0; i < inputs; i++) {
            fields.push(<div className="flex flex-wrap gap-[40px]">
                        <FormField
                            labelName={"Enter name of Candidate "+ (i+1)+" *"}
                            placeholder="John Doe"
                            inputType="text"
                            value={inputFields.name}
                            handleChange={(e) => handleCandidate(i, e)}
                        />
                    </div>);
        }
        return fields;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs==0 || inputs==1){
            alert("Please add atleast 2 candidates")
        }
        console.log(ename)
        console.log(duration)
        const contract_address = "0xC38C397A5682d3B9A522ad5B5718a79CfdCf205f";
        // // const contract_address = "0x643447527464111056e1C7cA8c42b846AEC1A877";
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const Address = await signer.getAddress();
        const contract = new ethers.Contract(
            contract_address,
            VotingFactory.abi,
            signer);
        // console.log(contract);
        // console.log(contract.name);

        // console.log(form);
        await contract.createVoting(
            Address,
            ename,
            (BigNumber.from(duration)).mul(3600),
            (BigNumber.from(inputs)),
            (inputFields)
        );
        // console.log(typeof(JSON.stringify(inputFields)))

    }

    return (
        <div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 mb-[60px]">
                <NavLinks />
            </div>

            <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
                {isLoading && <Loader />}
                <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                    <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Voting</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                    

                    <div className="flex flex-wrap gap-[40px]">
                        <FormField
                            labelName="Enter the Name of the E-Voting Campaign *"
                            placeholder="Presidential Elections"
                            inputType="text"
                            value={ename}
                            handleChange={(e) => {setElectionName(e.target.value)}}
                        />
                        <FormField
                            labelName="Enter the Duration (in hours) *"
                            placeholder="24 hrs = 1 day"
                            inputType="text"
                            value={duration}
                            handleChange={(e) => { setDuration(e.target.value) }}
                        />

                        <FormField
                            labelName="Enter the number of Candidates *"
                            placeholder="0"
                            inputType="number"
                            value={inputs}
                            handleChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    {renderFields()}
                    
                    <div className="flex justify-center items-center mt-[32px]">
                        <CustomButton
                            btnType="submit"
                            title="Begin Voting !"
                            styles="bg-[#1dc071]"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVoting