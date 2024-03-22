module.exports = {
    checkReminders: () => {
        console.log("checking reminders")
        // first we need to check for two things
        // 1- if there is a time in the booking table(start) that is after 6 hours from now
        // 2- if there is a time in the booking table(end) that is equal to the current time then send an emailto the person to get his review
    }
}