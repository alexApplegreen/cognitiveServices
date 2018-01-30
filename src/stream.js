if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
            ? args[number] : match;
        });
    };
}
Webcam.attach('#my_camera');
function take_snapshot() {
    Webcam.snap(function(data_uri) {
        var image = new Image();
        image.src = 'data:image/png;base64,' + data_uri;
        var requestData = '{"url": "{0}"}'.format("https://fee.org/media/24410/happy.jpg?anchor=center&mode=crop&height=656&widthratio=2.1341463414634146341463414634&rnd=131497055260000000");

        $(function() {
            var params = {};
            $.ajax({
                url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
                beforeSend: function(xhrObj){
                    xhrObj.setRequestHeader("Content-Type","application/json");

                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","805c9c0d22f2489686ce82d223d2f6b1");
                },
                type: "POST",
                // Request body
                data: requestData,
            }).done(function(data) {
                // Get face rectangle dimensions
                var faceRectangle = data[0].faceRectangle;
                var faceRectangleList = document.getElementById("faceRectangle");

                // Append to DOM
                for (var prop in faceRectangle) {
                    var elem = document.createElement('li');
                    elem.innerHTML = prop + ": " + faceRectangle[prop];
                    faceRectangleList.appendChild(elem);
                }

                // Get emotion confidence scores
                var scores = data[0].scores;
                var scoresList = document.getElementById("scores");

                // Append to DOM
                for (var prop in scores) {
                    var elem = document.createElement('li');
                    elem.innerHTML = prop + ": " + scores[prop] * 100 + "%";
                    scoresList.appendChild(elem);
                }
            }).fail(function(err) {
                alert("Error: " + JSON.stringify(err));
            });
        });
    })
}
