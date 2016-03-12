module.exports = function(app, userModel) {
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get(" /api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post(" /api/assignment/user/:userId/form", createFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormsByUserId() {

    }
    function findFormById() {

    }
    function deleteFormById() {

    }
    function createFormById() {

    }
    function updateFormById() {

    }
}