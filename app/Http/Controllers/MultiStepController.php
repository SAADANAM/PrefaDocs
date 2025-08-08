<?php

namespace App\Http\Controllers;

use App\Models\Direction;
use App\Models\Service;
use App\Models\Site;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MultiStepController extends Controller
{
    /**
     * Display the first step (Direction selection/creation)
     */
    public function step1()
    {
        $directions = Direction::all();
        
        return Inertia::render('MultiStep/Step1', [
            'directions' => $directions,
        ]);
    }

    /**
     * Store direction and proceed to step 2
     */
    public function storeDirection(Request $request)
    {
        $validated = $request->validate([
            'direction_id' => 'nullable|exists:directions,id',
            'new_direction_name' => 'nullable|string|max:255',
            'new_direction_description' => 'nullable|string',
        ]);

        // If creating new direction
        if (!empty($validated['new_direction_name'])) {
            $direction = Direction::create([
                'name' => $validated['new_direction_name'],
                'description' => $validated['new_direction_description'] ?? '',
            ]);
            $directionId = $direction->id;
        } else {
            $directionId = $validated['direction_id'];
        }

        // Store in session for next steps
        session(['multi_step.direction_id' => $directionId]);

        return redirect()->route('multi-step.step2');
    }

    /**
     * Display the second step (Service selection/creation)
     */
    public function step2()
    {
        $services = Service::all();
        
        return Inertia::render('MultiStep/Step2', [
            'services' => $services,
        ]);
    }

    /**
     * Store service and proceed to step 3
     */
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'nullable|exists:services,id',
            'new_service_name' => 'nullable|string|max:255',
            'new_service_description' => 'nullable|string',
        ]);

        // If creating new service
        if (!empty($validated['new_service_name'])) {
            $service = Service::create([
                'name' => $validated['new_service_name'],
                'description' => $validated['new_service_description'] ?? '',
            ]);
            $serviceId = $service->id;
        } else {
            $serviceId = $validated['service_id'];
        }

        // Store in session for next steps
        session(['multi_step.service_id' => $serviceId]);

        return redirect()->route('multi-step.step3');
    }

    /**
     * Display the third step (Site selection/creation)
     */
    public function step3()
    {
        $sites = Site::all();
        
        return Inertia::render('MultiStep/Step3', [
            'sites' => $sites,
        ]);
    }

    /**
     * Store site and proceed to step 4
     */
    public function storeSite(Request $request)
    {
        $validated = $request->validate([
            'site_id' => 'nullable|exists:sites,id',
            'new_site_code' => 'nullable|string|max:255|unique:sites,code',
            'new_site_label' => 'nullable|string|max:255',
        ]);

        // If creating new site
        if (!empty($validated['new_site_code']) && !empty($validated['new_site_label'])) {
            $site = Site::create([
                'code' => $validated['new_site_code'],
                'label' => $validated['new_site_label'],
            ]);
            $siteId = $site->id;
        } else {
            $siteId = $validated['site_id'];
        }

        // Store in session for next steps
        session(['multi_step.site_id' => $siteId]);

        return redirect()->route('multi-step.step4');
    }

    /**
     * Display the fourth step (Company name entry)
     */
    public function step4()
    {
        return Inertia::render('MultiStep/Step4');
    }

    /**
     * Store company and finish the process
     */
    public function storeCompany(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
        ]);

        // Create company
        $company = Company::create([
            'name' => $validated['company_name'],
        ]);

        // Get all stored data from session
        $directionId = session('multi_step.direction_id');
        $serviceId = session('multi_step.service_id');
        $siteId = session('multi_step.site_id');

        // Clear session data
        session()->forget(['multi_step.direction_id', 'multi_step.service_id', 'multi_step.site_id']);

        // You can store the relationship or redirect to a summary page
        return redirect()->route('dashboard')->with('success', 'Multi-step process completed successfully!');
    }
}
