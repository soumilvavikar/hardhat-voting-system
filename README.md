# Voting System Project using Hardhat

## Setting up a new Hardhat Project

```shell
# Initialize the npm project
npm init
# Install Hardhat
npm install --save-dev hardhat
# Initialize Hardhat project 
npx hardhat init

npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```

Update the `hardhat.config.js` file.

## Build and Unit Test the Smart Contract

```shell
# Build a hardhat project 
npx hardhat compile

# Run tests in the test folder
npx hardhat test
```

## Deploy and Test the Contract

### Spin the Local Hardhat Node

```shell
npx hardhat node
```

This will start the local node and in the terminal we can see the dummy accounts, their mapped private keys, and ethers assigned to them.

### Deploying the contract to Ignition LocalNet

```shell
npx hardhat ignition deploy ignition/modules/VotingSystemModule.js --network localhost

# Getting info on deployment - this will return the chain-id
npx hardhat ignition deployments 

# Getting the status of the deployment 
npx hardhat ignition status chain-31337
```

### Commands for Interacting with the Deployed Contract

```shell
# Voting for INC
npx hardhat run --network localhost interactions/CastVoteForINC.js

# Voting for BJP
npx hardhat run --network localhost interactions/CastVoteForBJP.js

# Declaring the Results
npx hardhat run interactions/DeclareResults.js --network localhost

# Recontesting the elections
npx hardhat run interactions/InitiateVotingProcess.js --network localhost

# Get Contesting Parties
npx hardhat run interactions/GetContestingParties.js --network localhost
```
