//SPDX-License-Identifier:MIT

pragma solidity ^0.8.5;

contract DAIToken{
    
    string public name = "DAI Token";
    string public symbol = "DAIT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint256 public decimals = 18;
    
    event Transfer(address indexed owner, address indexed receiver, uint256 value);
    event Approved(address indexed owner, address indexed spender, uint _value);


    mapping(address => uint)public balanceOf;
    mapping(address => mapping(address => uint))public allowance;

    constructor(){
    balanceOf[msg.sender] = totalSupply;  
    }

    function transfer(address _to, uint _value)public returns(bool success){
        require(_to != address(0), "Invalid address");
        require(_value <= balanceOf[msg.sender], "Out of balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value)public{
        require(_spender != address(0), "Invalid address");
         require(balanceOf[msg.sender] >= _value, "Limit Exceeded");
        allowance[msg.sender][_spender] = _value;
        emit Approved(msg.sender, _spender, _value);(msg.sender, _spender, _value);
    }

    function transferFrom(address _from, address _to, uint _value)public returns(bool success){
        require(_to != address(0), "Invalid address");
        require(allowance[_from][_to] >= _value, "Insufficiant fund");
        balanceOf[_from] -= _value;
        allowance[_from][_to] -= _value;
        balanceOf[_to] += _value;
        emit Approved(_from, _to, _value);
        return true;
    }
}