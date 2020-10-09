pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";

import "../contracts/karma.sol";

contract TestKarma {
  function testInitialBalanceUsingDeployedContract() {
    karma meta = karma(DeployedAddresses.karma());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 karma initially");
  }

  function testInitialBalanceWithNewkarma() {
    karma meta = new karma();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 karma initially");
  }
}