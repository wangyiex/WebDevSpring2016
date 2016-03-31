(function(){
    angular
        .module("FormBuilderApp")
        .directive("jgaSortable", jgaSortable);

    function jgaSortable($routeParams,FieldService) {
        var start = null;
        var end = null;
        var formId = $routeParams.formId;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.fields.splice(end, 0, scope.fields.splice(start, 1)[0]);
                    scope.$apply();
                    FieldService
                        .updateFields(formId,scope.fields)
                        .then(function(){
                            return FieldService
                                .getFieldsForForm(formId);
                        })
                        .then(function(response) {
                            scope.fields = response.data;
                        });
                }
            });
        }
        return {
            link: link
        }
    }
})();