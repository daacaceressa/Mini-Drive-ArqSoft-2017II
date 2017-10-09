package ii.a2017.arqsoft.minidrive.com.mini_drive;

import com.loopj.android.http.*;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import cz.msebera.android.httpclient.Header;

public class SignUpActivity extends AppCompatActivity implements View.OnClickListener {

    EditText email, password, passwordConfirmation;
    Button signUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        email = (EditText) findViewById(R.id.emailSignUp);
        password = (EditText) findViewById(R.id.passwordSignUp);
        passwordConfirmation = (EditText) findViewById(R.id.passwordConfirmationSignUp);
        signUp = (Button) findViewById(R.id.signUpButton);

        signUp.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.signUpButton:
                /*try {
                    URL url = new URL( getString( R.string.API_URL ) + "/users" );
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.setRequestMethod( "POST" );
                    urlConnection.setRequestProperty("email", email.toString());
                    urlConnection.setRequestProperty("password", email.toString());
                    urlConnection.setRequestProperty("password_confirmation", passwordConfirmation.toString());
                    urlConnection.connect();
                    Toast.makeText( getApplicationContext(), urlConnection.getResponseCode()+"", Toast.LENGTH_SHORT).show();
                    if( urlConnection.getResponseCode() == 201 ){

                    }
                    else {

                    }
                    urlConnection.disconnect();
                } catch (Exception e) {
                    Toast.makeText( getApplicationContext(), e.toString(), Toast.LENGTH_SHORT).show();
                    e.printStackTrace();
                }*/
                AsyncHttpClient client = new AsyncHttpClient();
                client.get(getString( R.string.API_URL ), new AsyncHttpResponseHandler() {

                    @Override
                    public void onStart() {
                        //Toast.makeText( getApplicationContext(), "Hola", Toast.LENGTH_SHORT).show();
                        // called before request is started
                    }

                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] response) {
                        Toast.makeText( getApplicationContext(), "success", Toast.LENGTH_SHORT).show();
                        // called when response HTTP status is "200 OK"
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] errorResponse, Throwable e) {
                        Toast.makeText( getApplicationContext(), "La puta que me pario", Toast.LENGTH_SHORT).show();
                        // called when response HTTP status is "4XX" (eg. 401, 403, 404)
                    }

                    @Override
                    public void onRetry(int retryNo) {
                        // called when request is retried
                    }
                });
                break;

        }
    }
}
