module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFileById);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateField);


    function findFieldsByFormId() {

    }
    function findFieldsByFieldId() {

    }
    function deleteFileById() {

    }
    function createFieldByFormId() {

    }
    function UpdateField() {

    }
}