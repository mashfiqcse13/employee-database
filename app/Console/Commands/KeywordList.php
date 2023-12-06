<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class KeywordList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'keyword:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make Keyword List Form JSON File';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $categories = json_decode(File::get(public_path('cat-subcats.json')));
        $keywords = [];
        foreach ($categories as $category) {
            if (!in_array($category->title, $keywords)) {
                array_push($keywords, $category->title);
            }
            foreach ($category->subCategories as $subCategory) {
                if (!in_array($subCategory, $keywords)) {
                    array_push($keywords, $subCategory);
                }
            }
        }
        File::put('storage/app/en-keywords.text', implode("\n",$keywords));
    }
}
