//SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

import "./OrkToken.sol";
import "./DAIToken.sol";

contract ORKTokenFarm{
    
    string public name = "OrkTokenFarm";
    OrkToken public orkToken;
    DAIToken public daiToken;
    address public owner;
    
    address[] public stackers;

    mapping(address => uint)public stackAmt;
    mapping(address => bool)public isStacked;

    constructor(OrkToken _OrkToken, DAIToken _DAIToken){
        orkToken = _OrkToken;
        daiToken = _DAIToken;
        owner = msg.sender;
    }

    function stack(uint _amt)public {
        require(_amt > 0, "Less Amount!");
        stackAmt[msg.sender] += _amt;
        isStacked[msg.sender] = true;
        stackers.push(msg.sender);
        daiToken.transferFrom(msg.sender, address(this), _amt);
    }

    
    function unStack()public {
        require(isStacked[msg.sender], "Not Stacker !");
        uint value = stackAmt[msg.sender];
        stackAmt[msg.sender] = 0;
        isStacked[msg.sender] = false; 
        daiToken.transfer(msg.sender, value);
    }
    
    function issueToken()public {
        require(msg.sender == owner, "Owner ?");
        for(uint i=0; i < stackers.length; i++){
            address stacker  = stackers[i];
            uint amt = stackAmt[stacker];
            if(amt > 0){
              orkToken.transfer(stacker,amt);
            }
        }
    }

}