# How to host the website?

### Note: For Devs Only... 
Firebase calls must be done in cmd or git bash...(Aka linux terminals)

## 1st Time Users:
Login into firebase using:

__firebase login__

## Locally: 
__firebase emulators:start --only functions,hosting__

## Publically:
__firebase deploy --only functions,hosting__

Note: these function calls are located in /functions/package.json 

## Other details 

### How to avoid tracking a git file? 
git update-index --assume-unchanged FILE_NAME

### How to revert these changes to allow to git to track changes?
git update-index --no-assume-unchanged FILE_NAME