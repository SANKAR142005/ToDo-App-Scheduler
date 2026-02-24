var app = angular.module("todoApp", []);

app.controller("TodoController", function($scope, $http) {

    $scope.tasks = [];
    $scope.newTask = "";

    function loadTasks() {
        $http.get("http://localhost:3000/tasks").then(function(response) {
            $scope.tasks = response.data;
        });
    }

    $scope.addTask = function() {
        if ($scope.newTask.trim() === "") return;
        
        $http.post("http://localhost:3000/tasks", { title: $scope.newTask })
        .then(function() {
            $scope.newTask = "";
            loadTasks();
        });
    };

    $scope.updateTask = function(task) {
        $http.put("http://localhost:3000/tasks/" + task._id, { completed: task.completed })
        .then(loadTasks);
    };

    $scope.deleteTask = function(id) {
        $http.delete("http://localhost:3000/tasks/" + id)
        .then(loadTasks);
    };

    loadTasks();
});
