//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

contract OrkToken{
  
  string public name = "ORKTOKEN";
  string public symbol = "OKT";
  uint public decimals = 18;
  uint public totalSupply = 1000000000000000000000000;
  
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owenr, address indexed _spender, uint _value);


  mapping(address => uint) public balanceOf;
  mapping(address => mapping(address => uint))public allowance;

  constructor(){
   balanceOf[msg.sender] = totalSupply;  
  }

  function transfer(address _to, uint _value)public returns(bool success){
    require(_to != address(0), "Invalid Address");
    require(balanceOf[msg.sender] >= _value, "Limit Exceeded");
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }
  
  function approve(address _spender, uint _value)public returns(bool success){
    require(_spender != address(0), "Invalid Address");
    require(balanceOf[msg.sender] >= _value, "Limit Exceeded");
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;   
  } 
  
  function transferFrom(address _from, address _to, uint _value)public returns(bool success){
    require(_to != address(0), "Invalid Address");
    require(allowance[_from][_to] >= _value, "Limit Exceeded");
    allowance[_from][_to] -= _value;
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}