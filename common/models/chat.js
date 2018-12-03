'use strict';
const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:f5b5b315-25ca-47ef-a23e-bc490a4c8457",
    key: "39d931f3-a923-4ef6-a568-a614fbc90813:00fRMFcto1M03dz1S1AeaMY5GFbVwOKXOnaTIZz35oQ=",
})
module.exports = function (Chat) {
    Chat.createChatUsers = function (username1, username2, callback) {
        const usersToCreate = [{ id: username1, name: username1 }, { id: username2, name: username2 }];
        if (!username1 || !username2) {
            callback(null, "enter 2 usernames");
            return;
        }
        chatkit.createUsers({ users: usersToCreate })
            .then((chatUsers) => {
                callback(null, chatUsers);
            }).catch((err) => {
                callback(err);
            });
    };
    /* /api/chats/createChatUsers?username=reza77&fullName=Reza */
    Chat.remoteMethod("createChatUsers", {
        accepts: [{
            arg: "username1",
            type: "string"
        }, {
            arg: "username2",
            type: "string"
        }],
        returns: {
            arg: "chatUser",
            type: "obj"
        },
        http: {
            path: "/createChatUsers",
            verb: "get"
        }
    });

    Chat.createRoom = function (creatorId, roomName, members, callback) {
        chatkit.createRoom({
            creatorId: creatorId,
            name: roomName,
            userIds: members
        })
            .then(() => {
                callback(null, chatUsers);
            }).catch((err) => {
                callback(err);
            });
    };

    Chat.getUserRooms = function (username1, callback) {
        chatkit.getUserRooms({ userId: username1 })
            .then((rooms) => {
                callback(null, rooms);
            }).catch((err) => {
                callback(err);
            });
    };
    Chat.remoteMethod("getUserRooms", {
        accepts: [{
            arg: "username1",
            type: "string"
        },],
        returns: {
            arg: "Rooms",
            type: "obj"
        },
        http: {
            path: "/getUserRooms",
            verb: "get"
        }
    });

    Chat.getChatRoom = function (username1, username2, callback) {
        chatkit.getUserRooms({ userId: username1 })
            .then((rooms) => {
                let oldChatRooms = rooms.filter(value => value.member_user_ids.indexOf(username1) > -1 && value.member_user_ids.indexOf(username2) > -1)

                if (oldChatRooms.length > 0)
                    callback(null, oldChatRooms[0]);
                else
                    chatkit.createRoom({
                        creatorId: username1,
                        name: 'room' + Math.random(),
                        userIds: [username1, username2]
                    })
                        .then((room) => {
                            callback(null, room);
                        }).catch((err) => {
                            callback(err);
                        });
            }).catch((err) => {
                callback(err);
            });
    };
    Chat.create2Users = function (username1, username2, callback) {
        chatkit.createUser({ id: username1, name: username1 })
            .then((chatUser1) => {
                chatkit.createUser({ id: username2, name: username2 })
                    .then((chatUser2) => {
                        callback(null, [chatUser1, chatUser2]);
                    }).catch((err) => {
                        callback(null, [chatUser1, err]);
                    });
            }).catch((err) => {
                chatkit.createUser({ id: username2, name: username2 })
                    .then((chatUser2) => {
                        callback(null, [err, chatUser2]);
                    }).catch((err) => {
                        callback(null, [err, err]);
                    });
            });
    }
    Chat.remoteMethod("create2Users", {
        accepts: [{
            arg: "username1",
            type: "string"
        }, {
            arg: "username2",
            type: "string"
        }],
        returns: {
            arg: "chatUsers",
            type: "obj"
        },
        http: {
            path: "/create2Users",
            verb: "get"
        }
    });

    Chat.initChatRoom = function (username1, username2, callback) {
        Chat.create2Users(username1, username2, function (users) {
            Chat.getChatRoom(username1, username2, callback)
        })
    };
    Chat.remoteMethod("initChatRoom", {
        accepts: [
            {
                arg: "username1",
                type: "string"
            },
            {
                arg: "username2",
                type: "string"
            },
        ],
        returns: {
            arg: "room",
            type: "obj"
        },
        http: {
            path: "/initChatRoom",
            verb: "get"
        }
    });


};

