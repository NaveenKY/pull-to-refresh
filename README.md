# pull-to-refresh
Pull to Refresh Functionality for Web &amp; Hybrid applications

This library is dependent on [HammerJS](http://hammerjs.github.io/api/) for handling pull event.


```js
	var pullToRefresh = new PullToRefresh({$el: document.getElementsByClassName('content')[0], delay: 5000});
```
### In above scenario, Once you pull & leave, loader will automatically go after the specified delay.

```js
	var pullToRefresh = new PullToRefresh({$el: document.getElementsByClassName('content')[0]},
		function() {
			// Do the operation you want on loading
			pullToRefresh.stopLoading();
		}
	);
```

### In above scenario, You can do the operation once the loading starts and you can manually stop loading once operation is completed.