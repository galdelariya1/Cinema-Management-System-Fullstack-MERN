const jFile = require('jsonfile');

const usersFilePath = './permissions/users.json';
const permissionsFilePath = "./permissions/permissions.json";

const readUsersData = function()
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(usersFilePath,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}

const writeUsersData = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jFile.writeFile(usersFilePath, obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('User Succeeded');
            }
        })
    })
}

const readPermissionsData = function()
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(permissionsFilePath,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}

const writePermissionsData = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jFile.writeFile(permissionsFilePath, obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Permissions Succeeded');
            }
        })
    })
}



module.exports = {readUsersData, writeUsersData, readPermissionsData, writePermissionsData}