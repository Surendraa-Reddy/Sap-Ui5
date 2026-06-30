sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    Filter,
    FilterOperator
) {
    "use strict";

    return Controller.extend("orders.controller.OrdersQueries", {

        onInit: function () {

        },

        onSearchOrders: function (oEvent) {

            var sValue = oEvent.getParameter("newValue") ||
                oEvent.getParameter("query") || "";

            var oTable = this.byId("ordersQueriesTable");
            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                return;
            }

            var aFilters = [];

            if (sValue) {

                aFilters.push(new Filter({
                    filters: [

                        new Filter(
                            "CustomerID",
                            FilterOperator.Contains,
                            sValue
                        ),

                        new Filter(
                            "CompanyName",
                            FilterOperator.Contains,
                            sValue
                        ),

                        new Filter(
                            "ShipName",
                            FilterOperator.Contains,
                            sValue
                        ),

                        new Filter(
                            "ShipCountry",
                            FilterOperator.Contains,
                            sValue
                        ),

                        new Filter(
                            "ShipCity",
                            FilterOperator.Contains,
                            sValue
                        )

                    ],
                    and: false
                }));

            }

            oBinding.filter(aFilters);

        },

        onRefresh: function () {
            
            this.getView().getModel().refresh(true);


        },

        onNavigateToOrders: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("Routeview1");

        },

        onNavigateToCustomers: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("Customers");

        },

        onNavigateToEmployees: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("Employees");

        },
        onViewOrder: function (oEvent) {

            var sPath = oEvent.getSource().getBindingContext().getPath();

            this.getOwnerComponent().getRouter().navTo("OrdersQueriesDetails", {
                path: encodeURIComponent(sPath)
            });

        }

    });

});
