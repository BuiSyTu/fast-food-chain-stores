document.addEventListener('DOMContentLoaded', () => {
    var subs = document.querySelectorAll('.sub');
    var pluses = document.querySelectorAll('.plus');
    var alert = document.getElementById('alert');

    subs.forEach(sub => {
        sub.addEventListener('click', () => {
            var quantity = document.getElementById('quantity' + sub.id);
            var count = parseInt(quantity.innerHTML);
            if (count > 1) {
                quantity.innerHTML = --count;
                var price = document.getElementById('price' + sub.id).innerHTML;
                var sum = document.getElementById('sum' + sub.id);
                price.substr(-4, 4);
                var num_price = parseInt(price);
                sum.innerHTML = count * num_price + ' VNĐ';
                var total = document.getElementById('total');
                var str_total = total.innerHTML;
                str_total.substr(-4, 4);
                var num_total = parseInt(str_total);
                total.innerHTML = num_total - num_price + ' VNĐ';
            } else {
                alert.classList.add('alert-danger');
                alert.innerHTML = 'Không thể giảm thêm!';
            }
        });
    });

    pluses.forEach(plus => {
        plus.addEventListener('click', () => {
            var quantity = document.getElementById('quantity' + plus.id);
            var count = parseInt(quantity.innerHTML);
            quantity.innerHTML = ++count;
            var price = document.getElementById('price' + plus.id).innerHTML;
            var sum = document.getElementById('sum' + plus.id);
            price.substr(-4, 4);
            var num_price = parseInt(price);
            sum.innerHTML = count * num_price + ' VNĐ';
            var total = document.getElementById('total');
            var str_total = total.innerHTML;
            str_total.substr(-4, 4);
            var num_total = parseInt(str_total);
            total.innerHTML = num_total + num_price + ' VNĐ';
            if (count > 1) {
                alert.classList.remove('alert-danger');
                alert.innerHTML = '';
            }
        });
    });


});
