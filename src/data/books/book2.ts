import { Lesson } from '@/types/curriculum';

export const book2Lessons: Lesson[] = [
  // ===== BÀI 1: 請問，到師大怎麼走？ =====
  {
    id: 'b2-l1', number: 1, title: 'Xin hỏi, đến Sư Đại đi thế nào?', titleChinese: '請問，到師大怎麼走？',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l1-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-1-1', traditional: '走', pinyin: 'zǒu', zhuyin: 'ㄗㄡˇ', meaning: 'đi, đi đến', partOfSpeech: 'động từ', exampleSentence: '到師大怎麼走？', exampleMeaning: 'Đến Sư Đại đi thế nào?' },
          { id: 'w2-1-2', traditional: '路人', pinyin: 'lùrén', zhuyin: 'ㄌㄨˋ ㄖㄣˊ', meaning: 'người đi đường', partOfSpeech: 'danh từ', exampleSentence: '問路人。', exampleMeaning: 'Hỏi người đi đường.' },
          { id: 'w2-1-3', traditional: '幫忙', pinyin: 'bāngmáng', zhuyin: 'ㄅㄤ ㄇㄤˊ', meaning: 'giúp đỡ', partOfSpeech: 'động từ', exampleSentence: '請你幫忙。', exampleMeaning: 'Xin bạn giúp đỡ.' },
          { id: 'w2-1-4', traditional: '迷路', pinyin: 'mílù', zhuyin: 'ㄇㄧˊ ㄌㄨˋ', meaning: 'lạc đường', partOfSpeech: 'động từ', exampleSentence: '我迷路了。', exampleMeaning: 'Tôi bị lạc đường.' },
          { id: 'w2-1-5', traditional: '路口', pinyin: 'lùkǒu', zhuyin: 'ㄌㄨˋ ㄎㄡˇ', meaning: 'ngã tư, giao lộ', partOfSpeech: 'danh từ', exampleSentence: '下一個路口右轉。', exampleMeaning: 'Ngã tư tiếp theo rẽ phải.' },
          { id: 'w2-1-6', traditional: '過', pinyin: 'guò', zhuyin: 'ㄍㄨㄛˋ', meaning: 'qua, đi qua', partOfSpeech: 'động từ', exampleSentence: '過紅綠燈。', exampleMeaning: 'Qua đèn giao thông.' },
          { id: 'w2-1-7', traditional: '紅綠燈', pinyin: 'hónglǜdēng', zhuyin: 'ㄏㄨㄥˊ ㄌㄩˋ ㄉㄥ', meaning: 'đèn giao thông', partOfSpeech: 'danh từ', exampleSentence: '第二個紅綠燈左轉。', exampleMeaning: 'Đèn giao thông thứ hai rẽ trái.' },
          { id: 'w2-1-8', traditional: '告訴', pinyin: 'gàosù', zhuyin: 'ㄍㄠˋ ㄙㄨˋ', meaning: 'nói cho biết', partOfSpeech: 'động từ', exampleSentence: '請告訴我怎麼走。', exampleMeaning: 'Xin chỉ cho tôi đi thế nào.' },
          { id: 'w2-1-9', traditional: '郵局', pinyin: 'yóujú', zhuyin: 'ㄧㄡˊ ㄐㄩˊ', meaning: 'bưu điện', partOfSpeech: 'danh từ', exampleSentence: '郵局在那邊。', exampleMeaning: 'Bưu điện ở đằng kia.' },
          { id: 'w2-1-10', traditional: '往前', pinyin: 'wǎng qián', zhuyin: 'ㄨㄤˇ ㄑㄧㄢˊ', meaning: 'đi thẳng về phía trước', partOfSpeech: 'cụm từ', exampleSentence: '往前走。', exampleMeaning: 'Đi thẳng về phía trước.' },
          { id: 'w2-1-11', traditional: '右轉', pinyin: 'yòu zhuǎn', zhuyin: 'ㄧㄡˋ ㄓㄨㄢˇ', meaning: 'rẽ phải', partOfSpeech: 'cụm từ', exampleSentence: '在路口右轉。', exampleMeaning: 'Rẽ phải ở ngã tư.' },
          { id: 'w2-1-12', traditional: '左轉', pinyin: 'zuǒ zhuǎn', zhuyin: 'ㄗㄨㄛˇ ㄓㄨㄢˇ', meaning: 'rẽ trái', partOfSpeech: 'cụm từ', exampleSentence: '左轉以後直走。', exampleMeaning: 'Rẽ trái rồi đi thẳng.' },
          { id: 'w2-1-13', traditional: '地圖', pinyin: 'dìtú', zhuyin: 'ㄉㄧˋ ㄊㄨˊ', meaning: 'bản đồ', partOfSpeech: 'danh từ', exampleSentence: '下載地圖。', exampleMeaning: 'Tải bản đồ.' },
          { id: 'w2-1-14', traditional: '經過', pinyin: 'jīngguò', zhuyin: 'ㄐㄧㄥ ㄍㄨㄛˋ', meaning: 'đi ngang qua', partOfSpeech: 'động từ', exampleSentence: '經過郵局。', exampleMeaning: 'Đi ngang qua bưu điện.' },
          { id: 'w2-1-15', traditional: '離', pinyin: 'lí', zhuyin: 'ㄌㄧˊ', meaning: 'cách (khoảng cách)', partOfSpeech: 'giới từ', exampleSentence: '離這裡不遠。', exampleMeaning: 'Cách đây không xa.' },
        ],
      },
      {
        id: 'b2-l1-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-1-1', pattern: '到 + Place + 怎麼走？',
            explanation: 'Cách hỏi đường: "到 + Địa điểm + 怎麼走?" = Đến [nơi] đi thế nào?',
            examples: [
              { sentence: '請問，到師大怎麼走？', pinyin: 'Qǐngwèn, dào Shīdà zěnme zǒu?', meaning: 'Xin hỏi, đến Sư Đại đi thế nào?' },
              { sentence: '到郵局怎麼走？', pinyin: 'Dào yóujú zěnme zǒu?', meaning: 'Đến bưu điện đi thế nào?' },
            ],
          },
          {
            id: 'g2-1-2', pattern: '往 + Direction + V',
            explanation: '"往" = theo hướng. Dùng chỉ phương hướng: 往前走 = đi thẳng, 往左轉 = rẽ trái.',
            examples: [
              { sentence: '往前走，過兩個路口。', pinyin: 'Wǎng qián zǒu, guò liǎng ge lùkǒu.', meaning: 'Đi thẳng, qua hai ngã tư.' },
              { sentence: '往右轉就到了。', pinyin: 'Wǎng yòu zhuǎn jiù dào le.', meaning: 'Rẽ phải là đến.' },
            ],
          },
          {
            id: 'g2-1-3', pattern: '離 + Place + Adj',
            explanation: '"離" = cách. Diễn tả khoảng cách: "A 離 B 很近/遠".',
            examples: [
              { sentence: '離這裡不遠。', pinyin: 'Lí zhèlǐ bù yuǎn.', meaning: 'Cách đây không xa.' },
              { sentence: '學校離捷運站很近。', pinyin: 'Xuéxiào lí jiéyùn zhàn hěn jìn.', meaning: 'Trường cách trạm MRT rất gần.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l1-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-1-1', type: 'multiple-choice', question: '"迷路" nghĩa là gì?', options: ['hỏi đường', 'lạc đường', 'qua đường', 'đi đường'], correctAnswer: 'lạc đường' },
          { id: 'e2-1-2', type: 'multiple-choice', question: '"紅綠燈" là gì?', options: ['biển báo', 'đèn giao thông', 'ngã tư', 'vạch kẻ đường'], correctAnswer: 'đèn giao thông' },
          { id: 'e2-1-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___前走，過兩個路口。(Đi thẳng, qua hai ngã tư)', options: ['往', '到', '在', '從'], correctAnswer: '往' },
          { id: 'e2-1-4', type: 'multiple-choice', question: '"告訴" nghĩa là gì?', options: ['hỏi', 'nói cho biết', 'giúp đỡ', 'tìm'], correctAnswer: 'nói cho biết' },
          { id: 'e2-1-5', type: 'matching', question: 'Nối từ chỉ đường', options: ['往前|đi thẳng', '右轉|rẽ phải', '左轉|rẽ trái', '路口|ngã tư'], correctAnswer: ['往前|đi thẳng', '右轉|rẽ phải', '左轉|rẽ trái', '路口|ngã tư'] },
          { id: 'e2-1-6', type: 'sentence-order', question: 'Sắp xếp: "Đến Sư Đại đi thế nào?"', options: ['請問', '，', '到', '師大', '怎麼', '走', '？'], correctAnswer: ['請問', '，', '到', '師大', '怎麼', '走', '？'] },
          { id: 'e2-1-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '到師大怎麼走', options: ['Sư Đại ở đâu?', 'Đến Sư Đại đi thế nào?', 'Sư Đại xa không?', 'Bạn đi Sư Đại không?'], correctAnswer: 'Đến Sư Đại đi thế nào?' },
          { id: 'e2-1-8', type: 'fill-blank', question: '___這裡不遠。(Cách đây không xa)', correctAnswer: '離' },
          { id: 'e2-1-9', type: 'matching', question: 'Nối từ', options: ['迷路|lạc đường', '幫忙|giúp đỡ', '地圖|bản đồ', '經過|đi ngang qua'], correctAnswer: ['迷路|lạc đường', '幫忙|giúp đỡ', '地圖|bản đồ', '經過|đi ngang qua'] },
          { id: 'e2-1-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '紅綠燈', options: ['路口', '紅綠燈', '地圖', '郵局'], correctAnswer: '紅綠燈' },
        ],
      },
      {
        id: 'b2-l1-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-1-1', type: 'multiple-choice', question: 'Phiên âm của "路口" là gì?', options: ['lùkǒu', 'lùkōu', 'lúkǒu', 'lùkòu'], correctAnswer: 'lùkǒu' },
          { id: 'r2-1-2', type: 'fill-blank', question: '往前走，___兩個路口右轉。(Đi thẳng, qua hai ngã tư rẽ phải)', correctAnswer: '過' },
          { id: 'r2-1-3', type: 'matching', question: 'Ôn tập', options: ['走|đi', '過|qua', '離|cách', '告訴|nói cho biết'], correctAnswer: ['走|đi', '過|qua', '離|cách', '告訴|nói cho biết'] },
        ],
      },
    ],
  },

  // ===== BÀI 2: 還是坐捷運吧！ =====
  {
    id: 'b2-l2', number: 2, title: 'Hay là đi MRT đi!', titleChinese: '還是坐捷運吧！',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l2-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-2-1', traditional: '還是', pinyin: 'háishì', zhuyin: 'ㄏㄞˊ ㄕˋ', meaning: 'hay là, tốt hơn nên', partOfSpeech: 'phó từ', exampleSentence: '還是坐捷運吧！', exampleMeaning: 'Hay là đi MRT đi!' },
          { id: 'w2-2-2', traditional: '約', pinyin: 'yuē', zhuyin: 'ㄩㄝ', meaning: 'hẹn', partOfSpeech: 'động từ', exampleSentence: '我約他明天見面。', exampleMeaning: 'Tôi hẹn anh ấy ngày mai gặp.' },
          { id: 'w2-2-3', traditional: '對面', pinyin: 'duìmiàn', zhuyin: 'ㄉㄨㄟˋ ㄇㄧㄢˋ', meaning: 'đối diện', partOfSpeech: 'danh từ', exampleSentence: '在對面。', exampleMeaning: 'Ở đối diện.' },
          { id: 'w2-2-4', traditional: '直接', pinyin: 'zhíjiē', zhuyin: 'ㄓˊ ㄐㄧㄝ', meaning: 'trực tiếp', partOfSpeech: 'phó từ', exampleSentence: '直接坐到臺北。', exampleMeaning: 'Đi thẳng đến Đài Bắc.' },
          { id: 'w2-2-5', traditional: '換', pinyin: 'huàn', zhuyin: 'ㄏㄨㄢˋ', meaning: 'đổi, chuyển (tuyến)', partOfSpeech: 'động từ', exampleSentence: '不必換車。', exampleMeaning: 'Không cần chuyển xe.' },
          { id: 'w2-2-6', traditional: '車站', pinyin: 'chēzhàn', zhuyin: 'ㄔㄜ ㄓㄢˋ', meaning: 'trạm xe, nhà ga', partOfSpeech: 'danh từ', exampleSentence: '車站在哪裡？', exampleMeaning: 'Trạm xe ở đâu?' },
          { id: 'w2-2-7', traditional: '麻煩', pinyin: 'máfán', zhuyin: 'ㄇㄚˊ ㄈㄢˊ', meaning: 'phiền phức', partOfSpeech: 'tính từ', exampleSentence: '太麻煩了。', exampleMeaning: 'Phiền quá.' },
          { id: 'w2-2-8', traditional: '飛機', pinyin: 'fēijī', zhuyin: 'ㄈㄟ ㄐㄧ', meaning: 'máy bay', partOfSpeech: 'danh từ', exampleSentence: '坐飛機去。', exampleMeaning: 'Đi máy bay.' },
          { id: 'w2-2-9', traditional: '機場', pinyin: 'jīchǎng', zhuyin: 'ㄐㄧ ㄔㄤˇ', meaning: 'sân bay', partOfSpeech: 'danh từ', exampleSentence: '到機場要多久？', exampleMeaning: 'Đến sân bay mất bao lâu?' },
          { id: 'w2-2-10', traditional: '交通', pinyin: 'jiāotōng', zhuyin: 'ㄐㄧㄠ ㄊㄨㄥ', meaning: 'giao thông', partOfSpeech: 'danh từ', exampleSentence: '交通很便利。', exampleMeaning: 'Giao thông rất tiện.' },
          { id: 'w2-2-11', traditional: '便利', pinyin: 'biànlì', zhuyin: 'ㄅㄧㄢˋ ㄌㄧˋ', meaning: 'tiện lợi', partOfSpeech: 'tính từ', exampleSentence: '生活很便利。', exampleMeaning: 'Cuộc sống rất tiện.' },
          { id: 'w2-2-12', traditional: '路線', pinyin: 'lùxiàn', zhuyin: 'ㄌㄨˋ ㄒㄧㄢˋ', meaning: 'tuyến đường', partOfSpeech: 'danh từ', exampleSentence: '這條路線比較快。', exampleMeaning: 'Tuyến đường này nhanh hơn.' },
          { id: 'w2-2-13', traditional: '搭', pinyin: 'dā', zhuyin: 'ㄉㄚ', meaning: 'đi (xe, tàu, máy bay)', partOfSpeech: 'động từ', exampleSentence: '搭捷運去。', exampleMeaning: 'Đi MRT.' },
          { id: 'w2-2-14', traditional: '船', pinyin: 'chuán', zhuyin: 'ㄔㄨㄢˊ', meaning: 'tàu, thuyền', partOfSpeech: 'danh từ', exampleSentence: '搭船去綠島。', exampleMeaning: 'Đi tàu đến Đảo Xanh.' },
          { id: 'w2-2-15', traditional: '班次', pinyin: 'bāncì', zhuyin: 'ㄅㄢ ㄘˋ', meaning: 'chuyến (xe, tàu)', partOfSpeech: 'danh từ', exampleSentence: '班次很多。', exampleMeaning: 'Nhiều chuyến lắm.' },
        ],
      },
      {
        id: 'b2-l2-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-2-1', pattern: '還是 + VP + 吧',
            explanation: '"還是...吧" = Hay là...đi. Dùng đưa ra gợi ý hoặc lựa chọn tốt hơn.',
            examples: [
              { sentence: '還是坐捷運吧！', pinyin: 'Háishì zuò jiéyùn ba!', meaning: 'Hay là đi MRT đi!' },
              { sentence: '還是走路去吧。', pinyin: 'Háishì zǒulù qù ba.', meaning: 'Hay là đi bộ đi.' },
            ],
          },
          {
            id: 'g2-2-2', pattern: '不必 + V',
            explanation: '"不必" = không cần, không nhất thiết. Mạnh hơn "不用".',
            examples: [
              { sentence: '不必換車。', pinyin: 'Búbì huàn chē.', meaning: 'Không cần chuyển xe.' },
              { sentence: '不必擔心。', pinyin: 'Búbì dānxīn.', meaning: 'Không cần lo lắng.' },
            ],
          },
          {
            id: 'g2-2-3', pattern: '別 + V',
            explanation: '"別" = đừng. Dùng khuyên nhủ hoặc yêu cầu ai đừng làm gì.',
            examples: [
              { sentence: '別急！', pinyin: 'Bié jí!', meaning: 'Đừng vội!' },
              { sentence: '別擔心。', pinyin: 'Bié dānxīn.', meaning: 'Đừng lo.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l2-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-2-1', type: 'multiple-choice', question: '"換" trong "換車" nghĩa là gì?', options: ['đổi/chuyển', 'mua', 'bán', 'sửa'], correctAnswer: 'đổi/chuyển' },
          { id: 'e2-2-2', type: 'multiple-choice', question: '"麻煩" nghĩa là gì?', options: ['dễ dàng', 'tiện lợi', 'phiền phức', 'vui vẻ'], correctAnswer: 'phiền phức' },
          { id: 'e2-2-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___坐捷運吧！(Hay là đi MRT đi!)', options: ['或者', '還是', '不是', '就是'], correctAnswer: '還是' },
          { id: 'e2-2-4', type: 'multiple-choice', question: '"搭" nghĩa là gì?', options: ['lái', 'đi (phương tiện)', 'chờ', 'mua vé'], correctAnswer: 'đi (phương tiện)' },
          { id: 'e2-2-5', type: 'matching', question: 'Nối phương tiện', options: ['飛機|máy bay', '船|tàu/thuyền', '捷運|MRT', '機場|sân bay'], correctAnswer: ['飛機|máy bay', '船|tàu/thuyền', '捷運|MRT', '機場|sân bay'] },
          { id: 'e2-2-6', type: 'sentence-order', question: 'Sắp xếp: "Hay là đi MRT đi!"', options: ['還是', '坐', '捷運', '吧', '！'], correctAnswer: ['還是', '坐', '捷運', '吧', '！'] },
          { id: 'e2-2-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '不必換車', options: ['Phải đổi xe', 'Không cần đổi xe', 'Muốn đổi xe', 'Nên đổi xe'], correctAnswer: 'Không cần đổi xe' },
          { id: 'e2-2-8', type: 'fill-blank', question: '___必擔心。(Không cần lo lắng)', correctAnswer: '不' },
          { id: 'e2-2-9', type: 'matching', question: 'Nối từ', options: ['約|hẹn', '對面|đối diện', '便利|tiện lợi', '班次|chuyến'], correctAnswer: ['約|hẹn', '對面|đối diện', '便利|tiện lợi', '班次|chuyến'] },
          { id: 'e2-2-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '機場', options: ['車站', '機場', '郵局', '學校'], correctAnswer: '機場' },
        ],
      },
      {
        id: 'b2-l2-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-2-1', type: 'multiple-choice', question: 'Phiên âm của "交通" là gì?', options: ['jiāotōng', 'jiāotóng', 'jiǎotōng', 'jiàotōng'], correctAnswer: 'jiāotōng' },
          { id: 'r2-2-2', type: 'fill-blank', question: '___是走路去吧。(Hay là đi bộ đi)', correctAnswer: '還' },
          { id: 'r2-2-3', type: 'matching', question: 'Ôn tập', options: ['搭|đi (phương tiện)', '換|đổi/chuyển', '麻煩|phiền phức', '直接|trực tiếp'], correctAnswer: ['搭|đi (phương tiện)', '換|đổi/chuyển', '麻煩|phiền phức', '直接|trực tiếp'] },
        ],
      },
    ],
  },

  // ===== BÀI 3: 你的中文進步了！ =====
  {
    id: 'b2-l3', number: 3, title: 'Tiếng Trung của bạn tiến bộ rồi!', titleChinese: '你的中文進步了！',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l3-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-3-1', traditional: '進步', pinyin: 'jìnbù', zhuyin: 'ㄐㄧㄣˋ ㄅㄨˋ', meaning: 'tiến bộ', partOfSpeech: 'động từ', exampleSentence: '你的中文進步了！', exampleMeaning: 'Tiếng Trung của bạn tiến bộ rồi!' },
          { id: 'w2-3-2', traditional: '考試', pinyin: 'kǎoshì', zhuyin: 'ㄎㄠˇ ㄕˋ', meaning: 'thi, kỳ thi', partOfSpeech: 'danh từ', exampleSentence: '明天有考試。', exampleMeaning: 'Ngày mai có thi.' },
          { id: 'w2-3-3', traditional: '準備', pinyin: 'zhǔnbèi', zhuyin: 'ㄓㄨㄣˇ ㄅㄟˋ', meaning: 'chuẩn bị', partOfSpeech: 'động từ', exampleSentence: '你準備好了嗎？', exampleMeaning: 'Bạn chuẩn bị xong chưa?' },
          { id: 'w2-3-4', traditional: '容易', pinyin: 'róngyì', zhuyin: 'ㄖㄨㄥˊ ㄧˋ', meaning: 'dễ', partOfSpeech: 'tính từ', exampleSentence: '這個考試不容易。', exampleMeaning: 'Kỳ thi này không dễ.' },
          { id: 'w2-3-5', traditional: '漢字', pinyin: 'hànzì', zhuyin: 'ㄏㄢˋ ㄗˋ', meaning: 'chữ Hán', partOfSpeech: 'danh từ', exampleSentence: '漢字很難寫。', exampleMeaning: 'Chữ Hán rất khó viết.' },
          { id: 'w2-3-6', traditional: '流利', pinyin: 'liúlì', zhuyin: 'ㄌㄧㄡˊ ㄌㄧˋ', meaning: 'trôi chảy, lưu loát', partOfSpeech: 'tính từ', exampleSentence: '她說得很流利。', exampleMeaning: 'Cô ấy nói rất lưu loát.' },
          { id: 'w2-3-7', traditional: '雖然', pinyin: 'suīrán', zhuyin: 'ㄙㄨㄟ ㄖㄢˊ', meaning: 'tuy, mặc dù', partOfSpeech: 'liên từ', exampleSentence: '雖然難，但是很有趣。', exampleMeaning: 'Tuy khó nhưng rất thú vị.' },
          { id: 'w2-3-8', traditional: '環境', pinyin: 'huánjìng', zhuyin: 'ㄏㄨㄢˊ ㄐㄧㄥˋ', meaning: 'môi trường', partOfSpeech: 'danh từ', exampleSentence: '語言環境很重要。', exampleMeaning: 'Môi trường ngôn ngữ rất quan trọng.' },
          { id: 'w2-3-9', traditional: '練習', pinyin: 'liànxí', zhuyin: 'ㄌㄧㄢˋ ㄒㄧˊ', meaning: 'luyện tập', partOfSpeech: 'động từ', exampleSentence: '多練習說話。', exampleMeaning: 'Luyện nói nhiều hơn.' },
          { id: 'w2-3-10', traditional: '認識', pinyin: 'rènshì', zhuyin: 'ㄖㄣˋ ㄕˋ', meaning: 'quen biết, nhận biết', partOfSpeech: 'động từ', exampleSentence: '認識新朋友。', exampleMeaning: 'Quen biết bạn mới.' },
          { id: 'w2-3-11', traditional: '聊天', pinyin: 'liáotiān', zhuyin: 'ㄌㄧㄠˊ ㄊㄧㄢ', meaning: 'nói chuyện, tán gẫu', partOfSpeech: 'động từ', exampleSentence: '我們聊天吧。', exampleMeaning: 'Chúng ta nói chuyện đi.' },
          { id: 'w2-3-12', traditional: '文化', pinyin: 'wénhuà', zhuyin: 'ㄨㄣˊ ㄏㄨㄚˋ', meaning: 'văn hóa', partOfSpeech: 'danh từ', exampleSentence: '了解臺灣文化。', exampleMeaning: 'Tìm hiểu văn hóa Đài Loan.' },
          { id: 'w2-3-13', traditional: '了解', pinyin: 'liǎojiě', zhuyin: 'ㄌㄧㄠˇ ㄐㄧㄝˇ', meaning: 'hiểu, tìm hiểu', partOfSpeech: 'động từ', exampleSentence: '你了解嗎？', exampleMeaning: 'Bạn hiểu không?' },
          { id: 'w2-3-14', traditional: '生活', pinyin: 'shēnghuó', zhuyin: 'ㄕㄥ ㄏㄨㄛˊ', meaning: 'cuộc sống', partOfSpeech: 'danh từ', exampleSentence: '在臺灣的生活很好。', exampleMeaning: 'Cuộc sống ở Đài Loan rất tốt.' },
          { id: 'w2-3-15', traditional: '作業', pinyin: 'zuòyè', zhuyin: 'ㄗㄨㄛˋ ㄧㄝˋ', meaning: 'bài tập', partOfSpeech: 'danh từ', exampleSentence: '寫作業。', exampleMeaning: 'Làm bài tập.' },
        ],
      },
      {
        id: 'b2-l3-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-3-1', pattern: '雖然...但是/可是...',
            explanation: '"雖然...但是..." = Tuy...nhưng... Diễn tả sự tương phản.',
            examples: [
              { sentence: '雖然漢字很難，但是很有趣。', pinyin: 'Suīrán hànzì hěn nán, dànshì hěn yǒuqù.', meaning: 'Tuy chữ Hán rất khó nhưng rất thú vị.' },
              { sentence: '雖然他才學一年，可是說得很流利。', pinyin: 'Suīrán tā cái xué yì nián, kěshì shuō de hěn liúlì.', meaning: 'Tuy anh ấy mới học một năm nhưng nói rất lưu loát.' },
            ],
          },
          {
            id: 'g2-3-2', pattern: 'V + 過 (kinh nghiệm)',
            explanation: '"過" sau động từ biểu thị đã từng trải nghiệm. "沒 + V + 過" = chưa từng.',
            examples: [
              { sentence: '我學過日文。', pinyin: 'Wǒ xué guò Rìwén.', meaning: 'Tôi đã từng học tiếng Nhật.' },
              { sentence: '你去過陽明山嗎？', pinyin: 'Nǐ qù guò Yángmíng Shān ma?', meaning: 'Bạn đã từng đến Dương Minh Sơn chưa?' },
            ],
          },
          {
            id: 'g2-3-3', pattern: '才 + V',
            explanation: '"才" = mới, chỉ. Nhấn mạnh thời gian ngắn hoặc số lượng ít.',
            examples: [
              { sentence: '我才來臺灣三個月。', pinyin: 'Wǒ cái lái Táiwān sān ge yuè.', meaning: 'Tôi mới đến Đài Loan ba tháng.' },
              { sentence: '他才學了一年的中文。', pinyin: 'Tā cái xué le yì nián de Zhōngwén.', meaning: 'Anh ấy mới học tiếng Trung một năm.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l3-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-3-1', type: 'multiple-choice', question: '"流利" nghĩa là gì?', options: ['khó', 'dễ', 'lưu loát', 'chậm'], correctAnswer: 'lưu loát' },
          { id: 'e2-3-2', type: 'multiple-choice', question: '"漢字" nghĩa là gì?', options: ['tiếng Trung', 'chữ Hán', 'pinyin', 'chú âm'], correctAnswer: 'chữ Hán' },
          { id: 'e2-3-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___然很難，但是很有趣。(Tuy khó nhưng thú vị)', options: ['因', '雖', '所', '就'], correctAnswer: '雖' },
          { id: 'e2-3-4', type: 'multiple-choice', question: '"練習" nghĩa là gì?', options: ['chuẩn bị', 'luyện tập', 'thi cử', 'nghỉ ngơi'], correctAnswer: 'luyện tập' },
          { id: 'e2-3-5', type: 'matching', question: 'Nối từ học tập', options: ['考試|kỳ thi', '準備|chuẩn bị', '作業|bài tập', '練習|luyện tập'], correctAnswer: ['考試|kỳ thi', '準備|chuẩn bị', '作業|bài tập', '練習|luyện tập'] },
          { id: 'e2-3-6', type: 'sentence-order', question: 'Sắp xếp: "Tuy khó nhưng rất thú vị"', options: ['雖然', '很', '難', '，', '但是', '很', '有趣', '。'], correctAnswer: ['雖然', '很', '難', '，', '但是', '很', '有趣', '。'] },
          { id: 'e2-3-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '你的中文進步了', options: ['Tiếng Trung của bạn tiến bộ rồi', 'Tiếng Trung của bạn rất khó', 'Bạn học tiếng Trung bao lâu?', 'Bạn nói tiếng Trung giỏi'], correctAnswer: 'Tiếng Trung của bạn tiến bộ rồi' },
          { id: 'e2-3-8', type: 'fill-blank', question: '你去___陽明山嗎？(Bạn đã từng đến Dương Minh Sơn chưa?)', correctAnswer: '過' },
          { id: 'e2-3-9', type: 'matching', question: 'Nối từ', options: ['認識|quen biết', '聊天|nói chuyện', '文化|văn hóa', '生活|cuộc sống'], correctAnswer: ['認識|quen biết', '聊天|nói chuyện', '文化|văn hóa', '生活|cuộc sống'] },
          { id: 'e2-3-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '考試', options: ['作業', '考試', '練習', '準備'], correctAnswer: '考試' },
        ],
      },
      {
        id: 'b2-l3-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-3-1', type: 'multiple-choice', question: 'Phiên âm của "環境" là gì?', options: ['huánjìng', 'huánjǐng', 'huānjìng', 'huánjīng'], correctAnswer: 'huánjìng' },
          { id: 'r2-3-2', type: 'fill-blank', question: '我___來臺灣三個月。(Tôi mới đến Đài Loan ba tháng)', correctAnswer: '才' },
          { id: 'r2-3-3', type: 'matching', question: 'Ôn tập', options: ['進步|tiến bộ', '流利|lưu loát', '了解|hiểu', '容易|dễ'], correctAnswer: ['進步|tiến bộ', '流利|lưu loát', '了解|hiểu', '容易|dễ'] },
        ],
      },
    ],
  },

  // ===== BÀI 4: 我打工，我教法文 =====
  {
    id: 'b2-l4', number: 4, title: 'Tôi làm thêm, tôi dạy tiếng Pháp', titleChinese: '我打工，我教法文',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l4-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-4-1', traditional: '打工', pinyin: 'dǎgōng', zhuyin: 'ㄉㄚˇ ㄍㄨㄥ', meaning: 'làm thêm', partOfSpeech: 'động từ', exampleSentence: '我在打工。', exampleMeaning: 'Tôi đang làm thêm.' },
          { id: 'w2-4-2', traditional: '介紹', pinyin: 'jièshào', zhuyin: 'ㄐㄧㄝˋ ㄕㄠˋ', meaning: 'giới thiệu', partOfSpeech: 'động từ', exampleSentence: '讓我介紹一下。', exampleMeaning: 'Để tôi giới thiệu một chút.' },
          { id: 'w2-4-3', traditional: '經驗', pinyin: 'jīngyàn', zhuyin: 'ㄐㄧㄥ ㄧㄢˋ', meaning: 'kinh nghiệm', partOfSpeech: 'danh từ', exampleSentence: '你有經驗嗎？', exampleMeaning: 'Bạn có kinh nghiệm không?' },
          { id: 'w2-4-4', traditional: '當', pinyin: 'dāng', zhuyin: 'ㄉㄤ', meaning: 'làm, đảm nhận (vai trò)', partOfSpeech: 'động từ', exampleSentence: '她當助教。', exampleMeaning: 'Cô ấy làm trợ giảng.' },
          { id: 'w2-4-5', traditional: '助教', pinyin: 'zhùjiào', zhuyin: 'ㄓㄨˋ ㄐㄧㄠˋ', meaning: 'trợ giảng', partOfSpeech: 'danh từ', exampleSentence: '他是助教。', exampleMeaning: 'Anh ấy là trợ giảng.' },
          { id: 'w2-4-6', traditional: '除了', pinyin: 'chúle', zhuyin: 'ㄔㄨˊ ㄌㄜ˙', meaning: 'ngoài...ra', partOfSpeech: 'giới từ', exampleSentence: '除了中文，我還學日文。', exampleMeaning: 'Ngoài tiếng Trung, tôi còn học tiếng Nhật.' },
          { id: 'w2-4-7', traditional: '暑假', pinyin: 'shǔjià', zhuyin: 'ㄕㄨˇ ㄐㄧㄚˋ', meaning: 'kỳ nghỉ hè', partOfSpeech: 'danh từ', exampleSentence: '暑假你做什麼？', exampleMeaning: 'Nghỉ hè bạn làm gì?' },
          { id: 'w2-4-8', traditional: '薪水', pinyin: 'xīnshuǐ', zhuyin: 'ㄒㄧㄣ ㄕㄨㄟˇ', meaning: 'lương', partOfSpeech: 'danh từ', exampleSentence: '薪水怎麼算？', exampleMeaning: 'Lương tính thế nào?' },
          { id: 'w2-4-9', traditional: '履歷表', pinyin: 'lǚlìbiǎo', zhuyin: 'ㄌㄩˇ ㄌㄧˋ ㄅㄧㄠˇ', meaning: 'hồ sơ xin việc, CV', partOfSpeech: 'danh từ', exampleSentence: '請寄履歷表。', exampleMeaning: 'Xin gửi CV.' },
          { id: 'w2-4-10', traditional: '面談', pinyin: 'miàntán', zhuyin: 'ㄇㄧㄢˋ ㄊㄢˊ', meaning: 'phỏng vấn', partOfSpeech: 'danh từ/động từ', exampleSentence: '明天面談。', exampleMeaning: 'Ngày mai phỏng vấn.' },
          { id: 'w2-4-11', traditional: '辦公室', pinyin: 'bàngōngshì', zhuyin: 'ㄅㄢˋ ㄍㄨㄥ ㄕˋ', meaning: 'văn phòng', partOfSpeech: 'danh từ', exampleSentence: '請到辦公室來。', exampleMeaning: 'Mời đến văn phòng.' },
          { id: 'w2-4-12', traditional: '適合', pinyin: 'shìhé', zhuyin: 'ㄕˋ ㄏㄜˊ', meaning: 'phù hợp', partOfSpeech: 'tính từ', exampleSentence: '這份工作很適合你。', exampleMeaning: 'Công việc này rất phù hợp với bạn.' },
          { id: 'w2-4-13', traditional: '答應', pinyin: 'dāyìng', zhuyin: 'ㄉㄚ ㄧㄥˋ', meaning: 'đồng ý, nhận lời', partOfSpeech: 'động từ', exampleSentence: '他答應了。', exampleMeaning: 'Anh ấy đồng ý rồi.' },
          { id: 'w2-4-14', traditional: '順利', pinyin: 'shùnlì', zhuyin: 'ㄕㄨㄣˋ ㄌㄧˋ', meaning: 'thuận lợi, suôn sẻ', partOfSpeech: 'tính từ', exampleSentence: '面談很順利。', exampleMeaning: 'Phỏng vấn rất suôn sẻ.' },
          { id: 'w2-4-15', traditional: '馬上', pinyin: 'mǎshàng', zhuyin: 'ㄇㄚˇ ㄕㄤˋ', meaning: 'ngay lập tức', partOfSpeech: 'phó từ', exampleSentence: '我馬上來。', exampleMeaning: 'Tôi đến ngay.' },
        ],
      },
      {
        id: 'b2-l4-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-4-1', pattern: '除了...以外，還/也...',
            explanation: '"除了...以外，還..." = Ngoài...ra, còn... Thêm thông tin bổ sung.',
            examples: [
              { sentence: '除了中文以外，她還會說法文。', pinyin: 'Chúle Zhōngwén yǐwài, tā hái huì shuō Fǎwén.', meaning: 'Ngoài tiếng Trung ra, cô ấy còn biết nói tiếng Pháp.' },
              { sentence: '除了打工以外，我也上課。', pinyin: 'Chúle dǎgōng yǐwài, wǒ yě shàngkè.', meaning: 'Ngoài làm thêm ra, tôi cũng đi học.' },
            ],
          },
          {
            id: 'g2-4-2', pattern: '按照 + N + V',
            explanation: '"按照" = theo, dựa theo. Diễn tả căn cứ hoặc tiêu chuẩn.',
            examples: [
              { sentence: '按照經驗算薪水。', pinyin: 'Ànzhào jīngyàn suàn xīnshuǐ.', meaning: 'Tính lương theo kinh nghiệm.' },
              { sentence: '按照規定辦理。', pinyin: 'Ànzhào guīdìng bànlǐ.', meaning: 'Xử lý theo quy định.' },
            ],
          },
          {
            id: 'g2-4-3', pattern: '當 + Role',
            explanation: '"當" = làm, đảm nhận. Dùng nói về nghề nghiệp hoặc vai trò.',
            examples: [
              { sentence: '她當助教。', pinyin: 'Tā dāng zhùjiào.', meaning: 'Cô ấy làm trợ giảng.' },
              { sentence: '他想當老師。', pinyin: 'Tā xiǎng dāng lǎoshī.', meaning: 'Anh ấy muốn làm giáo viên.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l4-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-4-1', type: 'multiple-choice', question: '"打工" nghĩa là gì?', options: ['đánh nhau', 'làm thêm', 'chơi thể thao', 'đi học'], correctAnswer: 'làm thêm' },
          { id: 'e2-4-2', type: 'multiple-choice', question: '"履歷表" nghĩa là gì?', options: ['bảng điểm', 'CV/hồ sơ xin việc', 'thời khóa biểu', 'bảng lương'], correctAnswer: 'CV/hồ sơ xin việc' },
          { id: 'e2-4-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___了中文，她還會說法文。(Ngoài tiếng Trung, cô ấy còn biết tiếng Pháp)', options: ['因為', '除', '雖然', '所以'], correctAnswer: '除' },
          { id: 'e2-4-4', type: 'multiple-choice', question: '"順利" nghĩa là gì?', options: ['khó khăn', 'thuận lợi', 'phức tạp', 'vất vả'], correctAnswer: 'thuận lợi' },
          { id: 'e2-4-5', type: 'matching', question: 'Nối từ công việc', options: ['打工|làm thêm', '薪水|lương', '面談|phỏng vấn', '辦公室|văn phòng'], correctAnswer: ['打工|làm thêm', '薪水|lương', '面談|phỏng vấn', '辦公室|văn phòng'] },
          { id: 'e2-4-6', type: 'sentence-order', question: 'Sắp xếp: "Cô ấy làm trợ giảng"', options: ['她', '當', '助教', '。'], correctAnswer: ['她', '當', '助教', '。'] },
          { id: 'e2-4-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '我打工我教法文', options: ['Tôi đi học tiếng Pháp', 'Tôi làm thêm, tôi dạy tiếng Pháp', 'Tôi muốn học tiếng Pháp', 'Tôi không biết tiếng Pháp'], correctAnswer: 'Tôi làm thêm, tôi dạy tiếng Pháp' },
          { id: 'e2-4-8', type: 'fill-blank', question: '我___上來。(Tôi đến ngay)', correctAnswer: '馬' },
          { id: 'e2-4-9', type: 'matching', question: 'Nối từ', options: ['介紹|giới thiệu', '經驗|kinh nghiệm', '適合|phù hợp', '答應|đồng ý'], correctAnswer: ['介紹|giới thiệu', '經驗|kinh nghiệm', '適合|phù hợp', '答應|đồng ý'] },
          { id: 'e2-4-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '辦公室', options: ['教室', '辦公室', '圖書館', '餐廳'], correctAnswer: '辦公室' },
        ],
      },
      {
        id: 'b2-l4-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-4-1', type: 'multiple-choice', question: 'Phiên âm của "經驗" là gì?', options: ['jīngyàn', 'jīngyǎn', 'jǐngyàn', 'jīngyān'], correctAnswer: 'jīngyàn' },
          { id: 'r2-4-2', type: 'fill-blank', question: '這份工作很___合你。(Công việc này rất phù hợp với bạn)', correctAnswer: '適' },
          { id: 'r2-4-3', type: 'matching', question: 'Ôn tập', options: ['當|làm/đảm nhận', '除了|ngoài...ra', '馬上|ngay lập tức', '暑假|kỳ nghỉ hè'], correctAnswer: ['當|làm/đảm nhận', '除了|ngoài...ra', '馬上|ngay lập tức', '暑假|kỳ nghỉ hè'] },
        ],
      },
    ],
  },

  // ===== BÀI 5: 吃喜酒 =====
  {
    id: 'b2-l5', number: 5, title: 'Dự tiệc cưới', titleChinese: '吃喜酒',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l5-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-5-1', traditional: '喜酒', pinyin: 'xǐjiǔ', zhuyin: 'ㄒㄧˇ ㄐㄧㄡˇ', meaning: 'tiệc cưới', partOfSpeech: 'danh từ', exampleSentence: '明天吃喜酒。', exampleMeaning: 'Ngày mai dự tiệc cưới.' },
          { id: 'w2-5-2', traditional: '恭喜', pinyin: 'gōngxǐ', zhuyin: 'ㄍㄨㄥ ㄒㄧˇ', meaning: 'chúc mừng', partOfSpeech: 'động từ', exampleSentence: '恭喜你們！', exampleMeaning: 'Chúc mừng hai bạn!' },
          { id: 'w2-5-3', traditional: '新娘', pinyin: 'xīnniáng', zhuyin: 'ㄒㄧㄣ ㄋㄧㄤˊ', meaning: 'cô dâu', partOfSpeech: 'danh từ', exampleSentence: '新娘很漂亮。', exampleMeaning: 'Cô dâu rất đẹp.' },
          { id: 'w2-5-4', traditional: '新郎', pinyin: 'xīnláng', zhuyin: 'ㄒㄧㄣ ㄌㄤˊ', meaning: 'chú rể', partOfSpeech: 'danh từ', exampleSentence: '新郎很帥。', exampleMeaning: 'Chú rể rất đẹp trai.' },
          { id: 'w2-5-5', traditional: '婚禮', pinyin: 'hūnlǐ', zhuyin: 'ㄏㄨㄣ ㄌㄧˇ', meaning: 'lễ cưới', partOfSpeech: 'danh từ', exampleSentence: '參加婚禮。', exampleMeaning: 'Tham dự lễ cưới.' },
          { id: 'w2-5-6', traditional: '結婚', pinyin: 'jiéhūn', zhuyin: 'ㄐㄧㄝˊ ㄏㄨㄣ', meaning: 'kết hôn', partOfSpeech: 'động từ', exampleSentence: '他們要結婚了。', exampleMeaning: 'Họ sắp kết hôn rồi.' },
          { id: 'w2-5-7', traditional: '紅包', pinyin: 'hóngbāo', zhuyin: 'ㄏㄨㄥˊ ㄅㄠ', meaning: 'bao lì xì, phong bì đỏ', partOfSpeech: 'danh từ', exampleSentence: '包紅包。', exampleMeaning: 'Gói phong bì đỏ.' },
          { id: 'w2-5-8', traditional: '客人', pinyin: 'kèrén', zhuyin: 'ㄎㄜˋ ㄖㄣˊ', meaning: 'khách', partOfSpeech: 'danh từ', exampleSentence: '客人很多。', exampleMeaning: 'Khách rất đông.' },
          { id: 'w2-5-9', traditional: '正式', pinyin: 'zhèngshì', zhuyin: 'ㄓㄥˋ ㄕˋ', meaning: 'trang trọng, chính thức', partOfSpeech: 'tính từ', exampleSentence: '穿正式的衣服。', exampleMeaning: 'Mặc quần áo trang trọng.' },
          { id: 'w2-5-10', traditional: '西裝', pinyin: 'xīzhuāng', zhuyin: 'ㄒㄧ ㄓㄨㄤ', meaning: 'vest, com-lê', partOfSpeech: 'danh từ', exampleSentence: '他穿西裝。', exampleMeaning: 'Anh ấy mặc vest.' },
          { id: 'w2-5-11', traditional: '親戚', pinyin: 'qīnqī', zhuyin: 'ㄑㄧㄣ ㄑㄧ', meaning: 'họ hàng', partOfSpeech: 'danh từ', exampleSentence: '請親戚來。', exampleMeaning: 'Mời họ hàng đến.' },
          { id: 'w2-5-12', traditional: '熱鬧', pinyin: 'rènào', zhuyin: 'ㄖㄜˋ ㄋㄠˋ', meaning: 'náo nhiệt, nhộn nhịp', partOfSpeech: 'tính từ', exampleSentence: '婚禮很熱鬧。', exampleMeaning: 'Lễ cưới rất náo nhiệt.' },
          { id: 'w2-5-13', traditional: '慶祝', pinyin: 'qìngzhù', zhuyin: 'ㄑㄧㄥˋ ㄓㄨˋ', meaning: 'chúc mừng, kỷ niệm', partOfSpeech: 'động từ', exampleSentence: '慶祝結婚。', exampleMeaning: 'Chúc mừng kết hôn.' },
          { id: 'w2-5-14', traditional: '敬酒', pinyin: 'jìngjiǔ', zhuyin: 'ㄐㄧㄥˋ ㄐㄧㄡˇ', meaning: 'mời rượu, nâng ly', partOfSpeech: 'động từ', exampleSentence: '新人敬酒。', exampleMeaning: 'Cô dâu chú rể mời rượu.' },
          { id: 'w2-5-15', traditional: '祝福', pinyin: 'zhùfú', zhuyin: 'ㄓㄨˋ ㄈㄨˊ', meaning: 'chúc phúc', partOfSpeech: 'động từ', exampleSentence: '祝福他們百年好合。', exampleMeaning: 'Chúc họ trăm năm hạnh phúc.' },
        ],
      },
      {
        id: 'b2-l5-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-5-1', pattern: 'V + 起來 (ấn tượng)',
            explanation: '"V + 起來" biểu thị ấn tượng/cảm nhận: 看起來 = trông có vẻ, 聽起來 = nghe có vẻ.',
            examples: [
              { sentence: '新娘看起來很漂亮。', pinyin: 'Xīnniáng kàn qǐlái hěn piàoliang.', meaning: 'Cô dâu trông rất đẹp.' },
              { sentence: '聽起來很好玩。', pinyin: 'Tīng qǐlái hěn hǎowán.', meaning: 'Nghe có vẻ vui lắm.' },
            ],
          },
          {
            id: 'g2-5-2', pattern: 'Adj + 得不得了',
            explanation: '"Adj + 得不得了" = cực kỳ, vô cùng. Nhấn mạnh mức độ rất cao.',
            examples: [
              { sentence: '高興得不得了。', pinyin: 'Gāoxìng de bùdéliǎo.', meaning: 'Vui vô cùng.' },
              { sentence: '熱鬧得不得了。', pinyin: 'Rènào de bùdéliǎo.', meaning: 'Náo nhiệt vô cùng.' },
            ],
          },
          {
            id: 'g2-5-3', pattern: '百年好合 / 早生貴子',
            explanation: 'Câu chúc truyền thống trong đám cưới. "百年好合" = trăm năm hạnh phúc. "早生貴子" = sớm sinh quý tử.',
            examples: [
              { sentence: '祝你們百年好合！', pinyin: 'Zhù nǐmen bǎinián hǎohé!', meaning: 'Chúc hai bạn trăm năm hạnh phúc!' },
              { sentence: '早生貴子！', pinyin: 'Zǎoshēng guìzǐ!', meaning: 'Sớm sinh quý tử!' },
            ],
          },
        ],
      },
      {
        id: 'b2-l5-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-5-1', type: 'multiple-choice', question: '"喜酒" nghĩa là gì?', options: ['rượu ngon', 'tiệc cưới', 'tiệc sinh nhật', 'rượu mừng'], correctAnswer: 'tiệc cưới' },
          { id: 'e2-5-2', type: 'multiple-choice', question: '"紅包" nghĩa là gì?', options: ['túi đỏ', 'phong bì đỏ (tiền mừng)', 'áo đỏ', 'hoa đỏ'], correctAnswer: 'phong bì đỏ (tiền mừng)' },
          { id: 'e2-5-3', type: 'multiple-choice', question: '"新郎" là ai?', options: ['cô dâu', 'chú rể', 'khách mời', 'phù dâu'], correctAnswer: 'chú rể' },
          { id: 'e2-5-4', type: 'multiple-choice', question: 'Chọn từ đúng: 新娘___起來很漂亮。(Cô dâu trông rất đẹp)', options: ['聽', '看', '說', '想'], correctAnswer: '看' },
          { id: 'e2-5-5', type: 'matching', question: 'Nối từ đám cưới', options: ['新娘|cô dâu', '新郎|chú rể', '紅包|phong bì đỏ', '婚禮|lễ cưới'], correctAnswer: ['新娘|cô dâu', '新郎|chú rể', '紅包|phong bì đỏ', '婚禮|lễ cưới'] },
          { id: 'e2-5-6', type: 'sentence-order', question: 'Sắp xếp: "Chúc hai bạn trăm năm hạnh phúc"', options: ['祝', '你們', '百年', '好合', '！'], correctAnswer: ['祝', '你們', '百年', '好合', '！'] },
          { id: 'e2-5-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '恭喜你們', options: ['Chúc mừng hai bạn', 'Tạm biệt hai bạn', 'Cảm ơn hai bạn', 'Xin lỗi hai bạn'], correctAnswer: 'Chúc mừng hai bạn' },
          { id: 'e2-5-8', type: 'fill-blank', question: '他們要___婚了。(Họ sắp kết hôn rồi)', correctAnswer: '結' },
          { id: 'e2-5-9', type: 'matching', question: 'Nối từ', options: ['恭喜|chúc mừng', '慶祝|kỷ niệm', '熱鬧|náo nhiệt', '祝福|chúc phúc'], correctAnswer: ['恭喜|chúc mừng', '慶祝|kỷ niệm', '熱鬧|náo nhiệt', '祝福|chúc phúc'] },
          { id: 'e2-5-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '婚禮', options: ['喜酒', '婚禮', '結婚', '慶祝'], correctAnswer: '婚禮' },
        ],
      },
      {
        id: 'b2-l5-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-5-1', type: 'multiple-choice', question: 'Phiên âm của "結婚" là gì?', options: ['jiéhūn', 'jiēhūn', 'jiéhún', 'jiěhūn'], correctAnswer: 'jiéhūn' },
          { id: 'r2-5-2', type: 'fill-blank', question: '___喜你們結婚！(Chúc mừng hai bạn kết hôn)', correctAnswer: '恭' },
          { id: 'r2-5-3', type: 'matching', question: 'Ôn tập', options: ['敬酒|mời rượu', '西裝|com-lê', '客人|khách', '正式|trang trọng'], correctAnswer: ['敬酒|mời rượu', '西裝|com-lê', '客人|khách', '正式|trang trọng'] },
        ],
      },
    ],
  },

  // ===== BÀI 6: 搬到學校附近 =====
  {
    id: 'b2-l6', number: 6, title: 'Dọn đến gần trường', titleChinese: '搬到學校附近',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l6-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-6-1', traditional: '搬', pinyin: 'bān', zhuyin: 'ㄅㄢ', meaning: 'dọn, chuyển nhà', partOfSpeech: 'động từ', exampleSentence: '我要搬家了。', exampleMeaning: 'Tôi sắp chuyển nhà rồi.' },
          { id: 'w2-6-2', traditional: '附近', pinyin: 'fùjìn', zhuyin: 'ㄈㄨˋ ㄐㄧㄣˋ', meaning: 'gần đây, lân cận', partOfSpeech: 'danh từ', exampleSentence: '學校附近有超市。', exampleMeaning: 'Gần trường có siêu thị.' },
          { id: 'w2-6-3', traditional: '安靜', pinyin: 'ānjìng', zhuyin: 'ㄢ ㄐㄧㄥˋ', meaning: 'yên tĩnh', partOfSpeech: 'tính từ', exampleSentence: '這裡很安靜。', exampleMeaning: 'Nơi đây rất yên tĩnh.' },
          { id: 'w2-6-4', traditional: '吵', pinyin: 'chǎo', zhuyin: 'ㄔㄠˇ', meaning: 'ồn ào', partOfSpeech: 'tính từ', exampleSentence: '外面太吵了。', exampleMeaning: 'Bên ngoài ồn quá.' },
          { id: 'w2-6-5', traditional: '方便', pinyin: 'fāngbiàn', zhuyin: 'ㄈㄤ ㄅㄧㄢˋ', meaning: 'thuận tiện', partOfSpeech: 'tính từ', exampleSentence: '住這裡很方便。', exampleMeaning: 'Sống ở đây rất thuận tiện.' },
          { id: 'w2-6-6', traditional: '樓', pinyin: 'lóu', zhuyin: 'ㄌㄡˊ', meaning: 'tầng, lầu', partOfSpeech: 'danh từ', exampleSentence: '我住三樓。', exampleMeaning: 'Tôi ở tầng ba.' },
          { id: 'w2-6-7', traditional: '電梯', pinyin: 'diàntī', zhuyin: 'ㄉㄧㄢˋ ㄊㄧ', meaning: 'thang máy', partOfSpeech: 'danh từ', exampleSentence: '坐電梯上去。', exampleMeaning: 'Đi thang máy lên.' },
          { id: 'w2-6-8', traditional: '房東', pinyin: 'fángdōng', zhuyin: 'ㄈㄤˊ ㄉㄨㄥ', meaning: 'chủ nhà (cho thuê)', partOfSpeech: 'danh từ', exampleSentence: '房東人很好。', exampleMeaning: 'Chủ nhà rất tốt.' },
          { id: 'w2-6-9', traditional: '傢俱', pinyin: 'jiājù', zhuyin: 'ㄐㄧㄚ ㄐㄩˋ', meaning: 'nội thất, đồ nội thất', partOfSpeech: 'danh từ', exampleSentence: '傢俱都是新的。', exampleMeaning: 'Đồ nội thất đều mới.' },
          { id: 'w2-6-10', traditional: '陽台', pinyin: 'yángtái', zhuyin: 'ㄧㄤˊ ㄊㄞˊ', meaning: 'ban công', partOfSpeech: 'danh từ', exampleSentence: '陽台可以曬衣服。', exampleMeaning: 'Ban công có thể phơi quần áo.' },
          { id: 'w2-6-11', traditional: '環境', pinyin: 'huánjìng', zhuyin: 'ㄏㄨㄢˊ ㄐㄧㄥˋ', meaning: 'môi trường, hoàn cảnh', partOfSpeech: 'danh từ', exampleSentence: '環境不錯。', exampleMeaning: 'Môi trường khá tốt.' },
          { id: 'w2-6-12', traditional: '簽約', pinyin: 'qiānyuē', zhuyin: 'ㄑㄧㄢ ㄩㄝ', meaning: 'ký hợp đồng', partOfSpeech: 'động từ', exampleSentence: '明天簽約。', exampleMeaning: 'Ngày mai ký hợp đồng.' },
          { id: 'w2-6-13', traditional: '押金', pinyin: 'yājīn', zhuyin: 'ㄧㄚ ㄐㄧㄣ', meaning: 'tiền đặt cọc', partOfSpeech: 'danh từ', exampleSentence: '押金兩個月。', exampleMeaning: 'Đặt cọc hai tháng.' },
          { id: 'w2-6-14', traditional: '整理', pinyin: 'zhěnglǐ', zhuyin: 'ㄓㄥˇ ㄌㄧˇ', meaning: 'dọn dẹp, sắp xếp', partOfSpeech: 'động từ', exampleSentence: '整理房間。', exampleMeaning: 'Dọn dẹp phòng.' },
          { id: 'w2-6-15', traditional: '鄰居', pinyin: 'línjū', zhuyin: 'ㄌㄧㄣˊ ㄐㄩ', meaning: 'hàng xóm', partOfSpeech: 'danh từ', exampleSentence: '鄰居很友善。', exampleMeaning: 'Hàng xóm rất thân thiện.' },
        ],
      },
      {
        id: 'b2-l6-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-6-1', pattern: 'V + 到 + Place',
            explanation: '"V + 到 + Nơi" diễn tả hành động kèm kết quả đến một nơi nào đó.',
            examples: [
              { sentence: '搬到學校附近。', pinyin: 'Bān dào xuéxiào fùjìn.', meaning: 'Dọn đến gần trường.' },
              { sentence: '走到車站。', pinyin: 'Zǒu dào chēzhàn.', meaning: 'Đi đến trạm xe.' },
            ],
          },
          {
            id: 'g2-6-2', pattern: '比較 + Adj',
            explanation: '"比較" = tương đối, khá. Dùng so sánh nhẹ nhàng hơn "很".',
            examples: [
              { sentence: '這裡比較安靜。', pinyin: 'Zhèlǐ bǐjiào ānjìng.', meaning: 'Nơi đây khá yên tĩnh.' },
              { sentence: '那個房間比較大。', pinyin: 'Nàge fángjiān bǐjiào dà.', meaning: 'Phòng đó khá lớn.' },
            ],
          },
          {
            id: 'g2-6-3', pattern: '不但...而且...',
            explanation: '"不但...而且..." = không những...mà còn... Diễn tả sự bổ sung, tăng tiến.',
            examples: [
              { sentence: '這裡不但安靜，而且方便。', pinyin: 'Zhèlǐ búdàn ānjìng, érqiě fāngbiàn.', meaning: 'Nơi đây không những yên tĩnh mà còn thuận tiện.' },
              { sentence: '房間不但大，而且便宜。', pinyin: 'Fángjiān búdàn dà, érqiě piányí.', meaning: 'Phòng không những lớn mà còn rẻ.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l6-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-6-1', type: 'multiple-choice', question: '"搬" nghĩa là gì?', options: ['dọn/chuyển nhà', 'mua', 'bán', 'sửa'], correctAnswer: 'dọn/chuyển nhà' },
          { id: 'e2-6-2', type: 'multiple-choice', question: '"房東" là gì?', options: ['người thuê nhà', 'chủ nhà cho thuê', 'hàng xóm', 'bạn cùng phòng'], correctAnswer: 'chủ nhà cho thuê' },
          { id: 'e2-6-3', type: 'multiple-choice', question: 'Chọn từ đúng: 這裡___安靜。(Nơi đây khá yên tĩnh)', options: ['很', '比較', '最', '太'], correctAnswer: '比較' },
          { id: 'e2-6-4', type: 'multiple-choice', question: '"押金" nghĩa là gì?', options: ['tiền thuê', 'tiền đặt cọc', 'tiền lương', 'tiền thưởng'], correctAnswer: 'tiền đặt cọc' },
          { id: 'e2-6-5', type: 'matching', question: 'Nối từ về nhà ở', options: ['電梯|thang máy', '陽台|ban công', '傢俱|nội thất', '鄰居|hàng xóm'], correctAnswer: ['電梯|thang máy', '陽台|ban công', '傢俱|nội thất', '鄰居|hàng xóm'] },
          { id: 'e2-6-6', type: 'sentence-order', question: 'Sắp xếp: "Dọn đến gần trường"', options: ['搬', '到', '學校', '附近'], correctAnswer: ['搬', '到', '學校', '附近'] },
          { id: 'e2-6-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '搬到學校附近', options: ['Trường ở gần đây', 'Dọn đến gần trường', 'Trường rất xa', 'Đi đến trường'], correctAnswer: 'Dọn đến gần trường' },
          { id: 'e2-6-8', type: 'fill-blank', question: '這裡不但安靜，___方便。(Không những yên tĩnh mà còn thuận tiện)', correctAnswer: '而且' },
          { id: 'e2-6-9', type: 'matching', question: 'Nối từ', options: ['安靜|yên tĩnh', '吵|ồn ào', '方便|thuận tiện', '整理|dọn dẹp'], correctAnswer: ['安靜|yên tĩnh', '吵|ồn ào', '方便|thuận tiện', '整理|dọn dẹp'] },
          { id: 'e2-6-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '電梯', options: ['樓梯', '電梯', '陽台', '電視'], correctAnswer: '電梯' },
        ],
      },
      {
        id: 'b2-l6-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-6-1', type: 'multiple-choice', question: 'Phiên âm của "附近" là gì?', options: ['fùjìn', 'fújìn', 'fùjīn', 'fújīn'], correctAnswer: 'fùjìn' },
          { id: 'r2-6-2', type: 'fill-blank', question: '搬___學校附近。(Dọn đến gần trường)', correctAnswer: '到' },
          { id: 'r2-6-3', type: 'matching', question: 'Ôn tập', options: ['搬|dọn nhà', '簽約|ký hợp đồng', '環境|môi trường', '押金|đặt cọc'], correctAnswer: ['搬|dọn nhà', '簽約|ký hợp đồng', '環境|môi trường', '押金|đặt cọc'] },
        ],
      },
    ],
  },

  // ===== BÀI 7: 你打籃球打得很好 =====
  {
    id: 'b2-l7', number: 7, title: 'Bạn chơi bóng rổ giỏi lắm', titleChinese: '你打籃球打得很好',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l7-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-7-1', traditional: '籃球', pinyin: 'lánqiú', zhuyin: 'ㄌㄢˊ ㄑㄧㄡˊ', meaning: 'bóng rổ', partOfSpeech: 'danh từ', exampleSentence: '你喜歡打籃球嗎？', exampleMeaning: 'Bạn thích chơi bóng rổ không?' },
          { id: 'w2-7-2', traditional: '棒球', pinyin: 'bàngqiú', zhuyin: 'ㄅㄤˋ ㄑㄧㄡˊ', meaning: 'bóng chày', partOfSpeech: 'danh từ', exampleSentence: '臺灣人很喜歡棒球。', exampleMeaning: 'Người Đài Loan rất thích bóng chày.' },
          { id: 'w2-7-3', traditional: '游泳', pinyin: 'yóuyǒng', zhuyin: 'ㄧㄡˊ ㄧㄨㄥˇ', meaning: 'bơi lội', partOfSpeech: 'động từ', exampleSentence: '夏天去游泳。', exampleMeaning: 'Mùa hè đi bơi.' },
          { id: 'w2-7-4', traditional: '跑步', pinyin: 'pǎobù', zhuyin: 'ㄆㄠˇ ㄅㄨˋ', meaning: 'chạy bộ', partOfSpeech: 'động từ', exampleSentence: '每天跑步。', exampleMeaning: 'Mỗi ngày chạy bộ.' },
          { id: 'w2-7-5', traditional: '運動', pinyin: 'yùndòng', zhuyin: 'ㄩㄣˋ ㄉㄨㄥˋ', meaning: 'thể thao, vận động', partOfSpeech: 'danh từ', exampleSentence: '你喜歡什麼運動？', exampleMeaning: 'Bạn thích môn thể thao nào?' },
          { id: 'w2-7-6', traditional: '比賽', pinyin: 'bǐsài', zhuyin: 'ㄅㄧˇ ㄙㄞˋ', meaning: 'thi đấu', partOfSpeech: 'danh từ', exampleSentence: '明天有比賽。', exampleMeaning: 'Ngày mai có thi đấu.' },
          { id: 'w2-7-7', traditional: '贏', pinyin: 'yíng', zhuyin: 'ㄧㄥˊ', meaning: 'thắng', partOfSpeech: 'động từ', exampleSentence: '我們贏了！', exampleMeaning: 'Chúng ta thắng rồi!' },
          { id: 'w2-7-8', traditional: '輸', pinyin: 'shū', zhuyin: 'ㄕㄨ', meaning: 'thua', partOfSpeech: 'động từ', exampleSentence: '上次我們輸了。', exampleMeaning: 'Lần trước chúng ta thua rồi.' },
          { id: 'w2-7-9', traditional: '練習', pinyin: 'liànxí', zhuyin: 'ㄌㄧㄢˋ ㄒㄧˊ', meaning: 'luyện tập', partOfSpeech: 'động từ', exampleSentence: '多練習就會進步。', exampleMeaning: 'Luyện tập nhiều sẽ tiến bộ.' },
          { id: 'w2-7-10', traditional: '厲害', pinyin: 'lìhài', zhuyin: 'ㄌㄧˋ ㄏㄞˋ', meaning: 'giỏi, xuất sắc', partOfSpeech: 'tính từ', exampleSentence: '你很厲害！', exampleMeaning: 'Bạn giỏi quá!' },
          { id: 'w2-7-11', traditional: '隊', pinyin: 'duì', zhuyin: 'ㄉㄨㄟˋ', meaning: 'đội', partOfSpeech: 'danh từ', exampleSentence: '我們的隊很強。', exampleMeaning: 'Đội chúng ta rất mạnh.' },
          { id: 'w2-7-12', traditional: '加油', pinyin: 'jiāyóu', zhuyin: 'ㄐㄧㄚ ㄧㄡˊ', meaning: 'cố lên', partOfSpeech: 'cảm thán', exampleSentence: '加油！', exampleMeaning: 'Cố lên!' },
          { id: 'w2-7-13', traditional: '流汗', pinyin: 'liú hàn', zhuyin: 'ㄌㄧㄡˊ ㄏㄢˋ', meaning: 'ra mồ hôi', partOfSpeech: 'động từ', exampleSentence: '運動完流了很多汗。', exampleMeaning: 'Vận động xong ra nhiều mồ hôi.' },
          { id: 'w2-7-14', traditional: '球場', pinyin: 'qiúchǎng', zhuyin: 'ㄑㄧㄡˊ ㄔㄤˇ', meaning: 'sân bóng', partOfSpeech: 'danh từ', exampleSentence: '去球場打球。', exampleMeaning: 'Đến sân bóng chơi bóng.' },
          { id: 'w2-7-15', traditional: '教練', pinyin: 'jiàoliàn', zhuyin: 'ㄐㄧㄠˋ ㄌㄧㄢˋ', meaning: 'huấn luyện viên', partOfSpeech: 'danh từ', exampleSentence: '教練教我們打球。', exampleMeaning: 'HLV dạy chúng ta chơi bóng.' },
        ],
      },
      {
        id: 'b2-l7-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-7-1', pattern: 'V + 得 + Adj (bổ ngữ mức độ)',
            explanation: '"V + 得 + Adj" mô tả mức độ hoặc cách thức hành động. Dạng phủ định: V + 得 + 不 + Adj.',
            examples: [
              { sentence: '你打籃球打得很好。', pinyin: 'Nǐ dǎ lánqiú dǎ de hěn hǎo.', meaning: 'Bạn chơi bóng rổ giỏi lắm.' },
              { sentence: '他跑得很快。', pinyin: 'Tā pǎo de hěn kuài.', meaning: 'Anh ấy chạy rất nhanh.' },
            ],
          },
          {
            id: 'g2-7-2', pattern: '每 + MW + N + 都 + VP',
            explanation: '"每...都..." = mỗi...đều... Diễn tả tất cả không ngoại lệ.',
            examples: [
              { sentence: '每天都跑步。', pinyin: 'Měi tiān dōu pǎobù.', meaning: 'Mỗi ngày đều chạy bộ.' },
              { sentence: '每個人都喜歡運動。', pinyin: 'Měi ge rén dōu xǐhuān yùndòng.', meaning: 'Mỗi người đều thích thể thao.' },
            ],
          },
          {
            id: 'g2-7-3', pattern: '越來越 + Adj',
            explanation: '"越來越" = ngày càng. Diễn tả sự thay đổi tăng dần.',
            examples: [
              { sentence: '他打得越來越好。', pinyin: 'Tā dǎ de yuèláiyuè hǎo.', meaning: 'Anh ấy chơi ngày càng giỏi.' },
              { sentence: '天氣越來越熱。', pinyin: 'Tiānqì yuèláiyuè rè.', meaning: 'Thời tiết ngày càng nóng.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l7-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-7-1', type: 'multiple-choice', question: '"比賽" nghĩa là gì?', options: ['luyện tập', 'thi đấu', 'chạy bộ', 'bơi lội'], correctAnswer: 'thi đấu' },
          { id: 'e2-7-2', type: 'multiple-choice', question: '"贏" nghĩa ngược lại với từ nào?', options: ['練習', '輸', '加油', '運動'], correctAnswer: '輸' },
          { id: 'e2-7-3', type: 'multiple-choice', question: 'Chọn từ đúng: 他跑___很快。(Anh ấy chạy rất nhanh)', options: ['的', '得', '地', '了'], correctAnswer: '得' },
          { id: 'e2-7-4', type: 'multiple-choice', question: '"教練" là gì?', options: ['cầu thủ', 'trọng tài', 'huấn luyện viên', 'đội trưởng'], correctAnswer: 'huấn luyện viên' },
          { id: 'e2-7-5', type: 'matching', question: 'Nối các môn thể thao', options: ['籃球|bóng rổ', '棒球|bóng chày', '游泳|bơi lội', '跑步|chạy bộ'], correctAnswer: ['籃球|bóng rổ', '棒球|bóng chày', '游泳|bơi lội', '跑步|chạy bộ'] },
          { id: 'e2-7-6', type: 'sentence-order', question: 'Sắp xếp: "Bạn chơi bóng rổ giỏi lắm"', options: ['你', '打', '籃球', '打得', '很好'], correctAnswer: ['你', '打', '籃球', '打得', '很好'] },
          { id: 'e2-7-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '加油', options: ['Đổ xăng', 'Cố lên', 'Nhanh lên', 'Dừng lại'], correctAnswer: 'Cố lên' },
          { id: 'e2-7-8', type: 'fill-blank', question: '他打得越來___好。(Anh ấy chơi ngày càng giỏi)', correctAnswer: '越' },
          { id: 'e2-7-9', type: 'matching', question: 'Nối từ', options: ['贏|thắng', '輸|thua', '厲害|giỏi', '練習|luyện tập'], correctAnswer: ['贏|thắng', '輸|thua', '厲害|giỏi', '練習|luyện tập'] },
          { id: 'e2-7-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '比賽', options: ['練習', '比賽', '運動', '籃球'], correctAnswer: '比賽' },
        ],
      },
      {
        id: 'b2-l7-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-7-1', type: 'multiple-choice', question: 'Phiên âm của "運動" là gì?', options: ['yùndòng', 'yúndòng', 'yùndōng', 'yǔndòng'], correctAnswer: 'yùndòng' },
          { id: 'r2-7-2', type: 'fill-blank', question: '每天___跑步。(Mỗi ngày đều chạy bộ)', correctAnswer: '都' },
          { id: 'r2-7-3', type: 'matching', question: 'Ôn tập', options: ['球場|sân bóng', '教練|HLV', '隊|đội', '流汗|ra mồ hôi'], correctAnswer: ['球場|sân bóng', '教練|HLV', '隊|đội', '流汗|ra mồ hôi'] },
        ],
      },
    ],
  },

  // ===== BÀI 8: 這件裙子太貴了吧 =====
  {
    id: 'b2-l8', number: 8, title: 'Cái váy này đắt quá đi', titleChinese: '這件裙子太貴了吧',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l8-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-8-1', traditional: '裙子', pinyin: 'qúnzi', zhuyin: 'ㄑㄩㄣˊ ㄗ˙', meaning: 'váy', partOfSpeech: 'danh từ', exampleSentence: '這件裙子很漂亮。', exampleMeaning: 'Cái váy này rất đẹp.' },
          { id: 'w2-8-2', traditional: '件', pinyin: 'jiàn', zhuyin: 'ㄐㄧㄢˋ', meaning: 'cái (lượng từ cho áo, đồ)', partOfSpeech: 'lượng từ', exampleSentence: '這件衣服多少錢？', exampleMeaning: 'Cái áo này bao nhiêu tiền?' },
          { id: 'w2-8-3', traditional: '打折', pinyin: 'dǎzhé', zhuyin: 'ㄉㄚˇ ㄓㄜˊ', meaning: 'giảm giá', partOfSpeech: 'động từ', exampleSentence: '現在打八折。', exampleMeaning: 'Bây giờ giảm 20%.' },
          { id: 'w2-8-4', traditional: '試穿', pinyin: 'shìchuān', zhuyin: 'ㄕˋ ㄔㄨㄢ', meaning: 'thử (quần áo)', partOfSpeech: 'động từ', exampleSentence: '我可以試穿嗎？', exampleMeaning: 'Tôi có thể thử được không?' },
          { id: 'w2-8-5', traditional: '尺寸', pinyin: 'chǐcùn', zhuyin: 'ㄔˇ ㄘㄨㄣˋ', meaning: 'kích cỡ', partOfSpeech: 'danh từ', exampleSentence: '這個尺寸合適嗎？', exampleMeaning: 'Kích cỡ này vừa không?' },
          { id: 'w2-8-6', traditional: '合適', pinyin: 'héshì', zhuyin: 'ㄏㄜˊ ㄕˋ', meaning: 'vừa vặn, phù hợp', partOfSpeech: 'tính từ', exampleSentence: '這件很合適。', exampleMeaning: 'Cái này rất vừa.' },
          { id: 'w2-8-7', traditional: '顏色', pinyin: 'yánsè', zhuyin: 'ㄧㄢˊ ㄙㄜˋ', meaning: 'màu sắc', partOfSpeech: 'danh từ', exampleSentence: '你喜歡什麼顏色？', exampleMeaning: 'Bạn thích màu gì?' },
          { id: 'w2-8-8', traditional: '穿', pinyin: 'chuān', zhuyin: 'ㄔㄨㄢ', meaning: 'mặc', partOfSpeech: 'động từ', exampleSentence: '穿這件好看。', exampleMeaning: 'Mặc cái này đẹp.' },
          { id: 'w2-8-9', traditional: '褲子', pinyin: 'kùzi', zhuyin: 'ㄎㄨˋ ㄗ˙', meaning: 'quần', partOfSpeech: 'danh từ', exampleSentence: '這條褲子太長了。', exampleMeaning: 'Cái quần này dài quá.' },
          { id: 'w2-8-10', traditional: '鞋子', pinyin: 'xiézi', zhuyin: 'ㄒㄧㄝˊ ㄗ˙', meaning: 'giày', partOfSpeech: 'danh từ', exampleSentence: '我要買鞋子。', exampleMeaning: 'Tôi muốn mua giày.' },
          { id: 'w2-8-11', traditional: '便宜', pinyin: 'piányí', zhuyin: 'ㄆㄧㄢˊ ㄧˊ', meaning: 'rẻ', partOfSpeech: 'tính từ', exampleSentence: '有沒有便宜一點的？', exampleMeaning: 'Có cái nào rẻ hơn không?' },
          { id: 'w2-8-12', traditional: '適合', pinyin: 'shìhé', zhuyin: 'ㄕˋ ㄏㄜˊ', meaning: 'hợp với, thích hợp', partOfSpeech: 'động từ', exampleSentence: '這個顏色很適合你。', exampleMeaning: 'Màu này rất hợp với bạn.' },
          { id: 'w2-8-13', traditional: '夜市', pinyin: 'yèshì', zhuyin: 'ㄧㄝˋ ㄕˋ', meaning: 'chợ đêm', partOfSpeech: 'danh từ', exampleSentence: '去夜市買衣服。', exampleMeaning: 'Đi chợ đêm mua quần áo.' },
          { id: 'w2-8-14', traditional: '百貨公司', pinyin: 'bǎihuò gōngsī', zhuyin: 'ㄅㄞˇ ㄏㄨㄛˋ ㄍㄨㄥ ㄙ', meaning: 'trung tâm thương mại', partOfSpeech: 'danh từ', exampleSentence: '百貨公司東西比較貴。', exampleMeaning: 'TTTM đồ khá đắt.' },
          { id: 'w2-8-15', traditional: '算', pinyin: 'suàn', zhuyin: 'ㄙㄨㄢˋ', meaning: 'tính, coi như', partOfSpeech: 'động từ', exampleSentence: '算你便宜一點。', exampleMeaning: 'Tính rẻ cho bạn một chút.' },
        ],
      },
      {
        id: 'b2-l8-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-8-1', pattern: '太 + Adj + 了吧',
            explanation: '"太...了吧" = quá...đi/rồi (kèm ngạc nhiên hoặc phàn nàn nhẹ).',
            examples: [
              { sentence: '這件裙子太貴了吧！', pinyin: 'Zhè jiàn qúnzi tài guì le ba!', meaning: 'Cái váy này đắt quá đi!' },
              { sentence: '太大了吧！', pinyin: 'Tài dà le ba!', meaning: 'Lớn quá đi!' },
            ],
          },
          {
            id: 'g2-8-2', pattern: 'A 比 B + Adj',
            explanation: 'Cấu trúc so sánh hơn: A so với B thì [tính từ] hơn.',
            examples: [
              { sentence: '夜市比百貨公司便宜。', pinyin: 'Yèshì bǐ bǎihuò gōngsī piányí.', meaning: 'Chợ đêm rẻ hơn TTTM.' },
              { sentence: '這件比那件好看。', pinyin: 'Zhè jiàn bǐ nà jiàn hǎokàn.', meaning: 'Cái này đẹp hơn cái kia.' },
            ],
          },
          {
            id: 'g2-8-3', pattern: '有沒有 + Adj + 一點的？',
            explanation: 'Hỏi xin phương án thay thế: "Có cái nào [adj] hơn không?"',
            examples: [
              { sentence: '有沒有便宜一點的？', pinyin: 'Yǒu méiyǒu piányí yìdiǎn de?', meaning: 'Có cái nào rẻ hơn không?' },
              { sentence: '有沒有大一點的？', pinyin: 'Yǒu méiyǒu dà yìdiǎn de?', meaning: 'Có cái nào lớn hơn không?' },
            ],
          },
        ],
      },
      {
        id: 'b2-l8-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-8-1', type: 'multiple-choice', question: '"打折" nghĩa là gì?', options: ['trả giá', 'giảm giá', 'tăng giá', 'không đổi'], correctAnswer: 'giảm giá' },
          { id: 'e2-8-2', type: 'multiple-choice', question: '"試穿" nghĩa là gì?', options: ['mua', 'bán', 'thử (quần áo)', 'đổi'], correctAnswer: 'thử (quần áo)' },
          { id: 'e2-8-3', type: 'multiple-choice', question: 'Chọn từ đúng: 夜市___百貨公司便宜。(Chợ đêm rẻ hơn TTTM)', options: ['跟', '比', '和', '對'], correctAnswer: '比' },
          { id: 'e2-8-4', type: 'multiple-choice', question: '"合適" nghĩa là gì?', options: ['đắt', 'rẻ', 'vừa vặn', 'xấu'], correctAnswer: 'vừa vặn' },
          { id: 'e2-8-5', type: 'matching', question: 'Nối quần áo', options: ['裙子|váy', '褲子|quần', '鞋子|giày', '衣服|quần áo'], correctAnswer: ['裙子|váy', '褲子|quần', '鞋子|giày', '衣服|quần áo'] },
          { id: 'e2-8-6', type: 'sentence-order', question: 'Sắp xếp: "Cái váy này đắt quá đi!"', options: ['這', '件', '裙子', '太', '貴', '了', '吧', '！'], correctAnswer: ['這', '件', '裙子', '太', '貴', '了', '吧', '！'] },
          { id: 'e2-8-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '有沒有便宜一點的', options: ['Cái này rẻ quá', 'Có cái nào rẻ hơn không?', 'Không có cái nào rẻ', 'Cái này đắt nhất'], correctAnswer: 'Có cái nào rẻ hơn không?' },
          { id: 'e2-8-8', type: 'fill-blank', question: '這個顏色很___你。(Màu này rất hợp với bạn)', correctAnswer: '適合' },
          { id: 'e2-8-9', type: 'matching', question: 'Nối từ mua sắm', options: ['打折|giảm giá', '便宜|rẻ', '尺寸|kích cỡ', '顏色|màu sắc'], correctAnswer: ['打折|giảm giá', '便宜|rẻ', '尺寸|kích cỡ', '顏色|màu sắc'] },
          { id: 'e2-8-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '百貨公司', options: ['夜市', '超市', '百貨公司', '商店'], correctAnswer: '百貨公司' },
        ],
      },
      {
        id: 'b2-l8-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-8-1', type: 'multiple-choice', question: 'Phiên âm của "裙子" là gì?', options: ['qúnzi', 'qúnzǐ', 'qūnzi', 'qùnzi'], correctAnswer: 'qúnzi' },
          { id: 'r2-8-2', type: 'fill-blank', question: '這件___那件好看。(Cái này đẹp hơn cái kia)', correctAnswer: '比' },
          { id: 'r2-8-3', type: 'matching', question: 'Ôn tập', options: ['試穿|thử đồ', '打折|giảm giá', '合適|vừa vặn', '算|tính'], correctAnswer: ['試穿|thử đồ', '打折|giảm giá', '合適|vừa vặn', '算|tính'] },
        ],
      },
    ],
  },

  // ===== BÀI 9: 那個乖孩子是你的妹妹嗎？ =====
  {
    id: 'b2-l9', number: 9, title: 'Đứa trẻ ngoan kia là em gái bạn à?', titleChinese: '那個乖孩子是你的妹妹嗎？',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l9-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-9-1', traditional: '乖', pinyin: 'guāi', zhuyin: 'ㄍㄨㄞ', meaning: 'ngoan', partOfSpeech: 'tính từ', exampleSentence: '這個孩子很乖。', exampleMeaning: 'Đứa trẻ này rất ngoan.' },
          { id: 'w2-9-2', traditional: '孩子', pinyin: 'háizi', zhuyin: 'ㄏㄞˊ ㄗ˙', meaning: 'trẻ con, đứa bé', partOfSpeech: 'danh từ', exampleSentence: '那個孩子是誰？', exampleMeaning: 'Đứa bé kia là ai?' },
          { id: 'w2-9-3', traditional: '長得', pinyin: 'zhǎng de', zhuyin: 'ㄓㄤˇ ㄉㄜ˙', meaning: 'trông (ngoại hình)', partOfSpeech: 'động từ', exampleSentence: '她長得很可愛。', exampleMeaning: 'Cô ấy trông rất dễ thương.' },
          { id: 'w2-9-4', traditional: '像', pinyin: 'xiàng', zhuyin: 'ㄒㄧㄤˋ', meaning: 'giống', partOfSpeech: 'động từ', exampleSentence: '她像媽媽。', exampleMeaning: 'Cô ấy giống mẹ.' },
          { id: 'w2-9-5', traditional: '可愛', pinyin: 'kěài', zhuyin: 'ㄎㄜˇ ㄞˋ', meaning: 'dễ thương', partOfSpeech: 'tính từ', exampleSentence: '好可愛！', exampleMeaning: 'Dễ thương quá!' },
          { id: 'w2-9-6', traditional: '皮膚', pinyin: 'pífū', zhuyin: 'ㄆㄧˊ ㄈㄨ', meaning: 'da', partOfSpeech: 'danh từ', exampleSentence: '她的皮膚很白。', exampleMeaning: 'Da cô ấy rất trắng.' },
          { id: 'w2-9-7', traditional: '眼睛', pinyin: 'yǎnjīng', zhuyin: 'ㄧㄢˇ ㄐㄧㄥ', meaning: 'mắt', partOfSpeech: 'danh từ', exampleSentence: '她的眼睛很大。', exampleMeaning: 'Mắt cô ấy rất to.' },
          { id: 'w2-9-8', traditional: '頭髮', pinyin: 'tóufǎ', zhuyin: 'ㄊㄡˊ ㄈㄚˇ', meaning: 'tóc', partOfSpeech: 'danh từ', exampleSentence: '她的頭髮很長。', exampleMeaning: 'Tóc cô ấy rất dài.' },
          { id: 'w2-9-9', traditional: '胖', pinyin: 'pàng', zhuyin: 'ㄆㄤˋ', meaning: 'mập, béo', partOfSpeech: 'tính từ', exampleSentence: '他比較胖。', exampleMeaning: 'Anh ấy khá mập.' },
          { id: 'w2-9-10', traditional: '瘦', pinyin: 'shòu', zhuyin: 'ㄕㄡˋ', meaning: 'gầy, ốm', partOfSpeech: 'tính từ', exampleSentence: '你太瘦了。', exampleMeaning: 'Bạn gầy quá.' },
          { id: 'w2-9-11', traditional: '高', pinyin: 'gāo', zhuyin: 'ㄍㄠ', meaning: 'cao', partOfSpeech: 'tính từ', exampleSentence: '他很高。', exampleMeaning: 'Anh ấy rất cao.' },
          { id: 'w2-9-12', traditional: '矮', pinyin: 'ǎi', zhuyin: 'ㄞˇ', meaning: 'thấp, lùn', partOfSpeech: 'tính từ', exampleSentence: '我比較矮。', exampleMeaning: 'Tôi khá thấp.' },
          { id: 'w2-9-13', traditional: '帥', pinyin: 'shuài', zhuyin: 'ㄕㄨㄞˋ', meaning: 'đẹp trai', partOfSpeech: 'tính từ', exampleSentence: '他長得很帥。', exampleMeaning: 'Anh ấy trông rất đẹp trai.' },
          { id: 'w2-9-14', traditional: '戴', pinyin: 'dài', zhuyin: 'ㄉㄞˋ', meaning: 'đeo, đội', partOfSpeech: 'động từ', exampleSentence: '她戴眼鏡。', exampleMeaning: 'Cô ấy đeo kính.' },
          { id: 'w2-9-15', traditional: '眼鏡', pinyin: 'yǎnjìng', zhuyin: 'ㄧㄢˇ ㄐㄧㄥˋ', meaning: 'kính mắt', partOfSpeech: 'danh từ', exampleSentence: '我沒戴眼鏡。', exampleMeaning: 'Tôi không đeo kính.' },
        ],
      },
      {
        id: 'b2-l9-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-9-1', pattern: '長得 + Adj (mô tả ngoại hình)',
            explanation: '"長得" dùng mô tả ngoại hình, diện mạo của một người.',
            examples: [
              { sentence: '她長得很可愛。', pinyin: 'Tā zhǎng de hěn kěài.', meaning: 'Cô ấy trông rất dễ thương.' },
              { sentence: '他長得像爸爸。', pinyin: 'Tā zhǎng de xiàng bàba.', meaning: 'Anh ấy trông giống ba.' },
            ],
          },
          {
            id: 'g2-9-2', pattern: '跟 + N + 一樣 + Adj',
            explanation: '"跟...一樣" = giống như. Diễn tả sự giống nhau.',
            examples: [
              { sentence: '她跟媽媽一樣漂亮。', pinyin: 'Tā gēn māma yíyàng piàoliang.', meaning: 'Cô ấy đẹp giống mẹ.' },
              { sentence: '弟弟跟哥哥一樣高。', pinyin: 'Dìdi gēn gēge yíyàng gāo.', meaning: 'Em trai cao bằng anh trai.' },
            ],
          },
          {
            id: 'g2-9-3', pattern: 'Adj + 的 + 那個 (đảo ngữ miêu tả)',
            explanation: 'Đặt tính từ trước "的 + danh từ" để miêu tả, xác định đối tượng.',
            examples: [
              { sentence: '那個乖孩子是你的妹妹嗎？', pinyin: 'Nàge guāi háizi shì nǐ de mèimei ma?', meaning: 'Đứa trẻ ngoan kia là em gái bạn à?' },
              { sentence: '高的那個人是老師。', pinyin: 'Gāo de nàge rén shì lǎoshī.', meaning: 'Người cao kia là giáo viên.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l9-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-9-1', type: 'multiple-choice', question: '"乖" nghĩa là gì?', options: ['hư', 'ngoan', 'vui', 'buồn'], correctAnswer: 'ngoan' },
          { id: 'e2-9-2', type: 'multiple-choice', question: '"長得" dùng để mô tả gì?', options: ['tính cách', 'ngoại hình', 'sở thích', 'tuổi tác'], correctAnswer: 'ngoại hình' },
          { id: 'e2-9-3', type: 'multiple-choice', question: 'Từ nào ngược nghĩa với "胖"?', options: ['高', '矮', '瘦', '帥'], correctAnswer: '瘦' },
          { id: 'e2-9-4', type: 'multiple-choice', question: '"戴" trong "戴眼鏡" nghĩa là gì?', options: ['mua', 'bán', 'đeo', 'vứt'], correctAnswer: 'đeo' },
          { id: 'e2-9-5', type: 'matching', question: 'Nối ngoại hình', options: ['高|cao', '矮|thấp', '胖|mập', '瘦|gầy'], correctAnswer: ['高|cao', '矮|thấp', '胖|mập', '瘦|gầy'] },
          { id: 'e2-9-6', type: 'sentence-order', question: 'Sắp xếp: "Cô ấy trông rất dễ thương"', options: ['她', '長得', '很', '可愛'], correctAnswer: ['她', '長得', '很', '可愛'] },
          { id: 'e2-9-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '她長得像媽媽', options: ['Cô ấy thích mẹ', 'Cô ấy giống mẹ', 'Cô ấy nhớ mẹ', 'Mẹ cô ấy đẹp'], correctAnswer: 'Cô ấy giống mẹ' },
          { id: 'e2-9-8', type: 'fill-blank', question: '她___媽媽一樣漂亮。(Cô ấy đẹp giống mẹ)', correctAnswer: '跟' },
          { id: 'e2-9-9', type: 'matching', question: 'Nối từ bộ phận cơ thể', options: ['眼睛|mắt', '頭髮|tóc', '皮膚|da', '眼鏡|kính mắt'], correctAnswer: ['眼睛|mắt', '頭髮|tóc', '皮膚|da', '眼鏡|kính mắt'] },
          { id: 'e2-9-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '可愛', options: ['漂亮', '可愛', '帥', '乖'], correctAnswer: '可愛' },
        ],
      },
      {
        id: 'b2-l9-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-9-1', type: 'multiple-choice', question: 'Phiên âm của "眼睛" là gì?', options: ['yǎnjīng', 'yǎnjìng', 'yánjīng', 'yànjīng'], correctAnswer: 'yǎnjīng' },
          { id: 'r2-9-2', type: 'fill-blank', question: '她長___很可愛。(Cô ấy trông rất dễ thương)', correctAnswer: '得' },
          { id: 'r2-9-3', type: 'matching', question: 'Ôn tập', options: ['像|giống', '乖|ngoan', '帥|đẹp trai', '戴|đeo'], correctAnswer: ['像|giống', '乖|ngoan', '帥|đẹp trai', '戴|đeo'] },
        ],
      },
    ],
  },

  // ===== BÀI 10: 你怎麼沒去乘涼？ =====
  {
    id: 'b2-l10', number: 10, title: 'Sao bạn không đi hóng mát?', titleChinese: '你怎麼沒去乘涼？',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l10-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-10-1', traditional: '乘涼', pinyin: 'chéngliáng', zhuyin: 'ㄔㄥˊ ㄌㄧㄤˊ', meaning: 'hóng mát', partOfSpeech: 'động từ', exampleSentence: '晚上去公園乘涼。', exampleMeaning: 'Tối đi công viên hóng mát.' },
          { id: 'w2-10-2', traditional: '涼快', pinyin: 'liángkuài', zhuyin: 'ㄌㄧㄤˊ ㄎㄨㄞˋ', meaning: 'mát mẻ', partOfSpeech: 'tính từ', exampleSentence: '今天很涼快。', exampleMeaning: 'Hôm nay rất mát mẻ.' },
          { id: 'w2-10-3', traditional: '悶', pinyin: 'mēn', zhuyin: 'ㄇㄣ', meaning: 'oi bức, ngột ngạt', partOfSpeech: 'tính từ', exampleSentence: '天氣好悶。', exampleMeaning: 'Thời tiết oi bức quá.' },
          { id: 'w2-10-4', traditional: '舒服', pinyin: 'shūfú', zhuyin: 'ㄕㄨ ㄈㄨˊ', meaning: 'thoải mái, dễ chịu', partOfSpeech: 'tính từ', exampleSentence: '吹風很舒服。', exampleMeaning: 'Hứng gió rất thoải mái.' },
          { id: 'w2-10-5', traditional: '陰天', pinyin: 'yīntiān', zhuyin: 'ㄧㄣ ㄊㄧㄢ', meaning: 'trời âm u', partOfSpeech: 'danh từ', exampleSentence: '今天是陰天。', exampleMeaning: 'Hôm nay trời âm u.' },
          { id: 'w2-10-6', traditional: '晴天', pinyin: 'qíngtiān', zhuyin: 'ㄑㄧㄥˊ ㄊㄧㄢ', meaning: 'trời nắng', partOfSpeech: 'danh từ', exampleSentence: '明天是晴天。', exampleMeaning: 'Ngày mai trời nắng.' },
          { id: 'w2-10-7', traditional: '颱風', pinyin: 'táifēng', zhuyin: 'ㄊㄞˊ ㄈㄥ', meaning: 'bão', partOfSpeech: 'danh từ', exampleSentence: '颱風來了。', exampleMeaning: 'Bão đến rồi.' },
          { id: 'w2-10-8', traditional: '濕', pinyin: 'shī', zhuyin: 'ㄕ', meaning: 'ẩm ướt', partOfSpeech: 'tính từ', exampleSentence: '臺灣很濕。', exampleMeaning: 'Đài Loan rất ẩm ướt.' },
          { id: 'w2-10-9', traditional: '乾', pinyin: 'gān', zhuyin: 'ㄍㄢ', meaning: 'khô', partOfSpeech: 'tính từ', exampleSentence: '冬天比較乾。', exampleMeaning: 'Mùa đông khá khô.' },
          { id: 'w2-10-10', traditional: '出太陽', pinyin: 'chū tàiyáng', zhuyin: 'ㄔㄨ ㄊㄞˋ ㄧㄤˊ', meaning: 'ra nắng, có nắng', partOfSpeech: 'cụm từ', exampleSentence: '出太陽了！', exampleMeaning: 'Ra nắng rồi!' },
          { id: 'w2-10-11', traditional: '預報', pinyin: 'yùbào', zhuyin: 'ㄩˋ ㄅㄠˋ', meaning: 'dự báo', partOfSpeech: 'danh từ', exampleSentence: '看天氣預報。', exampleMeaning: 'Xem dự báo thời tiết.' },
          { id: 'w2-10-12', traditional: '溫度', pinyin: 'wēndù', zhuyin: 'ㄨㄣ ㄉㄨˋ', meaning: 'nhiệt độ', partOfSpeech: 'danh từ', exampleSentence: '溫度三十度。', exampleMeaning: 'Nhiệt độ 30 độ.' },
          { id: 'w2-10-13', traditional: '曬', pinyin: 'shài', zhuyin: 'ㄕㄞˋ', meaning: 'phơi nắng', partOfSpeech: 'động từ', exampleSentence: '太陽太大，別曬太久。', exampleMeaning: 'Nắng quá, đừng phơi lâu.' },
          { id: 'w2-10-14', traditional: '雨傘', pinyin: 'yǔsǎn', zhuyin: 'ㄩˇ ㄙㄢˇ', meaning: 'ô, dù', partOfSpeech: 'danh từ', exampleSentence: '帶雨傘。', exampleMeaning: 'Mang ô theo.' },
          { id: 'w2-10-15', traditional: '突然', pinyin: 'tūrán', zhuyin: 'ㄊㄨ ㄖㄢˊ', meaning: 'bỗng nhiên', partOfSpeech: 'phó từ', exampleSentence: '突然下雨了。', exampleMeaning: 'Bỗng nhiên mưa rồi.' },
        ],
      },
      {
        id: 'b2-l10-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-10-1', pattern: '怎麼 + 沒/不 + V？',
            explanation: '"怎麼沒/不...?" = Sao không...? Diễn tả ngạc nhiên, thắc mắc.',
            examples: [
              { sentence: '你怎麼沒去乘涼？', pinyin: 'Nǐ zěnme méi qù chéngliáng?', meaning: 'Sao bạn không đi hóng mát?' },
              { sentence: '他怎麼不來？', pinyin: 'Tā zěnme bù lái?', meaning: 'Sao anh ấy không đến?' },
            ],
          },
          {
            id: 'g2-10-2', pattern: '一...就...',
            explanation: '"一...就..." = vừa...liền... Diễn tả hai sự việc nối tiếp nhanh.',
            examples: [
              { sentence: '一出門就下雨了。', pinyin: 'Yì chūmén jiù xiàyǔ le.', meaning: 'Vừa ra khỏi cửa liền mưa.' },
              { sentence: '一到夏天就很熱。', pinyin: 'Yí dào xiàtiān jiù hěn rè.', meaning: 'Vừa đến mùa hè liền rất nóng.' },
            ],
          },
          {
            id: 'g2-10-3', pattern: '好像 + VP (hình như)',
            explanation: '"好像" = hình như, dường như. Diễn tả sự phỏng đoán.',
            examples: [
              { sentence: '好像要下雨了。', pinyin: 'Hǎoxiàng yào xiàyǔ le.', meaning: 'Hình như sắp mưa rồi.' },
              { sentence: '他好像不舒服。', pinyin: 'Tā hǎoxiàng bù shūfú.', meaning: 'Hình như anh ấy không khỏe.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l10-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-10-1', type: 'multiple-choice', question: '"乘涼" nghĩa là gì?', options: ['hóng mát', 'tắm biển', 'chạy bộ', 'ngủ'], correctAnswer: 'hóng mát' },
          { id: 'e2-10-2', type: 'multiple-choice', question: '"颱風" là gì?', options: ['gió', 'bão', 'mưa', 'sấm'], correctAnswer: 'bão' },
          { id: 'e2-10-3', type: 'multiple-choice', question: 'Chọn từ đúng: 你___沒去乘涼？(Sao bạn không đi hóng mát?)', options: ['什麼', '怎麼', '哪裡', '為什麼'], correctAnswer: '怎麼' },
          { id: 'e2-10-4', type: 'multiple-choice', question: '"突然" nghĩa là gì?', options: ['từ từ', 'bỗng nhiên', 'thường xuyên', 'đôi khi'], correctAnswer: 'bỗng nhiên' },
          { id: 'e2-10-5', type: 'matching', question: 'Nối từ thời tiết', options: ['陰天|trời âm u', '晴天|trời nắng', '颱風|bão', '出太陽|ra nắng'], correctAnswer: ['陰天|trời âm u', '晴天|trời nắng', '颱風|bão', '出太陽|ra nắng'] },
          { id: 'e2-10-6', type: 'sentence-order', question: 'Sắp xếp: "Hình như sắp mưa rồi"', options: ['好像', '要', '下雨', '了'], correctAnswer: ['好像', '要', '下雨', '了'] },
          { id: 'e2-10-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '一出門就下雨了', options: ['Ra khỏi cửa thì trời nắng', 'Vừa ra khỏi cửa liền mưa', 'Ở nhà trời mưa', 'Không muốn ra ngoài'], correctAnswer: 'Vừa ra khỏi cửa liền mưa' },
          { id: 'e2-10-8', type: 'fill-blank', question: '一出門___下雨了。(Vừa ra khỏi cửa liền mưa)', correctAnswer: '就' },
          { id: 'e2-10-9', type: 'matching', question: 'Nối từ', options: ['濕|ẩm ướt', '乾|khô', '涼快|mát mẻ', '悶|oi bức'], correctAnswer: ['濕|ẩm ướt', '乾|khô', '涼快|mát mẻ', '悶|oi bức'] },
          { id: 'e2-10-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '溫度', options: ['預報', '溫度', '颱風', '涼快'], correctAnswer: '溫度' },
        ],
      },
      {
        id: 'b2-l10-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-10-1', type: 'multiple-choice', question: 'Phiên âm của "颱風" là gì?', options: ['táifēng', 'tàifēng', 'táifèng', 'dáifēng'], correctAnswer: 'táifēng' },
          { id: 'r2-10-2', type: 'fill-blank', question: '好像要___了。(Hình như sắp mưa rồi)', correctAnswer: '下雨' },
          { id: 'r2-10-3', type: 'matching', question: 'Ôn tập', options: ['乘涼|hóng mát', '雨傘|ô/dù', '突然|bỗng nhiên', '曬|phơi nắng'], correctAnswer: ['乘涼|hóng mát', '雨傘|ô/dù', '突然|bỗng nhiên', '曬|phơi nắng'] },
        ],
      },
    ],
  },
  // ===== BÀI 11: 我被乾麵嗆到了 =====
  {
    id: 'b2-l11', number: 11, title: 'Tôi bị mì khô sặc rồi', titleChinese: '我被乾麵嗆到了',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l11-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-11-1', traditional: '嗆', pinyin: 'qiàng', zhuyin: 'ㄑㄧㄤˋ', meaning: 'sặc', partOfSpeech: 'động từ', exampleSentence: '我被嗆到了。', exampleMeaning: 'Tôi bị sặc rồi.' },
          { id: 'w2-11-2', traditional: '乾麵', pinyin: 'gānmiàn', zhuyin: 'ㄍㄢ ㄇㄧㄢˋ', meaning: 'mì khô (trộn)', partOfSpeech: 'danh từ', exampleSentence: '我要一碗乾麵。', exampleMeaning: 'Tôi muốn một tô mì khô.' },
          { id: 'w2-11-3', traditional: '被', pinyin: 'bèi', zhuyin: 'ㄅㄟˋ', meaning: 'bị (bị động)', partOfSpeech: 'giới từ', exampleSentence: '我被他罵了。', exampleMeaning: 'Tôi bị anh ấy mắng.' },
          { id: 'w2-11-4', traditional: '燙', pinyin: 'tàng', zhuyin: 'ㄊㄤˋ', meaning: 'nóng, bỏng', partOfSpeech: 'tính từ', exampleSentence: '湯很燙，小心！', exampleMeaning: 'Canh rất nóng, cẩn thận!' },
          { id: 'w2-11-5', traditional: '辣', pinyin: 'là', zhuyin: 'ㄌㄚˋ', meaning: 'cay', partOfSpeech: 'tính từ', exampleSentence: '這個太辣了。', exampleMeaning: 'Cái này cay quá.' },
          { id: 'w2-11-6', traditional: '鹹', pinyin: 'xián', zhuyin: 'ㄒㄧㄢˊ', meaning: 'mặn', partOfSpeech: 'tính từ', exampleSentence: '菜太鹹了。', exampleMeaning: 'Món ăn mặn quá.' },
          { id: 'w2-11-7', traditional: '淡', pinyin: 'dàn', zhuyin: 'ㄉㄢˋ', meaning: 'nhạt', partOfSpeech: 'tính từ', exampleSentence: '湯太淡了。', exampleMeaning: 'Canh nhạt quá.' },
          { id: 'w2-11-8', traditional: '酸', pinyin: 'suān', zhuyin: 'ㄙㄨㄢ', meaning: 'chua', partOfSpeech: 'tính từ', exampleSentence: '這個水果很酸。', exampleMeaning: 'Trái cây này rất chua.' },
          { id: 'w2-11-9', traditional: '苦', pinyin: 'kǔ', zhuyin: 'ㄎㄨˇ', meaning: 'đắng', partOfSpeech: 'tính từ', exampleSentence: '咖啡有點苦。', exampleMeaning: 'Cà phê hơi đắng.' },
          { id: 'w2-11-10', traditional: '味道', pinyin: 'wèidào', zhuyin: 'ㄨㄟˋ ㄉㄠˋ', meaning: 'vị, mùi vị', partOfSpeech: 'danh từ', exampleSentence: '味道不錯。', exampleMeaning: 'Mùi vị khá ngon.' },
          { id: 'w2-11-11', traditional: '點菜', pinyin: 'diǎncài', zhuyin: 'ㄉㄧㄢˇ ㄘㄞˋ', meaning: 'gọi món', partOfSpeech: 'động từ', exampleSentence: '我們點菜吧。', exampleMeaning: 'Chúng ta gọi món đi.' },
          { id: 'w2-11-12', traditional: '飽', pinyin: 'bǎo', zhuyin: 'ㄅㄠˇ', meaning: 'no', partOfSpeech: 'tính từ', exampleSentence: '我吃飽了。', exampleMeaning: 'Tôi no rồi.' },
          { id: 'w2-11-13', traditional: '餓', pinyin: 'è', zhuyin: 'ㄜˋ', meaning: 'đói', partOfSpeech: 'tính từ', exampleSentence: '好餓啊！', exampleMeaning: 'Đói quá!' },
          { id: 'w2-11-14', traditional: '小吃', pinyin: 'xiǎochī', zhuyin: 'ㄒㄧㄠˇ ㄔ', meaning: 'món ăn vặt', partOfSpeech: 'danh từ', exampleSentence: '臺灣小吃很有名。', exampleMeaning: 'Đồ ăn vặt Đài Loan rất nổi tiếng.' },
          { id: 'w2-11-15', traditional: '香', pinyin: 'xiāng', zhuyin: 'ㄒㄧㄤ', meaning: 'thơm', partOfSpeech: 'tính từ', exampleSentence: '好香啊！', exampleMeaning: 'Thơm quá!' },
        ],
      },
      {
        id: 'b2-l11-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-11-1', pattern: '被 + (N) + V + 結果補語',
            explanation: 'Câu bị động: "被" = bị. Chủ ngữ chịu tác động của hành động.',
            examples: [
              { sentence: '我被乾麵嗆到了。', pinyin: 'Wǒ bèi gānmiàn qiàng dào le.', meaning: 'Tôi bị mì khô sặc rồi.' },
              { sentence: '他被老師罵了。', pinyin: 'Tā bèi lǎoshī mà le.', meaning: 'Anh ấy bị giáo viên mắng.' },
            ],
          },
          {
            id: 'g2-11-2', pattern: 'V + 起來 (ấn tượng/cảm giác)',
            explanation: '"V + 起來" = khi [V] thì cảm thấy... Diễn tả ấn tượng, cảm nhận.',
            examples: [
              { sentence: '看起來很好吃。', pinyin: 'Kàn qǐlái hěn hǎochī.', meaning: 'Trông có vẻ rất ngon.' },
              { sentence: '聽起來不錯。', pinyin: 'Tīng qǐlái búcuò.', meaning: 'Nghe có vẻ không tệ.' },
            ],
          },
          {
            id: 'g2-11-3', pattern: '有點 + Adj (hơi, một chút)',
            explanation: '"有點" = hơi, một chút. Thường mang nghĩa tiêu cực nhẹ.',
            examples: [
              { sentence: '有點辣。', pinyin: 'Yǒudiǎn là.', meaning: 'Hơi cay.' },
              { sentence: '味道有點淡。', pinyin: 'Wèidào yǒudiǎn dàn.', meaning: 'Vị hơi nhạt.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l11-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-11-1', type: 'multiple-choice', question: '"嗆" nghĩa là gì?', options: ['nuốt', 'sặc', 'nhai', 'nếm'], correctAnswer: 'sặc' },
          { id: 'e2-11-2', type: 'multiple-choice', question: '"被" trong câu bị động nghĩa là gì?', options: ['được', 'bị', 'cho', 'với'], correctAnswer: 'bị' },
          { id: 'e2-11-3', type: 'multiple-choice', question: 'Chọn từ đúng: 看___很好吃。(Trông có vẻ rất ngon)', options: ['出來', '起來', '下來', '上來'], correctAnswer: '起來' },
          { id: 'e2-11-4', type: 'multiple-choice', question: '"飽" nghĩa ngược với từ nào?', options: ['香', '餓', '辣', '淡'], correctAnswer: '餓' },
          { id: 'e2-11-5', type: 'matching', question: 'Nối vị giác', options: ['辣|cay', '鹹|mặn', '酸|chua', '苦|đắng'], correctAnswer: ['辣|cay', '鹹|mặn', '酸|chua', '苦|đắng'] },
          { id: 'e2-11-6', type: 'sentence-order', question: 'Sắp xếp: "Tôi bị mì khô sặc rồi"', options: ['我', '被', '乾麵', '嗆到', '了'], correctAnswer: ['我', '被', '乾麵', '嗆到', '了'] },
          { id: 'e2-11-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '看起來很好吃', options: ['Ăn rất ngon', 'Trông có vẻ ngon', 'Không ngon lắm', 'Muốn ăn'], correctAnswer: 'Trông có vẻ ngon' },
          { id: 'e2-11-8', type: 'fill-blank', question: '味道___點淡。(Vị hơi nhạt)', correctAnswer: '有' },
          { id: 'e2-11-9', type: 'matching', question: 'Nối từ ẩm thực', options: ['點菜|gọi món', '小吃|món ăn vặt', '味道|mùi vị', '香|thơm'], correctAnswer: ['點菜|gọi món', '小吃|món ăn vặt', '味道|mùi vị', '香|thơm'] },
          { id: 'e2-11-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '味道', options: ['小吃', '味道', '點菜', '乾麵'], correctAnswer: '味道' },
        ],
      },
      {
        id: 'b2-l11-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-11-1', type: 'multiple-choice', question: 'Phiên âm của "味道" là gì?', options: ['wèidào', 'wéidào', 'wèidāo', 'wěidào'], correctAnswer: 'wèidào' },
          { id: 'r2-11-2', type: 'fill-blank', question: '我___乾麵嗆到了。(Tôi bị mì khô sặc rồi)', correctAnswer: '被' },
          { id: 'r2-11-3', type: 'matching', question: 'Ôn tập', options: ['燙|nóng/bỏng', '淡|nhạt', '飽|no', '餓|đói'], correctAnswer: ['燙|nóng/bỏng', '淡|nhạt', '飽|no', '餓|đói'] },
        ],
      },
    ],
  },

  // ===== BÀI 12: 你要把這個寄到哪裡？ =====
  {
    id: 'b2-l12', number: 12, title: 'Bạn muốn gửi cái này đến đâu?', titleChinese: '你要把這個寄到哪裡？',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l12-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-12-1', traditional: '寄', pinyin: 'jì', zhuyin: 'ㄐㄧˋ', meaning: 'gửi (thư, bưu kiện)', partOfSpeech: 'động từ', exampleSentence: '我要寄一個包裹。', exampleMeaning: 'Tôi muốn gửi một bưu kiện.' },
          { id: 'w2-12-2', traditional: '把', pinyin: 'bǎ', zhuyin: 'ㄅㄚˇ', meaning: 'đem, lấy (câu "把")', partOfSpeech: 'giới từ', exampleSentence: '把這個寄出去。', exampleMeaning: 'Đem cái này gửi đi.' },
          { id: 'w2-12-3', traditional: '包裹', pinyin: 'bāoguǒ', zhuyin: 'ㄅㄠ ㄍㄨㄛˇ', meaning: 'bưu kiện', partOfSpeech: 'danh từ', exampleSentence: '包裹到了。', exampleMeaning: 'Bưu kiện đến rồi.' },
          { id: 'w2-12-4', traditional: '信', pinyin: 'xìn', zhuyin: 'ㄒㄧㄣˋ', meaning: 'thư', partOfSpeech: 'danh từ', exampleSentence: '寫一封信。', exampleMeaning: 'Viết một lá thư.' },
          { id: 'w2-12-5', traditional: '郵票', pinyin: 'yóupiào', zhuyin: 'ㄧㄡˊ ㄆㄧㄠˋ', meaning: 'tem', partOfSpeech: 'danh từ', exampleSentence: '買郵票。', exampleMeaning: 'Mua tem.' },
          { id: 'w2-12-6', traditional: '地址', pinyin: 'dìzhǐ', zhuyin: 'ㄉㄧˋ ㄓˇ', meaning: 'địa chỉ', partOfSpeech: 'danh từ', exampleSentence: '請寫地址。', exampleMeaning: 'Xin viết địa chỉ.' },
          { id: 'w2-12-7', traditional: '收件人', pinyin: 'shōujiànrén', zhuyin: 'ㄕㄡ ㄐㄧㄢˋ ㄖㄣˊ', meaning: 'người nhận', partOfSpeech: 'danh từ', exampleSentence: '收件人是誰？', exampleMeaning: 'Người nhận là ai?' },
          { id: 'w2-12-8', traditional: '寄件人', pinyin: 'jìjiànrén', zhuyin: 'ㄐㄧˋ ㄐㄧㄢˋ ㄖㄣˊ', meaning: 'người gửi', partOfSpeech: 'danh từ', exampleSentence: '寄件人寫這裡。', exampleMeaning: 'Người gửi viết ở đây.' },
          { id: 'w2-12-9', traditional: '國際', pinyin: 'guójì', zhuyin: 'ㄍㄨㄛˊ ㄐㄧˋ', meaning: 'quốc tế', partOfSpeech: 'tính từ', exampleSentence: '寄國際包裹。', exampleMeaning: 'Gửi bưu kiện quốc tế.' },
          { id: 'w2-12-10', traditional: '重量', pinyin: 'zhòngliàng', zhuyin: 'ㄓㄨㄥˋ ㄌㄧㄤˋ', meaning: 'trọng lượng', partOfSpeech: 'danh từ', exampleSentence: '重量多少？', exampleMeaning: 'Nặng bao nhiêu?' },
          { id: 'w2-12-11', traditional: '公斤', pinyin: 'gōngjīn', zhuyin: 'ㄍㄨㄥ ㄐㄧㄣ', meaning: 'kilogram', partOfSpeech: 'lượng từ', exampleSentence: '兩公斤。', exampleMeaning: 'Hai kilogram.' },
          { id: 'w2-12-12', traditional: '航空', pinyin: 'hángkōng', zhuyin: 'ㄏㄤˊ ㄎㄨㄥ', meaning: 'hàng không', partOfSpeech: 'danh từ', exampleSentence: '寄航空。', exampleMeaning: 'Gửi đường hàng không.' },
          { id: 'w2-12-13', traditional: '填', pinyin: 'tián', zhuyin: 'ㄊㄧㄢˊ', meaning: 'điền (vào)', partOfSpeech: 'động từ', exampleSentence: '請填這張表。', exampleMeaning: 'Xin điền vào bảng này.' },
          { id: 'w2-12-14', traditional: '表格', pinyin: 'biǎogé', zhuyin: 'ㄅㄧㄠˇ ㄍㄜˊ', meaning: 'biểu mẫu', partOfSpeech: 'danh từ', exampleSentence: '填寫表格。', exampleMeaning: 'Điền biểu mẫu.' },
          { id: 'w2-12-15', traditional: '掛號', pinyin: 'guàhào', zhuyin: 'ㄍㄨㄚˋ ㄏㄠˋ', meaning: 'gửi bảo đảm', partOfSpeech: 'động từ', exampleSentence: '我要寄掛號。', exampleMeaning: 'Tôi muốn gửi bảo đảm.' },
        ],
      },
      {
        id: 'b2-l12-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-12-1', pattern: '把 + N + V + 結果/方向',
            explanation: 'Câu "把": đem/lấy đối tượng ra xử lý. Nhấn mạnh tác động lên vật.',
            examples: [
              { sentence: '你要把這個寄到哪裡？', pinyin: 'Nǐ yào bǎ zhège jì dào nǎlǐ?', meaning: 'Bạn muốn gửi cái này đến đâu?' },
              { sentence: '把門關上。', pinyin: 'Bǎ mén guān shàng.', meaning: 'Đóng cửa lại.' },
            ],
          },
          {
            id: 'g2-12-2', pattern: '先...再...',
            explanation: '"先...再..." = trước tiên...sau đó... Diễn tả thứ tự hành động.',
            examples: [
              { sentence: '先填表格，再寄出去。', pinyin: 'Xiān tián biǎogé, zài jì chūqù.', meaning: 'Trước điền biểu mẫu, sau đó gửi đi.' },
              { sentence: '先量重量，再算錢。', pinyin: 'Xiān liáng zhòngliàng, zài suàn qián.', meaning: 'Trước cân trọng lượng, sau đó tính tiền.' },
            ],
          },
          {
            id: 'g2-12-3', pattern: '要...才能...',
            explanation: '"要...才能..." = phải...mới có thể... Diễn tả điều kiện cần thiết.',
            examples: [
              { sentence: '要填表格才能寄。', pinyin: 'Yào tián biǎogé cái néng jì.', meaning: 'Phải điền biểu mẫu mới gửi được.' },
              { sentence: '要貼郵票才能寄信。', pinyin: 'Yào tiē yóupiào cái néng jì xìn.', meaning: 'Phải dán tem mới gửi thư được.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l12-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-12-1', type: 'multiple-choice', question: '"包裹" nghĩa là gì?', options: ['thư', 'bưu kiện', 'tem', 'biểu mẫu'], correctAnswer: 'bưu kiện' },
          { id: 'e2-12-2', type: 'multiple-choice', question: '"把" trong câu "把" dùng để làm gì?', options: ['hỏi', 'nhấn mạnh tác động', 'phủ định', 'so sánh'], correctAnswer: 'nhấn mạnh tác động' },
          { id: 'e2-12-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___填表格，再寄出去。(Trước điền biểu mẫu, sau gửi đi)', options: ['先', '就', '才', '又'], correctAnswer: '先' },
          { id: 'e2-12-4', type: 'multiple-choice', question: '"掛號" nghĩa là gì?', options: ['gửi thường', 'gửi bảo đảm', 'gửi nhanh', 'gửi miễn phí'], correctAnswer: 'gửi bảo đảm' },
          { id: 'e2-12-5', type: 'matching', question: 'Nối từ bưu điện', options: ['郵票|tem', '包裹|bưu kiện', '地址|địa chỉ', '信|thư'], correctAnswer: ['郵票|tem', '包裹|bưu kiện', '地址|địa chỉ', '信|thư'] },
          { id: 'e2-12-6', type: 'sentence-order', question: 'Sắp xếp: "Bạn muốn gửi cái này đến đâu?"', options: ['你', '要', '把', '這個', '寄到', '哪裡', '？'], correctAnswer: ['你', '要', '把', '這個', '寄到', '哪裡', '？'] },
          { id: 'e2-12-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '先填表格再寄出去', options: ['Điền biểu mẫu xong gửi đi', 'Gửi đi rồi điền', 'Không cần điền', 'Điền rồi không gửi'], correctAnswer: 'Điền biểu mẫu xong gửi đi' },
          { id: 'e2-12-8', type: 'fill-blank', question: '___門關上。(Đóng cửa lại)', correctAnswer: '把' },
          { id: 'e2-12-9', type: 'matching', question: 'Nối từ', options: ['收件人|người nhận', '寄件人|người gửi', '航空|hàng không', '重量|trọng lượng'], correctAnswer: ['收件人|người nhận', '寄件人|người gửi', '航空|hàng không', '重量|trọng lượng'] },
          { id: 'e2-12-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '包裹', options: ['郵票', '包裹', '信', '表格'], correctAnswer: '包裹' },
        ],
      },
      {
        id: 'b2-l12-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-12-1', type: 'multiple-choice', question: 'Phiên âm của "包裹" là gì?', options: ['bāoguǒ', 'bāoguō', 'báoguǒ', 'bàoguǒ'], correctAnswer: 'bāoguǒ' },
          { id: 'r2-12-2', type: 'fill-blank', question: '要填表格___能寄。(Phải điền biểu mẫu mới gửi được)', correctAnswer: '才' },
          { id: 'r2-12-3', type: 'matching', question: 'Ôn tập', options: ['寄|gửi', '填|điền', '把|đem/lấy', '掛號|bảo đảm'], correctAnswer: ['寄|gửi', '填|điền', '把|đem/lấy', '掛號|bảo đảm'] },
        ],
      },
    ],
  },

  // ===== BÀI 13: 我想開一個帳戶 =====
  {
    id: 'b2-l13', number: 13, title: 'Tôi muốn mở một tài khoản', titleChinese: '我想開一個帳戶',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l13-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-13-1', traditional: '帳戶', pinyin: 'zhànghù', zhuyin: 'ㄓㄤˋ ㄏㄨˋ', meaning: 'tài khoản', partOfSpeech: 'danh từ', exampleSentence: '開一個帳戶。', exampleMeaning: 'Mở một tài khoản.' },
          { id: 'w2-13-2', traditional: '銀行', pinyin: 'yínháng', zhuyin: 'ㄧㄣˊ ㄏㄤˊ', meaning: 'ngân hàng', partOfSpeech: 'danh từ', exampleSentence: '去銀行開戶。', exampleMeaning: 'Đi ngân hàng mở tài khoản.' },
          { id: 'w2-13-3', traditional: '存', pinyin: 'cún', zhuyin: 'ㄘㄨㄣˊ', meaning: 'gửi (tiền)', partOfSpeech: 'động từ', exampleSentence: '我要存錢。', exampleMeaning: 'Tôi muốn gửi tiền.' },
          { id: 'w2-13-4', traditional: '領', pinyin: 'lǐng', zhuyin: 'ㄌㄧㄥˇ', meaning: 'rút (tiền)', partOfSpeech: 'động từ', exampleSentence: '領三千塊。', exampleMeaning: 'Rút ba nghìn đồng.' },
          { id: 'w2-13-5', traditional: '提款機', pinyin: 'tíkuǎnjī', zhuyin: 'ㄊㄧˊ ㄎㄨㄢˇ ㄐㄧ', meaning: 'máy ATM', partOfSpeech: 'danh từ', exampleSentence: '去提款機領錢。', exampleMeaning: 'Đến ATM rút tiền.' },
          { id: 'w2-13-6', traditional: '密碼', pinyin: 'mìmǎ', zhuyin: 'ㄇㄧˋ ㄇㄚˇ', meaning: 'mật khẩu, mã PIN', partOfSpeech: 'danh từ', exampleSentence: '輸入密碼。', exampleMeaning: 'Nhập mật khẩu.' },
          { id: 'w2-13-7', traditional: '匯', pinyin: 'huì', zhuyin: 'ㄏㄨㄟˋ', meaning: 'chuyển (tiền)', partOfSpeech: 'động từ', exampleSentence: '匯錢到越南。', exampleMeaning: 'Chuyển tiền về Việt Nam.' },
          { id: 'w2-13-8', traditional: '利率', pinyin: 'lìlǜ', zhuyin: 'ㄌㄧˋ ㄌㄩˋ', meaning: 'lãi suất', partOfSpeech: 'danh từ', exampleSentence: '利率多少？', exampleMeaning: 'Lãi suất bao nhiêu?' },
          { id: 'w2-13-9', traditional: '護照', pinyin: 'hùzhào', zhuyin: 'ㄏㄨˋ ㄓㄠˋ', meaning: 'hộ chiếu', partOfSpeech: 'danh từ', exampleSentence: '帶護照來。', exampleMeaning: 'Mang hộ chiếu đến.' },
          { id: 'w2-13-10', traditional: '居留證', pinyin: 'jūliúzhèng', zhuyin: 'ㄐㄩ ㄌㄧㄡˊ ㄓㄥˋ', meaning: 'thẻ cư trú', partOfSpeech: 'danh từ', exampleSentence: '有居留證嗎？', exampleMeaning: 'Có thẻ cư trú không?' },
          { id: 'w2-13-11', traditional: '手續費', pinyin: 'shǒuxùfèi', zhuyin: 'ㄕㄡˇ ㄒㄩˋ ㄈㄟˋ', meaning: 'phí thủ tục', partOfSpeech: 'danh từ', exampleSentence: '手續費多少？', exampleMeaning: 'Phí thủ tục bao nhiêu?' },
          { id: 'w2-13-12', traditional: '存摺', pinyin: 'cúnzhé', zhuyin: 'ㄘㄨㄣˊ ㄓㄜˊ', meaning: 'sổ tiết kiệm', partOfSpeech: 'danh từ', exampleSentence: '拿存摺來。', exampleMeaning: 'Mang sổ tiết kiệm đến.' },
          { id: 'w2-13-13', traditional: '印章', pinyin: 'yìnzhāng', zhuyin: 'ㄧㄣˋ ㄓㄤ', meaning: 'con dấu', partOfSpeech: 'danh từ', exampleSentence: '帶印章。', exampleMeaning: 'Mang con dấu.' },
          { id: 'w2-13-14', traditional: '轉帳', pinyin: 'zhuǎnzhàng', zhuyin: 'ㄓㄨㄢˇ ㄓㄤˋ', meaning: 'chuyển khoản', partOfSpeech: 'động từ', exampleSentence: '用手機轉帳。', exampleMeaning: 'Dùng điện thoại chuyển khoản.' },
          { id: 'w2-13-15', traditional: '外幣', pinyin: 'wàibì', zhuyin: 'ㄨㄞˋ ㄅㄧˋ', meaning: 'ngoại tệ', partOfSpeech: 'danh từ', exampleSentence: '換外幣。', exampleMeaning: 'Đổi ngoại tệ.' },
        ],
      },
      {
        id: 'b2-l13-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-13-1', pattern: '想 + V (muốn làm gì)',
            explanation: '"想" = muốn. Dùng diễn tả ý muốn, mong muốn.',
            examples: [
              { sentence: '我想開一個帳戶。', pinyin: 'Wǒ xiǎng kāi yí ge zhànghù.', meaning: 'Tôi muốn mở một tài khoản.' },
              { sentence: '我想存錢。', pinyin: 'Wǒ xiǎng cún qián.', meaning: 'Tôi muốn gửi tiền.' },
            ],
          },
          {
            id: 'g2-13-2', pattern: '需要 + N/V',
            explanation: '"需要" = cần. Diễn tả sự cần thiết.',
            examples: [
              { sentence: '需要帶護照。', pinyin: 'Xūyào dài hùzhào.', meaning: 'Cần mang hộ chiếu.' },
              { sentence: '開戶需要什麼？', pinyin: 'Kāihù xūyào shénme?', meaning: 'Mở tài khoản cần gì?' },
            ],
          },
          {
            id: 'g2-13-3', pattern: '只要...就...',
            explanation: '"只要...就..." = chỉ cần...là... Diễn tả điều kiện đủ.',
            examples: [
              { sentence: '只要有護照就可以開戶。', pinyin: 'Zhǐyào yǒu hùzhào jiù kěyǐ kāihù.', meaning: 'Chỉ cần có hộ chiếu là có thể mở tài khoản.' },
              { sentence: '只要輸入密碼就可以領錢。', pinyin: 'Zhǐyào shūrù mìmǎ jiù kěyǐ lǐng qián.', meaning: 'Chỉ cần nhập mật khẩu là rút được tiền.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l13-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-13-1', type: 'multiple-choice', question: '"帳戶" nghĩa là gì?', options: ['ngân hàng', 'tài khoản', 'tiền mặt', 'thẻ'], correctAnswer: 'tài khoản' },
          { id: 'e2-13-2', type: 'multiple-choice', question: '"領" trong "領錢" nghĩa là gì?', options: ['gửi', 'rút', 'đổi', 'chuyển'], correctAnswer: 'rút' },
          { id: 'e2-13-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___要有護照就可以開戶。(Chỉ cần có hộ chiếu là mở được)', options: ['只', '就', '才', '都'], correctAnswer: '只' },
          { id: 'e2-13-4', type: 'multiple-choice', question: '"提款機" là gì?', options: ['máy tính', 'máy ATM', 'điện thoại', 'máy in'], correctAnswer: 'máy ATM' },
          { id: 'e2-13-5', type: 'matching', question: 'Nối từ ngân hàng', options: ['存|gửi tiền', '領|rút tiền', '匯|chuyển tiền', '轉帳|chuyển khoản'], correctAnswer: ['存|gửi tiền', '領|rút tiền', '匯|chuyển tiền', '轉帳|chuyển khoản'] },
          { id: 'e2-13-6', type: 'sentence-order', question: 'Sắp xếp: "Tôi muốn mở một tài khoản"', options: ['我', '想', '開', '一個', '帳戶'], correctAnswer: ['我', '想', '開', '一個', '帳戶'] },
          { id: 'e2-13-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '需要帶護照', options: ['Không cần hộ chiếu', 'Cần mang hộ chiếu', 'Quên hộ chiếu', 'Mua hộ chiếu'], correctAnswer: 'Cần mang hộ chiếu' },
          { id: 'e2-13-8', type: 'fill-blank', question: '只要有護照___可以開戶。(Chỉ cần có hộ chiếu là mở được)', correctAnswer: '就' },
          { id: 'e2-13-9', type: 'matching', question: 'Nối từ', options: ['護照|hộ chiếu', '居留證|thẻ cư trú', '印章|con dấu', '密碼|mật khẩu'], correctAnswer: ['護照|hộ chiếu', '居留證|thẻ cư trú', '印章|con dấu', '密碼|mật khẩu'] },
          { id: 'e2-13-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '銀行', options: ['郵局', '銀行', '學校', '醫院'], correctAnswer: '銀行' },
        ],
      },
      {
        id: 'b2-l13-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-13-1', type: 'multiple-choice', question: 'Phiên âm của "帳戶" là gì?', options: ['zhànghù', 'zhānghù', 'zhànghǔ', 'zànghù'], correctAnswer: 'zhànghù' },
          { id: 'r2-13-2', type: 'fill-blank', question: '我想___一個帳戶。(Tôi muốn mở một tài khoản)', correctAnswer: '開' },
          { id: 'r2-13-3', type: 'matching', question: 'Ôn tập', options: ['存摺|sổ tiết kiệm', '手續費|phí thủ tục', '外幣|ngoại tệ', '利率|lãi suất'], correctAnswer: ['存摺|sổ tiết kiệm', '手續費|phí thủ tục', '外幣|ngoại tệ', '利率|lãi suất'] },
        ],
      },
    ],
  },

  // ===== BÀI 14: 你應該會贏的 =====
  {
    id: 'b2-l14', number: 14, title: 'Bạn chắc sẽ thắng thôi', titleChinese: '你應該會贏的',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l14-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-14-1', traditional: '應該', pinyin: 'yīnggāi', zhuyin: 'ㄧㄥ ㄍㄞ', meaning: 'chắc là, nên', partOfSpeech: 'phó từ', exampleSentence: '你應該會贏的。', exampleMeaning: 'Bạn chắc sẽ thắng thôi.' },
          { id: 'w2-14-2', traditional: '努力', pinyin: 'nǔlì', zhuyin: 'ㄋㄨˇ ㄌㄧˋ', meaning: 'nỗ lực, chăm chỉ', partOfSpeech: 'phó từ', exampleSentence: '他很努力。', exampleMeaning: 'Anh ấy rất nỗ lực.' },
          { id: 'w2-14-3', traditional: '緊張', pinyin: 'jǐnzhāng', zhuyin: 'ㄐㄧㄣˇ ㄓㄤ', meaning: 'hồi hộp, căng thẳng', partOfSpeech: 'tính từ', exampleSentence: '不要緊張。', exampleMeaning: 'Đừng hồi hộp.' },
          { id: 'w2-14-4', traditional: '信心', pinyin: 'xìnxīn', zhuyin: 'ㄒㄧㄣˋ ㄒㄧㄣ', meaning: 'tự tin, sự tự tin', partOfSpeech: 'danh từ', exampleSentence: '要有信心。', exampleMeaning: 'Phải có tự tin.' },
          { id: 'w2-14-5', traditional: '放棄', pinyin: 'fàngqì', zhuyin: 'ㄈㄤˋ ㄑㄧˋ', meaning: 'bỏ cuộc, từ bỏ', partOfSpeech: 'động từ', exampleSentence: '不要放棄。', exampleMeaning: 'Đừng bỏ cuộc.' },
          { id: 'w2-14-6', traditional: '機會', pinyin: 'jīhuì', zhuyin: 'ㄐㄧ ㄏㄨㄟˋ', meaning: 'cơ hội', partOfSpeech: 'danh từ', exampleSentence: '這是好機會。', exampleMeaning: 'Đây là cơ hội tốt.' },
          { id: 'w2-14-7', traditional: '成功', pinyin: 'chénggōng', zhuyin: 'ㄔㄥˊ ㄍㄨㄥ', meaning: 'thành công', partOfSpeech: 'động từ', exampleSentence: '他成功了！', exampleMeaning: 'Anh ấy thành công rồi!' },
          { id: 'w2-14-8', traditional: '失敗', pinyin: 'shībài', zhuyin: 'ㄕ ㄅㄞˋ', meaning: 'thất bại', partOfSpeech: 'động từ', exampleSentence: '失敗了也沒關係。', exampleMeaning: 'Thất bại cũng không sao.' },
          { id: 'w2-14-9', traditional: '堅持', pinyin: 'jiānchí', zhuyin: 'ㄐㄧㄢ ㄔˊ', meaning: 'kiên trì', partOfSpeech: 'động từ', exampleSentence: '要堅持下去。', exampleMeaning: 'Phải kiên trì tiếp.' },
          { id: 'w2-14-10', traditional: '表現', pinyin: 'biǎoxiàn', zhuyin: 'ㄅㄧㄠˇ ㄒㄧㄢˋ', meaning: 'biểu hiện, thể hiện', partOfSpeech: 'danh từ', exampleSentence: '你的表現很好。', exampleMeaning: 'Biểu hiện của bạn rất tốt.' },
          { id: 'w2-14-11', traditional: '結果', pinyin: 'jiéguǒ', zhuyin: 'ㄐㄧㄝˊ ㄍㄨㄛˇ', meaning: 'kết quả', partOfSpeech: 'danh từ', exampleSentence: '結果出來了。', exampleMeaning: 'Kết quả ra rồi.' },
          { id: 'w2-14-12', traditional: '擔心', pinyin: 'dānxīn', zhuyin: 'ㄉㄢ ㄒㄧㄣ', meaning: 'lo lắng', partOfSpeech: 'động từ', exampleSentence: '不要擔心。', exampleMeaning: 'Đừng lo lắng.' },
          { id: 'w2-14-13', traditional: '支持', pinyin: 'zhīchí', zhuyin: 'ㄓ ㄔˊ', meaning: 'ủng hộ', partOfSpeech: 'động từ', exampleSentence: '我支持你。', exampleMeaning: 'Tôi ủng hộ bạn.' },
          { id: 'w2-14-14', traditional: '夢想', pinyin: 'mèngxiǎng', zhuyin: 'ㄇㄥˋ ㄒㄧㄤˇ', meaning: 'ước mơ', partOfSpeech: 'danh từ', exampleSentence: '你的夢想是什麼？', exampleMeaning: 'Ước mơ của bạn là gì?' },
          { id: 'w2-14-15', traditional: '勇敢', pinyin: 'yǒnggǎn', zhuyin: 'ㄩㄥˇ ㄍㄢˇ', meaning: 'dũng cảm', partOfSpeech: 'tính từ', exampleSentence: '你很勇敢。', exampleMeaning: 'Bạn rất dũng cảm.' },
        ],
      },
      {
        id: 'b2-l14-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-14-1', pattern: '應該 + 會 + V + 的',
            explanation: '"應該會...的" = chắc là sẽ... Diễn tả sự phỏng đoán tự tin.',
            examples: [
              { sentence: '你應該會贏的。', pinyin: 'Nǐ yīnggāi huì yíng de.', meaning: 'Bạn chắc sẽ thắng thôi.' },
              { sentence: '他應該會來的。', pinyin: 'Tā yīnggāi huì lái de.', meaning: 'Anh ấy chắc sẽ đến thôi.' },
            ],
          },
          {
            id: 'g2-14-2', pattern: '只要...就...(nhắc lại, mở rộng)',
            explanation: '"只要...就..." = chỉ cần...là... Mở rộng trong ngữ cảnh động viên.',
            examples: [
              { sentence: '只要努力，就會成功。', pinyin: 'Zhǐyào nǔlì, jiù huì chénggōng.', meaning: 'Chỉ cần nỗ lực là sẽ thành công.' },
              { sentence: '只要不放棄，就有機會。', pinyin: 'Zhǐyào bú fàngqì, jiù yǒu jīhuì.', meaning: 'Chỉ cần không bỏ cuộc là có cơ hội.' },
            ],
          },
          {
            id: 'g2-14-3', pattern: '就算...也...',
            explanation: '"就算...也..." = cho dù...cũng... Diễn tả sự nhượng bộ, quyết tâm.',
            examples: [
              { sentence: '就算失敗也沒關係。', pinyin: 'Jiùsuàn shībài yě méi guānxì.', meaning: 'Cho dù thất bại cũng không sao.' },
              { sentence: '就算很難也要堅持。', pinyin: 'Jiùsuàn hěn nán yě yào jiānchí.', meaning: 'Cho dù rất khó cũng phải kiên trì.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l14-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-14-1', type: 'multiple-choice', question: '"放棄" nghĩa là gì?', options: ['cố gắng', 'bỏ cuộc', 'thắng', 'thua'], correctAnswer: 'bỏ cuộc' },
          { id: 'e2-14-2', type: 'multiple-choice', question: '"成功" nghĩa ngược với từ nào?', options: ['努力', '失敗', '堅持', '勇敢'], correctAnswer: '失敗' },
          { id: 'e2-14-3', type: 'multiple-choice', question: 'Chọn từ đúng: 你___會贏的。(Bạn chắc sẽ thắng thôi)', options: ['一定', '應該', '可能', '大概'], correctAnswer: '應該' },
          { id: 'e2-14-4', type: 'multiple-choice', question: '"緊張" nghĩa là gì?', options: ['vui vẻ', 'buồn', 'hồi hộp', 'tức giận'], correctAnswer: 'hồi hộp' },
          { id: 'e2-14-5', type: 'matching', question: 'Nối từ động viên', options: ['信心|tự tin', '堅持|kiên trì', '勇敢|dũng cảm', '支持|ủng hộ'], correctAnswer: ['信心|tự tin', '堅持|kiên trì', '勇敢|dũng cảm', '支持|ủng hộ'] },
          { id: 'e2-14-6', type: 'sentence-order', question: 'Sắp xếp: "Chỉ cần nỗ lực là sẽ thành công"', options: ['只要', '努力', '，', '就', '會', '成功'], correctAnswer: ['只要', '努力', '，', '就', '會', '成功'] },
          { id: 'e2-14-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '就算失敗也沒關係', options: ['Thất bại là hết', 'Cho dù thất bại cũng không sao', 'Không được thất bại', 'Sợ thất bại'], correctAnswer: 'Cho dù thất bại cũng không sao' },
          { id: 'e2-14-8', type: 'fill-blank', question: '就算很難___要堅持。(Cho dù khó cũng phải kiên trì)', correctAnswer: '也' },
          { id: 'e2-14-9', type: 'matching', question: 'Nối từ', options: ['成功|thành công', '失敗|thất bại', '結果|kết quả', '機會|cơ hội'], correctAnswer: ['成功|thành công', '失敗|thất bại', '結果|kết quả', '機會|cơ hội'] },
          { id: 'e2-14-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '夢想', options: ['努力', '夢想', '信心', '表現'], correctAnswer: '夢想' },
        ],
      },
      {
        id: 'b2-l14-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-14-1', type: 'multiple-choice', question: 'Phiên âm của "堅持" là gì?', options: ['jiānchí', 'jiānchì', 'jiǎnchí', 'jiànchí'], correctAnswer: 'jiānchí' },
          { id: 'r2-14-2', type: 'fill-blank', question: '不要___心。(Đừng lo lắng)', correctAnswer: '擔' },
          { id: 'r2-14-3', type: 'matching', question: 'Ôn tập', options: ['努力|nỗ lực', '放棄|bỏ cuộc', '擔心|lo lắng', '夢想|ước mơ'], correctAnswer: ['努力|nỗ lực', '放棄|bỏ cuộc', '擔心|lo lắng', '夢想|ước mơ'] },
        ],
      },
    ],
  },

  // ===== BÀI 15: 過年 =====
  {
    id: 'b2-l15', number: 15, title: 'Tết Nguyên Đán', titleChinese: '過年',
    unlocked: false, completed: false, xpReward: 30,
    sections: [
      {
        id: 'b2-l15-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w2-15-1', traditional: '過年', pinyin: 'guònián', zhuyin: 'ㄍㄨㄛˋ ㄋㄧㄢˊ', meaning: 'ăn Tết, đón năm mới', partOfSpeech: 'động từ', exampleSentence: '過年快樂！', exampleMeaning: 'Tết vui vẻ!' },
          { id: 'w2-15-2', traditional: '春節', pinyin: 'chūnjié', zhuyin: 'ㄔㄨㄣ ㄐㄧㄝˊ', meaning: 'Tết Nguyên Đán', partOfSpeech: 'danh từ', exampleSentence: '春節是最重要的節日。', exampleMeaning: 'Tết Nguyên Đán là ngày lễ quan trọng nhất.' },
          { id: 'w2-15-3', traditional: '紅包', pinyin: 'hóngbāo', zhuyin: 'ㄏㄨㄥˊ ㄅㄠ', meaning: 'lì xì, bao lì xì', partOfSpeech: 'danh từ', exampleSentence: '給小孩紅包。', exampleMeaning: 'Lì xì cho trẻ em.' },
          { id: 'w2-15-4', traditional: '團圓', pinyin: 'tuányuán', zhuyin: 'ㄊㄨㄢˊ ㄩㄢˊ', meaning: 'đoàn viên, sum họp', partOfSpeech: 'động từ', exampleSentence: '全家團圓。', exampleMeaning: 'Cả nhà sum họp.' },
          { id: 'w2-15-5', traditional: '年夜飯', pinyin: 'niányèfàn', zhuyin: 'ㄋㄧㄢˊ ㄧㄝˋ ㄈㄢˋ', meaning: 'bữa cơm tất niên', partOfSpeech: 'danh từ', exampleSentence: '吃年夜飯。', exampleMeaning: 'Ăn cơm tất niên.' },
          { id: 'w2-15-6', traditional: '放鞭炮', pinyin: 'fàng biānpào', zhuyin: 'ㄈㄤˋ ㄅㄧㄢ ㄆㄠˋ', meaning: 'đốt pháo', partOfSpeech: 'cụm từ', exampleSentence: '過年放鞭炮。', exampleMeaning: 'Tết đốt pháo.' },
          { id: 'w2-15-7', traditional: '拜年', pinyin: 'bàinián', zhuyin: 'ㄅㄞˋ ㄋㄧㄢˊ', meaning: 'chúc Tết', partOfSpeech: 'động từ', exampleSentence: '去拜年。', exampleMeaning: 'Đi chúc Tết.' },
          { id: 'w2-15-8', traditional: '春聯', pinyin: 'chūnlián', zhuyin: 'ㄔㄨㄣ ㄌㄧㄢˊ', meaning: 'câu đối Tết', partOfSpeech: 'danh từ', exampleSentence: '貼春聯。', exampleMeaning: 'Dán câu đối Tết.' },
          { id: 'w2-15-9', traditional: '除夕', pinyin: 'chúxī', zhuyin: 'ㄔㄨˊ ㄒㄧ', meaning: 'đêm giao thừa', partOfSpeech: 'danh từ', exampleSentence: '除夕夜不睡覺。', exampleMeaning: 'Đêm giao thừa không ngủ.' },
          { id: 'w2-15-10', traditional: '恭喜', pinyin: 'gōngxǐ', zhuyin: 'ㄍㄨㄥ ㄒㄧˇ', meaning: 'chúc mừng', partOfSpeech: 'động từ', exampleSentence: '恭喜發財！', exampleMeaning: 'Cung hỷ phát tài!' },
          { id: 'w2-15-11', traditional: '傳統', pinyin: 'chuántǒng', zhuyin: 'ㄔㄨㄢˊ ㄊㄨㄥˇ', meaning: 'truyền thống', partOfSpeech: 'danh từ', exampleSentence: '這是傳統習俗。', exampleMeaning: 'Đây là phong tục truyền thống.' },
          { id: 'w2-15-12', traditional: '習俗', pinyin: 'xísú', zhuyin: 'ㄒㄧˊ ㄙㄨˊ', meaning: 'phong tục, tập quán', partOfSpeech: 'danh từ', exampleSentence: '每個地方習俗不同。', exampleMeaning: 'Phong tục mỗi nơi khác nhau.' },
          { id: 'w2-15-13', traditional: '守歲', pinyin: 'shǒusuì', zhuyin: 'ㄕㄡˇ ㄙㄨㄟˋ', meaning: 'thức đón giao thừa', partOfSpeech: 'động từ', exampleSentence: '除夕守歲。', exampleMeaning: 'Giao thừa thức đón năm mới.' },
          { id: 'w2-15-14', traditional: '熱鬧', pinyin: 'rènào', zhuyin: 'ㄖㄜˋ ㄋㄠˋ', meaning: 'náo nhiệt, sôi nổi', partOfSpeech: 'tính từ', exampleSentence: '過年很熱鬧。', exampleMeaning: 'Tết rất náo nhiệt.' },
          { id: 'w2-15-15', traditional: '祝福', pinyin: 'zhùfú', zhuyin: 'ㄓㄨˋ ㄈㄨˊ', meaning: 'chúc phúc, lời chúc', partOfSpeech: 'danh từ', exampleSentence: '送上祝福。', exampleMeaning: 'Gửi lời chúc.' },
        ],
      },
      {
        id: 'b2-l15-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g2-15-1', pattern: '每 + 到/逢 + Time + 就 + VP',
            explanation: '"每到/逢...就..." = mỗi khi đến...liền... Diễn tả thói quen theo thời gian.',
            examples: [
              { sentence: '每到過年就很熱鬧。', pinyin: 'Měi dào guònián jiù hěn rènào.', meaning: 'Mỗi khi đến Tết liền rất náo nhiệt.' },
              { sentence: '每到冬天就想吃火鍋。', pinyin: 'Měi dào dōngtiān jiù xiǎng chī huǒguō.', meaning: 'Mỗi khi đến mùa đông liền muốn ăn lẩu.' },
            ],
          },
          {
            id: 'g2-15-2', pattern: '除了...以外，還/也...',
            explanation: '"除了...以外，還/也..." = ngoài...ra, còn... Bổ sung thông tin.',
            examples: [
              { sentence: '除了紅包以外，還會吃年夜飯。', pinyin: 'Chúle hóngbāo yǐwài, hái huì chī niányèfàn.', meaning: 'Ngoài lì xì ra, còn ăn cơm tất niên.' },
              { sentence: '除了貼春聯以外，也放鞭炮。', pinyin: 'Chúle tiē chūnlián yǐwài, yě fàng biānpào.', meaning: 'Ngoài dán câu đối ra, cũng đốt pháo.' },
            ],
          },
          {
            id: 'g2-15-3', pattern: '為了 + N/VP + 而 + VP',
            explanation: '"為了" = vì, để. Diễn tả mục đích hành động.',
            examples: [
              { sentence: '為了團圓而回家。', pinyin: 'Wèile tuányuán ér huíjiā.', meaning: 'Vì đoàn viên mà về nhà.' },
              { sentence: '為了慶祝而辦聚會。', pinyin: 'Wèile qìngzhù ér bàn jùhuì.', meaning: 'Để ăn mừng mà tổ chức tiệc.' },
            ],
          },
        ],
      },
      {
        id: 'b2-l15-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e2-15-1', type: 'multiple-choice', question: '"紅包" nghĩa là gì?', options: ['quà Tết', 'lì xì', 'câu đối', 'pháo'], correctAnswer: 'lì xì' },
          { id: 'e2-15-2', type: 'multiple-choice', question: '"除夕" là gì?', options: ['mùng một Tết', 'đêm giao thừa', 'rằm tháng Giêng', 'ngày cuối năm'], correctAnswer: 'đêm giao thừa' },
          { id: 'e2-15-3', type: 'multiple-choice', question: 'Chọn từ đúng: 每___過年就很熱鬧。(Mỗi khi đến Tết liền rất náo nhiệt)', options: ['到', '在', '從', '往'], correctAnswer: '到' },
          { id: 'e2-15-4', type: 'multiple-choice', question: '"拜年" nghĩa là gì?', options: ['ăn Tết', 'chúc Tết', 'đốt pháo', 'dán câu đối'], correctAnswer: 'chúc Tết' },
          { id: 'e2-15-5', type: 'matching', question: 'Nối từ Tết', options: ['紅包|lì xì', '春聯|câu đối Tết', '年夜飯|cơm tất niên', '守歲|thức đón giao thừa'], correctAnswer: ['紅包|lì xì', '春聯|câu đối Tết', '年夜飯|cơm tất niên', '守歲|thức đón giao thừa'] },
          { id: 'e2-15-6', type: 'sentence-order', question: 'Sắp xếp: "Cung hỷ phát tài!"', options: ['恭喜', '發財', '！'], correctAnswer: ['恭喜', '發財', '！'] },
          { id: 'e2-15-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '全家團圓', options: ['Cả nhà đi chơi', 'Cả nhà sum họp', 'Cả nhà ăn Tết', 'Cả nhà vui vẻ'], correctAnswer: 'Cả nhà sum họp' },
          { id: 'e2-15-8', type: 'fill-blank', question: '除了紅包以外，___會吃年夜飯。(Ngoài lì xì ra, còn ăn cơm tất niên)', correctAnswer: '還' },
          { id: 'e2-15-9', type: 'matching', question: 'Nối từ văn hóa', options: ['傳統|truyền thống', '習俗|phong tục', '熱鬧|náo nhiệt', '祝福|lời chúc'], correctAnswer: ['傳統|truyền thống', '習俗|phong tục', '熱鬧|náo nhiệt', '祝福|lời chúc'] },
          { id: 'e2-15-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '春節', options: ['過年', '春節', '除夕', '拜年'], correctAnswer: '春節' },
        ],
      },
      {
        id: 'b2-l15-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r2-15-1', type: 'multiple-choice', question: 'Phiên âm của "團圓" là gì?', options: ['tuányuán', 'tuányuàn', 'tuānyuán', 'tuǎnyuán'], correctAnswer: 'tuányuán' },
          { id: 'r2-15-2', type: 'fill-blank', question: '___了團圓而回家。(Vì đoàn viên mà về nhà)', correctAnswer: '為' },
          { id: 'r2-15-3', type: 'matching', question: 'Ôn tập', options: ['恭喜|chúc mừng', '拜年|chúc Tết', '紅包|lì xì', '團圓|sum họp'], correctAnswer: ['恭喜|chúc mừng', '拜年|chúc Tết', '紅包|lì xì', '團圓|sum họp'] },
        ],
      },
    ],
  },
];
