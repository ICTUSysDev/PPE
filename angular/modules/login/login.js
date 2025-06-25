angular
  .module("login-module", [])
  .service("loginService", function ($http, $window) {
    this.login = function (scope) {
      scope.views.incorrect = false;

      $http({
        method: "POST",
        url: "angular/modules/login/login.php",
        data: scope.account,
      }).then(
        function mySucces(response) {
          var t = document.querySelector("#kt_sign_in_submit");
          t.setAttribute("data-kt-indicator", "on");

          if (response.data["login"] === true) { //  User successfully logged in
            setTimeout(function () {
              t.removeAttribute("data-kt-indicator");
              Swal.fire({
                text: "You have successfully logged in!",
                icon: "success",
                buttonsStyling: !1,
                confirmButtonText: "Ok, got it!",
                customClass: { confirmButton: "btn btn-primary" },
              }).then(() => {
                scope.views.incorrect = false;
                $window.location.href = "index.php";
              });
            }, 1000);
          } else if (response.data["login"] === "not_activated") { //  Account not activated
            setTimeout(function () {
              t.removeAttribute("data-kt-indicator");
              Swal.fire({
                text: "Your account is not yet activated. Please contact support.",
                icon: "warning", //  Warning icon
                buttonsStyling: !1,
                confirmButtonText: "Close",
                customClass: { confirmButton: "btn btn-primary" },
              });
            }, 1000);
          } else { //  Invalid login
            setTimeout(function () {
              t.removeAttribute("data-kt-indicator");
              Swal.fire({
                text: "Invalid Username or Password!",
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "Close",
                customClass: { confirmButton: "btn btn-primary" },
              });
            }, 1000);
          }
        },
        function myError(response) {
          console.error("Login error:", response);
        }
      );
    };
  });

var app = angular.module("login", ["login-module"]);

app.controller("loginCtrl", function ($scope, loginService) {
  $scope.views = {};
  $scope.account = {};

  $scope.login = loginService.login;
});
