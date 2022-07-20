<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                    ->constrianed()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            $table->foreignId('workspace_id')
                    ->constrianed()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            $table->string('name', 200);
            $table->longText('description')->nullable();
            $table->json('peoples')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
