sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("orders.controller.Customers", {
        onInit: function () {
        },

        onSearchCustomers: function (oEvent) {
            var sValue = oEvent.getParameter("newValue") || oEvent.getParameter("query") || "";
            var oTable = this.byId("customersTable");
            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                return;
            }

            var aFilters = [];

            if (sValue) {
                aFilters.push(
                    new Filter({
                        filters: [
                            new Filter("CustomerID", FilterOperator.Contains, sValue),
                            new Filter("CompanyName", FilterOperator.Contains, sValue),
                            new Filter("ContactName", FilterOperator.Contains, sValue),
                            new Filter("Country", FilterOperator.Contains, sValue)
                        ],
                        and: false
                    })
                );
            }

            oBinding.filter(aFilters);
        },

        onViewCustomer: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext();

            if (!oContext) {
                return;
            }

            var oData = oContext.getObject();
            var sCustomerId = oData.CustomerID;

            this.getOwnerComponent().getRouter().navTo("CustomerDetails", {
                customerId: sCustomerId
            });
        },

        onRefresh: function () {
            var oModel = this.getView().getModel();
            if (oModel) {
                oModel.refresh(true);
            }
        },
        onNavigateToEmployees: function () {
            this.getOwnerComponent().getRouter().navTo("Employees");
        }
    });
});