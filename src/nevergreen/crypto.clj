(ns nevergreen.crypto
  (:require [base64-clj.core :as base64]
            [clojure.string :refer [blank?]])
  (:import (java.security Key)
           (javax.crypto Cipher BadPaddingException)
           (javax.crypto.spec SecretKeySpec)))

(def ^:private transformation "AES/ECB/PKCS5Padding")
(def ^:private ^String charset "UTF-8")

(defn- bytes->base64 [bytes]
  (String. (base64/encode-bytes bytes) charset))

(defn- base64->bytes [^String b64]
  (base64/decode-bytes (.getBytes b64 charset)))

(defn- ^Key secret [^String aes-key]
  (SecretKeySpec. (.getBytes aes-key charset) "AES"))

(defn- cipher [mode aes-key]
  (doto (Cipher/getInstance transformation)
    (.init mode (secret aes-key))))

(defn ^String encrypt [^String plain-text aes-key]
  (let [cipher (cipher Cipher/ENCRYPT_MODE aes-key)]
    (bytes->base64 (.doFinal cipher (.getBytes plain-text charset)))))

(defn ^String decrypt [^String base64-encoded aes-key]
  (if (blank? base64-encoded)
    nil
    (try
      (let [cipher (cipher Cipher/DECRYPT_MODE aes-key)]
        (String. (.doFinal cipher (base64->bytes base64-encoded)) charset))
      (catch BadPaddingException e
        (throw (ex-info "Unable to decrypt password as the Nevergreen server's AES_KEY has changed" {}))))))
