<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rack extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'shelf_id',
        'length',
        'width',
        'number_of_shelves',
    ];

    public function shelf()
    {
        return $this->belongsTo(Shelf::class);
    }

    public function columns()
    {
        return $this->hasMany(Column::class);
    }
}
