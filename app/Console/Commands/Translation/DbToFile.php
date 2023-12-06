<?php

namespace App\Console\Commands\Translation;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\Translation;

class DbToFile extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trans:dtf';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translation From DB To File';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $translations = Translation::all();
        $path = 'storage/app/';
        $fileSuffix = '-keywords.txt';
        File::put($path."en".$fileSuffix,"");
        File::put($path."ch".$fileSuffix,"");
        foreach($translations as $translation){
            File::append($path."en".$fileSuffix,$translation->en_word."\n");
            File::append($path."ch".$fileSuffix,$translation->ch_word."\n");
        }
    }
}
