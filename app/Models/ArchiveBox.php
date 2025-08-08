<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArchiveBox extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'document_type',
        'status',
        'archive_id',
    ];

    /**
     * Get the archive that owns the box.
     */
    public function archive(): BelongsTo
    {
        return $this->belongsTo(Archive::class);
    }

    /**
     * Get the status color for display.
     */
    public function getStatusColor(): string
    {
        return match($this->status) {
            'active' => 'bg-green-100 text-green-800',
            'archived' => 'bg-blue-100 text-blue-800',
            'pending' => 'bg-yellow-100 text-yellow-800',
            'disposed' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
