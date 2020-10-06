import Web3 from "web3";
import KarmaArtifact from "../../build/contracts/Karma.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = KarmaArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        KarmaArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
    $.getJSON('../tasks.json', function(data) {
      var tasksRow = $('#tasksRow');
      var taskTemplate = $('#taskTemplate');
      for (i = 0; i < data.length; i ++) {
        taskTemplate.find('.title').text(data[i].title);
        taskTemplate.find('.date').text(data[i].date);
        taskTemplate.find('.value').text(data[i].value);
        taskTemplate.find('.distance').text(data[i].distance);
        taskTemplate.find('.btn-claim').attr('data-id', data[i].id);

        tasksRow.append(taskTemplate.html());
      }
    });
    return await App.initContract();
    },
    initContract: function() { 
      $.getJSON('Karma.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with @truffle/contract
        var KarmaArtifact = data;
        App.contracts.Karma = TruffleContract(KarmaArtifact);
      
        // Set the provider for our contract
        App.contracts.Karma.setProvider(App.web3);
      
        // Use our contract to retrieve and mark the adopted tasks
        return App.markClaimed();
      });

      return App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '.btn-claim', App.handleClaim);
  },
  markClaimed: function() {
    var KarmaInstance;

  App.contracts.Karma.deployed().then(function(instance) {
    KarmaInstance = instance;

    return KarmaInstance.getKarma.call();
  
  }).then(function(Karma) {
    for (i = 0; i < Karma.length; i++) {
      if (Karma[i] !== '0x0000000000000000000000000000000000000000') {
        $('.panel-task').eq(i).find('button').text('Claim').attr('disabled', true);
      }
    }
  }).catch(function(err) {
    console.log(err.message);
  });
    },

  handleClaim: function(event) {
    event.preventDefault();

    var taskId = parseInt($(event.target).data('id'));

    var KarmaInstance;
      

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];

    App.contracts.Karma.deployed().then(function(instance) {
      KarmaInstance = instance;

    
    });
  });

    },


  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount).send({ from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
