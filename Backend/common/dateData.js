var dateFormat = require('dateformat');

function getWeekOfYear() {
    var today = new Date();
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

module.exports = {
    getWeekOfYear: getWeekOfYear,
    getOneWeekAgo: getOneWeekAgo
}