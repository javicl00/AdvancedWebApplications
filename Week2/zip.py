'''
create a script that makes a .zip file of a directory without node_modules. The name should be the name of the directory with the date and time appended to it. 
For example, if the directory is called "test" and the date and time is 2019-01-01 13:00:00, 
the name of the zip file should be "test-2019-01-01-13-00-00.zip". The script should print the name of the zip file to the screen when it's done.
inside the zip file, the directory structure shouldnt be preserved. So if its a directory called "test" with a file called "test.txt" inside it,
the zip file should have a file called "test.txt" in it, not a directory called "test" with a file called "test.txt" inside it.
'''
#!/usr/bin/env python3
import os
import datetime
import zipfile

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))
    
def main():
    now = datetime.datetime.now()
    date = now.strftime("%Y-%m-%d-%H-%M-%S")
    path = os.getcwd()
    dir_name = os.path.basename(path)
    zip_name = dir_name + "-" + date + ".zip"
    zipf = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) 
    zipdir(path, zipf)
    zipf.close()
    print(zip_name)
    
if __name__ == "__main__":
    main()
    
'''
winrar cannot open it

'''
