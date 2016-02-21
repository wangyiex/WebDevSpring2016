(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("FormBuilderAppController", FormBuilderAppController);
    function FormBuilderAppController($scope) {
        $scope.hello = "hello";
    }
})();