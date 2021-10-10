const jsonDal = require('./jsonDAL')

exports.getAllUsersPermissions = async function () {

    let data = await jsonDal.readUsersData();
    let allUsers = data.users;

    let data2 = await jsonDal.readPermissionsData();
    let allPermissions = data2.permissions;

    let fullUsers = []

    allUsers.forEach(user => {

        let userToAdd = allPermissions.find(x => x.userId == user.id)

        let obj = { "id": user.id, "name": user.name, "permissions": userToAdd.permissions }

        fullUsers.push(obj)
    })

    return fullUsers;
}

exports.getUserPermissions = async function (id) {
    let data = await jsonDal.readUsersData();
    let allUsers = data.users;
    let data2 = await jsonDal.readPermissionsData();
    let allPermissions = data2.permissions;

    let userToAdd = allUsers.find(x => x.id == id)
    let permissionToAdd = allPermissions.find(x => x.userId == id)

    let fullUser = { "id": id, "name": userToAdd.name, "permissions": permissionToAdd.permissions }

    return fullUser;
}

exports.addUserPermissions = async function(obj)
{

    let data = await jsonDal.readUsersData();
    let user = {"id" : obj.id, "name" : obj.name}
    data.users.push(user);
    console.log(data)
    let status = await jsonDal.writeUsersData(data);

    let data2 = await jsonDal.readPermissionsData();
    let permission = {"userId" : obj.id, "permissions" : obj.permissions}
    data2.permissions.push(permission)
    console.log(data2)
    let status2 = await jsonDal.writePermissionsData(data2)
    return (status + " " + status2)
}

exports.updateUserPermissions = async function(id, obj)
{
    let data = await jsonDal.readUsersData();
    let allUsers = data.users;
    let indx = allUsers.findIndex( x => x.id == id)

    if(indx >= 0){
        let user = {"id" : obj.id, "name" : obj.name}
        allUsers[indx] = user;
        let newData = {"users" : allUsers}
        console.log(newData)
        let status = await jsonDal.writeUsersData(newData);

        let data2 = await jsonDal.readPermissionsData();
        let allPermissions = data2.permissions;
        let indx2 = allPermissions.findIndex( x => x.userId == id)
        let permission = {"userId" : obj.id, "permissions" : obj.permissions}
        allPermissions[indx2] = permission;
        let newData2 = {"permissions" : allPermissions}
        console.log(newData2)
        let status2 = await jsonDal.writePermissionsData(newData2)
        return (status + " " + status2)
    }
}

exports.deleteUserPermissions = async function(id)
{
    let data = await jsonDal.readUsersData();
    let allUsers = data.users;
    let indx = allUsers.findIndex( x => x.id == id)
    allUsers.splice(indx, 1)
    let newData = {"users" : allUsers}
    console.log(newData)
    let status = await jsonDal.writeUsersData(newData);

    let data2 = await jsonDal.readPermissionsData();
    let allPermissions = data2.permissions;
    let indx2 = allPermissions.findIndex( x => x.userId == id)
    allPermissions.splice(indx2, 1);
    let newData2 = {"permissions" : allPermissions}
    console.log(newData2)
    let status2 = await jsonDal.writePermissionsData(newData2)
    return (status + " " + status2)
}