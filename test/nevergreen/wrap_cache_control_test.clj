(ns nevergreen.wrap-cache-control-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-cache-control :as subject]))

(facts "wrap no cache"
       (fact "just adds a no cache header"
             ((subject/wrap-no-cache ..app..) ..req..) => {:headers {"Cache-Control" "private, max-age=0, no-store"}}
             (provided
               (..app.. ..req..) => {}))

       (fact "adds to any existing headers"
             ((subject/wrap-no-cache ..app..) ..req..) => {:headers {"foo"           "bar"
                                                                     "Cache-Control" "private, max-age=0, no-store"}}
             (provided
               (..app.. ..req..) => {:headers {"foo" "bar"}})))

(facts "wrap caching"
       (fact "adds the maximum recommended (1 year) cache header"
             ((subject/wrap-caching ..app..) ..req..) => (contains {:headers (contains {"Cache-Control" "max-age=31556926"})})
             (provided
               (..app.. ..req..) => {})))
