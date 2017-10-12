package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.github.angads25.filepicker.controller.DialogSelectionListener;
import com.github.angads25.filepicker.model.DialogConfigs;
import com.github.angads25.filepicker.model.DialogProperties;
import com.github.angads25.filepicker.view.FilePickerDialog;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import java.io.File;
import java.io.FileNotFoundException;

import cz.msebera.android.httpclient.Header;

public class MainMenuActivity extends AppCompatActivity {

    private Button mNewFileButton;
    private DialogProperties properties = new DialogProperties();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setFilePickerProperties();

        mNewFileButton = (Button) findViewById(R.id.newFileButton);

        mNewFileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FilePickerDialog dialog = new FilePickerDialog(MainMenuActivity.this,properties);
                dialog.setTitle("Select a File");

                dialog.setDialogSelectionListener(new DialogSelectionListener() {
                    @Override
                    public void onSelectedFilePaths(String[] files) {
                        for (String filepath: files) {
                            RequestParams params = new RequestParams();
                            File myFile = new File(filepath);
                            try {
                                params.put("file", myFile);
                            } catch(FileNotFoundException e) {}
                            final MiniDriveApplication app = (MiniDriveApplication) getApplication();
                            FilesRestClient.uploadFile(app.getAUTHTOKEN(), params, new AsyncHttpResponseHandler() {
                                @Override
                                public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                                    Toast.makeText(getApplicationContext(), "File uploaded.", Toast.LENGTH_SHORT).show();
                                }

                                @Override
                                public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                                    Toast.makeText(getApplicationContext(), "Failed uploading the file.", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                    }
                });

                dialog.show();
            }
        });

    }

    private void setFilePickerProperties() {
        properties.selection_mode = DialogConfigs.SINGLE_MODE;
        properties.selection_type = DialogConfigs.FILE_SELECT;
        properties.root = new File(DialogConfigs.DEFAULT_DIR);
        properties.error_dir = new File(DialogConfigs.DEFAULT_DIR);
        properties.offset = new File(DialogConfigs.DEFAULT_DIR);
        properties.extensions = null;
    }
}
