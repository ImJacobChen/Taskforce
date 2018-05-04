export const fire = {

    auth: function() {
        return {
            currentUser: {
                uid: 1
            }
        }
    },

    databaseRefs: [],

    database: function() {

        function ref(path) {

            const dbRef = {};
            dbRef.listeners = {
                value: [],
                child_added: [],
                child_changed: [],
                child_moved: [],
                child_removed: []
            };

            dbRef.orderByChild = function(value) {
                return dbRef;
            };

            dbRef.startAt = function(value) {
                return dbRef;
            };
            
            dbRef.on = function(value, callback) {
                dbRef.listeners[value].push(callback);
            };
            
            fire.databaseRefs.push(dbRef);
            return dbRef;

        }

        return {
            ref
        }

    },

    emitData: function(type, data) {
        fire.databaseRefs.forEach((ref) => {
            ref.listeners[type].forEach((cb) => {
                cb(data);
            });
        });
    }

};