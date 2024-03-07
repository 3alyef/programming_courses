import { DataTypes, Sequelize, Model, ENUM } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName:string = String(process.env.DB_NAME);
const dbUser:string = String(process.env.DB_USER);
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || "localhost";


const sequelize = new Sequelize(
    dbName , 
    dbUser, 
    dbPassword, 
    {
        host:dbHost,
        dialect:"mysql",
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    }    
    
);

class Social extends Model{
    id!: number;
    firstName!: string;
    lastName!: string;
    nascimento!: Date;
    sexo!: 'M' | 'F';
    peso?: number;
    altura?: number;
    nacionalidade!: string;
    email!: string;  
};

Social.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false
    },
    
    peso: {
        type: DataTypes.DECIMAL(5, 3)

    },

    altura: {
        type: DataTypes.DECIMAL(3, 2)
    },

    nacionalidade: {
        type: DataTypes.STRING,
        defaultValue: "Brasil"
    },
    
    email: {
        type: DataTypes.TEXT,

    }
  },
  {
    sequelize,
    modelName: "social", // nome do modelo que ficará na DataBase
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
  }  
)

const authenticateDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão bem-sucedida!");
    } catch (error) {
        console.error(`Erro na conexão: ${error}`);
    }
};

const syncDB = async () => {
    try {
        await Social.sync();
        console.log("Modelo sincronizado com o banco de dados!");
    } catch (error) {
        console.error(`Erro ao sincronizar o modelo: ${error}`);
    }
};

// Execute as operações assíncronas
authenticateDB();
//syncDB();
interface SocialProps {
    firstName: string,
    lastName: string,
    nascimento: Date,
    sexo: string,
    peso: number,
    altura: number,
    nacionalidade: string,
    email: string
}

const createSocial = async (props: SocialProps) => {
    try {
        await Social.create({
            firstName: props.firstName,
            lastName: props.lastName,
            nascimento: props.nascimento,
            sexo: props.sexo,
            peso: props.peso,
            altura: props.altura,
            nacionalidade: props.nacionalidade,
            email: props.email
        });
        console.log("Registro criado com sucesso!");
    } catch (error) {
        console.error(`Erro ao atualizar a base de dados: ${error}`);
    }
}

// Convertendo a string para um objeto Date
const nascimento = new Date('1915-10-15');

const socialProps: SocialProps = {
    firstName: 'Itzkhaq',
    lastName: 'Ben Cohen',
    nascimento: nascimento,
    sexo: 'M',
    peso: 62,
    altura: 1.7,
    nacionalidade: 'Israel',
    email: 'test4@gmail.com'
};

// Agora, chame o método createSocial com o objeto socialProps
//createSocial(socialProps);
const updateSocialEmail = async (newEmail: string, firstName: string) => {
    try {
        const affectedRows = await Social.update(
            { email: newEmail },
            { where: { firstName: firstName } }
        );

        console.log(`Registros atualizados: ${affectedRows[0]}`);
    } catch (error) {
        console.error(`Erro ao atualizar a base de dados: ${error}`);
    }
}

// Chamando o método updateSocialEmail
updateSocialEmail('test1@gmail.com', 'Alef');

