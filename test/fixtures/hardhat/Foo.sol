contract Foo {

    uint256 public foo = 10;

    function getFoo () external view returns (uint256) {
        return foo;
    }

    function setFoo (uint256 foo_) external {
        foo = foo_;
    }
}
