document.addEventListener('DOMContentLoaded', () => {
    var bills = document.querySelectorAll(".bill");
    bills.forEach(bill => {
        var id = bill.id;
        bill.addEventListener('click', () => {
            axios.get(`detail/${id}`).then(data => {
                console.log(data.data);
            }).catch(err => {
                console.log(err);
            })
        })
    })
});
