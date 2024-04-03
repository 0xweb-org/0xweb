contract StorageCounter {
    uint256 count = 1;

    struct User {
        address owner;
        uint256 amount;
    }
    User user = User(address(this), 5);

    function getCountMethod () public view returns (uint256) {
        return count;
    }

    function updateUser (User calldata user_) external {
        user = user_;
    }
}
