sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	// "use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {
		onInit: function () {
			var oRouter = this.getRouter();
			this.username = null;
			oRouter.getRoute("employeeList").attachMatched(this._onRouteMatched, this);
             //this.renderSelectedTab(this.getView().byId('idIconTabBarNoIcons').getSelectedKey());

		},

		_onRouteMatched: function(oEvent) {
			var me = this;
			var oArgs = oEvent.getParameter('arguments');
			this.username = oArgs.user;
			$.ajax({
				type: "GET",
                url: encodeURI("/user/" + me.username),
                headers: {
                          "Content-Type": "application/json"
                         },
                success: function( userInfo){                 
                    me.getView().byId('employeeListPage').setTitle("Welcome " + userInfo.fname +" !");
                }
		    });
		    
		},

        onAfterRendering : function () {
            this.renderSelectedTab(this.getView().byId('idIconTabBarNoIcons').getSelectedKey());
        },

		onListItemPress : function(oEvent) {
            var me = this;
            var studUsername;
            var selectedfName = oEvent.getParameters().listItem.getTitle().split(' ')[0];
            for(var i=0; i<this.studentList.length; i++) {
               if(this.studentList[i].fname == selectedfName){
                    studUsername = this.studentList[i].username;
               }
            }

            $.ajax({
                type: "GET",
                url: encodeURI("/student/" + studUsername),
                headers: {
                          "Content-Type": "application/json"
                         },
                success: function( studInfo){                 
                   me.renderStudentInfoDetai
                   l(studInfo);
                }
            });

            /*var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitAppObj().toDetail(this.createId(sToPageId));*/
        },

        renderStudentInfoDetail: function(studInfo){
            console.log(studInfo);
        },  

        insertStudentListItems: function(studentInfo) {
            this.studentList = studentInfo;
            var items = this.getView().byId('studList');
            items.removeAllItems();
            for(var i=0; i<studentInfo.length; i++) {
                var stud = studentInfo[i];
                var listItem = new sap.m.StandardListItem({
                    title: stud.fname + ' ' + stud.lname,
                    description: stud.address,
                    icon: "./images/" + stud.username + ".jpg",
                });
                items.addItem(listItem);
            }

        },

        handleTabSelection: function(oEvent) {
            var me = this;
            var sKey = oEvent.getParameters().key;
            this.renderSelectedTab(sKey);
        },

        renderSelectedTab: function(key) {
            var me = this;
            if(key == 'stud') {
                console.log('stud found');
                $.ajax({
                    type: "GET",
                    url: encodeURI("/api/studentsByFaculty"),
                    data: {
                        'username': me.username
                    },
                    headers: {
                              "Content-Type": "application/json"
                             },
                    success: function( studList ){                 
                        // me.getView().byId('employeeListPage').setTitle("Welcome " + userInfo.fname +" !");
                        console.log(studList);
                        me.insertStudentListItems(studList); 
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
            else if(key == 'repo') {
                console.log('this repo is hit');
                $.ajax({
                    type: "GET",
                    url: encodeURI("/api/studentsByStatus"),
                    data: {
                        'status': 'inProgress',
                        'centre': 'abc'
                    },
                    headers: {
                              "Content-Type": "application/json"
                             },
                    success: function( studList ){                 
                        // me.getView().byId('employeeListPage').setTitle("Welcome " + userInfo.fname +" !");
                        console.log('list of students');
                        console.log(studList);
                        // $()
                        var className = "p" + Object.keys(studList).length;
                        me.getView().byId('circleStudentsCompleted').addStyleClass(className);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
                // $('#myStat').circliful();
            }

        }

	});

});
