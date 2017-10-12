package ii.a2017.arqsoft.minidrive.com.mini_drive;
import ii.a2017.arqsoft.minidrive.com.mini_drive.R;

import com.loopj.android.http.*;

public class CategoriesRestClient {
    private static final String BASE_URL = "http://35.188.6.128:4000";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static void getCategoriesFromFile(String AUTHTOKEN, String fileId, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/showCategories/file/" + fileId), params, responseHandler);
    }

    public static void deleteAllCategoriesFromFile(String AUTHTOKEN, String fileId, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.delete(getAbsoluteUrl("/categories/file/" + fileId), params, responseHandler);
    }

    public static void showFilesByCategory(String AUTHTOKEN, String categoryName, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/showFiles/category/" + categoryName), params, responseHandler);
    }

    public static void addCategories(String AUTHTOKEN, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.post(getAbsoluteUrl("/addCategories"), params, responseHandler);
    }

    public static void removeCategories(String AUTHTOKEN, RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.post(getAbsoluteUrl("/removeCategories"), params, responseHandler);
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}
