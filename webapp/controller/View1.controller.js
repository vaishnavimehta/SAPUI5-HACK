sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	// "sap.ui.core.Control",
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("saom.com.samplemap.shwetang28.controller.View1", {
		
		
	init: function(data){
		alert("initialize");
		
	var map;
                        map = new this.google.maps.Map(document.getElementById('map'), {
                            zoom: 4,
                            center: delhi,
                        });
    
},
		
		onInit : function(){
			$.ajax({
      type: "GET",
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWAb0Dr2cDdOicUsKYqBGMcscdV79Nutg&v=3',
      dataType: "jsonp",
      success: function (data) {    //success function works when above connection is successfull.
      alert("connection successful");
        this.init(data);
      },
      error: function (e) {      //success function works when above connection fails.
        self.error_msg("Error encountered. check connection and reload.");
      }
    });
	
		}
	});
});
