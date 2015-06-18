(ns nevergreen.wrap-cache-control-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-cache-control :as subject]))

(facts "wrap cache control"
       (fact "just adds a no cache header for now"
             ((subject/wrap-cache-control ..app..) ..req..) => {:headers {"cache-control" "private, max-age=0, no-cache"}}
             (provided
               (..app.. ..req..) => {}))

       (fact "adds to any existing headers"
             ((subject/wrap-cache-control ..app..) ..req..) => {:headers {"foo"           "bar"
                                                                          "cache-control" "private, max-age=0, no-cache"}}
             (provided
               (..app.. ..req..) => {:headers {"foo" "bar"}})))