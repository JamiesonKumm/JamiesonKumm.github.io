define(function(require, exports, module) {
    var JamWheel = require("./jam_wheel");

    ReactDOM.render(
        JamWheel,
        document.getElementById('content')
    );
});