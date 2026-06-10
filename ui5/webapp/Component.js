sap.ui.define([
    "sap/ui/core/UIComponent",
    "ui5/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("ui5.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
            // get the odata model object
            var oModel = this.getModel();
            var empModel = this.getModel("empModel");
            // read the data from the odata service and set it to the empModel
            oModel.read("/EmployeeSet", {
                success: function (oData) {
                    for (var i = 0; i < oData.results.length; i++) {
                        oData.results[i].Sno = i + 1;
                    }
                    empModel.setData(oData);
                },
                error: function (oError) {
                    console.log("Error reading data from OData service: ", oError);
                }
            });
        }
    });
});