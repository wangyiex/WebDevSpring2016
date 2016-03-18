var forms = require("./form.mock.json");
module.exports = function (app) {

    var api = {
        findFormsByUserId:findFormsByUserId,
        deleteFormById:deleteFormById,
        findFormById:findFormById,
        createFormById:createFormById,
        updateFormById:updateFormById,
        findFieldsByFormId:findFieldsByFormId
    };
    return api;

    //the implementation of finding form by its id
    function findFormById(formId) {
        var form;
        for (u in forms) {
            if(forms[u]._id == formId) {
                form = forms[u];
            }
        }
        return form;
    }
    //the implementation of finding forms by user id
    function findFormsByUserId(userId) {
        var userforms = [];
        for (u in forms) {
            if (forms[u].userId == userId) {
                userforms.push(forms[u]);
            }
        }
        return userforms;
    }

    //the implementation of deleting form by Id
    function deleteFormById(formId) {
        var form = findFormById(formId);
        var index = forms.indexOf(form);
        forms.splice(index, 1);
        return null;
    }

    //the implementation of creating form by user id
    function createFormById(userId, form) {
        console.log(form);
        var newform = {
            "_id" :(new Date()).getTime(),
            "title" :form.title,
            "userId" :userId,
            "fields":[]
        }
        forms.push(newform);
        return;
    }

    //the implementation of updating form by id
    function updateFormById(formId, newform) {
        var form = findFormById(formId);
        form.title = newform.title;
        return null;
    }

    //the implementation of finding fields by form id
    function findFieldsByFormId(formId) {

        var form = findFormById(formId);
        var fields = form.fields;
        return fields;
    }

};