sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (
    Controller,
    History
) {
    "use strict";

    return Controller.extend("orders.controller.OrdersQueriesDetails", {

        onInit: function () {

            var oRouter = this.getOwnerComponent().getRouter();

            oRouter.getRoute("OrdersQueriesDetails")
                .attachPatternMatched(this._onObjectMatched, this);

        },
        _onObjectMatched: function (oEvent) {

            var sPath = decodeURIComponent(
                oEvent.getParameter("arguments").path
            );

            this.getView().bindElement({
                path: sPath
            });

        },
        onRefresh: function () {

            this.getView().getModel().refresh(true);

        },
        onNavigateToOrders: function () {

            this.getOwnerComponent().getRouter().navTo("OrdersQueries");

        },      

        onNavBack: function () {

            var oHistory = History.getInstance();

            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {

                window.history.go(-1);

            } else {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("OrdersQueries", {}, true);

            }

        }

    });

});