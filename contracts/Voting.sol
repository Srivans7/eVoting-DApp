//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract VotingFactory {
    address[] public deployedVotings;

    event VotingCreated(address CampaignAddress, string _campaign_name);

    function createVoting(address _owner, string memory _campaign_name, uint _timeperiod, uint _candidatesCount, string[] memory _names) public
    {

        EVoting newVoting = new EVoting(_owner,_campaign_name,
            _timeperiod, _candidatesCount, _names);

        deployedVotings.push(address(newVoting));
        emit VotingCreated(address(newVoting), _campaign_name);
    }
}

contract EVoting{
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    address public Owner;
    string public electionName;
    uint public EndTime;
    uint public StartTime;
    uint public candidatesCount;

    mapping(uint => Candidate) public candidates;
    mapping(address=>bool) hasVoted;

    constructor(address _owner,string memory _campaign_name, uint _timeperiod, uint _candidatesCount, string[] memory _names)
    {
        Owner = _owner;
        electionName = _campaign_name;
        StartTime = block.timestamp;
        EndTime = StartTime + _timeperiod;
        candidatesCount = _candidatesCount;
        for (uint i = 1; i <= candidatesCount; i++) {
            {
                candidates[i] = Candidate(i, _names[i-1], 0);
            }
        }
    }

    function vote(uint _candidateId) public {
        require(msg.sender!=Owner, "The owner's address cannot cast a vote!");
        require(!hasVoted[msg.sender], "This address has already voted!");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID!");
        require(block.timestamp<EndTime,"Voting Time is Over!");
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount ++;
    }

    function getWinner() public view returns (string memory) {
        require(block.timestamp>EndTime,"The E-Voting has not yet ended");
        uint winningVoteCount = 0;
        uint winningCandidateId;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        return candidates[winningCandidateId].name;
    }
}