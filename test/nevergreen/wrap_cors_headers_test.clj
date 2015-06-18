(ns nevergreen.wrap-cache-control-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-cors-headers :as subject]))

(facts "wrap cors headers"
       (fact "just adds a no cache header for now"
             ((subject/wrap-cors-headers ..app..) ..req..) => {:headers {"Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                                                                         "Access-Control-Allow-Origin"  "*"}}
             (provided
               (..app.. ..req..) => {}))

       (fact "adds to any existing headers"
             ((subject/wrap-cors-headers ..app..) ..req..) => {:headers {"foo"                          "bar"
                                                                         "Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                                                                         "Access-Control-Allow-Origin"  "*"}}
             (provided
               (..app.. ..req..) => {:headers {"foo" "bar"}})))