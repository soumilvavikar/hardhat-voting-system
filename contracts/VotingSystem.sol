//SPDX-License-Identifier: ISC

pragma solidity ^0.8.26;

/**
 * Import statements
 */
import "hardhat/console.sol";

/**
 * @title Simple Voting System
 * @author Soumil Vavikar
 * @notice NA
 */
contract VotingSystem {
    /** The map to store the voting information / counts */
    mapping(uint256 => mapping(string => uint256)) private s_votesReceived;
    /** Election Counter */
    uint256 private s_electionCounter;
    /** List of parties */
    string[] private s_parties;

    /** Default constructor */
    constructor() {
        s_electionCounter = 0;
    }

    /**
     * This function will start the new voting process.
     */
    function startVotingProcess() external {
        // Setting default parties
        s_parties = ["INC", "BJP"];
        s_electionCounter += 1;
    }

    /**
     * This function will return the total number of votes received by the party
     * @param party party for which we need to check the total votes
     */
    function totalVotesFor(
        string memory party
    ) external view returns (uint256) {
        require(isValidParty(party));
        return s_votesReceived[s_electionCounter][party];
    }

    /**
     * This function will cast the vote for the incoming party
     * @param party party we want to vote for
     */
    function castVote(string memory party) external {
        require(isValidParty(party));
        s_votesReceived[s_electionCounter][party] += 1;
    }

    /**
     * This function will validate whether the incoming party is valid or not. i.e. is it present in the list of contesting parties.
     * @param party incoming party
     */
    function isValidParty(string memory party) public view returns (bool) {
        // Checking if the election process has been started
        require(0 != s_parties.length);

        // Checking if the party passed to the function is present in the list of contesting parties
        for (uint i = 0; i < s_parties.length; i++) {
            if (keccak256(bytes(s_parties[i])) == keccak256(bytes(party))) {
                return true;
            }
        }
        return false;
    }

    /**
     * This function will get the contesting parties list
     */
    function getContestingParties() external view returns (string[] memory) {
        return s_parties;
    }

    /**
     * This function will declare the winner.
     */
    function declareResult() external view returns (string memory) {
        uint256 maxVotes = 0;
        string memory partyWithMaxVotes;

        // console.log("Election Number: ", s_electionCounter);
        for (uint i = 0; i < s_parties.length; i++) {
            //console.log("Contesting Party: ", s_parties[i]);
            // console.log(
            //     "No. of votes recieved by the party: ",
            //     s_votesReceived[s_electionCounter][s_parties[i]]
            // );
            if (maxVotes < s_votesReceived[s_electionCounter][s_parties[i]]) {
                maxVotes = s_votesReceived[s_electionCounter][s_parties[i]];
                partyWithMaxVotes = s_parties[i];
            }
        }

        // console.log("Winner of the Elections: ", partyWithMaxVotes);
        return partyWithMaxVotes;
    }

    /** Getter functions */
    function getElectionCounter() external view returns (uint256) {
        return s_electionCounter;
    }

    function noOfContestingParties() public view returns (uint256) {
        return s_parties.length;
    }
}
