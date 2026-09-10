const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const accountModel = require("./src/models/account.model");
const userModel = require("./src/models/user.model");
const connectToDB = require("./src/config/db");


async function createSystemUser() {

    try {

        // Connect to MongoDB
        connectToDB();

        // Wait for database connection
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Find existing system user
        let systemUser = await userModel.findOne({
            email: "system@mybank.com"
        }).select("+password +systemUser");


        // Create system user if it doesn't exist
        if (!systemUser) {

            systemUser = await userModel.create({
                name: "System User",
                email: "system@mybank.com",
                password: "system123",
                systemUser: true
            });

            console.log(
                "System user created:",
                systemUser.email
            );

        } else {

            console.log(
                "System user already exists:",
                systemUser.email
            );
        }


        // Check if system account already exists
        let systemAccount = await accountModel.findOne({
            user: systemUser._id
        });


        // Create system account if it doesn't exist
        if (!systemAccount) {

            systemAccount = await accountModel.create({
                user: systemUser._id
            });

            console.log(
                "System account created:",
                systemAccount._id
            );

        } else {

            console.log(
                "System account already exists:",
                systemAccount._id
            );
        }


        console.log("System user setup completed successfully.");

        process.exit(0);


    } catch (error) {

        console.error(
            "Error creating system user:",
            error
        );

        process.exit(1);
    }
}


createSystemUser();