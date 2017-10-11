package ii.a2017.arqsoft.minidrive.com.mini_drive;

import com.loopj.android.http.*;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

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
                RequestParams params = new RequestParams();
                params.put("email", email.getText());
                params.put("password", password.getText());
                params.put("password_confirmation", passwordConfirmation.getText());
                UserRestClient.createUser(params, new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        Toast.makeText( getApplicationContext(), "User created", Toast.LENGTH_SHORT).show();
                        startActivity( new Intent( SignUpActivity.this, SignInActivity.class ) );
                        finish();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        if( statusCode == 400 ) {
                            Toast.makeText(getApplicationContext(), "User already created or passwords do not match", Toast.LENGTH_SHORT).show();
                        }
                        else {
                            Toast.makeText(getApplicationContext(), "There is an error in the server", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
                break;

        }
    }
}
