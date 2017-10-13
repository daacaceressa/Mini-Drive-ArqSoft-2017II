package ii.a2017.arqsoft.minidrive.com.mini_drive;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.FileAsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;


public class FilesRestClient {
    private static final String BASE_URL = "http://35.188.6.128:4000";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void uploadFile(String AUTHTOKEN, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.post(getAbsoluteUrl("/files/uploadFile"), params, responseHandler);
    }

    public static void listFiles(String AUTHTOKEN, RequestParams params, JsonHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/files/listOfFiles"), params, responseHandler);
    }

    public static void downloadFile( String AUTHTOKEN, String file, RequestParams params, FileAsyncHttpResponseHandler responseHandler ) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/files/downloadFile/"+file), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}
