(function() {
  'use strict';

  angular.module('app', ['irontec.simpleChat','btford.socket-io']).controller('Shell', function($scope,$http){
    var myIoSocket = io.connect('https://platform-events-addidas.herokuapp.com');
  
    console.log(myIoSocket);

    var vm = this;

    console.log('vm',vm);

    vm.messages = [];

    vm.username = 'Client';
    
    vm.sendMessage = function(message, username) {
      if(message && message !== '' && username) {
        $http.post("http://platform-events-addidas.herokuapp.com/sendMessage",{'content':message})
        .success(function(data) {
          vm.messages.push({
            'username': 'Client',
            'content': message
          });
        });
        
      }
    };    
    
    myIoSocket.on('event-processed', (response) => {
        console.log("event-processed", response);
        var message = JSON.parse(response);
        if(!message.payload.Client__c){
          vm.messages.push({
            'username': 'Adidas',
            'content': message.payload.Message__c
          });
          $scope.$apply();
        }
        
    });

    
  })
})();
