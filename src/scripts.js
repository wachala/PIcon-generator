var app = angular.module("iconGenerator", []);

app.factory('hashCode', function () {
        return function (str) {
            let hash = 0;

            if (str.length == 0)
                return hash;

            for (let i = 0; i < str.length; i++) {
                let currentChar = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + currentChar;
                hash = hash & hash;
            }

            return hash;
        }
    })
    .factory('mod', function () {
        return function (n, m) {
            return ((n % m) + m) % m;
        }
    })
    .factory('convertToHex', function () {
        return function (number) {
            if (number < 0)
                number = 0xFFFFFFFF + number + 1;
            return number.toString(16).toUpperCase();
        }
    });

app.controller("myCtrl", function ($scope, hashCode, mod, convertToHex) {

    $scope.generateIcon = function () {
        var canvas = document.getElementById("iconCanvas");
        var ctx = canvas.getContext("2d");
        let seed = hashCode($scope.username) % Math.pow(10, 18);

        const color = convertToHex(seed);
        ctx.fillStyle = "#" + color;

        const rectWidth = 40;
        const rectHeight = 40;
        const canvasWidth = 280;
        const padding = 20;

        let i = 0;
        let v = 0;
        let h = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        while (v < 18) {
            let digit = mod(seed, 10);
            seed = Math.floor(seed / 10);

            if (mod(digit, 2) != 0) {
                ctx.fillRect(h * rectWidth + padding, Math.floor(v / 3) * rectHeight + padding, rectWidth, rectHeight);
                ctx.fillRect(canvasWidth - h * rectWidth - padding, Math.floor(v / 3) * rectHeight + padding, -rectWidth, rectHeight);
            }

            v++;
            h++;
            h = h % 3;
        }
    }

});