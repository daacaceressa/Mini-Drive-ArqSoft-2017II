package ii.a2017.arqsoft.minidrive.com.mini_drive;
import android.support.v7.app.AppCompatActivity;

import com.loopj.android.http.*;

class UserRestClient extends AppCompatActivity {
    private static final String BASE_URL = "http://35.188.6.128:4000";

    static AsyncHttpClient client = new AsyncHttpClient();

    public static void createUser(RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.post(getAbsoluteUrl("/user/createUser"), params, responseHandler);
    }

    public static void loginUser(RequestParams params, AsyncHttpResponseHandler responseHandler) {
        client.post(getAbsoluteUrl("/user/loginUser"), params, responseHandler);
    }

    //Example for adding headers, not really used in application
    public static void validate(String AUTHTOKEN, RequestParams params, AsyncHttpResponseHandler responseHandler ) {
        client.addHeader("AUTHTOKEN", AUTHTOKEN);
        client.get(getAbsoluteUrl("/user/validate"), params, responseHandler);
        /*This is how it should be called
                UserRestClient.validate(((MiniDriveApplication) this.getApplication()).getAUTHTOKEN(), new RequestParams(), new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        Toast.makeText(getApplicationContext(), "Authorized", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        if (statusCode == 401) {
                            Toast.makeText(getApplicationContext(), headers[0].getValue(), Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(getApplicationContext(), "There is an error in the server", Toast.LENGTH_SHORT).show();
                        }
                    }
                });*/
    }

    private static String getAbsoluteUrl(String relativeUrl) {
        return BASE_URL + relativeUrl;
    }
}