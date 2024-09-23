export const ITEMS = [
  { id: 1, title: 'Concert A', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 1 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '25/06/2024', endDate: '27/06/2024' },
  { id: 2, title: 'Concert B', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(19).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 2 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '26/06/2024', endDate: '29/06/2024' },
  { id: 3, title: 'Concert C', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(20).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 3 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '27/06/2024', endDate: '29/06/2024' },
  { id: 4, title: 'Concert D', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(21).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 4 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '28/06/2024', endDate: '30/06/2024' },
  { id: 5, title: 'Concert E', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(22).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 5 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '29/06/2024', endDate: '31/06/2024' },
  { id: 6, title: 'Concert F', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(23).jpg', description: 'Sự kiện đặc biệt về thiên nhiên và cây cỏ 6 rất nổi tiếng và ít người biết đến hãy mau chóng tham gia và chở thành 1 trong số ít người biết đến.', startDate: '30/06/2024', endDate:' 01/07/2024' },
];

export const SELLER = [
  {
    name: 'A',
    ticketName:'Vé Hạng S',
    ticketType:'Vé Online',
    ticketArea: 'Khu A',
    ticketDiscription:'Vé siêu cấp vip Pro',
    ticketDetailDiscipt:'Đây là mô tả chi tiết cho vé này , siêu chi tiết nên có nhiều text để nó dài nhìn cho nó chuyên nghiệp',
    ticketImage:'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(1).jpg',
    ticketPrice:'1000000'
  },
  {
      name: 'B',
      ticketName:'Vé Hạng D',
      ticketType:'Vé giấy',
      ticketArea: 'Khu C',
      ticketDiscription:'Vé siêu ngon',
      ticketDetailDiscipt:'Đây là mô tả chi tiết cho vé này , siêu chi tiết nên có nhiều text để nó dài nhìn cho nó chuyên nghiệp',
      ticketImage:'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(2).jpg',
      ticketPrice:'1000000'
  },
  {
      name: 'C',
      ticketName:'Vé Hạng A',
      ticketType:'Vé online',
      ticketArea: 'Khu E',
      ticketDiscription:'Vé mới mua chưa sử dụng',
      ticketDetailDiscipt:'Đây là mô tả chi tiết cho vé này , siêu chi tiết nên có nhiều text để nó dài nhìn cho nó chuyên nghiệp',
      ticketImage:'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(3).jpg',
      ticketPrice:'222222'
  },
  {
      name: 'D',
      ticketName:'Vé Hạng B',
      ticketType:'vé giấy',
      ticketArea: 'Khu B',
      ticketDiscription:'vé siêu rẻ',
      ticketDetailDiscipt:'Đây là mô tả chi tiết cho vé này , siêu chi tiết nên có nhiều text để nó dài nhìn cho nó chuyên nghiệp',
      ticketImage:'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(4).jpg',
      ticketPrice:'343434'
  }
]


// User data
export const USER_DATA = {
  is_seller: false,
  name: "Nguyễn Văn He",
  email: "abc@gmail.com",
  phone: "0937489382",
  add: "Nguyễn Văn Tăng, TP Hồ Chí Minh",
  money:"1000000000",
  rating: 4,
  detailRating:"Shop này bán hàng uy tín đáng mua, vé đẹp"
}

export const BOUGHT_TICKET_DATA = [

  {
    seller: {
      id: "123",
      name: "Nguyễn Văn An"
    },
    ticketName: "Vé ca nhạc văn nghệ",
    price: 100000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "30/09/2024",
      endDate: "05/10/2024"
    },
    quantity: 2,
    boughtDate: "21/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    },
    orderDetail: [
      {
        serial: "1234567890",
        image: "https://img.pikbest.com/templates/20210905/bg/264323cd744275455ec6b623879ea6ca_95933.png!f305cw",
        expireDate: "5/10/2024"
      },
      {
        serial: "1234567824",
        image: "https://img.pikbest.com/templates/20210905/bg/264323cd744275455ec6b623879ea6ca_95933.png!f305cw",
        expireDate: "5/10/2024"
      }
    ]
  }

  // },
  // {
  //   seller: {
  //     id: "101",
  //     name: "Lê Thị Hoa"
  //   },
  //   ticketName: "Vé triển lãm nghệ thuật",
  //   price: 150000,
  //   ticketType: {
  //     id: 2,
  //     name: "Offline"
  //   },
  //   event: {
  //     startDate: "01/10/2024",
  //     endDate: "03/10/2024"
  //   },
  //   quantity: 2,
  //   boughtDate: "20/09/2024",
  //   process: {
  //     id: 2,
  //     name: "Đã thanh toán"
  //   }
  // }

]
