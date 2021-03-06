<?php

use Illuminate\Database\Migrations\Migration;

class ChangeOutputColumn extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (isset($_ENV['DB_TYPE']) && $_ENV['DB_TYPE'] === 'mysql') {
            DB::statement('ALTER TABLE server_logs CHANGE output output longtext');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        if (isset($_ENV['DB_TYPE']) && $_ENV['DB_TYPE'] === 'mysql') {
            DB::statement('ALTER TABLE server_logs CHANGE output output text');
        }
    }
}
