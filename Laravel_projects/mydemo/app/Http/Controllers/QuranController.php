<?php

namespace App\Http\Controllers;

use App\Models\Quran;
use Illuminate\Http\Request;
use App\Models\pageQuran;


class QuranController extends Controller
{
    public function listSurahs()
    {
        $surahs = Quran::distinct()->get(['surah_number', 'surah_name']);
        return response()->json($surahs);
    }

    public function listPages()
    {
        $pages = Quran::select('page', 'surah_name', 'juz_number')
            ->groupBy('page')->get();

        return response()->json($pages);
    }

    public function listJuz()
    {
        $juz = Quran::select('juz_number', 'juz_name')
                    ->groupBy('juz_number')
                    ->get();

        return response()->json($juz);
    }

    public function getPage(Request $request)
    {
        $query = Quran::query();

        // Filter by surah if provided
        if ($request->has('surah_number')) {
            $query->where('surah_number', $request->surah_number);
        }

        // Filter by page if provided
        if ($request->has('page')) {
            $query->where('page', $request->page)->groupBy('page');
        }

        // Filter by juz if provided
        if ($request->has('juz_number')) {
            $query->where('juz_number', $request->juz_number);
        }

        $pageContent = $query->get();

        return response()->json($pageContent);
    }
}
