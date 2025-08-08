<?php

namespace App\Http\Controllers;

use App\Models\Shelf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $shelves = Shelf::with(['racks.columns.archives'])
            ->get();

        return Inertia::render('Dashboard', [
            'shelves' => $shelves,
            'user' => auth()->user(),
        ]);
    }
}
