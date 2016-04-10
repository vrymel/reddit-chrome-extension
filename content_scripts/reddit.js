/**
 * Created by vomandam on 4/7/16.
 */

var reddit = (function() {
    var $siteTable = $('#siteTable');
    var $gridContainer = null;

    // width and height size
    var WHSize = 140;
    var entries = null
    var parser = new Parser();

    function _init() {
        entries = parser.parseThings($siteTable);

        _createContainer();

        _renderGallery();

        var $navButtons = $siteTable.find('.nav-buttons');
        var $clearSpacer = $('<div>', { class: 'clear spacer' });
        $gridContainer.append($clearSpacer, $navButtons);
        
        _attachEvents();
    }

    function _initMock() {
        var path = chrome.extension.getURL('html/mock-container.html');

        $.get(path, function(response) {
            var $response = $(response);
            
            $siteTable.html('');
            $siteTable.prepend($response).show();
        });
    }
    
    function _attachEvents() {
        $gridContainer.on('click', '.arrow.up', function(event) {
            var $thingNode = $siteTable.find('#' + $(this).data('thing-id'));
            var $up = $thingNode.find('.arrow.up');
            
            if($up.length === 0) {
                $up = $thingNode.find('.arrow.upmod');
            }
            
            $up.click();
        });
    }

    function _createContainer() {
        if(!$gridContainer) {
            $gridContainer = $($('<div>', {class: 'container'}));

            $gridContainer.insertBefore($siteTable);
        }
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

            $gridContainer.prepend(node);
        }

        // $siteTable.show();
    }

    function _setupControls(thing) {
        var $controlsContainer = $('<div>', { class: 'controls' });
        var $up = $('<div>', { class: 'arrow up', 'data-thing-id': thing.getThingId() });
        var $down = $('<div>', { class: 'arrow down', 'data-thing-id': thing.getThingId() });
        
        $controlsContainer.append($up, $down);
        
        return $controlsContainer;
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

