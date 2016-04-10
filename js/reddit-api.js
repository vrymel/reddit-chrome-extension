/**
 * Created by Free on 4/10/2016.
 */

var redditApi = (function() {
    var url = 'http://www.reddit.com/';
    var apiUrl = url + 'api/';

    function _buildApiPath(endpoint) {
        return apiUrl + endpoint;
    }

    function _login(username, password) {
        $.ajax({
            url: _buildApiPath('me.json'),
            success: function(response) {
                console.log(response);
            }
        })
    }

    _login();

    return {
        url: url,
        apiUrl: apiUrl
    }
})();

window.redditApi = redditApi;