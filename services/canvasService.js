var CanvasService = (
    function () {
        // Init object we want to expose
        var exports = {};

        // Use var here for private fields/methods. use exports. for public

        exports.getCanvas = function (canvasId) {

                var canvas = {};

                canvas.DOMelement = document.getElementById(canvasId);
                canvas.width = canvas.DOMelement.width;
                canvas.height = canvas.DOMelement.height;
                canvas.context = canvas.DOMelement.getContext("2d");
                canvas.canvasData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
                
                return canvas;
        };

        // Expose the service
        return exports;
    }
)();