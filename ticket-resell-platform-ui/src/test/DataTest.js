export const ITEMS = [
  { id: 1, title: 'Concert A', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg', description: 'Description for Concert A' },
  { id: 2, title: 'Concert B', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(19).jpg', description: 'Description for Concert B' },
  { id: 3, title: 'Concert C', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(20).jpg', description: 'Description for Concert C' },
  { id: 4, title: 'Concert D', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(21).jpg', description: 'Description for Concert D' },
  { id: 5, title: 'Concert E', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(22).jpg', description: 'Description for Concert E' },
  { id: 6, title: 'Concert F', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(23).jpg', description: 'Description for Concert F' },
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
  is_seller: false
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
    quantity: 1,
    boughtDate: "21/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    }
  },
  {
    seller: {
      id: "101",
      name: "Lê Thị Hoa"
    },
    ticketName: "Vé triển lãm nghệ thuật",
    price: 150000,
    ticketType: {
      id: 2,
      name: "Offline"
    },
    event: {
      startDate: "01/10/2024",
      endDate: "03/10/2024"
    },
    quantity: 2,
    boughtDate: "20/09/2024",
    process: {
      id: 2,
      name: "Đã thanh toán"
    }
  },
  {
    seller: {
      id: "102",
      name: "Trần Minh Hoàng"
    },
    ticketName: "Vé chiếu phim ngoài trời",
    price: 80000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "02/10/2024",
      endDate: "02/10/2024"
    },
    quantity: 1,
    boughtDate: "19/09/2024",
    process: {
      id: 3,
      name: "Đã hủy"
    }
  },
  {
    seller: {
      id: "103",
      name: "Phạm Ngọc Quang"
    },
    ticketName: "Vé buổi hòa nhạc giao hưởng",
    price: 200000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "05/10/2024",
      endDate: "06/10/2024"
    },
    quantity: 3,
    boughtDate: "18/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    }
  },
  {
    seller: {
      id: "104",
      name: "Nguyễn Văn Long"
    },
    ticketName: "Vé ca múa nhạc thiếu nhi",
    price: 50000,
    ticketType: {
      id: 2,
      name: "Offline"
    },
    event: {
      startDate: "29/09/2024",
      endDate: "30/09/2024"
    },
    quantity: 4,
    boughtDate: "17/09/2024",
    process: {
      id: 2,
      name: "Đã thanh toán"
    }
  },
  {
    seller: {
      id: "105",
      name: "Đỗ Thị Lan"
    },
    ticketName: "Vé hội thảo công nghệ",
    price: 120000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "10/10/2024",
      endDate: "11/10/2024"
    },
    quantity: 1,
    boughtDate: "22/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    }
  },
  {
    seller: {
      id: "106",
      name: "Vũ Quang Hưng"
    },
    ticketName: "Vé triển lãm công nghệ",
    price: 180000,
    ticketType: {
      id: 2,
      name: "Offline"
    },
    event: {
      startDate: "15/10/2024",
      endDate: "16/10/2024"
    },
    quantity: 2,
    boughtDate: "21/09/2024",
    process: {
      id: 2,
      name: "Đã thanh toán"
    }
  },
  {
    seller: {
      id: "107",
      name: "Ngô Thị Hạnh"
    },
    ticketName: "Vé kịch nói hiện đại",
    price: 90000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "08/10/2024",
      endDate: "09/10/2024"
    },
    quantity: 1,
    boughtDate: "18/09/2024",
    process: {
      id: 3,
      name: "Đã hủy"
    }
  },
  {
    seller: {
      id: "108",
      name: "Phạm Văn Bảo"
    },
    ticketName: "Vé lễ hội âm nhạc ngoài trời",
    price: 220000,
    ticketType: {
      id: 2,
      name: "Offline"
    },
    event: {
      startDate: "20/10/2024",
      endDate: "22/10/2024"
    },
    quantity: 3,
    boughtDate: "17/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    }
  },
  {
    seller: {
      id: "109",
      name: "Lý Minh Tú"
    },
    ticketName: "Vé hội sách và văn học",
    price: 60000,
    ticketType: {
      id: 1,
      name: "Online"
    },
    event: {
      startDate: "25/09/2024",
      endDate: "27/09/2024"
    },
    quantity: 1,
    boughtDate: "16/09/2024",
    process: {
      id: 2,
      name: "Đã thanh toán"
    }
  },
  {
    seller: {
      id: "110",
      name: "Nguyễn Thị Bích"
    },
    ticketName: "Vé show diễn thời trang",
    price: 250000,
    ticketType: {
      id: 2,
      name: "Offline"
    },
    event: {
      startDate: "12/10/2024",
      endDate: "14/10/2024"
    },
    quantity: 1,
    boughtDate: "15/09/2024",
    process: {
      id: 1,
      name: "Đang xử lý"
    }
  }

]
