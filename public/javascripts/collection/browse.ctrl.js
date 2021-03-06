angular.module('kuzzle.collection')

  .controller('CollectionBrowseCtrl', ['$scope', 'collectionApi', function ($scope, collectionApi) {

    $scope.collections = null;

    $scope.init = function () {
      collectionApi.list()
        .then(function (response) {
          $scope.collections = response.stored.map(function (collection) {
            return {name: collection};
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    /**
     * Delete the entire collection
     */
    $scope.afterDelete = function (collection) {
      $scope.collections.splice($scope.collections.indexOf(collection), 1);
    };

  }]);