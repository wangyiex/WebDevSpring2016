module.exports = function(app,formModel,userModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateField);

    //the implementation of finding fields by form id
    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    //the implementation of finding fields by fieldId
    function findFieldsByFieldId(req, res) {

    }

    //the implementation of deleting finding field
    function deleteFieldById(req, res) {

    }

    //the implementation of creating field by form id
    function createFieldByFormId(req, res) {

    }

    //the implementation of updating field by id
    function UpdateField(req, res) {

    }
}