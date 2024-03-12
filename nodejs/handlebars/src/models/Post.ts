import { Sequelize, sequelize, DataTypes, Model } from "./DB";

class Post extends Model {};

Post.init ({
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    
    }


}, {
    sequelize, // database
    modelName: 'postagens'
});


export { Post }