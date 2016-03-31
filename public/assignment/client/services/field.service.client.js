
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var service = {
            createFieldForForm:createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldForForm:deleteFieldForForm,
            updateField:updateField,
            updateFields:updateFields
        };
        return service;

        //the implementation of creating field for form
        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId +"/field", field);
        }

        //the implementation of geting fields for form
        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        //the implementation of geting field for form
        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        //the implementation of deleting field for form
        function deleteFieldForForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        //the implementation of updating field
        function updateField(formId, fieldId, field) {
            return $http.put(" /api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        //the implementation of updating all the fields after dragging
        function updateFields(formId,field) {
            return $http.put("/api/assignment/form/"+formId+"/fields",field);
        }
    }
})();