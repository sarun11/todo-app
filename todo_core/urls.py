from django.urls import path
from .views import TaskList, TaskComplete, TaskDelete

urlpatterns = [
    path('', TaskList.as_view(), name="task_list_url"),
    path('tasks/<str:id>/completed/', TaskComplete.as_view(), name="task_complete_url"),
    path('tasks/<str:id>/delete/', TaskDelete.as_view(), name="task_delete_url"),
]
