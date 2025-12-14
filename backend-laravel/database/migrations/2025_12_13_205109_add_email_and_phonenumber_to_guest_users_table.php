<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('guest_users', function (Blueprint $table) {
            if (!Schema::hasColumn('guest_users', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('guest_users', 'phonenumber')) {
                $table->string('phonenumber')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('guest_users', function (Blueprint $table) {
            if (Schema::hasColumn('guest_users', 'email')) {
                $table->dropColumn('email');
            }
            if (Schema::hasColumn('guest_users', 'phonenumber')) {
                $table->dropColumn('phonenumber');
            }
        });
    }
};
