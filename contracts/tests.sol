import "truffle/Assert.sol";

// Proxy contract for testing throws
contract ThrowProxy {
  address public target;
  bytes data;

  function ThrowProxy(address _target) {
    target = _target;
  }

  //prime the data using the fallback function.
  function() {
    data = msg.data;
  }

  function execute() returns (bool) {
    return target.call(data);
  }
}

// Contract you're testing
contract Thrower {
  function doThrow() {
    throw;
  }

  function doNoThrow() {
    //
  }
}

// Solidity test contract, meant to test Thrower
contract TestThrower {
  function testThrow() {
    Thrower thrower = new Thrower();
    ThrowProxy throwProxy = new ThrowProxy(address(thrower)); //set Thrower as the contract to forward requests to. The target.

    //prime the proxy.
    Thrower(address(throwProxy)).doThrow();
    //execute the call that is supposed to throw.
    //r will be false if it threw. r will be true if it didn't.
    //make sure you send enough gas for your contract method.
    bool r = throwProxy.execute.gas(200000)();

    Assert.isFalse(r, “Should be false, as it should throw”);
  }
}