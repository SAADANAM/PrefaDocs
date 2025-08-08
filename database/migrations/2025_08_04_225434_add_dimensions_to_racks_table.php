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
        Schema::table('racks', function (Blueprint $table) {
            $table->decimal('length', 8, 2)->nullable()->after('shelf_id');
            $table->decimal('width', 8, 2)->nullable()->after('length');
            $table->integer('number_of_shelves')->default(1)->after('width');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('racks', function (Blueprint $table) {
            $table->dropColumn(['length', 'width', 'number_of_shelves']);
        });
    }
};
