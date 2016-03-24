(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController)
        .controller("DialogController", DialogController);

    function FieldController($routeParams,$uibModal ,FieldService,$scope) {
        var formId = $routeParams.formId;

        //event handler
        $scope.removeField = removeField;
        $scope.addField = addField;
        $scope.editField = editField;

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    console.log(response.data);
                    $scope.fields = response.data;
                });
        }
        init();

        //the implementation of removing field by field id
        function removeField(fieldId) {
            FieldService
                .deleteFieldForForm(formId, fieldId)
                .then(function() {
                    return FieldService
                        .getFieldsForForm(formId);
                })
                .then(function(response) {
                    $scope.fields = response.data;
                });
        }

        //the implementation of adding field
        function addField(type) {
            if (typeof type == "undefined") {
                return ;
            }
            var fieldtype = {
                "TEXT": {
                    "_id": null,
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                },
                "TEXTAREA": {
                    "_id": null,
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                },
                "DATE": {
                    "_id": null,
                    "label": "New Date Field",
                    "type": "DATE"
                },
                "DROPDOWN": {
                    "_id": null,
                    "label": "New Dropdown",
                    "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                },
                "CHECKBOXES": {
                    "_id": null,
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                },
                "RADIOS": {
                    "_id": null,
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            };

            FieldService
                .createFieldForForm(formId,fieldtype[type])
                .then(function(){
                    return FieldService
                        .getFieldsForForm(formId);
                })
                .then(function(response) {
                    $scope.fields = response.data;
                });
        }

        //the implementation of editing field
        function editField(field) {
            var modalInstance = $uibModal.open({
                templateUrl: "views/forms/dialog.view.html",
                controller: "DialogController",
                controllerAs: "models",
                resolve: {
                    type: function () {
                        return field.type;
                    }
                }
            });

            modalInstance.result.then(function (newField) {
                FieldService
                    .updateField(formId, field._id, newField)
                    .then(function(){
                        return FieldService
                            .getFieldsForForm(formId);
                    })
                    .then(function(response) {
                        $scope.fields = response.data;
                        console.log(response.data);
                    });
            });
        }
    }

    function DialogController($uibModalInstance, type) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.message = null;

        function init() {
            vm.type = type;
        }
        init();

        function ok(field) {
            if (typeof field == "undefined") {
                vm.message = "Please enter something!";
                return ;
            }
            if (!field.label) {
                vm.message = "The label can not be empty!";
                return ;
            }

            if ((type == "TEXT" || type == "TEXTAREA") && !field.placeholder) {
                vm.message = "The placeholder can not be empty";
                return ;
            }

            if ((type == "OPTIONS" || type == "CHECKBOXES" || type == "RADIOS") && !field.options) {
                vm.message = "The options can not be empty";
                return ;
            }

            var newField = {
                "label" : field.label
            };

            if (field.placeholder) {
                newField = {
                    "label" : field.label,
                    "placeholder": field.placeholder
                };
            }

            if (field.options) {
                var optionsTemp = [];
                var info = field.options;
                var optionArr = info.split("\n");
                for (var o in optionArr) {
                    var pair = optionArr[o].split(":");
                    if (pair.length == 2) {
                        var option = {
                            "label": pair[0],
                            "value": pair[1]
                        };
                        optionsTemp.push(option);
                    } else {
                        vm.message = "Please follow input format as label:value!";
                        return ;
                    }
                }

                newField = {
                    "label" : field.label,
                    "options": optionsTemp
                };
            }
            $uibModalInstance.close(newField);
        }

        function cancel() {
            $uibModalInstance.dismiss("cancel");
        }
    }
})();
