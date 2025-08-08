<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'year',
        'archive_box_id',
        'shelf_id',
        'rack_id',
        'column_id',
    ];

    public function archiveBox(): BelongsTo
    {
        return $this->belongsTo(ArchiveBox::class);
    }
}
