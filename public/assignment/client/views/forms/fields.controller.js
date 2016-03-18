(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, FieldService,$scope) {
        var formId = $routeParams.formId;

        //event handler
        $scope.removeField = removeField;
        $scope.addField = addField;

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
    }
})();
