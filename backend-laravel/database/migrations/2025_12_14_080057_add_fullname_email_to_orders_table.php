<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // user_id nullable (guest checkout)
            $table->unsignedBigInteger('user_id')->nullable()->change();

            // Thêm cột fullname và email
            if (!Schema::hasColumn('orders', 'fullname')) {
                $table->string('fullname')->nullable()->after('guest_user_id');
            }

            if (!Schema::hasColumn('orders', 'email')) {
                $table->string('email')->nullable()->after('fullname');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // rollback: drop fullname và email
            if (Schema::hasColumn('orders', 'fullname')) {
                $table->dropColumn('fullname');
            }
            if (Schema::hasColumn('orders', 'email')) {
                $table->dropColumn('email');
            }

            // user_id không nullable
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
        });
    }
};
