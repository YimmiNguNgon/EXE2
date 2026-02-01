const mongoose = require('mongoose');
const Wish = require('./models/Wish');
require('dotenv').config();

async function seedWishes() {
    await mongoose.connect(process.env.MONGO_URI);
    await Wish.deleteMany({});

    const wishes = [
        // Love ❤️
        {
            message: "Chúc anh luôn hạnh phúc và yêu đời như chính anh đang làm em hạnh phúc! 💕",
            category: 'love',
            author: 'DearHim'
        },
        {
            message: "Cảm ơn anh vì đã luôn ở bên em. Em yêu anh rất nhiều! 💙",
            category: 'love',
            author: 'DearHim'
        },
        {
            message: "Có anh bên cạnh, mọi thứ đều trở nên tuyệt vời hơn. Yêu anh! ❤️",
            category: 'love',
            author: 'DearHim'
        },
        {
            message: "Anh là món quà tuyệt vời nhất mà em từng có! 💝",
            category: 'love',
            author: 'DearHim'
        },

        // Birthday 🎂
        {
            message: "Chúc mừng sinh nhật! Mong anh luôn khỏe mạnh, thành công và tỏa sáng! ✨",
            category: 'birthday',
            author: 'DearHim'
        },
        {
            message: "Happy Birthday! Tuổi mới nhiều niềm vui và thành công hơn nữa nhé! 🎉",
            category: 'birthday',
            author: 'DearHim'
        },
        {
            message: "Chúc anh sinh nhật vui vẻ! Mong mọi điều tốt đẹp sẽ đến với anh! 🎂",
            category: 'birthday',
            author: 'DearHim'
        },
        {
            message: "Sinh nhật này, chúc anh luôn mạnh khỏe và đạt được mọi ước mơ! 🌟",
            category: 'birthday',
            author: 'DearHim'
        },

        // Thanks 🙏
        {
            message: "Cảm ơn anh vì tất cả những gì anh đã làm. Anh là người tuyệt vời nhất! 💙",
            category: 'thanks',
            author: 'DearHim'
        },
        {
            message: "Một lời cảm ơn thôi không đủ để đáp lại những gì anh dành cho em! ❤️",
            category: 'thanks',
            author: 'DearHim'
        },
        {
            message: "Cảm ơn anh vì đã luôn tin tưởng và ủng hộ em! 🙏",
            category: 'thanks',
            author: 'DearHim'
        },
        {
            message: "Anh là chỗ dựa vững chắc nhất của em. Cảm ơn anh rất nhiều! 💪",
            category: 'thanks',
            author: 'DearHim'
        },

        // Father 👨
        {
            message: "Bố là người hùng của con! Chúc bố luôn khỏe mạnh và hạnh phúc! 💙",
            category: 'father',
            author: 'DearHim'
        },
        {
            message: "Cảm ơn bố vì tất cả! Bố là niềm tự hào của con! ❤️",
            category: 'father',
            author: 'DearHim'
        },
        {
            message: "Chúc bố luôn mạnh khỏe để đồng hành cùng gia đình! 👨‍👧‍👦",
            category: 'father',
            author: 'DearHim'
        },

        // Anniversary 💑
        {
            message: "Kỷ niệm đẹp bên anh là điều em trân trọng nhất! 💕",
            category: 'anniversary',
            author: 'DearHim'
        },
        {
            message: "Mỗi ngày bên anh đều là một kỷ niệm đáng nhớ! ❤️",
            category: 'anniversary',
            author: 'DearHim'
        },
        {
            message: "Chúc mừng kỷ niệm của chúng ta! Yêu anh mãi mãi! 💑",
            category: 'anniversary',
            author: 'DearHim'
        },

        // General 🎁
        {
            message: "Chúc anh một ngày tuyệt vời và tràn đầy năng lượng! ⚡",
            category: 'general',
            author: 'DearHim'
        },
        {
            message: "Mong mọi điều tốt đẹp sẽ đến với anh! 🌟",
            category: 'general',
            author: 'DearHim'
        },
        {
            message: "Anh xứng đáng với những điều tuyệt vời nhất! ✨",
            category: 'general',
            author: 'DearHim'
        },
        {
            message: "Chúc anh luôn vui vẻ và thành công trong mọi việc! 🎯",
            category: 'general',
            author: 'DearHim'
        },
        {
            message: "Gửi anh những lời chúc tốt đẹp nhất từ DearHim! 💝",
            category: 'general',
            author: 'DearHim'
        },
        {
            message: "Hy vọng món quà này sẽ mang đến niềm vui cho anh! 🎁",
            category: 'general',
            author: 'DearHim'
        }
    ];

    await Wish.insertMany(wishes);
    console.log('✅ Seeded 24 wishes successfully!');
    process.exit();
}

seedWishes();
