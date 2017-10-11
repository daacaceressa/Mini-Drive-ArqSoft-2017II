package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.app.Application;
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

import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import cz.msebera.android.httpclient.Header;

public class SignInActivity extends AppCompatActivity implements View.OnClickListener{

    EditText email, password;
    Button signIn, registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        email = (EditText) findViewById(R.id.emailSignIn);
        password = (EditText) findViewById(R.id.passwordSignIn);
        signIn = (Button) findViewById(R.id.signInButton);
        registerButton = (Button) findViewById(R.id.registerButton);

        signIn.setOnClickListener(this);
        registerButton.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.signInButton:
                RequestParams params = new RequestParams();
                params.put("email", email.getText());
                params.put("password", password.getText());
                final MiniDriveApplication app = (MiniDriveApplication) this.getApplication();
                UserRestClient.loginUser(params, new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        for( int i = 0; i < headers.length; ++i ) {
                            if( headers[i].getName().equals("AUTHTOKEN") ) {
                                app.setAUTHTOKEN( headers[i].getValue() );
                            }
                        }
                        Toast.makeText(getApplicationContext(), "Logged in", Toast.LENGTH_SHORT).show();
                        startActivity( new Intent( SignInActivity.this, MainMenuActivity.class ) );
                        finish();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        if (statusCode == 401) {
                            Toast.makeText(getApplicationContext(), "Incorrect password", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(getApplicationContext(), "There is an error in the server", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
                break;
            case R.id.registerButton:
                startActivity( new Intent( SignInActivity.this, SignUpActivity.class ) );
                finish();
                break;
        }
    }
}
