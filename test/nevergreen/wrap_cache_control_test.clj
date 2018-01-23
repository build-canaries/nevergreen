(ns nevergreen.wrap-cache-control-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-cache-control :as subject]))

(facts "wrap no cache"
       (fact "just adds a no cache header"
             ((subject/wrap-no-cache ..app..) ..req..) => {:headers {"Cache-Control" subject/no-cache}}
             (provided
               (..app.. ..req..) => {}))

       (fact "adds to any existing headers"
             ((subject/wrap-no-cache ..app..) ..req..) => {:headers {"foo"           "bar"
                                                                     "Cache-Control" subject/no-cache}}
             (provided
               (..app.. ..req..) => {:headers {"foo" "bar"}})))

(facts "wrap cache control"
       ; https://stackoverflow.com/questions/38843970/service-worker-javascript-update-frequency-every-24-hours/38854905#38854905
       (fact "adds no cache to the service worker to avoid 24 hour caching in Chrome"
             ((subject/wrap-cache-control ..app..) {:uri "/service-worker.js"}) => (contains {:headers (contains {"Cache-Control" subject/no-cache})})
             (provided
               (..app.. anything) => {}))

       (fact "adds a short cache to the index.html to stop users getting an old versions"
             ((subject/wrap-cache-control ..app..) {:uri "/index.html"}) => (contains {:headers (contains {"Cache-Control" subject/twelve-hour-cache})})
             (provided
               (..app.. anything) => {}))

       (fact "adds a short cache to anything that isn't a file, as it should be a refresh on a client side route e.g. /tracking"
             ((subject/wrap-cache-control ..app..) {:uri "/"}) => (contains {:headers (contains {"Cache-Control" subject/twelve-hour-cache})})
             (provided
               (..app.. anything) => {}))

       (fact "adds max cache to anything hashed by the webpack build"
             ((subject/wrap-cache-control ..app..) {:uri "/main.qwerd7n2.js"}) => (contains {:headers (contains {"Cache-Control" subject/max-cache})})
             (provided
               (..app.. anything) => {}))

       (fact "adds a short cache to everything else"
             ((subject/wrap-cache-control ..app..) {:uri "/irrelevant.js"}) => (contains {:headers (contains {"Cache-Control" subject/twelve-hour-cache})})
             (provided
               (..app.. anything) => {})))
