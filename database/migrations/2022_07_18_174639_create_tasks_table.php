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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                    ->constrianed()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            $table->foreignId('project_id')
                    ->constrianed()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            $table->string('name', 200);
            $table->longText('description')->nullable();
            $table->longText('instruction')->nullable();
            $table->bigInteger('submitted_by')->nullable();
            $table->tinyInt('status')->default(0);
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
        Schema::dropIfExists('tasks');
    }
};
