module.exports = function (db, mongoose) {

    var api = {
        findFormsByUserId:findFormsByUserId,
        deleteFormById:deleteFormById,
        findFormById:findFormById,
        createFormById:createFormById,
        updateFormById:updateFormById,
        findFieldsByFormId:findFieldsByFormId,
        findFieldByFieldId:findFieldByFieldId,
        deleteFieldById:deleteFieldById,
        createFieldByFormId:createFieldByFormId,
        updateField:updateField
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

    //the implementation of finding field by fieldId
    function findFieldByFieldId(formId, fieldId) {
        var fields = findFieldsByFormId(formId);
        var field;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                field = fields[f];
            }
        }
        return field;
    }

    //the implementation of deleting field by id
    function deleteFieldById(formId, fieldId) {
        var field = findFieldByFieldId(formId, fieldId);
        var form = findFormById(formId);
        var index = form.fields.indexOf(field);
        form.fields.splice(index,1);
        console.log(form);
        return
    }

    //the implementation of creating field for form
    function createFieldByFormId(formId, field) {
        var newfield = field;
        field._id = (new Date()).getTime();
        var form = findFormById(formId);
        form.fields.push(newfield);
        return;
    }

    //the implementation of update field
    function updateField(formId,fieldId,newfield) {
        var field = findFieldByFieldId(formId,fieldId);
        if (field) {
            field.label = newfield.label;
            if (newfield.placeholder) {
                field.placeholder = newfield.placeholder;
            }
            if (newfield.options) {
                field.options = newfield.options;
            }
            return;
        } else {
            return null;
        }
    }
};