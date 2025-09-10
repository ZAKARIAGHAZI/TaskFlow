<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // If admin, show all tasks
        if ($user->hasRole('admin')) {
            $tasks = Task::with('assignedUser:id,name')
                ->select('id', 'title', 'status', 'description', 'assigned_to', 'user_id')
                ->get();
        } else {
            // Tasks created by user OR assigned to user
            $tasks = Task::with('assignedUser:id,name')
                ->where(function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                          ->orWhere('assigned_to', $user->id);
                })
                ->select('id', 'title', 'status', 'description', 'assigned_to', 'user_id')
                ->get();
        }

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
                'roles' => $user->roles->pluck('name'),
            ],
            'tasks' => $tasks,
        ]);
    }
}
