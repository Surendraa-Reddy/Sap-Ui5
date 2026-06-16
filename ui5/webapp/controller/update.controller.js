sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "ui5/model/formatter"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("ui5.controller.update", {

        onInit: function () {

            this.getOwnerComponent()
                .getRouter()
                .getRoute("update")
                .attachPatternMatched(this._onObjectMatched, this);

            this.editprjModel = this.getOwnerComponent().getModel("editprjModel");
            console.log("editprjModel =", this.editprjModel);

        },

        _onObjectMatched: function (oEvent) {

            var sEmpId = oEvent.getParameter("arguments").empId;

            this.getView().bindElement({
                path: "/EmployeeSet(" + sEmpId + ")",

                events: {
                    dataReceived: function () {
                        this.readempprojects();
                    }.bind(this)
                }
            });
        },

        readempprojects: function () {

            var Id = this.getView().getBindingContext().getProperty("Id");

            console.log("Employee Id:", Id);

            var oModel = this.getView().getModel();

            oModel.read("/EmployeeSet(" + Id + ")/toprojects", {
              //  console.log("Calling:", "/EmployeeSet(" + Id + ")/toprojects");

                success: function (oData) {

                    //console.log("SUCCESS");
                    //console.log(oData);

                    this.editprjModel.setData({
                        results: oData.results
                    });

                    // console.log(this.editprjModel.getData());

                }.bind(this),

                error: function (oError) {

                    console.log("ERROR");
                    console.log(oError);

                }
            });
        },

        onAddProject: function () {

            // console.log("MODEL DATA:", this.editprjModel.getData());
            // console.log(this.editprjModel.getData());
            // console.log("Before Add:", this.editprjModel.getData().results);
            this.editprjModel.getData().results.push({
                Id: "",
                PrjCode: "",
                ProjectName: "",
                Client: "",
                PrjDescription: "",
                TeamSize: 0
            });

            // console.log("After Add:", this.editprjModel.getData().results);

            this.editprjModel.refresh(true);
        },
        onDeleteProject: function (oEvent) {

            var index = oEvent.getSource()
                .getBindingContext("editprjModel")
                .getPath()
                .split("/")[2];

            this.editprjModel.getData().results.splice(index, 1);

            this.editprjModel.refresh("true");
        },

        onUpdateEmployee: function () {

            var oModel = this.getView().getModel();

            var oEmpData = this.getView()
                .getBindingContext()
                .getObject();

            var oPayload = {
                Id: parseInt(oEmpData.Id, 10),
                Name: oEmpData.Name,
                Age: oEmpData.Age,
                Email: oEmpData.Email,
                Gender: oEmpData.Gender,
                Mobile: oEmpData.Mobile,
                Address: oEmpData.Address,

                toprojects: this.editprjModel.getData().results
            };
            oPayload.toprojects.forEach(function (oProject) {
                oProject.Id = parseInt(oProject.Id, 10) || 0;
                oProject.TeamSize = parseInt(oProject.TeamSize, 10) || 0;
            });

            console.log(JSON.stringify(oPayload, null, 2));

            oModel.create("/EmployeeSet", oPayload, {

                success: function () {
                    console.log("Projects Data:", oPayload);
                  //  console.log("Results:", oData.results);


                    MessageBox.success("Employee & Projects Updated Successfully");

                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("test4");

                }.bind(this),

                error: function (oError) {

                    console.log(oError);
                    MessageBox.error("Update Failed");

                }
            });
        },

        onBack: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("test4");
        }

    });
});