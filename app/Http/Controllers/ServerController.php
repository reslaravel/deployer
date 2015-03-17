<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Validator;
use Input;
use Response;
use Queue;
use App\Commands\TestServerConnection;

use App\Server;
use App\Project;

class ServerController extends Controller
{
    public function show($id)
    {
        return Server::findOrFail($id);
    }

    public function test($id)
    {
        $server = Server::findOrFail($id);

        $server->status = 'Testing';
        $server->save();

        Queue::push(new TestServerConnection($server));

        return Response::json(['success' => true], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $rules = array(
            'name'       => 'required',
            'user'       => 'required',
            'ip_address' => 'required|ip',
            'path'       => 'required',
            'project_id' => 'required|integer'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return Response::json([
                'success' => false,
                'errors'  => $validator->getMessageBag()->toArray()
            ], 400);

        } else {
            $server = new Server;
            $server->name       = Input::get('name');
            $server->user       = Input::get('user');
            $server->ip_address = Input::get('ip_address');
            $server->path       = Input::get('path');
            $server->project_id = Input::get('project_id');
            $server->save();

            return Response::json([
                'success' => true,
                'server' => $server
            ], 200);

            return $server;
        }
    }
    

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        $rules = array(
            'name'       => 'required',
            'user'       => 'required',
            'ip_address' => 'required|ip',
            'path'       => 'required',
            'project_id' => 'required|integer'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors());
        } else {
            $server = Server::findOrFail($id);
            $server->name       = Input::get('name');
            $server->user       = Input::get('user');
            $server->ip_address = Input::get('ip_address');
            $server->path       = Input::get('path');
            $server->project_id = Input::get('project_id');
            $server->save();

            return $server;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}