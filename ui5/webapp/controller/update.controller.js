sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "ui5/model/formatter"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("ui5.controller.update", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("update")
                .attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {

            var sEmpId = oEvent.getParameter("arguments").empId;

            this.getView().bindElement({
                path: "/EmployeeSet(" + sEmpId + ")"
            });
        },

        onUpdateEmployee: function () {

            var oModel = this.getView().getModel();

            var sPath = this.getView()
                .getBindingContext()
                .getPath();

            var oData = this.getView()
                .getBindingContext()
                .getObject();

            oModel.update(sPath, oData, {

                success: function () {
                        oModel.refresh(true);
                        
                    MessageBox.success("Employee Updated Successfully");
                   
                },

                error: function () {
                    MessageBox.error("Update Failed");
                }
            });
        },

        onBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("test4");
        }

    });
});