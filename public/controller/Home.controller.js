sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.Home", {

		userLogin :  function () {
			var username =  this.byId('userNameInput').getValue();
			var password = this.byId('pwdInput').getValue();
			var me = this;
			if(!!username && !!password){
				$.ajax({
		            type: "POST",
		            url: encodeURI("/login"),
		            headers: {
		                      "Content-Type": "application/json"
		                     },
		            data: JSON.stringify({"username": username, "password": password}),
		            success: function( result ){
						me.getRouter().navTo("employeeList", {user: username});
		            },
		            error: function(){
		            	console.log("error");
		            }
		        });
			} else {
				this.byId('message').setText("Please enter proper credentials.");
			}
		}

	});

});
