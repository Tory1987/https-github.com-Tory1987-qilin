import { Lesson } from '@/types/curriculum';

export const book3Lessons: Lesson[] = [
  // ===== BÀI 1: 開學了 =====
  {
    id: 'b3-l1', number: 1, title: 'Khai giảng rồi', titleChinese: '開學了',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l1-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-1-1', traditional: '開學', pinyin: 'kāixué', zhuyin: 'ㄎㄞ ㄒㄩㄝˊ', meaning: 'khai giảng', partOfSpeech: 'động từ', exampleSentence: '下個星期開學。', exampleMeaning: 'Tuần sau khai giảng.' },
          { id: 'w3-1-2', traditional: '班', pinyin: 'bān', zhuyin: 'ㄅㄢ', meaning: 'lớp (học sinh)', partOfSpeech: 'danh từ', exampleSentence: '我們班有十五個人。', exampleMeaning: 'Lớp chúng tôi có 15 người.' },
          { id: 'w3-1-3', traditional: '新生', pinyin: 'xīnshēng', zhuyin: 'ㄒㄧㄣ ㄕㄥ', meaning: 'sinh viên mới', partOfSpeech: 'danh từ', exampleSentence: '他是新生。', exampleMeaning: 'Anh ấy là sinh viên mới.' },
          { id: 'w3-1-4', traditional: '嚴', pinyin: 'yán', zhuyin: 'ㄧㄢˊ', meaning: 'nghiêm khắc', partOfSpeech: 'tính từ', exampleSentence: '老師很嚴。', exampleMeaning: 'Giáo viên rất nghiêm khắc.' },
          { id: 'w3-1-5', traditional: '口試', pinyin: 'kǒushì', zhuyin: 'ㄎㄡˇ ㄕˋ', meaning: 'thi vấn đáp', partOfSpeech: 'danh từ', exampleSentence: '明天有口試。', exampleMeaning: 'Ngày mai có thi vấn đáp.' },
          { id: 'w3-1-6', traditional: '筆試', pinyin: 'bǐshì', zhuyin: 'ㄅㄧˇ ㄕˋ', meaning: 'thi viết', partOfSpeech: 'danh từ', exampleSentence: '筆試比較難。', exampleMeaning: 'Thi viết khá khó.' },
          { id: 'w3-1-7', traditional: '報告', pinyin: 'bàogào', zhuyin: 'ㄅㄠˋ ㄍㄠˋ', meaning: 'báo cáo, bài thuyết trình', partOfSpeech: 'danh từ', exampleSentence: '下週要交報告。', exampleMeaning: 'Tuần sau phải nộp báo cáo.' },
          { id: 'w3-1-8', traditional: '壓力', pinyin: 'yālì', zhuyin: 'ㄧㄚ ㄌㄧˋ', meaning: 'áp lực', partOfSpeech: 'danh từ', exampleSentence: '壓力很大。', exampleMeaning: 'Áp lực rất lớn.' },
          { id: 'w3-1-9', traditional: '清楚', pinyin: 'qīngchǔ', zhuyin: 'ㄑㄧㄥ ㄔㄨˇ', meaning: 'rõ ràng', partOfSpeech: 'tính từ', exampleSentence: '說清楚一點。', exampleMeaning: 'Nói rõ ràng hơn.' },
          { id: 'w3-1-10', traditional: '羨慕', pinyin: 'xiànmù', zhuyin: 'ㄒㄧㄢˋ ㄇㄨˋ', meaning: 'ngưỡng mộ, ghen tị', partOfSpeech: 'động từ', exampleSentence: '我很羨慕你。', exampleMeaning: 'Tôi rất ngưỡng mộ bạn.' },
          { id: 'w3-1-11', traditional: '用功', pinyin: 'yònggōng', zhuyin: 'ㄩㄥˋ ㄍㄨㄥ', meaning: 'chăm chỉ (học)', partOfSpeech: 'tính từ', exampleSentence: '他很用功。', exampleMeaning: 'Anh ấy rất chăm chỉ.' },
          { id: 'w3-1-12', traditional: '熱門', pinyin: 'rèmén', zhuyin: 'ㄖㄜˋ ㄇㄣˊ', meaning: 'phổ biến, hot', partOfSpeech: 'tính từ', exampleSentence: '這是熱門科系。', exampleMeaning: 'Đây là ngành hot.' },
          { id: 'w3-1-13', traditional: '熬夜', pinyin: 'áoyè', zhuyin: 'ㄠˊ ㄧㄝˋ', meaning: 'thức khuya', partOfSpeech: 'động từ', exampleSentence: '不要熬夜。', exampleMeaning: 'Đừng thức khuya.' },
          { id: 'w3-1-14', traditional: '恐怕', pinyin: 'kǒngpà', zhuyin: 'ㄎㄨㄥˇ ㄆㄚˋ', meaning: 'e rằng, có lẽ', partOfSpeech: 'phó từ', exampleSentence: '恐怕來不及了。', exampleMeaning: 'E rằng không kịp rồi.' },
          { id: 'w3-1-15', traditional: '遲到', pinyin: 'chídào', zhuyin: 'ㄔˊ ㄉㄠˋ', meaning: 'đến trễ', partOfSpeech: 'động từ', exampleSentence: '不要遲到。', exampleMeaning: 'Đừng đến trễ.' },
        ],
      },
      {
        id: 'b3-l1-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-1-1', pattern: '除了...以外，還/也...',
            explanation: '"除了...以外" = ngoài...ra. Bổ sung thêm thông tin.',
            examples: [
              { sentence: '除了筆試以外，還有口試。', pinyin: 'Chúle bǐshì yǐwài, hái yǒu kǒushì.', meaning: 'Ngoài thi viết ra, còn có thi vấn đáp.' },
              { sentence: '除了上課以外，也要寫報告。', pinyin: 'Chúle shàngkè yǐwài, yě yào xiě bàogào.', meaning: 'Ngoài lên lớp ra, cũng phải viết báo cáo.' },
            ],
          },
          {
            id: 'g3-1-2', pattern: '不管...都...',
            explanation: '"不管...都..." = bất kể...đều... Diễn tả không có ngoại lệ.',
            examples: [
              { sentence: '不管多忙，都要複習。', pinyin: 'Bùguǎn duō máng, dōu yào fùxí.', meaning: 'Bất kể bận thế nào, đều phải ôn tập.' },
              { sentence: '不管誰反對，我都要學。', pinyin: 'Bùguǎn shéi fǎnduì, wǒ dōu yào xué.', meaning: 'Bất kể ai phản đối, tôi đều phải học.' },
            ],
          },
          {
            id: 'g3-1-3', pattern: '差一點 + V (suýt, gần như)',
            explanation: '"差一點" = suýt nữa, gần như. Diễn tả sự việc suýt xảy ra.',
            examples: [
              { sentence: '我差一點遲到。', pinyin: 'Wǒ chà yìdiǎn chídào.', meaning: 'Tôi suýt đến trễ.' },
              { sentence: '他差一點被當了。', pinyin: 'Tā chà yìdiǎn bèi dàng le.', meaning: 'Anh ấy suýt bị rớt môn.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l1-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-1-1', type: 'multiple-choice', question: '"開學" nghĩa là gì?', options: ['nghỉ học', 'khai giảng', 'tốt nghiệp', 'bỏ học'], correctAnswer: 'khai giảng' },
          { id: 'e3-1-2', type: 'multiple-choice', question: '"壓力" nghĩa là gì?', options: ['sức mạnh', 'áp lực', 'động lực', 'năng lực'], correctAnswer: 'áp lực' },
          { id: 'e3-1-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___多忙，都要複習。(Bất kể bận thế nào, đều phải ôn tập)', options: ['不管', '不但', '不過', '不是'], correctAnswer: '不管' },
          { id: 'e3-1-4', type: 'multiple-choice', question: '"熬夜" nghĩa là gì?', options: ['dậy sớm', 'thức khuya', 'ngủ trưa', 'nghỉ ngơi'], correctAnswer: 'thức khuya' },
          { id: 'e3-1-5', type: 'matching', question: 'Nối từ học tập', options: ['口試|thi vấn đáp', '筆試|thi viết', '報告|báo cáo', '開學|khai giảng'], correctAnswer: ['口試|thi vấn đáp', '筆試|thi viết', '報告|báo cáo', '開學|khai giảng'] },
          { id: 'e3-1-6', type: 'sentence-order', question: 'Sắp xếp: "Tôi suýt đến trễ"', options: ['我', '差一點', '遲到'], correctAnswer: ['我', '差一點', '遲到'] },
          { id: 'e3-1-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '壓力很大', options: ['Rất vui', 'Áp lực rất lớn', 'Rất bận', 'Rất mệt'], correctAnswer: 'Áp lực rất lớn' },
          { id: 'e3-1-8', type: 'fill-blank', question: '除了筆試以外，___有口試。(Ngoài thi viết ra, còn có thi vấn đáp)', correctAnswer: '還' },
          { id: 'e3-1-9', type: 'matching', question: 'Nối từ', options: ['嚴|nghiêm khắc', '用功|chăm chỉ', '羨慕|ngưỡng mộ', '恐怕|e rằng'], correctAnswer: ['嚴|nghiêm khắc', '用功|chăm chỉ', '羨慕|ngưỡng mộ', '恐怕|e rằng'] },
          { id: 'e3-1-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '報告', options: ['口試', '筆試', '報告', '壓力'], correctAnswer: '報告' },
        ],
      },
      {
        id: 'b3-l1-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-1-1', type: 'multiple-choice', question: 'Phiên âm của "壓力" là gì?', options: ['yālì', 'yálì', 'yàlì', 'yǎlì'], correctAnswer: 'yālì' },
          { id: 'r3-1-2', type: 'fill-blank', question: '我差一點___到。(Tôi suýt đến trễ)', correctAnswer: '遲' },
          { id: 'r3-1-3', type: 'matching', question: 'Ôn tập', options: ['熱門|phổ biến', '清楚|rõ ràng', '熬夜|thức khuya', '新生|SV mới'], correctAnswer: ['熱門|phổ biến', '清楚|rõ ràng', '熬夜|thức khuya', '新生|SV mới'] },
        ],
      },
    ],
  },

  // ===== BÀI 2: 八折起 =====
  {
    id: 'b3-l2', number: 2, title: 'Giảm từ 20%', titleChinese: '八折起',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l2-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-2-1', traditional: '外套', pinyin: 'wàitào', zhuyin: 'ㄨㄞˋ ㄊㄠˋ', meaning: 'áo khoác', partOfSpeech: 'danh từ', exampleSentence: '這件外套很暖和。', exampleMeaning: 'Cái áo khoác này rất ấm.' },
          { id: 'w3-2-2', traditional: '商品', pinyin: 'shāngpǐn', zhuyin: 'ㄕㄤ ㄆㄧㄣˇ', meaning: 'hàng hóa', partOfSpeech: 'danh từ', exampleSentence: '商品打八折。', exampleMeaning: 'Hàng hóa giảm 20%.' },
          { id: 'w3-2-3', traditional: '折扣', pinyin: 'zhékòu', zhuyin: 'ㄓㄜˊ ㄎㄡˋ', meaning: 'chiết khấu, giảm giá', partOfSpeech: 'danh từ', exampleSentence: '有沒有折扣？', exampleMeaning: 'Có giảm giá không?' },
          { id: 'w3-2-4', traditional: '省', pinyin: 'shěng', zhuyin: 'ㄕㄥˇ', meaning: 'tiết kiệm', partOfSpeech: 'động từ', exampleSentence: '可以省一點錢。', exampleMeaning: 'Có thể tiết kiệm một chút tiền.' },
          { id: 'w3-2-5', traditional: '牌子', pinyin: 'páizi', zhuyin: 'ㄆㄞˊ ㄗ˙', meaning: 'thương hiệu', partOfSpeech: 'danh từ', exampleSentence: '這個牌子很有名。', exampleMeaning: 'Thương hiệu này rất nổi tiếng.' },
          { id: 'w3-2-6', traditional: '品質', pinyin: 'pǐnzhí', zhuyin: 'ㄆㄧㄣˇ ㄓˊ', meaning: 'chất lượng', partOfSpeech: 'danh từ', exampleSentence: '品質很好。', exampleMeaning: 'Chất lượng rất tốt.' },
          { id: 'w3-2-7', traditional: '選擇', pinyin: 'xuǎnzé', zhuyin: 'ㄒㄩㄢˇ ㄗㄜˊ', meaning: 'lựa chọn', partOfSpeech: 'danh từ', exampleSentence: '有很多選擇。', exampleMeaning: 'Có rất nhiều lựa chọn.' },
          { id: 'w3-2-8', traditional: '羊毛', pinyin: 'yángmáo', zhuyin: 'ㄧㄤˊ ㄇㄠˊ', meaning: 'len (lông cừu)', partOfSpeech: 'danh từ', exampleSentence: '這是羊毛的。', exampleMeaning: 'Cái này bằng len.' },
          { id: 'w3-2-9', traditional: '原價', pinyin: 'yuánjià', zhuyin: 'ㄩㄢˊ ㄐㄧㄚˋ', meaning: 'giá gốc', partOfSpeech: 'danh từ', exampleSentence: '原價兩千塊。', exampleMeaning: 'Giá gốc hai nghìn đồng.' },
          { id: 'w3-2-10', traditional: '刷卡', pinyin: 'shuākǎ', zhuyin: 'ㄕㄨㄚ ㄎㄚˇ', meaning: 'quẹt thẻ', partOfSpeech: 'động từ', exampleSentence: '可以刷卡嗎？', exampleMeaning: 'Có thể quẹt thẻ không?' },
          { id: 'w3-2-11', traditional: '現金', pinyin: 'xiànjīn', zhuyin: 'ㄒㄧㄢˋ ㄐㄧㄣ', meaning: 'tiền mặt', partOfSpeech: 'danh từ', exampleSentence: '付現金。', exampleMeaning: 'Trả tiền mặt.' },
          { id: 'w3-2-12', traditional: '簽名', pinyin: 'qiānmíng', zhuyin: 'ㄑㄧㄢ ㄇㄧㄥˊ', meaning: 'ký tên', partOfSpeech: 'động từ', exampleSentence: '請在這裡簽名。', exampleMeaning: 'Xin ký tên ở đây.' },
          { id: 'w3-2-13', traditional: '發票', pinyin: 'fāpiào', zhuyin: 'ㄈㄚ ㄆㄧㄠˋ', meaning: 'hóa đơn', partOfSpeech: 'danh từ', exampleSentence: '請給我發票。', exampleMeaning: 'Xin cho tôi hóa đơn.' },
          { id: 'w3-2-14', traditional: '退', pinyin: 'tuì', zhuyin: 'ㄊㄨㄟˋ', meaning: 'trả lại (hàng)', partOfSpeech: 'động từ', exampleSentence: '可以退嗎？', exampleMeaning: 'Có thể trả lại không?' },
          { id: 'w3-2-15', traditional: '週年慶', pinyin: 'zhōunián qìng', zhuyin: 'ㄓㄡ ㄋㄧㄢˊ ㄑㄧㄥˋ', meaning: 'lễ kỷ niệm (cửa hàng)', partOfSpeech: 'danh từ', exampleSentence: '百貨公司週年慶。', exampleMeaning: 'TTTM kỷ niệm thành lập.' },
        ],
      },
      {
        id: 'b3-l2-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-2-1', pattern: '一般來說 (nói chung)',
            explanation: '"一般來說" = nói chung, thông thường. Mở đầu nhận xét khái quát.',
            examples: [
              { sentence: '一般來說，百貨公司比較貴。', pinyin: 'Yìbān láishuō, bǎihuò gōngsī bǐjiào guì.', meaning: 'Nói chung, TTTM khá đắt.' },
              { sentence: '一般來說，週年慶折扣比較多。', pinyin: 'Yìbān láishuō, zhōunián qìng zhékòu bǐjiào duō.', meaning: 'Nói chung, lễ kỷ niệm giảm giá nhiều hơn.' },
            ],
          },
          {
            id: 'g3-2-2', pattern: '又...又... (vừa...vừa...)',
            explanation: '"又...又..." = vừa...vừa... Diễn tả hai đặc điểm đồng thời.',
            examples: [
              { sentence: '這件外套又暖和又便宜。', pinyin: 'Zhè jiàn wàitào yòu nuǎnhuo yòu piányí.', meaning: 'Cái áo khoác này vừa ấm vừa rẻ.' },
              { sentence: '品質又好，選擇又多。', pinyin: 'Pǐnzhí yòu hǎo, xuǎnzé yòu duō.', meaning: 'Chất lượng vừa tốt, lựa chọn vừa nhiều.' },
            ],
          },
          {
            id: 'g3-2-3', pattern: 'V + 完 (làm xong)',
            explanation: '"V + 完" = làm xong. Diễn tả hành động hoàn thành.',
            examples: [
              { sentence: '打完折多少錢？', pinyin: 'Dǎ wán zhé duōshǎo qián?', meaning: 'Sau khi giảm giá bao nhiêu tiền?' },
              { sentence: '看完了嗎？', pinyin: 'Kàn wán le ma?', meaning: 'Xem xong chưa?' },
            ],
          },
        ],
      },
      {
        id: 'b3-l2-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-2-1', type: 'multiple-choice', question: '"折扣" nghĩa là gì?', options: ['tăng giá', 'giảm giá', 'miễn phí', 'đổi trả'], correctAnswer: 'giảm giá' },
          { id: 'e3-2-2', type: 'multiple-choice', question: '"刷卡" nghĩa là gì?', options: ['rút tiền', 'quẹt thẻ', 'gửi tiền', 'đổi tiền'], correctAnswer: 'quẹt thẻ' },
          { id: 'e3-2-3', type: 'multiple-choice', question: 'Chọn từ đúng: 這件外套___暖和___便宜。(Vừa ấm vừa rẻ)', options: ['又...又', '不...不', '也...也', '越...越'], correctAnswer: '又...又' },
          { id: 'e3-2-4', type: 'multiple-choice', question: '"省" nghĩa là gì?', options: ['tiêu xài', 'tiết kiệm', 'lãng phí', 'kiếm tiền'], correctAnswer: 'tiết kiệm' },
          { id: 'e3-2-5', type: 'matching', question: 'Nối từ mua sắm', options: ['折扣|chiết khấu', '原價|giá gốc', '現金|tiền mặt', '發票|hóa đơn'], correctAnswer: ['折扣|chiết khấu', '原價|giá gốc', '現金|tiền mặt', '發票|hóa đơn'] },
          { id: 'e3-2-6', type: 'sentence-order', question: 'Sắp xếp: "Có thể quẹt thẻ không?"', options: ['可以', '刷卡', '嗎', '？'], correctAnswer: ['可以', '刷卡', '嗎', '？'] },
          { id: 'e3-2-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '打完折多少錢', options: ['Giảm giá bao nhiêu?', 'Sau khi giảm bao nhiêu?', 'Giá gốc bao nhiêu?', 'Trả bao nhiêu?'], correctAnswer: 'Sau khi giảm bao nhiêu?' },
          { id: 'e3-2-8', type: 'fill-blank', question: '一般___說，百貨公司比較貴。(Nói chung, TTTM khá đắt)', correctAnswer: '來' },
          { id: 'e3-2-9', type: 'matching', question: 'Nối từ', options: ['牌子|thương hiệu', '品質|chất lượng', '省|tiết kiệm', '退|trả lại'], correctAnswer: ['牌子|thương hiệu', '品質|chất lượng', '省|tiết kiệm', '退|trả lại'] },
          { id: 'e3-2-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '週年慶', options: ['折扣', '週年慶', '百貨公司', '商品'], correctAnswer: '週年慶' },
        ],
      },
      {
        id: 'b3-l2-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-2-1', type: 'multiple-choice', question: 'Phiên âm của "折扣" là gì?', options: ['zhékòu', 'zhēkòu', 'zhékǒu', 'zhèkòu'], correctAnswer: 'zhékòu' },
          { id: 'r3-2-2', type: 'fill-blank', question: '可以___嗎？(Có thể trả lại không?)', correctAnswer: '退' },
          { id: 'r3-2-3', type: 'matching', question: 'Ôn tập', options: ['外套|áo khoác', '簽名|ký tên', '商品|hàng hóa', '選擇|lựa chọn'], correctAnswer: ['外套|áo khoác', '簽名|ký tên', '商品|hàng hóa', '選擇|lựa chọn'] },
        ],
      },
    ],
  },

  // ===== BÀI 3: 外套帶了沒有？ =====
  {
    id: 'b3-l3', number: 3, title: 'Áo khoác mang theo chưa?', titleChinese: '外套帶了沒有？',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l3-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-3-1', traditional: '空氣', pinyin: 'kōngqì', zhuyin: 'ㄎㄨㄥ ㄑㄧˋ', meaning: 'không khí', partOfSpeech: 'danh từ', exampleSentence: '空氣不好。', exampleMeaning: 'Không khí không tốt.' },
          { id: 'w3-3-2', traditional: '影響', pinyin: 'yǐngxiǎng', zhuyin: 'ㄧㄥˇ ㄒㄧㄤˇ', meaning: 'ảnh hưởng', partOfSpeech: 'danh từ', exampleSentence: '受到颱風影響。', exampleMeaning: 'Bị ảnh hưởng bởi bão.' },
          { id: 'w3-3-3', traditional: '穩定', pinyin: 'wěndìng', zhuyin: 'ㄨㄣˇ ㄉㄧㄥˋ', meaning: 'ổn định', partOfSpeech: 'tính từ', exampleSentence: '天氣不太穩定。', exampleMeaning: 'Thời tiết không ổn định lắm.' },
          { id: 'w3-3-4', traditional: '零下', pinyin: 'língxià', zhuyin: 'ㄌㄧㄥˊ ㄒㄧㄚˋ', meaning: 'dưới 0 độ', partOfSpeech: 'tính từ', exampleSentence: '溫度零下五度。', exampleMeaning: 'Nhiệt độ âm 5 độ.' },
          { id: 'w3-3-5', traditional: '感覺', pinyin: 'gǎnjué', zhuyin: 'ㄍㄢˇ ㄐㄩㄝˊ', meaning: 'cảm giác, cảm thấy', partOfSpeech: 'động từ', exampleSentence: '感覺很冷。', exampleMeaning: 'Cảm thấy rất lạnh.' },
          { id: 'w3-3-6', traditional: '季節', pinyin: 'jìjié', zhuyin: 'ㄐㄧˋ ㄐㄧㄝˊ', meaning: 'mùa', partOfSpeech: 'danh từ', exampleSentence: '你喜歡什麼季節？', exampleMeaning: 'Bạn thích mùa nào?' },
          { id: 'w3-3-7', traditional: '火鍋', pinyin: 'huǒguō', zhuyin: 'ㄏㄨㄛˇ ㄍㄨㄛ', meaning: 'lẩu', partOfSpeech: 'danh từ', exampleSentence: '冬天吃火鍋。', exampleMeaning: 'Mùa đông ăn lẩu.' },
          { id: 'w3-3-8', traditional: '海鮮', pinyin: 'hǎixiān', zhuyin: 'ㄏㄞˇ ㄒㄧㄢ', meaning: 'hải sản', partOfSpeech: 'danh từ', exampleSentence: '臺灣海鮮很新鮮。', exampleMeaning: 'Hải sản Đài Loan rất tươi.' },
          { id: 'w3-3-9', traditional: '櫻花', pinyin: 'yīnghuā', zhuyin: 'ㄧㄥ ㄏㄨㄚ', meaning: 'hoa anh đào', partOfSpeech: 'danh từ', exampleSentence: '春天看櫻花。', exampleMeaning: 'Mùa xuân ngắm hoa anh đào.' },
          { id: 'w3-3-10', traditional: '變化', pinyin: 'biànhuà', zhuyin: 'ㄅㄧㄢˋ ㄏㄨㄚˋ', meaning: 'thay đổi, biến đổi', partOfSpeech: 'danh từ', exampleSentence: '氣溫變化很大。', exampleMeaning: 'Nhiệt độ thay đổi rất lớn.' },
          { id: 'w3-3-11', traditional: '潮濕', pinyin: 'cháoshī', zhuyin: 'ㄔㄠˊ ㄕ', meaning: 'ẩm ướt', partOfSpeech: 'tính từ', exampleSentence: '臺灣很潮濕。', exampleMeaning: 'Đài Loan rất ẩm ướt.' },
          { id: 'w3-3-12', traditional: '冷氣', pinyin: 'lěngqì', zhuyin: 'ㄌㄥˇ ㄑㄧˋ', meaning: 'máy lạnh', partOfSpeech: 'danh từ', exampleSentence: '開冷氣。', exampleMeaning: 'Bật máy lạnh.' },
          { id: 'w3-3-13', traditional: '颳風', pinyin: 'guā fēng', zhuyin: 'ㄍㄨㄚ ㄈㄥ', meaning: 'gió thổi', partOfSpeech: 'cụm từ', exampleSentence: '外面颳風了。', exampleMeaning: 'Bên ngoài gió thổi rồi.' },
          { id: 'w3-3-14', traditional: '發霉', pinyin: 'fāméi', zhuyin: 'ㄈㄚ ㄇㄟˊ', meaning: 'bị mốc', partOfSpeech: 'động từ', exampleSentence: '衣服發霉了。', exampleMeaning: 'Quần áo bị mốc rồi.' },
          { id: 'w3-3-15', traditional: '除濕機', pinyin: 'chúshījī', zhuyin: 'ㄔㄨˊ ㄕ ㄐㄧ', meaning: 'máy hút ẩm', partOfSpeech: 'danh từ', exampleSentence: '要開除濕機。', exampleMeaning: 'Phải bật máy hút ẩm.' },
        ],
      },
      {
        id: 'b3-l3-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-3-1', pattern: 'V + 了沒有？ (đã...chưa?)',
            explanation: '"V + 了沒有?" = đã...chưa? Hỏi hành động đã hoàn thành chưa.',
            examples: [
              { sentence: '外套帶了沒有？', pinyin: 'Wàitào dài le méiyǒu?', meaning: 'Áo khoác mang theo chưa?' },
              { sentence: '你吃了沒有？', pinyin: 'Nǐ chī le méiyǒu?', meaning: 'Bạn ăn chưa?' },
            ],
          },
          {
            id: 'g3-3-2', pattern: '難怪 (thảo nào, chẳng trách)',
            explanation: '"難怪" = thảo nào, chẳng trách. Hiểu ra nguyên nhân.',
            examples: [
              { sentence: '難怪你穿那麼多。', pinyin: 'Nánguài nǐ chuān nàme duō.', meaning: 'Thảo nào bạn mặc nhiều thế.' },
              { sentence: '難怪他感冒了。', pinyin: 'Nánguài tā gǎnmào le.', meaning: 'Chẳng trách anh ấy bị cảm.' },
            ],
          },
          {
            id: 'g3-3-3', pattern: '受到 + N + 影響',
            explanation: '"受到...影響" = bị/được...ảnh hưởng.',
            examples: [
              { sentence: '受到颱風影響，天氣不穩定。', pinyin: 'Shòu dào táifēng yǐngxiǎng, tiānqì bù wěndìng.', meaning: 'Bị ảnh hưởng bởi bão, thời tiết không ổn định.' },
              { sentence: '受到空氣影響，很不舒服。', pinyin: 'Shòu dào kōngqì yǐngxiǎng, hěn bù shūfú.', meaning: 'Bị ảnh hưởng bởi không khí, rất khó chịu.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l3-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-3-1', type: 'multiple-choice', question: '"潮濕" nghĩa là gì?', options: ['khô ráo', 'ẩm ướt', 'nóng bức', 'lạnh giá'], correctAnswer: 'ẩm ướt' },
          { id: 'e3-3-2', type: 'multiple-choice', question: '"除濕機" là gì?', options: ['máy lạnh', 'máy hút ẩm', 'máy sưởi', 'quạt'], correctAnswer: 'máy hút ẩm' },
          { id: 'e3-3-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___你穿那麼多。(Thảo nào bạn mặc nhiều thế)', options: ['難怪', '恐怕', '幸虧', '好像'], correctAnswer: '難怪' },
          { id: 'e3-3-4', type: 'multiple-choice', question: '"發霉" nghĩa là gì?', options: ['bị ướt', 'bị mốc', 'bị rách', 'bị bẩn'], correctAnswer: 'bị mốc' },
          { id: 'e3-3-5', type: 'matching', question: 'Nối từ thời tiết', options: ['潮濕|ẩm ướt', '零下|dưới 0 độ', '颳風|gió thổi', '冷氣|máy lạnh'], correctAnswer: ['潮濕|ẩm ướt', '零下|dưới 0 độ', '颳風|gió thổi', '冷氣|máy lạnh'] },
          { id: 'e3-3-6', type: 'sentence-order', question: 'Sắp xếp: "Áo khoác mang theo chưa?"', options: ['外套', '帶了', '沒有', '？'], correctAnswer: ['外套', '帶了', '沒有', '？'] },
          { id: 'e3-3-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '受到颱風影響', options: ['Bão sắp đến', 'Bị ảnh hưởng bởi bão', 'Bão đã qua', 'Không có bão'], correctAnswer: 'Bị ảnh hưởng bởi bão' },
          { id: 'e3-3-8', type: 'fill-blank', question: '氣溫___化很大。(Nhiệt độ thay đổi rất lớn)', correctAnswer: '變' },
          { id: 'e3-3-9', type: 'matching', question: 'Nối từ thiên nhiên', options: ['櫻花|hoa anh đào', '海鮮|hải sản', '火鍋|lẩu', '季節|mùa'], correctAnswer: ['櫻花|hoa anh đào', '海鮮|hải sản', '火鍋|lẩu', '季節|mùa'] },
          { id: 'e3-3-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '潮濕', options: ['涼快', '潮濕', '穩定', '影響'], correctAnswer: '潮濕' },
        ],
      },
      {
        id: 'b3-l3-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-3-1', type: 'multiple-choice', question: 'Phiên âm của "影響" là gì?', options: ['yǐngxiǎng', 'yīngxiǎng', 'yǐngxiāng', 'yǐngxiàng'], correctAnswer: 'yǐngxiǎng' },
          { id: 'r3-3-2', type: 'fill-blank', question: '外套帶了___有？(Áo khoác mang theo chưa?)', correctAnswer: '沒' },
          { id: 'r3-3-3', type: 'matching', question: 'Ôn tập', options: ['空氣|không khí', '穩定|ổn định', '感覺|cảm giác', '變化|thay đổi'], correctAnswer: ['空氣|không khí', '穩定|ổn định', '感覺|cảm giác', '變化|thay đổi'] },
        ],
      },
    ],
  },

  // ===== BÀI 4: 我愛臺灣的人情味 =====
  {
    id: 'b3-l4', number: 4, title: 'Tôi yêu sự thân tình của Đài Loan', titleChinese: '我愛臺灣的人情味',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l4-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-4-1', traditional: '人情味', pinyin: 'rénqíngwèi', zhuyin: 'ㄖㄣˊ ㄑㄧㄥˊ ㄨㄟˋ', meaning: 'tình người, sự thân tình', partOfSpeech: 'danh từ', exampleSentence: '臺灣很有人情味。', exampleMeaning: 'Đài Loan rất có tình người.' },
          { id: 'w3-4-2', traditional: '天燈', pinyin: 'tiāndēng', zhuyin: 'ㄊㄧㄢ ㄉㄥ', meaning: 'đèn trời', partOfSpeech: 'danh từ', exampleSentence: '去平溪放天燈。', exampleMeaning: 'Đi Bình Khê thả đèn trời.' },
          { id: 'w3-4-3', traditional: '願望', pinyin: 'yuànwàng', zhuyin: 'ㄩㄢˋ ㄨㄤˋ', meaning: 'ước nguyện', partOfSpeech: 'danh từ', exampleSentence: '寫下願望。', exampleMeaning: 'Viết ước nguyện.' },
          { id: 'w3-4-4', traditional: '耐心', pinyin: 'nàixīn', zhuyin: 'ㄋㄞˋ ㄒㄧㄣ', meaning: 'kiên nhẫn', partOfSpeech: 'danh từ', exampleSentence: '他很有耐心。', exampleMeaning: 'Anh ấy rất kiên nhẫn.' },
          { id: 'w3-4-5', traditional: '感動', pinyin: 'gǎndòng', zhuyin: 'ㄍㄢˇ ㄉㄨㄥˋ', meaning: 'cảm động', partOfSpeech: 'tính từ', exampleSentence: '我很感動。', exampleMeaning: 'Tôi rất cảm động.' },
          { id: 'w3-4-6', traditional: '招牌', pinyin: 'zhāopái', zhuyin: 'ㄓㄠ ㄆㄞˊ', meaning: 'bảng hiệu, đặc sản', partOfSpeech: 'danh từ', exampleSentence: '這是招牌菜。', exampleMeaning: 'Đây là món đặc sản.' },
          { id: 'w3-4-7', traditional: '當地', pinyin: 'dāngdì', zhuyin: 'ㄉㄤ ㄉㄧˋ', meaning: 'địa phương', partOfSpeech: 'tính từ', exampleSentence: '吃當地美食。', exampleMeaning: 'Ăn đồ ngon địa phương.' },
          { id: 'w3-4-8', traditional: '美食', pinyin: 'měishí', zhuyin: 'ㄇㄟˇ ㄕˊ', meaning: 'đồ ăn ngon, ẩm thực', partOfSpeech: 'danh từ', exampleSentence: '臺灣美食很有名。', exampleMeaning: 'Ẩm thực Đài Loan rất nổi tiếng.' },
          { id: 'w3-4-9', traditional: '錯過', pinyin: 'cuòguò', zhuyin: 'ㄘㄨㄛˋ ㄍㄨㄛˋ', meaning: 'bỏ lỡ', partOfSpeech: 'động từ', exampleSentence: '不要錯過。', exampleMeaning: 'Đừng bỏ lỡ.' },
          { id: 'w3-4-10', traditional: '夜景', pinyin: 'yèjǐng', zhuyin: 'ㄧㄝˋ ㄐㄧㄥˇ', meaning: 'cảnh đêm', partOfSpeech: 'danh từ', exampleSentence: '夜景很漂亮。', exampleMeaning: 'Cảnh đêm rất đẹp.' },
          { id: 'w3-4-11', traditional: '古蹟', pinyin: 'gǔjī', zhuyin: 'ㄍㄨˇ ㄐㄧ', meaning: 'di tích lịch sử', partOfSpeech: 'danh từ', exampleSentence: '去看古蹟。', exampleMeaning: 'Đi xem di tích.' },
          { id: 'w3-4-12', traditional: '煙火', pinyin: 'yānhuǒ', zhuyin: 'ㄧㄢ ㄏㄨㄛˇ', meaning: 'pháo hoa', partOfSpeech: 'danh từ', exampleSentence: '跨年看煙火。', exampleMeaning: 'Đón giao thừa xem pháo hoa.' },
          { id: 'w3-4-13', traditional: '跨年', pinyin: 'kuànián', zhuyin: 'ㄎㄨㄚˋ ㄋㄧㄢˊ', meaning: 'đón năm mới (dương lịch)', partOfSpeech: 'động từ', exampleSentence: '去101跨年。', exampleMeaning: 'Đi 101 đón giao thừa.' },
          { id: 'w3-4-14', traditional: '道地', pinyin: 'dàodì', zhuyin: 'ㄉㄠˋ ㄉㄧˋ', meaning: 'chính gốc, đích thực', partOfSpeech: 'tính từ', exampleSentence: '道地的臺灣味。', exampleMeaning: 'Hương vị chính gốc Đài Loan.' },
          { id: 'w3-4-15', traditional: '歷史', pinyin: 'lìshǐ', zhuyin: 'ㄌㄧˋ ㄕˇ', meaning: 'lịch sử', partOfSpeech: 'danh từ', exampleSentence: '臺灣歷史很有趣。', exampleMeaning: 'Lịch sử Đài Loan rất thú vị.' },
        ],
      },
      {
        id: 'b3-l4-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-4-1', pattern: '不是...而是... (không phải...mà là...)',
            explanation: 'Phủ định một khả năng và đưa ra khả năng đúng.',
            examples: [
              { sentence: '不是為了賺錢，而是為了交朋友。', pinyin: 'Búshì wèile zhuàn qián, érshì wèile jiāo péngyǒu.', meaning: 'Không phải vì kiếm tiền, mà vì kết bạn.' },
              { sentence: '不是不想去，而是沒時間。', pinyin: 'Búshì bù xiǎng qù, érshì méi shíjiān.', meaning: 'Không phải không muốn đi, mà không có thời gian.' },
            ],
          },
          {
            id: 'g3-4-2', pattern: '碰到 (gặp, bắt gặp)',
            explanation: '"碰到" = tình cờ gặp, chạm trán.',
            examples: [
              { sentence: '我在夜市碰到老師。', pinyin: 'Wǒ zài yèshì pèng dào lǎoshī.', meaning: 'Tôi tình cờ gặp giáo viên ở chợ đêm.' },
              { sentence: '碰到下雨怎麼辦？', pinyin: 'Pèng dào xiàyǔ zěnme bàn?', meaning: 'Gặp mưa thì làm sao?' },
            ],
          },
          {
            id: 'g3-4-3', pattern: '千萬別/不要 (tuyệt đối đừng)',
            explanation: '"千萬別" = tuyệt đối đừng. Nhấn mạnh lời khuyên.',
            examples: [
              { sentence: '千萬別錯過臺灣美食。', pinyin: 'Qiānwàn bié cuòguò Táiwān měishí.', meaning: 'Tuyệt đối đừng bỏ lỡ ẩm thực Đài Loan.' },
              { sentence: '千萬不要遲到。', pinyin: 'Qiānwàn búyào chídào.', meaning: 'Tuyệt đối đừng đến trễ.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l4-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-4-1', type: 'multiple-choice', question: '"人情味" nghĩa là gì?', options: ['hương vị', 'tình người', 'mùi vị', 'khẩu vị'], correctAnswer: 'tình người' },
          { id: 'e3-4-2', type: 'multiple-choice', question: '"錯過" nghĩa là gì?', options: ['đi qua', 'bỏ lỡ', 'gặp gỡ', 'vượt qua'], correctAnswer: 'bỏ lỡ' },
          { id: 'e3-4-3', type: 'multiple-choice', question: 'Chọn từ đúng: 不是為了賺錢，___是為了交朋友。(Không phải vì kiếm tiền, mà vì kết bạn)', options: ['就', '而', '才', '又'], correctAnswer: '而' },
          { id: 'e3-4-4', type: 'multiple-choice', question: '"道地" nghĩa là gì?', options: ['rẻ', 'đắt', 'chính gốc', 'ngon'], correctAnswer: 'chính gốc' },
          { id: 'e3-4-5', type: 'matching', question: 'Nối từ du lịch', options: ['天燈|đèn trời', '煙火|pháo hoa', '古蹟|di tích', '夜景|cảnh đêm'], correctAnswer: ['天燈|đèn trời', '煙火|pháo hoa', '古蹟|di tích', '夜景|cảnh đêm'] },
          { id: 'e3-4-6', type: 'sentence-order', question: 'Sắp xếp: "Tuyệt đối đừng bỏ lỡ ẩm thực Đài Loan"', options: ['千萬', '別', '錯過', '臺灣', '美食'], correctAnswer: ['千萬', '別', '錯過', '臺灣', '美食'] },
          { id: 'e3-4-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '我很感動', options: ['Tôi rất vui', 'Tôi rất cảm động', 'Tôi rất buồn', 'Tôi rất sợ'], correctAnswer: 'Tôi rất cảm động' },
          { id: 'e3-4-8', type: 'fill-blank', question: '他很有___心。(Anh ấy rất kiên nhẫn)', correctAnswer: '耐' },
          { id: 'e3-4-9', type: 'matching', question: 'Nối từ văn hóa', options: ['美食|ẩm thực', '歷史|lịch sử', '跨年|đón năm mới', '招牌|đặc sản'], correctAnswer: ['美食|ẩm thực', '歷史|lịch sử', '跨年|đón năm mới', '招牌|đặc sản'] },
          { id: 'e3-4-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '天燈', options: ['煙火', '天燈', '古蹟', '夜景'], correctAnswer: '天燈' },
        ],
      },
      {
        id: 'b3-l4-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-4-1', type: 'multiple-choice', question: 'Phiên âm của "感動" là gì?', options: ['gǎndòng', 'gāndòng', 'gǎndōng', 'gàndòng'], correctAnswer: 'gǎndòng' },
          { id: 'r3-4-2', type: 'fill-blank', question: '千萬別___過臺灣美食。(Tuyệt đối đừng bỏ lỡ ẩm thực Đài Loan)', correctAnswer: '錯' },
          { id: 'r3-4-3', type: 'matching', question: 'Ôn tập', options: ['人情味|tình người', '願望|ước nguyện', '當地|địa phương', '道地|chính gốc'], correctAnswer: ['人情味|tình người', '願望|ước nguyện', '當地|địa phương', '道地|chính gốc'] },
        ],
      },
    ],
  },

  // ===== BÀI 5: 現在流行什麼？ =====
  {
    id: 'b3-l5', number: 5, title: 'Bây giờ đang thịnh hành gì?', titleChinese: '現在流行什麼？',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l5-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-5-1', traditional: '流行', pinyin: 'liúxíng', zhuyin: 'ㄌㄧㄡˊ ㄒㄧㄥˊ', meaning: 'thịnh hành, phổ biến', partOfSpeech: 'tính từ', exampleSentence: '現在流行什麼？', exampleMeaning: 'Bây giờ đang thịnh hành gì?' },
          { id: 'w3-5-2', traditional: '時尚', pinyin: 'shíshàng', zhuyin: 'ㄕˊ ㄕㄤˋ', meaning: 'thời trang', partOfSpeech: 'danh từ', exampleSentence: '她很時尚。', exampleMeaning: 'Cô ấy rất thời trang.' },
          { id: 'w3-5-3', traditional: '打扮', pinyin: 'dǎbàn', zhuyin: 'ㄉㄚˇ ㄅㄢˋ', meaning: 'trang điểm, ăn mặc', partOfSpeech: 'động từ', exampleSentence: '她打扮得很漂亮。', exampleMeaning: 'Cô ấy ăn mặc rất đẹp.' },
          { id: 'w3-5-4', traditional: '品牌', pinyin: 'pǐnpái', zhuyin: 'ㄆㄧㄣˇ ㄆㄞˊ', meaning: 'thương hiệu', partOfSpeech: 'danh từ', exampleSentence: '這個品牌很有名。', exampleMeaning: 'Thương hiệu này rất nổi tiếng.' },
          { id: 'w3-5-5', traditional: '質感', pinyin: 'zhìgǎn', zhuyin: 'ㄓˋ ㄍㄢˇ', meaning: 'chất lượng (cảm giác)', partOfSpeech: 'danh từ', exampleSentence: '這件衣服質感很好。', exampleMeaning: 'Bộ đồ này chất lượng rất tốt.' },
          { id: 'w3-5-6', traditional: '穿搭', pinyin: 'chuāndā', zhuyin: 'ㄔㄨㄢ ㄉㄚ', meaning: 'phối đồ', partOfSpeech: 'danh từ', exampleSentence: '你的穿搭很好看。', exampleMeaning: 'Cách phối đồ của bạn rất đẹp.' },
          { id: 'w3-5-7', traditional: '設計', pinyin: 'shèjì', zhuyin: 'ㄕㄜˋ ㄐㄧˋ', meaning: 'thiết kế', partOfSpeech: 'danh từ/động từ', exampleSentence: '這個設計很特別。', exampleMeaning: 'Thiết kế này rất đặc biệt.' },
          { id: 'w3-5-8', traditional: '材質', pinyin: 'cáizhì', zhuyin: 'ㄘㄞˊ ㄓˋ', meaning: 'chất liệu', partOfSpeech: 'danh từ', exampleSentence: '這件的材質是棉的。', exampleMeaning: 'Chất liệu cái này là cotton.' },
          { id: 'w3-5-9', traditional: '搭配', pinyin: 'dāpèi', zhuyin: 'ㄉㄚ ㄆㄟˋ', meaning: 'kết hợp, phối hợp', partOfSpeech: 'động từ', exampleSentence: '這兩件很搭配。', exampleMeaning: 'Hai món này rất hợp nhau.' },
          { id: 'w3-5-10', traditional: '追求', pinyin: 'zhuīqiú', zhuyin: 'ㄓㄨㄟ ㄑㄧㄡˊ', meaning: 'theo đuổi', partOfSpeech: 'động từ', exampleSentence: '他追求時尚。', exampleMeaning: 'Anh ấy theo đuổi thời trang.' },
          { id: 'w3-5-11', traditional: '潮流', pinyin: 'cháoliú', zhuyin: 'ㄔㄠˊ ㄌㄧㄡˊ', meaning: 'xu hướng, trào lưu', partOfSpeech: 'danh từ', exampleSentence: '潮流一直在變。', exampleMeaning: 'Trào lưu luôn thay đổi.' },
          { id: 'w3-5-12', traditional: '休閒', pinyin: 'xiūxián', zhuyin: 'ㄒㄧㄡ ㄒㄧㄢˊ', meaning: 'giải trí, thư giãn', partOfSpeech: 'tính từ', exampleSentence: '我喜歡休閒風格。', exampleMeaning: 'Tôi thích phong cách thoải mái.' },
          { id: 'w3-5-13', traditional: '款式', pinyin: 'kuǎnshì', zhuyin: 'ㄎㄨㄢˇ ㄕˋ', meaning: 'kiểu dáng', partOfSpeech: 'danh từ', exampleSentence: '這個款式很流行。', exampleMeaning: 'Kiểu dáng này rất thịnh hành.' },
          { id: 'w3-5-14', traditional: '獨特', pinyin: 'dútè', zhuyin: 'ㄉㄨˊ ㄊㄜˋ', meaning: 'độc đáo', partOfSpeech: 'tính từ', exampleSentence: '他的風格很獨特。', exampleMeaning: 'Phong cách anh ấy rất độc đáo.' },
        ],
      },
      {
        id: 'b3-l5-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-5-1', pattern: '越來越 + Adj (càng ngày càng)',
            explanation: '"越來越" = càng ngày càng. Diễn tả xu hướng thay đổi theo thời gian.',
            examples: [
              { sentence: '時尚越來越多元了。', pinyin: 'Shíshàng yuèláiyuè duōyuán le.', meaning: 'Thời trang càng ngày càng đa dạng.' },
              { sentence: '天氣越來越熱了。', pinyin: 'Tiānqì yuèláiyuè rè le.', meaning: 'Thời tiết càng ngày càng nóng.' },
            ],
          },
          {
            id: 'g3-5-2', pattern: '不但...而且... (không những...mà còn)',
            explanation: '"不但...而且..." dùng để bổ sung, tăng mức độ thông tin.',
            examples: [
              { sentence: '這件衣服不但好看，而且便宜。', pinyin: 'Zhè jiàn yīfú búdàn hǎokàn, érqiě piányi.', meaning: 'Bộ đồ này không những đẹp, mà còn rẻ.' },
              { sentence: '他不但會設計，而且會做衣服。', pinyin: 'Tā búdàn huì shèjì, érqiě huì zuò yīfú.', meaning: 'Anh ấy không những biết thiết kế, mà còn biết may quần áo.' },
            ],
          },
          {
            id: 'g3-5-3', pattern: '與其 A 不如 B (thà B còn hơn A)',
            explanation: '"與其...不如..." = thà...còn hơn... So sánh và chọn B.',
            examples: [
              { sentence: '與其買名牌，不如買有質感的。', pinyin: 'Yǔqí mǎi míngpái, bùrú mǎi yǒu zhìgǎn de.', meaning: 'Thà mua đồ có chất lượng, còn hơn mua hàng hiệu.' },
              { sentence: '與其追求潮流，不如做自己。', pinyin: 'Yǔqí zhuīqiú cháoliú, bùrú zuò zìjǐ.', meaning: 'Thà là chính mình, còn hơn chạy theo trào lưu.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l5-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-5-1', type: 'multiple-choice', question: '"流行" nghĩa là gì?', options: ['cổ điển', 'thịnh hành', 'lạc hậu', 'đắt'], correctAnswer: 'thịnh hành' },
          { id: 'e3-5-2', type: 'multiple-choice', question: '"品牌" nghĩa là gì?', options: ['giá cả', 'thương hiệu', 'chất liệu', 'kiểu dáng'], correctAnswer: 'thương hiệu' },
          { id: 'e3-5-3', type: 'multiple-choice', question: 'Chọn từ đúng: 時尚___來___多元了。', options: ['越...越', '又...又', '不但...而且', '一...就'], correctAnswer: '越...越' },
          { id: 'e3-5-4', type: 'matching', question: 'Nối từ thời trang', options: ['設計|thiết kế', '材質|chất liệu', '款式|kiểu dáng', '搭配|phối hợp'], correctAnswer: ['設計|thiết kế', '材質|chất liệu', '款式|kiểu dáng', '搭配|phối hợp'] },
          { id: 'e3-5-5', type: 'sentence-order', question: 'Sắp xếp: "Bộ đồ này không những đẹp, mà còn rẻ"', options: ['這件衣服', '不但', '好看', '而且', '便宜'], correctAnswer: ['這件衣服', '不但', '好看', '而且', '便宜'] },
          { id: 'e3-5-6', type: 'fill-blank', question: '他的風格很___特。(Phong cách anh ấy rất độc đáo)', correctAnswer: '獨' },
          { id: 'e3-5-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '潮流一直在變', options: ['Trào lưu luôn thay đổi', 'Trào lưu rất tốt', 'Trào lưu rất cũ', 'Trào lưu rất mới'], correctAnswer: 'Trào lưu luôn thay đổi' },
          { id: 'e3-5-8', type: 'multiple-choice', question: '"休閒" nghĩa là gì?', options: ['nghiêm túc', 'giải trí, thư giãn', 'bận rộn', 'mệt mỏi'], correctAnswer: 'giải trí, thư giãn' },
          { id: 'e3-5-9', type: 'matching', question: 'Nối từ xu hướng', options: ['追求|theo đuổi', '潮流|trào lưu', '獨特|độc đáo', '休閒|thư giãn'], correctAnswer: ['追求|theo đuổi', '潮流|trào lưu', '獨特|độc đáo', '休閒|thư giãn'] },
          { id: 'e3-5-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '品牌', options: ['設計', '品牌', '材質', '款式'], correctAnswer: '品牌' },
        ],
      },
      {
        id: 'b3-l5-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-5-1', type: 'multiple-choice', question: 'Phiên âm của "時尚" là gì?', options: ['shíshàng', 'shìshàng', 'shíshǎng', 'shǐshàng'], correctAnswer: 'shíshàng' },
          { id: 'r3-5-2', type: 'fill-blank', question: '與其買名牌，___如買有質感的。(Thà mua đồ chất lượng còn hơn mua hàng hiệu)', correctAnswer: '不' },
          { id: 'r3-5-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['流行|thịnh hành', '打扮|ăn mặc', '質感|chất lượng', '穿搭|phối đồ'], correctAnswer: ['流行|thịnh hành', '打扮|ăn mặc', '質感|chất lượng', '穿搭|phối đồ'] },
        ],
      },
    ],
  },

  // ===== BÀI 6: 到鄉下住一晚！ =====
  {
    id: 'b3-l6', number: 6, title: 'Về quê ở một đêm!', titleChinese: '到鄉下住一晚！',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l6-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-6-1', traditional: '鄉下', pinyin: 'xiāngxià', zhuyin: 'ㄒㄧㄤ ㄒㄧㄚˋ', meaning: 'nông thôn, quê', partOfSpeech: 'danh từ', exampleSentence: '我想去鄉下住一晚。', exampleMeaning: 'Tôi muốn về quê ở một đêm.' },
          { id: 'w3-6-2', traditional: '農村', pinyin: 'nóngcūn', zhuyin: 'ㄋㄨㄥˊ ㄘㄨㄣ', meaning: 'làng quê', partOfSpeech: 'danh từ', exampleSentence: '農村生活很輕鬆。', exampleMeaning: 'Cuộc sống nông thôn rất thoải mái.' },
          { id: 'w3-6-3', traditional: '稻田', pinyin: 'dàotián', zhuyin: 'ㄉㄠˋ ㄊㄧㄢˊ', meaning: 'ruộng lúa', partOfSpeech: 'danh từ', exampleSentence: '稻田很美。', exampleMeaning: 'Ruộng lúa rất đẹp.' },
          { id: 'w3-6-4', traditional: '日出', pinyin: 'rìchū', zhuyin: 'ㄖˋ ㄔㄨ', meaning: 'bình minh', partOfSpeech: 'danh từ', exampleSentence: '我們去看日出吧。', exampleMeaning: 'Chúng ta đi xem bình minh đi.' },
          { id: 'w3-6-5', traditional: '寧靜', pinyin: 'níngjìng', zhuyin: 'ㄋㄧㄥˊ ㄐㄧㄥˋ', meaning: 'yên tĩnh', partOfSpeech: 'tính từ', exampleSentence: '鄉下很寧靜。', exampleMeaning: 'Quê rất yên tĩnh.' },
          { id: 'w3-6-6', traditional: '民宿', pinyin: 'mínsù', zhuyin: 'ㄇㄧㄣˊ ㄙㄨˋ', meaning: 'homestay', partOfSpeech: 'danh từ', exampleSentence: '我們住民宿。', exampleMeaning: 'Chúng tôi ở homestay.' },
          { id: 'w3-6-7', traditional: '體驗', pinyin: 'tǐyàn', zhuyin: 'ㄊㄧˇ ㄧㄢˋ', meaning: 'trải nghiệm', partOfSpeech: 'động từ/danh từ', exampleSentence: '體驗農村生活。', exampleMeaning: 'Trải nghiệm cuộc sống nông thôn.' },
          { id: 'w3-6-8', traditional: '純樸', pinyin: 'chúnpǔ', zhuyin: 'ㄔㄨㄣˊ ㄆㄨˇ', meaning: 'mộc mạc, chất phác', partOfSpeech: 'tính từ', exampleSentence: '鄉下人很純樸。', exampleMeaning: 'Người quê rất chất phác.' },
          { id: 'w3-6-9', traditional: '風景', pinyin: 'fēngjǐng', zhuyin: 'ㄈㄥ ㄐㄧㄥˇ', meaning: 'phong cảnh', partOfSpeech: 'danh từ', exampleSentence: '風景很漂亮。', exampleMeaning: 'Phong cảnh rất đẹp.' },
          { id: 'w3-6-10', traditional: '蟲', pinyin: 'chóng', zhuyin: 'ㄔㄨㄥˊ', meaning: 'côn trùng', partOfSpeech: 'danh từ', exampleSentence: '晚上有很多蟲。', exampleMeaning: 'Buổi tối có nhiều côn trùng.' },
          { id: 'w3-6-11', traditional: '螢火蟲', pinyin: 'yínghuǒchóng', zhuyin: 'ㄧㄥˊ ㄏㄨㄛˇ ㄔㄨㄥˊ', meaning: 'đom đóm', partOfSpeech: 'danh từ', exampleSentence: '螢火蟲很美。', exampleMeaning: 'Đom đóm rất đẹp.' },
          { id: 'w3-6-12', traditional: '放鬆', pinyin: 'fàngsōng', zhuyin: 'ㄈㄤˋ ㄙㄨㄥ', meaning: 'thư giãn', partOfSpeech: 'động từ', exampleSentence: '來鄉下放鬆一下。', exampleMeaning: 'Về quê thư giãn một chút.' },
          { id: 'w3-6-13', traditional: '收穫', pinyin: 'shōuhuò', zhuyin: 'ㄕㄡ ㄏㄨㄛˋ', meaning: 'thu hoạch', partOfSpeech: 'danh từ/động từ', exampleSentence: '秋天是收穫的季節。', exampleMeaning: 'Mùa thu là mùa thu hoạch.' },
          { id: 'w3-6-14', traditional: '懷念', pinyin: 'huáiniàn', zhuyin: 'ㄏㄨㄞˊ ㄋㄧㄢˋ', meaning: 'nhớ nhung', partOfSpeech: 'động từ', exampleSentence: '我很懷念鄉下。', exampleMeaning: 'Tôi rất nhớ quê.' },
        ],
      },
      {
        id: 'b3-l6-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-6-1', pattern: '一 + V + 就 + V (vừa...liền...)',
            explanation: '"一...就..." = vừa làm A thì ngay lập tức B xảy ra.',
            examples: [
              { sentence: '一到鄉下就覺得很放鬆。', pinyin: 'Yī dào xiāngxià jiù juéde hěn fàngsōng.', meaning: 'Vừa đến quê liền cảm thấy rất thư giãn.' },
              { sentence: '一看到螢火蟲就很開心。', pinyin: 'Yī kàndào yínghuǒchóng jiù hěn kāixīn.', meaning: 'Vừa thấy đom đóm liền rất vui.' },
            ],
          },
          {
            id: 'g3-6-2', pattern: '再也不/沒 (không bao giờ...nữa)',
            explanation: '"再也不/沒" = không bao giờ...nữa. Diễn tả sự dứt khoát.',
            examples: [
              { sentence: '我再也不想回城市了。', pinyin: 'Wǒ zài yě bù xiǎng huí chéngshì le.', meaning: 'Tôi không bao giờ muốn quay lại thành phố nữa.' },
              { sentence: '再也沒看過那麼美的風景。', pinyin: 'Zài yě méi kànguò nàme měi de fēngjǐng.', meaning: 'Chưa bao giờ thấy phong cảnh đẹp như vậy nữa.' },
            ],
          },
          {
            id: 'g3-6-3', pattern: '連...都/也... (ngay cả...cũng...)',
            explanation: '"連...都/也..." = ngay cả...cũng... Nhấn mạnh mức độ bất ngờ.',
            examples: [
              { sentence: '連小孩都喜歡鄉下。', pinyin: 'Lián xiǎohái dōu xǐhuān xiāngxià.', meaning: 'Ngay cả trẻ con cũng thích quê.' },
              { sentence: '連手機訊號也沒有。', pinyin: 'Lián shǒujī xùnhào yě méiyǒu.', meaning: 'Ngay cả sóng điện thoại cũng không có.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l6-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-6-1', type: 'multiple-choice', question: '"鄉下" nghĩa là gì?', options: ['thành phố', 'nông thôn', 'biển', 'núi'], correctAnswer: 'nông thôn' },
          { id: 'e3-6-2', type: 'multiple-choice', question: '"民宿" nghĩa là gì?', options: ['khách sạn', 'nhà hàng', 'homestay', 'resort'], correctAnswer: 'homestay' },
          { id: 'e3-6-3', type: 'multiple-choice', question: 'Chọn từ đúng: 一___鄉下就覺得很放鬆。', options: ['去', '到', '在', '來'], correctAnswer: '到' },
          { id: 'e3-6-4', type: 'matching', question: 'Nối từ nông thôn', options: ['稻田|ruộng lúa', '日出|bình minh', '螢火蟲|đom đóm', '風景|phong cảnh'], correctAnswer: ['稻田|ruộng lúa', '日出|bình minh', '螢火蟲|đom đóm', '風景|phong cảnh'] },
          { id: 'e3-6-5', type: 'sentence-order', question: 'Sắp xếp: "Ngay cả trẻ con cũng thích quê"', options: ['連', '小孩', '都', '喜歡', '鄉下'], correctAnswer: ['連', '小孩', '都', '喜歡', '鄉下'] },
          { id: 'e3-6-6', type: 'fill-blank', question: '我很___念鄉下。(Tôi rất nhớ quê)', correctAnswer: '懷' },
          { id: 'e3-6-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '農村生活很輕鬆', options: ['Cuộc sống nông thôn rất thoải mái', 'Cuộc sống thành phố rất thoải mái', 'Cuộc sống nông thôn rất khó khăn', 'Cuộc sống nông thôn rất bận'], correctAnswer: 'Cuộc sống nông thôn rất thoải mái' },
          { id: 'e3-6-8', type: 'multiple-choice', question: '"純樸" nghĩa là gì?', options: ['sang trọng', 'mộc mạc, chất phác', 'hiện đại', 'thời trang'], correctAnswer: 'mộc mạc, chất phác' },
          { id: 'e3-6-9', type: 'matching', question: 'Nối từ trải nghiệm', options: ['體驗|trải nghiệm', '放鬆|thư giãn', '收穫|thu hoạch', '寧靜|yên tĩnh'], correctAnswer: ['體驗|trải nghiệm', '放鬆|thư giãn', '收穫|thu hoạch', '寧靜|yên tĩnh'] },
          { id: 'e3-6-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '螢火蟲', options: ['稻田', '螢火蟲', '日出', '蟲'], correctAnswer: '螢火蟲' },
        ],
      },
      {
        id: 'b3-l6-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-6-1', type: 'multiple-choice', question: 'Phiên âm của "寧靜" là gì?', options: ['níngjìng', 'lìngjìng', 'níngjǐng', 'nìngjìng'], correctAnswer: 'níngjìng' },
          { id: 'r3-6-2', type: 'fill-blank', question: '一到鄉下___覺得很放鬆。(Vừa đến quê liền thấy thư giãn)', correctAnswer: '就' },
          { id: 'r3-6-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['鄉下|nông thôn', '民宿|homestay', '純樸|chất phác', '懷念|nhớ nhung'], correctAnswer: ['鄉下|nông thôn', '民宿|homestay', '純樸|chất phác', '懷念|nhớ nhung'] },
        ],
      },
    ],
  },

  // ===== BÀI 7: 我最親的家「人」 =====
  {
    id: 'b3-l7', number: 7, title: 'Người "nhà" thân nhất', titleChinese: '我最親的家「人」',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l7-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-7-1', traditional: '親', pinyin: 'qīn', zhuyin: 'ㄑㄧㄣ', meaning: 'thân thiết', partOfSpeech: 'tính từ', exampleSentence: '他跟爸爸最親。', exampleMeaning: 'Anh ấy thân nhất với bố.' },
          { id: 'w3-7-2', traditional: '寵物', pinyin: 'chǒngwù', zhuyin: 'ㄔㄨㄥˇ ㄨˋ', meaning: 'thú cưng', partOfSpeech: 'danh từ', exampleSentence: '我的寵物是一隻貓。', exampleMeaning: 'Thú cưng của tôi là một con mèo.' },
          { id: 'w3-7-3', traditional: '陪伴', pinyin: 'péibàn', zhuyin: 'ㄆㄟˊ ㄅㄢˋ', meaning: 'đồng hành, bầu bạn', partOfSpeech: 'động từ', exampleSentence: '寵物陪伴我長大。', exampleMeaning: 'Thú cưng bầu bạn tôi lớn lên.' },
          { id: 'w3-7-4', traditional: '照顧', pinyin: 'zhàogù', zhuyin: 'ㄓㄠˋ ㄍㄨˋ', meaning: 'chăm sóc', partOfSpeech: 'động từ', exampleSentence: '我要好好照顧牠。', exampleMeaning: 'Tôi phải chăm sóc nó thật tốt.' },
          { id: 'w3-7-5', traditional: '養', pinyin: 'yǎng', zhuyin: 'ㄧㄤˇ', meaning: 'nuôi', partOfSpeech: 'động từ', exampleSentence: '你養了幾隻狗？', exampleMeaning: 'Bạn nuôi mấy con chó?' },
          { id: 'w3-7-6', traditional: '忠心', pinyin: 'zhōngxīn', zhuyin: 'ㄓㄨㄥ ㄒㄧㄣ', meaning: 'trung thành', partOfSpeech: 'tính từ', exampleSentence: '狗很忠心。', exampleMeaning: 'Chó rất trung thành.' },
          { id: 'w3-7-7', traditional: '撒嬌', pinyin: 'sājiāo', zhuyin: 'ㄙㄚ ㄐㄧㄠ', meaning: 'nũng nịu', partOfSpeech: 'động từ', exampleSentence: '貓喜歡撒嬌。', exampleMeaning: 'Mèo thích nũng nịu.' },
          { id: 'w3-7-8', traditional: '感情', pinyin: 'gǎnqíng', zhuyin: 'ㄍㄢˇ ㄑㄧㄥˊ', meaning: 'tình cảm', partOfSpeech: 'danh từ', exampleSentence: '我們的感情很好。', exampleMeaning: 'Tình cảm chúng tôi rất tốt.' },
          { id: 'w3-7-9', traditional: '捨不得', pinyin: 'shěbùdé', zhuyin: 'ㄕㄜˇ ㄅㄨˋ ㄉㄜˊ', meaning: 'không nỡ, luyến tiếc', partOfSpeech: 'động từ', exampleSentence: '我捨不得離開。', exampleMeaning: 'Tôi không nỡ rời đi.' },
          { id: 'w3-7-10', traditional: '領養', pinyin: 'lǐngyǎng', zhuyin: 'ㄌㄧㄥˇ ㄧㄤˇ', meaning: 'nhận nuôi', partOfSpeech: 'động từ', exampleSentence: '我領養了一隻狗。', exampleMeaning: 'Tôi nhận nuôi một con chó.' },
          { id: 'w3-7-11', traditional: '流浪', pinyin: 'liúlàng', zhuyin: 'ㄌㄧㄡˊ ㄌㄤˋ', meaning: 'lang thang, hoang', partOfSpeech: 'động từ', exampleSentence: '這是一隻流浪貓。', exampleMeaning: 'Đây là một con mèo hoang.' },
          { id: 'w3-7-12', traditional: '責任', pinyin: 'zérèn', zhuyin: 'ㄗㄜˊ ㄖㄣˋ', meaning: 'trách nhiệm', partOfSpeech: 'danh từ', exampleSentence: '養寵物是一種責任。', exampleMeaning: 'Nuôi thú cưng là một loại trách nhiệm.' },
          { id: 'w3-7-13', traditional: '生命', pinyin: 'shēngmìng', zhuyin: 'ㄕㄥ ㄇㄧㄥˋ', meaning: 'sinh mệnh, cuộc sống', partOfSpeech: 'danh từ', exampleSentence: '每個生命都很重要。', exampleMeaning: 'Mỗi sinh mệnh đều rất quan trọng.' },
          { id: 'w3-7-14', traditional: '可愛', pinyin: 'kěài', zhuyin: 'ㄎㄜˇ ㄞˋ', meaning: 'đáng yêu', partOfSpeech: 'tính từ', exampleSentence: '這隻貓很可愛。', exampleMeaning: 'Con mèo này rất đáng yêu.' },
        ],
      },
      {
        id: 'b3-l7-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-7-1', pattern: '自從...以後，就... (từ khi...thì...)',
            explanation: '"自從...以後，就..." = từ khi...thì bắt đầu... Diễn tả thay đổi sau một mốc thời gian.',
            examples: [
              { sentence: '自從養了貓以後，就不覺得孤單了。', pinyin: 'Zìcóng yǎngle māo yǐhòu, jiù bù juéde gūdān le.', meaning: 'Từ khi nuôi mèo, thì không còn thấy cô đơn nữa.' },
              { sentence: '自從領養牠以後，生活就不一樣了。', pinyin: 'Zìcóng lǐngyǎng tā yǐhòu, shēnghuó jiù bù yīyàng le.', meaning: 'Từ khi nhận nuôi nó, cuộc sống đã khác đi.' },
            ],
          },
          {
            id: 'g3-7-2', pattern: '對...來說 (đối với...mà nói)',
            explanation: '"對...來說" = đối với...mà nói. Đưa ra góc nhìn của ai đó.',
            examples: [
              { sentence: '對我來說，寵物就是家人。', pinyin: 'Duì wǒ lái shuō, chǒngwù jiùshì jiārén.', meaning: 'Đối với tôi mà nói, thú cưng chính là người nhà.' },
              { sentence: '對牠來說，我就是全世界。', pinyin: 'Duì tā lái shuō, wǒ jiùshì quán shìjiè.', meaning: 'Đối với nó mà nói, tôi chính là cả thế giới.' },
            ],
          },
          {
            id: 'g3-7-3', pattern: '...的話 (nếu...thì)',
            explanation: '"...的話" đặt sau điều kiện, nghĩa = nếu...thì...',
            examples: [
              { sentence: '想養寵物的話，要有責任心。', pinyin: 'Xiǎng yǎng chǒngwù de huà, yào yǒu zérènxīn.', meaning: 'Nếu muốn nuôi thú cưng, phải có trách nhiệm.' },
              { sentence: '不想養的話，可以領養代替購買。', pinyin: 'Bù xiǎng yǎng de huà, kěyǐ lǐngyǎng dàitì gòumǎi.', meaning: 'Nếu không muốn mua, có thể nhận nuôi thay vì mua.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l7-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-7-1', type: 'multiple-choice', question: '"寵物" nghĩa là gì?', options: ['bạn bè', 'thú cưng', 'đồ chơi', 'gia đình'], correctAnswer: 'thú cưng' },
          { id: 'e3-7-2', type: 'multiple-choice', question: '"捨不得" nghĩa là gì?', options: ['rất vui', 'không nỡ', 'không thích', 'rất sợ'], correctAnswer: 'không nỡ' },
          { id: 'e3-7-3', type: 'multiple-choice', question: 'Chọn từ đúng: 自從養了貓___後，就不覺得孤單了。', options: ['之', '以', '了', '的'], correctAnswer: '以' },
          { id: 'e3-7-4', type: 'matching', question: 'Nối từ thú cưng', options: ['陪伴|bầu bạn', '照顧|chăm sóc', '領養|nhận nuôi', '忠心|trung thành'], correctAnswer: ['陪伴|bầu bạn', '照顧|chăm sóc', '領養|nhận nuôi', '忠心|trung thành'] },
          { id: 'e3-7-5', type: 'sentence-order', question: 'Sắp xếp: "Đối với tôi, thú cưng chính là người nhà"', options: ['對', '我', '來說', '寵物', '就是', '家人'], correctAnswer: ['對', '我', '來說', '寵物', '就是', '家人'] },
          { id: 'e3-7-6', type: 'fill-blank', question: '養寵物是一種___任。(Nuôi thú cưng là một loại trách nhiệm)', correctAnswer: '責' },
          { id: 'e3-7-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '我捨不得離開', options: ['Tôi rất muốn đi', 'Tôi không nỡ rời đi', 'Tôi phải đi', 'Tôi không thể đi'], correctAnswer: 'Tôi không nỡ rời đi' },
          { id: 'e3-7-8', type: 'multiple-choice', question: '"流浪" nghĩa là gì?', options: ['nuôi', 'lang thang', 'chạy', 'bay'], correctAnswer: 'lang thang' },
          { id: 'e3-7-9', type: 'matching', question: 'Nối từ tình cảm', options: ['感情|tình cảm', '撒嬌|nũng nịu', '可愛|đáng yêu', '生命|sinh mệnh'], correctAnswer: ['感情|tình cảm', '撒嬌|nũng nịu', '可愛|đáng yêu', '生命|sinh mệnh'] },
          { id: 'e3-7-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '寵物', options: ['陪伴', '寵物', '照顧', '領養'], correctAnswer: '寵物' },
        ],
      },
      {
        id: 'b3-l7-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-7-1', type: 'multiple-choice', question: 'Phiên âm của "領養" là gì?', options: ['lǐngyǎng', 'língyǎng', 'lǐngyàng', 'lǐngyāng'], correctAnswer: 'lǐngyǎng' },
          { id: 'r3-7-2', type: 'fill-blank', question: '對我___說，寵物就是家人。(Đối với tôi, thú cưng là người nhà)', correctAnswer: '來' },
          { id: 'r3-7-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['養|nuôi', '捨不得|không nỡ', '責任|trách nhiệm', '流浪|lang thang'], correctAnswer: ['養|nuôi', '捨不得|không nỡ', '責任|trách nhiệm', '流浪|lang thang'] },
        ],
      },
    ],
  },

  // ===== BÀI 8: 我想做自己 =====
  {
    id: 'b3-l8', number: 8, title: 'Tôi muốn là chính mình', titleChinese: '我想做自己',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l8-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-8-1', traditional: '自己', pinyin: 'zìjǐ', zhuyin: 'ㄗˋ ㄐㄧˇ', meaning: 'bản thân, chính mình', partOfSpeech: 'đại từ', exampleSentence: '我想做自己。', exampleMeaning: 'Tôi muốn là chính mình.' },
          { id: 'w3-8-2', traditional: '價值觀', pinyin: 'jiàzhíguān', zhuyin: 'ㄐㄧㄚˋ ㄓˊ ㄍㄨㄢ', meaning: 'giá trị quan, quan điểm giá trị', partOfSpeech: 'danh từ', exampleSentence: '每個人的價值觀不同。', exampleMeaning: 'Giá trị quan mỗi người đều khác.' },
          { id: 'w3-8-3', traditional: '個性', pinyin: 'gèxìng', zhuyin: 'ㄍㄜˋ ㄒㄧㄥˋ', meaning: 'cá tính', partOfSpeech: 'danh từ', exampleSentence: '他的個性很開朗。', exampleMeaning: 'Anh ấy có cá tính rất cởi mở.' },
          { id: 'w3-8-4', traditional: '勇氣', pinyin: 'yǒngqì', zhuyin: 'ㄩㄥˇ ㄑㄧˋ', meaning: 'dũng khí', partOfSpeech: 'danh từ', exampleSentence: '做自己需要勇氣。', exampleMeaning: 'Là chính mình cần dũng khí.' },
          { id: 'w3-8-5', traditional: '堅持', pinyin: 'jiānchí', zhuyin: 'ㄐㄧㄢ ㄔˊ', meaning: 'kiên trì', partOfSpeech: 'động từ', exampleSentence: '你要堅持你的夢想。', exampleMeaning: 'Bạn phải kiên trì với giấc mơ.' },
          { id: 'w3-8-6', traditional: '壓力', pinyin: 'yālì', zhuyin: 'ㄧㄚ ㄌㄧˋ', meaning: 'áp lực', partOfSpeech: 'danh từ', exampleSentence: '社會壓力很大。', exampleMeaning: 'Áp lực xã hội rất lớn.' },
          { id: 'w3-8-7', traditional: '期待', pinyin: 'qīdài', zhuyin: 'ㄑㄧ ㄉㄞˋ', meaning: 'kỳ vọng', partOfSpeech: 'danh từ/động từ', exampleSentence: '不要太在意別人的期待。', exampleMeaning: 'Đừng quá để ý kỳ vọng của người khác.' },
          { id: 'w3-8-8', traditional: '獨立', pinyin: 'dúlì', zhuyin: 'ㄉㄨˊ ㄌㄧˋ', meaning: 'độc lập', partOfSpeech: 'tính từ', exampleSentence: '她很獨立。', exampleMeaning: 'Cô ấy rất độc lập.' },
          { id: 'w3-8-9', traditional: '自信', pinyin: 'zìxìn', zhuyin: 'ㄗˋ ㄒㄧㄣˋ', meaning: 'tự tin', partOfSpeech: 'danh từ/tính từ', exampleSentence: '要對自己有自信。', exampleMeaning: 'Phải tự tin vào bản thân.' },
          { id: 'w3-8-10', traditional: '比較', pinyin: 'bǐjiào', zhuyin: 'ㄅㄧˇ ㄐㄧㄠˋ', meaning: 'so sánh', partOfSpeech: 'động từ/phó từ', exampleSentence: '不要跟別人比較。', exampleMeaning: 'Đừng so sánh với người khác.' },
          { id: 'w3-8-11', traditional: '羡慕', pinyin: 'xiànmù', zhuyin: 'ㄒㄧㄢˋ ㄇㄨˋ', meaning: 'ngưỡng mộ', partOfSpeech: 'động từ', exampleSentence: '不要羡慕別人。', exampleMeaning: 'Đừng ngưỡng mộ người khác.' },
          { id: 'w3-8-12', traditional: '接受', pinyin: 'jiēshòu', zhuyin: 'ㄐㄧㄝ ㄕㄡˋ', meaning: 'chấp nhận', partOfSpeech: 'động từ', exampleSentence: '接受自己的缺點。', exampleMeaning: 'Chấp nhận khuyết điểm của bản thân.' },
          { id: 'w3-8-13', traditional: '缺點', pinyin: 'quēdiǎn', zhuyin: 'ㄑㄩㄝ ㄉㄧㄢˇ', meaning: 'khuyết điểm', partOfSpeech: 'danh từ', exampleSentence: '每個人都有缺點。', exampleMeaning: 'Mỗi người đều có khuyết điểm.' },
          { id: 'w3-8-14', traditional: '優點', pinyin: 'yōudiǎn', zhuyin: 'ㄧㄡ ㄉㄧㄢˇ', meaning: 'ưu điểm', partOfSpeech: 'danh từ', exampleSentence: '多看自己的優點。', exampleMeaning: 'Hãy nhìn nhiều hơn vào ưu điểm của mình.' },
        ],
      },
      {
        id: 'b3-l8-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-8-1', pattern: '既然...就... (đã...thì...)',
            explanation: '"既然...就..." = đã...thì nên... Diễn tả kết luận logic từ một tiền đề.',
            examples: [
              { sentence: '既然想做自己，就不要在意別人。', pinyin: 'Jìrán xiǎng zuò zìjǐ, jiù búyào zàiyì biérén.', meaning: 'Đã muốn là chính mình, thì đừng để ý người khác.' },
              { sentence: '既然選了這條路，就要堅持走下去。', pinyin: 'Jìrán xuǎnle zhè tiáo lù, jiù yào jiānchí zǒu xiàqù.', meaning: 'Đã chọn con đường này, thì phải kiên trì đi tiếp.' },
            ],
          },
          {
            id: 'g3-8-2', pattern: '無論/不論...都... (bất luận...đều...)',
            explanation: '"無論/不論...都..." = bất luận...đều... Mạnh hơn "不管".',
            examples: [
              { sentence: '無論別人怎麼說，我都要做自己。', pinyin: 'Wúlùn biérén zěnme shuō, wǒ dōu yào zuò zìjǐ.', meaning: 'Bất luận người khác nói gì, tôi đều phải là chính mình.' },
              { sentence: '不論結果如何，都不後悔。', pinyin: 'Búlùn jiéguǒ rúhé, dōu bú hòuhuǐ.', meaning: 'Bất luận kết quả thế nào, đều không hối hận.' },
            ],
          },
          {
            id: 'g3-8-3', pattern: '與其...不如... (thà...còn hơn...)',
            explanation: '"與其...不如..." = thà B còn hơn A. So sánh và lựa chọn.',
            examples: [
              { sentence: '與其羡慕別人，不如做好自己。', pinyin: 'Yǔqí xiànmù biérén, bùrú zuòhǎo zìjǐ.', meaning: 'Thà làm tốt bản thân, còn hơn ngưỡng mộ người khác.' },
              { sentence: '與其抱怨，不如改變。', pinyin: 'Yǔqí bàoyuàn, bùrú gǎibiàn.', meaning: 'Thà thay đổi, còn hơn than phiền.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l8-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-8-1', type: 'multiple-choice', question: '"價值觀" nghĩa là gì?', options: ['giá cả', 'quan điểm giá trị', 'đánh giá', 'giá trị vật chất'], correctAnswer: 'quan điểm giá trị' },
          { id: 'e3-8-2', type: 'multiple-choice', question: '"勇氣" nghĩa là gì?', options: ['sức mạnh', 'dũng khí', 'thông minh', 'tài năng'], correctAnswer: 'dũng khí' },
          { id: 'e3-8-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___然想做自己，就不要在意別人。', options: ['既', '雖', '因', '如'], correctAnswer: '既' },
          { id: 'e3-8-4', type: 'matching', question: 'Nối từ bản thân', options: ['堅持|kiên trì', '獨立|độc lập', '自信|tự tin', '接受|chấp nhận'], correctAnswer: ['堅持|kiên trì', '獨立|độc lập', '自信|tự tin', '接受|chấp nhận'] },
          { id: 'e3-8-5', type: 'sentence-order', question: 'Sắp xếp: "Bất luận người khác nói gì, tôi đều phải là chính mình"', options: ['無論', '別人', '怎麼說', '我', '都要', '做自己'], correctAnswer: ['無論', '別人', '怎麼說', '我', '都要', '做自己'] },
          { id: 'e3-8-6', type: 'fill-blank', question: '做自己需要___氣。(Là chính mình cần dũng khí)', correctAnswer: '勇' },
          { id: 'e3-8-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '接受自己的缺點', options: ['Chấp nhận khuyết điểm của bản thân', 'Thay đổi khuyết điểm', 'Giấu khuyết điểm', 'Không có khuyết điểm'], correctAnswer: 'Chấp nhận khuyết điểm của bản thân' },
          { id: 'e3-8-8', type: 'multiple-choice', question: '"個性" nghĩa là gì?', options: ['ngoại hình', 'cá tính', 'tuổi tác', 'nghề nghiệp'], correctAnswer: 'cá tính' },
          { id: 'e3-8-9', type: 'matching', question: 'Nối từ trái nghĩa', options: ['優點|ưu điểm', '缺點|khuyết điểm', '壓力|áp lực', '期待|kỳ vọng'], correctAnswer: ['優點|ưu điểm', '缺點|khuyết điểm', '壓力|áp lực', '期待|kỳ vọng'] },
          { id: 'e3-8-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '堅持', options: ['勇氣', '堅持', '獨立', '自信'], correctAnswer: '堅持' },
        ],
      },
      {
        id: 'b3-l8-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-8-1', type: 'multiple-choice', question: 'Phiên âm của "勇氣" là gì?', options: ['yǒngqì', 'yōngqì', 'yǒngqí', 'yòngqì'], correctAnswer: 'yǒngqì' },
          { id: 'r3-8-2', type: 'fill-blank', question: '與其羡慕別人，___如做好自己。(Thà làm tốt bản thân còn hơn)', correctAnswer: '不' },
          { id: 'r3-8-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['價值觀|giá trị quan', '個性|cá tính', '比較|so sánh', '堅持|kiên trì'], correctAnswer: ['價值觀|giá trị quan', '個性|cá tính', '比較|so sánh', '堅持|kiên trì'] },
        ],
      },
    ],
  },
  // ===== BÀI 9: 網購時代 =====
  {
    id: 'b3-l9', number: 9, title: 'Thời đại mua sắm trực tuyến', titleChinese: '網購時代',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l9-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-9-1', traditional: '網購', pinyin: 'wǎnggòu', zhuyin: 'ㄨㄤˇ ㄍㄡˋ', meaning: 'mua sắm trực tuyến', partOfSpeech: 'động từ', exampleSentence: '現在大家都喜歡網購。', exampleMeaning: 'Bây giờ mọi người đều thích mua sắm trực tuyến.' },
          { id: 'w3-9-2', traditional: '下單', pinyin: 'xiàdān', zhuyin: 'ㄒㄧㄚˋ ㄉㄢ', meaning: 'đặt hàng', partOfSpeech: 'động từ', exampleSentence: '我已經下單了。', exampleMeaning: 'Tôi đã đặt hàng rồi.' },
          { id: 'w3-9-3', traditional: '宅配', pinyin: 'zháipèi', zhuyin: 'ㄓㄞˊ ㄆㄟˋ', meaning: 'giao hàng tận nhà', partOfSpeech: 'danh từ', exampleSentence: '可以選擇宅配。', exampleMeaning: 'Có thể chọn giao hàng tận nhà.' },
          { id: 'w3-9-4', traditional: '超商', pinyin: 'chāoshāng', zhuyin: 'ㄔㄠ ㄕㄤ', meaning: 'cửa hàng tiện lợi', partOfSpeech: 'danh từ', exampleSentence: '去超商取貨。', exampleMeaning: 'Đến cửa hàng tiện lợi lấy hàng.' },
          { id: 'w3-9-5', traditional: '取貨', pinyin: 'qǔhuò', zhuyin: 'ㄑㄩˇ ㄏㄨㄛˋ', meaning: 'lấy hàng', partOfSpeech: 'động từ', exampleSentence: '明天去取貨。', exampleMeaning: 'Ngày mai đi lấy hàng.' },
          { id: 'w3-9-6', traditional: '退貨', pinyin: 'tuìhuò', zhuyin: 'ㄊㄨㄟˋ ㄏㄨㄛˋ', meaning: 'trả hàng', partOfSpeech: 'động từ', exampleSentence: '這個可以退貨嗎？', exampleMeaning: 'Cái này có thể trả hàng không?' },
          { id: 'w3-9-7', traditional: '評價', pinyin: 'píngjià', zhuyin: 'ㄆㄧㄥˊ ㄐㄧㄚˋ', meaning: 'đánh giá', partOfSpeech: 'danh từ', exampleSentence: '這個賣家評價很好。', exampleMeaning: 'Người bán này đánh giá rất tốt.' },
          { id: 'w3-9-8', traditional: '賣家', pinyin: 'màijiā', zhuyin: 'ㄇㄞˋ ㄐㄧㄚ', meaning: 'người bán', partOfSpeech: 'danh từ', exampleSentence: '賣家回覆很快。', exampleMeaning: 'Người bán trả lời rất nhanh.' },
          { id: 'w3-9-9', traditional: '買家', pinyin: 'mǎijiā', zhuyin: 'ㄇㄞˇ ㄐㄧㄚ', meaning: 'người mua', partOfSpeech: 'danh từ', exampleSentence: '買家可以給評價。', exampleMeaning: 'Người mua có thể đánh giá.' },
          { id: 'w3-9-10', traditional: '折扣', pinyin: 'zhékòu', zhuyin: 'ㄓㄜˊ ㄎㄡˋ', meaning: 'giảm giá', partOfSpeech: 'danh từ', exampleSentence: '今天有折扣。', exampleMeaning: 'Hôm nay có giảm giá.' },
          { id: 'w3-9-11', traditional: '免運', pinyin: 'miǎnyùn', zhuyin: 'ㄇㄧㄢˇ ㄩㄣˋ', meaning: 'miễn phí vận chuyển', partOfSpeech: 'danh từ', exampleSentence: '滿五百免運。', exampleMeaning: 'Mua đủ 500 miễn phí vận chuyển.' },
          { id: 'w3-9-12', traditional: '付款', pinyin: 'fùkuǎn', zhuyin: 'ㄈㄨˋ ㄎㄨㄢˇ', meaning: 'thanh toán', partOfSpeech: 'động từ', exampleSentence: '你要怎麼付款？', exampleMeaning: 'Bạn muốn thanh toán thế nào?' },
          { id: 'w3-9-13', traditional: '刷卡', pinyin: 'shuākǎ', zhuyin: 'ㄕㄨㄚ ㄎㄚˇ', meaning: 'quẹt thẻ', partOfSpeech: 'động từ', exampleSentence: '可以刷卡嗎？', exampleMeaning: 'Có thể quẹt thẻ không?' },
          { id: 'w3-9-14', traditional: '方便', pinyin: 'fāngbiàn', zhuyin: 'ㄈㄤ ㄅㄧㄢˋ', meaning: 'tiện lợi', partOfSpeech: 'tính từ', exampleSentence: '網購很方便。', exampleMeaning: 'Mua sắm online rất tiện lợi.' },
        ],
      },
      {
        id: 'b3-l9-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-9-1', pattern: '隨著...，... (theo sự...thì...)',
            explanation: '"隨著" = theo sự, cùng với. Diễn tả sự thay đổi song song.',
            examples: [
              { sentence: '隨著科技發展，網購越來越方便。', pinyin: 'Suízhe kējì fāzhǎn, wǎnggòu yuèláiyuè fāngbiàn.', meaning: 'Theo sự phát triển công nghệ, mua sắm online càng ngày càng tiện.' },
              { sentence: '隨著時間過去，習慣就改變了。', pinyin: 'Suízhe shíjiān guòqù, xíguàn jiù gǎibiàn le.', meaning: 'Theo thời gian trôi qua, thói quen cũng thay đổi.' },
            ],
          },
          {
            id: 'g3-9-2', pattern: '不見得 (chưa chắc)',
            explanation: '"不見得" = chưa chắc, không hẳn. Biểu thị sự không chắc chắn.',
            examples: [
              { sentence: '便宜的東西不見得不好。', pinyin: 'Piányi de dōngxi bújiàndé bù hǎo.', meaning: 'Đồ rẻ chưa chắc đã không tốt.' },
              { sentence: '網購不見得比較便宜。', pinyin: 'Wǎnggòu bújiàndé bǐjiào piányi.', meaning: 'Mua online chưa chắc đã rẻ hơn.' },
            ],
          },
          {
            id: 'g3-9-3', pattern: '不如 (không bằng, chi bằng)',
            explanation: '"不如" = không bằng. Dùng để so sánh hoặc đưa ra đề xuất.',
            examples: [
              { sentence: '在店裡買不如在網路上買。', pinyin: 'Zài diànlǐ mǎi bùrú zài wǎnglù shàng mǎi.', meaning: 'Mua ở cửa hàng không bằng mua trên mạng.' },
              { sentence: '與其等，不如自己去取。', pinyin: 'Yǔqí děng, bùrú zìjǐ qù qǔ.', meaning: 'Thà tự đi lấy, còn hơn đợi.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l9-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-9-1', type: 'multiple-choice', question: '"網購" nghĩa là gì?', options: ['mua sắm trực tuyến', 'lướt web', 'chơi game', 'gửi email'], correctAnswer: 'mua sắm trực tuyến' },
          { id: 'e3-9-2', type: 'multiple-choice', question: '"退貨" nghĩa là gì?', options: ['đặt hàng', 'lấy hàng', 'trả hàng', 'giao hàng'], correctAnswer: 'trả hàng' },
          { id: 'e3-9-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___著科技發展，網購越來越方便。', options: ['跟', '隨', '因', '和'], correctAnswer: '隨' },
          { id: 'e3-9-4', type: 'matching', question: 'Nối từ mua sắm', options: ['下單|đặt hàng', '取貨|lấy hàng', '付款|thanh toán', '刷卡|quẹt thẻ'], correctAnswer: ['下單|đặt hàng', '取貨|lấy hàng', '付款|thanh toán', '刷卡|quẹt thẻ'] },
          { id: 'e3-9-5', type: 'sentence-order', question: 'Sắp xếp: "Đồ rẻ chưa chắc đã không tốt"', options: ['便宜的', '東西', '不見得', '不好'], correctAnswer: ['便宜的', '東西', '不見得', '不好'] },
          { id: 'e3-9-6', type: 'fill-blank', question: '滿五百___運。(Mua đủ 500 miễn phí vận chuyển)', correctAnswer: '免' },
          { id: 'e3-9-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '賣家評價很好', options: ['Người bán đánh giá rất tốt', 'Người mua đánh giá rất tốt', 'Sản phẩm rất tốt', 'Giá rất rẻ'], correctAnswer: 'Người bán đánh giá rất tốt' },
          { id: 'e3-9-8', type: 'multiple-choice', question: '"宅配" nghĩa là gì?', options: ['giao hàng tận nhà', 'đặt hàng', 'lấy hàng tại cửa hàng', 'trả hàng'], correctAnswer: 'giao hàng tận nhà' },
          { id: 'e3-9-9', type: 'matching', question: 'Nối từ giao dịch', options: ['賣家|người bán', '買家|người mua', '評價|đánh giá', '折扣|giảm giá'], correctAnswer: ['賣家|người bán', '買家|người mua', '評價|đánh giá', '折扣|giảm giá'] },
          { id: 'e3-9-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '免運', options: ['付款', '免運', '折扣', '退貨'], correctAnswer: '免運' },
        ],
      },
      {
        id: 'b3-l9-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-9-1', type: 'multiple-choice', question: 'Phiên âm của "評價" là gì?', options: ['píngjià', 'pìngjià', 'píngjiā', 'píngjia'], correctAnswer: 'píngjià' },
          { id: 'r3-9-2', type: 'fill-blank', question: '網購___見得比較便宜。(Mua online chưa chắc rẻ hơn)', correctAnswer: '不' },
          { id: 'r3-9-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['網購|mua online', '下單|đặt hàng', '退貨|trả hàng', '方便|tiện lợi'], correctAnswer: ['網購|mua online', '下單|đặt hàng', '退貨|trả hàng', '方便|tiện lợi'] },
        ],
      },
    ],
  },

  // ===== BÀI 10: 我住院了 =====
  {
    id: 'b3-l10', number: 10, title: 'Tôi nhập viện rồi', titleChinese: '我住院了',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l10-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-10-1', traditional: '住院', pinyin: 'zhùyuàn', zhuyin: 'ㄓㄨˋ ㄩㄢˋ', meaning: 'nhập viện', partOfSpeech: 'động từ', exampleSentence: '他住院了。', exampleMeaning: 'Anh ấy nhập viện rồi.' },
          { id: 'w3-10-2', traditional: '出院', pinyin: 'chūyuàn', zhuyin: 'ㄔㄨ ㄩㄢˋ', meaning: 'xuất viện', partOfSpeech: 'động từ', exampleSentence: '他明天出院。', exampleMeaning: 'Anh ấy ngày mai xuất viện.' },
          { id: 'w3-10-3', traditional: '手術', pinyin: 'shǒushù', zhuyin: 'ㄕㄡˇ ㄕㄨˋ', meaning: 'phẫu thuật', partOfSpeech: 'danh từ', exampleSentence: '他要動手術。', exampleMeaning: 'Anh ấy phải phẫu thuật.' },
          { id: 'w3-10-4', traditional: '護士', pinyin: 'hùshì', zhuyin: 'ㄏㄨˋ ㄕˋ', meaning: 'y tá', partOfSpeech: 'danh từ', exampleSentence: '護士很親切。', exampleMeaning: 'Y tá rất thân thiện.' },
          { id: 'w3-10-5', traditional: '病房', pinyin: 'bìngfáng', zhuyin: 'ㄅㄧㄥˋ ㄈㄤˊ', meaning: 'phòng bệnh', partOfSpeech: 'danh từ', exampleSentence: '他住在三樓病房。', exampleMeaning: 'Anh ấy ở phòng bệnh tầng 3.' },
          { id: 'w3-10-6', traditional: '掛號', pinyin: 'guàhào', zhuyin: 'ㄍㄨㄚˋ ㄏㄠˋ', meaning: 'đăng ký khám', partOfSpeech: 'động từ', exampleSentence: '先去掛號。', exampleMeaning: 'Đi đăng ký khám trước.' },
          { id: 'w3-10-7', traditional: '急診', pinyin: 'jízhěn', zhuyin: 'ㄐㄧˊ ㄓㄣˇ', meaning: 'cấp cứu', partOfSpeech: 'danh từ', exampleSentence: '他被送去急診。', exampleMeaning: 'Anh ấy bị đưa đến phòng cấp cứu.' },
          { id: 'w3-10-8', traditional: '檢查', pinyin: 'jiǎnchá', zhuyin: 'ㄐㄧㄢˇ ㄔㄚˊ', meaning: 'kiểm tra', partOfSpeech: 'động từ', exampleSentence: '醫生要檢查一下。', exampleMeaning: 'Bác sĩ phải kiểm tra một chút.' },
          { id: 'w3-10-9', traditional: '打針', pinyin: 'dǎzhēn', zhuyin: 'ㄉㄚˇ ㄓㄣ', meaning: 'tiêm', partOfSpeech: 'động từ', exampleSentence: '護士幫他打針。', exampleMeaning: 'Y tá tiêm cho anh ấy.' },
          { id: 'w3-10-10', traditional: '開刀', pinyin: 'kāidāo', zhuyin: 'ㄎㄞ ㄉㄠ', meaning: 'mổ', partOfSpeech: 'động từ', exampleSentence: '需要開刀。', exampleMeaning: 'Cần phải mổ.' },
          { id: 'w3-10-11', traditional: '恢復', pinyin: 'huīfù', zhuyin: 'ㄏㄨㄟ ㄈㄨˋ', meaning: 'hồi phục', partOfSpeech: 'động từ', exampleSentence: '他恢復得很快。', exampleMeaning: 'Anh ấy hồi phục rất nhanh.' },
          { id: 'w3-10-12', traditional: '保險', pinyin: 'bǎoxiǎn', zhuyin: 'ㄅㄠˇ ㄒㄧㄢˇ', meaning: 'bảo hiểm', partOfSpeech: 'danh từ', exampleSentence: '你有保險嗎？', exampleMeaning: 'Bạn có bảo hiểm không?' },
          { id: 'w3-10-13', traditional: '探病', pinyin: 'tànbìng', zhuyin: 'ㄊㄢˋ ㄅㄧㄥˋ', meaning: 'thăm bệnh', partOfSpeech: 'động từ', exampleSentence: '我們去探病吧。', exampleMeaning: 'Chúng ta đi thăm bệnh đi.' },
          { id: 'w3-10-14', traditional: '康復', pinyin: 'kāngfù', zhuyin: 'ㄎㄤ ㄈㄨˋ', meaning: 'khỏi bệnh', partOfSpeech: 'động từ', exampleSentence: '祝你早日康復。', exampleMeaning: 'Chúc bạn sớm khỏi bệnh.' },
        ],
      },
      {
        id: 'b3-l10-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-10-1', pattern: '幸好/幸虧... (may mà...)',
            explanation: '"幸好/幸虧" = may mà, may là. Diễn tả kết quả tốt nhờ may mắn.',
            examples: [
              { sentence: '幸好送醫院送得及時。', pinyin: 'Xìnghǎo sòng yīyuàn sòng de jíshí.', meaning: 'May mà đưa đến bệnh viện kịp thời.' },
              { sentence: '幸虧有保險，不用付太多錢。', pinyin: 'Xìngkuī yǒu bǎoxiǎn, búyòng fù tài duō qián.', meaning: 'May mà có bảo hiểm, không phải trả quá nhiều tiền.' },
            ],
          },
          {
            id: 'g3-10-2', pattern: '要不是...就... (nếu không phải...thì đã...)',
            explanation: '"要不是...就..." = nếu không phải...thì đã... Giả định ngược.',
            examples: [
              { sentence: '要不是你幫忙，我就來不及了。', pinyin: 'Yàobúshì nǐ bāngmáng, wǒ jiù láibùjí le.', meaning: 'Nếu không phải bạn giúp, tôi đã không kịp rồi.' },
              { sentence: '要不是有護士照顧，他就更嚴重了。', pinyin: 'Yàobúshì yǒu hùshì zhàogù, tā jiù gèng yánzhòng le.', meaning: 'Nếu không có y tá chăm sóc, anh ấy đã nặng hơn.' },
            ],
          },
          {
            id: 'g3-10-3', pattern: '越...越... (càng...càng...)',
            explanation: '"越...越..." = càng...càng... Hai sự việc tăng/giảm cùng nhau.',
            examples: [
              { sentence: '越休息越好。', pinyin: 'Yuè xiūxi yuè hǎo.', meaning: 'Càng nghỉ ngơi càng tốt.' },
              { sentence: '越擔心越睡不著。', pinyin: 'Yuè dānxīn yuè shuìbùzháo.', meaning: 'Càng lo lắng càng ngủ không được.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l10-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-10-1', type: 'multiple-choice', question: '"住院" nghĩa là gì?', options: ['nhập viện', 'xuất viện', 'khám bệnh', 'nghỉ ngơi'], correctAnswer: 'nhập viện' },
          { id: 'e3-10-2', type: 'multiple-choice', question: '"急診" nghĩa là gì?', options: ['khám thường', 'cấp cứu', 'nha khoa', 'mắt'], correctAnswer: 'cấp cứu' },
          { id: 'e3-10-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___好送醫院送得及時。(May mà đưa đến bệnh viện kịp)', options: ['幸', '好', '很', '太'], correctAnswer: '幸' },
          { id: 'e3-10-4', type: 'matching', question: 'Nối từ bệnh viện', options: ['掛號|đăng ký khám', '打針|tiêm', '手術|phẫu thuật', '病房|phòng bệnh'], correctAnswer: ['掛號|đăng ký khám', '打針|tiêm', '手術|phẫu thuật', '病房|phòng bệnh'] },
          { id: 'e3-10-5', type: 'sentence-order', question: 'Sắp xếp: "Chúc bạn sớm khỏi bệnh"', options: ['祝', '你', '早日', '康復'], correctAnswer: ['祝', '你', '早日', '康復'] },
          { id: 'e3-10-6', type: 'fill-blank', question: '他___復得很快。(Anh ấy hồi phục rất nhanh)', correctAnswer: '恢' },
          { id: 'e3-10-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '護士很親切', options: ['Y tá rất thân thiện', 'Bác sĩ rất giỏi', 'Y tá rất nghiêm', 'Bệnh viện rất lớn'], correctAnswer: 'Y tá rất thân thiện' },
          { id: 'e3-10-8', type: 'multiple-choice', question: '"探病" nghĩa là gì?', options: ['khám bệnh', 'thăm bệnh', 'chữa bệnh', 'nhập viện'], correctAnswer: 'thăm bệnh' },
          { id: 'e3-10-9', type: 'matching', question: 'Nối từ điều trị', options: ['檢查|kiểm tra', '開刀|mổ', '恢復|hồi phục', '保險|bảo hiểm'], correctAnswer: ['檢查|kiểm tra', '開刀|mổ', '恢復|hồi phục', '保險|bảo hiểm'] },
          { id: 'e3-10-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '出院', options: ['住院', '出院', '掛號', '急診'], correctAnswer: '出院' },
        ],
      },
      {
        id: 'b3-l10-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-10-1', type: 'multiple-choice', question: 'Phiên âm của "手術" là gì?', options: ['shǒushù', 'shǒusù', 'shǒushǔ', 'shòushù'], correctAnswer: 'shǒushù' },
          { id: 'r3-10-2', type: 'fill-blank', question: '要不是你幫忙，我___來不及了。(Nếu không có bạn giúp, tôi đã không kịp)', correctAnswer: '就' },
          { id: 'r3-10-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['住院|nhập viện', '出院|xuất viện', '護士|y tá', '康復|khỏi bệnh'], correctAnswer: ['住院|nhập viện', '出院|xuất viện', '護士|y tá', '康復|khỏi bệnh'] },
        ],
      },
    ],
  },

  // ===== BÀI 11: 臺灣故事 =====
  {
    id: 'b3-l11', number: 11, title: 'Câu chuyện Đài Loan', titleChinese: '臺灣故事',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l11-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-11-1', traditional: '故事', pinyin: 'gùshì', zhuyin: 'ㄍㄨˋ ㄕˋ', meaning: 'câu chuyện', partOfSpeech: 'danh từ', exampleSentence: '臺灣有很多故事。', exampleMeaning: 'Đài Loan có rất nhiều câu chuyện.' },
          { id: 'w3-11-2', traditional: '歷史', pinyin: 'lìshǐ', zhuyin: 'ㄌㄧˋ ㄕˇ', meaning: 'lịch sử', partOfSpeech: 'danh từ', exampleSentence: '臺灣的歷史很豐富。', exampleMeaning: 'Lịch sử Đài Loan rất phong phú.' },
          { id: 'w3-11-3', traditional: '原住民', pinyin: 'yuánzhùmín', zhuyin: 'ㄩㄢˊ ㄓㄨˋ ㄇㄧㄣˊ', meaning: 'người bản địa', partOfSpeech: 'danh từ', exampleSentence: '原住民文化很豐富。', exampleMeaning: 'Văn hóa người bản địa rất phong phú.' },
          { id: 'w3-11-4', traditional: '殖民', pinyin: 'zhímín', zhuyin: 'ㄓˊ ㄇㄧㄣˊ', meaning: 'thuộc địa', partOfSpeech: 'danh từ', exampleSentence: '臺灣曾經被殖民。', exampleMeaning: 'Đài Loan từng bị thuộc địa.' },
          { id: 'w3-11-5', traditional: '傳統', pinyin: 'chuántǒng', zhuyin: 'ㄔㄨㄢˊ ㄊㄨㄥˇ', meaning: 'truyền thống', partOfSpeech: 'danh từ/tính từ', exampleSentence: '傳統文化很重要。', exampleMeaning: 'Văn hóa truyền thống rất quan trọng.' },
          { id: 'w3-11-6', traditional: '發展', pinyin: 'fāzhǎn', zhuyin: 'ㄈㄚ ㄓㄢˇ', meaning: 'phát triển', partOfSpeech: 'động từ', exampleSentence: '臺灣發展得很快。', exampleMeaning: 'Đài Loan phát triển rất nhanh.' },
          { id: 'w3-11-7', traditional: '民主', pinyin: 'mínzhǔ', zhuyin: 'ㄇㄧㄣˊ ㄓㄨˇ', meaning: 'dân chủ', partOfSpeech: 'danh từ', exampleSentence: '臺灣是民主社會。', exampleMeaning: 'Đài Loan là xã hội dân chủ.' },
          { id: 'w3-11-8', traditional: '移民', pinyin: 'yímín', zhuyin: 'ㄧˊ ㄇㄧㄣˊ', meaning: 'di dân', partOfSpeech: 'danh từ/động từ', exampleSentence: '很多人移民到臺灣。', exampleMeaning: 'Nhiều người di dân đến Đài Loan.' },
          { id: 'w3-11-9', traditional: '族群', pinyin: 'zúqún', zhuyin: 'ㄗㄨˊ ㄑㄩㄣˊ', meaning: 'dân tộc, nhóm dân', partOfSpeech: 'danh từ', exampleSentence: '臺灣有很多族群。', exampleMeaning: 'Đài Loan có rất nhiều nhóm dân tộc.' },
          { id: 'w3-11-10', traditional: '融合', pinyin: 'rónghé', zhuyin: 'ㄖㄨㄥˊ ㄏㄜˊ', meaning: 'hòa hợp, hội nhập', partOfSpeech: 'động từ', exampleSentence: '不同文化融合在一起。', exampleMeaning: 'Các nền văn hóa khác nhau hòa hợp cùng nhau.' },
          { id: 'w3-11-11', traditional: '古蹟', pinyin: 'gǔjì', zhuyin: 'ㄍㄨˇ ㄐㄧˋ', meaning: 'di tích', partOfSpeech: 'danh từ', exampleSentence: '臺灣有很多古蹟。', exampleMeaning: 'Đài Loan có rất nhiều di tích.' },
          { id: 'w3-11-12', traditional: '保存', pinyin: 'bǎocún', zhuyin: 'ㄅㄠˇ ㄘㄨㄣˊ', meaning: 'bảo tồn', partOfSpeech: 'động từ', exampleSentence: '要保存傳統文化。', exampleMeaning: 'Cần bảo tồn văn hóa truyền thống.' },
          { id: 'w3-11-13', traditional: '影響', pinyin: 'yǐngxiǎng', zhuyin: 'ㄧㄥˇ ㄒㄧㄤˇ', meaning: 'ảnh hưởng', partOfSpeech: 'danh từ/động từ', exampleSentence: '歷史影響了文化。', exampleMeaning: 'Lịch sử ảnh hưởng đến văn hóa.' },
          { id: 'w3-11-14', traditional: '認同', pinyin: 'rèntóng', zhuyin: 'ㄖㄣˋ ㄊㄨㄥˊ', meaning: 'nhận đồng, bản sắc', partOfSpeech: 'danh từ/động từ', exampleSentence: '文化認同很重要。', exampleMeaning: 'Bản sắc văn hóa rất quan trọng.' },
        ],
      },
      {
        id: 'b3-l11-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-11-1', pattern: '由於...因此... (do...nên...)',
            explanation: '"由於...因此..." = do...cho nên... Diễn tả nguyên nhân - kết quả trang trọng.',
            examples: [
              { sentence: '由於歷史原因，臺灣文化很多元。', pinyin: 'Yóuyú lìshǐ yuányīn, Táiwān wénhuà hěn duōyuán.', meaning: 'Do nguyên nhân lịch sử, văn hóa Đài Loan rất đa dạng.' },
              { sentence: '由於不同族群融合，因此產生了獨特文化。', pinyin: 'Yóuyú bùtóng zúqún rónghé, yīncǐ chǎnshēngle dútè wénhuà.', meaning: 'Do các dân tộc hòa hợp, nên đã sinh ra văn hóa độc đáo.' },
            ],
          },
          {
            id: 'g3-11-2', pattern: '不僅...還/更... (không chỉ...mà còn/hơn nữa)',
            explanation: '"不僅...還/更..." = không chỉ...mà còn. Tương tự "不但" nhưng trang trọng hơn.',
            examples: [
              { sentence: '臺灣不僅有美食，還有豐富的歷史。', pinyin: 'Táiwān bùjǐn yǒu měishí, hái yǒu fēngfù de lìshǐ.', meaning: 'Đài Loan không chỉ có ẩm thực, mà còn có lịch sử phong phú.' },
              { sentence: '他不僅了解歷史，更關心未來。', pinyin: 'Tā bùjǐn liǎojiě lìshǐ, gèng guānxīn wèilái.', meaning: 'Anh ấy không chỉ hiểu lịch sử, mà còn quan tâm tương lai.' },
            ],
          },
          {
            id: 'g3-11-3', pattern: '之所以...是因為... (sở dĩ...là vì...)',
            explanation: '"之所以...是因為..." = sở dĩ...là vì... Giải thích nguyên nhân.',
            examples: [
              { sentence: '臺灣之所以多元，是因為有不同的族群。', pinyin: 'Táiwān zhī suǒyǐ duōyuán, shì yīnwèi yǒu bùtóng de zúqún.', meaning: 'Sở dĩ Đài Loan đa dạng, là vì có nhiều nhóm dân tộc.' },
              { sentence: '他之所以這麼了解，是因為他讀了很多書。', pinyin: 'Tā zhī suǒyǐ zhème liǎojiě, shì yīnwèi tā dúle hěn duō shū.', meaning: 'Sở dĩ anh ấy hiểu nhiều, là vì anh ấy đọc rất nhiều sách.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l11-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-11-1', type: 'multiple-choice', question: '"原住民" nghĩa là gì?', options: ['du khách', 'người bản địa', 'di dân', 'dân thành phố'], correctAnswer: 'người bản địa' },
          { id: 'e3-11-2', type: 'multiple-choice', question: '"融合" nghĩa là gì?', options: ['tách biệt', 'hòa hợp', 'đối lập', 'xung đột'], correctAnswer: 'hòa hợp' },
          { id: 'e3-11-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___於歷史原因，臺灣文化很多元。', options: ['由', '因', '為', '以'], correctAnswer: '由' },
          { id: 'e3-11-4', type: 'matching', question: 'Nối từ lịch sử', options: ['歷史|lịch sử', '傳統|truyền thống', '古蹟|di tích', '殖民|thuộc địa'], correctAnswer: ['歷史|lịch sử', '傳統|truyền thống', '古蹟|di tích', '殖民|thuộc địa'] },
          { id: 'e3-11-5', type: 'sentence-order', question: 'Sắp xếp: "Cần bảo tồn văn hóa truyền thống"', options: ['要', '保存', '傳統', '文化'], correctAnswer: ['要', '保存', '傳統', '文化'] },
          { id: 'e3-11-6', type: 'fill-blank', question: '文化___同很重要。(Bản sắc văn hóa rất quan trọng)', correctAnswer: '認' },
          { id: 'e3-11-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '不同文化融合在一起', options: ['Các văn hóa hòa hợp cùng nhau', 'Các văn hóa rất khác nhau', 'Văn hóa bị mất đi', 'Văn hóa không thay đổi'], correctAnswer: 'Các văn hóa hòa hợp cùng nhau' },
          { id: 'e3-11-8', type: 'multiple-choice', question: '"民主" nghĩa là gì?', options: ['quân chủ', 'dân chủ', 'cộng hòa', 'liên bang'], correctAnswer: 'dân chủ' },
          { id: 'e3-11-9', type: 'matching', question: 'Nối từ xã hội', options: ['發展|phát triển', '移民|di dân', '族群|dân tộc', '影響|ảnh hưởng'], correctAnswer: ['發展|phát triển', '移民|di dân', '族群|dân tộc', '影響|ảnh hưởng'] },
          { id: 'e3-11-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '民主', options: ['殖民', '民主', '移民', '族群'], correctAnswer: '民主' },
        ],
      },
      {
        id: 'b3-l11-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-11-1', type: 'multiple-choice', question: 'Phiên âm của "原住民" là gì?', options: ['yuánzhùmín', 'yuánzhūmín', 'yuǎnzhùmín', 'yuánzhùmǐn'], correctAnswer: 'yuánzhùmín' },
          { id: 'r3-11-2', type: 'fill-blank', question: '臺灣___所以多元，是因為有不同的族群。(Sở dĩ Đài Loan đa dạng)', correctAnswer: '之' },
          { id: 'r3-11-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['故事|câu chuyện', '保存|bảo tồn', '融合|hòa hợp', '認同|bản sắc'], correctAnswer: ['故事|câu chuyện', '保存|bảo tồn', '融合|hòa hợp', '認同|bản sắc'] },
        ],
      },
    ],
  },

  // ===== BÀI 12: 我要去投票 =====
  {
    id: 'b3-l12', number: 12, title: 'Tôi đi bỏ phiếu', titleChinese: '我要去投票',
    unlocked: false, completed: false, xpReward: 35,
    sections: [
      {
        id: 'b3-l12-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w3-12-1', traditional: '投票', pinyin: 'tóupiào', zhuyin: 'ㄊㄡˊ ㄆㄧㄠˋ', meaning: 'bỏ phiếu', partOfSpeech: 'động từ', exampleSentence: '明天去投票。', exampleMeaning: 'Ngày mai đi bỏ phiếu.' },
          { id: 'w3-12-2', traditional: '選舉', pinyin: 'xuǎnjǔ', zhuyin: 'ㄒㄩㄢˇ ㄐㄩˇ', meaning: 'bầu cử', partOfSpeech: 'danh từ/động từ', exampleSentence: '今年有選舉。', exampleMeaning: 'Năm nay có bầu cử.' },
          { id: 'w3-12-3', traditional: '候選人', pinyin: 'hòuxuǎnrén', zhuyin: 'ㄏㄡˋ ㄒㄩㄢˇ ㄖㄣˊ', meaning: 'ứng viên', partOfSpeech: 'danh từ', exampleSentence: '你支持哪個候選人？', exampleMeaning: 'Bạn ủng hộ ứng viên nào?' },
          { id: 'w3-12-4', traditional: '政策', pinyin: 'zhèngcè', zhuyin: 'ㄓㄥˋ ㄘㄜˋ', meaning: 'chính sách', partOfSpeech: 'danh từ', exampleSentence: '他的政策很好。', exampleMeaning: 'Chính sách của ông ấy rất tốt.' },
          { id: 'w3-12-5', traditional: '政黨', pinyin: 'zhèngdǎng', zhuyin: 'ㄓㄥˋ ㄉㄤˇ', meaning: 'đảng phái', partOfSpeech: 'danh từ', exampleSentence: '臺灣有很多政黨。', exampleMeaning: 'Đài Loan có rất nhiều đảng phái.' },
          { id: 'w3-12-6', traditional: '支持', pinyin: 'zhīchí', zhuyin: 'ㄓ ㄔˊ', meaning: 'ủng hộ', partOfSpeech: 'động từ', exampleSentence: '我支持他。', exampleMeaning: 'Tôi ủng hộ ông ấy.' },
          { id: 'w3-12-7', traditional: '反對', pinyin: 'fǎnduì', zhuyin: 'ㄈㄢˇ ㄉㄨㄟˋ', meaning: 'phản đối', partOfSpeech: 'động từ', exampleSentence: '很多人反對。', exampleMeaning: 'Nhiều người phản đối.' },
          { id: 'w3-12-8', traditional: '意見', pinyin: 'yìjiàn', zhuyin: 'ㄧˋ ㄐㄧㄢˋ', meaning: 'ý kiến', partOfSpeech: 'danh từ', exampleSentence: '每個人都有自己的意見。', exampleMeaning: 'Mỗi người đều có ý kiến riêng.' },
          { id: 'w3-12-9', traditional: '權利', pinyin: 'quánlì', zhuyin: 'ㄑㄩㄢˊ ㄌㄧˋ', meaning: 'quyền lợi', partOfSpeech: 'danh từ', exampleSentence: '投票是人民的權利。', exampleMeaning: 'Bỏ phiếu là quyền lợi của nhân dân.' },
          { id: 'w3-12-10', traditional: '公民', pinyin: 'gōngmín', zhuyin: 'ㄍㄨㄥ ㄇㄧㄣˊ', meaning: 'công dân', partOfSpeech: 'danh từ', exampleSentence: '公民要關心政治。', exampleMeaning: 'Công dân phải quan tâm chính trị.' },
          { id: 'w3-12-11', traditional: '結果', pinyin: 'jiéguǒ', zhuyin: 'ㄐㄧㄝˊ ㄍㄨㄛˇ', meaning: 'kết quả', partOfSpeech: 'danh từ', exampleSentence: '選舉結果出來了。', exampleMeaning: 'Kết quả bầu cử ra rồi.' },
          { id: 'w3-12-12', traditional: '當選', pinyin: 'dāngxuǎn', zhuyin: 'ㄉㄤ ㄒㄩㄢˇ', meaning: 'trúng cử', partOfSpeech: 'động từ', exampleSentence: '他當選了。', exampleMeaning: 'Ông ấy trúng cử rồi.' },
          { id: 'w3-12-13', traditional: '落選', pinyin: 'luòxuǎn', zhuyin: 'ㄌㄨㄛˋ ㄒㄩㄢˇ', meaning: 'rớt cử, thất bại', partOfSpeech: 'động từ', exampleSentence: '他這次落選了。', exampleMeaning: 'Ông ấy lần này thất bại rồi.' },
          { id: 'w3-12-14', traditional: '責任', pinyin: 'zérèn', zhuyin: 'ㄗㄜˊ ㄖㄣˋ', meaning: 'trách nhiệm', partOfSpeech: 'danh từ', exampleSentence: '投票是公民的責任。', exampleMeaning: 'Bỏ phiếu là trách nhiệm của công dân.' },
        ],
      },
      {
        id: 'b3-l12-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g3-12-1', pattern: '即使...也... (cho dù...vẫn...)',
            explanation: '"即使...也..." = cho dù...vẫn... Nhượng bộ mạnh, nhấn mạnh quyết tâm.',
            examples: [
              { sentence: '即使下雨，我也要去投票。', pinyin: 'Jíshǐ xiàyǔ, wǒ yě yào qù tóupiào.', meaning: 'Cho dù trời mưa, tôi vẫn phải đi bỏ phiếu.' },
              { sentence: '即使結果不如意，也要接受。', pinyin: 'Jíshǐ jiéguǒ bùrúyì, yě yào jiēshòu.', meaning: 'Cho dù kết quả không như ý, vẫn phải chấp nhận.' },
            ],
          },
          {
            id: 'g3-12-2', pattern: '站在...的立場 (đứng trên lập trường...)',
            explanation: '"站在...的立場" = đứng trên lập trường của... Xem xét quan điểm người khác.',
            examples: [
              { sentence: '站在年輕人的立場，政策應該改變。', pinyin: 'Zhàn zài niánqīngrén de lìchǎng, zhèngcè yīnggāi gǎibiàn.', meaning: 'Đứng trên lập trường giới trẻ, chính sách nên thay đổi.' },
              { sentence: '站在他的立場想想看。', pinyin: 'Zhàn zài tā de lìchǎng xiǎngxiang kàn.', meaning: 'Thử đứng trên lập trường anh ấy mà nghĩ xem.' },
            ],
          },
          {
            id: 'g3-12-3', pattern: '總而言之 (tóm lại)',
            explanation: '"總而言之" = tóm lại, nói chung. Dùng để kết luận.',
            examples: [
              { sentence: '總而言之，投票很重要。', pinyin: 'Zǒng ér yán zhī, tóupiào hěn zhòngyào.', meaning: 'Tóm lại, bỏ phiếu rất quan trọng.' },
              { sentence: '總而言之，要尊重每個人的意見。', pinyin: 'Zǒng ér yán zhī, yào zūnzhòng měi ge rén de yìjiàn.', meaning: 'Tóm lại, phải tôn trọng ý kiến mỗi người.' },
            ],
          },
        ],
      },
      {
        id: 'b3-l12-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e3-12-1', type: 'multiple-choice', question: '"投票" nghĩa là gì?', options: ['bỏ phiếu', 'mua vé', 'đăng ký', 'xin visa'], correctAnswer: 'bỏ phiếu' },
          { id: 'e3-12-2', type: 'multiple-choice', question: '"候選人" nghĩa là gì?', options: ['cử tri', 'ứng viên', 'quan chức', 'công dân'], correctAnswer: 'ứng viên' },
          { id: 'e3-12-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___使下雨，我也要去投票。', options: ['即', '就', '如', '既'], correctAnswer: '即' },
          { id: 'e3-12-4', type: 'matching', question: 'Nối từ bầu cử', options: ['選舉|bầu cử', '政策|chính sách', '當選|trúng cử', '落選|thất bại'], correctAnswer: ['選舉|bầu cử', '政策|chính sách', '當選|trúng cử', '落選|thất bại'] },
          { id: 'e3-12-5', type: 'sentence-order', question: 'Sắp xếp: "Bỏ phiếu là quyền lợi của nhân dân"', options: ['投票', '是', '人民', '的', '權利'], correctAnswer: ['投票', '是', '人民', '的', '權利'] },
          { id: 'e3-12-6', type: 'fill-blank', question: '選舉___果出來了。(Kết quả bầu cử ra rồi)', correctAnswer: '結' },
          { id: 'e3-12-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '他當選了', options: ['Ông ấy trúng cử rồi', 'Ông ấy thất bại rồi', 'Ông ấy rút lui rồi', 'Ông ấy từ chức rồi'], correctAnswer: 'Ông ấy trúng cử rồi' },
          { id: 'e3-12-8', type: 'multiple-choice', question: '"公民" nghĩa là gì?', options: ['quan chức', 'công dân', 'quân nhân', 'cảnh sát'], correctAnswer: 'công dân' },
          { id: 'e3-12-9', type: 'matching', question: 'Nối từ chính trị', options: ['支持|ủng hộ', '反對|phản đối', '意見|ý kiến', '權利|quyền lợi'], correctAnswer: ['支持|ủng hộ', '反對|phản đối', '意見|ý kiến', '權利|quyền lợi'] },
          { id: 'e3-12-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '選舉', options: ['投票', '選舉', '政策', '結果'], correctAnswer: '選舉' },
        ],
      },
      {
        id: 'b3-l12-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r3-12-1', type: 'multiple-choice', question: 'Phiên âm của "候選人" là gì?', options: ['hòuxuǎnrén', 'hóuxuǎnrén', 'hòuxuànrén', 'hòuxuǎnrěn'], correctAnswer: 'hòuxuǎnrén' },
          { id: 'r3-12-2', type: 'fill-blank', question: '總而言___，投票很重要。(Tóm lại, bỏ phiếu rất quan trọng)', correctAnswer: '之' },
          { id: 'r3-12-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['投票|bỏ phiếu', '選舉|bầu cử', '當選|trúng cử', '公民|công dân'], correctAnswer: ['投票|bỏ phiếu', '選舉|bầu cử', '當選|trúng cử', '公民|công dân'] },
        ],
      },
    ],
  },
];
