(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, FieldService) {
        var formId = $routeParams.formId;
        console.log(formId);
    }
})();
