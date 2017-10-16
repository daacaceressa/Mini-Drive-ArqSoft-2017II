package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.github.barteksc.pdfviewer.PDFView;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.File;

import cz.msebera.android.httpclient.Header;

public class FileViewActivity extends AppCompatActivity {

    private String filename, filePath, fileHashId;
    private PDFView mPDFView;
    private Button mShareFileButton, mEditCategoryButton;

    private View.OnClickListener mShareFileButtonListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent showFileIntent = new Intent( FileViewActivity.this, ShareActivity.class );
            showFileIntent.putExtra("filename", filename);
            showFileIntent.putExtra("fileHashId", fileHashId);
            startActivity(showFileIntent);
        }
    };
    private View.OnClickListener mEditCategoryButtonListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent showFileIntent = new Intent( FileViewActivity.this, CategoriesActivity.class );
            showFileIntent.putExtra("filename", filename);
            showFileIntent.putExtra("fileHashId", fileHashId);
            startActivity(showFileIntent);
        }
    };;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file_view);

        getFilename();
        getFilePath();

        this.setTitle(filename.substring(0, filename.length()-4));

        mPDFView = (PDFView) findViewById(R.id.pdfView);
        mShareFileButton = (Button) findViewById(R.id.shareFileButton);
        mEditCategoryButton = (Button) findViewById(R.id.editCategoryButton);

        getFileHashId(filename);

        // Always reset PDF before showing it up.
        reinitPdfView();
        mPDFView.fromFile( new File(filePath) ).defaultPage(0).enableSwipe(true).load();
    }

    private void getFileHashId(String filename) {
        // Disable buttons until callback is called.
        mShareFileButton.setEnabled(false);
        mEditCategoryButton.setEnabled(false);

        RequestParams params = new RequestParams();
        final MiniDriveApplication app = (MiniDriveApplication) getApplication();
        HashDocumentRestClient.getFileId(app.getAUTHTOKEN(), filename, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                System.out.println(response);
                try {
                    fileHashId = response.getString("id");
                    mShareFileButton.setEnabled(true);
                    mEditCategoryButton.setEnabled(true);
                    mShareFileButton.setOnClickListener(mShareFileButtonListener);
                    mEditCategoryButton.setOnClickListener(mEditCategoryButtonListener);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable error, JSONObject response) {
                System.out.println(response);
                Toast.makeText(getApplicationContext(), "There was a problem. Error: " + statusCode, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void getFilename() {
        Intent myIntent = getIntent();
        filename = myIntent.getStringExtra("filename");
    }

    private void getFilePath() {
        Intent myIntent = getIntent();
        filePath = myIntent.getStringExtra("filePath");
        System.out.println(filePath);
    }

    private void reinitPdfView(){
        ViewGroup group = (ViewGroup) mPDFView.getParent();
        group.removeView(mPDFView);
        mPDFView = null;
        mPDFView = new PDFView(this, null);
        mPDFView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        group.addView(mPDFView);
    }

}
