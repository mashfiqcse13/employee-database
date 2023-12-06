<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {

        \DB::table('users')->delete();

        \DB::table('users')->insert(array (
            array (
                'id' => 1,
                'name' => 'Super Admin',
                'email' => 'admin@employee.db',
                'email_verified_at' => date('Y-m-d H:i:s'),
                'password' => Hash::make('12345678'),
                'remember_token' => NULL,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            )
        ));


    }
}
