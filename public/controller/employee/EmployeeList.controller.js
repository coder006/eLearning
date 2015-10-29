sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {
		onInit: function () {
			var oRouter = this.getRouter();
			this.userData = null;
			oRouter.getRoute("employeeList").attachMatched(this._onRouteMatched, this);


		},

		_onRouteMatched: function(oEvent) {
			var me = this;
			var oArgs = oEvent.getParameter('arguments');
			var username = oArgs.user;
			$.ajax({
				type: "GET",
                url: encodeURI("/user/" + username),
                headers: {
                          "Content-Type": "application/json"
                         },
                success: function( userInfo){                 
                    me.getView().byId('employeeListPage').setTitle("Welcome " + userInfo.fname +" !");
                }
		    });
		    
		},

		setUserModel: function(userData) {
			

		}
	});

});
