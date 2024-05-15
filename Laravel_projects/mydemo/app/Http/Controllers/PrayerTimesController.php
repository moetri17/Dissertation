<?php

namespace App\Http\Controllers;

use App\Models\PrayerTime;
use Illuminate\Http\Request;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Log; // Make sure to include the Log facade

class PrayerTimesController extends Controller
{
    public function fetchPrayerTimesForToday($formattedDate) {
        $todayPrayerTimes = PrayerTime::where('Date', $formattedDate)->first([
            'Fajr', 'FajrIqamah', 'Sunrise', 'Dhuhr', 'DhuhrIqamah',
            'Asr', 'AsrIqamah', 'Maghrib', 'maghribIqamah', 'Isha', 'IshaIqamah',
            'Tomorrow_Fajr', 'Tomorrow_FajrIqamah'
        ]);

        if (!$todayPrayerTimes) {
            Log::error("No prayer times found for date: " . $formattedDate);
            return null;
        }

        Log::info("Prayer times retrieved: " . json_encode($todayPrayerTimes));
        return $todayPrayerTimes->toArray();
    }
    
    public function index() {
        $currentDateTime = new DateTime('now', new DateTimeZone('Europe/London'));
        $formattedDate = $currentDateTime->format('d/m/Y');
        Log::info("Fetching prayer times for date: " . $formattedDate);

        $prayerTimesToday = $this->fetchPrayerTimesForToday($formattedDate);
    
        if ($prayerTimesToday) {
            $formattedPrayerTimes = [];
            foreach ($prayerTimesToday as $prayerName => $prayerTime) {
                if (strpos($prayerName, 'Iqamah') === false && strpos($prayerName, 'Tomorrow_Fajr') === false) {
                    $formattedPrayerTimes[] = [
                        'Name' => $prayerName,
                        'Time' => $prayerTime,
                        'IqamahTime' => $prayerTimesToday[$prayerName . 'Iqamah'] ?? 'N/A',
                    ];
                }
            }

            Log::info("Formatted prayer times: " . json_encode($formattedPrayerTimes));
            return response()->json($formattedPrayerTimes);
        } else {
            Log::warning("No prayer times for today after fetching.");
            return response()->json(['message' => 'No prayer times for today.']);
        }
    }

    public function nextPrayerTime() {
        $currentDateTime = new DateTime('now', new DateTimeZone('Europe/London'));
        $formattedDate = $currentDateTime->format('d/m/Y');
        $currentTime = $currentDateTime->format('H:i');
        Log::info("Determining next prayer time for now: " . $currentTime);
    
        $prayerTimesToday = $this->fetchPrayerTimesForToday($formattedDate);
    
        if (!$prayerTimesToday) {
            return response()->json(['message' => 'No prayer times found for today.'], 404);
        }
    
        $prayerOrder = [
            'Fajr' => 'FajrIqamah',
            'Dhuhr' => 'DhuhrIqamah',
            'Asr' => 'AsrIqamah',
            'Maghrib' => 'MaghribIqamah',
            'Isha' => 'IshaIqamah',
        ];
    
        foreach ($prayerOrder as $prayer => $iqamah) {
            if (isset($prayerTimesToday[$prayer]) && $currentTime < $prayerTimesToday[$prayer]) {
                return response()->json([
                    'NextPrayer' => $prayer,
                    'Time' => $prayerTimesToday[$prayer]
                ]);
            } elseif (isset($prayerTimesToday[$iqamah]) && $currentTime < $prayerTimesToday[$iqamah]) {
                return response()->json([
                    'NextPrayer' => $prayer . ' Iqamah',
                    'Time' => $prayerTimesToday[$iqamah]
                ]);
            }
        }
    
        // Check for Tomorrow_Fajr if all prayers for today have concluded
        if (isset($prayerTimesToday['Tomorrow_Fajr'])) {
            return response()->json([
                'NextPrayer' => 'Tomorrow_Fajr',
                'Time' => $prayerTimesToday['Tomorrow_Fajr']
            ]);
        }
    
        Log::info("All prayers for today have concluded or none fit the current time.");
        return response()->json(['message' => 'All prayers for today have concluded.'], 200);
    }
    
}
