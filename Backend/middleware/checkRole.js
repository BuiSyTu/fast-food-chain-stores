const checkAdminRole = (req, res, next) => {
    if (req.session.user) {
        const role = req.session.user.a_role;
        if (role === 'admin') {
            next();
        } else {
            res.status(500);
            res.render('error', { message: 'Bạn không có quyền truy nhập vào trang này!', error: { status: 500, stack: "" } });
        }
    } else {
        res.render('error', { message: 'Bạn chưa đăng nhập!', error: { status: 500, stack: "" } });
    }

}

const checkEmployeeRole = (req, res, next) => {
    if (req.session.user) {
        const role = req.session.user.a_role;
        if (role === 'employee') {
            next();
        } else {
            res.status(500);
            res.render('error', { message: 'Bạn không có quyền truy nhập vào trang này!', error: { status: 500, stack: "" } });
        }
    } else {
        res.render('error', { message: 'Bạn chưa đăng nhập!', error: { status: 500, stack: "" } });
    }

}
const checkUserRole = (req, res, next) => {
    if (req.session.user) {
        const role = req.session.user.a_role;
        if (role === 'user') {
            next();
        } else {
            res.status(500);
            res.render('error', { message: 'Bạn không có quyền truy nhập vào trang này!', error: { status: 500, stack: "" } });
        }
    } else {
        res.render('error', { message: 'Bạn chưa đăng nhập!', error: { status: 500, stack: "" } });
    }

}

module.exports = { checkAdminRole, checkEmployeeRole, checkUserRole }
