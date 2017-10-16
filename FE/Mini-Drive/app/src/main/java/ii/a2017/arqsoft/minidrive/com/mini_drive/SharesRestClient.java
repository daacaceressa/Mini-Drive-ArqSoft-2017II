package ii.a2017.arqsoft.minidrive.com.mini_drive;
import ii.a2017.arqsoft.minidrive.com.mini_drive.R;

import com.loopj.android.http.*;

public class SharesRestClient {
    private static final String BASE_URL = "http://35.188.6.128:4000";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void shareFile(String AUTHTOKEN, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.post(getAbsoluteUrl("/share/postShares"), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}
