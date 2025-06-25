<?php 
$page = "reportPropertyAcknowledgementReport";
$dropdown = "reports";
$operation_dropdown = "operation";

?>
<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head><base href=""/>
		<title>Machinery and Equipment - Property Acknowledgment Receipt</title>
		<meta charset="utf-8" />
		<meta name="description" content="The most advanced Bootstrap Admin Theme on Themeforest trusted by 100,000 beginners and professionals. Multi-demo, Dark Mode, RTL support and complete React, Angular, Vue, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask & Laravel versions. Grab your copy now and get life-time updates for free." />
		<meta name="keywords" content="metronic, bootstrap, bootstrap 5, angular, VueJs, React, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask & Laravel starter kits, admin themes, web design, figma, web development, free templates, free admin themes, bootstrap theme, bootstrap template, bootstrap dashboard, bootstrap dak mode, bootstrap button, bootstrap datepicker, bootstrap timepicker, fullcalendar, datatables, flaticon" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="article" />
		<meta property="og:title" content="Metronic - Bootstrap 5 HTML, VueJS, React, Angular. Laravel, Asp.Net Core, Ruby on Rails, Spring Boot, Blazor, Django, Express.js, Node.js, Flask Admin Dashboard Theme & Template" />
		<meta property="og:url" content="https://keenthemes.com/metronic" />
		<meta property="og:site_name" content="Keenthemes | Metronic" />
		<link rel="canonical" href="https://preview.keenthemes.com/metronic8" />
		<link rel="shortcut icon" href="assets/icons/favicon.ico" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" />
		<link href="assets/css/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/datatables.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/disabledtextbox.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/formcontrol.css" rel="stylesheet" type="text/css" />
	</head>
	<body ng-app="reportPAR" ng-controller="reportPARCtrl" id="kt_app_body" data-kt-app-header-fixed="true" data-kt-app-header-fixed-mobile="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" class="app-default" account-profile>
		<script src="assets/js/themeMode.js"></script>
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
				<nav>
					<?php require_once 'components/header/header.html'?>
				</nav>
				<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
					<div id="kt_app_toolbar" class="app-toolbar pt-7 pt-lg-10">
							<div id="kt_app_toolbar_container" class="app-container container-fluid d-flex align-items-stretch">
								<div class="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
									<div class="page-title d-flex flex-column justify-content-center gap-1 me-3">
										<h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">{{ headerName }}</h1>
										<ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
											<li class="breadcrumb-item text-muted">
												<a href="index.php" class="text-muted text-hover-primary">Home</a>
											</li>
											<li class="breadcrumb-item">
												<span class="bullet bg-gray-400 w-5px h-2px"></span>
											</li>
											<li class="breadcrumb-item text-muted">Machinery and Equipment - Property Acknowledgment Receipt</li>
										</ul>
									</div>
									<!-- <div class="d-flex align-items-center gap-2 gap-lg-3">
										<a href="#" ng-click="app.machineryEquipment(this)" ng-show="showAddButton" class="btn btn-flex btn-primary h-40px fs-7 fw-bold">Add</a>
										<a href="#" ng-click="app.edit(this)" ng-show="showEditButton" class="btn btn-flex btn-primary h-40px fs-7 fw-bold">{{controls.edit.label}}</a>
									</div> -->
								</div>
							</div>
						</div>
					<nav>
						<?php require_once 'components/sidebar/sidebar.html'?>
					</nav>
					<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
						<div class="d-flex flex-column flex-column-fluid">
							<div id="kt_app_content" class="app-content flex-column-fluid">
								<div id="kt_app_content_container" class="app-container container-fluid">
									<div class="card" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
										<div class="card-header border-0 pt-6">
											<div class="card-title">
												<div class="d-flex align-items-center position-relative my-1">
													<span class="svg-icon svg-icon-1 position-absolute ms-6">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
															<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
														</svg>
													</span>
													<input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search Machine/Equipment" ng-model="searchPAR"/>
												</div>
											</div>
											<div class="card-toolbar">
												<div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
													<button type="button" class="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
													<span class="svg-icon svg-icon-2">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />
														</svg>
													</span>Filter Date</button>
													<div class="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
														<div class="px-7 py-5">
															<div class="fs-5 text-dark fw-bold"></div>
														</div>
														<div class="separator border-gray-200"></div>
														<div class="px-7 py-5" data-kt-user-table-filter="form">
															<div class="mb-10">
																<label class="form-label fs-6 fw-semibold">From:</label>
																<div class="d-flex align-items-center fw-bold">
																	<input type="date" class="form-control form-control-lg" ng-model="filter.start"/>
																</div>
															</div>
															<div class="mb-10">
																<label class="form-label fs-6 fw-semibold">To:</label>
																<div class="d-flex align-items-center fw-bold">
																	<input type="date" class="form-control form-control-lg" ng-model="filter.end"/>
																</div>
															</div>
															<div class="d-flex justify-content-end">
																<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.parList(this)">Apply</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="card-body py-4">
											<div class="table-responsive">
												<table class="table align-middle table-row-dashed fs-6 gy-5" id="kt_table_users">
													<thead>
														<tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
															<th><strong>#</strong></th>
															<th><strong>PAR #</strong></th>
															<th><strong>Office/Accountable Person</strong></th>
															<th><strong>PAR Date</strong></th>
															<th></th>
														</tr>
													</thead>
													<tbody class="text-gray-600 fw-semibold">
														<tr ng-repeat="me in filterData = (PARs | filter:searchPAR) | pagination: currentPage:pageSize">
															<td><strong>{{ me.list_no }}</strong></td>
															<td>
																<div class="d-flex flex-colum">
																	<a class="text-gray-800 text-hover-primary mb-1">{{ me.par_no }}</a>
																</div>
															</td>
															<td class="d-flex align-items-center">
																<div class="d-flex flex-column">
																	<a class="text-gray-800 text-hover-primary mb-1">{{ me.accountable_officer }}</a>
																	<span>{{ me.officeName }}</span>
																</div>
															</td>
															<td>
																<div class="d-flex flex-colum">
																	<a class="text-gray-800 text-hover-primary mb-1">{{ me.par_date }}</a>
																</div>
															</td>
															<td class="text-end">
																<a href="#" class="btn btn-icon btn-color-muted btn-bg-light btn-active-color-primary btn-sm me-3" ng-click="app.viewPAR(this, me)">
																	<i class="fonticon-printer fs-3"></i>
																</a>
															</td>
														</tr>
													</tbody>
													<tfoot>
														<tr>
															<td colspan="6" style="text-align: center;">
																<div class="pull-right"><ul uib-pagination direction-links="false" boundary-links="true" total-items="filterData.length" ng-model="currentPage" max-size="maxSize"></ul></div>
															</td>
														</tr>
													</tfoot>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<nav>
			<?php require_once 'components/notification/notification.html'?>
		</nav>
		<script>var hostUrl = "assets/";</script>
		<script src="assets/js/plugins.bundle.js"></script>
		<script src="assets/js/scripts.bundle.js"></script>
		<script src="assets/js/fullcalendar.bundle.js"></script>
		<script src="assets/js/index.js"></script>
		<script src="assets/js/xy.js"></script>
		<script src="assets/js/percent.js"></script>
		<script src="assets/js/radar.js"></script>
		<script src="assets/js/Animated.js"></script>
		<script src="assets/js/map.js"></script>
		<script src="assets/js/worldLow.js"></script>
		<script src="assets/js/continentsLow.js"></script>
		<script src="assets/js/usaLow.js"></script>
		<script src="assets/js/worldTimeZonesLow.js"></script>
		<script src="assets/js/worldTimeZoneAreasLow.js"></script>
		<script src="assets/js/datatables.bundle.js"></script>
		<script src="assets/js/widgets.bundle.js"></script>
		<script src="assets/js/widgets.js"></script>
		<script src="assets/js//chat.js"></script>
		<script src="assets/js/upgrade-plan.js"></script>
		<script src="assets/js/users-search.js"></script>

		<link rel="stylesheet" href="angular/modules/bootbox/bs4-fix.css?ver=1.0.0.0">	
		<script src="angular/modules/bootbox/bootbox.min.js?ver=1.0.0.0"></script>
		<script src="angular/modules/growl/jquery.bootstrap-growl.min.js?ver=1.0.0.0"></script>
		<script src="angular/modules/blockui/jquery.blockUI.js?ver=1.0.0.0"></script>
		<link rel="stylesheet" href="angular/modules/bootbox/bs4-fix.css?ver=1.0.0.0">


		<!-- Js/Jspdf  -->
		<script>if (!window.Promise) window.Promise = {prototype: null}; // Needed for jspdf IE support</script>
		<script src="angular/pdfmake/jsPDFtable/jspdf.umd.js"></script>
		<script>if (!window.jsPDF) window.jsPDF = window.jspdf.jsPDF;</script>
		<script src="angular/pdfmake/jsPDFtable/mitubachi-normal.js"></script>
		<script src="angular/pdfmake/jsPDFtable/faker.min.js"></script>
		<script src="angular/pdfmake/jsPDFtable/jspdf.plugin.autotable.js"></script>



		<!-- dependencies -->
		<script src="angular/angular.min.js?ver=1.0.0.0"></script>
		<script src="angular/angular-route.min.js?ver=1.0.0.0"></script>
		<script src="angular/angular-sanitize.min.js?ver=1.0.0.0"></script>
		<script src="angular/ui-bootstrap-tpls-3.0.6.min.js?ver=1.0.0.0"></script>

		<script src="angular/modules/my-pagination/my-pagination.js?ver=1.0.0.0"></script>
		<script src="angular/modules/account/account.js?ver=1.0.0.0"></script>
		<script src="angular/modules/bootbox/bootstrap-modal.js?ver=1.0.0.0"></script>
		<script src="angular/modules/growl/growl.js?ver=1.0.0.0"></script>
		<script src="angular/modules/blockui/blockui.js?ver=1.0.0.0"></script>
		<script src="angular/modules/validation/validate.js?ver=1.0.0.0"></script>
		<script src="angular/modules/post/window-open-post.js?ver=1.0.0.0"></script>
		<script src="angular/modules/notification/notification.js?ver=1.0.0.0"></script>
		<script src="modules/module-access.js"></script>

		<script src="modules/report-PAR.js?ver=1.0.0.0"></script>
		<script src="controllers/report-PAR.js?ver=1.0.0.0"></script>
	</body>
</html>