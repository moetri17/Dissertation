<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Next Prayer Time</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Next Prayer Time</h1>
        
        @if($nextPrayerTime)
            <div class="prayer-time">
                <p><strong>Prayer:</strong> {{ $nextPrayerTime['Name'] ?? 'N/A' }}</p>
                <p><strong>Time:</strong> {{ $nextPrayerTime['Time'] ?? 'N/A' }}</p>
                <p><strong>Iqamah Time:</strong> {{ $nextPrayerTime['IqamahTime'] ?? 'N/A' }}</p>
            </div>
        @else
            <p>No next prayer time available.</p>
        @endif
    </div>
</body>
</html>