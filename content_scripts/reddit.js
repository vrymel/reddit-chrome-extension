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
        var arrowClass = 'arrow';
        var btnClasses = ['up', 'down'];
        var clickedClass = 'mod';
        
        var i, l;
        for(i = 0, l = btnClasses.length; i < l; i++) {
            var btnClass = btnClasses[i];
            var selector = '.' + arrowClass + '.' + btnClass;
            var handler = function(selector, clickedClass, btnClass) {
                return function() {
                    var isClicked = false;
                    var $copyBtn = $(this);
                    var $thingNode = $siteTable.find('#' + $copyBtn.data('thing-id'));
                    var $originalBtn = $thingNode.find(selector);
                    
                    if($originalBtn.length === 0) {
                        $originalBtn = $thingNode.find(selector + clickedClass);
                        isClicked = true;
                    }
                    
                    var removeClass = btnClass;
                    var addClass = btnClass + clickedClass;
                    
                    $originalBtn.click();
                    
                    if(isClicked) {
                        removeClass = btnClass + clickedClass;
                        addClass = btnClass;
                    }
                    
                    $copyBtn.removeClass(removeClass).addClass(addClass);
                };
            };
            
            $gridContainer.on('click', selector, handler(selector, clickedClass, btnClass));    
        }
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

            $gridContainer.append(node);
        }

        // $siteTable.show();
    }

    function _setupControls(thing) {
        var $controlsContainer = $('<div>', { class: 'controls' });
        var $voteButtons = $(thing.getDom()).find('.arrow');
        var $up = $($voteButtons[0]).clone();
        var $down = $($voteButtons[1]).clone();
        
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
    };

})();

reddit.init();

