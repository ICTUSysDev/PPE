<?php 
$page = "me_physical_count";
$dropdown = "operation";
$physical_count_dropdown = "physical_count_dropdown";
?>
<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head><base href=""/>
		<title>Machinery and Equipment Physical Count</title>
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
	<body ng-app="PPEphysicalCount" ng-controller="PPEphysicalCountCtrl" id="kt_app_body" data-kt-app-header-fixed="true" data-kt-app-header-fixed-mobile="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" class="app-default" account-profile>
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
											<li class="breadcrumb-item text-muted">PPE Physical Count</li>
										</ul>
									</div>
									<div class="d-flex align-items-center gap-2 gap-lg-3">
										<a href="#" ng-click="app.edit(this)" ng-show="showEditButton" class="btn btn-flex btn-primary h-40px fs-7 fw-bold">{{controls.edit.label}}</a>
									</div>
								</div>
							</div>
						</div>
					<nav>
						<?php require_once 'components/sidebar/sidebar.html'?>
					</nav>
					<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
						<div class="d-flex flex-column flex-column-fluid">
							

<!-- START HERE-->
							<div id="kt_app_content" class="app-content flex-column-fluid">
												<div id="kt_app_content_container" class="app-container container-fluid">
												<ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
													<li class="nav-item">
													<a class="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_user_view_overview_tab">Property Details</a>
													</li>
												</ul>
												<div class="tab-content" id="myTabContent">
													<div class="tab-pane fade show active" id="kt_user_view_overview_tab" role="tabpanel">
													<div class="card card-flush mb-6 mb-xl-9" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
														<form class="form" autocomplete="off" name="formHolder.PPEphysicalCount">
														<div class="card-body">
															<div class="row mb-6">
															<div class="row">
																<div class="col-lg-5 fv-row">
																<label class="form-label">Property #</label>
																<!-- <input type="text" name="property_number" class="form-control form-control-lg" placeholder="Property #" ng-disabled="controls.ok.btn" ng-model="PPEphysicalCount.property_number" ng-class="{'is-invalid': formHolder.PPEphysicalCount.property_number.$touched && formHolder.PPEphysicalCount.property_number.$invalid}" readonly/> -->
																<input type="text" id="property_number" name="property_number" class="form-control form-control-lg" placeholder="Property #"   ng-disabled="true" ng-model="PPEphysicalCount.property_number" ng-class="{'is-invalid': formHolder.PPEphysicalCount.property_number.$touched && formHolder.PPEphysicalCount.property_number.$invalid}" <?php echo ("value = ".$_GET['id']."");?> readonly/>
																</div>
																<div class="col-lg-4 fv-row">
																<label class="form-label">Article</label>
																<input type="text" name="article_name" class="form-control form-control-lg" placeholder="Article" ng-disabled="true" ng-model="PPEphysicalCount.article_id.article_name" ng-class="{'is-invalid': formHolder.PPEphysicalCount.description.$touched && formHolder.PPEphysicalCount.description.$invalid}" readonly/>
																</div>
																<div class="col-lg-3 fv-row">
																<label class="form-label">Type</label>
																<input type="text" id="property_type" name="type" class="form-control form-control-lg"  ng-disabled="true" <?php echo ("value = ".$_GET['type']."");?> readonly/>
																</div>
															</div>
															</div>
															<div class="row mb-6">
															<div class="row">
																<div class="col-lg-9 fv-row">
																	<label class="form-label">Description</label>
																	<input type="text" name="description" class="form-control form-control-lg" placeholder="Description" ng-disabled="true" ng-model="PPEphysicalCount.description" ng-class="{'is-invalid': formHolder.PPEphysicalCount.description.$touched && formHolder.PPEphysicalCount.description.$invalid}" readonly/>
																</div>
																<div class="col-lg-3 fv-row">
																	<label class="form-label">Acquisition Cost</label>
																	<input type="text" name="acquisition_cost" class="form-control form-control-lg" placeholder="Acquisition Cost" ng-disabled="true" ng-model="PPEphysicalCount.acquisition_cost" ng-class="{'is-invalid': formHolder.PPEphysicalCount.acquisition_cost.$touched && formHolder.PPEphysicalCount.acquisition_cost.$invalid}" readonly/>
																</div>
																</div>
															</div>
															<div class="row mb-6">
															<div class="col-lg-5 fv-row">
																<label class="form-label">Inventory Date<label class="text-danger">*</label></label>
																<input type="date" name="inventory_date" class="form-control form-control-lg" placeholder="Inventory Date" ng-disabled="controls.ok.btn" ng-model="PPEphysicalCount.inventory_date" ng-class="{'is-invalid': formHolder.PPEphysicalCount.inventory_date.$touched && formHolder.PPEphysicalCount.inventory_date.$invalid}" required/>
															</div>
															<div class="col-lg-7 fv-row">
																<label class="form-label">Last Location<label class="text-danger">*</label></label>
																<input type="text" name="location" class="form-control form-control-lg" placeholder="Last Location"  ng-model="PPEphysicalCount.location" ng-class="{'is-invalid': formHolder.PPEphysicalCount.location.$touched && formHolder.PPEphysicalCount.location.$invalid}" required/>
															</div>
															
															</div>
															
															<div class="row mb-6">
															
															<div class="col-lg-4 fv-row">
																<label class="form-label">Condition<label class="text-danger">*</label></label>
																<input type="text" name="equipment_condition" class="form-control form-control-lg" placeholder="Condition"  ng-model="PPEphysicalCount.equipment_condition" ng-class="{'is-invalid': formHolder.PPEphysicalCount.equipment_condition.$touched && formHolder.PPEphysicalCount.equipment_condition.$invalid}" required/>
															</div>
															<div class="col-lg-8 fv-row">
																<label class="form-label">Remarks<label class="text-danger">*</label></label>
																<input type="text" name="remarks" class="form-control form-control-lg" placeholder="Remarks"  ng-model="PPEphysicalCount.remarks" ng-class="{'is-invalid': formHolder.PPEphysicalCount.remarks.$touched && formHolder.PPEphysicalCount.remarks.$invalid}" required/>
															</div>
															</div>
											
														</div>
														</form>
													</div>
													<div class="card-footer d-flex justify-content-end py-6 px-9">
														<button type="reset" class="btn btn-light btn-active-light-primary me-2" ng-click="app.lists(this)" ng-disabled="controls.cancel.btn">{{ controls.cancel.label }}</button>
														<button type="submit" class="btn btn-primary" id="spinner_form_submit" ng-click="app.save(this)">
														<span class="indicator-label">{{ controls.ok.label }}</span>
														<span class="indicator-progress">Please wait...
														<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
														</button>
													</div>
													</div>
												</div>
												</div>
											</div>



<!-- END HERE -->



							<!-- DISPLAY HERE LIST/FORM-->
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
		<script src="modules/qr-machinery-furnitrure-physical-count.js?ver=1.0.0.0"></script>
		<script src="controllers/machinery-furnitrure-physical-count.js?ver=1.0.0.0"></script>

		



	</body>
</html>
