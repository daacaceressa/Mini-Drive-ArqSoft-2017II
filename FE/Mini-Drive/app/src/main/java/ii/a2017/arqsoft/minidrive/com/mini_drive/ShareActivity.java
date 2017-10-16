package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.InputFilter;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import cz.msebera.android.httpclient.Header;

public class ShareActivity extends AppCompatActivity {

    public static final int DEFAULT_MSG_LENGTH_LIMIT = 1000;
    private String filename, fileHashId;
    private EditText mShareUserEditText;
    private Button mShareButton;

    private View.OnClickListener mShareButtonOnClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            RequestParams params = new RequestParams();
            params.put("user_id", mShareUserEditText.getText());
            params.put("file_id", fileHashId);
            final MiniDriveApplication app = (MiniDriveApplication) getApplication();
            SharesRestClient.shareFile(app.getAUTHTOKEN(), params, new AsyncHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                    Toast.makeText(getApplicationContext(), "File shared.", Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                    Toast.makeText(getApplicationContext(), "There was a problem. Error: " + statusCode, Toast.LENGTH_SHORT).show();
                }
            });
            mShareUserEditText.setText("");
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share);

        getFilename();
        getFileHashId();
        this.setTitle(filename.substring(0, filename.length()-4));

        mShareButton = (Button) findViewById(R.id.shareButton);
        mShareUserEditText = (EditText) findViewById(R.id.shareUserEditText);

        mShareUserEditText.setFilters(new InputFilter[]{new InputFilter.LengthFilter(DEFAULT_MSG_LENGTH_LIMIT)});
        mShareButton.setOnClickListener(mShareButtonOnClickListener);
    }

    private void getFilename() {
        Intent myIntent = getIntent();
        filename = myIntent.getStringExtra("filename");
    }

    private void getFileHashId() {
        Intent myIntent = getIntent();
        fileHashId = myIntent.getStringExtra("fileHashId");
    }


}
