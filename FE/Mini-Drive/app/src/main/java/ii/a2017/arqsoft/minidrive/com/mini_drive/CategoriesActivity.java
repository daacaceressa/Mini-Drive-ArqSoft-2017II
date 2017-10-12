package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.InputFilter;
import android.text.TextWatcher;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class CategoriesActivity extends AppCompatActivity {

    public static final int DEFAULT_MSG_LENGTH_LIMIT = 1000;

    private ListView mCategoriesListView;
    private EditText mNewCategoryEditText;
    private Button mAddCategoryButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_categories);

        String fileId = "";
        ArrayList<String> categories = getCategories(fileId);


        mCategoriesListView = (ListView) findViewById(R.id.categoriesListView);
        mNewCategoryEditText = (EditText) findViewById(R.id.newCategoryEditText);
        mAddCategoryButton = (Button) findViewById(R.id.addCategoryButton);

        ArrayAdapter adapter = new ArrayAdapter<String>(this,R.layout.item_category,categories);
        mCategoriesListView.setAdapter(adapter);

        // Enable Send button when there's text to send
        mNewCategoryEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if (charSequence.toString().trim().length() > 0) {
                    mAddCategoryButton.setEnabled(true);
                } else {
                    mAddCategoryButton.setEnabled(false);
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });
        mNewCategoryEditText.setFilters(new InputFilter[]{new InputFilter.LengthFilter(DEFAULT_MSG_LENGTH_LIMIT)});

        // Send button sends a message and clears the EditText
        mAddCategoryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                mNewCategoryEditText.getText();
                // send request to add new category.
//
                // Push to the database

                // Clear input box
                mNewCategoryEditText.setText("");
            }
        });
    }

    private ArrayList<String> getCategories(String fileId) {
        // TODO: implement this function
        ArrayList<String> ret = new ArrayList<>();
        ret.add("tag1");
        ret.add("tag2");
        return ret;
    }

}
