var q = require("q");
module.exports = function (db, mongoose) {


    // load user schema
    var FieldSchema = require("./field.schema.server.js") (mongoose);
    var FormSchema = require("./form.schema.server.js") (mongoose,FieldSchema);
    // create user model form schema
    var FieldModel = mongoose.model('Field', FieldSchema); // will do CRUD based on the schema we offered
    var FormModel = mongoose.model('Form', FormSchema);

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
        updateField:updateField,
        updateFields:updateFields
    };
    return api;

    //the implementation of finding form by its id
    function findFormById(formId) {
       var deferred = q.defer();
        FormModel.find(
            {
                _id:formId
            },
            function(err,doc) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
    //the implementation of finding forms by user id
    function findFormsByUserId(uId) {
        var deferred = q.defer();
        FormModel.find(
            {
                userId:uId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    //the implementation of deleting form by Id
    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel
            .remove(
                {_id: formId},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    //the implementation of creating form by user id
    function createFormById(userId, form) {
        var deferred = q.defer();

        var newform = {
            "userId": userId,
            "title" :form.title,
        };

        FormModel.create(newform, function(err, doc) {

            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        //return a promise
        return deferred.promise;

    }

    //the implementation of updating form by id
    function updateFormById(formId, newform) {
        var deferred = q.defer();

        FormModel.update(
            {_id: formId},
            {
                $set: {
                    "userId": newform.userId,
                    "title" :newform.title,
                }
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    //the implementation of finding fields by form id
    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        FormModel.find(
            {_id:formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

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
        var deferred = q.defer();

        FormModel
            .update(
                {
                    _id: formId
                },
                {
                    $pull: {fields: {_id: fieldId}}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    //the implementation of creating field for form
    function createFieldByFormId(formId, field) {
        var deferred = q.defer();
        FormModel
            .update(
                {
                    _id: formId
                },
                {
                    $push: {fields: field}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    //the implementation of update field
    function updateField(formId,fieldId,newfield) {
        var deferred = q.defer();

        var newPlaceholder = "";
        var newOptions = [];

        if (newfield.placeholder) {
            newPlaceholder = newfield.placeholder;
        }

        if (newfield.options) {
            newOptions = newfield.options;
        }
        FormModel
            .update(
                {
                    _id: formId,
                    'fields._id': fieldId
                },
                {
                    $set: {
                        'fields.$.label': newfield.label,
                        'fields.$.placeholder': newPlaceholder,
                        'fields.$.options': newOptions
                    }
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );
        return deferred.promise;
    }

    //the implementation of updating fields
    function updateFields(formId, fields) {
        var deferred = q.defer();
        FormModel
            .update(
                {
                    _id: formId
                },
                {
                    $set: {
                        "fields": fields
                    }
                },
                function (err, doc) {
                    if (err) {
                        return deferred.reject(err);
                    }else {
                        return deferred.resolve(doc);
                    }
                });
        return deferred.promise;
    }
};