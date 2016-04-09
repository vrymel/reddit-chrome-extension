/**
 * Created by vomandam on 4/7/16.
 */

var reddit = (function() {
    var $siteTable = $('#siteTable');

    // width and height size
    var WHSize = 140;
    var entries = null
    var parser = new Parser();

    function _init() {
        entries = parser.parseThings($siteTable);

        _clearSiteTable();

        _renderGallery();
    }

    function _clearSiteTable() {
        var $navButtons = $siteTable.find('.nav-buttons');
        var $clear = $('<div>', { class: 'clear spacer' });

        $siteTable.html('').append($clear, $navButtons);
    }

    function _renderGallery() {
        var i, l;
        for(i = 0, l = entries.length; i < l; i++) {
            var entry = entries[i];
            var img = document.createElement('img');
            img.src = window.location.protocol + entry.getThumbnail();

            var ratio = img.width / img.height;
            var scaledWidth = WHSize * ratio;
            var visibleAreaPercentage = (WHSize / scaledWidth) * 100;
            var hiddenAreaPercentage = 100 - visibleAreaPercentage;
            var translateX = ratio > 1 ? Math.floor(hiddenAreaPercentage / 10) * 10 : 0;

            if(scaledWidth > 1) {
                img.style.zoom = ratio;
            }

            var node = _wrapToAnchor(entry.getUrl(), img);
            node = _wrapToHolder(node, translateX);

            $siteTable.prepend(node);
        }

        $siteTable.show();
    }

    function _wrapToHolder(img, translateXValue) {
        var translateX = translateXValue ? 'translate-' + translateXValue : '';
        var holder = $('<div>', {
            class: 'thumbnail-holder ' + translateX
        });

        holder.append(img);

        return holder;
    }

    function _wrapToAnchor(href, node) {
        var anchor = $('<a>', {
            href: href,
            target: '_blank'
        });

        anchor.append(node);

        return anchor;
    }

    return {
        init: _init
    }

})();

reddit.init();

