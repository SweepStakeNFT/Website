
const SweepStakeContract = "";
const ABI = () => {
    return ``;
};
const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
const signer = provider.getSigner();
//const SweepStake = new ethers.Contract(SweepStakeContract, ABI(), signer);


const connect = async()=>{
    await provider.send("eth_requestAccounts", []);
};

const getAddress = async()=>{
    return await signer.getAddress()
};

const formatEther = (balance_)=>{
    return ethers.utils.formatEther(balance_)
};
const updateInfo = async () => {
    let userAddress = await getAddress();
	console.log(userAddress);
	let length = userAddress.length;
    $("#connect-wallet-button").html(`Connect to: ${userAddress.substr(0,4)}..`+`..${userAddress.substr((length-4),length)}`);
};

const updateMintInfo = async() => {
    let minted = Number(await SweepStake.totalSupply());
    let wlLeft = Number(await SweepStake.wlSupplyLeft());
    const _senderAddress = await getAddress();
	const balance = await provider.getBalance(_senderAddress);
	const balanceInEth = Number(ethers.utils.formatEther(balance));
	const num = balanceInEth.toFixed(3);
	console.log(`balance: ${num} ETH`)
    totalMinted = minted;
	$("#eth_balance").html(`[${num} ETH]`);
    $("#total_minted").html(`${minted}/3000`);
};
function updatePrice() {
    let currentClaim = Number($("#input-minting-number").text());
    //$("#total_paid").html(`${(priceEth * currentClaim).toFixed(3)} <span style="font-family: Arial, Helvetica, sans-serif;">Ξ</span>`)
}
ethereum.on("accountsChanged", async(accounts_)=>{
    location.reload();
});

window.onload = async()=>{
    await updateInfo();
    //await updateMintInfo();
    //await updatePrice();
};

window.onunload = async()=>{
    cachePendingTransactions();
}