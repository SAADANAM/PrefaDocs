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
        Schema::create('archive_boxes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Box name like "GM135"
            $table->string('document_type'); // Document type like "bon de livraison"
            $table->enum('status', ['active', 'archived', 'pending', 'disposed'])->default('active');
            $table->foreignId('archive_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archive_boxes');
    }
};
