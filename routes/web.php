<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShelfController;
use App\Http\Controllers\RackController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\ArchiveBoxController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\BoxTypeController;
use App\Http\Controllers\MultiStepController;
use App\Http\Controllers\RoomManagementController;
use App\Http\Controllers\StorageAvailabilityController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Landing');
    })->name('home');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Archive Management Routes - All users can access
    Route::resource('archives', ArchiveController::class);
    Route::resource('archive-boxes', ArchiveBoxController::class);
    Route::resource('documents', DocumentController::class);
    Route::get('/documents/archive-with-location', [DocumentController::class, 'archiveWithLocation'])->name('documents.archive-with-location');
    
    // Storage Management Routes - Admin only
    Route::middleware('admin')->group(function () {
        Route::resource('shelves', ShelfController::class);
        Route::get('/shelves-location-selection', [ShelfController::class, 'getForLocationSelection'])->name('shelves.location-selection');
        Route::resource('racks', RackController::class);
        Route::resource('columns', ColumnController::class);
        
        // Admin Management Routes
        Route::get('/admin-management', [AdminController::class, 'index'])->name('admin.index');
        Route::post('/admin-management', [AdminController::class, 'store'])->name('admin.store');
        Route::put('/admin-management/{id}', [AdminController::class, 'update'])->name('admin.update');
        Route::post('/admin-management/{id}/reset-password', [AdminController::class, 'resetPassword'])->name('admin.reset-password');
        
        // Settings Routes
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings/boxes', [SettingsController::class, 'storeBox'])->name('settings.store-box');
        Route::put('/settings/boxes/{id}', [SettingsController::class, 'updateBox'])->name('settings.update-box');
        Route::delete('/settings/boxes/{id}', [SettingsController::class, 'deleteBox'])->name('settings.delete-box');
        Route::post('/settings/directions', [SettingsController::class, 'storeDirection'])->name('settings.store-direction');
        Route::put('/settings/directions/{id}', [SettingsController::class, 'updateDirection'])->name('settings.update-direction');
        Route::delete('/settings/directions/{id}', [SettingsController::class, 'deleteDirection'])->name('settings.delete-direction');
        Route::post('/settings/rooms', [SettingsController::class, 'storeRoom'])->name('settings.store-room');
        Route::put('/settings/rooms/{id}', [SettingsController::class, 'updateRoom'])->name('settings.update-room');
        Route::delete('/settings/rooms/{id}', [SettingsController::class, 'deleteRoom'])->name('settings.delete-room');
        
        // Box Types Routes
        Route::get('/box-types', [BoxTypeController::class, 'index'])->name('box-types.index');
        Route::post('/box-types', [BoxTypeController::class, 'store'])->name('box-types.store');
        Route::put('/box-types/{id}', [BoxTypeController::class, 'update'])->name('box-types.update');
        Route::delete('/box-types/{id}', [BoxTypeController::class, 'destroy'])->name('box-types.destroy');
        
        // Multi-Step Form Routes
        Route::get('/multi-step/step1', [MultiStepController::class, 'step1'])->name('multi-step.step1');
        Route::post('/multi-step/direction', [MultiStepController::class, 'storeDirection'])->name('multi-step.store-direction');
        Route::get('/multi-step/step2', [MultiStepController::class, 'step2'])->name('multi-step.step2');
        Route::post('/multi-step/service', [MultiStepController::class, 'storeService'])->name('multi-step.store-service');
        Route::get('/multi-step/step3', [MultiStepController::class, 'step3'])->name('multi-step.step3');
        Route::post('/multi-step/site', [MultiStepController::class, 'storeSite'])->name('multi-step.store-site');
        Route::get('/multi-step/step4', [MultiStepController::class, 'step4'])->name('multi-step.step4');
        Route::post('/multi-step/company', [MultiStepController::class, 'storeCompany'])->name('multi-step.store-company');
        
        // Room Management Routes
        Route::get('/room-management', [RoomManagementController::class, 'index'])->name('room-management.index');
        Route::get('/room-management/create', [RoomManagementController::class, 'create'])->name('room-management.create');
        Route::post('/room-management', [RoomManagementController::class, 'store'])->name('room-management.store');
        Route::get('/room-management/{room}/rack-config', [RoomManagementController::class, 'rackConfig'])->name('room-management.rack-config');
        Route::post('/room-management/{room}/rack-config', [RoomManagementController::class, 'storeRackConfig'])->name('room-management.store-rack-config');
        Route::get('/room-management/{room}/shelf-config', [RoomManagementController::class, 'shelfConfig'])->name('room-management.shelf-config');
        Route::post('/room-management/{room}/shelf-config', [RoomManagementController::class, 'storeShelfConfig'])->name('room-management.store-shelf-config');
        
        // Storage Availability Routes
        Route::get('/storage-availability', [StorageAvailabilityController::class, 'index'])->name('storage-availability.index');
        Route::put('/storage-availability/{shelf}', [StorageAvailabilityController::class, 'updateCapacity'])->name('storage-availability.update-capacity');
    });
});

require __DIR__.'/auth.php';
