package ii.a2017.arqsoft.minidrive.com.mini_drive;

import android.app.Application;

public class MiniDriveApplication extends Application {
    private String AUTHTOKEN;

    public String getAUTHTOKEN() {
        return AUTHTOKEN;
    }

    public void setAUTHTOKEN(String str) {
        this.AUTHTOKEN = str;
    }

}
