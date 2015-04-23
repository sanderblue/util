# Util
A set of Javascript utility objects.

#### DataBind Module
DataBind is a minimalist "data binding" module with no dependencies. This is not necessarily a true data-binding setup - it's more of a DOM auto-update module. The DataBind constructor requires a target element, controller element, an initial value, and URL endpoint. The URL endpoint *must* accept GET requests in order to update the target element's inner HTML. The ability to use additional HTTP verbs will be added eventually.

Once a new DataBind object is created, you need to listen on events in order to auto-update the UI. To do this, the object's `listen()` method accepts an options object containing two properties - 'event' and 'update'. If no event is provided in the options, it defaults to 'click'. If no update option is provided, no auto-updating of the UI will occur. There will be additional event handling added eventually.

**Usage**
```javascript
var targetElement = document.getElementById('test');
var ctrlElement = document.getElementById('ctrl');

// Create the "data-binding"
var element = new DataBind(targetElement, ctrlElement, '0', '/test');

element.listen({
    event: 'click',
    update: true
});

```
