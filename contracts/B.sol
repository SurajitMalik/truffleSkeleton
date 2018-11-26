pragma solidity ^0.4.24;

contract B{

    struct b{
        string Name;
        string Desc;
    }

    mapping (uint8 => b) public bs;

    constructor(
        uint8 _id,
        string _name,
        string _desc
    )
        public
    {
        bs[_id] = (_id, _name, _desc);
    }
}