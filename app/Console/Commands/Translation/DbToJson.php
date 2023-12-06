<?php

namespace App\Console\Commands\Translation;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\Translation;

class DbToJson extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trans:dtj';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translation From DB To JSON';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        File::put('data/translations-encoded.json',json_encode(Translation::all()));
    }
}
