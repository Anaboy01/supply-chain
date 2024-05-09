import { ethers, Contract } from "ethers";
import supplyABI from "../ABI/contractABI.json";

export const connectWallet = async () => {
    try {
        let [signer, provider, supplyContract, chainId] = [null, null, null, null];
        if (window.ethereum === null) {
            throw new Error("Metamask is not installed");
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        let chainIdHex = await window.ethereum.request({
            method: 'eth_chainId'
        });
        chainId = parseInt(chainIdHex, 16);

        let selectedAccount = accounts[0];
        if (!selectedAccount) {
            throw new Error("No ethereum accounts available");
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        const supplyContractAddress = "0x7D1f72Bb026aDF377D1a27cdC5F0e45C7e3380A8";
        supplyContract = new Contract(supplyContractAddress, supplyABI, signer);

        return { provider, selectedAccount, supplyContract, chainId };

    } catch (error) {
        console.error(error);
        throw error;
    }
};
