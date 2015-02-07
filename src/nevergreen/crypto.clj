(ns nevergreen.crypto
  (:require [nevergreen.config :as config]
            [base64-clj.core :as base64])
  (import (java.security Key)
          (javax.crypto Cipher)
          (javax.crypto.spec SecretKeySpec)))

(defn- bytes->base64 [bytes]
  (String. (base64/encode-bytes bytes)))

(defn- base64->bytes [^String b64]
  (base64/decode-bytes (.getBytes b64)))

(def transformation "AES/ECB/PKCS5Padding")
(def charset "US-ASCII")

(defn- ^Key secret [^String aes-key]
  (SecretKeySpec. (.getBytes aes-key) "AES"))

(defn- cipher [mode]
  (doto (Cipher/getInstance transformation)
    (.init mode (secret (config/aes-key)))))

(defn ^bytes encrypt [^String plain-text]
  (let [cipher (cipher Cipher/ENCRYPT_MODE)]
    (bytes->base64 (.doFinal cipher (.getBytes plain-text charset)))))

(defn ^String decrypt [^String base64-encoded]
  (let [cipher (cipher Cipher/DECRYPT_MODE)]
    (String. (.doFinal cipher (base64->bytes base64-encoded)) charset)))

