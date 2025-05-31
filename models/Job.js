const { Model } = require('sequelize');

module.exports = (sequelize) => {
    const DataTypes = sequelize.Sequelize.DataTypes;
    class Job extends Model {}

    Job.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true
        },
        education: {
            type: DataTypes.STRING,
            allowNull: true
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        applicantName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicantEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicantPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicantDob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        applicantGender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        applicantResume: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Job',
        freezeTableName: true,
        timestamps: true
    });

    return Job;
};
