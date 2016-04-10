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

    function _initMock() {
        var path = chrome.extension.getURL('html/mock-container.html');

        $.get(path, function(response) {
            $siteTable.html(response).show();
        });
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

            var node = _wrapToAnchor(entry, img);
            node = _wrapToHolder(node, translateX);

            var $controls = _setupControls(entry);
            node.append($controls);

            $siteTable.prepend(node);
        }

        $siteTable.show();
    }

    function _setupControls(thing) {
        var $domNode = $(thing.getDom());
        var $likes = $domNode.find('.midcol.unvoted'); // a thing that has not been voted
        var upVotedClass = '';
        var downVotedClass = '';
        
        if($likes.length === 0) {
            $likes = $domNode.find('.midcol.likes'); // the user already liked (up or down) the thing
            
            if($likes.length === 0) {
                $likes = $domNode.find('.midcol.dislikes');
                downVotedClass = 'mod';
            } else {
                upVotedClass = 'mod';
            }
        }

        var $upVote = $likes.find('.arrow.up' + upVotedClass);
        var $downVote = $likes.find('.arrow.down' + downVotedClass);
        
        var $controlHolder = $('<div>', { class: 'controls' }).append($upVote, $downVote);
        
        return $controlHolder;
    }

    function _wrapToHolder(img, translateXValue) {
        var translateX = translateXValue ? 'translate-' + translateXValue : '';
        var holder = $('<div>', {
            class: 'thumbnail-holder ' + translateX
        });

        holder.append(img);

        return holder;
    }

    function _wrapToAnchor(entry, node) {
        var anchor = $('<a>', {
            title: entry.getTitle(),
            href: entry.getUrl(),
            target: '_blank'
        });

        anchor.append(node);

        return anchor;
    }

    return {
        init: _init,
        initMock: _initMock
    }

})();

reddit.init();

