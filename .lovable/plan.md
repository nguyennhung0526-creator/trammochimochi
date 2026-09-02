# Thêm mục "Thể loại" + chỉnh logic danh sách truyện

## 1. Trang Thể loại mới (`/the-loai`)
- Thêm mục **Thể loại** vào menu (cả desktop và menu mobile), trỏ tới `/the-loai`.
- Trang hiển thị lưới các ô thể loại (giống ảnh 1 nhưng đẹp hơn): thẻ bo tròn pastel, viền mềm, hover nổi lên, dùng token màu của web (primary / secondary / mint / butter), kèm số lượng truyện của từng thể loại.
- Danh sách thể loại lấy tự động từ cột thể loại trong Google Sheets (gộp tất cả tag của mọi truyện, bỏ trùng, sắp theo A-Z) nên chỉ cần thêm tag trên Sheets là ô mới xuất hiện.

## 2. Trang danh sách theo thể loại (`/the-loai/$ten`)
- Bố cục 2 cột giống ảnh 2: nội dung chính bên trái (lưới truyện: ảnh bìa, nhãn trạng thái, tác giả, lượt xem), sidebar **THỂ LOẠI** bên phải liệt kê tất cả thể loại còn lại để bấm chuyển nhanh; thể loại đang xem được tô sáng.
- Trên mobile: sidebar chuyển xuống dưới dạng hàng chip cuộn ngang để vẫn dễ bấm.
- Sidebar cũng dùng chung cho các trang danh sách (`/danh-sach/$loai`) và trang tìm kiếm để trải nghiệm nhất quán.

## 3. Logic hiển thị trang chủ
- **Truyện hot**: sắp xếp theo `views` giảm dần, chỉ hiển thị đúng 3 truyện.
- **Mới cập nhật**: đảo ngược thứ tự dữ liệu từ Google Sheets (dòng thêm sau lên trước), chỉ hiển thị đúng 3 truyện mới nhất.
- Mỗi mục có link "Xem tất cả" sang trang danh sách tương ứng để không mất truyện nào.
- Trang `/danh-sach/hot` vẫn sắp theo views giảm dần nhưng hiển thị đầy đủ danh sách.

## Chi tiết kỹ thuật
- Route mới: `src/routes/the-loai.index.tsx` (`/the-loai`); `the-loai.$ten.tsx` giữ nguyên nhưng đổi sang layout có sidebar.
- Thêm helper `slugifyTag` + `getAllGenres(stories)` trong `src/lib/stories.ts` (hoặc `stories-query.ts`) để dùng chung cho trang thể loại, sidebar và filter.
- Thành phần mới `src/components/GenreSidebar.tsx`; `StoryList.tsx` nhận thêm prop tùy chọn `sidebar`/`showGenres`.
- `src/lib/stories.ts`: giữ nguyên thứ tự dòng Sheets khi trả về để `reverse()` ở trang chủ cho ra đúng truyện mới nhất.
- `head()` riêng cho `/the-loai` (title, description, og).
