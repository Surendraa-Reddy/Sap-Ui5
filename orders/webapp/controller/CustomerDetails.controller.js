sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("orders.controller.CustomerDetails", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("CustomerDetails").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sCustomerId = oEvent.getParameter("arguments").customerId;

            // CustomerID is string key, so it must be wrapped in quotes
            var sPath = "/Customers('" + sCustomerId + "')";
            this.getView().bindElement({
                path: sPath
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("Customers", {}, true);
            }
        }
    });
});