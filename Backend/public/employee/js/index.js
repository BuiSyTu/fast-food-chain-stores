document.addEventListener('DOMContentLoaded', () => {

    var alert = document.getElementById('alert');
    var deletes = document.querySelectorAll(".delete");
    var pays = document.querySelectorAll('.pay');

    var deleteOrder = (id) => {
        var b_id = parseInt(id);
        axios.delete(`delete/${b_id}`).then(data => {
            var order = document.getElementById('order' + id);
            $("#del" + id).modal("hide");
            order.remove();
            alert.classList.add('alert-success');
            alert.innerHTML = 'Xóa thành công!';
            setTimeout(() => {
                alert.innerHTML = '';
                alert.classList.remove('alert-success');
            }, 2000);
        }).catch(err => {
            console.log(err);
        });
    }

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
                    delete item.bd_id;
                    for (var key in item) {
                        var td = document.createElement('td');
                        td.innerHTML = item[key];
                        tr.appendChild(td);
                    }
                    var td_sum = document.createElement('td');
                    td_sum.innerHTML = sum;
                    tr.appendChild(td_sum);
                    tbody.appendChild(tr);
                    t += sum;
                });
                var table = document.getElementById('table' + b_id);
                var total = document.createElement('h5');
                total.innerHTML = "Tổng tiền:    " + t + '    VND';
                table.appendChild(total);
            }).catch(err => {
                console.log(err);
            });

            count++;
        });
    });

    deletes.forEach(del => {
        del.addEventListener('click', () => {
            deleteOrder(del.id);
        });
    });

    pays.forEach(pay => {
        pay.addEventListener('click', () => {
            var bool = confirm("Bạn có chắc muốn thanh toán!");
            if (bool) {
                axios({
                    method: 'put',
                    url: '/employee/payment',
                    data: {
                        id: pay.id,
                    }
                }).then(data => {
                    location.reload();
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    });

});
