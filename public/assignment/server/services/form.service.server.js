module.exports = function(app, formModel,userModel) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    //the implementation of finding forms by user id
    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findFormsByUserId(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    //the implementation of finding form by form id
    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                //login user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //the implementation of deleting form by form id
    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    //the implementation of creating form by user id
    function createFormById(req,res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormById(userId, form)
            .then(
                //login user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //the implementation of updating form by form id
    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newform = req.body;
        formModel
            .updateFormById(formId, newform)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}