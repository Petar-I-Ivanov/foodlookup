package bg.pufmi.foodlookup.common.publicid;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Base64.Decoder;
import static java.util.Base64.Encoder;
import static java.util.Base64.getUrlDecoder;
import static java.util.Base64.getUrlEncoder;
import static javax.crypto.Cipher.DECRYPT_MODE;
import static javax.crypto.Cipher.ENCRYPT_MODE;
import static javax.crypto.Cipher.getInstance;
import static lombok.AccessLevel.PRIVATE;

import java.math.BigInteger;
import java.util.Optional;
import javax.crypto.spec.SecretKeySpec;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PublicIdUtils {

  static String ALGORITHM = "AES";
  static SecretKeySpec SECRET_KEY =
      new SecretKeySpec("5d4f326d7a334b694e7134743761773d".getBytes(UTF_8), ALGORITHM);
  static Encoder ENCODER = getUrlEncoder().withoutPadding();
  static Decoder DECODER = getUrlDecoder();

  private PublicIdUtils() {}

  public static String encode(Long id) {
    return Optional.ofNullable(id)
        .map(
            presentId -> {
              try {
                var cipher = getInstance(ALGORITHM);
                cipher.init(ENCRYPT_MODE, SECRET_KEY);
                return ENCODER.encodeToString(
                    cipher.doFinal(BigInteger.valueOf(presentId).toByteArray()));
              } catch (Exception e) {
                e.printStackTrace();
                return null;
              }
            })
        .orElse(null);
  }

  public static Long decode(String encodedId) {
    return Optional.ofNullable(encodedId)
        .map(
            presentId -> {
              try {
                var cipher = getInstance(ALGORITHM);
                cipher.init(DECRYPT_MODE, SECRET_KEY);
                return new BigInteger(cipher.doFinal(DECODER.decode(encodedId))).longValueExact();
              } catch (Exception e) {
                e.printStackTrace();
                return null;
              }
            })
        .orElse(null);
  }
}
