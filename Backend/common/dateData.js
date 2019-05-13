var dateFormat = require('dateformat');
var today = new Date();

function getWeekOfYear() {
    return today.getWeek();
}

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function getOneWeekAgo(date) {
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(date.getDate() - 7);
    return oneWeekAgo;
}

function getDateWeekAgo() {
    let dayNow = today.getDay();
    let weekAgo = {
        dateStartWeekAgo: new Date(),
        nextDate: new Date()
    }
    weekAgo.dateStartWeekAgo.setDate(today.getDate() - dayNow  - 7);
    weekAgo.nextDate.setDate(today.getDate() - dayNow - 6);

    return weekAgo;
}

module.exports = {
    getWeekOfYear: getWeekOfYear,
    getOneWeekAgo: getOneWeekAgo,
    getDateWeekAgo: getDateWeekAgo
}