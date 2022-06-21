const { Sequelize, DataTypes } = require('sequelize')

class DatabaseConf {
    constructor(){
        /**
         * Sequelize constructor from line 1
         * @param database: "xyz" -> this is the name of the database you want to establish a connection with
         * @param username: The second parameter highlights the username of the database if you have one set up. 
         *               This was intentionally left blank bc a username was not established with this DB
         * @param password: The third parameter highlights the password of the database if you have one set up. 
         *              This was intentionally left blank bc a password was not established with this DB
         * @param config: This is an object containing the configuration of the the db platform you are using. 
         *              host: represents the server you are using. 
         *              dialect: Represents the platform you want to use. This helps sequelize understand the DB platform you are interacting with. 
         *              ex: postgres | mariadb | mysql etc
         */
        this.sequelize = new Sequelize('xyz', '', '', {
            host: 'localhost',
            dialect: 'postgres'
        });
    }

    sequelize(){
        /**
         * @returns the sequelize library
         */
        return this.sequelize
    }

    async authenticate(){
        /**
         * @abstract connects to database using the instance from the constructor
         */
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    
    models(){
        /**
         * @abstract Define all models here. This function will also sync the models as tables to the database.
         */
        const User = this.sequelize.define("User", {
            first_name: DataTypes.TEXT,
            last_name: DataTypes.TEXT,
            email: DataTypes.TEXT,
            age: DataTypes.INTEGER
        });

        const Post = this.sequelize.define("Post", {
            hashtag: DataTypes.TEXT,
        });

        //syncs models as tables to xyz db
        (async () => {
            await sequelize.sync({ force: true, logging: false });
            // Code here
        })();
        return {
            User,
            Post
        }
    }
}

module.exports = new DatabaseConf();