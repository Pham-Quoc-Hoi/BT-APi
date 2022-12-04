var userService = new UserService();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function rsGiaoDien() {
    getEle("TaiKhoan").value = "";
    getEle("TaiKhoan").disabled = false;

    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").value = "Chọn loại người dùng";
    getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
    getEle("MoTa").value = "";

    // //#btnCapNhat
    // getEle("btnCapNhat").style.display = "none";
    // //#btnThemNV
    // getEle("btnThemNV").style.display = "inline-block";
}

// Get Info from Input
function getInfoUser(valiAdd, id) {
    var taiKhoan = getEle("TaiKhoan").value;
    getEle("TaiKhoan").disabled = false;

    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    var flag = true;

    if (valiAdd) {
        flag &=
            validation.kiemTraRong(taiKhoan, "tbTaiKhoan", "(*) Vui lòng nhập Tài khoản");
    }

    //họ tên
    flag &=
        validation.kiemTraRong(hoTen, "tbHoTen", "(*) Vui lòng nhập Họ và tên") &&
        validation.kiemTraKyTu(hoTen, "tbHoTen", "(*) Vui lòng nhập Họ tên bằng chữ");

    //mật khẩu
    flag &=
        validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập Mật Khẩu") &&
        validation.kiemTraMK(matKhau, "tbMatKhau", "(*) Vui lòng nhập Mật Khẩu đúng định dạng") &&
        validation.kiemTraDoDaiKyTu(matKhau, "tbMatKhau", "(*) Nhập Mật khẩu từ 6 đến 8 ký tự", 6, 8);


    // Email
    flag &=
        validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập Email") &&
        validation.kiemTraEmail(email, "tbEmail", "(*) Vui lòng nhập Email đúng định dạng");

    //Hình ảnh
    flag &= validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng nhập tên hình ảnh");

    //loại ND
    flag &= validation.kiemTraSelect("loaiNguoiDung", "tbloaiND", "(*) Chọn loại người dùng");

    // Loại NN
    flag &= validation.kiemTraSelect("loaiNgonNgu", "tbLoaiNN", "(*) Chọn loại ngôn ngữ");

    //Mô tả
    flag &=
        validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng nhập Mô tả") &&
        validation.kiemTraDoDaiKyTu(moTa, "tbMoTa", "(*) Vui lòng nhập Mô tả dưới 60 ký tự", 1, 60);

    // console.log(flag);
    if (!flag) return;

    var user = new User(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    return user;
}

// Hiện danh sách User
function getListUser() {
    userService.getListUserApi()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListUser();

function renderHTML(data) {
    var content = "";

    data.forEach(function (user, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
    `;
    });

    getEle("tblDanhSachNguoiDung").innerHTML = content;
}


/**
 * Chỉnh các hiển thị HTML khi click nút Edit User
 * - Chỉnh sửa lại form modal
 * - Lấy dữ liệu từ mảng in ra lại các thẻ input
 */
function editUser(id) {
    // console.log(id);
    var title = "Chỉnh sửa thông tin";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;

    var button = `<button class="btn btn-info" onclick="updateUser(${id})">Update Info</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;

    userService.getUserByIdApi(id)
        .then(function (res) {
            console.log(res);
            var user = res.data;
            getEle("TaiKhoan").value = user.taiKhoan;
            getEle("TaiKhoan").disabled = true;

            getEle("MatKhau").value = user.matKhau;
            getEle("HoTen").value = user.hoTen;
            getEle("Email").value = user.email;
            getEle("HinhAnh").value = user.hinhAnh;
            getEle("loaiNguoiDung").value = user.loaiND;
            getEle("loaiNgonNgu").value = user.ngonNgu;
            getEle("MoTa").value = user.moTa;
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * Update lại thông tin người dùng
  */
function updateUser(id) {
    var user = getInfoUser(false, id)
    // var taiKhoan = getEle("TaiKhoan").value;
    // var hoTen = getEle("HoTen").value;
    // var matKhau = getEle("MatKhau").value;
    // var email = getEle("Email").value;
    // var hinhAnh = getEle("HinhAnh").value;
    // var loaiND = getEle("loaiNguoiDung").value;
    // var ngonNgu = getEle("loaiNgonNgu").value;
    // var moTa = getEle("MoTa").value;

    // var user = new User(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

    userService.updateUserApi(user)
        .then(function (res) {
            console.log(res);
            getListUser();
            alert("Update success!");
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}


/**
 * Add User
 */
// Hiển thị HTML
getEle("btnThemNguoiDung").onclick = function () {
    rsGiaoDien();
    // Header
    var title = "Thêm Người Dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    // Footer
    var button = `<button class="btn btn-success" onclick="addUser()">Add User</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

function addUser() {
    var user = getInfoUser(true, "")
    // var taiKhoan = getEle("TaiKhoan").value;
    // var hoTen = getEle("HoTen").value;
    // var matKhau = getEle("MatKhau").value;
    // var email = getEle("Email").value;
    // var hinhAnh = getEle("HinhAnh").value;
    // var loaiND = getEle("loaiNguoiDung").value;
    // var ngonNgu = getEle("loaiNgonNgu").value;
    // var moTa = getEle("MoTa").value;


    // var user = new User("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);
    if (user) {
        userService.addUserApi(user)
            .then(function (result) {
                getListUser();
                alert("Thêm mới thành công!");
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Xóa User
function deleteUser(id) {
    console.log(123);
    userService.deleteUserApi(id)
        .then(function (res) {
            getListUser();
            alert("Xóa user thành công!");
        })
        .catch(function (error) {
            console.log(error);
        })
}


