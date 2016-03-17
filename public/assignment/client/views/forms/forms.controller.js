/**
 * Created by costa on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService,$rootScope) {

        //event handler
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //init function witch called when the controller is loaded
        function init() {
            FormService
                .findAllFormsForUser($rootScope.currentuser._id)
                .then(function (response) {
                    $scope.forms = response.data;
                });
        }
        init();

        //the implementatioin of adding a form on client side
        function addForm(form) {
            if(form) {
                FormService
                    .createFormForUser($rootScope.currentuser._id,form)
                    .then(function() {
                        return FormService
                            .findAllFormsForUser($rootScope.currentuser._id);
                    })
                    .then(function(response) {
                        $scope.forms = response.data;
                        console.log($scope.forms);
                    });
            }
        }

        //the implementation of updating form on client side
        function updateForm(form) {
            var formId = form._id;
            var newform = form;
            FormService
                .updateFormById(formId, newform)
                .then(function(){
                    return FormService
                        .findAllFormsForUser($rootScope.currentuser._id);
                })
                .then(function(response) {
                $scope.forms = response.data;
            })
                .then(function() {
                   $scope.form = {};
                });
        }

        //the implementation of deleting form on client side
        function deleteForm(index) {
            FormService
                .deleteFormById(index)
                .then(function() {
                    return FormService.findAllFormsForUser($rootScope.currentuser._id);
                })
                .then(function(response) {
                   $scope.forms = response.data;
                });
        }

        //the implementation of selecting form on client side
        function selectForm(form) {
            $scope.form = {
                "_id": form._id,
                "title":form.title,
                "userId":form.userId,
                "fields":form.fields
            }
        }
    }
})();