const Sequelize = require("sequelize")
const { Book, Client } = require("../models/modelIndex")
const {sendReminder, sendReminderReview} = require("./sendEmail")
module.exports = {
    checkReminders: async () => {
        console.log("checking reminders")
        // first we need to check for two things
        // 1- if there is a time in the booking table(start) that is after 6 hours from now
        let timeNow = new Date()
        const comingBookings = await Book.findAll({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('HOUR', Sequelize.col('start')), {
                        [Sequelize.Op.eq]: timeNow.getHours() + 6
                    }),
                    Sequelize.where(Sequelize.fn('MINUTE', Sequelize.col('start')), {
                        [Sequelize.Op.eq]: timeNow.getMinutes()
                    })
                ]
            }, raw: true
        })
        console.log(comingBookings)
        // send email to each one of them
        for (let index = 0; index < comingBookings.length; index++) {
            let client = await Client.findOne({
                where: {
                    clientID: comingBookings[index].clientClientID
                }
            })
            console.log('sending the email to '+client.email)
            sendReminder(client.email)
        }
        // 2- if there is a time in the booking table(end) that is equal to the current time then send an emailto the person to get his review
        const endedBookings = await Book.findAll({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('HOUR', Sequelize.col('end')), {
                        [Sequelize.Op.eq]: timeNow.getHours()
                    }),
                    Sequelize.where(Sequelize.fn('MINUTE', Sequelize.col('end')), {
                        [Sequelize.Op.eq]: timeNow.getMinutes()
                    })
                ]
            }
        })
        for (let index = 0; index < endedBookings.length; index++) {
            let client = await Client.findOne({
                where: {
                    clientID: endedBookings[index].clientClientID
                }
            })
            // send the email to him with client.email
            sendReminderReview(client.email)
        }
    }
}