<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('guest_users', function (Blueprint $table) {
            $table->dropColumn(['email', 'phonenumber']);
        });
    }

    public function down(): void
    {
        Schema::table('guest_users', function (Blueprint $table) {
            $table->string('email')->nullable();
            $table->string('phonenumber')->nullable();
        });
    }
};
