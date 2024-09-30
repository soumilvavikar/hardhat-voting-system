// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Voting System contract", function () {

    async function deployVotingSystemFixture() {

        // Getting the instance of the contract to be tested
        const hardhatVotingSystem = await ethers.deployContract("VotingSystem");
        // Before we proceed with tests, we need to wait for the contract to be deployed and its transaction to be mined. 
        await hardhatVotingSystem.waitForDeployment();

        // Starting the voting process
        await hardhatVotingSystem.startVotingProcess();

        return { hardhatVotingSystem };
    }

    // Using describe, we can group the tests logically
    describe("Initiate Voting Process", function () {

        // It is a mocha function, used to write and execute the tests
        it("Voting process should start", async function () {
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);

            expect(await hardhatVotingSystem.getElectionCounter()).to.equal(1);
            expect(await hardhatVotingSystem.noOfContestingParties()).to.equal(2);
        });

        it("Is the input party name valid", async function () {
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);

            // Positive Tests
            expect(await hardhatVotingSystem.isValidParty("INC")).to.be.true;
            expect(await hardhatVotingSystem.isValidParty("BJP")).to.be.true;

            // Negative test
            expect(await hardhatVotingSystem.isValidParty("ABC")).to.be.false;
        });

        it("Get Contesting Parties returns the enrolled parties.", async function () {
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);

            const contestingParties = await hardhatVotingSystem.getContestingParties();
            
            expect(contestingParties.length).to.equal(2);
            expect(contestingParties[0]).to.equal("INC");
            expect(contestingParties[1]).to.equal("BJP");
        });
    });

    describe("Casting and Counting Votes", function(){

        it("Cast Vote should work for valid parties", async function(){
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);
            // Postive test cases
            await expect(hardhatVotingSystem.castVote("INC")).not.to.be.reverted;
            await expect(hardhatVotingSystem.castVote("BJP")).not.to.be.reverted;
        });

        it("Cast Vote should not work for invalid parties", async function(){
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);

            // Negative test case
            await expect(hardhatVotingSystem.castVote("ABC")).to.be.reverted;
        });

        it("Total votes should be returned for a valid party", async function(){
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);
            // Postive test cases
            await hardhatVotingSystem.castVote("INC");
            await hardhatVotingSystem.castVote("BJP");

            expect(await hardhatVotingSystem.totalVotesFor("INC")).to.equal(1);
            expect(await hardhatVotingSystem.totalVotesFor("BJP")).to.equal(1);
        });

        it("Total votes should not be returned for invalid party", async function(){
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);

            await expect(hardhatVotingSystem.totalVotesFor("ABC")).to.be.reverted;
        });
    });

    describe("Declare Results", function(){

        it("The results are declared", async function(){
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);
            // Postive test cases
            await hardhatVotingSystem.castVote("INC");
            await hardhatVotingSystem.castVote("BJP");
            await hardhatVotingSystem.castVote("BJP");
            await hardhatVotingSystem.castVote("BJP");

            expect(await hardhatVotingSystem.declareResult()).to.equal("BJP");
        });
    });

    // Using describe, we can group the tests logically
    describe("Re-initiate Voting Process", function () {

        // It is a mocha function, used to write and execute the tests
        it("Voting process should start again (Election counter value should go up by 1)", async function () {
            // Loading the fixture
            const { hardhatVotingSystem } = await loadFixture(deployVotingSystemFixture);
            await hardhatVotingSystem.startVotingProcess();

            expect(await hardhatVotingSystem.getElectionCounter()).to.equal(2);
            expect(await hardhatVotingSystem.noOfContestingParties()).to.equal(2);
        });
    });
});