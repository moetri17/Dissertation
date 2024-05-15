<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\AzkarController;
use App\Models\Azkar;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AzkarControllerTest extends TestCase
{
    /**
     * Test retrieving the list of morning Azkar.
     *
     * @return void
     */
    public function testMorningAzkar()
    {
        // Create sample data in the database
        Azkar::create([
            'Azkar_id' => 1,
            'Text' => 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ...',
            'Category' => 'morning',
            'Translation' => 'I seek the protection of Allah from the accursed Shayṭān...',
            'Repitition' => 1,
            'Name' => 'Ayat al-Kursi: The Greatest Protection'
        ]);
        Azkar::create([
            'Azkar_id' => 2,
            'Text' => 'Second text...',
            'Category' => 'morning',
            'Translation' => 'Second translation...',
            'Repitition' => 2,
            'Name' => 'Second name'
        ]);

        // Mock the expected morning Azkar data
        $expectedAzkar = [
            [
                'Azkar_id' => 1,
                'Text' => 'أَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ...',
                'Category' => 'morning',
                'Translation' => 'I seek the protection of Allah from the accursed Shayṭān...',
                'Repitition' => 1,
                'Name' => 'Ayat al-Kursi: The Greatest Protection'
            ],
            [
                'Azkar_id' => 2,
                'Text' => 'Second text...',
                'Category' => 'morning',
                'Translation' => 'Second translation...',
                'Repitition' => 2,
                'Name' => 'Second name'
            ]
        ];

        // Create an instance of the controller
        $controller = new AzkarController();

        // Create a request instance with necessary parameters
        $request = Request::create('/azkar/morning', 'GET');

        // Call the method to test
        $response = $controller->morningAzkar($request);

        // Convert the actual result to an array
        $actualAzkar = $response->original->toArray();

        // Assert that the method returns the expected result
        $this->assertEquals($expectedAzkar, array_slice($actualAzkar, 0, count($expectedAzkar)));
    }
}
