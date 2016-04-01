module.exports = function(app,formModel,userModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateField);
    app.put("/api/assignment/form/:formId/fields",UpdateFields);

    //the implementation of finding fields by form id
    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .findFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc[0].fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    //the implementation of deleting finding field
    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldById(formId, fieldId)
            .then(
                function (doc) {
                    return formModel.findFieldsByFormId(formId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    //the implementation of creating field by form id
    function createFieldByFormId(req, res) {
        var newfield = req.body;
        var formId = req.params.formId;
        formModel
            .createFieldByFormId(formId, newfield)
            .then(
                function(doc) {
                    return formModel.findFieldsByFormId(formId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                });
        }

    //the implementation of updating field by id
    function UpdateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newfield = req.body;
        formModel
            .updateField(formId,fieldId,newfield)
            .then(
                function (doc) {
                    return formModel.findFieldsByFormId(formId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then (
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    // the implementation of updating fields by id
    function UpdateFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        formModel
            .updateFields(formId, fields)
            .then (
                function (doc) {
                    return formModel.findFieldsByFormId(formId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then (
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
}