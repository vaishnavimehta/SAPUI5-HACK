/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"saom/com/samplemap/shwetang28/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"saom/com/samplemap/shwetang28/test/integration/pages/View1",
	"saom/com/samplemap/shwetang28/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "saom.com.samplemap.shwetang28.view.",
		autoWait: true
	});
});