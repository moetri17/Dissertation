<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quran extends Model
{
    use HasFactory;

    protected $table = 'quran';

    public $timestamps = false;

    protected $fillable = ['surah_number', 'surah_name', 'ayah_number', 'surah_text', 'juz_number', 'juz_name', 'page'];
}
