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

        onSearch: function (oEvent) {

            var sValue = oEvent.getParameter("newValue");

            var oTable = this.byId("employeeTable");

            var oBinding = oTable.getBinding("items");

            var aFilters = [];

            if (sValue) {

                aFilters.push(

                    new Filter({

                        filters: [

                            new Filter(
                                "FirstName",
                                FilterOperator.Contains,
                                sValue
                            ),

                            new Filter(
                                "LastName",
                                FilterOperator.Contains,
                                sValue
                            ),

                            new Filter(
                                "City",
                                FilterOperator.Contains,
                                sValue
                            ),

                            new Filter(
                                "Country",
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

        }

    });

});