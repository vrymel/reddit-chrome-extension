/**
 * Created by vomandam on 4/7/16.
 */

function Entry() {
    this.title = null;
    this.thumbnail = null;
    this.url = null;
};

Entry.prototype.getTitle = function() {
    return this.title;
};

Entry.prototype.setTitle = function(title) {
    this.title = title;
};

Entry.prototype.setThumbnail = function(thumbnail) {
    this.thumbnail = thumbnail;
};

Entry.prototype.getThumbnail = function() {
    return this.thumbnail;
};

Entry.prototype.setUrl = function(url) {
    this.url = url;
};

Entry.prototype.getUrl = function() {
    return this.url;
};