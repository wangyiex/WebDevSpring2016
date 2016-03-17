module.exports = function(app, formModel,userModel) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    //the implementation of finding forms by user id
    function findFormsByUserId(req, res) {
        var userId = Number(req.params.userId);
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);
    }

    //the implementation of finding form by form id
    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    //the implementation of deleting form by form id
    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.send(200);
    }

    //the implementation of creating form by user id
    function createFormById(req,res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createFormById(userId, form);
        res.send(200);
    }

    //the implementation of updating form by form id
    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newform = req.body;
        formModel.updateFormById(formId, newform);
        res.send(200);
    }
}