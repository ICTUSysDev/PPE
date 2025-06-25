<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head><base href=""/>
		<title>My Profile</title>
		<meta charset="utf-8" />
		<meta name="description" content="The most advanced Bootstrap Admin Theme on Themeforest trusted by 100,000 beginners and professionals. Multi-demo, Dark Mode, RTL support and complete React, Angular, Vue, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask & Laravel versions. Grab your copy now and get life-time updates for free." />
		<meta name="keywords" content="metronic, bootstrap, bootstrap 5, angular, VueJs, React, Asp.Net Core, Rails, Spring, Blazor, Django, Express.js, Node.js, Flask & Laravel starter kits, admin themes, web design, figma, web development, free templates, free admin themes, bootstrap theme, bootstrap template, bootstrap dashboard, bootstrap dak mode, bootstrap button, bootstrap datepicker, bootstrap timepicker, fullcalendar, datatables, flaticon" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:type" content="myProfile" />
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
	<body ng-app="myProfile" ng-controller="myProfileCtrl" id="kt_app_body" data-kt-app-header-fixed="true" data-kt-app-header-fixed-mobile="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" class="app-default" account-profile>
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
											<li class="breadcrumb-item text-muted">My Profile</li>
										</ul>
									</div>
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
									<div class="card mb-5 mb-xl-10">
										<div class="card-body pt-9 pb-0">
											<div class="d-flex flex-wrap flex-sm-nowrap mb-3">
												<!--begin: Pic-->
												<div class="me-7 mb-4">
													<div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
														<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="image" />
														<div class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
													</div>
												</div>
												<div class="flex-grow-1">
													<div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
														<div class="d-flex flex-column">
															<div class="d-flex align-items-center mb-2">
																<a href="#" class="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{{ profileOverview.fullname }}</a>
																<a href="#">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
																		<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
																			<path d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z" fill="currentColor" />
																			<path d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z" fill="white" />
																		</svg>
																	</span>
																</a>
																<a href="#" class="btn btn-sm btn-light-success fw-bold ms-2 fs-8 py-1 px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_upgrade_plan">{{ profileOverview.employment_status }}</a>
															</div>
															<div class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
																<a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
																<span class="svg-icon svg-icon-4 me-1">
																	<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
																		<path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
																		<rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
																	</svg>
																</span>
																{{ profileOverview.position_id.position_name }}</a>
																<a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
																<span class="svg-icon svg-icon-4 me-1">
																	<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
																		<path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
																		<rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
																	</svg>
																</span>
																{{ profileOverview.employee_id }}</a>
																<a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
																<span class="svg-icon svg-icon-4 me-1">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="currentColor" />
																		<path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="currentColor" />
																	</svg>
																</span>
																{{ profileOverview.email }}</a>
															</div>
														</div>
													</div>
													<!-- <div class="d-flex flex-wrap flex-stack">
														<div class="d-flex flex-column flex-grow-1 pe-8">
															<div class="d-flex flex-wrap">
																<div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
																	<div class="d-flex align-items-center">
																		<span class="svg-icon svg-icon-3 svg-icon-success me-2">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
																				<path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
																			</svg>
																		</span>
																		<div class="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="4500" data-kt-countup-prefix="$">0</div>
																	</div>
																	<div class="fw-semibold fs-6 text-gray-400">Earnings</div>
																</div>
																<div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
																	<div class="d-flex align-items-center">
																		<span class="svg-icon svg-icon-3 svg-icon-danger me-2">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor" />
																				<path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor" />
																			</svg>
																		</span>
																		<div class="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="75">0</div>
																	</div>
																	<div class="fw-semibold fs-6 text-gray-400">Projects</div>
																</div>
																<div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
																	<div class="d-flex align-items-center">
																		<span class="svg-icon svg-icon-3 svg-icon-success me-2">
																			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
																				<path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
																			</svg>
																		</span>
																		<div class="fs-2 fw-bold" data-kt-countup="true" data-kt-countup-value="60" data-kt-countup-prefix="%">0</div>
																	</div>
																	<div class="fw-semibold fs-6 text-gray-400">Success Rate</div>
																</div>
															</div>
														</div>
													</div> -->
												</div>
											</div>
											<ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
											<li class="nav-item">
													<a class="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_user_view_overview">Overview</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#kt_user_view_settings">Settings</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-active-primary pb-4" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#kt_user_view_activity">Activity</a>
												</li>
											</ul>
										</div>
									</div>
									<div class="tab-content" id="myTabContent">
										<div class="tab-pane fade show active" id="kt_user_view_overview" role="tabpanel">
											<div class="card" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
												<div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
													<div class="card-header cursor-pointer">
														<div class="card-title m-0">
															<h3 class="fw-bold m-0">Profile Overview</h3>
														</div>
													</div>
													<div class="card-body p-9">
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Employee Id</label>
															<div class="col-lg-8">
																<span class="fw-bold fs-6 text-gray-800">{{ profileOverview.employee_id }}</span>
															</div>
														</div>
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Full Name</label>
															<div class="col-lg-8 fv-row">
																<span class="fw-semibold text-gray-800 fs-6">{{ profileOverview.fullname }}</span>
															</div>
														</div>
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Email</label>
															<div class="col-lg-8">
																<a href="#" class="fw-semibold fs-6 text-gray-800 text-hover-primary">{{ profileOverview.email }}</a>
															</div>
														</div>
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Office</label>
															<div class="col-lg-8 fv-row">
																<span class="fw-semibold text-gray-800 fs-6">{{ profileOverview.office_id.office_name }}</span>
															</div>
														</div>
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Position</label>
															<div class="col-lg-8">
																<span class="fw-bold fs-6 text-gray-800">{{ profileOverview.position_id.position_name }}</span>
															</div>
														</div>
														<div class="row mb-7">
															<label class="col-lg-4 fw-semibold text-muted">Employment Status</label>
															<div class="col-lg-8 fv-row">
																<span class="badge badge-success">{{ profileOverview.employment_status }}</span>
															</div>
														</div>
														<div class="row mb-10">
															<label class="col-lg-4 fw-semibold text-muted">Contact Number</label>
															<div class="col-lg-8">
																<span class="fw-semibold fs-6 text-gray-800">{{ profileOverview.contact_number }}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="kt_user_view_settings" role="tabpanel">
											<div class="card" style="box-shadow: 0 4px 8px 0 rgb(0,0,0,0.2); padding: 10px;">
												<div class="col-xl-12">
													<div class="card mb-5 mb-xl-10">
														<div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile_details" aria-expanded="true" aria-controls="kt_account_profile_details">
															<div class="card-title m-0">
																<h3 class="fw-bold m-0">Profile Settings</h3>
															</div>
															<div class="card-toolbar">
																<div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
																	<a href="#" ng-click="app.edit(this)" class="btn btn-flex btn-primary h-40px fs-7 fw-bold">{{controls.edit.label}}</a>
																</div>
															</div>
														</div>
														<div id="kt_account_settings_profile_details" class="collapse show">
															<form id="kt_account_profile_details_form" class="form"  name="formHolder.profileSettings">
																<div class="card-body border-top p-9">
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label fw-semibold fs-6">Picture</label>
																		<div class="col-lg-8">
																			<div class="image-input image-input-outline" data-kt-image-input="true" style="background-image: url('assets/media/svg/avatars/blank.svg')">
																				<div class="image-input-wrapper w-125px h-125px" style="background-image: url(./assets/images/profiles/{{ profileOverview.profile_picture.img_name }})"></div>
																				<label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="Change Picture">
																					<i class="bi bi-pencil-fill fs-7"></i>
																					<input type="file" id="profilePicture" ng-disabled="controls.ok.btn" name="profilePicture" accept=".png, .jpg, .jpeg" />
																					<input type="hidden" name="avatar_remove" />
																				</label>
																				<span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
																					<i class="bi bi-x fs-2"></i>
																				</span>
																			</div>
																			<div class="form-text">Allowed file types: png, jpg, jpeg.</div>
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Full Name</label>
																		<div class="col-lg-8">
																			<div class="row">
																				<div class="col-lg-4 fv-row">
																					<input type="text" name="first_name" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" ng-disabled="controls.ok.btn" placeholder="First name" ng-model="profileSettings.first_name" ng-class="{'is-invalid': formHolder.profileSettings.first_name.$touched && formHolder.profileSettings.first_name.$invalid}" required/>
																				</div>
																				<div class="col-lg-4 fv-row">
																					<input type="text" name="last_name" class="form-control form-control-lg form-control-solid" ng-disabled="controls.ok.btn" placeholder="Last name" ng-model="profileSettings.last_name" ng-class="{'is-invalid': formHolder.profileSettings.last_name.$touched && formHolder.profileSettings.last_name.$invalid}" required />
																				</div>
																				<div class="col-lg-4 fv-row">
																					<input type="text" name="middle_name" class="form-control form-control-lg form-control-solid" ng-disabled="controls.ok.btn" placeholder="Middle name" ng-model="profileSettings.middle_name" ng-class="{'is-invalid': formHolder.profileSettings.middle_name.$touched && formHolder.profileSettings.middle_name.$invalid}" required />
																				</div>
																			</div>
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Employee Id</label>
																		<div class="col-lg-8 fv-row">
																			<input type="text" name="employee_id" class="form-control form-control-lg form-control-solid" ng-disabled="controls.ok.btn" placeholder="Employee Id" ng-model="profileSettings.employee_id" ng-class="{'is-invalid': formHolder.profileSettings.employee_id.$touched && formHolder.profileSettings.employee_id.$invalid}" required />
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Email</label>
																		<div class="col-lg-8 fv-row">
																			<input type="email" name="email" class="form-control form-control-lg form-control-solid" ng-disabled="controls.ok.btn" placeholder="Email" ng-model="profileSettings.email" ng-class="{'is-invalid': formHolder.profileSettings.email.$touched && formHolder.profileSettings.email.$invalid}" required />
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Office</label>
																		<div class="col-lg-8 fv-row">
																			<select name="office_id" aria-label="Select Office" data-control="select2" data-placeholder="Select Office..." class="select2-width-75 form-select" ng-disabled="controls.ok.btn" ng-options="o.name + '(' + (o.shortname) + ')' for o in offices track by o.id" ng-model="profileSettings.office_id" ng-class="{'is-invalid': formHolder.profileSettings.office_id.$touched && formHolder.profileSettings.office_id.$invalid}" required>
																				<option value="" disabled>Select Office...</option>
																			</select>
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Position</label>
																		<div class="col-lg-8 fv-row">
																			<select name="psoition_id" aria-label="Select Office" data-control="select2" data-placeholder="Select Position..." class="select2-width-75 form-select" ng-disabled="controls.ok.btn" ng-options="p.position_description for p in positions track by p.id" ng-model="profileSettings.position_id" ng-class="{'is-invalid': formHolder.profileSettings.position_id.$touched && formHolder.profileSettings.position_id.$invalid}" required>
																				<option value="" disabled>Select Position...</option>
																			</select>
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Status</label>
																		<div class="col-lg-8 fv-row">
																			<select name="employment_status" aria-label="Select Employment Status" data-control="select2" data-placeholder="Select Employment Status..." class="form-select" ng-disabled="controls.ok.btn" ng-model="profileSettings.employment_status" ng-class="{'is-invalid': formHolder.profileSettings.employment_status.$touched && formHolder.profileSettings.employment_status.$invalid}" required>
																				<option value="Active">Active</option>
																				<option value="Inactive">Inactive</option>
																			</select>
																		</div>
																	</div>
																	<div class="row mb-6">
																		<label class="col-lg-4 col-form-label required fw-semibold fs-6">Contact Phone</label>
																		<div class="col-lg-8 fv-row">
																		<input type="number" name="contact_number" class="form-control form-control-lg" placeholder="Contact Number" ng-disabled="controls.ok.btn" ng-model="profileSettings.contact_number" ng-class="{'is-invalid': formHolder.profileSettings.contact_number.$touched && formHolder.profileSettings.contact_number.$invalid}" required/>
																		</div>
																	</div>
																</div>
																<div class="card-footer d-flex justify-content-end py-6 px-9">
																	<button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit" ng-disabled="controls.ok.btn" ng-click="app.updateDetails(this)">Save Changes</button>
																</div>
															</form>
														</div>
													</div>
													<div class="card mb-5 mb-xl-10">
														<div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_signin_method">
															<div class="card-title m-0">
																<h3 class="fw-bold m-0">Update Account?</h3>
															</div>
														</div>
														<div id="kt_account_settings_signin_method" class="collapse show">
															<div class="card-body border-top p-9">
																<div class="d-flex flex-wrap align-items-center">
																	<div id="kt_signin_email">
																		<div class="fs-6 fw-bold mb-1">Username</div>
																		<div class="fw-semibold text-gray-600">{{ profileSettings.username }}</div>
																	</div>
																	<div id="kt_signin_email_edit" class="flex-row-fluid d-none">
																		<form id="kt_signin_change_email" class="form" autocomplete="off" name="formHolder.usernameUpdate">
																			<div class="row mb-6">
																				<div class="col-lg-6 mb-4 mb-lg-0">
																					<div class="fv-row mb-0">
																						<label for="username" class="form-label fs-6 required fw-bold mb-3">Enter New Username</label><label class="text-danger" ng-show="showUsernameLabel">Please Enter New Email!</label>
																						<input type="text" class="form-control form-control-lg" id="username" placeholder="Username" name="username" ng-model="usernameUpdate.username" ng-class="{'is-invalid': formHolder.usernameUpdate.username.$touched && formHolder.usernameUpdate.username.$invalid}" required />
																					</div>
																				</div>
																				<div class="col-lg-6">
																					<div class="fv-row mb-0">
																						<label class="form-label fs-6 required fw-bold mb-3">Confirm Password</label><label class="text-danger" ng-show="showPasswordLabel">Invalid Password!</label>
																						<input type="password" name="password" class="form-control form-control-lg" placeholder="Password" autocomplete="new-password" ng-model="usernameUpdate.password" ng-class="{'is-invalid': formHolder.usernameUpdate.password.$touched && formHolder.usernameUpdate.password.$invalid}" required/>
																					</div>
																				</div>
																			</div>
																			<div class="d-flex">
																				<button type="button" class="btn btn-primary me-2 px-6" ng-click="app.checkUP(this)">Update Username</button>
																				<button id="kt_signin_cancel" type="button" class="btn btn-color-gray-400 btn-active-light-primary px-6">Cancel</button>
																			</div>
																		</form>
																	</div>
																	<div id="kt_signin_email_button" class="ms-auto">
																		<button class="btn btn-light btn-active-light-primary">Change Username</button>
																	</div>
																</div>
																<div class="separator separator-dashed my-6"></div>
																<div class="d-flex flex-wrap align-items-center mb-10">
																	<div id="kt_signin_password">
																		<div class="fs-6 fw-bold mb-1">Password</div>
																		<div class="fw-semibold text-gray-600">************</div>
																	</div>
																	<div id="kt_signin_password_edit" class="flex-row-fluid d-none">
																		<form id="kt_signin_change_password" autocomplete="off" name="formHolder.updatePassword">
																			<div class="row mb-1">
																				<div class="col-lg-4">
																					<div class="fv-row mb-0">
																						<label for="currentpassword" class="form-label fs-6 required fw-bold mb-3">Current Password</label><label class="text-danger" ng-show="showInvalidPassword">Invalid Password!</label>
																						<input type="password" class="form-control form-control-lg form-control-solid" name="currentpassword" ng-model="updatePassword.currentPassword" ng-class="{'is-invalid': formHolder.updatePassword.currentPassword.$touched && formHolder.updatePassword.currentPassword.$invalid}" required />
																					</div>
																				</div>
																				<div class="col-lg-4">
																					<div class="fv-row mb-0">
																						<label for="newpassword" class="form-label fs-6 required fw-bold mb-3">New Password</label>
																						<input type="password" class="form-control form-control-lg form-control-solid" name="newpassword" ng-model="updatePassword.newPassword" ng-class="{'is-invalid': formHolder.updatePassword.newPassword.$touched && formHolder.updatePassword.newPassword.$invalid}" required />
																					</div>
																				</div>
																				<div class="col-lg-4">
																					<div class="fv-row mb-0">
																						<label for="confirmpassword" class="form-label fs-6 required fw-bold mb-3">Confirm New Password</label><label class="text-danger" ng-show="showPasswordMatch">Password Not Match!</label>
																						<input type="password" class="form-control form-control-lg form-control-solid" name="confirmpassword" ng-change="app.checkPasswordMatch(this)" ng-model="updatePassword.password" ng-class="{'is-invalid': formHolder.updatePassword.password.$touched && formHolder.updatePassword.password.$invalid}" required />
																					</div>
																				</div>
																			</div>
																			<div class="form-text mb-5">Password must be at least 8 character and contain symbols</div>
																			<div class="d-flex">
																				<button type="button" class="btn btn-primary me-2 px-6" ng-disabled="disableUpdateBtn" ng-click="app.updatePassword(this)">Update Password</button>
																				<button type="button" class="btn btn-color-gray-400 btn-active-light-primary px-6">Cancel</button>
																			</div>
																		</form>
																	</div>
																	<div id="kt_signin_password_button" class="ms-auto">
																		<button class="btn btn-light btn-active-light-primary">Reset Password</button>
																	</div>
																</div>
																<div class="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6">
																	<span class="svg-icon svg-icon-2tx svg-icon-primary me-4">
																		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor" />
																			<path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor" />
																		</svg>
																	</span>
																	<div class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
																		<div class="mb-3 mb-md-0 fw-semibold">
																			<h4 class="text-gray-900 fw-bold">Secure Your Account</h4>
																			<div class="fs-6 text-gray-700 pe-7">Two-factor authentication adds an extra layer of security to your account. To log in, in addition you'll need to provide a 6 digit code</div>
																		</div>
																		<a href="#" class="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_two_factor_authentication">Enable</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="kt_user_view_activity" role="tabpanel">
											<div class="card">
												<div class="card-header card-header-stretch">
													<div class="card-title d-flex align-items-center">
														<span class="svg-icon svg-icon-1 svg-icon-primary me-3 lh-0">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" />
																<path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" />
																<path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" />
															</svg>
														</span>
														<h3 class="fw-bold m-0 text-gray-800">{{ profileActivities.word_date }}</h3>
													</div>
													<div class="card-toolbar m-0">
														<ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold" role="tablist">
															<li class="nav-item" role="presentation">
																<a id="kt_activity_today_tab" class="nav-link justify-content-center text-active-gray-800 active" data-bs-toggle="tab" role="tab" href="#kt_activity_today">Today</a>
															</li>
															<li class="nav-item" role="presentation">
																<a id="kt_activity_week_tab" class="nav-link justify-content-center text-active-gray-800" data-bs-toggle="tab" role="tab" href="#kt_activity_week">Past 7 days</a>
															</li>
															<li class="nav-item" role="presentation">
																<a id="kt_activity_month_tab" class="nav-link justify-content-center text-active-gray-800" data-bs-toggle="tab" role="tab" href="#kt_activity_month">Past 30 days</a>
															</li>
														</ul>
													</div>
												</div>
												<div class="card-body">
													<div class="tab-content">
														<div id="kt_activity_today" class="card-body p-0 tab-pane fade show active" role="tabpanel" aria-labelledby="kt_activity_today_tab">
															<div class="timeline" ng-repeat="pa in profileActivities.profile_activity_today">
																<div ng-if="pa.action_name === 'ADDED' || pa.action_name === 'UPDATED' || pa.action_name === 'REPAIRED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
																					<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a>is <a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'REMOVED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a> has been <a href="#" class="text-danger fw-bold me-1">DELETED</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'UPLOADED'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="mb-5 pe-3">
																			<a href="#" class="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2"><a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a> a file in <a href="#" class="text-info fs-5 fw-bold">{{ pa.module_name }}</a> module</a>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div ng-if="pa.action_name === 'UPLOADED'"  class="overflow-auto pb-5">
																			<div class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
																				<div ng-repeat="pat in pa.activities" class="d-flex flex-aligns-center pe-10 pe-lg-20">
																					<img alt="" class="w-30px me-3" src="{{pat.file_path}}">
																					<div class="ms-1 fw-semibold">
																						<a href="../../demo38/dist/apps/projects/project.html" class="fs-6 text-hover-primary fw-bold">{{ pat.file_name }}</a>
																						<div class="text-gray-400">{{ pat.file_size_kb }} kb</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'PAR'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px me-4">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M2 4V16C2 16.6 2.4 17 3 17H13L16.6 20.6C17.1 21.1 18 20.8 18 20V17H21C21.6 17 22 16.6 22 16V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4Z" fill="currentColor"></path>
																					<path d="M18 9H6C5.4 9 5 8.6 5 8C5 7.4 5.4 7 6 7H18C18.6 7 19 7.4 19 8C19 8.6 18.6 9 18 9ZM16 12C16 11.4 15.6 11 15 11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H15C15.6 13 16 12.6 16 12Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2"><a href="#" class="text-success fw-bold me-1">{{pa.module_name}}</a> the equipment with the {{pa.module_name}} number <a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Nina Nilson" data-bs-original-title="Nina Nilson" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div class="overflow-auto pb-5">
																			<div ng-repeat="pat in pa.activities" class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
																				<a href="../../demo38/dist/apps/projects/project.html" class="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px">{{ pat.machinery_equipment.machinery_equipment_data.name }}</a>
																				<div class="min-w-175px pe-2">
																					<span class="badge badge-light-success">{{ pat.machinery_equipment.property_number }}</span>
																				</div>
																				<div class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
																					
																				</div>
																				<div class="min-w-125px pe-2">
																					<span class="badge badge-light-primary">{{ pat.machinery_equipment.remarks }}</span>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div id="kt_activity_week" class="card-body p-0 tab-pane fade show" role="tabpanel" aria-labelledby="kt_activity_week_tab">
														<div class="timeline" ng-repeat="pa in profileActivities.profile_activity_week">
																<div ng-if="pa.action_name === 'ADDED' || pa.action_name === 'UPDATED' || pa.action_name === 'REPAIRED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
																					<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.activities.ppe_code }}</a>is <a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'REMOVED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a> has been <a href="#" class="text-danger fw-bold me-1">DELETED</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'UPLOADED'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="mb-5 pe-3">
																			<a href="#" class="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2"><a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a> a file in <a href="#" class="text-info fs-5 fw-bold">{{ pa.module_name }}</a> module</a>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div ng-if="pa.action_name === 'UPLOADED'"  class="overflow-auto pb-5">
																			<div class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
																				<div ng-repeat="pat in pa.activities" class="d-flex flex-aligns-center pe-10 pe-lg-20">
																					<img alt="" class="w-30px me-3" src="{{pat.file_path}}">
																					<div class="ms-1 fw-semibold">
																						<a href="../../demo38/dist/apps/projects/project.html" class="fs-6 text-hover-primary fw-bold">{{ pat.file_name }}</a>
																						<div class="text-gray-400">{{ pat.file_size_kb }} kb</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'PAR'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px me-4">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M2 4V16C2 16.6 2.4 17 3 17H13L16.6 20.6C17.1 21.1 18 20.8 18 20V17H21C21.6 17 22 16.6 22 16V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4Z" fill="currentColor"></path>
																					<path d="M18 9H6C5.4 9 5 8.6 5 8C5 7.4 5.4 7 6 7H18C18.6 7 19 7.4 19 8C19 8.6 18.6 9 18 9ZM16 12C16 11.4 15.6 11 15 11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H15C15.6 13 16 12.6 16 12Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2"><a href="#" class="text-success fw-bold me-1">{{pa.module_name}}</a> the equipment with the {{pa.module_name}} number <a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Nina Nilson" data-bs-original-title="Nina Nilson" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div class="overflow-auto pb-5">
																			<div ng-repeat="pat in pa.activities" class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
																				<a href="../../demo38/dist/apps/projects/project.html" class="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px">{{ pat.machinery_equipment.machinery_equipment_data.name }}</a>
																				<div class="min-w-175px pe-2">
																					<span class="badge badge-light-success">{{ pat.machinery_equipment.property_number }}</span>
																				</div>
																				<div class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
																					
																				</div>
																				<div class="min-w-125px pe-2">
																					<span class="badge badge-light-primary">{{ pat.machinery_equipment.remarks }}</span>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div id="kt_activity_month" class="card-body p-0 tab-pane fade show" role="tabpanel" aria-labelledby="kt_activity_month_tab">
														<div class="timeline" ng-repeat="pa in profileActivities.profile_activity_month">
																<div ng-if="pa.action_name === 'ADDED' || pa.action_name === 'UPDATED' || pa.action_name === 'REPAIRED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
																					<path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.activities.ppe_code }}</a>is <a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'REMOVED'" class="timeline-item">
																<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2">{{ pa.module_name }}
																			<a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a> has been <a href="#" class="text-danger fw-bold me-1">DELETED</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'UPLOADED'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z" fill="currentColor"></path>
																					<path opacity="0.3" d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="mb-5 pe-3">
																			<a href="#" class="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2"><a href="#" class="text-success fs-5 fw-bold">{{ pa.action_name }}</a> a file in <a href="#" class="text-info fs-5 fw-bold">{{ pa.module_name }}</a> module</a>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Jan Hummer" data-bs-original-title="Jan Hummer" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div ng-if="pa.action_name === 'UPLOADED'"  class="overflow-auto pb-5">
																			<div class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
																				<div ng-repeat="pat in pa.activities" class="d-flex flex-aligns-center pe-10 pe-lg-20">
																					<img alt="" class="w-30px me-3" src="{{pat.file_path}}">
																					<div class="ms-1 fw-semibold">
																						<a href="../../demo38/dist/apps/projects/project.html" class="fs-6 text-hover-primary fw-bold">{{ pat.file_name }}</a>
																						<div class="text-gray-400">{{ pat.file_size_kb }} kb</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div ng-if="pa.action_name === 'PAR'" class="timeline-item">
																	<div class="timeline-line w-40px"></div>
																	<div class="timeline-icon symbol symbol-circle symbol-40px me-4">
																		<div class="symbol-label bg-light">
																			<span class="svg-icon svg-icon-2 svg-icon-gray-500">
																				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																					<path opacity="0.3" d="M2 4V16C2 16.6 2.4 17 3 17H13L16.6 20.6C17.1 21.1 18 20.8 18 20V17H21C21.6 17 22 16.6 22 16V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4Z" fill="currentColor"></path>
																					<path d="M18 9H6C5.4 9 5 8.6 5 8C5 7.4 5.4 7 6 7H18C18.6 7 19 7.4 19 8C19 8.6 18.6 9 18 9ZM16 12C16 11.4 15.6 11 15 11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H15C15.6 13 16 12.6 16 12Z" fill="currentColor"></path>
																				</svg>
																			</span>
																		</div>
																	</div>
																	<div class="timeline-content mb-10 mt-n1">
																		<div class="pe-3 mb-5">
																			<div class="fs-5 fw-semibold mb-2"><a href="#" class="text-success fw-bold me-1">{{pa.module_name}}</a> the equipment with the {{pa.module_name}} number <a href="#" class="text-primary fw-bold me-1">{{ pa.action_data }}</a></div>
																			<div class="d-flex align-items-center mt-1 fs-6">
																				<div class="text-muted me-2 fs-7">{{ pa.formatted_created_at }}</div>
																				<div class="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" aria-label="Nina Nilson" data-bs-original-title="Nina Nilson" data-kt-initialized="1">
																					<img src="./assets/images/profiles/{{ profileOverview.profile_picture.img_name }}" alt="img">
																				</div>
																			</div>
																		</div>
																		<div class="overflow-auto pb-5">
																			<div ng-repeat="pat in pa.activities" class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
																				<a href="../../demo38/dist/apps/projects/project.html" class="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px">{{ pat.machinery_equipment.machinery_equipment_data.name }}</a>
																				<div class="min-w-175px pe-2">
																					<span class="badge badge-light-success">{{ pat.machinery_equipment.property_number }}</span>
																				</div>
																				<div class="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
																					
																				</div>
																				<div class="min-w-125px pe-2">
																					<span class="badge badge-light-primary">{{ pat.machinery_equipment.remarks }}</span>
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
		<script src="assets/js/signin-methods.js"></script>

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
		<script src="modules/my-profile.js?ver=1.0.0.0"></script>
		<script src="controllers/my-profile.js?ver=1.0.0.0"></script>
	</body>
</html>