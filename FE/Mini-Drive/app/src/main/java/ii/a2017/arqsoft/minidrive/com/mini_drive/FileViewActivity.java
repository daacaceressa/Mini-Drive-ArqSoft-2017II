package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

import org.w3c.dom.Text;

public class FileViewActivity extends AppCompatActivity {

    private String filename;
    private TextView mFilenameTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file_view);

        getFilename();

        mFilenameTextView = (TextView) findViewById(R.id.filenameTextView);
        mFilenameTextView.setText(filename);
    }

    private void getFilename() {
        Intent myIntent = getIntent();
        filename = myIntent.getStringExtra("filename");
    }

}
