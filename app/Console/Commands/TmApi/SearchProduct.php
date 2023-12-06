<?php

namespace App\Console\Commands\TmApi;

use App\Helpers\TMApiHelper;
use App\Models\TmApiItem;
use App\Models\TmApiItemKeyword;
use App\Models\TmApiSearchResponse;
use App\Models\Translation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SearchProduct extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tm-api:search';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Search By Keyword';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $logFIleName = storage_path('app/console-log.txt');
        $savedResponses = TmApiSearchResponse::whereNull('response')->whereCalled(0)->select('id')->get();
        // File::append($logFIleName, "Target Count : " . sizeof($savedResponses) . "\n");
        $total = 0;
        foreach ($savedResponses as  $temp) {
            $start = time();
            $savedResponse = TmApiSearchResponse::find($temp->id);
            $response = TMApiHelper::searchByKeyword($savedResponse->translation->ch_word, 1);
            if ($response && sizeof($response->data->items) > 0) {
                $savedResponse->page =  $response->data->page;
                $savedResponse->page_size =  $response->data->page_size;
                $savedResponse->total_count =  $response->data->total_count;
                $savedResponse->product_found =  sizeof($response->data->items);
                $savedResponse->response =  json_encode($response);
                foreach ($response->data->items as $item) {
                    TmApiItem::updateOrCreate(
                        ['item_id' => $item->item_id],
                        [
                            'item_id' => $item->item_id,
                            'short_intro' => json_encode($item)
                        ]
                    );
                    $dataToUpsert = [
                        'item_id' => $item->item_id,
                        'trans_id' => $savedResponse->trans_id,
                    ];
                    TmApiItemKeyword::create($dataToUpsert, $dataToUpsert);
                }
            }
            $savedResponse->called =  1;
            $savedResponse->indexed =  1;
            $savedResponse->save();
            $end = time();
            $taken = $end - $start;
            $total += $taken;
            File::append($logFIleName, date('Y-m-d H:s:i') . "\t" . $savedResponse->id . "\t" . $taken . "\n");
        }
        $remaining = TmApiSearchResponse::whereNull('response')->whereCalled(0)->count();
        File::append($logFIleName, "Total Time Taken : " . $total . " sec. Remaining : \t$remaining\n");
        // File::put("storage/app/api-response.json",json_encode($Translations));
        // File::put("storage/app/api-response.json",json_encode(TMApiHelper::searchByKeyword('配件')));
    }
}
