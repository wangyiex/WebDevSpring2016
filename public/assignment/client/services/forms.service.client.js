/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var service = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };
        return service;

        //the implementation of creating form by user id
        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        //the implementation of finding all forms by user id
        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId +"/form");
        }
        //the implementation of deleting form by form id
        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/" + formId);
        }

        //the implementation of updating form by form id
        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/" + formId, newForm);
        }



    }
})();