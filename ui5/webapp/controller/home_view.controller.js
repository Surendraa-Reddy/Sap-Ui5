sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5.controller.home_view", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
          var oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel);
        },
            _onRouteMatched: function (oEvent) {  
                var user_name = oEvent.getParameter("arguments").name;
                this.getView().getModel().setProperty("/Username", user_name);
            },  

        onLoginPress: function () {
            let Username = this.getView().byId("input1").getValue();
           // let Password = this.getView().byId("input2").getValue();
            //alert("Username: " + Username + "\nPassword: " + Password);
             var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("dashboard",{
                name: Username
            });
        },
        onNavBack: function() {
            history.go(-1);
        }
    });
});