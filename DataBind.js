/**
 *
 */
(function(global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        factory(global, true);
    }
}(this, function(window, nonAMD) {

    var DataBind = function(element, controlElement, data, getUrl) {
        this.data = data || null;
        this.element = element || null;
        this.controller = controlElement || null;
        this.getUrl = getUrl || null;

        element.value = data;
        element.addEventListener('update', this, false);

        return this;
    }

    DataBind.prototype.listen = function(options) {
        if (!options) {
            throw new Error('Options must be provided.');
        }

        var e = options.event || 'click';
        var update = options.update || false;

        if (update) {
            this.controller.addEventListener(e, this.update(this), false);

            return;
        }

        this.controller.addEventListener(e, this.handleEvent(this), false);
    };

    DataBind.prototype.update = function(thisObject) {
        return function(event) {
            var request = new HttpRequest('GET', thisObject.getUrl, function(response) {
                thisObject.element.innerHTML = response;
            });

            request.send();
        }
    };

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

    HttpRequest.prototype.done = function(thisObject) {
        return function(event) {
            if (thisObject.callback) {
                thisObject.callback.call(this, event.currentTarget.responseText);
            }
        }
    };

    if (nonAMD) {
        window.DataBind = DataBind;
    }

    return DataBind;
});

