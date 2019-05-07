document.addEventListener('DOMContentLoaded', () => {

    var btns = document.querySelectorAll(".bill");
    btns.forEach(btn => {
        var count = 0;
        var b_id = btn.id;
        btn.addEventListener('click', () => {
            if (count == 1) return;
            axios.get(`detail/${b_id}`).then(data => {
                var tbody = document.getElementById('items' + b_id);
                var t = 0;
                data.data.map((item, index) => {
                    var tr = document.createElement('tr');
                    var th = document.createElement('th');
                    th.innerHTML = index + 1;
                    tr.appendChild(th);
                    var sum = item.bd_quantity * item.f_price;
                    for (var key in item) {
                        var td = document.createElement('td');
                        td.innerHTML = item[key];
                        tr.appendChild(td);
                    }
                    var td_sum = document.createElement('td');
                    td_sum.innerHTML = sum + ' VND';
                    tr.appendChild(td_sum);
                    tbody.appendChild(tr);
                    t += sum;
                });
                var table = document.getElementById('table' + b_id);
                var total = document.createElement('h5');
                total.innerHTML = "Tổng tiền:    " + t + ' VND';
                table.appendChild(total);
            }).catch(err => {
                console.log(err);
            });

            count++;
        });
    });

    // var modalConfirm = function (id, callback) {

    //     $(`#${id}`).on("click", function () {
    //         callback(true);
    //         $("#modelId").modal('hide');
    //     });
    // };

    var deleteOrder = (id) => {
        var b_id = parseInt(id);
        axios.delete(`delete/+${b_id}`).then(data => {
            location.reload();
        }).catch(err => {
            console.log(err);
        });
    }

    // var edits = document.getElementsByClassName('edit');
    // for (var edit of edits) {
    //     edit.addEventListener('click', () => {
    //         console.log(edit);
    //     })
    // }

    var deletes = document.querySelectorAll(".delete");
    deletes.forEach(del => {
        del.addEventListener('click', () => {
            deleteOrder(del.id);
            $("#del" + del.id).modal("hide");
        });
    });

});
