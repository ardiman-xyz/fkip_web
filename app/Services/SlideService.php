<?php

namespace App\Services;

use App\Models\DefaultSlider;
use Illuminate\Support\Facades\DB;

class SlideService
{
    public function getAllSlides()
    {
        return DefaultSlider::with('media')
            ->orderBy('order')
            ->get()
            ->map(function ($slide) {
                return [
                    'id' => $slide->id,
                    'media' => $slide->media,
                    'url' => $slide->url,
                    'order' => $slide->order,
                    'is_active' => $slide->is_active
                ];
            });
    }

    public function create(array $data): DefaultSlider
    {
        $maxOrder = DefaultSlider::max('order') ?? -1;

        return DefaultSlider::create([
            'media_id' => $data['media_id'],
            'url' => $data['url'] ?? null,
            'order' =>  ($maxOrder + 1)
        ]);
    }

    public function update(DefaultSlider $slide, array $data): DefaultSlider
    {
        $slide->update($data);
        return $slide->fresh(['media']);
    }

    public function delete(DefaultSlider $slide): void
    {
        DB::transaction(function () use ($slide) {
            $deletedOrder = $slide->order;

            $slide->delete();

            DefaultSlider::where('order', '>', $deletedOrder)
                ->update(['order' => DB::raw('`order` - 1')]);
        });
    }

    public function moveUp(DefaultSlider $slide): void
    {
        if ($slide->order <= 0) return;

        DB::transaction(function () use ($slide) {
            $upperSlide = DefaultSlider::where('order', $slide->order - 1)->first();
            if ($upperSlide) {
                $upperSlide->update(['order' => $slide->order]);
                $slide->update(['order' => $slide->order - 1]);
            }
        });
    }

    public function moveDown(DefaultSlider $slide): void
    {
        DB::transaction(function () use ($slide) {
            $lowerSlide = DefaultSlider::where('order', $slide->order + 1)->first();
            if ($lowerSlide) {
                $lowerSlide->update(['order' => $slide->order]);
                $slide->update(['order' => $slide->order + 1]);
            }
        });
    }
}
