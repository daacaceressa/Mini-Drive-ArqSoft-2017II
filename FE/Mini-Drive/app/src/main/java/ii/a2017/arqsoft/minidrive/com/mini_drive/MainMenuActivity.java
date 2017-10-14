package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.Intent;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.github.angads25.filepicker.controller.DialogSelectionListener;
import com.github.angads25.filepicker.model.DialogConfigs;
import com.github.angads25.filepicker.model.DialogProperties;
import com.github.angads25.filepicker.view.FilePickerDialog;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.FileAsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class MainMenuActivity extends AppCompatActivity implements View.OnClickListener {

    private Button mNewFileButton, signOutButton;
    private DialogProperties properties = new DialogProperties();
    private ListView mFilesListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setFilePickerProperties();
        getAllFiles();

        mNewFileButton = (Button) findViewById(R.id.newFileButton);
        mFilesListView = (ListView) findViewById(R.id.filesListView);
        signOutButton = (Button) findViewById(R.id.signOutMain);
        signOutButton.setOnClickListener(this);

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
                                    getAllFiles();
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

    private void getAllFiles() {
        RequestParams params = new RequestParams();
        final MiniDriveApplication app = (MiniDriveApplication) getApplication();
        FilesRestClient.listFiles(app.getAUTHTOKEN(), params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // If the response is JSONObject instead of expected JSONArray
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                // Pull out the files from the response
                ArrayList<String> files = new ArrayList<>();
                for (int i = 0; i < response.length(); i++) {
                    JSONObject file = null;
                    try {
                        file = response.getJSONObject(i);
                        files.add(file.getString("name"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                ArrayAdapter adapter = new ArrayAdapter<String>(getApplicationContext(),R.layout.item_category,files);
                mFilesListView.setAdapter(adapter);

                mFilesListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        String selected = (String) mFilesListView.getItemAtPosition(position);
                        downloadFile( selected );
                    }
                });
            }
        });
    }

    private void downloadFile(final String selected ) {
        FilesRestClient.downloadFile(((MiniDriveApplication) this.getApplication()).getAUTHTOKEN(), selected, new RequestParams(), new FileAsyncHttpResponseHandler(this) {
            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, File file) {
                if (statusCode == 404) {
                    Toast.makeText(getApplicationContext(), "File does not exist", Toast.LENGTH_SHORT).show();
                } else if( statusCode == 406 ){
                    Toast.makeText(getApplicationContext(), "There is an error with the file name", Toast.LENGTH_SHORT).show();
                }
                else {
                    Toast.makeText(getApplicationContext(), "There is an error in the server", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, File file) {
                File folder = new File(getExternalCacheDir(), "Files");
                if (!folder.exists()) {
                    System.out.println("Yes");
                    folder.mkdirs();
                }

                File downloadedFile = new File(folder, file.getName());
                System.out.println(file.getName());
                try {
                    copyFile(file, downloadedFile);
                    Intent showFileIntent = new Intent( MainMenuActivity.this, FileViewActivity.class );
                    showFileIntent.putExtra("filename", selected);
                    showFileIntent.putExtra("filePath", downloadedFile.getAbsolutePath());
                    startActivity(showFileIntent);
                } catch (IOException e) {
                    Toast.makeText(getApplicationContext(), "Error downloading the file.", Toast.LENGTH_SHORT).show();
                    e.printStackTrace();
                }
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

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.signOutMain:
                UserRestClient.logOut(((MiniDriveApplication) this.getApplication()).getAUTHTOKEN(), new RequestParams(), new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        Toast.makeText(getApplicationContext(), "Logged out", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(MainMenuActivity.this, SignInActivity.class));
                        finish();
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        if (statusCode == 400) {
                            Toast.makeText(getApplicationContext(), "There was a problem", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(getApplicationContext(), statusCode+"", Toast.LENGTH_SHORT).show();
                        }
                    }
                });

                break;
        }
    }

    public static void copyFile(File src, File dst) throws IOException {
        InputStream in = new FileInputStream(src);
        try {
            OutputStream out = new FileOutputStream(dst);
            try {
                // Transfer bytes from in to out
                byte[] buf = new byte[1024];
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
            } finally {
                out.close();
            }
        } finally {
            in.close();
        }
    }

}
