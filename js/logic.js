var app = angular.module('wikiGrabber', []);

app.controller('mainCtrl', function ($scope, $http) {

    // control behavior of input box & page button
    //---------------------------------------------------------------\\
    $scope.external = function (input, event) {
        if (event.keyCode === 13 || event.type === "click") {
            if (input === undefined || input.length < 1) {
                $scope.hint = 'Enter a search string.';
            } else {
                $scope.source(input); // open page
                $scope.queryString = undefined; // reset query
                $scope.hint = ''; // clear input
            }
        };
    };//=============================================================//


    // grab random page from wiki
    //---------------------------------------------------------------\\    
    $scope.random = function () {
        window.open('https://en.wikipedia.org/wiki/Special:Random',
            '_blank');
    };//=============================================================//

    
    // open link in new window
    //---------------------------------------------------------------\\ 
    $scope.source = function (item) {
        window.open('https://en.wikipedia.org/wiki/' +
            (item.title || item), '_blank');
    };//=============================================================//


    // watch input & make API call(s)
    //---------------------------------------------------------------\\ 
    $scope.$watch('queryString', function (input) {
        if (input === undefined || input.length < 1) {
            $scope.data = []; // clear data array if no search term
        } else {
            $http.jsonp('http://en.wikipedia.org/w/api.php?', {
                method: 'GET',
                params: {
                    gsrsearch: input,
                    action: 'query',
                    generator: 'search',
                    prop: 'extracts',
                    exlimit: 'max',
                    exsentences: 1,
                    exintro: 1,
                    explaintext: 1,
                    format: 'json',
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (result) {
                console.log(result.data.query.pages); // DEBUG
                $scope.data = result.data.query.pages;
            });
        }
    });//============================================================//
});