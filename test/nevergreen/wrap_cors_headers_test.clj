(ns nevergreen.wrap-cors-headers-test
  (:require [midje.sweet :refer :all]
            [nevergreen.wrap-cors-headers :as subject]))

(facts "wrap cors headers"
       (fact "does not add headers if method is not allowed"
             ((subject/wrap-cors-headers ..app..) ..req..) => ..res..
             (provided
               (..app.. ..req..) => ..res..))

       (facts "adds a bunch of CORS headers if the method is allowed"
              (let [expected-cors-headers {"Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                                           "Access-Control-Allow-Origin"  "*"
                                           "Access-Control-Max-Age"       "86400"
                                           "Access-Control-Allow-Headers" "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma"}]

                (fact "post"
                      ((subject/wrap-cors-headers ..app..) {:request-method :post}) => {:headers expected-cors-headers}
                      (provided
                        (..app.. anything) => {}))

                (fact "get"
                      ((subject/wrap-cors-headers ..app..) {:request-method :get}) => {:headers expected-cors-headers}
                      (provided
                        (..app.. anything) => {}))

                (fact "options"
                      ((subject/wrap-cors-headers ..app..) {:request-method :options}) => {:headers expected-cors-headers}
                      (provided
                        (..app.. anything) => {}))))

       (fact "adds to any existing headers"
             ((subject/wrap-cors-headers ..app..) {:request-method :post}) => {:headers {"foo"                          "bar"
                                                                                         "Access-Control-Allow-Methods" "POST, GET, OPTIONS"
                                                                                         "Access-Control-Allow-Origin"  "*"
                                                                                         "Access-Control-Max-Age"       "86400"
                                                                                         "Access-Control-Allow-Headers" "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma"}}
             (provided
               (..app.. anything) => {:headers {"foo" "bar"}})))
