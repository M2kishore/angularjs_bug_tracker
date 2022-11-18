var app = angular.module('bugs', []);
        app.controller('bugController', function ($scope, $http) {
            $scope.bugList = [{ title: 'Clean House', description: 'clean using thodapam', done: false, priority: "High", status: "pending" }];
            $http.get("http://localhost:8080/bug").then(function (response) {
                $scope.bugList = response.data;
                console.log($scope.bugList)
            });
            $scope.addBug = function () {
                var bugAddRequest = {
                    method: 'POST',
                    url: "http://localhost:8080/bug",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: {
                        id: Math.round(Date.now() / 1000),
                        title: $scope.bugTitle,
                        description: $scope.bugDescription,
                        priority: $scope.bugPriority,
                        status: $scope.bugStatus,
                        done: false
                    }
                }
                $http(bugAddRequest).then(function (response) {
                    console.log(response.status);
                    $http.get("http://localhost:8080/bug").then(function (response) {
                        $scope.bugList = response.data;
                    });
                });
                $scope.showBugsFunction();
            };
            $scope.updateBug = function () {
                let bugUpdateRequest = {
                    method: 'PUT',
                    url: "http://localhost:8080/bug/" + $scope.currentBug.id,
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: {
                        id: $scope.currentBug.id,
                        title: $scope.bugTitle,
                        description: $scope.bugDescription,
                        priority: $scope.bugPriority,
                        status: $scope.bugStatus
                    }
                };
                $http(bugUpdateRequest).then(() => {
                    $http.get("http://localhost:8080/bug").then(function (response) {
                        $scope.bugList = response.data;
                        $scope.showBugsFunction();
                    });
                });
            };
            $scope.deleteBug = function (id) {
                console.log("http://localhost:8080/bug/" + id);
                let bugDeleteRequest = {
                    method: 'DELETE',
                    url: "http://localhost:8080/bug/" + id,
                    headers: {
                        'Content-Type': "application/json"
                    }
                };
                $http(bugDeleteRequest).then(() => {
                    $http.get("http://localhost:8080/bug").then(function (response) {
                        $scope.bugList = response.data;
                        $scope.showBugsFunction();
                    });
                });

            }

            $scope.removeMarked = function () {
                var oldList = $scope.bugList;
                $scope.bugList = [];
                angular.forEach(oldList, function (bug) {
                    if (!bug.done) $scope.bugList.push(bug);
                });
            };
            $scope.statusOptions = ["Todo", "Pending", "Completed"];
            $scope.priorityOptions = ["Medium", "Low", "High"];
            $scope.bugTitle = "";
            $scope.bugDescription = "";
            $scope.bugStatus = "Todo";
            $scope.bugPriority = "Medium";
            $scope.setBug = function (id) {
                $scope.bugList.forEach(bug => {
                    if (bug.id === id) {
                        $scope.currentBug = { ...bug };
                    }
                });
                $scope.showDetailsFunction();
            }
            $scope.resetForm = function () {
                $scope.bugTitle = "";
                $scope.bugDescription = "";
                $scope.bugStatus = "Todo";
                $scope.bugPriority = "Medium";
            }

            $scope.showDetails = false;
            $scope.showNewBug = false;
            $scope.shoeUpdateBug = false;
            $scope.showBugs = true;

            $scope.showUpdateBugFunction = function () {
                $scope.bugTitle = $scope.currentBug.title;
                $scope.bugDescription = $scope.currentBug.description;
                $scope.bugStatus = $scope.currentBug.status;
                $scope.bugPriority = $scope.currentBug.priority;

                $scope.showDetails = false;
                $scope.showNewBug = false;
                $scope.showBugs = false;
                $scope.showUpdateBug = true;
            }
            $scope.showBugsFunction = () => {
                $scope.showDetails = false;
                $scope.showNewBug = false;
                $scope.showBugs = true;
                $scope.showUpdateBug = false;
                $scope.currentBug = {};
            };
            $scope.showNewBugFunction = () => {
                $scope.showDetails = false;
                $scope.showNewBug = true;
                $scope.showBugs = false;
                $scope.showUpdateBug = false;
                $scope.resetForm();
            };
            $scope.showDetailsFunction = () => {
                $scope.showDetails = true;
                $scope.showNewBug = false;
                $scope.showBugs = false;
                $scope.showUpdateBug = false;
            };
            $scope.currentBug = { title: 'Clean House', description: 'clean using thodapam', done: false, priority: "High", status: "pending" };
        });