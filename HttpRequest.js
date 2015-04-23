(function(global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        factory(global, true);
    }
}(this, function(window, nonAMD) {

    var HttpRequest = function(method, url, callback, async) {
        this.allowedMethods = ['GET', 'POST'];

        if (!method) {
            throw new Error('Argument 1, method, is required.');
        }

        if (this.allowedMethods.indexOf(method) === -1) {
            throw new Error('Argument 1, method, must be one of the following HTTP verbs: GET, POST.');
        }

        if (!url) {
            throw new Error('Argument 2, url, is required.');
        }

        this.request = new XMLHttpRequest();
        this.method = method;
        this.url = url;
        this.callback = callback || null;
        this.async = typeof async !== 'boolean' ? true : async;

        // Add event listeners
        this.request.addEventListener('load', this.done(this), false);
    };

    HttpRequest.prototype.send = function() {
        this.request.open(
            this.method,
            this.url,
            this.async
        );

        this.request.send();
    };

    HttpRequest.prototype.done = function(thisXMLRequestObject) {
        return function(event) {
            if (thisXMLRequestObject.callback) {
                thisXMLRequestObject.callback.call(this, event.currentTarget.responseText);
            }
        }
    };

    if (nonAMD) {
        window.HttpRequest = HttpRequest;
    }

    return HttpRequest;
});
