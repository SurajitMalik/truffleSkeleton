pragma solidity ^0.4.21;

contract simpleSetGet{
    
    string public name;
    
    function setName(string _name) public returns (bool){
        name = _name;
        return true;
    }
    
    function getName() public view returns(string){
        return name;
    }
}