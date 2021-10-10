const User = require('./userModel');

exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.getUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.addUser = function (obj) {
    let fixedPermissions = { ...obj.permissions };

    if (fixedPermissions['Create_Movies'] ||
        fixedPermissions['Update_Movies'] ||
        fixedPermissions['Delete_Movies']) {
        fixedPermissions['View_Movies'] = true
    }

    if (fixedPermissions['Create_Subscriptions'] ||
        fixedPermissions['Update_Subscriptions'] ||
        fixedPermissions['Delete_Subscriptions']) {
        fixedPermissions['View_Subscriptions'] = true
    }

    return new Promise((resolve, reject) => {
        let user = new User({
            username: obj.userName,
            password: "",
            Name: obj.name,
            CreatedDate: obj.createdDate,
            Permissions: fixedPermissions,
            SessionTimeOut: obj.sessionTimeOut
        });

        user.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created with id : ' + user._id);
            }
        })
    })
}

exports.updateUserPassword = async function (obj) {

    const usernameSearch = obj.username;
    const newpassword = obj.newpassword;

    let data = await this.getAllUsers();

    let userData = data.find(user => user.username == usernameSearch);

    console.log(userData)
    if (!userData) {
        return "Not Found";
    }

    if (userData.password !== '') {
        return "Wrong Password";
    }

    User.findByIdAndUpdate(userData._id,
        {
            password: newpassword
        }, function (err) {

        if (err) {
            return(err);
        }
        else {
            return "Updted";
        }
    });

}

exports.updateUser = function (id, obj) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id,
            {
                username: obj.userName,
                Name: obj.name,
                Permissions: obj.permissions,
                SessionTimeOut: obj.sessionTimeOut

            }, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Updated');
            }
        });
    })
}


exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted !');
            }
        });
    })
}