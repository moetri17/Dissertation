<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\PrayerTimesController;
use App\Models\PrayerTime;
use DateTime;
use DateTimeZone;

class PrayerTimesTest extends TestCase
{
    /**
     * Test fetching prayer times for today.
     *
     * @return void
     */
    public function testFetchPrayerTimesForToday()
    {
        // Mock the expected data
        $expectedData = [
            'Fajr' => '03:14:00',
            'FajrIqamah' => '03:19:00',
            'Dhuhr' => '13:03:00',
            'Sunrise' => '05:09:00',
            'DhuhrIqamah' => '13:08:00',
            'Asr' => '17:17:00',
            'AsrIqamah' => '17:22:00',
            'Maghrib' => '20:59:00',
            'MaghribIqamah' => '21:04:00',
            'Isha' => '22:53:00',
            'IshaIqamah' => '22:58:00',
        ];
    
        // Create an instance of the controller
        $controller = new PrayerTimesController();
    
        // Call the method to test
        $result = $controller->fetchPrayerTimesForToday(date('d/m/Y'));
    
        // Assert that the method returns the expected result
        $this->assertEquals($expectedData, $result);
    }    



}