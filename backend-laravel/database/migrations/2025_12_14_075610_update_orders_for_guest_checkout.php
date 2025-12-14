<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Cho phép user_id nullable (guest order)
            $table->unsignedBigInteger('user_id')->nullable()->change();

            // Thêm cột fullname
            if (!Schema::hasColumn('orders', 'fullname')) {
                $table->string('fullname')->nullable()->after('guest_user_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(false)->change();

            if (Schema::hasColumn('orders', 'fullname')) {
                $table->dropColumn('fullname');
            }
        });
    }
};
