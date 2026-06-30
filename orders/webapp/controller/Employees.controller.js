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

    return Controller.extend("orders.controller.Employees", {

        onInit: function () {

        },

        onSearchEmployees: function (oEvent) {

            var sValue = oEvent.getParameter("newValue") ||
                oEvent.getParameter("query") || "";

            var oTable = this.byId("employeesTable");

            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                return;
            }

            var aFilters = [];

            if (sValue) {

                aFilters.push(new Filter({
                    filters: [
                        new Filter("FirstName", FilterOperator.Contains, sValue),
                        new Filter("LastName", FilterOperator.Contains, sValue),
                        new Filter("City", FilterOperator.Contains, sValue),
                        new Filter("Country", FilterOperator.Contains, sValue)
                    ],
                    and: false
                }));

            }

            oBinding.filter(aFilters);

        },

        onRefresh: function () {

            this.getView().getModel().refresh(true);

        },
        onNavigateToCustomers: function () {
            this.getOwnerComponent().getRouter().navTo("Customers");

        },
        onViewEmployee: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();

            var iEmployeeId = oContext.getProperty("EmployeeID");

            this.getOwnerComponent()
                .getRouter()
                .navTo("EmployeeDetails", {
                    employeeId: iEmployeeId
                });

        }

    });

});