import com.walmart.platform.jose.Payload;
import com.walmart.platform.jose.crypto.JsonWebEncryptionUtil;
import com.walmart.platform.jose.jwk.JsonOctetSequenceKey;
import com.walmart.platform.jose.jwk.JsonRSAKey;
import com.walmart.platform.jose.jwk.JsonWebKey;
import com.walmart.platform.jwt.ReadOnlyJWTClaimsSet;


public class DemoTest {
  
  public static void main(String[] args) throws Exception {
    String idTokenEncKey=
      "{\"kty\":\"oct\",\"use\":\"enc\",\"kid\":\"b57e36cd-f817-4705-a5cb-a30558634e29\",\"k\":\"ZBO7fRcaOCfQIaA5eDK4aA\"}";
    String idTokenSignKey=
      "{\"kty\":\"RSA\",\"e\":\"AQAB\",\"use\":\"sig\",\"kid\":\"50597f7f-c55b-4e4a-9691-a54f3f5da6fc\",\"alg\":\"RSA1_5\",\"n\":\"hKvJQyntP1Okpjwbr1DsgT4u3D0e-xBbaVx_tpinTn3wPRYFwat1G39A5j673bnJrNlkdmrfgq5UHMU1dXG4U4Ad5KemzCEOVDgw3T9bElPPPpN-HOK24UoHGOIQgt_RpSvIcRKiTeRQoFnGICQPxP3lo1XLVB7Le7sXMDwR2bs\"}";
    
    JsonOctetSequenceKey idTokenEncJsonKey=(JsonOctetSequenceKey)JsonWebKey.parse(idTokenEncKey);
    
    JsonRSAKey idTokenVerificationJsonKey=(JsonRSAKey)JsonWebKey.parse(idTokenSignKey);
    
    String idToken="eyJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiZGlyIn0..CktrMvdCTOtSd0Ny.3nrrdf06ZmbXn_FDkNFw3jcpk9d57g1HvWKmUgN8UOpx6cDbPyw45pR16u0A0g0s9lxxFYdzUGRtAGAvHFVvgagpEgJvHLSk1MopBLNu6mZsUj-BQSnnjWLsyvSuE4Al7IHMUCRyLne_mlPLulqI773l5AfSdJFYk0nmMhJp7xYwV1NBzAflnC5_STvUat9fb8Yd_nvUhNKOtL8miXafoECGHoA1FPDz46zLvGDwvdOsGmurKdz0eIQqX_ezTj1CkUGSQw7SF7-zsDE5kUkfu7rStuLQ-ntLOr4OKVq3creMUhTZ5N-3mGeBc03CPn6pJfqppVF7OEhDF_lm1gy2SehpjPIqDIOcIEnFVle4PlDmwrO5RFMLuP0-VDd__HTMmo79Jvsx5mLLn5nqfSVUCvWBuLfyPdFTz_p8JY5ViY0vcq6CSlOhYGYMF0EsB0YSMcSfl-P4almv7X7as2zPP3mbENFy3peWG5Hchepi9NT5dfJHVARBku2FgP2_eV41DgNNk_NMoGzy_4rhIB0sjg1TW8q2unYheVnUnPWSxYoIbqmB0DVxHMeKm9H_K_gzrIufeaFZBfdi3DMPd1hITqQEmpCDBnH1b3nA5O0JMhyBt5gPC6PLA0EhdN-NPdbVBuERlOhrqA_3eIH-gySeVfxmQil0GusHfdpnh1-cd3uuSRb9VzY4Zq1qa_iQwi3e71f7HkXGtQOqb_O3b864bGAZ_C4jAShUvsez9cHAPYSGP0SKCTEVCOkKFxEEY_BrUitppsxIrTJjiRIK92XzDRBk0xFF25fE6O_lwrjrCWYtGPjaE8Bob4aZoAtnfVYU_SDvtA79J7ItDnvROUaUskE9Od-SK1wFlBblvRNlKyzr7nvRh-6y2mpP70L2tsskjxb9Y1HET1cnAPB8pWWwCYihq4AK0o7C9X1ROnHvsR_bRx6YjgPiW_N8Zlv_u9cMUzu_HxHaBhl9TK5pPKi1T0IWJr56lN4jyW0di4dIyxICU3MflKbX7AagG3igk3BvoWcfw2P4r72yjaZHAbGAiDuO1SFuleNsN4RL9oGwalxOJhsU0_RYg7bhysevsw-Np7ZAGtF5KcVy74sD9A0HcPihNkLWUs59hHgV7PJGHZAkvap3IPolRshv-a6FC9v110P5eWNMfK0cGNmPW_Euyn5GO5LRHdbJpWDPJhzWsOrzWeUMO9cUM2Ns2iNvXr7VRqjJWYGaj2iKLE6gSDOm-0DxKQ6j2DeIzfGija5Au9m_CxDE-SFT5btwIsMK22tV6A3Fn8r1Wz41nlDcrHg5dVfoCKZb_FgsUYsUKoVpSRw-W-lWZeZu-1WojSA-74n4DEcqf6AYYEgs11jf0jIfkMSRH4NXP8eBDiy3Nd0-cfzIyTr2-w4ceMhuxLqnl6bFjb9Zgp85XtCEB0__TdrhUv93-C38AZXc8XOEAFA5qCYJwvEWAk6OvHrqizZqB6DuePmRBmfsv7pEwRyH1JknH5RcpevwfpJOL4TCcsmgbFBl9U-bhosoWM5t3hezL6cEuCkvYU5HycK85PSrxb2AzLHawo3SUk21bGZl3lwOF9culM3OszT4Oq7XiKS1gPY7EtIcni5fBIf-Tdi1iy11523vsR74BoTjoVUm-CK5wiHQuVfg4gXknp40v4E.iYBu5sA3RkZBB0R5dhTrWg";
        
    Payload payload=JsonWebEncryptionUtil.decryptTokenValue(new Payload(idToken), idTokenEncJsonKey);
    
    System.out.println("Decrypted ID token value-->"+payload);
    
    ReadOnlyJWTClaimsSet claimsSet=JsonWebEncryptionUtil.decryptAndVerify(new Payload(idToken), idTokenEncJsonKey, idTokenVerificationJsonKey);
  
    System.out.println(claimsSet.getAllClaims());
  
  }
  
}
