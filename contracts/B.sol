pragma solidity ^0.4.24;

contract B{

    struct b{
        bytes Name;
        bytes Desc;
    }

    mapping (bytes32 => b) public bs;

    constructor(
        bytes32 _id,
        bytes _name,
        bytes _desc
    )
        public
    {
        bs[_id].Name =  _name;
        bs[_id].Desc = _desc;
    }

    function getName(bytes32 _id)
        public
        view
        returns (bytes)
    {
        return bs[_id].Name;
    }
}