import dotenv from 'dotenv';
dotenv.config();

export default Object.freeze({
    PORT : process.env.PORT,
    MONGO_URL: 'mongodb+srv://arundhuti:arundhuti@123@cluster0.gmpnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ADMIN_JWT_SECRET: 'sdtcb',
    USER_JWT_SECRET: 'bctds',
    FRONT_END_URL: process.env.FE_URL,
    SEND_GRID_API_KEY : "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",
    SERVICE_PORVIDER : "SendGrid",
    SENDER_EMAIL : "naveenkumarkoppala1@gmail.com",
    AWS_S3_ACCESS_KEY: "AKIA4HX3WDQS7IURV3W5",
    AWS_SECRET_ACCESS_KEY: "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",
    AWS_S3_BUCKET_NAME: "imagesecommerce"
});