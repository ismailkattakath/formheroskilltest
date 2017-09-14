angular.module('skillsLab').directive('fhDateInput', function ($timeout) {
    var uniqueId = 1;
    var directive = {};
    directive.restrict = 'A';
    directive.templateUrl = 'fh-date-input/fh-date-input.tpl.html';
    directive.scope = {
        ngModel: "=?",
        displayFormat: "@?",
        dateChanged: '&',
        pickerClosed: '&',
        fhMinDate: "@?",
        fhMaxDate: "@?",
        readonly: "=?",
        fhRequired: "=?"
    };
    directive.controller = function ($scope) {
        $scope.placeholder = "Choose Date";
        if (!$scope.displayFormat)
            $scope.displayFormat = "dd MM, yy";
        if (!$scope.dataFormat)
            $scope.dataFormat = "yy-mm-dd";
        if (!$scope.fhMinDate)
            $scope.fhMinDate = "-30y";
        if (!$scope.fhMaxDate)
            $scope.fhMaxDate = "+30y";
        if (!$scope.yearRange)
            $scope.yearRange = "c-30:c+30";
        if (!$scope.fhRequired)
            $scope.fhRequired = false;
    };
    directive.compile = function (element, attributes) {
        var linkFunction = function ($scope, element, attributes) {
            var jqdatepickerTextboxId = 'jqdatepicker-textbox-' + uniqueId;
            var jqdatepickerAlternateId = 'jqdatepicker-alternate-' + uniqueId;
            var jqdatepickerBtnId = 'jqdatepicker-btn-' + uniqueId;
            $('#jqdatepicker-textbox').attr('id', jqdatepickerTextboxId);
            $('#jqdatepicker-alternate').attr('id', jqdatepickerAlternateId);
            $('#jqdatepicker-btn').attr('id', jqdatepickerBtnId);
            uniqueId++;
            $("#" + jqdatepickerTextboxId).datepicker({
                dateFormat: $scope.displayFormat,
                altField: "#" + jqdatepickerAlternateId,
                altFormat: $scope.dataFormat,
                changeMonth: true,
                changeYear: true,
                minDate: $scope.fhMinDate,
                maxDate: $scope.fhMaxDate,
                yearRange: $scope.yearRange,
                defaultDate: null,
                onSelect: function (date, obj) {
                    $timeout(function () {
                        $scope.ngModel = $("#" + jqdatepickerAlternateId).val();
                        $scope.dateChanged({"date": $scope.ngModel});
                    });
                },
                onClose: function (date, obj) {
                    $timeout(function () {
                        $scope.ngModel = $("#" + jqdatepickerAlternateId).val();
                        $scope.pickerClosed({"date": $scope.ngModel});
                    });
                }
            }).datepicker("setDate", new Date($scope.ngModel));
            $('#' + jqdatepickerBtnId).click(function () {
                $('#' + jqdatepickerTextboxId).datepicker("show");
            });
        };
        return linkFunction;
    };
    return directive;
});
