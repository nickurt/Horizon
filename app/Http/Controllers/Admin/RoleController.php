<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use URL;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class RoleController extends Controller
{
    public function index() {
        $this->authorize('roles.show');

        return Inertia::render('Admin/Roles/Show', [
            'can' => [
                'create_roles' => Auth::user()->can('roles.create'),
                'edit_roles' => Auth::user()->can('roles.edit')
            ],
            'roles' => Role::orderBy('name')->paginate(50)->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'editUrl' => URL::route('admin.roles.edit', $role)
                ];
            }),
            'createUrl' => URL::route('admin.roles.create'),
            'status' => session('status')
        ]);
    }

    public function edit(Role $role) {
        $this->authorize('roles.edit');

        return Inertia::render('Admin/Roles/Edit', [
            'can' => [
                'edit_roles' => Auth::user()->can('roles.edit'),
                'delete_roles' => Auth::user()->can('roles.delete')
            ],
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->getPermissionNames()
            ],
            'permissions' => Permission::get(),
            'status' => session('status')
        ]);
    }

    public function create() {
        $this->authorize('roles.create');

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::get()
        ]);
    }

    public function update(Role $role) {
        $this->authorize('roles.edit');

        $role->update([
            'name' => request('name'),
        ]);

        $role_permissions = new Collection(request('permissions'));

        foreach(Permission::get() as $permission) {
            if ($role_permissions->contains($permission->name)) {
                $role->givePermissionTo($permission->name);
            } else {
                $role->revokePermissionTo($permission->name);
            }
        }

        return Redirect::route('admin.roles.edit', $role)->with('status', 'Succesfully updated this role.');
    }

    public function store(Role $role) {
        $this->authorize('roles.create');

        $role = $role->create([
            'name' => request('name'),
        ]);
        
        $role_permissions = new Collection(request('permissions'));

        foreach($role_permissions as $permission) {
            $role->givePermissionTo($permission);
        }

        return Redirect::route('admin.roles.edit', ['role' => $role->id])->with('status', 'Succesfully created this role.');;
    }

    public function destroy(Role $role) {
        $this->authorize('roles.delete');

        $role->delete();

        return Redirect::route('admin.roles')->with('status', 'Succesfully deleted role.');
    }
}