<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Azkar;
use Illuminate\Http\Request;

class AzkarController extends Controller
{
    public function morningAzkar(Request $request)
    {
        // Check if an 'Azkar_id' query parameter was provided
        $azkarId = $request->query('Azkar_id');
    
        // Start the query
        $query = Azkar::select('Azkar_id', 'Text', 'Category', 'Translation', 'Repitition', 'Name')
        ->where('Category', 'morning');    
        // If a specific Azkar_id is requested, filter the query
        if ($azkarId !== null) {
            $query->where('Azkar_id', $azkarId);
        }
    
        $azkar = $query->get();
    
        // Return the collection as a JSON response
        return response()->json($azkar);
    }

    public function eveningAzkar(Request $request)
    {
        
        $azkarId = $request->query('Azkar_id');
    
        
        $query = Azkar::select('Azkar_id', 'Text', 'Category', 'Translation', 'Repitition', 'Name')
        ->where('Category', 'evening');    

        if ($azkarId !== null) {
            $query->where('Azkar_id', $azkarId);
        }
    
        $azkar = $query->get();
    
        return response()->json($azkar);
    }

    public function nightAzkar(Request $request)
    {
        $azkarId = $request->query('Azkar_id');
    
        $query = Azkar::select('Azkar_id', 'Text', 'Category', 'Translation', 'Repitition', 'Name')
        ->where('Category', 'night');    

        if ($azkarId !== null) {
            $query->where('Azkar_id', $azkarId);
        }
    
        $azkar = $query->get();
    
        return response()->json($azkar);
    }
    
}
