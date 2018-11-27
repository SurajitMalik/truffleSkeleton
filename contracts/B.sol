pragma solidity ^0.4.24;

contract B{

    struct b{
        string Name;
        string Desc;
    }

    mapping (bytes32 => b) public bs;

    constructor(
        bytes32 _id,
        string _name,
        string _desc
    )
        public
    {
        bs[_id].Name =  _name;
        bs[_id].Desc = _desc;
    }

    function modifyName(
        bytes32 _id,
        string _newName
    )
        external
        returns (bool)
    {
        bs[_id].Name = _newName;
        return true;
    }
}