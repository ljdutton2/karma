App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load tasks. task
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

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() { 
    $.getJSON('Karma.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var KarmaArtifact = data;
      App.contracts.Karma = TruffleContract(KarmaArtifact);
    
      // Set the provider for our contract
      App.contracts.Karma.setProvider(App.web3Provider);
    
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
      $('.panel-task').eq(i).find('button').text('Claimed').attr('disabled', true);
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

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
