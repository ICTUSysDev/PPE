<?php 
$page = "reportPropertyTransferReport";
$dropdown = "reports";
$operation_dropdown = "operation";


?>
<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head><base href=""/>
		<title>Machinery and Equipment - Property Transfer Report</title>
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
	<body ng-app="reportPTR" ng-controller="reportPTRCtrl" id="kt_app_body" data-kt-app-header-fixed="true" data-kt-app-header-fixed-mobile="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" class="app-default" account-profile>
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
											<li class="breadcrumb-item text-muted">Machinery and Equipment - Property Transfer Report</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					<nav>
						<?php require_once 'components/sidebar/sidebar.html'?>
					</nav>
<!-- START -->
					<div id="kt_app_content" class="app-content flex-column-fluid">
						<div id="kt_app_content_container" class="app-container container-fluid">
							<ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8">
								<li class="nav-item">
									<a class="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#property_transfer_report">Property Transfer Report</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#donated_tab">Donated</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#relocated_tab">Relocated</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#reassigned_tab">Reassigned</a>
								</li>
							</ul>
							<div class="tab-content" id="myTabContent">
								<div class="tab-pane fade show active" id="property_transfer_report" role="tabpanel">
									<div class="card card-flush mb-6 mb-xl-9" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
										<div class="card-header border-0">
											<div class="card-title">
												<div class="d-flex align-items-center position-relative my-1">
													<span class="svg-icon svg-icon-1 position-absolute ms-6">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
															<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
														</svg>
													</span>
													<input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search..." ng-model="searchPTR" />
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
																<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.searchPtrList(this)">Apply</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="card-body">
											<table class="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
												<thead>
													<tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
														<th><strong>#</strong></th>
														<th><strong>PTR #</strong></th>
														<th><strong>Type</strong></th>
														<th><strong>Prev. Accountable Officer</strong></th>
														<th><strong>Office</strong></th>
														<th><strong>PTR Date</strong></th>
														<th></th>
													</tr>
												</thead>
												<tbody class="text-gray-600 fw-semibold">
													<tr ng-repeat="rl in filterData = (searchPtrList | filter:searchPTR) | pagination: currentPage:pageSize">
														<td><strong>{{ rl.list_no }}</strong></td>
														<td class="d-flex align-items-center">
															<div>PTR No.:
															<a href="#">{{ rl.ptr_no }}</a></div>
														</td>
														<td>{{ rl.form_type }}</td>
														<td>{{ rl.accountable_officer }}</td>
														<td>
															<div class="badge badge-light-success fw-bold">{{ rl.office_id.name }}</div>
														</td>
														<td>{{ rl.par_date }}</td>
														<td class="text-end">
															<a href="#" class="btn btn-icon btn-color-muted btn-bg-light btn-active-color-primary btn-sm me-3" ng-click="app.viewPtrReport(this, rl)">
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
								<div class="tab-pane fade" id="donated_tab" role="tabpanel">
									<div class="card pt-4 mb-6 mb-xl-9" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
										<div class="card-header border-0">
											<div class="card-title">
												<div class="d-flex align-items-center position-relative my-1">
													<span class="svg-icon svg-icon-1 position-absolute ms-6">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
															<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
														</svg>
													</span>
													<input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search..." ng-model="searchtransferLogs" />
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
																<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.transferLog(this)">Apply</button>
															</div>
														</div>
													</div>
													<button type="button" class="btn btn-light-primary me-3" ng-click="app.exportDonated(this)">
													<span class="svg-icon svg-icon-2">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor" />
															<path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
															<path opacity="0.3" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="currentColor" />
														</svg>
													</span>Export</button>
												</div>
											</div>
										</div>
										<div class="card-body">
											<table class="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
												<thead>
													<tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
													<th><strong>#</strong></th>
														<th><strong>PTR #</strong></th>
														<th><strong>Beneficiary</strong></th>
														<th><strong>Article</strong></th>
														<th><strong>Property #</strong></th>
														<th><strong>PTR Date</strong></th>
														<th></th>
													</tr>
												<tbody class="text-gray-600 fw-semibold">
													<tr ng-repeat="tl in filterDataDL = (transferLogs.donated_equipment | filter:searchtransferLogs) | pagination: currentPageDL:pageSizeDL">
														<td><strong>{{ tl.list_no }}</strong></td>
														<td class="d-flex align-items-center">
															<div>PTR No.:
																	<a href="#">{{ tl.par_details.ptr_no }}</a>
															</div>
														</td>
														<td>{{ tl.par_details.beneficiary }}</td>
														<td>{{ tl.article_id.name }}</td>
														<td>{{ tl.donated_equipment.property_number }}</td>
														<td>
															<div class="badge badge-light-success fw-bold">{{ tl.par_details.par_date }}</div>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="6" style="text-align: center;">
															<div class="pull-right"><ul uib-pagination direction-links="false" boundary-links="true" total-items="filterDataDL.length" ng-model="currentPageDL" max-size="maxSizeDL"></ul></div>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
								<div class="tab-pane fade" id="relocated_tab" role="tabpanel">
									<div class="card pt-4 mb-6 mb-xl-9" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
										<div class="card-header border-0">
											<div class="card-title">
												<div class="d-flex align-items-center position-relative my-1">
													<span class="svg-icon svg-icon-1 position-absolute ms-6">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
															<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
														</svg>
													</span>
													<input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search..." ng-model="searchtransferLogs" />
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
																<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.transferLog(this)">Apply</button>
															</div>
														</div>
													</div>
													<button type="button" class="btn btn-light-primary me-3" ng-click="app.exportRelocated(this)">
													<span class="svg-icon svg-icon-2">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor" />
															<path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
															<path opacity="0.3" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="currentColor" />
														</svg>
													</span>Export</button>
												</div>
											</div>
										</div>
										<div class="card-body">
											<table class="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
												<thead>
													<tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
													<th><strong>#</strong></th>
														<th><strong>PTR #</strong></th>
														<th><strong>Accountable Officer</strong></th>
														<th><strong>Article</strong></th>
														<th><strong>Property #</strong></th>
														<th><strong>PTR Date</strong></th>
														<th></th>
													</tr>
												<tbody class="text-gray-600 fw-semibold">
													<tr ng-repeat="rl in filterDataDL = (transferLogs.relocated_equipment | filter:searchtransferLogs) | pagination: currentPageDL:pageSizeDL">
														<td><strong>{{ rl.list_no }}</strong></td>
														<td class="d-flex align-items-center">
															<div>PTR No.:
																	<a href="#">{{ rl.par_details.ptr_no }}</a>
															</div>
														</td>
														<td>{{ rl.accountable_officer.name }}</td>
														<td>{{ rl.article_id.name }}</td>
														<td>{{ rl.relocated_equipment.property_number }}</td>
														<td>
															<div class="badge badge-light-success fw-bold">{{ rl.par_details.par_date }}</div>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="6" style="text-align: center;">
															<div class="pull-right"><ul uib-pagination direction-links="false" boundary-links="true" total-items="filterDataDL.length" ng-model="currentPageDL" max-size="maxSizeDL"></ul></div>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
								<div class="tab-pane fade" id="reassigned_tab" role="tabpanel">
									<div class="card pt-4 mb-6 mb-xl-9" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
										<div class="card-header border-0">
											<div class="card-title">
												<div class="d-flex align-items-center position-relative my-1">
													<span class="svg-icon svg-icon-1 position-absolute ms-6">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
															<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
														</svg>
													</span>
													<input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search..." ng-model="searchtransferLogs" />
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
																<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.transferLog(this)">Apply</button>
															</div>
														</div>
													</div>
													<button type="button" class="btn btn-light-primary me-3" ng-click="app.exportReassigned(this)">
													<span class="svg-icon svg-icon-2">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor" />
															<path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor" />
															<path opacity="0.3" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="currentColor" />
														</svg>
													</span>Export</button>
												</div>
											</div>
										</div>
										<div class="card-body">
										<table class="table align-middle table-row-dashed fs-6 gy-3" id="kt_table_widget_4_table">
												<thead>
													<tr class="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
													<th><strong>#</strong></th>
														<th><strong>PTR #</strong></th>
														<th><strong>Accountable Officer</strong></th>
														<th><strong>Article</strong></th>
														<th><strong>Property #</strong></th>
														<th><strong>PTR Date</strong></th>
														<th></th>
													</tr>
												<tbody class="text-gray-600 fw-semibold">
													<tr ng-repeat="rl in filterDataDL = (transferLogs.reassigned_equipment | filter:searchtransferLogs) | pagination: currentPageDL:pageSizeDL">
														<td><strong>{{ rl.list_no }}</strong></td>
														<td class="d-flex align-items-center">
															<div>PTR No.:
																	<a href="#">{{ rl.par_details.ptr_no }}</a>
															</div>
														</td>
														<td>{{ rl.accountable_officer.name }}</td>
														<td>{{ rl.article_id.name }}</td>
														<td>{{ rl.reassigned_equipment.property_number }}</td>
														<td>
															<div class="badge badge-light-success fw-bold">{{ rl.par_details.par_date }}</div>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="6" style="text-align: center;">
															<div class="pull-right"><ul uib-pagination direction-links="false" boundary-links="true" total-items="filterDataDL.length" ng-model="currentPageDL" max-size="maxSizeDL"></ul></div>
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
<!-- END -->
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

		<script src="modules/report-PTR.js?ver=1.0.0.0"></script>
		<script src="controllers/report-PTR.js?ver=1.0.0.0"></script>
	</body>
</html>