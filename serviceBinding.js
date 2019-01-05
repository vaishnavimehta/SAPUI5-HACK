function initModel() {
	var sUrl = "/com.sap.iotservices.mms/v1/api/http/app.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}