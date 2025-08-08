<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shelf extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location_description',
        'room_id',
        'room_name',
        'shelf_dimensions',
        'depth',
        'total_capacity',
        'used_space',
    ];

    public function racks()
    {
        return $this->hasMany(Rack::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Calculate free space available
     */
    public function getFreeSpaceAttribute()
    {
        return max(0, $this->total_capacity - $this->used_space);
    }

    /**
     * Calculate availability percentage
     */
    public function getAvailabilityPercentageAttribute()
    {
        if ($this->total_capacity <= 0) {
            return 0;
        }
        return round((($this->total_capacity - $this->used_space) / $this->total_capacity) * 100, 2);
    }

    /**
     * Check if shelf has available space
     */
    public function hasAvailableSpace()
    {
        return $this->free_space > 0;
    }

    /**
     * Get availability status
     */
    public function getAvailabilityStatusAttribute()
    {
        $percentage = $this->availability_percentage;
        
        if ($percentage >= 80) {
            return 'Excellent';
        } elseif ($percentage >= 60) {
            return 'Good';
        } elseif ($percentage >= 40) {
            return 'Moderate';
        } elseif ($percentage >= 20) {
            return 'Limited';
        } else {
            return 'Full';
        }
    }
}
