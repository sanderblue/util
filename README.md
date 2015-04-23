# Util
**A set of Javascript utility objects.**

- [HttpRequest](#HttpRequest)
- [DataBind](#DataBind)

<br>

<a name="HttpRequest"></a>

#### HttpRequest Module
HttpRequest is a wrapper for Javascript's [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object.<br>
<sup>[Code](https://github.com/sanderblue/util/blob/master/HttpRequest.js)</sup>

**Usage**
```javascript
var req = new HttpRequest('GET', 'http://sanderblue.lcl/test', function(data) {
    console.log('Response came back!', data);
});

req.send();

```
<br>

<a name="DataBind"></a>

#### DataBind Module
DataBind is a minimalist "data binding" module with no dependencies. This is not necessarily a true data-binding setup - it's more of a DOM auto-update module. The DataBind constructor requires a target element, controller element, an initial value, and URL endpoint. The URL endpoint *must* accept GET requests in order to update the target element's inner HTML. The ability to use additional HTTP verbs will be added soon.

Once a new DataBind object is created, you need to listen on events in order to auto-update the UI. To do this, the object's `listen()` method accepts an options object containing two properties - 'event' and 'update'. If no event is provided in the options, it defaults to 'click'. If no update option is provided, no auto-updating of the UI will occur. Additional event handling will be added soon.<br>
<sup>[Code](https://github.com/sanderblue/util/blob/master/DataBind.js)</sup>

**Usage**
```javascript
var targetElement = document.getElementById('test');
var ctrlElement = document.getElementById('ctrl');
var dataToDisplay = 'Auto-Update Worked!!';
var endpoint = 'http://www.sanderblue.com/test/' + dataToDisplay;

// Create the "data-binding" with a test URL*
var element = new DataBind(
    targetElement, // the target element that gets updated
    ctrlElement,   // the controller element that triggers the update
    'No Data Yet', // the intial data to display
    endpoint       // the request URL endopint that gives you the data
);

element.listen({
    event: 'click',
    update: true
});

```
<sup>*Note: The example endpoint is CORS compliant and is set up to return the provided data from the endpoint. Your controllers method(s) will probably work differently.</sup>
