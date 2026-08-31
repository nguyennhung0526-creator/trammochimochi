import cover5 from "@/assets/cover-5.jpg";

import type { Story } from "./stories";

const toParagraphs = (raw: string): string[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

const summary = `Tôi theo đuổi Tống Dực An suốt sáu năm trời, sáng đưa đồ ăn sáng, mưa che ô, trời lạnh thì mang áo ấm.

Tống Dực An ghét Tô Cẩm mười tám năm, ghét từ cửa miệng cho đến hành động.

Nhưng ai cũng biết, anh ấy yêu Tô Cẩm đến thảm hại.

Ngày Tô Cẩm công khai bạn trai, Tống Dực An đồng ý lời tỏ tình của tôi.

Ngày Tô Cẩm bị gã tra nam đá, Tống Dực An quên luôn kỷ niệm ba năm ngày yêu nhau của chúng tôi, vượt qua khoảng cách đường chim bay hai nghìn một trăm ba mươi cây số để bay đến bên cạnh cô ấy.

Khoảnh khắc máy bay hạ cánh, Tô Cẩm đăng một trạng thái lên vòng bạn bè.

Nội dung rất đơn giản: "May mà vẫn luôn có anh ở bên."

Kèm theo bức ảnh sân bay người qua kẻ lại tấp nập, và hai bàn tay đang đan chặt vào nhau.

Trong ảnh, chuỗi hạt Phật bản mệnh mà tôi từng quỳ lạy ba bước một đầu để cầu bình an cho Tống Dực An, lúc này đang đeo trên cổ tay của một người phụ nữ khác.

Tôi không còn gào thét chất vấn một cách kiệt quệ như mọi khi nữa.

Thay vào đó, tôi lặng lẽ ăn hết chiếc bánh kem mà mình đã cẩn thận, tỉ mỉ chuẩn bị.

Sau đó, tôi gửi vào khung trò chuyện với Tống Dực An một câu: "Kỷ niệm ba năm vui vẻ."

Tống Dực An rất nhanh đã gọi điện lại, giọng anh ấy vừa vội vã vừa mang theo vẻ áy náy: "Kiều Kiều, anh có chuẩn bị quà cho em, đợi anh về sẽ tặng cho em..."

Quà sao?

Nhưng món quà đó, và cả anh nữa, tôi đều không cần nữa rồi.`;

const chuong1 = `01.

Đặt xong vé máy bay về nhà vào mười ngày sau, Tống Dực An vẫn chưa trở lại.

Khi anh về đến nơi, đồng hồ đếm ngược ngày tôi rời đi chỉ còn tám ngày.

Lúc đó tôi đang ở trong bếp chuẩn bị bữa tối.

Cà chua chín mọng mềm mại kết hợp với trứng gà vàng ươm, ăn cùng mì sợi tự tay nhào cán dai ngon, đó là món cơm nhà mà Tống Dực An thích nhất.

Anh ôm lấy eo tôi từ phía sau, tựa cằm lên vai tôi, giống như một chú chó lớn đang làm nũng mà cọ cọ.

"Thơm quá, Kiều Kiều, lát nữa anh phải ăn hai bát."

Giọng điệu của anh ấy nói chuyện chẳng có gì khác ngày thường, cứ như thể lần này chỉ là một chuyến công tác đơn giản vậy.

Cứ như không hề có chuyện anh vượt ngàn dặm xa xôi lao đến bên cạnh Tô Cẩm, và trên người anh cũng không có mùi nước hoa xa lạ, không thuộc về tôi, cũng chẳng thuộc về anh.

Tôi múc hết mì trong nồi ra bát, quay người lại, bốn mắt nhìn nhau với anh.

"Tôi chỉ nấu phần của mình thôi."

Trong lúc bưng bát bước ra khỏi bếp, tôi bỗng thẫn thờ nhớ lại, lùi về ba năm trước, tôi vốn dĩ chẳng biết nấu ăn.

Chỉ là có một lần đột nhiên nảy ra ý nghĩ kỳ quặc, tôi lên mạng tìm kiếm hướng dẫn làm mì trứng.

Sau khi ngón tay bị bỏng phồng rộp lên bảy nốt mụn nước, tôi mới bưng được một bát mì ra dáng ra hình đến trước mặt Tống Dực An.

Hôm đó anh ấy rất vui, hiếm hoi lắm mới nói chuyện với tôi nhiều hơn vài câu.

Thế là tôi đâm đầu vào yêu thích việc xuống bếp.

Tôi từng nghĩ, nắm giữ được dạ dày của một người đàn ông là sẽ nắm giữ được trái tim của anh.

Sau này tôi mới biết, anh thích món mì trứng tôi nấu, chẳng qua là vì hương vị tôi làm ra giống hệt hương vị mà Tô Cẩm từng nấu cho anh.

Tống Dực An bám sát theo sau tôi, gương mặt anh thoáng hiện vẻ bực bội, nhưng có lẽ cũng tự biết mình có lỗi, anh buộc phải kiên nhẫn lên tiếng nói chuyện với tôi.

"Nếu em vì chuyện kỷ niệm ba năm mà tức giận, anh có thể xin lỗi, cũng có thể..."

Tôi ngắt lời anh: "Tôi không tức giận."

Tống Dực An không tin: "Anh và Tô Cẩm cùng nhau lớn lên, nếu cô ấy ở bên kia xảy ra chuyện, bố mẹ anh và bố mẹ cô ấy nhất định sẽ lôi anh ra hỏi tội."

Anh tiến lên ôm lấy tôi: "Em biết mà, Tô Cẩm là một chúa rắc rối, anh ghét cô ấy ch đi được."

Anh nói một cách chân tình thực cảm như vậy, đôi mắt đào hoa nhìn chằm chằm vào tôi.

Cái dáng vẻ này đã lừa tôi suốt ba năm, và cũng tự lừa dối chính anh.

Tôi đẩy anh ra, nhẹ giọng đáp: "Ừm, tôi biết rồi."

Tống Dực An ngẩn người tại chỗ, anh có lẽ không lường trước được phản ứng này của tôi.

Bởi vì trong nhận thức của anh, tôi của trước đây sẽ vì một cái ôm chủ động của anh mà vui sướng đến mức nhảy cẫng lên.

Bờ vai anh bỗng chùng xuống, vẻ mặt như thể kiệt quệ cả thể xác lẫn tinh thần: "Kiều Kiều, đừng nháo nữa."

Tôi cảm thấy thật nực cười, người được yêu mới có tư cách để làm mình làm mẩy, còn tôi thì chẳng có gì cả.

Tôi im lặng, ngồi xuống bàn ăn bắt đầu ăn cơm, mì hơi nóng nên chỉ có thể ăn từng miếng nhỏ một.

Sau khi tôi ăn xong, Tống Dực An đẩy đến trước mặt tôi một hộp trang sức.

Anh vẫn nghĩ là tôi đang giận dỗi, giọng điệu có chút bực dọc.

"Quà kỷ niệm ba năm tặng em."

Hộp trang sức mở ra, một chiếc lắc tay tinh xảo xuất hiện trước mắt tôi.

Tôi nhàn nhạt liếc nhìn một cái.

Nếu nhớ không nhầm thì trong bài đăng trên vòng bạn bè của Tô Cẩm ngày hôm qua, chiếc lắc tay này cũng đã xuất hiện.

Có điều, nó là quà tặng kèm của một chiếc dây chuyền kim cương.

Tôi không dám hoang tưởng rằng trong lòng Tống Dực An, tôi và Tô Cẩm có vị trí ngang nhau, nhưng ba năm dốc hết lòng hết dạ thanh xuân, cuối cùng lại đổi lấy kết cục làm một món đồ làm nền.

Không có sự nhục nhã hay đau đớn như trong tưởng tượng, ngược lại tôi càng lúc càng bình tĩnh.

Đến lúc này tôi mới hiểu, hóa ra khi không còn yêu nữa, cảm giác lại là thế này.

Khẽ "ừm" một tiếng, tôi né người đi qua anh, định mang bát vào bếp.

Nhưng Tống Dực An rõ ràng không hài lòng với thái độ nhạt nhẽo của tôi, anh túm chặt lấy cánh tay tôi, có chút tức giận nói: "Em chỉ có phản ứng thế này thôi sao?"

Nhận được một món quà tặng kèm, chẳng lẽ tôi còn phải khua chiêng gõ trống, hớn hở vui mừng à?

Tôi không muốn tranh chấp với anh, bèn bổ sung thêm một câu: "Cảm ơn."

Sắc mặt anh càng thêm khó coi, bàn tay đang kiềm chế cổ tay tôi siết mạnh hơn.

Tôi nhíu mày, nhưng không nói một lời nào.

Bất chợt, anh hất mạnh tôi ra, sắc mặt xanh mét nói: "Lục Dĩ Kiều, sự kiên nhẫn của tôi có giới hạn thôi!"

Tôi vẫn im lặng, đặt bát đũa vào bồn rửa, sau đó chộp lấy chiếc áo khoác treo ở cửa, chuẩn bị đi ra ngoài.

"Em đi đâu đấy?" Tống Dực An gọi giật tôi lại.

"Đi tìm bạn."

Anh hừ lạnh một tiếng, dáng vẻ như thể đã nắm thóp được tôi, nói: "Em ở đây một người bạn cũng không có, thì đi tìm ai được?"

Bàn tay đang mặc áo khoác khựng lại, tôi ngẩng đầu nhìn anh.

"Tôi không có bạn bè, chẳng phải đều là vì anh sao?"

Nói xong, tôi không đợi bất kỳ phản ứng nào của anh, đẩy cửa bước đi.

02.

Tống Dực An nói không sai, tôi ở nơi này không có bạn bè.

Nhà của tôi ở tỉnh Giang, cách nơi này cả ngàn cây số.

Gia đình, họ hàng, những người bạn thân thiết, tri kỷ của tôi, tất cả đều ở tỉnh Giang.

Vì một người mà vứt bỏ nhiều người đến thế, bây giờ nghĩ lại, thật là không đáng.

Tôi mỉm cười lắc đầu, tiếp tục bước đi dọc theo bờ sông náo nhiệt.

Một người nghệ sĩ đường phố đang ôm đàn guitar ca hát, anh ấy hát rằng:

"Đâu phải cứ đi đến tận cùng mới là yêu trọn vẹn,
Một người thành toàn, còn tốt hơn ba người cứ mãi dây dưa."

Chẳng rõ là câu hát nào đã chạm vào lòng tôi, tôi dừng bước, đến một quầy hàng mua một ly cocktail, yên lặng vừa uống rượu vừa nghe anh ấy hát hết cả bài.

Khi về đến nhà, thời gian đã quá 12 giờ đêm.

Tống Dực An bị tiếng mở cửa làm cho thức giấc, anh tựa vào khung cửa phòng ngủ, khó chịu nói: "Mấy giờ rồi? Cô còn biết đường dẫn xác về à?"

Đi trên đường bị gió thổi, men rượu bốc lên đầu, tôi chỉ cảm thấy đầu óc choáng váng, hoàn toàn không buồn đáp lời.

Anh nhìn thấy bộ dạng này của tôi thì càng thêm nổi giận, chất vấn: "Cô uống rượu à? Đã nói với cô bao nhiêu lần rồi, tôi không thích con gái uống rượu! Bộ dạng bây giờ của cô so với những loại phụ nữ không ra gì bên ngoài thì có gì khác nhau?"

Lời nói của anh ong ong bên tai tôi, tôi có chút nghe không rõ.

Nhưng câu tiếp theo thì tôi nghe rất rõ.

Anh nói: "Sao cô không thể học tập Tô Cẩm cho tốt một chút chứ?"

Học sao? Thì ra tôi thực sự đã học rất nhiều rồi.

Thậm chí đã học đến mức chẳng còn giống chính mình nữa.

Trước đây tôi thích tóc uốn lượn sóng nổi bật, mặc váy đỏ rực lửa nhảy múa trong vũ trường, sau khi quen Tống Dực An, trong tủ quần áo của tôi chỉ còn lại những chiếc váy trắng đơn thuần.

Trước đây tôi thích lái xe môtô phân khối lớn, tận hưởng cảm giác kích thích do tốc độ mang lại, sau khi ở bên Tống Dực An, tôi quanh quẩn trong xóm bếp, học cách rửa tay nấu canh.

Chẳng vì lý do gì khác, chỉ vì Tống Dực An thích, vì Tô Cẩm vốn là kiểu người như vậy.

Tôi ngước đôi mắt mơ màng lên, nhìn người đàn ông mà mình đã yêu suốt sáu năm qua.

Tôi nhìn anh từ một cậu thiếu niên trưởng thành thành một người đàn ông, nhìn gương mặt anh hằn lên những dấu vết của sự chín chắn.

Tôi tự cho là mình đủ hiểu anh, cũng tự cho là mình sẽ không còn yêu anh nữa, vậy mà câu nói vừa rồi vẫn làm đảo lộn tâm trí tôi.

Tôi không nhịn được, bật lại một câu: "Tô Cẩm tốt như vậy, sao anh không ở bên cô ấy luôn đi?"

Trong mắt anh cuộn lên cơn giận lôi đình, quát lớn: "Cô nói bậy bạ cái gì đó!"

Dứt lời, có lẽ nhận ra phản ứng của mình quá mức kịch liệt, Tống Dực An đầu tiên là ngẩn ra, sau đó hít một hơi thật sâu.

"Anh và Tô Cẩm chỉ là bạn bè, rốt cuộc phải nói bao nhiêu lần thì em mới thôi vô lý vì chút chuyện nhỏ nhặt này hả? Anh rất mệt, anh còn phải đi làm, phải xã giao! Không có thời gian và tâm trí đâu mà đi dỗ dành cho em vui!"

Tống Dực An có một thói quen mà chính anh cũng không nhận ra, đó là càng chột dạ thì nói lại càng nhiều.

Tôi cười khẩy, rồi day day hai bên thái dương đang đau nhức.

"Tùy anh vậy."

Bỏ lại câu này, tôi gượng cơ thể mệt mỏi bước vào phòng ngủ phụ, chốt cửa lại từ bên trong.

Tống Dực An ở bên ngoài đập cửa rầm rầm, anh gọi tên tôi, bắt tôi ra ngoài nói cho rõ ràng.

Nhưng tôi thực sự lười phải đôi co với anh, cứ thế mơ màng nằm xuống giường rồi thiếp đi.

Ngày đếm ngược thứ bảy để về nhà, khi tôi thức dậy, trong nhà đã không còn bóng dáng của Tống Dực An nữa.

Tôi biết, anh đang chiến tranh lạnh với tôi, hy vọng tôi sẽ giống như trước đây, chủ động cúi đầu nhận lỗi với anh trước.

Tôi cũng biết tối nay anh sẽ không về, vừa rồi khi lướt vòng bạn bè, Tô Cẩm có đăng một bài viết:

"Biết làm sao được, anh ấy cứ nhất quyết phải tổ chức tiệc đón gió cho mình, vậy thì mọi người gặp mặt không gặp không về nhé~"

Đúng vậy, Tô Cẩm đã về rồi.

Còn là về cùng một chuyến bay với Tống Dực An.

Tối qua mùi nước hoa trên người anh nồng nặc như thế, có lẽ trên máy bay lúc cô ấy ngủ say, anh đã cẩn thận từng li từng tí mà ghé vai cho cô ấy tựa vào.

Nhưng những điều đó đều chẳng liên quan gì đến tôi nữa.

Bởi vì, tôi sắp rời bỏ anh, để trở về nhà của chính mình rồi.`;

const chuong2 = `03.

Ăn xong bữa sáng, tôi gửi tin nhắn xin nghỉ việc cho cấp trên, rồi bắt tay vào thu dọn căn nhà của tôi và Tống Dực An.

Hai chú gấu bông nhỏ trên bậu cửa sổ kính lớn kia là món đồ chúng tôi mua vào ngày đầu tiên chuyển đến đây.

Hồi mới tốt nghiệp đại học, lương của cả hai đứa cộng lại còn chưa đầy sáu nghìn tệ, chỉ có thể thuê một căn phòng dưới tầng hầm tối tăm và ẩm thấp.

Mỗi khi trời mưa, nước theo những bậc thang cũ kỹ, rách nát chảy tràn xuống, khiến căn phòng ngập đầy nước bẩn hôi hám.

Tôi co rúm người trên giường, môi trường tồi tệ khiến khắp người tôi nổi đầy mẩn ngứa.

Tống Dực An vừa ôm lấy tôi, vừa cẩn thận bôi thuốc cho tôi.

Anh ấy bảo với tôi rằng, đợi sau này anh có khả năng rồi, nhất định sẽ đổi cho tôi một căn hộ chung cư cao cấp thật lớn, thật sáng sủa.

Sau này, lương mỗi tháng của anh lên tới hàng vạn tệ, chúng tôi cũng dọn từ tầng hầm đến nơi này.

Tuy đây không phải căn hộ cao cấp sang trọng, nhưng mỗi khi ngồi trên bậu cửa sổ nhìn ra bên ngoài, nhìn vạn ánh đèn đường ấm áp, tôi đều cảm thấy nơi đâu cũng ngập tràn hạnh phúc và tương lai.

Sau đó nữa, tôi sắm sửa thêm rất nhiều đồ đạc cho tổ ấm này.

Cốc đánh răng đôi, dép đi trong nhà đôi, móc chìa khóa đôi.

Cứ như vậy, tôi tích cóp từng chút một, dùng thời gian hai năm để lấp đầy căn nhà rộng một trăm mét vuông này.

Thế nhưng, lại chẳng thể nào lấp đầy được trái tim của Tống Dực An.

Thực ra không chỉ riêng Tống Dực An, ngay cả hội anh em chí cốt của anh cũng chưa từng coi trọng tôi.

Trong lòng họ, chỉ có kiểu tiểu tiên nữ thanh cao, không vướng bụi trần như Tô Cẩm mới xứng đôi với Tống Dực An.

Trước đây khi nghe thấy họ nói vậy, tôi còn chống nạnh tranh luận với họ vài câu.

Tôi bảo: "Tống Dực An nói rồi, anh ấy không thích Tô Cẩm, anh ấy ghét Tô Cẩm."

Hội bạn của anh cười ồ lên một lượt, bảo: "Chỉ có kẻ ngốc mới không nhìn ra Tống Dực An thích Tô Cẩm."

Đúng vậy, chỉ có kẻ ngốc mới không nhìn ra.

Tô Cẩm ăn đồ bậy bạ dẫn đến đau bụng, anh ấy vừa mắng cô ấy không biết tự chăm sóc bản thân, vừa bất chấp tuyết rơi dày đặc lúc 12 giờ đêm để đưa cô ấy đến bệnh viện.

Tô Cẩm đến kỳ kinh nguyệt làm bẩn quần, một người mắc bệnh sạch sẽ như anh trách cô ấy không có não, nhưng lại sẵn sàng cởi chiếc áo đồng phục của mình ra để quấn quanh eo cho cô ấy.

Những chuyện tương tự như vậy nhiều không đếm xuể.

Thậm chí ngay cả khi Tô Cẩm công khai bạn trai, anh uống đến say khướt rồi chấp nhận lời tỏ tình của tôi, tôi vẫn khăng khăng tin rằng:

Là do sự kiên trì của mình cuối cùng cũng lay động được chân tình.

Chứ tuyệt đối không phải vì Tống Dực An thích Tô Cẩm.

Tôi gom tất cả những món đồ đôi ấy đóng gói lại, ném thẳng vào thùng rác dưới lầu, sau đó thu dọn đồ đạc cá nhân của mình cho vào thùng giấy để ngày mai nhân viên chuyển phát nhanh đến lấy.

Đến khi làm xong xuôi mọi việc thì trời đã tối hẳn.

Tôi mệt mỏi rã rời nằm bệt xuống ghế sofa, giao diện vòng bạn bè bỗng nhảy lên một chấm đỏ thông báo.

Là Tô Cẩm đăng bài.

Trong ảnh, Tô Cẩm và Tống Dực An đội hai chiếc mũ len xù lông cùng kiểu nhưng khác màu, được rất nhiều người vây quanh ở giữa, nụ cười rạng rỡ.

Dòng trạng thái viết: "Luôn có một người sẵn sàng cùng mình làm những trò kỳ quặc, và cùng mình trở lên đáng yêu~"

Nghĩ lại đống đồ đôi vừa bị mình vứt đi chiều nay, tôi cười khẩy, hóa ra sự khác biệt giữa yêu và không yêu lại lớn đến thế.

Anh ấy sẵn sàng chiều chuộng theo những trò đáng yêu của cô ấy, nhưng lại chê bai những món đồ tôi mua là ấu trĩ, trách tôi phí tiền vào những thứ vô bổ.

Nhưng cũng may, từ nay về sau tôi sẽ không mua nữa, và tôi với anh cũng chẳng còn cái gọi là "sau này".

Tôi đưa tay ấn nút thích bài đăng đó.

04.

Ngày đếm ngược thứ sáu để về nhà.

Nhân viên chuyển phát nhanh vừa khênh những chiếc thùng giấy tôi đã thu dọn xong đi khỏi, thì Tống Dực An trở về.

Anh mặc một bộ đồ thể thao đen toàn tập, mái tóc rủ nhẹ trước trán, trông vừa ngoan ngoãn lại vừa trẻ trung, khoan khoái.

Đây vốn không phải phong cách ăn mặc thường ngày của anh.

Trong tủ quần áo ở phòng ngủ, những bộ đồ được tôi tỉ mẩn là phẳng phiu từng nếp một đều là những bộ âu phục cắt may vừa vặn, lịch lãm.

Có lẽ nhận ra ánh mắt của tôi cứ lưu luyến mãi trên bộ quần áo anh đang mặc, Tống Dực An có chút không tự nhiên quay người đi, đưa túi bánh bao trong tay cho tôi.

"Bữa sáng mua cho em này, anh vào thay quần áo đã."

Tôi dời tầm mắt, gật đầu, né người nhường lối đi ở cửa.

Khi đi lướt qua người tôi, anh lại nói thêm một câu:

"Hôm qua mọi người chơi muộn quá, anh sợ làm phiền em ngủ... Bài đăng trên vòng bạn bè của Tô Cẩm, em đừng để bụng nhé."

Tôi ngẩn người một lát, nhận ra là anh đang giải thích với mình.

Trước đây, Tống Dực An chưa từng giải thích với tôi bất cứ điều gì.

Nếu tôi chủ động gặng hỏi một lời giải thích, anh sẽ mất kiên nhẫn mà hất tay tôi ra, nói: "Giữa người yêu với nhau mà đến chút lòng tin tối thiểu này cũng không có, thế thì còn ở bên nhau làm cái gì nữa?"

Từ đó về sau, tất cả những hiểu lầm hay cảm xúc tiêu cực tôi đều tự mình gặm nhấm và tiêu hóa lấy.

05.

Tôi vẫn im lặng gật đầu, nghe thấy anh khẽ thở dài một tiếng thật dài.

Lúc Tống Dực An từ trong phòng ngủ lao ra, tôi đang ngồi trên ghế sofa xem tivi.

Gương mặt anh lộ rõ vẻ hoảng hốt, hỏi: "Kiều Kiều, đồ đạc đâu hết rồi? Sao đồ của em không thấy nữa? Cả quần áo..."

"Tống Dực An," tôi ngắt lời anh, "tôi có chuyện muốn nói với anh..."

Lúc gửi đồ đi tôi đã nghĩ kỹ rồi, nếu Tống Dực An có thể phát hiện ra điểm bất thường trong nhà, chứng tỏ trong lòng anh vẫn còn có vị trí của tôi, tôi sẽ bình tâm hòa khí mà nói lời chia tay với anh, chia ly êm đẹp.

Còn nếu anh ấy không nhận ra, đợi đến khi bàn giao xong công việc ở công ty, tôi sẽ trực tiếp rời đi, vĩnh viễn không gặp lại.

"Không! Kiều Kiều!"

Có lẽ vì phản ứng quá mực kỳ lạ của tôi hai ngày nay đã khiến Tống Dực An linh cảm thấy điều gì đó.

Anh chộp lấy cánh tay tôi, nửa quỳ xuống trước mặt tôi.

"Kiều Kiều, không phải em luôn muốn đi ăn thịt nướng ở quảng trường trung tâm sao? Bây giờ chúng ta đi ăn luôn."

Nói xong, chẳng đợi tôi đồng ý, anh đã kéo tôi đứng dậy khỏi ghế sofa, cuống cuồng mặc áo khoác vào cho tôi, quàng thêm khăn, rồi nắm chặt tay tôi kéo ra khỏi cửa.

Tôi bước đi phía sau anh, cúi đầu nhìn hai bàn tay đang đan chặt vào nhau của hai đứa.

Anh nắm tay tôi dùng lực mạnh đến thế, mạnh đến mức trong một khoảnh khắc thoáng qua, tôi đã ngỡ người này thực sự yêu mình.

Thế nhưng chỉ mới vài ngày trước, anh cũng từng nắm tay một cô gái khác một cách thân mật, không chút khoảng cách như vậy.

Vừa ra đến cổng khu chung cư, chúng tôi chạm mặt ngay một người đồng nghiệp cùng văn phòng.

Nơi này cách công ty tôi làm việc không xa, rất nhiều đồng nghiệp đều thuê nhà quanh đây.

Nhìn thấy tôi, cô ấy nhiệt tình bước lên chào hỏi.

Tôi trò chuyện với cô ấy vài câu, ánh mắt cô ấy đột nhiên chuyển hướng sang Tống Dực An đang đứng bên cạnh tôi.

Cô ấy khẽ hích vào vai tôi, giọng điệu mang chút đùa giỡn nói: "Dĩ Kiều, cậu xin nghỉ việc để về quê, mà nỡ để anh người yêu đẹp trai ngời ngời này ở lại đây một mình sao?"

Tống Dực An đột ngột quay phắt sang nhìn tôi.

Đôi mắt anh ấy mở to trừng trừng, như thể vừa nghe thấy một tin tức gì đó vô cùng hoang đường, không thể tin nổi.

"Kiều Kiều, em..."`;

const chuong3 = `06.

"Tống Dực An, tối qua anh bỏ quên áo khoác ở nhà em, em mang qua trả cho anh này."

Là Tô Cẩm.

Cô ấy mặc một bộ đồ thể thao màu trắng kem, vừa đi tới vừa xách một chiếc túi trên tay.

Quai túi hơi mảnh nên siết vào lòng bàn tay cô ấy một lằn đỏ.

Tống Dực An liếc nhìn tôi một cái, rồi rảo bước nhanh đến bên cạnh cô ấy, đón lấy chiếc túi rồi nhíu mày nói: "Chút chuyện nhỏ này em cứ nhắn tin một tiếng, anh qua lấy là được rồi."

"Em không biết, dù sao thì em cũng mang qua đây rồi, anh phải mời em ăn cơm đấy."

Hai người bọn họ mặc hai bộ đồ thể thao cùng kiểu dáng, trong mắt người ngoài nhìn vào lại càng giống một đôi hơn.

Cô đồng nghiệp của tôi có chút bối bối, cô ấy bứt rứt ngón tay nhìn Tống Dực An và Tô Cẩm, rồi lại nhìn sang gương mặt không chút cảm xúc của tôi.

Cuối cùng, cô ấy bước lên ôm lấy tôi một cái, ghé vào tai tôi nói nhỏ:

"Dĩ Kiều, tương lai mọi sự thuận lợi nhé."

Đồng nghiệp rời đi rồi.

Cái ôm của cô ấy ấm áp đến thế, khiến tôi bỗng dưng có cảm giác muốn khóc.

Nhưng tôi không khóc, chỉ quay người đi thẳng vào nhà.

Tống Dực An rất nhanh đã phát hiện ra tôi không còn ở đó, liền dẫn theo Tô Cẩm lên lầu tìm tôi.

Tô Cẩm trốn sau lưng Tống Dực An, dáng vẻ rụt rè, dè dặt như thể tôi là thú dữ hay lũ quét không bằng.

"Chị Kiều Kiều, chị đừng trách anh Dực An nhé, là em cứ đòi theo anh ấy lên đây đấy ạ."

"Chuyện này thì liên quan gì đến em?" Tống Dực An một chút tội danh cũng không muốn để Tô Cẩm phải gánh.

Tô Cẩm thè lưỡi tinh nghịch, rồi bắt đầu đưa tay nghịch ngợm mấy món đồ trang trí trên kệ ngay cửa.

Anh ấy lại nhìn về phía tôi, mở lời: "Bên ngoài lạnh quá, cô ấy lại mặc ít áo."

"Ừm, tôi biết rồi." Tôi vô cùng thấu hiểu mà nói, "Hai người đi ăn đi, tôi không đi đâu."

Tống Dực An day day thái dương, dường như chính anh cũng không biết phải xử lý tình huống hiện tại thế nào.

Một lát sau, anh chủ động chuyển chủ đề.

"Chuyện xin nghỉ việc về quê lớn như vậy, tại sao em không nói cho anh biết?"

"Quyết định đột xuất thôi, mấy ngày nay anh không có nhà nên tôi không nói với anh."

Giọng điệu nói chuyện của tôi rất đỗi bình thường, nhưng Tống Dực An vẫn nghe ra được sự xa cách trong đó.

Anh bước lại gần tôi vài bước, giọng nói đã mang theo mấy phần sốt ruột.

"Nghỉ việc là chuyện nhỏ, nhưng đâu nhất thiết phải về quê chứ? Ở đây cơ hội việc làm nhiều, môi trường cũng lớn, em mà về rồi thì chẳng có gì bảo đảm cả... Hơn nữa, anh là bạn trai của em, ít nhất em cũng phải bàn bạc với anh một tiếng chứ."

Tôi kinh ngạc nhìn anh.

Trước đây, chuyện gì tôi cũng muốn bàn bạc với anh, muốn hỏi ý kiến của anh.

Nhưng lúc đó anh lại nói tôi sống không có bản ngã, không có nổi một chút chính kiến của riêng mình.

Tôi khẽ thở dài một tiếng gần như không nghe thấy.

"Chẳng có gì đáng để bàn bạc cả, tôi không thể ở lại nơi này mãi được, nhà của tôi ở tỉnh Giang..."

"Nhưng còn anh thì sao? Chúng ta..."

Cảm xúc của Tống Dực An có chút kích động, đôi mắt anh đỏ lên, một câu chỉ mới nói được phần đầu thì đã bị cắt ngang bởi tiếng thủy tinh vỡ loảng xoảng truyền đến từ phía cửa.

07.

Sắc mặt Tống Dực An hoảng hốt, anh lao thẳng đến bên cạnh Tô Cẩm, nhìn ngó cô ấy từ trên xuống dưới.

"Sao thế? Có bị thương ở đâu không?"

Khóe mắt Tô Cẩm còn vương nước mắt, tủi thân mếu máo: "Tống Dực An..."

Cô ấy giơ bàn tay của mình lên, trên ngón tay trỏ bên trái có một vết thương nhỏ bằng hạt gạo đang rỉ máu.

Tống Dực An theo bản năng chộp lấy tay Tô Cẩm, cẩn thận quan sát như nâng niu báu vật.

Anh không tự chủ được mà quát lên với cô ấy: "Sao em ngốc thế hả? Có thể đừng lúc nào cũng khiến anh phải lo lắng được không?"

Tô Cẩm thút thít khóc nhỏ, đầu tựa vào cánh tay anh mà cọ cọ.

"Tống Dực An, anh đừng tức giận mà, sau này em nhất định sẽ cẩn thận.

Anh và chị Kiều Kiều đừng vì em mà cãi nhau, có được không?"

Nhờ có Tô Cẩm nhắc nhở, Tống Dực An mới sực nhận ra trong phòng vẫn còn có sự tồn tại của tôi.

Anh giật mình lùi lại nửa bước, giãn ra một khoảng cách với Tô Cẩm.

"Kiều Kiều, anh..."

"Chị Kiều Kiều, chị đừng hiểu lầm nhé, em và anh Dực An chỉ là bạn cực kỳ thân thôi. Vừa rồi anh ấy cũng chỉ là theo thói quen thôi chứ không có ý gì khác đâu ạ..."

Tô Cẩm đứng ra, giống như một bông hoa bách hợp yếu ớt che chắn trước người Tống Dực An.

"Hai đứa em từ nhỏ đã cùng nhau lớn lên, từ lâu đã xem nhau như người thân rồi. Nếu chị thực sự không thể chấp nhận được em, thì sau này... em tuyệt đối không xuất hiện trước mặt anh ấy nữa."

Cô ấy rơi vài giọt nước mắt, cơ thể lung lay như sắp đổ, trông qua thì đúng là có vài phần đau khổ và quyết tuyệt thật.

Tôi cười khẩy, giữ sự im lặng.

Thấy tôi không chịu diễn cùng vở kịch của mình, Tô Cẩm khóc nấc lên thành tiếng.

"Chị Kiều Kiều, em đã nhượng bộ đến mức này rồi, chị còn muốn em phải thế nào nữa đây?"

"Đủ rồi đấy Lục Dĩ Kiều!" Tống Dực An kéo Tô Cẩm ra sau lưng mình, nhìn tôi bằng ánh mắt tràn đầy sự thất vọng, "Em vừa phải thôi chứ."

"Tôi vừa phải thôi?"

Tôi rõ ràng chẳng làm gì cả, cũng chẳng nói câu nào, vậy mà anh chỉ vì vài giọt nước mắt của Tô Cẩm là đã định tội rằng tôi bắt nạt cô ấy.

Cái thời buổi này, không được yêu đúng là một cái tội mà.

Tôi đột nhiên cảm thấy vô lực, càng không muốn tranh biện với anh về những chuyện này nữa.

"Bỏ đi, cứ vậy đi."

Nghe ra sự mệt mỏi trong giọng điệu của tôi, Tống Dực An cũng nhận ra thái độ vừa rồi của mình đối với tôi quả thực có chút quá đáng.

Anh hít một hơi thật sâu.

"Kiều Kiều, vừa rồi anh vội quá. Thế này đi, anh đưa cô ấy đến bệnh viện băng bó trước, có chuyện gì thì đợi tụi anh về rồi nói sau."

Tôi suy nghĩ một chút rồi gật đầu.

Dù sao thì chuyện chia tay cũng nên nói cho rõ ràng thì tốt hơn.

Tống Dực An đưa Tô Cẩm rời đi.

Thế rồi ngay khoảnh khắc chuẩn bị bước chân ra khỏi cửa nhà, Tô Cẩm bỗng quay đầu lại, nở với tôi một nụ cười đầy đắc ý.

"Chờ một chút!"

08.

Tôi gọi giật hai người đang định bước ra cửa lại, chậm rãi đi đến trước mặt bọn họ.

"Có chuyện gì thế?" Tống Dực An hỏi tôi.

Tôi nhìn chằm chằm vào Tô Cẩm.

Cô ấy tưởng tôi định vạch trần nụ cười khiêu khích vừa rồi của cô ấy, liền chột dạ quay đầu nhìn sang hướng khác.

Tôi đưa tay ra, lật ngửa lòng bàn tay.

"Đưa đây."

"Cái... cái gì cơ?"

"Chuỗi hạt Phật bản mệnh Tống Dực An đưa cho cô, đó là của tôi."

Tô Cẩm thở phào nhẹ nhõm, rồi lập tức bày ra bộ dạng yếu đuối, hoảng hốt như trước.

"Em không biết đây là đồ của chị đâu ạ, em... em... Tống Dực An, sao anh có thể lấy đồ của chị Kiều Kiều đem tặng cho em chứ? Anh đáng ghét quá đi mất!"

Tô Cẩm hờn dỗi nhìn Tống Dực An.

Tống Dực An không ngờ tôi gọi lại là để đòi lại chuỗi hạt Phật, anh mím môi, dường như đang cân nhắc câu chữ để giải thích với tôi.

"Kiều Kiều, anh biết tự tiện đem món quà em tặng cho người khác là không đúng.

Nhưng dạo này Tô Cẩm gặp nhiều chuyện không suôn sẻ, cho nên anh mới tự ý đưa chuỗi hạt đã được khai quang đó cho cô ấy đeo để cầu may."

"Cái gì cơ? Chuỗi hạt đó còn được khai quang nữa sao? Tống Dực An, sao anh không nói sớm cho em biết, đây nhất định là chị Kiều Kiều đã phải rất vất vả mới cầu được cho anh, anh thật là..."

Tô Cẩm sốt sắng nhìn tôi, "Chị Kiều Kiều, anh ấy cũng chỉ vì quá lo lắng cho em thôi ạ, chị yên tâm, bây giờ em về nhà tháo chuỗi hạt ra trả lại cho chị ngay."

"Không được!" Tống Dực An ngăn cản, "Kiều Kiều, chuỗi hạt đã tặng cho Tô Cẩm rồi thì không có lý nào lại đòi về cả.

Nếu em thấy nó trân quý thì đợi vài ngày nữa, anh đi cùng em lên chùa cầu một chuỗi khác."

Không phải là không có lý nào đòi lại, mà là anh ấy sợ nếu không có chuỗi hạt ấy phù hộ, Tô Cẩm sẽ thực sự xảy ra chuyện gì ngoài ý muốn.

Trước khi ở bên Tống Dực An, tôi là một người theo chủ nghĩa duy vật kiên định.

Mùa đông năm đầu tiên sau khi hai đứa bên nhau, thời tiết lạnh giá vô cùng, căn phòng hầm cũ kỹ không thể cản nổi những đợt gió bấc rét buốt.

Dù có đắp tấm chăn bông dày sụ thì người vẫn cứ run lên bần bật.

Thể trạng của Tống Dực An vốn yếu, trong vòng một tháng trời cứ sốt đi sốt lại mãi không dứt.

Chị đồng nghiệp khóa trên dẫn dắt tôi ở công ty có bảo với tôi rằng, có những chuyện không thể không tin, tốt nhất là nên đi cầu một món đồ tâm linh có linh tính về đeo để xin thần phật che chở.

Thế là tôi đã bất chấp gió tuyết, tiêu tốn cả một ngày trời mới cầu được một chuỗi hạt Phật bản mệnh từ tay của vị sư trụ trì chùa Vạn Phật.

Tôi tự tay đeo chuỗi hạt vào tay Tống Dực An, có lẽ trên đời thực sự có thần minh tồn tại.

Bệnh tình của Tống Dực An sau đó quả nhiên thuyên giảm rồi khỏi hẳn.

Khi đó, Tống Dực An đã ôm lấy tôi mà hôn, nói rằng có được người vợ như tôi thì cuộc đời này anh chẳng còn mong cầu gì hơn nữa.

Vậy mà còn chưa đầy ba năm trôi qua, thời gian đổi thay, lòng người cũng khác.

Nước mắt tôi bỗng chừng vô thức rơi xuống, Tống Dực An buông Tô Cẩm ra, giơ tay định lau nước mắt cho tôi.

Tôi quay mặt đi, bàn tay của anh khựng lại trơ trọi giữa không trung.

"Không cần đâu, vạn vật tâm linh đều có linh tính của nó, anh đã không trân trọng nó thì nó cũng chẳng muốn đi theo anh nữa."

Trái tim Tống Dực An như có một bàn tay bóp nghẹt, dâng lên cảm giác đau nhói.

"Kiều Kiều..."

"Hai người đi đi."

Tôi đóng sầm cửa lại, cách biệt hai người bọn họ ra khỏi tầm mắt của mình.

09.

Tống Dực An lại có thêm hai đêm không về nhà.

Tôi biết anh đang ở đâu, và cũng biết anh đang làm gì.

Anh chụp màn hình đoạn chat nhóm của hai bên gia đình gửi qua WeChat cho tôi.

Trong nhóm, Tô Cẩm đang nũng nịu nói nếu trên tay mình mà để lại sẹo thì cô ấy nhất định sẽ cắn Tống Dực An một cái.

Những gì cô ấy phải chịu, Tống Dực An cũng phải chịu cùng.

Ở phía dưới, mẹ của Tống Dực An gửi một biểu tượng mặt cười lớn, rồi nhắn kèm theo dòng chữ tag tên Tống Dực An, bảo anh bắt buộc phải chăm sóc thật tốt cho Tô Cẩm, nếu Tô Cẩm mà bị sẹo thật thì...

Dù Tống Dực An có ý che khuất phần tin nhắn tiếp theo, nhưng dựa vào nửa hàng chữ lộ ra bên dưới, tôi đã đoán được mẹ anh nói gì rồi.

Bà nói: "Thì con phải chịu trách nhiệm với con bé, cưới con bé về đi."

Nực cười làm sao, trên danh nghĩa tôi vẫn đang yêu đương với con trai của họ, vậy mà họ lại có thể đường đường chính chính mai mối, dắt dây tơ hồng cho bạn trai của tôi ngay trước mắt như vậy.

Tống Dực An lại để lại lời nhắn cho tôi, nói: "Kiều Kiều, bên này xong việc là anh về ngay, em ở nhà đợi anh nhé."

Vòng bạn bè của Tô Cẩm mấy ngày nay cũng chẳng để im một lúc nào, hầu như cứ cách vài tiếng là cô ấy lại đăng một trạng thái mới.

Và không có một ngoại lệ nào, tất cả đều có liên quan đến Tống Dực An.

Ví dụ như, anh giúp cô ấy gội đầu, lúc cô ấy gối đầu lên đùi anh thì chê chân anh cứng làm cô ấy ê ẩm cả đầu.

Hoặc ví dụ như, anh hầm canh cho cô ấy, đến lúc múc ra bát rồi mới sực nhớ ra là chưa cho muối.

Hội bạn thân của Tống Dực An ở dưới phần bình luận thì hò hét, phấn khích như một lũ khỉ, từ đầu đến cuối chỉ lặp đi lặp lại đúng ba chữ: "Ở bên nhau".

Tống Dực An không hề ngăn cản Tô Cẩm đăng những bài viết mập mờ, đầy tính ám muội như thế, anh chỉ tùy ý phản hồi lại một người bạn ở dưới bình luận: "Đừng nói lung tung, tao có bạn gái rồi."

Tôi cười lạnh, tắt màn hình điện thoại, rồi đón lấy một chiếc kìm bấm cỡ lớn từ tay người nhân viên quản lý.

Người nhân viên hỏi tôi: "Thưa cô, cô thực sự chắc chắn muốn bấm đứt chiếc khóa đồng tâm này sao?

Một khi đã bấm đứt, điều đó có nghĩa là đoạn duyên phận giữa hai người sẽ hoàn toàn chấm dứt, không còn gì nữa."

Tôi nhìn vào cái tên "Tống Dực An" và "Lục Dĩ Kiều" được khắc trên mặt khóa.

Lúc trước khi cùng nhau treo chiếc khóa đồng tâm này lên ngọt ngào bao nhiêu, thì giờ phút này nhìn lại trông nó châm biếm bấy nhiêu.

Tôi trả lời: "Tôi chắc chắn."

Một tiếng "cạch" vang lên, gọng khóa bị bấm đứt đôi.

Chiếc khóa đồng tâm khắc tên của hai chúng tôi rơi thẳng xuống vực sâu thăm thẳm dưới chân, hoàn toàn biến mất khỏi tầm mắt.`;

const chuong4 = `10.

Ngày tôi nhận được quyết định nghỉ việc cũng là ngày đếm ngược thứ tư trước khi về quê.

Tống Dực An lại trở về nhà với mùi nước hoa xa lạ trên người.

Dưới mắt anh hằn lên một quầng thâm xám xịt, rõ ràng là mấy ngày qua không được nghỉ ngơi tử tế.

Anh ôm lấy tôi khi tôi đang ngồi trên ghế sofa, rồi tựa đầu lên đùi tôi.

Tôi đẩy anh ra, anh liền nũng nịu càu nhàu: "Kiều Kiều, để anh nghỉ một lát đi."

Tôi đặt chiếc chìa khóa nhà lên mặt bàn trà trước mặt:

"Trả lại cho anh."

Tống Dực An bỗng giật mình mở choàng mắt, ngồi bật dậy.

Anh không thể tin nổi nhìn chằm chằm vào chiếc chìa khóa, rồi lại nhìn tôi.

"Ý em là gì?"

"Tống Dực An," tôi nghiêm túc nhìn thẳng vào anh, "chúng ta chia tay đi."

"Anh không đồng ý!" Tống Dực An đứng phắt dậy, âm lượng cũng cao lên vài phần.

Tôi coi như không nghe thấy lời từ chối của anh, tiếp tục bình thản nói: "Tiền thuê căn nhà này là chúng ta cùng đóng, chi tiêu ngày thường cũng dùng tiền trong tài khoản chung, bây giờ chẳng còn lại bao nhiêu.

Quà cáp các dịp lễ tết có lẽ anh tặng tôi đắt hơn một chút, nếu anh cảm thấy chịu thiệt thì cứ tính toán đi, tôi sẽ bù vào phần chênh lệch."

Giọng Tống Dực An run rẩy: "Kiều Kiều, em nhất định phải tính toán rạch ròi với anh như vậy sao? Em thực sự muốn chia tay với anh?"

Tôi không hề lay chuyển, chỉ ngước đầu nhìn anh.

"Tôi muốn chia tay với anh."

"Chỉ vì Tô Cẩm thôi sao? Nhưng anh đã nói rất nhiều lần rồi, cô ấy chỉ là bạn của anh thôi!

Nếu em không thích, anh hoàn toàn có thể cắt đứt qua lại với cô ấy!"

"Cắt đứt nổi không?"

Một câu hỏi nhẹ bẫng của tôi khiến Tống Dực An thẫn thờ chết trân tại chỗ.

Tôi đứng dậy.

"Tống Dực An, giữa tôi và anh, người ngăn cách chưa bao giờ là Tô Cẩm.

Từ ngày kỷ niệm ba năm cho đến nay đã trôi qua một tuần lễ rồi. Trong nhà này, ngoại trừ đồ đạc cá nhân của tôi không còn nữa, anh có phát hiện ra thiếu mất thứ gì nữa không?

Dép đi trong nhà đôi, móc chìa khóa đôi, cốc nước đôi của chúng ta... tất cả đều không còn nữa. Nhưng anh chẳng hề nhận ra, bởi vì anh căn bản có thèm để tâm đâu."

"Không phải, anh chỉ là..." Anh ấy đột nhiên không thể tìm nổi một lý do nào hợp lý.

"Anh chỉ là không bận tâm đến tôi mà thôi.

Anh không biết địa chỉ cụ thể ở quê tôi, trên WeChat anh không kết bạn với bất kỳ người bạn nào của tôi, vì anh cảm thấy chẳng việc gì phải giữ liên lạc với họ.

Tống Dực An, từ đầu đến cuối, anh chưa từng muốn cho tôi vào tương lai của anh."

"Căn bản không phải như thế!" Anh lớn tiếng phản bác tôi, "Tô Cẩm nói đúng, em chỉ đang ghen tuông vô cớ thôi, em đố kỵ vì mối quan hệ giữa cô ấy và anh tốt, đố kỵ vì thời gian qua anh bận lo cho cô ấy mà lạnh nhạt với em!

Bây giờ em đang dùng chuyện chia tay để uy hiếp anh đúng không?"

"Lại là Tô Cẩm, Tô Cẩm. Đã tin tưởng cô ấy như vậy thì anh đi mà tìm cô ấy đi, còn quay về đây làm cái gì?"

Tôi hoàn toàn không thể nói lý với Tống Dực An, điều này khiến tâm trí tôi rối bời và mệt mỏi.

Cuối cùng, tôi không nhịn được nữa mà bùng nổ:

"Anh tưởng Tô Cẩm là cô em gái ngây thơ không hiểu sự đời chắc?

Để tôi đoán thử xem, những bài đăng trên vòng bạn bè của cô ấy là do anh ngầm cho phép đúng không?

Có phải anh cũng dặn đi dặn lại cô ấy rằng, đăng bài thì phải chặn không cho tôi nhìn thấy đúng không?"

Tống Dực An ngẩn người: "Em... sao em biết được? Chẳng lẽ... Không, không thể nào! Tô Cẩm sẽ không làm thế!

Kiều Kiều, đến nông nỗi này rồi mà em vẫn muốn vu oan cho Tô Cẩm sao, sao em lại trở nên như thế này?"

Tôi cười lạnh, nhìn anh.

"Thảo nào cô ấy có thể dắt mũi anh xoay như chong chóng.

Cô ấy căn bản không hề chặn tôi, tôi đã trơ mắt nhìn hai người liếc mắt đưa tình, nhìn hai người mỗi ngày đều phát "cẩu lương" thể hiện tình cảm ân ái.

Tống Dực An, tôi cảm thấy ghê tởm!"

Tống Dực An sầm mặt, đùng đùng đẩy cửa lao ra ngoài.

11.

Từ sau trận cãi vã ngày hôm đó, Tống Dực An không hề về nhà, cũng không hề liên lạc với tôi.

Tôi lại càng thấy tự do tự tại, mỗi ngày đều đếm ngược ngày về quê, từ con số bốn chuyển dần về con số một.

Buổi sáng trước ngày tôi rời đi, cánh cửa lớn bỗng bị ai đó bên ngoài đập vào rầm rầm.

Tôi tưởng là Tống Dực An trở về, không ngờ khi mở cửa ra, người đứng ở bên ngoài lại là Tô Cẩm.

Đôi mắt cô ấy đỏ ngầu, trông có vẻ như mấy ngày liền mất ngủ, lại còn vừa khóc một trận rất lâu.

Cô ấy đẩy mạnh tôi ra, lao thẳng vào trong nhà, đi lăng xăng một vòng kiểm tra rồi lại chạy đến chắn trước mặt tôi.

"Tống Dực An đâu? Cô giấu Tống Dực An ở đâu rồi?"

Tôi khựng lại một chút, rồi nhận ra rất có thể mấy ngày nay Tống Dực An cũng không hề liên lạc với cô ấy.

Tôi khoanh tay trước ngực, tựa người vào tường.

"Tống Dực An là một người bằng xương bằng thịt, tôi làm gì có bản lĩnh mà giấu được anh ta."

Tô Cẩm nghe thấy câu này, cảm xúc ngược lại càng thêm kích động.

Cô ấy xông lên phía trước, gương mặt vặn vẹo dữ tợn:

"Nhất định là cô! Nhất định là cô đã nói xấu tôi trước mặt anh ấy, khiến anh ấy hiểu lầm tôi.

Lục Dĩ Kiều, đồ ti tiện!"

Tôi nhìn cô ấy giống như một con hề đang nhảy nhót xốc nổi đầy điên cuồng, chỉ mỉm cười mà không nói một lời.

Thấy tôi có thái độ như vậy, Tô Cẩm bỗng nhiên lại từ từ bình tĩnh trở lại.

"Lục Dĩ Kiều, những bài đăng trên vòng bạn bè của tôi, cô đều nhìn thấy hết rồi đúng không?

Tống Dực An đối xử với tôi tốt lắm, ngày nào anh ấy cũng nấu cơm hầm canh cho tôi, có phải cô chưa từng được hưởng thụ sự cung phụng đãi ngộ này bao giờ đúng không?"

Tôi chẳng buồn để ý đến sự khiêu khích của cô ấy.

Tôi đã quyết định buông bỏ Tống Dực An rồi, thì sẽ không vì anh mà để tâm trạng mình xuất hiện bất kỳ gợn sóng nào nữa.

Nhưng sự im lặng của tôi trong mắt Tô Cẩm lại được coi là một sự yếu thế.

Cô ấy bắt đầu lấn lướt, tăng thêm tình tiết để miêu tả về cuộc sống chung của hai người trong mấy ngày qua.

Cô ấy nói cơ thể anh ấm áp biết bao, cơ bụng của anh sờ vào mang lại cảm giác an toàn đến thế nào.

Cô ấy còn nói thêm: "Buổi tối anh ấy ôm tôi lăn lộn trên giường, cái mùi vị một mình cô cô đơn giữ phòng trống chắc là không dễ chịu gì đâu nhỉ?

Tống Dực An nói rồi, anh ấy từ lâu đã chán ngấy cô rồi, người anh ấy yêu chỉ có tôi thôi.

Anh ấy hận không thể chia tay với cô ngay lập tức, hận không thể bảo cô cút xéo khỏi thế giới của anh ấy cho nhanh!"

Nói đến đoạn cuối, giọng cô ấy trở nên khản đặc, những động tác vung tay múa chân quá khích khiến mái tóc vốn xõa tung trở nên hỗn loạn, trông cô ấy chẳng khác nào một mụ điên.

Tô Cẩm gườm gườm nhìn chằm chằm tôi, cô ấy muốn nhìn thấy tôi đau khổ, muốn nhìn thấy tôi đổ vỡ phát điên.

Nhưng tôi cố tình không để cô ấy được toại nguyện.

Tôi liếc nhìn bóng người vừa xuất hiện ở lối hành lang ngoài cửa, rồi chậm rãi ghé sát lại gần cô ấy, nhàn nhạt nói: "Cô nói hay như vậy, nhưng cô đã bao giờ nghĩ qua chưa...

Nếu anh ta thực sự yêu cô, vậy thì tại sao giữa hai người lại còn có sự xuất hiện của tôi?"

"A——"

Tô Cẩm phát điên hét lên một tiếng chói tai, cô ấy lao về phía tôi, giơ cao cánh tay định tát xuống.

Nhưng cái tát đầy căm phẫn của cô ấy đã bị khựng lại ở khoảng cách cách mặt tôi mười phân, không cách nào tiến thêm được nữa.

12.

Tống Dực An đã tóm chặt lấy cổ tay của cô ấy.

Biểu cảm dữ tợn trên mặt Tô Cẩm ngay lập tức biến thành hoảng hốt.

Cô ấy không biết Tống Dực An đã đến từ lúc nào, và cũng không biết rốt cuộc anh đã nghe thấy được bao nhiêu phần.

Cô ấy chỉ có thể cố rặn ra vài giọt nước mắt, ôm lấy cánh tay anh.

Nhưng lần này không giống như trước đây, Tống Dực An thẳng thừng rút cánh tay của mình ra.

Anh nhìn Tô Cẩm bằng ánh mắt tràn ngập sự thất vọng, hỏi cô ấy: "Tại sao?"

"Tống Dực An..."

"Chính miệng anh đã bảo em khi đăng bài trên vòng bạn bè thì phải chặn Kiều Kiều, anh cũng chưa từng lên giường với em, lại càng chưa từng nói qua những lời đó với em.

Tại sao em lại phải nói với Kiều Kiều như thế hả?"

"Anh nghe em giải thích đã..."

Tô Cẩm cố gắng nắm lấy tay Tống Dực An, nhưng Tống Dực An lại tàn nhẫn hất mạnh ra.

"Anh không nghe! Những năm qua, anh đối xử với em như vậy còn chưa đủ tốt sao? Vì em, anh bỏ mặc một mình Kiều Kiều, vì em, anh cãi nhau với cô ấy! Nhưng tại sao em lại đối xử với anh như thế này?

Tại sao lại ở trước mặt Kiều Kiều nói ra những lời đường mật mập mờ quái đản đó?"

"Bởi vì em không muốn anh ở bên cạnh cô ấy!" Tô Cẩm gào thét thốt ra câu này, "Người anh yêu rõ ràng là em! Là cô ấy đã chen chân vào tình cảm của chúng ta! Cô ấy là tiểu tam!"

"Em câm miệng lại cho anh!"

Một tiếng "chát" giòn giã vang lên. Tống Dực An, Tô Cẩm, và ngay cả một người đứng xem kịch như tôi cũng đều sững sờ.

"Anh đánh em?" Tô Cẩm ôm lấy một bên mặt, không thể tin nổi.

"Anh dựa vào cái gì mà đánh em chứ?

Bây giờ anh đem mọi sai lầm đổ hết lên đầu em, nhưng kẻ làm tổn thương Lục Dĩ Kiều, kẻ khiến Lục Dĩ Kiều đau lòng nát óc... chính là anh!

Là chính anh, Tống Dực An ạ!"

Câu nói này vừa thốt ra, Tống Dực An giống như một quả bóng bị xì hết hơi, hoàn toàn mất đi sức lực.

Anh gục đầu xuống im lặng hồi lâu, mới đưa ngón tay run rẩy chỉ ra ngoài cửa.

"Tô Cẩm, em đi đi, sau này cũng đừng bao giờ gặp mặt nhau nữa."

13.

Chuyến bay vốn định sẵn vào ngày hôm sau của tôi, do thời tiết sương mù dày đặc liên tục nên đã bị hủy bỏ.

Tống Dực An cực kỳ vui mừng.

Mỗi ngày anh đều dậy thật sớm để chuẩn bị bữa sáng cho tôi, món canh từng xuất hiện trên vòng bạn bè của Tô Cẩm nay đã được bưng lên bàn ăn của tôi.

Anh cố chấp nghĩ rằng, trước đây tôi có thể dựa vào sự kiên trì bền bỉ không bỏ cuộc để lay động được anh, thì bây giờ anh cũng có thể dùng cách đó để lay động lại tôi.

Anh bắt đầu cầu nguyện cho thời tiết sương mù tan chậm một chút, nhưng cho dù thời gian có kéo dài thế nào đi chăng nữa, thì sương mù rồi cũng có lúc phải tan hoang, mặt trời rồi cũng sẽ lộ diện.

Ngày chuyến bay được khôi phục, Tống Dực An tiễn tôi ra sân bay.

Anh nhấc chiếc vali của tôi từ trong cốp xe xuống, vừa rơi nước mắt vừa nghẹn ngào hỏi tôi: "Kiều Kiều, chúng ta thực sự không còn cơ hội nào nữa sao?"

Tôi đưa tay đón lấy chiếc vali từ trong tay anh.

"Tống Dực An, chúc cho chúng ta từ nay về sau vĩnh viễn không bao giờ gặp lại."

Nói xong, tôi quay người, không một lần ngoảnh đầu lại mà bước thẳng vào trong sảnh nhà ga sân bay.

Tống Dực An im lặng đứng chôn chân tại chỗ giữa dòng người qua kẻ lại tấp nập.

Anh đưa bàn tay ra, trong lòng bàn tay là chuỗi hạt Phật bản mệnh mà tôi từng thành tâm cầu nguyện cho anh.

Anh đã tìm Tô Cẩm để đòi nó về. Lúc anh đeo lại nó lên tay, có một cụ bà đi ngang qua đã nói với anh rằng:

"Cậu thanh niên à, cậu phải biết trân trọng người đã tặng cậu chuỗi hạt này nhé.

Ở chùa Vạn Phật, phải đi qua chín trăm chín mươi chín bậc cầu thang, cứ đi một bước lại quỳ lạy một cái, thì mới cầu được vị sư trụ trì khai quang ban phước cho đấy."

Máy bay cất cánh, đâm xuyên qua những tầng mây dày.

Tống Dực An ngẩng đầu nhìn theo chiếc máy bay vừa lướt qua trên đỉnh đầu.

Anh hiểu rằng, trên thế gian này, sẽ không bao giờ còn có một người thứ hai, có thể yêu anh điên dại bằng cả sinh mạng giống như Lục Dĩ Kiều nữa rồi.

- Hết -`;

export const mayTanTroiLaiSang: Story = {
  slug: "may-tan-troi-lai-sang",
  title: "Mây Tan Trời Lại Sáng",
  author: "Khuyết Danh",
  translator: "Trạm Mochi Mochi",
  status: "Hoàn Thành",
  views: 20418,
  cover: cover5,
  tags: ["Ngôn Tình", "Hiện Đại", "Ngược Tâm", "Tra Nam", "SE"],
  summary,
  hot: true,
  chapters: [
    { index: 1, title: "Chương 1", paragraphs: toParagraphs(chuong1) },
    { index: 2, title: "Chương 2", paragraphs: toParagraphs(chuong2) },
    { index: 3, title: "Chương 3", paragraphs: toParagraphs(chuong3) },
    { index: 4, title: "Chương 4", paragraphs: toParagraphs(chuong4) },
  ],
};
