(() => {
  const $ = document.querySelector.bind(document);

  let timeRotate = 1000; // Chỉ quay trong 1 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const btnWheel = $(".btn--wheel");
  const showMsg = $(".msg");

  const listGift = [
    {
      text: " Chỉ có máy tính mới có thể bị nhiễm virus, điện thoại thì không",
      as: "Sai",
      percent: 5 / 100,
    },
    { text: "Một tam giác luôn có ba góc", as: "Đúng", percent: 5 / 100 },
    {
      text: "Số lẻ lớn nhất có hai chữ số là 100",
      as: "Sai",
      percent: 5 / 100,
    },
    { text: "Có thể chia một số cho 0", as: "Sai", percent: 5 / 100 },
    { text: "Số 7 là số nguyên tố", as: "Đúng", percent: 5 / 100 },
    { text: "Số 12 là số nguyên tố", as: "Sai", percent: 5 / 100 },
    { text: "Mặt Trời là một hành tinh", as: "Sai", percent: 5 / 100 },
    { text: "Lửa không có bóng", as: "Đúng", percent: 5 / 100 },
    {
      text: "Nếu nhân một số với 0, kết quả luôn bằng 0",
      as: "Đúng",
      percent: 5 / 100,
    },
    {
      text: "Robot có thể lập trình để tự suy nghĩ như con người.",
      as: "Sai",
      percent: 5 / 100,
    },
    { text: "Cửa tự động mở nhờ cảm biến.", as: "Đúng", percent: 5 / 100 },
    { text: "Mặt trời quay quanh Trái Đất", as: "Sai", percent: 5 / 100 },
    {
      text: "Con người có tổng cộng 206 cái răng",
      as: "Sai",
      percent: 5 / 100,
    },
    {
      text: "Điện thoại thông minh có thể dùng để chụp ảnh",
      as: "Đúng",
      percent: 5 / 100,
    },
    { text: "2 + 2 = 4", as: "Đúng", percent: 5 / 100 },
    {
      text: "Một số chia hết cho 2 thì luôn là số chẵn.",
      as: "Đúng",
      percent: 5 / 100,
    },
    { text: "Hình tròn có 4 góc", as: "Sai", percent: 5 / 100 },
    { text: "1 + 1 = 3", as: "Sai", percent: 5 / 100 },
    { text: "Xe điện không cần xăng để chạy.", as: "Đúng", percent: 5 / 100 },
    { text: "5 x 0 = 5", as: "Sai", percent: 5 / 100 },
    { text: "Tam giác có 4 cạnh", as: "Sai", percent: 5 / 100 },
    { text: "Sắt nặng hơn gỗ.", as: "Đúng", percent: 5 / 100 },
    { text: "Máy tính có thể bị nhiễm virus.", as: "Đúng", percent: 5 / 100 },
    {
      text: "Một số chia hết cho 2 thì luôn là số lẻ",
      as: "Sai",
      percent: 5 / 100,
    },
  ];

  const size = listGift.length;
  const rotate = 360 / size;
  const skewY = 90 - rotate;

  listGift.forEach((item, index) => {
    const elm = document.createElement("li");
    elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

    elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
      rotate / 2
    }deg);" class="text text-${index % 2 ? 2 : 1}">
      <b>${item.text}</b>
    </p>`;

    wheel.appendChild(elm);
  });

  const start = () => {
    isRotating = true;

    // Chọn ngẫu nhiên phần thưởng theo xác suất
    const random = Math.random();
    const gift = getGift(random);

    // Hiển thị ngay lập tức
    showMsg.innerHTML = `Câu hỏi: "${gift.text}" <br/> <h2 style="color: red; font-size:2rem">Đáp án: ${gift.as}</h2>`;

    // Giảm số vòng quay để dừng nhanh hơn
    currentRotate += 360 * 3;
    rotateWheel(currentRotate, gift.index);

    // Đặt lại trạng thái sau khi quay xong
    setTimeout(() => {
      isRotating = false;
    }, timeRotate);
  };

  const rotateWheel = (currentRotate, index) => {
    wheel.style.transition = `transform ${timeRotate / 1000}s ease-out`; // Hiệu ứng quay mượt
    wheel.style.transform = `rotate(${
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  const getGift = (random) => {
    let sum = 0;
    for (let i = 0; i < listGift.length; i++) {
      sum += listGift[i].percent;
      if (random <= sum) return { ...listGift[i], index: i };
    }
    return { ...listGift[listGift.length - 1], index: listGift.length - 1 };
  };

  btnWheel.addEventListener("click", () => {
    if (!isRotating) start();
  });
})();
