<?php

namespace App\Console\Commands\Translation;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\Translation;

class JsonToDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trans:jtd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Translation From JSON To DB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $translations = json_decode(File::get('data/translations-encoded.json'));
        foreach ($translations as &$translation) {
            Translation::updateOrCreate(
                [
                    'en_word' => $translation->en_word
                ],
                [
                    'en_word' => $translation->en_word,
                    'ch_word' => $translation->ch_word,
                ],
            );
        }
    }
}
