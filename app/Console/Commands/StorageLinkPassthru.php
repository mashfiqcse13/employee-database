<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class StorageLinkPassthru extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:link-pt';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create the symbolic link using passthru function';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $public_folder_path = public_path("/");
        $target = '../storage/app/public';
        $link = 'storage';
        $command = "cd $public_folder_path && ln -s $target $link";
        $result = "";
        passthru($command, $result);
    }
}
