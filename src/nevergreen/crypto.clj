(ns nevergreen.crypto
  (:require [nevergreen.config :as config])
  (import (java.security Key)
          (javax.crypto Cipher)
          (javax.crypto.spec SecretKeySpec)
          (java.util Base64)))

(defn- bytes-to-base64 [bytes]
  (String. (.encode (Base64/getEncoder) (byte-array bytes))))

(defn- base64-to-bytes [^String b64]
  (bytes (byte-array (map (comp byte int) (.decode (Base64/getDecoder) b64)))))

(defn- ^Key secret [^String aes-key]
  (SecretKeySpec. (.getBytes aes-key) "AES"))

(defn ^bytes encrypt [^String plain-text]
  (let [cipher (doto (Cipher/getInstance "AES/ECB/PKCS5Padding")
                 (.init Cipher/ENCRYPT_MODE (secret (config/aes-key))))]
    (bytes-to-base64 (.doFinal cipher (.getBytes plain-text "US-ASCII")))))

(defn ^String decrypt [^String base64-encoded]
  (let [cipher (doto (Cipher/getInstance "AES/ECB/PKCS5Padding")
                 (.init Cipher/DECRYPT_MODE (secret (config/aes-key))))]
    (String. (.doFinal cipher (base64-to-bytes base64-encoded)) "US-ASCII")))
