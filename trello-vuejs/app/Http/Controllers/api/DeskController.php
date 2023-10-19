<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeskResource;
use App\Models\Desk;
USE Illuminate\Http\Response;
use Illuminate\Http\Request;

class DeskController extends Controller
{
    public function index()
    {
        $data = DeskResource::collection(Desk::orderBy('created_at', 'desc')->get());

        return response()->json($data);
    }
    public function store(){
        $data = request()->validate([
            'name' => 'required|string'
        ]);
        $desk = Desk::create($data);
        return new DeskResource($desk);
    }

    public function show($id)
    {
        return new DeskResource(Desk::find($id));
    }

    public function update(Desk $desk)
    {
        $data = request()->validate([
            'name' => 'required|max:255|string'
        ]);

        $desk->update($data);

        return new DeskResource($desk);
    }
    public function destroy(Desk $desk){
        $desk->delete();
        return new DeskResource($desk);

    }
}
