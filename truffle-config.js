const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "weird enhance fluid flag session copy then gloom canoe cross crater balance";
module.exports = {
  networks: {
   development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*"
   },
   rinkeby: {
       provider: function() { 
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/5d5b20bb7ebe42fa991a8fe0b426c4c8");
       },
       network_id: 4,
       gas: 4500000,
       gasPrice: 10000000000,
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
    };

