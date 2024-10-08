<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("users")->insert([
            "role_id" => 1,
            "name" => "Admin",
            "email" => "admin@gmail.com",
            "password" => bcrypt("pass@admin"),
        ]);

        DB::table("users")->insert([
            "role_id" => 2,
            "name" => "Customer",
            "email" => "customer@gmail.com",
            "password" => bcrypt("pass@customer"),
        ]);

        DB::table("users")->insert([
            "role_id" => 3,
            "name" => "Manager",
            "email" => "manager@gmail.com",
            "password" => bcrypt("pass@manager"),
        ]);
    }
}