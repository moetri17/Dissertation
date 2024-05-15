<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Prayer Times Today</title>
</head>
<body>
    @if($prayerTimesToday)
        <p>Prayer Times:</p>
        <ul>
            @foreach($prayerTimesToday as $prayer)
                <li>{{ $prayer['Name'] }}: {{ $prayer['Time'] }} - Iqamah: {{ $prayer['IqamahTime'] }}</li>
            @endforeach
        </ul>
    @else
        <p>No prayer times for today.</p>
    @endif
</body>
</html>
