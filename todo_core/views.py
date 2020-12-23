from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Task
from .forms import TaskForm

# Create your views here.

class TaskList(View):
    
    def get(self, request):
        form = TaskForm()
        tasks = Task.objects.all() 
        
        context = {'form': form, 'tasks': tasks}
        return render(request, 'todo_core/task.html', context=context)
    
    def post(self, request):
        form = TaskForm(request.POST)
        
        if form.is_valid():
            form.save()
            return redirect("task_list_url")
        
        else:
            return redirect("task_list_url")