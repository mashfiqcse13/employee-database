<?php

namespace App\Console\Commands\Translation;

use App\Models\Translation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class FileToDb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trans:ftd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translation File To Database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $keywords = explode("\n",File::get('storage/app/en-keywords.text'));
        $translation = explode("\n",File::get('storage/app/ch-keywords.text'));
        foreach($keywords as $index=>$keyword){
            if(!empty($keywords)){
                Translation::updateOrCreate(
                    [
                        'en_word' => $keyword
                    ],
                    [
                        'en_word' => $keyword,
                        'ch_word' => $translation[$index]
                    ],
                );
            }
        }
    }
}
