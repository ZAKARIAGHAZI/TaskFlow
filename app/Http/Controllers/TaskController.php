<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->hasRole('admin')) {
            // Admin sees all tasks
            $tasks = \App\Models\Task::with('assignedUser')->get();
        } else {
            // Normal users see only their tasks
            $tasks = Auth::user()->tasks()->with('assignedUser')->get();
        }

        // Only admins get all users for the assign dropdown
        $users = Auth::user()->hasRole('admin') ? \App\Models\User::all() : collect([Auth::user()]);

        return Inertia::render('Tasks/TaskDashboard', [
            'tasks' => $tasks,
            'users' => $users,
            'flash' => session('success'),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task = Auth::user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'todo',
            'assigned_to' => $request->assigned_to,
        ]);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = Task::with('assignedUser')->findOrFail($id);

        if (!Auth::user()->hasRole('admin') && $task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        if (!Auth::user()->hasRole('admin') && $task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:todo,in_progress,done',
        ]);

        $task->update($request->only('title', 'description', 'status'));

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);

        if (!Auth::user()->hasRole('admin') && $task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }

    /**
     * Assign a task to a user.
     */
    public function assign(Request $request, Task $task)
    {
        $request->validate([
            'assigned_to' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        if ($user->hasRole('admin')) {
            $task->assigned_to = $request->assigned_to;
        } else {
            if ($request->assigned_to != $user->id) {
                abort(403, 'You can only assign tasks to yourself.');
            }
            $task->assigned_to = $user->id;
        }

        $task->save();

        return redirect()->route('tasks.show', $task->id)
            ->with('success', 'Task assigned successfully.');
    }
}
