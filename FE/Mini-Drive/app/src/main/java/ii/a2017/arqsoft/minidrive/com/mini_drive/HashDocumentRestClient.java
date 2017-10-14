package ii.a2017.arqsoft.minidrive.com.mini_drive;
import ii.a2017.arqsoft.minidrive.com.mini_drive.R;

import com.loopj.android.http.*;

public class HashDocumentRestClient {
    private static final String BASE_URL = "http://35.188.6.128:4000";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void getFileId(String AUTHTOKEN, String filename, RequestParams params, JsonHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/hash/getHashByPath/" + filename), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}
