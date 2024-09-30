const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
// Here we are building the module using the buildModule command. 
module.exports = buildModule("VotingSystemModule", (m) => {
    const module = m.contract("VotingSystem", []);

    // Initiate the voting process. 
    m.call(module, "startVotingProcess", []);

    return { module };
});