<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'capacity',
        'floor',
        'location',
        'site_id',
        'number_of_racks',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function shelves()
    {
        return $this->hasMany(Shelf::class);
    }

    public function racks()
    {
        return $this->hasManyThrough(Rack::class, Shelf::class);
    }

    public function columns()
    {
        return $this->hasManyThrough(Column::class, Shelf::class, 'room_id', 'rack_id');
    }
}
