from django.urls import path
from .views import TaskList, TaskComplete

urlpatterns = [
    path('', TaskList.as_view(), name="task_list_url"),
    path('task/<str:id>/completed/', TaskComplete.as_view(), name="task_complete_url"),
]
