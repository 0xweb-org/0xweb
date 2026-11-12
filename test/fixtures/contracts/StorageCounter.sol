contract StorageCounter {
    uint256 public counter = 1;

    event Incremented(uint256 value);

    struct User {
        address owner;
        uint256 amount;
    }
    User public user = User(address(this), 5);

    function getCountMethod () public view returns (uint256) {
        return counter;
    }

    function updateUser (User calldata user_) external {
        user = user_;
    }

    function increment () external {
        counter++;
        emit Incremented(counter);
    }
}
