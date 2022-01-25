from appium import webdriver
# from selenium import webdriver
from appium.webdriver.common.mobileby import MobileBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests , time , os
from browserstack.local import Local
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def App_token(token):
    BROWSERSTACK_USERNAME = os.environ['BROWSERSTACK_USERNAME']
    BROWSERSTACK_ACCESS_KEY = os.environ['BROWSERSTACK_ACCESS_KEY']

    files = {
    # 'data': (None, '{"url": "https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk","custom_id":"AndroidDemoApp"}'),
    'file': (BASE_DIR+'/app-debug.apk', open(BASE_DIR+'/app-debug.apk', 'rb')),
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
    "browserstack.networkLogs":"true",

    }
    
    #  "autoWebview" : "true"
    try:
        APP_driver = webdriver.Remote("http://" + BROWSERSTACK_USERNAME + ":" + BROWSERSTACK_ACCESS_KEY + "@hub-cloud.browserstack.com/wd/hub", desired_caps)
        print("Started Test")
        print(APP_driver.contexts)
        webview = APP_driver.contexts[1]
        APP_driver.switch_to.context(webview)
        time.sleep(5)


        Username = APP_driver.find_element_by_id("login__username")
        # WebDriverWait(driver, 30).until(
        # EC.element_to_be_clickable((MobileBy.ID, "login__username"))
        # )   
        Username.send_keys("User1")
        print(APP_driver.current_activity)

        time.sleep(5)

        web_token = APP_driver.find_element_by_id("web__token")
        # WebDriverWait(driver, 30).until(
        # EC.element_to_be_clickable((MobileBy.ID, "web__token"))
        # )
        web_token.send_keys(token)
        print(APP_driver.current_activity)

        time.sleep(5)

        web_token.submit()

        time.sleep(5)

      

        login_token = APP_driver.find_element_by_id("login__token")
        # WebDriverWait(driver, 30).until(
        # EC.element_to_be_clickable((MobileBy.ID, "login__token"))
        # )
        # login_token.send_keys("Sample")
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

    