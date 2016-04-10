/**
 * Created by vomandam on 4/7/16.
 */

function Parser() { }

Parser.prototype.parseThings = function($siteTable) {
    var $things = $siteTable.find('.thing');
    var entries = [];
    var self = this;

    $things.each(function(index, thing) {
        var entry = self.parse(thing);

        if(entry) {
            entries.push(entry);
        }
    });

    return entries;
};

Parser.prototype.parse = function(thing) {
    var $thing = $(thing);
    var $anchor = $thing.find('a.thumbnail');
    var $title = $thing.find('p.title a.title');
    var $thumbnail = $anchor.find('img');

    if($thumbnail.length === 0) {
        return null;
    }

    var thingId = $thing.attr('id');
    var title = $title.text();
    var thumbnailSrc = $thumbnail.attr('src');
    var url = $anchor.attr('href');

    var entry = new Entry();
    entry.setThingId(thingId);
    entry.setTitle(title);
    entry.setThumbnail(thumbnailSrc);
    entry.setUrl(url);
    entry.setDom(thing);

    return entry;
};
