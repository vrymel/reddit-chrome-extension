/**
 * Created by vomandam on 4/7/16.
 */

var reddit = (function() {
    var $siteTable = $('#siteTable');

    var entries = null
    var parser = new Parser();

    function _init() {
        entries = parser.parseThings($siteTable);

        _clearSiteTable();

        _renderGallery();
    }

    function _clearSiteTable() {
        $siteTable.html('');
    }

    function _renderGallery() {
        var i, l;
        for(i = 0, l = entries.length; i < l; i++) {
            var img = document.createElement('img');
            img.src = window.location.protocol + entries[i].getThumbnail();

            var ratio = img.width / img.height;
            var scaledWidth = 140 * ratio;
            var translateX = ratio > 1 ? Math.floor((scaledWidth / 4) / 10) * 10 : 0;

            if(scaledWidth > 1) {
                img.style.zoom = ratio;
            }

            $siteTable.append( _wrapToHolder(img, translateX) );
        }

        $siteTable.show();
    }

    function _wrapToHolder(img, translateXValue) {
        var translateX = 'translate-' + translateXValue;
        var holder = $('<div>', {
            class: 'thumbnail-holder ' + translateX
        })

        holder.append(img);

        return holder;
    }

    return {
        init: _init
    }

})();

reddit.init();

