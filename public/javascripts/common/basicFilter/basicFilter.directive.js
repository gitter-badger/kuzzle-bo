angular.module('kuzzle.basicFilter', ['kuzzle.schema'])

  .controller('BasicFilterCtrl', ['$scope', 'schema', function ($scope, schema) {

    $scope.formattedFilter = [];

    $scope.fields = [];

    $scope.addAndTerm = function (index) {
      $scope.filters[index].and.push({field: null, equal: $scope.comparators[0], value: null});
    };

    $scope.addOr = function () {
      $scope.filters.push({
        and: [
          {field: null, equal: $scope.comparators[0], value: null}
        ]
      });
    };

    $scope.removeTerm = function (groupIndex, termIndex) {

      if ($scope.filters.length === 1 && $scope.filters[0].and.length === 1) {
        $scope.filters[0].and[0].field = null;
        $scope.filters[0].and[0].equal = $scope.comparators[0];
        $scope.filters[0].and[0].value = null;
        return false;
      }

      $scope.filters[groupIndex].and.splice(termIndex, 1);
      if ($scope.filters[groupIndex].and.length === 0) {
        $scope.filters.splice(groupIndex, 1);
      }
    };

    var getFields = function () {
      if (!$scope.collection) {
        return false;
      }

      schema.get($scope.collection)
        .then(function (response) {
          if (response.error) {
            console.error(response.message);
            return false;
          }

          $scope.fields = parseFields(response.mapping, '');
        });
    };

    var parseFields = function (fields, prefix) {
      var parsedFields = [];

      angular.forEach(fields, function (value, key) {
        parsedFields.push(prefix + key);

        if (value.properties) {
          parsedFields = parsedFields.concat(parseFields(value.properties, key + '.'));
        }
      });

      return parsedFields;
    };

    getFields();

    /** WATCHERS **/
    $scope.$watch('collection', function () {
      getFields();
    });
  }])

  .directive('basicFilter', function () {
    return {
      restrict: 'E',
      scope: {
        addGroupLabel: '@',
        filters: '=',
        collection: '=',
        comparators: '='
      },
      controller: 'BasicFilterCtrl',
      templateUrl: '/javascripts/common/basicFilter/basicFilter.tpl.html'
    }
  });
