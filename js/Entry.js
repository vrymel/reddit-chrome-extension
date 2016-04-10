/**
 * Created by vomandam on 4/7/16.
 */

function Entry() {
    this.title = null;
    this.thumbnail = null;
    this.url = null;
    this.dom = null;
    this.id = Entry.id++;
};

Entry.id = 0;

Entry.prototype.getId = function() {
    return this.id;  
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

Entry.prototype.setDom = function(dom) {
    this.dom = dom;
};

Entry.prototype.getDom = function() {
    return this.dom;  
};