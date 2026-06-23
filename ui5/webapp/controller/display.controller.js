sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("ui5.controller.display", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("display")
                .attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {

            var sEmpId = oEvent.getParameter("arguments").empId;
              //console.log("Employee ID:", sEmpId); 
            this.getView().bindElement({
                path: "/EmployeeSet(" + sEmpId + ")"
            });
        },

        backtotest4: function () {
            this.getOwnerComponent().getRouter().navTo("test4");
        }

    });
});