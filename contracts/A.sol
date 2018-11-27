pragma solidity ^0.4.24;

import "./B.sol";

contract A{

    B b;

    mapping (bytes32 => address) public address_bs;

    constructor(
        bytes32 _id,
        string _name,
        string _desc
    )
        public
    {
        b = new B(_id, _name, _desc);
        address_bs[_id] = b;
    }

    function modifyB_name(
        bytes32 _id,
        string _newName
    )
        external
        returns (bool)
    {
        return B(address_bs[_id]).modifyName(
            _id,
            _newName
        );
    }

    function getB(bytes32 _id)
        public
        view
        returns(
            string Name,
            string Desc
        )
    {
        (Name, Desc) = B(address_bs[_id]).bs(_id);
    }
}