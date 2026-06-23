sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/unified/FileUploaderParameter"
], function (Controller, MessageBox, MessageToast, FileUploaderParameter) {
    "use strict";

    return Controller.extend("ui5.controller.create", {

        onInit: function () {
            this.prjModel = this.getOwnerComponent().getModel("prjModel");
            this.prjModel.setData({
                projects: []
            });
        },
        onAddProject: function () {
            this.prjModel.getData().projects.push({
                Id: "",
                PrjCode: "",
                ProjectName: "",
                Client: "",
                PrjDescription: "",
                TeamSize: 0
            });
            this.prjModel.refresh();
        },
        onDeleteProject: function (oEvent) {
            var index = oEvent.getSource().getBindingContext("prjModel").getPath().split("/")[2];
            this.prjModel.getData().projects.splice(index, 1);
            this.prjModel.refresh();
        },

        onSave: function () {
            var Id = this.getView().byId("inpId1").getValue();
            var Name = this.getView().byId("inpName1").getValue();
            var Age = this.getView().byId("inpAge1").getValue();
            var Email = this.getView().byId("inpEmail1").getValue();
            var Mobile = this.getView().byId("inpMobile1").getValue();
            var Gender = this.getView().byId("inpGender1").getValue();
            var Address = this.getView().byId("inpAddress1").getValue();

            if (Id === "") {
                this.getView().byId("inpId1").setValueState("Error");
                this.getView().byId("inpId1").setValueStateText("Please enter your Id");
            } else {
                this.getView().byId("inpId1").setValueState("None");

                var Regex = /^[0-9]+$/;
                if (!Id.match(Regex)) {
                    this.getView().byId("inpId1").setValueState("Error");
                    this.getView().byId("inpId1").setValueStateText("Id should contain only numbers");
                } else {
                    this.getView().byId("inpId1").setValueState("None");
                }
            }

            if (Name === "") {
                this.getView().byId("inpName1").setValueState("Error");
                this.getView().byId("inpName1").setValueStateText("Please enter your name");
            } else {
                this.getView().byId("inpName1").setValueState("None");

                var Regex = /^[a-zA-Z]+$/;
                if (!Name.match(Regex)) {
                    this.getView().byId("inpName1").setValueState("Error");
                    this.getView().byId("inpName1").setValueStateText("Name should contain only letters");
                } else {
                    this.getView().byId("inpName1").setValueState("None");
                }
            }

            if (Age === "") {
                this.getView().byId("inpAge1").setValueState("Error");
                this.getView().byId("inpAge1").setValueStateText("Please enter your age");

            } else {
                this.getView().byId("inpAge1").setValueState("None");

                var Regex = /^[0-9]+$/;
                if (!Age.match(Regex)) {
                    this.getView().byId("inpAge1").setValueState("Error");
                    this.getView().byId("inpAge1").setValueStateText("Age should contain only numbers");
                } else {
                    this.getView().byId("inpAge1").setValueState("None");
                }
            }

            if (Email === "") {
                this.getView().byId("inpEmail1").setValueState("Error");
                this.getView().byId("inpEmail1").setValueStateText("Please enter your email");
            } else {
                this.getView().byId("inpEmail1").setValueState("None");

                var Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!Email.match(Regex)) {
                    this.getView().byId("inpEmail1").setValueState("Error");
                    this.getView().byId("inpEmail1").setValueStateText("Please enter a valid email address");
                } else {
                    this.getView().byId("inpEmail1").setValueState("None");
                }
            }

            if (Mobile === "") {
                this.getView().byId("inpMobile1").setValueState("Error");
                this.getView().byId("inpMobile1").setValueStateText("Please enter your mobile number");
            } else {
                this.getView().byId("inpMobile1").setValueState("None");

                var Regex = /^[0-9]{10}$/;
                if (!Mobile.match(Regex)) {
                    this.getView().byId("inpMobile1").setValueState("Error");
                    this.getView().byId("inpMobile1").setValueStateText("Mobile number should be 10 digits");
                } else {
                    this.getView().byId("inpMobile1").setValueState("None");
                }
            }

            if (Gender === "") {
                this.getView().byId("inpGender1").setValueState("Error");
                this.getView().byId("inpGender1").setValueStateText("Please enter your gender");
            } else {
                this.getView().byId("inpGender1").setValueState("None");
            }

            if (Address === "") {
                this.getView().byId("inpAddress1").setValueState("Error");
                this.getView().byId("inpAddress1").setValueStateText("Please enter your address");
            } else {
                this.getView().byId("inpAddress1").setValueState("None");
            }

            // Save data to Backend OData Service
            if (
                Id !== "" &&
                Name !== "" &&
                Age !== "" &&
                Email !== "" &&
                Mobile !== "" &&
                Gender !== "" &&
                Address !== "" &&
                /^[0-9]+$/.test(Id) &&
                /^[a-zA-Z]+$/.test(Name) &&
                /^[0-9]+$/.test(Age) &&
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email) &&
                /^[0-9]{10}$/.test(Mobile)
            ) {
                this.prjModel.getData().projects.forEach(function (oProject) {
                    oProject.Id = parseInt(oProject.Id, 10);
                    oProject.TeamSize = parseInt(oProject.TeamSize, 10);
                });

                var oPayload = {
                    Id: parseInt(Id, 10),
                    Name: Name,
                    Age: Age,
                    Email: Email,
                    Gender: Gender,
                    Mobile: Mobile,
                    Address: Address,
                    toprojects: this.prjModel.getData().projects
                };

                var oModel = this.getView().getModel();

                var that = this; // Store reference to 'this' for use in callbacks
                //console.log(oPayload);
                // console.log(JSON.stringify(oPayload, null, 2));
                oModel.create("/EmployeeSet", oPayload, {
                    success: function () {
                        sap.m.MessageBox.success("Employee Saved Successfully");
                        oModel.refresh(true);
                        that.getOwnerComponent().getRouter().navTo("test4");
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                        console.log(oError);
                    }
                });
            }
        },
        backToList: function () {
            this.getOwnerComponent().getRouter().navTo("test4");
        },
        onReset: function () {

            var aInputs = [
                "inpId1",
                "inpName1",
                "inpAge1",
                "inpEmail1",
                "inpGender1",
                "inpMobile1",
                "inpAddress1"
            ];

            aInputs.forEach(function (sId) {
                var oInput = this.byId(sId);
                oInput.setValue("");
                oInput.setValueState("None");
                oInput.setValueStateText("");
            }.bind(this));

            this.getOwnerComponent().getRouter().navTo("test4");

        },
        onFileChange: function (oEvent) {
            this.fileName = oEvent.getParameter("files")[0].name;
            this.fileType = oEvent.getParameter("files")[0].type;

        },
        onUploadfile: function () {
            var oFileUploader = this.getView().byId("fileUploader1");
            var Id = this.getView().byId("inpId1").getValue();
            var slug = Id + "_" + this.fileName;

            oFileUploader.addHeaderParamete(new FileUploaderParameter({
                name: "slug",
                value: slug
            }));
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "content-type",
                value: this.fileType
            }));
            this.getOwnerComponent().getModel().refreshSecurityToken ();
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "x-csrf-token",
                value: this.getOwnerComponent().getModel().getHeaders()["x-csrf-token"]
            }));
            oFileUploader.upload();
        },
        onUploadComplete: function (oEvent) {
            var status = oEvent.getParameter("status");
            if (status === 201 || status === 202 || status === 204) {
                MessageToast.show("File uploaded successfully");
            } else {
                MessageBox.error("File upload failed with status: " + status);
            }
        }

    });

});