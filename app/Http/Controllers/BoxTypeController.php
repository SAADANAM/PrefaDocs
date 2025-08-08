<?php

namespace App\Http\Controllers;

use App\Models\BoxType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoxTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boxTypes = BoxType::all();
        
        return Inertia::render('BoxTypes/Index', [
            'boxTypes' => $boxTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'length' => 'required|numeric|min:0.01',
            'width' => 'required|numeric|min:0.01',
        ]);

        BoxType::create($validated);

        return redirect()->back()->with('success', 'Box type created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $boxType = BoxType::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'length' => 'required|numeric|min:0.01',
            'width' => 'required|numeric|min:0.01',
        ]);

        $boxType->update($validated);

        return redirect()->back()->with('success', 'Box type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $boxType = BoxType::findOrFail($id);
        $boxType->delete();

        return redirect()->back()->with('success', 'Box type deleted successfully.');
    }
}
