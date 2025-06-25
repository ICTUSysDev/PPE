<?php 
$page = "dashboard";
?>
<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head><base href=""/>
		<title>Dashboard</title>
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
	</head>
	<body ng-app="dashboard" ng-controller="dashboardCtrl" id="kt_app_body" data-kt-app-header-fixed="true" data-kt-app-header-fixed-mobile="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" class="app-default" account-profile>
		<script src="assets/js/themeMode.js"></script>
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
				<nav>
					<?php require_once 'components/header/header.html'?>
				</nav>
				<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
					<nav>
						<?php require_once 'components/sidebar/sidebar.html'?>
					</nav>
					<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
						<div class="d-flex flex-column flex-column-fluid">
							<div id="kt_app_content" class="app-content flex-column-fluid">
								<div id="kt_app_content_container" class="app-container container-fluid">
									<div class="card mb-5 mb-xl-10" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2);">
										<div class="card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px" style="background-image:url('assets/media/svg/shapes/top-green.png" data-theme="light">
											<h3 class="card-title align-items-start flex-column text-white pt-15">
												<span class="fw-bold fs-2x mb-3">Dashboard</span>
												<div class="fs-4 text-white">
													<span class="opacity-75">You have</span>
													<span class="position-relative d-inline-block">
														<a href="../../demo38/dist/pages/user-profile/projects.html" class="link-white opacity-75-hover fw-bold d-block mb-1">PPE</a>
														<span class="position-absolute opacity-50 bottom-0 start-0 border-2 border-body border-bottom w-100"></span>
													</span>
													<span class="opacity-75">Details</span>
												</div>
											</h3>
											<div class="card-toolbar pt-5">
												<button class="btn btn-sm btn-icon btn-active-color-primary btn-color-white bg-white bg-opacity-25 bg-hover-opacity-100 bg-hover-white bg-active-opacity-25 w-20px h-20px" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true">
													<span class="svg-icon svg-icon-4">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect x="10" y="10" width="4" height="4" rx="2" fill="currentColor" />
															<rect x="17" y="10" width="4" height="4" rx="2" fill="currentColor" />
															<rect x="3" y="10" width="4" height="4" rx="2" fill="currentColor" />
														</svg>
													</span>
												</button>
												<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true"></div>
											</div>
										</div>
										<div class="card-body mt-n20">
											<div class="mt-n20 position-relative">
												<div class="row g-3 g-lg-6">
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-buildings" viewBox="0 0 16 16">
																			<path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
																			<path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.building_and_structures.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">Building and Structures</span>
															</div>
														</div>
													</div>
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16">
																			<path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.furniture_and_fixtures.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">Furniture and Fixtures</span>
															</div>
														</div>
													</div>
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building-fill-add" viewBox="0 0 16 16">
																			<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
																			<path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.infrastructure_assets.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">Infrastructure Asssets</span>
															</div>
														</div>
													</div>
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bounding-box" viewBox="0 0 16 16">
																			<path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.land_and_land_improvements.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">Land and Land Improvements</span>
															</div>
														</div>
													</div>
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
																			<path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.machinery_equipment.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">Machinery and Equipment</span>
															</div>
														</div>
													</div>
													<div class="col-4">
														<div class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px; cursor: pointer;">
															<div class="symbol symbol-30px me-5 mb-8">
																<span class="symbol-label">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers-half" viewBox="0 0 16 16">
																			<path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z"/>
																		</svg>
																	</span>
																</span>
															</div>
															<div class="m-0">
																<span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ dashboard.machinery_equipment_ics.total }}</span>
																<span class="text-gray-500 fw-semibold fs-6">ICS</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row mb-6">
										<div class="col-xl-6 mb-xl-10">
											<div id="kt_sliders_widget_1_slider" class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 card-flush carousel carousel-custom carousel-stretch slide h-xl-100" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;" data-bs-ride="carousel" data-bs-interval="5000">
												<div class="card-header pt-5">
													<h4 class="card-title d-flex align-items-start flex-column">
														<span class="card-label fw-bold text-gray-800">OPERATION DATA</span>
														<span class="text-gray-400 mt-1 fw-bold fs-7">Machinery and Equipment/Furniture and Fixtures</span>
													</h4>
													<div class="card-toolbar">
														<ol class="p-0 m-0 carousel-indicators carousel-indicators-bullet carousel-indicators-active-primary">
															<li data-bs-target="#kt_sliders_widget_1_slider" data-bs-slide-to="0" class="active ms-1"></li>
														</ol>
													</div>
												</div>
												<div class="card-body pt-6">
													<div class="carousel-inner mt-n5">
														<div class="carousel-item active show">
															<div class="d-flex align-items-center mb-5">
																<div class="w-80px flex-shrink-0 me-2">
																	<div class="min-h-auto ms-n3" id="kt_slider_widget_1_chart_1" style="height: 100px"></div>
																</div>
																<div class="m-0">
																	<h4 class="fw-bold text-gray-800 mb-3"># of Equipment</h4>
																	<div class="d-flex d-grid gap-5">
																		<div class="d-flex flex-column flex-shrink-0 me-4">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_total_par.total_par }} PAR</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_total_repar.total_retransfer }} TRANSFER/REPAR</span>
																		</div>
																		<div class="d-flex flex-column flex-shrink-0">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_total_returned.total_returned }} RETURN</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_total_ics.total_ics }} ICS</span>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xl-6 mb-5 mb-xl-10">
											<div id="kt_sliders_widget_2_slider" class="card border-hover-primary bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 card-flush carousel carousel-custom carousel-stretch slide h-xl-100" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;" data-bs-ride="carousel" data-bs-interval="5500">
												<div class="card-header pt-5">
													<h4 class="card-title d-flex align-items-start flex-column">
													<span class="card-label fw-bold text-gray-800">Operation Data</span>
														<span class="text-gray-400 mt-1 fw-bold fs-7">Machinery and Equipment/Furniture and Fixtures</span>
													</h4>
													<div class="card-toolbar">
														<ol class="p-0 m-0 carousel-indicators carousel-indicators-bullet carousel-indicators-active-success">
															<li data-bs-target="#kt_sliders_widget_2_slider" data-bs-slide-to="0" class="active ms-1"></li>
															<li data-bs-target="#kt_sliders_widget_2_slider" data-bs-slide-to="1" class="ms-1"></li>
														</ol>
													</div>
												</div>
												<div class="card-body pt-6">
													<div class="carousel-inner">
														<div class="carousel-item active show">
															<div class="d-flex align-items-center mb-9">
																<div class="symbol symbol-70px symbol-circle me-5">
																	<span class="symbol-label bg-light-success">
																		<span class="svg-icon svg-icon-3x svg-icon-success">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M16.925 3.90078V8.00077L12.025 10.8008V5.10078L15.525 3.10078C16.125 2.80078 16.925 3.20078 16.925 3.90078ZM2.525 13.5008L6.025 15.5008L10.925 12.7008L6.025 9.90078L2.525 11.9008C1.825 12.3008 1.825 13.2008 2.525 13.5008ZM18.025 19.7008V15.6008L13.125 12.8008V18.5008L16.625 20.5008C17.225 20.8008 18.025 20.4008 18.025 19.7008Z" fill="currentColor" />
																				<path opacity="0.3" d="M8.52499 3.10078L12.025 5.10078V10.8008L7.125 8.00077V3.90078C7.125 3.20078 7.92499 2.80078 8.52499 3.10078ZM7.42499 20.5008L10.925 18.5008V12.8008L6.02499 15.6008V19.7008C6.02499 20.4008 6.82499 20.8008 7.42499 20.5008ZM21.525 11.9008L18.025 9.90078L13.125 12.7008L18.025 15.5008L21.525 13.5008C22.225 13.2008 22.225 12.3008 21.525 11.9008Z" fill="currentColor" />
																			</svg>
																		</span>
																	</span>
																</div>
																<div class="m-0">
																	<h4 class="fw-bold text-gray-800 mb-3">Furniture, Fixtures and Books</h4>
																	<div class="d-flex d-grid gap-5">
																		<div class="d-flex flex-column flex-shrink-0 me-4">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.furniture_fixture_available.total_available }} Available</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.furniture_fixture_serviceable.total_serviceable }} Serviceable</span>
																		</div>
																		<div class="d-flex flex-column flex-shrink-0 me-4">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.furniture_fixture_notavailable.total_available }} Not Available</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.furniture_fixture_unserviceable.total_serviceable }} Unserviceable</span>
																		</div>
																	</div>
																</div>
															</div>
															<div class="mb-1">
																<a class="btn btn-sm btn-primary me-2" data-bs-target="#kt_sliders_widget_2_slider" data-bs-slide-to="1" class="ms-1">Next</a>
															</div>
														</div>
														<div class="carousel-item">
															<div class="d-flex align-items-center mb-9">
																<div class="symbol symbol-70px symbol-circle me-5">
																	<span class="symbol-label bg-light-danger">
																		<span class="svg-icon svg-icon-3x svg-icon-danger">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path opacity="0.3" d="M7 20.5L2 17.6V11.8L7 8.90002L12 11.8V17.6L7 20.5ZM21 20.8V18.5L19 17.3L17 18.5V20.8L19 22L21 20.8Z" fill="currentColor" />
																				<path d="M22 14.1V6L15 2L8 6V14.1L15 18.2L22 14.1Z" fill="currentColor" />
																			</svg>
																		</span>
																	</span>
																</div>
																<div class="m-0">
																	<h4 class="fw-bold text-gray-800 mb-3">Machinery and Equipment</h4>
																	<div class="d-flex d-grid gap-5">
																		<div class="d-flex flex-column flex-shrink-0 me-4">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_available.total_available }} Available</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_serviceable.total_serviceable }} Serviceable</span>
																		</div>
																		<div class="d-flex flex-column flex-shrink-0 me-4">
																			<span class="d-flex align-items-center fs-7 fw-bold text-gray-400 mb-2">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_notavailable.total_not_available }} Not Available</span>
																			<span class="d-flex align-items-center text-gray-400 fw-bold fs-7">
																			<span class="svg-icon svg-icon-6 svg-icon-gray-600 me-2">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
																					<path d="M11.9343 12.5657L9.53696 14.963C9.22669 15.2733 9.18488 15.7619 9.43792 16.1204C9.7616 16.5789 10.4211 16.6334 10.8156 16.2342L14.3054 12.7029C14.6903 12.3134 14.6903 11.6866 14.3054 11.2971L10.8156 7.76582C10.4211 7.3666 9.7616 7.42107 9.43792 7.87962C9.18488 8.23809 9.22669 8.72669 9.53696 9.03696L11.9343 11.4343C12.2467 11.7467 12.2467 12.2533 11.9343 12.5657Z" fill="currentColor" />
																				</svg>
																			</span>{{ dashboard.machinery_equipment_unserviceable.total_serviceable }} Unserviceable</span>
																		</div>
																	</div>
																</div>
															</div>
															<div class="mb-1">
																<a class="btn btn-sm btn-primary me-2" data-bs-target="#kt_sliders_widget_2_slider" data-bs-slide-to="0" class="ms-1">Previous</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="container">
											<div class="row my-2">
												<div class="col-md-12 py-1">
													<div class="card">
														<div class="card-header pt-7">
															<h3 class="card-title align-items-start flex-column">
																<span class="card-label fw-bold text-dark">{{ dashboard.year_list }}</span>
																<span class="text-gray-400 pt-2 fw-semibold fs-6">{{ chartTitle }}</span>
															</h3>
															<div class="card-toolbar">
																<div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
																	<button type="button" class="btn btn-light-primary me-3" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
																		<span class="svg-icon svg-icon-2">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor" />
																			</svg>
																		</span>Filter
																	</button>
																	<div class="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
																		<div class="px-7 py-5">
																			<div class="fs-5 text-dark fw-bold">Filter Options</div>
																		</div>
																		<div class="separator border-gray-200"></div>
																		<div class="px-7 py-5" data-kt-user-table-filter="form">
																			<div class="mb-10">
																				<label class="form-label">Year<label class="text-danger">*</label></label>
																				<input name="year" data-allow-clear="true" class="select2-width-75 form-control" ng-model="filterChart.start">
																			</div>
																			<div class="d-flex justify-content-end">
																				<button type="submit" class="btn btn-primary fw-semibold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter" ng-click="app.dashboard(this)">Apply</button>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="card-body">
															<canvas id="chBar"></canvas>
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
						<div id="kt_app_footer" class="app-footer">
							<div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
								<div class="text-dark order-2 order-md-1">
									<span class="text-muted fw-semibold me-1">2022&copy;</span>
									<a href="https://keenthemes.com" target="_blank" class="text-gray-800 text-hover-primary">Keenthemes</a>
								</div>
								<ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
									<li class="menu-item">
										<a href="https://keenthemes.com" target="_blank" class="menu-link px-2">About</a>
									</li>
									<li class="menu-item">
										<a href="https://devs.keenthemes.com" target="_blank" class="menu-link px-2">Support</a>
									</li>
									<li class="menu-item">
										<a href="https://1.envato.market/EA4JP" target="_blank" class="menu-link px-2">Purchase</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script>
			/* chart.js chart examples */
		$(document).ready(function(){
			// chart colors
var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];

/* large line chart */
var chLine = document.getElementById("chLine");
var chartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
    backgroundColor: 'transparent',
    borderColor: colors[0],
    borderWidth: 4,
    pointBackgroundColor: colors[0]
  }
//   {
//     data: [639, 465, 493, 478, 589, 632, 674],
//     backgroundColor: colors[3],
//     borderColor: colors[1],
//     borderWidth: 4,
//     pointBackgroundColor: colors[1]
//   }
  ]
};
if (chLine) {
  new Chart(chLine, {
  type: 'line',
  data: chartData,
  options: {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true
  }
  });
}

/* large pie/donut chart */
var chPie = document.getElementById("chPie");
if (chPie) {
  new Chart(chPie, {
    type: 'pie',
    data: {
      labels: ['Desktop', 'Phone', 'Tablet', 'Unknown'],
      datasets: [
        {
          backgroundColor: [colors[1],colors[0],colors[2],colors[5]],
          borderWidth: 0,
          data: [50, 40, 15, 5]
        }
      ]
    },
    plugins: [{
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.restore();
        var fontSize = (height / 70).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = chart.config.data.datasets[0].data[0] + "%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }],
    options: {layout:{padding:0}, legend:{display:false}, cutoutPercentage: 80}
  });
}

/* bar chart */
var chBar = document.getElementById("chBar");
if (chBar) {
  new Chart(chBar, {
  type: 'bar',
  data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
      data: [589, 445, 483, 503, 689, 692, 634],
      backgroundColor: colors[0]
    },
    {
      data: [639, 465, 493, 478, 589, 632, 674],
      backgroundColor: colors[1]
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.4,
        categoryPercentage: 0.5
      }]
    }
  }
  });
}

/* 3 donut charts */
var donutOptions = {
  cutoutPercentage: 85, 
  legend: {position:'bottom', padding:5, labels: {pointStyle:'circle', usePointStyle:true}}
};

// donut 1
var chDonutData1 = {
    labels: ['Bootstrap', 'Popper', 'Other'],
    datasets: [
      {
        backgroundColor: colors.slice(0,3),
        borderWidth: 0,
        data: [74, 11, 40]
      }
    ]
};

var chDonut1 = document.getElementById("chDonut1");
if (chDonut1) {
  new Chart(chDonut1, {
      type: 'pie',
      data: chDonutData1,
      options: donutOptions
  });
}

// donut 2
var chDonutData2 = {
    labels: ['Wips', 'Pops', 'Dags'],
    datasets: [
      {
        backgroundColor: colors.slice(0,3),
        borderWidth: 0,
        data: [40, 45, 30]
      }
    ]
};
var chDonut2 = document.getElementById("chDonut2");
if (chDonut2) {
  new Chart(chDonut2, {
      type: 'pie',
      data: chDonutData2,
      options: donutOptions
  });
}

// donut 3
var chDonutData3 = {
    labels: ['Angular', 'React', 'Other'],
    datasets: [
      {
        backgroundColor: colors.slice(0,3),
        borderWidth: 0,
        data: [21, 45, 55, 33]
      }
    ]
};
var chDonut3 = document.getElementById("chDonut3");
if (chDonut3) {
  new Chart(chDonut3, {
      type: 'pie',
      data: chDonutData3,
      options: donutOptions
  });
}

/* 3 line charts */
var lineOptions = {
    legend:{display:false},
    tooltips:{interest:false,bodyFontSize:11,titleFontSize:11},
    scales:{
        xAxes:[
            {
                ticks:{
                    display:false
                },
                gridLines: {
                    display:false,
                    drawBorder:false
                }
            }
        ],
        yAxes:[{display:false}]
    },
    layout: {
        padding: {
            left: 6,
            right: 6,
            top: 4,
            bottom: 6
        }
    }
};

var chLine1 = document.getElementById("chLine1");
if (chLine1) {
  new Chart(chLine1, {
      type: 'line',
      data: {
          labels: ['Jan','Feb','Mar','Apr','May'],
          datasets: [
            {
              backgroundColor:'#ffffff',
              borderColor:'#ffffff',
              data: [10, 11, 4, 11, 4],
              fill: false
            }
          ]
      },
      options: lineOptions
  });
}
var chLine2 = document.getElementById("chLine2");
if (chLine2) {
  new Chart(chLine2, {
      type: 'line',
      data: {
          labels: ['A','B','C','D','E'],
          datasets: [
            {
              backgroundColor:'#ffffff',
              borderColor:'#ffffff',
              data: [4, 5, 7, 13, 12],
              fill: false
            }
          ]
      },
      options: lineOptions
  });
}

var chLine3 = document.getElementById("chLine3");
if (chLine3) {
  new Chart(chLine3, {
      type: 'line',
      data: {
          labels: ['Pos','Neg','Nue','Other','Unknown'],
          datasets: [
            {
              backgroundColor:'#ffffff',
              borderColor:'#ffffff',
              data: [13, 15, 10, 9, 14],
              fill: false
            }
          ]
      },
      options: lineOptions
  });
}
		})
		</script>
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
		<script src="assets/chart.js/Chart.min.js"></script>

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
		<script src="modules/dashboard.js?ver=1.0.0.0"></script>
		<script src="controllers/dashboard.js?ver=1.0.0.0"></script>
	</body>
</html>