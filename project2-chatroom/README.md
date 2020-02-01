# How to run

```
npm run app1
```

## App1: 
- Truyền tin từ client lên server
- Server nhận tin và phát ngược trở lại
    - TH1: server phát lại cho __tất cả__ mọi người
    - TH2: server chỉ phát lại cho __người đã gửi__
    - TH3: server phát lại cho mọi người __trừ người gửi__

## APP2: Tạo một ứng dụng chat

```bash
# Run
node app2.js
```


- Tạo màn hình đăng nhập: gồm username
    - nhập username 
    - nút đăng nhập
- Tạo màn hình chat
    - danh sách các username đang ở trong phòng chat
        - khi một người join vào thì ngay lập tức cập nhật danh sách
        - khi một người out ra thì ngay lập tức cập nhật danh sách
    - Ô chat
        - khi một người mới join vào thì hiển thị có người vừa join
        - khi một người thóat ra thì hiển thị thoát
        - typing 
        - gửi tin nhắn chat

- **Các hoạt động:**
  - **Hoạt động 1**: đăng nhập vào phòng chat
  - **Hoạt động 2:** logout ra khỏi phòng chat



### Hoạt động 1: đăng nhập vào phòng chat

***

![Screenshot from 2020-01-22 21-50-43](md-images/README/Screenshot%20from%202020-01-22%2021-50-43.png)



![Screenshot from 2020-01-22 22-35-40](md-images/README/Screenshot%20from%202020-01-22%2022-35-40.png)

- Client A emit sự kiện đăng nhập `(1)`  lên server.
 - Server kiểm tra đăng nhập. đăng nhập thành công `3` => emit đăng kí thành công. Kiểm tra đăng nhập thất bại => emit đăng kí thất bại `2` 
   	- Kiểm tra: trên server lưu một array gồm tên các username. Nếu đăng kí trùng username => đăng nhập thất bại
      	- Khác username => đăng nhập thành công
- Nếu đăng nhập thành công => bắn đi sự kiện cho tất cả user => user A đăng nhập thành công



### Hoạt động 2: logout ra khỏi phòng chat

![Screenshot from 2020-01-22 22-39-31](md-images/README/Screenshot%20from%202020-01-22%2022-39-31.png)

- **Client** ấn nút logout 
- **Server emit** tới những người còn lại rằng A đã logout và truyền mảng data



### Hoạt động 3: chat

<img src="md-images/README/Screenshot%20from%202020-01-22%2022-58-01-1579708736029.png" alt="Screenshot from 2020-01-22 22-58-01" style="zoom:100%;" />

- Client A emit send message lên server
- client a, b, c nhận được message từ A

