<?php

namespace App\Console\Commands\Translation;

use App\Models\Translation;
use Illuminate\Console\Command;

class Upsert extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'trans:upsert {en_word} {ch_word}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert Keywords To DB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Translation::updateOrCreate(
            [
                'en_word'=> $this->argument('en_word')
            ],
            [
                'en_word'=> $this->argument('en_word'),
                'ch_word'=> $this->argument('ch_word'),
            ],
        );
    }
}
