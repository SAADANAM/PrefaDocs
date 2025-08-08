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
        Schema::table('documents', function (Blueprint $table) {
            $table->foreignId('shelf_id')->nullable()->after('archive_box_id')->constrained()->onDelete('set null');
            $table->foreignId('rack_id')->nullable()->after('shelf_id')->constrained()->onDelete('set null');
            $table->foreignId('column_id')->nullable()->after('rack_id')->constrained()->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['shelf_id']);
            $table->dropForeign(['rack_id']);
            $table->dropForeign(['column_id']);
            $table->dropColumn(['shelf_id', 'rack_id', 'column_id']);
        });
    }
};
