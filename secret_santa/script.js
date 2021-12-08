var SecretSanta = angular.module('SecretSanta', []),
    participants = ['Ed', 'Eva', 'Tim', 'Gracie', 'Cress', 'Jonny', 'Anna', 'Mike'],
    participantDetails = [{
        name: 'Ed',
        partner: 'Eva'
    }, {
        name: 'Tim',
        partner: 'Gracie'
    }, {
        name: 'Cress',
        partner: 'Jonny'
    }, {
        name: 'Anna',
        partner: 'Mike'
    },];

SecretSanta.controller('secretController', ['$scope', function ($scope) {
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    $scope.secretCode = null;
    $scope.result = null;
    $scope.error = null;

    $scope.generateMatches = function () {
        var participantsToAssign = null,
            assignment = null,
            candidates = null,
            username,
            seed,
            decoded = atob($scope.secretCode);

        $scope.error = null;

        if (decoded) {
            $scope.username = decoded.split('@')[1],
                seed = decoded.split('@')[0];
        } else {
            $scope.error = true;
        }

        var oops = false;
        do {
            participantsToAssign = participants;
            assignment = {};
            candidates = [];

            Math.seedrandom(seed);
            oops = false;

            participantDetails.forEach(function (participant) {
                candidates = participantsToAssign.filter(function (name) {
                    return name !== participant.name && name !== participant.partner;
                });

                if (!candidates.length) {
                    oops = true;
                    seed += '@';
                }

                assignment[participant.name] = candidates[getRandomIndex(candidates.length)];

                participantsToAssign = participantsToAssign.filter(function (name) {
                    return name !== assignment[participant.name];
                });
            });
        } while (oops);

        if (assignment[$scope.username]) {
            $scope.result = assignment[$scope.username];
        } else {
            $scope.error = true;
        }
    };
}]);

SecretSanta.directive('santa', function () {
    return {
        restrict: 'E',
        template: '<div class="santa"><div class="circles"></div><div class="snow"></div><div class="hat"><div class="hat-end"></div></div><div class="face"><div class="eyes"></div><div class="mouth"></div></div><div class="dirty-overflow"><div class="body"></div></div></div>'
    };
});