sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var intervalHandle;
	return Controller.extend("saom.com.samplemap.shwetang28.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf saom.com.samplemap.shwetang28.SAPUI5-HACK-master.view.map
		 */
		onInit: function () {

			//var globalThis;                                                
			var that = this;
			$.ajax({
				type: "GET",
				//async: false,
				//crossDomain: true,
				url: 'https://maps.googleapis.com/maps/api/js?key=????',
				dataType: "jsonp",
				success: function (data, status, jqXHR) { //success function works when above connection is successfull.
					//alert("connection successful");
					//that.init(this, data);
				},
				error: function (e) { //success function works when above connection fails.
					self.error_msg("Error encountered. check connection and reload.");
				}
			}).done(function () {
				that.init(window);
			});
		},
		init: function (data) {
				//                            alert("initialize");
				var that = this;

				var map;
				// var array1 = [{
				//            lati: 19.997454,
				//            long: 73.789803
				// }, {
				//            lati: 19.901054,
				//            long: 75.352478
				// }, {
				//            lati: 20.937424,
				//            long: 77.779549
				// }];
				// var oModel = new sap.ui.model.odata.ODataModel(
				//            '/com.sap.iotservices.mms/v1/api/http/app.svc', true);
				// var oArray;
				// oModel.read("/SYSTEM.T_IOT_F7FAF3DC98910CEF2B99", null, ["$top=5"], false, function (oData, oResponse) {
				//            oArray = oData.results;
				// });
				// var lati = oArray[0].C_LOCLAT; 
				// var array1 = [{
				//                 C_LOCLAT: 17.4957771,
				//                 C_LOCLONG: 78.3143212
				// }, {
				//                 C_LOCLAT: 17.485820,
				//                 C_LOCLONG: 78.312806
				// }, {
				//               C_LOCLAT: 17.474420,
				//                 C_LOCLONG: 78.326163
				// }, {
				//                 C_LOCLAT: 17.4685969,
				//                 C_LOCLONG: 78.3282015
				// }, {
				//                 C_LOCLAT: 17.4636436,
				//                 C_LOCLONG: 78.3326325
				// }, {
				//                 C_LOCLAT: 17.4535113,
				//                 C_LOCLONG: 78.3414409
				// }, {
				//                 C_LOCLAT: 17.445139,
				//                 C_LOCLONG: 78.352758
				// }, {
				//                 C_LOCLAT: 17.4389055,
				//                 C_LOCLONG: 78.3477798
				// }, {
				//                 C_LOCLAT: 17.424114,
				//                 C_LOCLONG: 78.338851
				// }, {
				//                 C_LOCLAT: 17.4218942,
				//                 lC_LOCLONG: 78.3383297
				// }];
				var oModel = new sap.ui.model.odata.ODataModel(
					'/com.sap.iotservices.mms/v1/api/http/app.svc', true);
				var array1;
				oModel.read("/SYSTEM.T_IOT_F7FAF3DC98910CEF2B99", null, ["$orderby=C_TIMESTAMP desc&$top=1"], false, function (oData, oResponse) {
					array1 = oData.results;
				});
				// oModel.read("/SYSTEM.T_IOT_F7FAF3DC98910CEF2B99", null, ["$top=1"], false, function (oData, oResponse) {
				// 	array1 = oData.results;
				// });

				var directionsService = new data.google.maps.DirectionsService();
				var directionsDisplay = new data.google.maps.DirectionsRenderer();
				var origin = new data.google.maps.LatLng(array1.C_LOCLAT, array1.C_LOCLONG);
				// var origin = new data.google.maps.LatLng(19.997454, 73.789803);
				var destination = new data.google.maps.LatLng(17.4218942, 78.3383297);

				map = new data.google.maps.Map(document.getElementById('map'), {

					center: origin,
					zoom: 19,
				});
				directionsDisplay.setMap(map);
				var newloc;
				reload(newloc);

				intervalHandle = setInterval(function () {

					// alert(newloc);
					var oModel = new sap.ui.model.odata.ODataModel(
						'/com.sap.iotservices.mms/v1/api/http/app.svc', true);
					var array1;
					oModel.read("/SYSTEM.T_IOT_F7FAF3DC98910CEF2B99", null, ["$orderby=C_TIMESTAMP desc&$top=1"], false, function (oData, oResponse) {
						array1 = oData.results;
					});
					var newloc = array1.shift();
					// var nasik = new data.google.maps.LatLng(array1.C_LOCLAT, array1.C_LOCLONG);
					var nasik = new data.google.maps.LatLng(newloc.C_LOCLAT, newloc.C_LOCLONG);
					// alert(nasik);
					if (nasik.lat() != origin.lat() || nasik.lng() != origin.lng()) {
						origin = nasik;
						//request.origin = nasik;
						reload(newloc);
					}
					// if (typeof array1 == 'undefined' || array1.length <= 0) {
					//                 Endinterval();
					// }
				}, 2000);

				function Endinterval() {
					clearInterval(intervalHandle);
				}

				function reload(newloc) {

					var request = {
						origin: origin,
						destination: destination,
						travelMode: 'WALKING'
					};

					directionsService.route(request, function (result, status) {
						if (status == 'OK') {
							directionsDisplay.setDirections(result);
							var myRoute = result.routes[0].legs[0];
							// window.alert(result[0]);
							document.getElementById('distance').value = (myRoute.distance.text);
							document.getElementById('eta').value = (myRoute.duration.text);
							document.getElementById('origin').value = (myRoute.start_address);
							document.getElementById('destination').value = (myRoute.end_address);
							document.getElementById('TS').value = newloc.C_TIMESTAMP;
							document.getElementById('lat').value = newloc.C_LOCLAT;
							document.getElementById('long').value = newloc.C_LOCLONG;

							// window.alert();
							// window.alert();
							// window.alert();
							// window.alert();
							// window.alert("Success");
						} else {
							// window.alert("error");
						}
					});
				}

			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf saom.com.samplemap.shwetang28.SAPUI5-HACK-master.view.map
			 */
			//            onBeforeRendering: function() {
			//
			//            },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf saom.com.samplemap.shwetang28.SAPUI5-HACK-master.view.map
		 */
		//            onAfterRendering: function() {
		//
		//            },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf saom.com.samplemap.shwetang28.SAPUI5-HACK-master.view.map
		 */
		//            onExit: function() {
		//
		//            }

	});

});
