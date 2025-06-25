angular
  .module("notify", ["bootstrap-modal", "bootstrap-growl"])
  .factory(
    "notify",
    function ($compile, $timeout, $http, bootstrapModal, growl) {
      function notify() {
        var self = this;

        self.notifications = function (scope) {
          $http({
            method: "POST",
            url: "handlers/admin_notifications/notifications.php",
          }).then(
            function mySucces(response) {
              scope.notifications = angular.copy(response.data);
            },
            function myError(response) {}
          );
        };

        self.viewNotification = function (scope, row) {
          title = 'Notification Info';
          var dataThemeMode = localStorage.getItem('data-theme-mode');

          $timeout(function() { 

            if (scope.$id > 2) scope = scope.$parent;
            
              $http({
                    method: 'POST',
                    url: 'handlers/admin_notifications/view-notification.php',
                    data: {id: row.id}
                  }).then(function mySucces(response) {
                    
                    scope.viewNotification = response.data;
                    
                    clearInterval(scope.stopNotification);
                    
                    if(dataThemeMode == 'light'){
                      scope.dataThemeMode = 'light';
                    } else {
                      scope.dataThemeMode = 'dark';
                    }

                  }, function myError(response) {
                    
                    // error
                    
                  });

              },500);

            var onOk = function(scope){

            }
            
            if(scope.n.module_name == 'Equipment'){
              bootstrapModal.box8(scope,title,'components/modal/equipment-notification.html',onOk);
            } else if(scope.n.module_name == 'Land') {
              bootstrapModal.box8(scope,title,'components/modal/land-notification.html',onOk);
            } else if(scope.n.module_name == 'Infrastructure Asset') {
              bootstrapModal.box8(scope,title,'components/modal/infrastructure-notification.html',onOk);
            } else if(scope.n.module_name == 'Building Structures') {
              bootstrapModal.box8(scope,title,'components/modal/building-notification.html',onOk);
            } else if(scope.n.module_name == 'Furniture and Fixture') {
              bootstrapModal.box8(scope,title,'components/modal/furniture-and-fixture.html',onOk);
            } else if(scope.n.module_name == 'USER') {
              bootstrapModal.box8(scope,title,'components/modal/user-notification.html',onOk);
            } else {
              bootstrapModal.box8(scope,title,'components/modal/view-notification.html',onOk);
            }
        };

        self.approveRequest = function(scope, row) {
          
          console.log(scope)

          Swal.fire({
            title: "Activate this User?",
            icon: "question",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Approve",
          }).then((result) => {
            if (result.isConfirmed) {
    
              $http({
                method: 'POST',
                url: 'handlers/users/approve-user.php',
                data: {id: scope.n.module_id}
              }).then(function mySuccess(response) {
                
                Swal.fire({
                  title: "Activated Successfully!",
                  icon: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Okay"
                }).then((result) => {
                  if (result.isConfirmed) {
                    
                    location.reload();
      
                  } else {
    
                    location.reload();
    
                  }
                });
      
              }, function myError(response) {
                
                // error
                
              });	
    
            }
          });

        }

      }

      return new notify();
    }
  );
