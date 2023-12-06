<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('f_name');
            $table->string('l_name');
            $table->date('dob');
            $table->string('phone');
            $table->enum('gender',array("Male", "Female", "Other"));
            $table->string('skill_name')->nullable();
            $table->integer('experience_in_years')->nullable();
            $table->enum('skill_level',array("Beginner", "Intermediate", "Advanced"));
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
        Schema::drop('employees');
    }
}
