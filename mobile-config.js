App.info({
    id: 'com.Authdemo.app',
    name: 'Authenticator',
    description: 'DEMO AUTHENTICATOR',
    author: 'Rathil Patel',
    email: 'contact@example.com',
    website: 'LOL.COM'
  });

App.appendToConfig(`
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true"></application>
    </edit-config>
`);
