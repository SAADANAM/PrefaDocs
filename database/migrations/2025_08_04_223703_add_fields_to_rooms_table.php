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
        Schema::table('rooms', function (Blueprint $table) {
            $table->string('location')->nullable()->after('floor');
            $table->foreignId('site_id')->nullable()->after('location')->constrained()->onDelete('set null');
            $table->integer('number_of_racks')->default(0)->after('site_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropForeign(['site_id']);
            $table->dropColumn(['location', 'site_id', 'number_of_racks']);
        });
    }
};
