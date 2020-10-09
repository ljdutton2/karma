const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "weird enhance fluid flag session copy then gloom canoe cross crater balance";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {

  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/5d5b20bb7ebe42fa991a8fe0b426c4c8")
      },
      network_id: 3
    }
  },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    develop: {
      port: 8545

    } 
    }
};
