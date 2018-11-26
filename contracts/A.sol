pragma solidity ^0.4.24;

import "./B.sol";

contract A{

    B b;

    mapping (bytes32 => address) public address_bs;

    constructor(
        bytes32 _id,
        bytes _name,
        bytes _desc
    )
        public
    {
        b = new B(_id, _name, _desc);
        address_bs[_id] = b;
    }

    function getB(bytes32 _id)
        public
        view
        returns(
            bytes Name,
            bytes Desc
        )
    {
        (Name, Desc) = B(address_bs[_id]).bs(_id);
    }

    function getB_name(bytes32 _id)
        public
        view
        returns (bytes)
    {
        return B(address_bs[_id]).getName(_id);
    }
}