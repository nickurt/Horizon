<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    protected $table = 'timeline';
    protected $fillable = ['date', 'entry_id', 'entry_type'];
    protected $dates = ['start', 'end'];

    public function entry() {
        return $this->morphTo();
    }

    public function flight() {
        return $this->belongsTo(Flight::class, 'entry_id')->whereItemType(Flight::class);
    }
}