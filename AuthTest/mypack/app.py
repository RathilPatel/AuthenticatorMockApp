from appium import webdriver
from appium.webdriver.common.mobileby import MobileBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests , time , os
from browserstack.local import Local

def App_token():
    BROWSERSTACK_USERNAME = os.environ['BROWSERSTACK_USERNAME']
    BROWSERSTACK_ACCESS_KEY = os.environ['BROWSERSTACK_ACCESS_KEY']
    print("here")
    files = {
    # 'data': (None, '{"url": "https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk","custom_id":"AndroidDemoApp"}'),
    'file': ('./../app-debug.apk', open('./../app-debug.apk', 'rb')),
        'custom_id': (None, 'AuthMock'),
    }

    response = requests.post('https://api-cloud.browserstack.com/app-automate/upload', files=files, auth=(BROWSERSTACK_USERNAME,BROWSERSTACK_ACCESS_KEY))

    desired_caps = {
        "os_version" : "9.0",
    "device" : "OnePlus 7",
    "project" : "Sample-project",
    "build" : "Appium-android",
    "name" : "Test",
    "app" : "AuthMock",
    "browserstack.local":"true",

    }
    
    #  "autoWebview" : "true"
    try:
        APP_driver = webdriver.Remote("http://" + BROWSERSTACK_USERNAME + ":" + BROWSERSTACK_ACCESS_KEY + "@hub-cloud.browserstack.com/wd/hub", desired_caps)
        print("Started Test")

        webview = APP_driver.contexts[1]
        APP_driver.switch_to.context(webview)
        time.sleep(5)


        Username = APP_driver.find_element_by_id("login__username")

        Username.send_keys("User1")
        print(APP_driver.current_activity)

        time.sleep(5)

        web_token = APP_driver.find_element_by_id("password")
 
        web_token.send_keys("test1")
        print(APP_driver.current_activity)

        time.sleep(5)

        web_token.submit()

        time.sleep(5)



        login_token = APP_driver.find_element_by_id("login__token")

        time.sleep(5)
        token = login_token.get_attribute('value')
        print("Token Recieved: "+login_token.get_attribute('value'))
        

        time.sleep(5)

    finally:
        APP_driver.quit()

    return token



def Hello(name):
    print("Hello "+name)
    return 100

    