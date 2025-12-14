<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('guest_users', function (Blueprint $table) {
            $table->string('guest_token')->unique()->after('id'); // thêm cột guest_token
        });
    }

    public function down()
    {
        Schema::table('guest_users', function (Blueprint $table) {
            $table->dropColumn('guest_token');
        });
    }

};
