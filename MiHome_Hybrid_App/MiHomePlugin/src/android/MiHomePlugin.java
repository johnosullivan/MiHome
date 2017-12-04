package cordova.plugin.mihomeplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.widget.Toast;
import android.util.Log;
import android.view.Gravity;

/**
 * This class echoes a string called from JavaScript.
 */
public class MiHomePlugin extends CordovaPlugin {
    private static final int GRAVITY_CENTER = Gravity.CENTER_VERTICAL|Gravity.CENTER_HORIZONTAL;
    private static final String TAG = "MiHomeCordovaPlugin";
    String messageReceived;
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        Log.v(TAG, "Look, a message: "+message);
        messageReceived = message;
            if (message != null && message.length() > 0) {
                cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {

                final android.widget.Toast toast = android.widget.Toast.makeText(
                cordova.getActivity().getWindow().getContext(),
                messageReceived,
                android.widget.Toast.LENGTH_LONG 
                    );
                    toast.setGravity(GRAVITY_CENTER, 0, 0);
                    toast.show();
                }
                });
                callbackContext.success(message);
            } else {
                callbackContext.error("Expected one non-empty string argument.");
            }
    }
}
