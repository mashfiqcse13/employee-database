<?php

namespace App\Console\Commands\TmApi;

use App\Models\TmApiItem;
use App\Models\TmApiItemKeyword;
use App\Models\TmApiSearchResponse;
use Illuminate\Console\Command;

class ItemInex extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tm-api:item-index';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Index Items From Search Table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $rows = TmApiSearchResponse::whereNotNull('response')->whereIndexed(0)->where('product_found','>',0)->select('id')->get();
        foreach($rows as $row){
            $savedResponse = TmApiSearchResponse::find($row->id);
            $response = json_decode($savedResponse->response);
            if ($response && sizeof($response->data->items) > 0) {
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
            $savedResponse->indexed =  1;
            $savedResponse->save();
        }
    }
}
