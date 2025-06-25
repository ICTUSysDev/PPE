<?php

define('system_privileges', array(
	array(
		"id"=>"dashboard",
		"description"=>"Dashboard",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"ppe",
		"description"=>"PPE Dropdown",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	// array(
	// 	"id"=>"office_equipment",
	// 	"description"=>"Office Equipment",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	array(
		"id"=>"land",
		"description"=>"Land",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"land_improvements",
		"description"=>"Land Improvements",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"infrastructure_assets",
		"description"=>"Infrastructure Assets",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"building_other_structures",
		"description"=>"Building and Other Structures",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"machinery_equipment",
		"description"=>"Machinery and Equipment",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	// array(
	// 	"id"=>"transportation_equipment",
	// 	"description"=>"Transportation Equipment",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	array(
		"id"=>"furniture_and_fixture",
		"description"=>"Furniture, Fixtures and Books",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add / Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	// array(
	// 	"id"=>"leased_assets",
	// 	"description"=>"Leased Assets",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"leased_assets_improvements",
	// 	"description"=>"Leased Assets Improvements",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"construction_progress",
	// 	"description"=>"Construction in Progress",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"service_concession_assets",
	// 	"description"=>"Service Concession Assets",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add / Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"machinery_equipment_ics",
	// 	"description"=>"ICS Equipment",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add/Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	array(
		"id"=>"operation",
		"description"=>"Operation",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"machinery_equipment_par",
		"description"=>"PAR",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/PAR","value"=>false),
			array("id"=>3,"description"=>"View/Print","value"=>false),
		),
	),
	// array(
	// 	"id"=>"machinery_equipment_transfer",
	// 	"description"=>"TRANSFER/REPAR",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show REPAR","value"=>false),
	// 		array("id"=>2,"description"=>"Add","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"machinery_equipment_return",
	// 	"description"=>"Return",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add/Return","value"=>false),
	// 	),
	// ),
	// array(
	// 	"id"=>"ics_par",
	// 	"description"=>"ICS",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add","value"=>false),
	// 	),
	// ),
	array(
		"id"=>"physical_inventory",
		"description"=>"Physical Inventory Dropdown",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"me_physical_count",
		"description"=>"Machinery/Furniture Physical Count",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add","value"=>false),
		),
	),
	array(
		"id"=>"lali_physical_count",
		"description"=>"Land and Land Improvement Physical Count",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add","value"=>false),
		),
	),
	array(
		"id"=>"ia_physical_count",
		"description"=>"Infrastructure Asset Physical Count",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add","value"=>false),
		),
	),
	array(
		"id"=>"baos_physical_count",
		"description"=>"Building and Other Structure Physical Count",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add","value"=>false),
		),
	),
	array(
		"id"=>"repair",
		"description"=>"Repair/GSO",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"repair_office",
		"description"=>"Pre-Repair Inspection",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"reports",
		"description"=>"Reports",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"machinery_equipment_report",
		"description"=>"Machinery Equipment Report Dropdown",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"propertyCard",
		"description"=>"Property Card Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"reportICS",
		"description"=>"ICS Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"reportIIRUP",
		"description"=>"IIRUP Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"reportSummaryPPEperOffice",
		"description"=>"PPE Inventory Office Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"reportSummaryPPEperPersonnel",
		"description"=>"PPE Inventory Personnel Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"operation_report",
		"description"=>"Operation Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"reportPAR",
		"description"=>"Property Acknowledgement Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Print","value"=>false),
		),
	),
	array(
		"id"=>"reportPropertyTransferReport",
		"description"=>"Property Transfer Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"View","value"=>false),
		),
	),
	array(
		"id"=>"return_log",
		"description"=>"Return Log",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Print","value"=>false),
		),
	),
	array(
		"id"=>"pre_repair_inspection",
		"description"=>"Pre-Repair Inspection",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Print","value"=>false),
		),
	),
	array(
		"id"=>"physical_inventory_list",
		"description"=>"Physical Inventory List",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Print","value"=>false),
		),
	),
	array(
		"id"=>"physical_count_ppe",
		"description"=>"Physical Count PPE",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),	
	array(
		"id"=>"reportUserPerformance",
		"description"=>"User Performance Report",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"maintenance",
		"description"=>"Set up",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"setup",
		"description"=>"Library",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),
	array(
		"id"=>"brands",
		"description"=>"Brands",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"articles",
		"description"=>"Articles",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"suppliers",
		"description"=>"Suppliers",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	// array(
	// 	"id"=>"employees",
	// 	"description"=>"Employees",
	// 	"privileges"=>array( # id=1 must be always page access
	// 		array("id"=>1,"description"=>"Show","value"=>false),
	// 		array("id"=>2,"description"=>"Add/Edit","value"=>false),
	// 		array("id"=>3,"description"=>"Remove","value"=>false),
	// 	),
	// ),
	array(
		"id"=>"offices",
		"description"=>"Offices",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"signatories",
		"description"=>"Signatories",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"users",
		"description"=>"users",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"groups",
		"description"=>"groups",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
			array("id"=>2,"description"=>"Add/Edit","value"=>false),
			array("id"=>3,"description"=>"Remove","value"=>false),
		),
	),
	array(
		"id"=>"audit_trail",
		"description"=>"Audit Trail",
		"privileges"=>array( # id=1 must be always page access
			array("id"=>1,"description"=>"Show","value"=>false),
		),
	),

));

?>