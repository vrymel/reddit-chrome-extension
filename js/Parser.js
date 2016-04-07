/**
 * Created by vomandam on 4/7/16.
 */

function Parser() { }

Parser.prototype.parseThings = function($siteTable) {
    var $things = $siteTable.find('.thing');
    var entries = [];
    var self = this;

    $things.each(function(index, thing) {
        entries.push(self.parse(thing));
    });

    return entries;
};

Parser.prototype.parse = function(thing) {
    var $thing = $(thing);
    var $anchor = $thing.find('a.thumbnail');
    var thumbnail = $anchor.find('img').attr('src');
    var url = $anchor.attr('href');

    var entry = new Entry();
    entry.setThumbnail(thumbnail);
    entry.setUrl(url);

    return entry;
};
