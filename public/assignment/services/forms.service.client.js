/**
 * Created by costa on 2/21/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };
        return service;

        function createFormForUser(userId, form, callback) {
            var newform = {
                _id:(new Date).getTime(),
                title:form,
                userId:userId,
            }
            forms.push(newform);
            callback(newform);

        }
        function findAllFormsForUser(userId, callback) {
           var userforms = [];
            for (u in forms) {
                if(forms[u].userId == userId) {
                    userforms.push(forms[u]);
                }
            }
            callback(userforms);

        }
        function deleteFormById(formId){
            forms.splice(formId,1);

        }
        function updateFormById(formId, newForm, callback){
            forms[formId] = newForm;
            callback;

        }



    }
})();