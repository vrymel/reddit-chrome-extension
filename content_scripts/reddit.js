/**
 * Created by vomandam on 4/7/16.
 */

var reddit = (function() {
    var $siteTable = $('#siteTable');

    var entries = null
    var parser = new Parser();

    function _init() {
        $('.side').remove();

        entries = parser.parseThings($siteTable);

        console.log(entries)

        _clearSiteTable();

        _renderGallery();
    }

    function _clearSiteTable() {
        $siteTable.html('');
    }

    function _renderGallery() {
        var i, l
        for(i = 0, l = entries.length; i < l; i++) {
            var img = $('<img>', {
                src: window.location.protocol + entries[i].getThumbnail()
            });

            $siteTable.append(img);
        }
    }

    return {
        init: _init
    }

})();

reddit.init();