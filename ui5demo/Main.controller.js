sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("ui5demo.Main", {
        clickme: function () {
           var oImage = this.getView().byId("idimage");
              oImage.setVisible(true);
        }
    });
});