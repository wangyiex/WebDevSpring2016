(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, FieldService,$scope) {
        var formId = $routeParams.formId;

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    $scope.fields = response.data;
                });
        }
        init();
    }
})();
