<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Azkar extends Model
{
    protected $table = 'azkar';
    protected $fillable = [
        'Azkar_id', 'Text', 'Category', 'Translation', 'Repitition', 'Name'
    ];
    public $timestamps = false;  // Disable the Eloquent timestamps
    use HasFactory;
}
