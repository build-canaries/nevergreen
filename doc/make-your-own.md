
How to make your own monitor
============================

If you'd like to make your own monitor page then we can provide you with a bare bones page. The page has no styling and
just polls nevergreen.io. You can run it just by opening the file. You don't need anything else, get started with the [mvp monitor](mvp-monitor.html)

The following commands allow you to run it over http:

```
wget https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/mvp-monitor.html
python -m SimpleHTTPServer
open http://localhost:8000/mvp-monitor.html
```
