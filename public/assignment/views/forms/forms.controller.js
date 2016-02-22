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

        //events
        FormService.findAllFormsForUser($rootScope.currentuser._id,function(formsforuser){
           $scope.forms = formsforuser;
        });

        function addForm(formname) {
            console.log(formname);
            FormService.createFormForUser($rootScope.currentuser._id, formname,function(newform){
                $scope.forms.push(newform);
            });
        }

        function updateForm(formname) {
            $scope.forms[$scope.selectedFormIndex].title = formname;

        }
        function deleteForm(index) {
            FormService.deleteFormById(index,function(){
            });
            $scope.forms.splice(index,1);
        }
        function selectForm(index) {
            $scope.formname = $scope.forms[index].title;
            $scope.selectedFormIndex = index
        }



    }
})();