sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.controller.test1", {
        onInit: function () {
        },
        onsubmit: function() {
            var name = this.getView().byId("input3").getValue();
            var msg = "Welcome to " + name + "!";
            this.getView().byId("text1").setText(msg);
            this.getView().byId("text1").setTextAlign("Left");
            this.getView().byId("btn33").setType("Accept");
            this.getView().byId("label3").setRequired(false);
            this.getView().byId("input3").setEnabled(false);
        },
        // onTestPress: function () {
        //     this.getOwnerComponent().getRouter().navTo("test2");
        // },

        onTestPress1: function () {
            this.getOwnerComponent().getRouter().navTo("test1");
        }
    });
});