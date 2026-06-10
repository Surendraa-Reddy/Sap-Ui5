
sap.ui.define([

], function (){
    "use strict";
    return {
    formatName: function (Name, Gender) {

    if (Gender === "MALE" || Gender === "Male" || Gender === "male") {
        return "Mr " + Name;
    } else if (Gender === "FEMALE" || Gender === "Female" || Gender === "female") {
        return "Mrs " + Name;
    }

    return Name;
},
        ColorGender: function(Gender){
            if(Gender === "MALE"){
                return "Success";
            }else if(Gender === "FEMALE"){
                return "Error";
            }
        }
    };
});
