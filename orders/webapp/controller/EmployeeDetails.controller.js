sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("orders.controller.EmployeeDetails", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("EmployeeDetails")
                .attachPatternMatched(this._onObjectMatched, this);

        },

        _onObjectMatched: function (oEvent) {

            var sEmployeeId = oEvent.getParameter("arguments").employeeId;

            this.getView().bindElement({
                path: "/Employees(" + sEmployeeId + ")"
            });

        },

        onNavBack: function () {

            var oHistory = History.getInstance();

            if (oHistory.getPreviousHash() !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent()
                    .getRouter()
                    .navTo("Employees");
            }

        }

    });

});