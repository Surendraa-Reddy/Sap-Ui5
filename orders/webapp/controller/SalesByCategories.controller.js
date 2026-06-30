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

    return Controller.extend("orders.controller.SalesByCategories", {

        onInit: function () {

        },

        onSearchCategories: function (oEvent) {

            var sValue =
                oEvent.getParameter("newValue") ||
                oEvent.getParameter("query") ||
                "";

            var oTable = this.byId("categoriesTable");

            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                return;
            }

            var aFilters = [];

            if (sValue) {

                aFilters.push(
                    new Filter({
                        filters: [

                            new Filter(
                                "CategoryName",
                                FilterOperator.Contains,
                                sValue
                            ),

                            new Filter(
                                "Description",
                                FilterOperator.Contains,
                                sValue
                            )

                        ],
                        and: false
                    })
                );

            }

            oBinding.filter(aFilters);

        },

        onRefresh: function () {

            this.getView().getModel().refresh(true);

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

        }

    });

});