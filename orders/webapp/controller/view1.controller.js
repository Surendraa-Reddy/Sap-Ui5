sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("orders.controller.view1", {
        onInit: function () {
        },

        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("newValue") || oEvent.getParameter("query") || "";
            var oTable = this.byId("ordersTable");
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
                            new Filter("ShipName", FilterOperator.Contains, sValue),
                            new Filter("ShipCountry", FilterOperator.Contains, sValue)
                        ],
                        and: false
                    })
                );
            }

            oBinding.filter(aFilters);
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();

            if (!oContext) {
                return;
            }

            var oData = oContext.getObject();
            var sOrderId = oData.OrderID;

            this.getOwnerComponent().getRouter().navTo("OrderDetails", {
                orderId: sOrderId
            });
        },
        onPress: function () {
            this.getOwnerComponent().getRouter().navTo("Customers");    
        },
        onRefresh: function () {
            var oModel = this.getView().getModel();
            if (oModel) {
                oModel.refresh(true);       
            }
        }
    });
});