sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/model/formatter",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"



], (Controller, formatter, MessageToast, MessageBox, Filter, FilterOperator, Spreadsheet, library) => {
    "use strict";

    return Controller.extend("ui5.controller.test1", {
        f: formatter,
        onInit: function () {

            // var oRouter = this.getOwnerComponent().getRouter();

            // oRouter.getRoute("update").attachPatternMatched(function (oEvent) {

            //     var sId = oEvent.getParameter("arguments").empId;

            //     this.getView().bindElement({
            //         path: "/EmployeeSet(" + sId + ")"
            //     });

            // }, this);

        },
        onsubmit: function () {
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

        },
        gototest2: function () {
            this.getOwnerComponent().getRouter().navTo("test2");
        },
        gototest3: function () {
            this.getOwnerComponent().getRouter().navTo("test3");
        },
        gototest4: function () {
            this.getOwnerComponent().getRouter().navTo("test4");
        },
        backtotest3: function () {
            this.getOwnerComponent().getRouter().navTo("test3");
        },
        backtotest2: function () {
            this.getOwnerComponent().getRouter().navTo("test2");
        },
        onCreatePress: function () {
            this.getOwnerComponent().getRouter().navTo("create");
        },
        onSearch: function () {

            var Name = this.byId("searchName").getValue();
            var Age = this.byId("searchAge").getValue();

            var aFilters = [];

            if (Name) {
                aFilters.push(
                    new Filter("Name", FilterOperator.EQ, Name)
                );
            }

            if (Age) {
                aFilters.push(
                    new Filter("Age", FilterOperator.EQ, Age)
                );
            }

            this.byId("table1")
                .getBinding("items")
                .filter(aFilters);
        },
        onClearSearch: function () {

            this.byId("searchName").setValue("");
            this.byId("searchAge").setValue("");

            this.byId("table1")
                .getBinding("items")
                .filter([]);
        },


        onUpdatePress: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();

            var sEmpId = oContext.getProperty("Id");

            this.getOwnerComponent().getRouter().navTo("update", {
                empId: sEmpId
            });
        },

        onDisplayPress: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();

            var sId = oContext.getProperty("Id");

            this.getOwnerComponent().getRouter().navTo("display", {
                empId: sId
            });
        },
        onDeletePress: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();
            var sPath = oContext.getPath();
            var oModel = this.getView().getModel();

            sap.m.MessageBox.confirm(
                "Are you sure you want to delete this employee?",
                {
                    title: "Confirm Delete",

                    onClose: function (sAction) {

                        if (sAction === sap.m.MessageBox.Action.OK) {

                            oModel.remove(sPath, {

                                success: function () {

                                    sap.m.MessageToast.show(
                                        "Employee deleted successfully"
                                    );

                                    oModel.refresh(true);
                                },

                                error: function () {

                                    sap.m.MessageBox.error(
                                        "Delete failed"
                                    );
                                }

                            });
                        }
                    }
                }
            );
        },
        onResetPress: function () {

            var aInputs = [
                "input34",
                "input222",
                "input28",
                "input29",
                "input31",
                "input30",
                "input32"
            ];

            aInputs.forEach(function (sId) {
                var oInput = this.byId(sId);
                oInput.setValue("");
                oInput.setValueState("None");
                oInput.setValueStateText("");
            }.bind(this));



        },
        onExport: function () {

            var oTable = this.byId("table1");
            var oBinding = oTable.getBinding("items");

            var aData = [];

            oBinding.getContexts().forEach(function (oContext) {
                aData.push(oContext.getObject());
            });
            aData.sort(function (a, b) {
                return a.Id - b.Id;
            });

            var aCols = [
                // {
                //     label: "Id",
                //     property: "Id",
                //     type: "Number"
                // },
                {
                    label: "Name",
                    property: "Name"
                },
                {
                    label: "Age",
                    property: "Age"
                },
                {
                    label: "Email",
                    property: "Email"
                },
                {
                    label: "Gender",
                    property: "Gender"
                },
                {
                    label: "Mobile",
                    property: "Mobile"
                },
                {
                    label: "Address",
                    property: "Address"
                }
            ];

            var oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: aData,
                fileName: "EmployeeData.xlsx"
            };

            var oSheet = new sap.ui.export.Spreadsheet(oSettings);

            oSheet.build()
                .finally(function () {
                    oSheet.destroy();
                });
        },

        // onUpdatePress: function (oEvent) {

        //     var oItem = oEvent.getSource().getBindingContext();
        //     var sId = oItem.getProperty("Id");

        //     this.getOwnerComponent().getRouter().navTo("update", {
        //         empId: sId
        //     });
        // },
        // onDisplayPress: function (oEvent) {

        //     var oItem = oEvent.getSource().getBindingContext();
        //     var sId = oItem.getProperty("Id");

        //     this.getOwnerComponent().getRouter().navTo("display", {
        //         empId: sId
        //     });
        // },
        onsubmitgo: function () {
            var Id = this.getView().byId("input34").getValue();
            var Name = this.getView().byId("input222").getValue();
            var Age = this.getView().byId("input28").getValue();
            var Email = this.getView().byId("input29").getValue();
            var Mobile = this.getView().byId("input30").getValue();
            var Gender = this.getView().byId("input31").getValue();
            var Address = this.getView().byId("input32").getValue();

            if (Id === "") {
                this.getView().byId("input34").setValueState("Error");
                this.getView().byId("input34").setValueStateText("Please enter your Id");
            } else {
                this.getView().byId("input34").setValueState("None");

                var Regex = /^[0-9]+$/;
                if (!Id.match(Regex)) {
                    this.getView().byId("input34").setValueState("Error");
                    this.getView().byId("input34").setValueStateText("Id should contain only numbers");
                } else {
                    this.getView().byId("input34").setValueState("None");
                }
            }
            if (Name === "") {
                this.getView().byId("input222").setValueState("Error");
                this.getView().byId("input222").setValueStateText("Please enter your name");
            } else {
                this.getView().byId("input222").setValueState("None");

                var Regex = /^[a-zA-Z]+$/;
                if (!Name.match(Regex)) {
                    this.getView().byId("input222").setValueState("Error");
                    this.getView().byId("input222").setValueStateText("Name should contain only letters");
                } else {
                    this.getView().byId("input222").setValueState("None");
                }
            }
            if (Age === "") {
                this.getView().byId("input28").setValueState("Error");
                this.getView().byId("input28").setValueStateText("Please enter your age");

            } else {
                this.getView().byId("input222").setValueState("None");

                var Regex = /^[0-9]+$/;
                if (!Age.match(Regex)) {
                    this.getView().byId("input28").setValueState("Error");
                    this.getView().byId("input28").setValueStateText("Age should contain only numbers");
                } else {
                    this.getView().byId("input28").setValueState("None");
                }
            }
            if (Email === "") {
                this.getView().byId("input29").setValueState("Error");
                this.getView().byId("input29").setValueStateText("Please enter your email");
            } else {
                this.getView().byId("input29").setValueState("None");

                var Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!Email.match(Regex)) {
                    this.getView().byId("input29").setValueState("Error");
                    this.getView().byId("input29").setValueStateText("Please enter a valid email address");
                } else {
                    this.getView().byId("input29").setValueState("None");
                }
            }
            if (Mobile === "") {
                this.getView().byId("input30").setValueState("Error");
                this.getView().byId("input30").setValueStateText("Please enter your mobile number");
            } else {
                this.getView().byId("input30").setValueState("None");

                var Regex = /^[0-9]{10}$/;
                if (!Mobile.match(Regex)) {
                    this.getView().byId("input30").setValueState("Error");
                    this.getView().byId("input30").setValueStateText("Mobile number should be 10 digits");
                } else {
                    this.getView().byId("input30").setValueState("None");
                }
            }
            if (Gender === "") {
                this.getView().byId("input31").setValueState("Error");
                this.getView().byId("input31").setValueStateText("Please enter your gender");
            } else {
                this.getView().byId("input31").setValueState("None");
            }
            if (Address === "") {
                this.getView().byId("input32").setValueState("Error");
                this.getView().byId("input32").setValueStateText("Please enter your address");
            } else {
                this.getView().byId("input32").setValueState("None");
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

                var oPayload = {
                    Id: parseInt(Id, 10),
                    Name: Name,
                    Age: Age,
                    Email: Email,
                    Gender: Gender,
                    Mobile: Mobile,
                    Address: Address
                };
                // console.log(JSON.stringify(oPayload));
                var oModel = this.getView().getModel();

                oModel.create("/EmployeeSet", oPayload, {
                    success: function (req, res) {
                        sap.m.MessageBox.success("Employee Saved Successfully");
                        oModel.refresh(true);

                    },
                    error: function (oError) {
                        sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
                        console.log(oError);
                    }
                });
            }

        },
        onFileChange: function (oEvent) {
            var oFile = oEvent.getParameter("files")[0];

            if (!oFile) {
                return;
            }

            this._oSelectedFile = oFile;

            MessageToast.show("File Selected: " + oFile.name);
        },
        onBulkUpload: function () {
            var oFile = this._oSelectedFile;

            if (!oFile) {
                MessageBox.error("Please select an Excel file");
                return;
            }

            var reader = new FileReader();
            var that = this;

            reader.onload = function (e) {

                var data = e.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });

                var sheetName = workbook.SheetNames[0];

                var excelData = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheetName]
                );

                console.log(excelData);

                that._saveExcelData(excelData);
            };

            reader.readAsBinaryString(oFile);
        },
        _saveExcelData: function (aData) {
            var oModel = this.getView().getModel();
            oModel.setUseBatch(false);

            var iSuccess = 0;
            var iError = 0;

            aData.forEach(function (row) {
                var oPayload = {
                    Id: parseInt(row.Id, 10),
                    Name: String(row.Name),
                    Age: String(row.Age),
                    Email: String(row.Email),
                    Gender: String(row.Gender),
                    Mobile: String(row.Mobile),
                    Address: String(row.Address)
                };

                oModel.create("/EmployeeSet", oPayload, {
                    success: function () {
                        iSuccess++;
                    },
                    error: function () {
                        iError++;
                    }
                });
            });

            MessageToast.show("Bulk Upload Started");
        }

    });
});