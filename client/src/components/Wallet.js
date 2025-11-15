import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const networks = {
    ganache: {
        chainId: `0x${Number(1337).toString(16)}`,
        chainName: "Ganache",
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["HTTP://127.0.0.1:7545"],
    },
};


const Wallet = () => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");


    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        console.log(provider.network)
        if (provider.network !== "ganache") {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks["ganache"],
                    },
                ],
            });
        }
        const account = provider.getSigner();
        console.log(account);
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);
    };

    return (
        <div>
        <button
            type="button"
                className="font-epilogue font-semibold text-[16px] leading-[26px] text-white  h-[52px] px-4 rounded-[10px] bg-[#1dc071]"
                onClick = {connectWallet}>
                {balance === '' ? <div></div> : <div>{balance.slice(0, 4)} ETH</div>}
                {address === '' ? <div>Connect Wallet</div> : <div>{address.slice(0, 6)}...{address.slice(39)}</div>}
        </button>
        </div>
    );
};

export default Wallet