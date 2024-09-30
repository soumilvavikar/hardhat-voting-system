import "hardhat";

async function main() {
    // Deployed Contract address here. 
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // This line will help retrieve the contract
    const votingSystem = await hre.ethers.getContractAt("VotingSystem", contractAddress);
    
    const parties = await votingSystem.getContestingParties();
    console.log("Contesting Parties :: ", parties);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });