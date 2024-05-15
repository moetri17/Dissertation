<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\QuranController;
use App\Models\Quran;
use Illuminate\Support\Collection;

class QuranControllerTest extends TestCase
{
    /**
     * Test retrieving the list of Juz.
     *
     * @return void
     */
    public function testListJuz()
    {
        // Mock the expected Juz data
        $expectedJuz = [
            [
                'juz_number' => 1,
                'juz_name' => '(الحمد لله)',
            ],
            [
                'juz_number' => 2,
                'juz_name' => '(سيقول السفهاء)',
            ],
            // Add more expected Juz as needed
        ];

        // Create an instance of the controller
        $controller = new QuranController();

        // Call the method to test
        $result = $controller->listJuz();

        // Convert the actual result to an array
        $actualJuz = $result->original->toArray();

        // Assert that the method returns the expected result
        $this->assertEquals($expectedJuz, array_slice($actualJuz, 0, count($expectedJuz)));
    }
}
