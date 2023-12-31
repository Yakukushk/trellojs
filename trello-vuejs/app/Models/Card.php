<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;
    protected $guarded = false;
    protected $fillable = ['name', 'desk_list_id'];
    public function task() {
        return $this->hasMany(Task::class);
    }
}
