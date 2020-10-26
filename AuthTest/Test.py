from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os,time
from browserstack.local import Local
from mypack import app


BROWSERSTACK_USERNAME = os.environ['BROWSERSTACK_USERNAME']
BROWSERSTACK_ACCESS_KEY = os.environ['BROWSERSTACK_ACCESS_KEY']


bs_local = Local()
bs_local_args = { "key": BROWSERSTACK_ACCESS_KEY }
bs_local.start(**bs_local_args)


desired_cap = {
'browser': 'Chrome',
 'browser_version': 'latest',
 'os': 'Windows',
 'os_version': '10',
 'resolution': '1024x768',
 'name': 'Python Sample Single Test',
 'build':'Selenium Sync',
 'browserstack.debug':'true',
 'browserstack.local':'true',
 'browserstack.idleTimeout':300
}


driver = webdriver.Remote(
    command_executor='https://%s:%s@hub-cloud.browserstack.com/wd/hub' % (BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY),
    desired_capabilities=desired_cap)

try:
    print("Single Test Started...")


    driver.get("http://localhost:3000")

    time.sleep(5)
    # if not "Google" in driver.title:
    #     raise Exception("Unable to load google page!")
    username = driver.find_element_by_name("username")
    username.send_keys("User1")
    password = driver.find_element_by_name("password")
    password.send_keys("test1")
    # gen_token = driver.find_element_by_name("Generate Token")
    # gen_token.click()
    password.submit()

    website_token = driver.find_element_by_id("web__token")

    ############# Start Mobile Code Here!!! 
    print(website_token.get_attribute('value'))
    log_token_value = app.App_token(website_token.get_attribute('value'))
    driver.title

    ############# Stop Mobile Code Here!!!
    login_token = driver.find_element_by_name("app_token")
    login_token.send_keys(log_token_value)

    signin = driver.find_element_by_id("signin")
    signin.click()
    time.sleep(10)
    message = driver.find_element_by_id("message")
    print(message.get_attribute('name'))
    if (message.get_attribute('name') == 'success-message'):
        driver.execute_script('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed", "reason": "Login Success"}}')
    else:
        driver.execute_script('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed", "reason": "Login Failure"}}')
except:
    print("Exception Occured!!!!!")
    driver.execute_script('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed", "reason": "Local Exception Occoured. Look for Possible Server Errors."}}')


finally:
    print (driver.title)
    driver.quit()
    bs_local.stop()

