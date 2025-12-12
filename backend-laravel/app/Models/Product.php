<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id', 'brand_id', 'name', 'description', 'price', 'gender', 'quantity', 'views'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_colors');
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes');
    }

    public function gallery()
    {
        return $this->hasMany(ProductGallery::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    protected $appends = ['rating'];

    public function getRatingAttribute()
    {
        return round($this->ratings()->avg('rating') ?? 0, 1);
    }

}