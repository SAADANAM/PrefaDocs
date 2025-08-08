<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shelves', function (Blueprint $table) {
            $table->string('room_id')->nullable()->after('location_description');
            $table->string('room_name')->nullable()->after('room_id');
            $table->string('shelf_dimensions')->nullable()->after('room_name');
            $table->decimal('depth', 8, 2)->nullable()->after('shelf_dimensions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shelves', function (Blueprint $table) {
            $table->dropColumn(['room_id', 'room_name', 'shelf_dimensions', 'depth']);
        });
    }
};
