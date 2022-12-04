function UserService() {

    // Lấy danh sách User 
    this.getListUserApi = function () {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/User",
            method: "GET",
        });
    };

    // Thêm User
    this.addUserApi = function (user) {
        return axios({
            url: "https://637b69c310a6f23f7fa80f9d.mockapi.io/api/User",
            method: "POST",
            data: user,
        });
    };

    // Xóa User thông qua ID
    this.deleteUserApi = function (id) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/User/${id}`,
            method: "DELETE"
        })
    }

    // Lấy thông tin chi tiết người dùng qua ID
    this.getUserByIdApi = function (id) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/User/${id}`,
            method: "GET"
        })
    }

    // Update thông tin người dùng
    this.updateUserApi = function (user) {
        return axios({
            url: `https://637b69c310a6f23f7fa80f9d.mockapi.io/api/User/${user.id}`,
            method: "PUT",
            data: user
        })
    }
}