package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Environment;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.InputFilter;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import cz.msebera.android.httpclient.Header;

public class CategoriesActivity extends AppCompatActivity {

    public static final int DEFAULT_MSG_LENGTH_LIMIT = 1000;
    private String filename, fileHashId;

    private ListView mCategoriesListView;
    private EditText mNewCategoryEditText;
    private Button mAddCategoryButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_categories);

        getFilename();
        getFileHashId();
//        this.setTitle(filename.substring(0, filename.length()-4));

        getAllCategories(filename);

        mCategoriesListView = (ListView) findViewById(R.id.categoriesListView);
        mNewCategoryEditText = (EditText) findViewById(R.id.newCategoryEditText);
        mAddCategoryButton = (Button) findViewById(R.id.addCategoryButton);

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
                // Send request to add new category.
                RequestParams params = new RequestParams();
                params.put("category", mNewCategoryEditText.getText());
                final MiniDriveApplication app = (MiniDriveApplication) getApplication();
                CategoriesRestClient.addCategory(app.getAUTHTOKEN(), fileHashId, params, new AsyncHttpResponseHandler() {
                    @Override
                    public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                        Toast.makeText(getApplicationContext(), "Category added.", Toast.LENGTH_SHORT).show();
                        getAllCategories(filename);
                    }

                    @Override
                    public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                        Toast.makeText(getApplicationContext(), "There was a problem. Error: " + statusCode, Toast.LENGTH_SHORT).show();
                    }
                });
                mNewCategoryEditText.setText("");
            }
        });
    }

    private AdapterView.OnItemLongClickListener mCategoriesListViewListener = new AdapterView.OnItemLongClickListener() {
        @Override
        public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
            final String selected = (String) mCategoriesListView.getItemAtPosition(position);

            AlertDialog.Builder builder = new AlertDialog.Builder(CategoriesActivity.this);
            builder.setMessage(R.string.delete_category)
                    .setTitle(filename)
                    .setPositiveButton(R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            RequestParams params = new RequestParams();
                            params.put("category", selected);
                            final MiniDriveApplication app = (MiniDriveApplication) getApplication();
                            CategoriesRestClient.removeCategory(app.getAUTHTOKEN(), fileHashId, params, new AsyncHttpResponseHandler() {
                                @Override
                                public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                                    Toast.makeText(getApplicationContext(), "Category deleted", Toast.LENGTH_SHORT).show();
                                    getAllCategories(filename);
                                }

                                @Override
                                public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                                    Toast.makeText(getApplicationContext(), "There was a problem. Error: " + statusCode, Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                    })
                    .setNegativeButton(R.string.no, null);
            AlertDialog dialog = builder.create();
            dialog.show();
            return true;
        }
    };

    private void getAllCategories(String filename) {
        RequestParams params = new RequestParams();
        final MiniDriveApplication app = (MiniDriveApplication) getApplication();
        CategoriesRestClient.getCategoriesFromFile(app.getAUTHTOKEN(), fileHashId, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                // Pull out the categories
                ArrayList<String> categories = new ArrayList<>();
                try {
                    JSONArray tmp = response.getJSONArray("categories");
                    for (int i = 0; i < tmp.length(); i++) {
                        categories.add(tmp.getString(i));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                ArrayAdapter adapter = new ArrayAdapter<String>(getApplicationContext(),R.layout.item_category,categories);
                mCategoriesListView.setAdapter(adapter);

                mCategoriesListView.setOnItemLongClickListener(mCategoriesListViewListener);
            }

            @Override
            public void onFailure (int statusCode,  Header[] headers, String response, Throwable error) {
                if (statusCode == 404) {
                    Toast.makeText(getApplicationContext(), "File does not have categories.", Toast.LENGTH_SHORT).show();
                }
            }
        });
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
