package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.github.barteksc.pdfviewer.PDFView;

import org.w3c.dom.Text;

import java.io.File;

public class FileViewActivity extends AppCompatActivity {

    private String filename, filePath;
    private TextView mFilenameTextView;
    private PDFView mPDFView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file_view);

        getFilename();
        getFilePath();

        mFilenameTextView = (TextView) findViewById(R.id.filenameTextView);
        mFilenameTextView.setText(filename);

        mPDFView = (PDFView) findViewById(R.id.pdfView);
        reinitPdfView();
        mPDFView.fromFile( new File(filePath) ).defaultPage(0).enableSwipe(true).load();
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
