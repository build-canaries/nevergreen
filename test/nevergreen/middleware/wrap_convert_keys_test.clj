(ns nevergreen.middleware.wrap-convert-keys-test
  (:require [clojure.test :refer :all]
            [nevergreen.middleware.wrap-convert-keys :as subject]))

(deftest wrap-convert-keys

  (testing "converts request bodies from camelCase to kebab-case"
    (let [app (fn [req]
                (is (= {:header {:header-key "my key should not get converted"}
                        :body   {:some-key "some-value"}}
                       req))
                {})
          req {:header {:header-key "my key should not get converted"}
               :body   {:someKey "some-value"}}]
      ((subject/wrap-convert-keys app) req)))

  (testing "converts response bodies from kebab-case to camelCase"
    (let [app (constantly {:headers {:header-key "my key should not get converted"}
                           :body    {:another-key "another-value"}})
          req {:body {:someKey "some-value"}}
          res ((subject/wrap-convert-keys app) req)]
      (is (= {:headers {:header-key "my key should not get converted"}
              :body    {:anotherKey "another-value"}}
             res)))))

(deftest wrap-convert-keys-req

  (testing "converts request bodies from camelCase to kebab-case"
    (let [app (fn [req]
                (is (= {:header {:header-key "my key should not get converted"}
                        :body   {:some-key "some-value"}}
                       req))
                {})
          req {:header {:header-key "my key should not get converted"}
               :body   {:someKey "some-value"}}]
      ((subject/wrap-convert-keys-req app) req))))

(deftest wrap-convert-keys-res

  (testing "converts response bodies from kebab-case to camelCase"
    (let [app (constantly {:headers {:header-key "my key should not get converted"}
                           :body    {:another-key "another-value"}})
          req {:body {:someKey "some-value"}}
          res ((subject/wrap-convert-keys-res app) req)]
      (is (= {:headers {:header-key "my key should not get converted"}
              :body    {:anotherKey "another-value"}}
             res)))))
