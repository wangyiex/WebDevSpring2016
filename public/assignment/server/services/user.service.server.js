module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get(" /api/assignment/user?username=:username", findUserByName);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredential);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser() {

    }
    function findAllUsers() {

    }
    function findUserById() {

    }
    function findUserByName() {

    }
    function findUserByCredential() {

    }
    function updateUserById() {

    }
    function deleteUserById() {

    }

}