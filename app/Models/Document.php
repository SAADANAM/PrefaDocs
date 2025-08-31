<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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
        'file_path',
        'user_id',
    ];

    public function archiveBox(): BelongsTo
    {
        return $this->belongsTo(ArchiveBox::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if document has an uploaded file
     */
    public function hasFile(): bool
    {
        return !empty($this->file_path);
    }

    /**
     * Get the file URL for download
     */
    public function getFileUrl(): ?string
    {
        if ($this->hasFile()) {
            return Storage::url($this->file_path);
        }
        return null;
    }

    /**
     * Get the file name from the path
     */
    public function getFileName(): ?string
    {
        if ($this->hasFile()) {
            return basename($this->file_path);
        }
        return null;
    }

    /**
     * Delete the associated file when document is deleted
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($document) {
            if ($document->hasFile()) {
                Storage::delete($document->file_path);
            }
        });
    }
}
