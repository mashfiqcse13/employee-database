<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeleteTempImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'del:temp-imgs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $folder_path = storage_path('app/public/temp');

        // List of name of files inside
        // specified folder
        $files = glob($folder_path . '/*');

        // Deleting all the files in the list
        foreach ($files as $file) {

            if (is_file($file))

                // Delete the given file
                unlink($file);
        }
    }
}
