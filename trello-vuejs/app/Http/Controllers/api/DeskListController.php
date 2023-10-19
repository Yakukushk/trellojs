<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeskListResource;
use App\Http\Resources\DeskResource;
use App\Models\Desk;
use App\Models\DeskList;
use Illuminate\Http\Request;

class DeskListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'desk_id' => 'required|integer|exists:desks,id'
        ]);
        return DeskListResource::collection(DeskList::orderBy('created_at', 'desc')
            ->where('desk_id', $request->desk_id)
            ->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = request()->validate([
            'name' => 'required|string',
            'desk_id' => 'required|integer|exists:desks,id'
        ]);
        $desk = DeskList::create($data);
        return new DeskListResource($desk);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeskList $deskList)
    {
        $data = request()->validate([
            'name' => 'required|max:255|string'
        ]);

        $deskList->update($data);

        return new DeskListResource($deskList);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeskList $deskList)
    {
        $deskList->delete();
        return new DeskResource($deskList);
    }
}
