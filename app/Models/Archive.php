<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Archive extends Model
{
    protected $fillable = [
        'title',
        'reference_code',
        'date_archived',
        'status',
        'column_id',
    ];

    protected $casts = [
        'date_archived' => 'date',
    ];

    public function column(): BelongsTo
    {
        return $this->belongsTo(Column::class);
    }

    public function archiveBoxes(): HasMany
    {
        return $this->hasMany(ArchiveBox::class);
    }
}
