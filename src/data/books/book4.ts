import { Lesson } from '@/types/curriculum';

export const book4Lessons: Lesson[] = [
  // ===== BÀI 1: 新聞報導 =====
  {
    id: 'b4-l1', number: 1, title: 'Tin tức báo chí', titleChinese: '新聞報導',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      {
        id: 'b4-l1-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w4-1-1', traditional: '新聞', pinyin: 'xīnwén', zhuyin: 'ㄒㄧㄣ ㄨㄣˊ', meaning: 'tin tức', partOfSpeech: 'danh từ', exampleSentence: '你看今天的新聞了嗎？', exampleMeaning: 'Bạn xem tin tức hôm nay chưa?' },
          { id: 'w4-1-2', traditional: '報導', pinyin: 'bàodǎo', zhuyin: 'ㄅㄠˋ ㄉㄠˇ', meaning: 'bản tin, đưa tin', partOfSpeech: 'danh từ/động từ', exampleSentence: '這篇報導很詳細。', exampleMeaning: 'Bản tin này rất chi tiết.' },
          { id: 'w4-1-3', traditional: '記者', pinyin: 'jìzhě', zhuyin: 'ㄐㄧˋ ㄓㄜˇ', meaning: 'phóng viên', partOfSpeech: 'danh từ', exampleSentence: '記者在現場。', exampleMeaning: 'Phóng viên ở hiện trường.' },
          { id: 'w4-1-4', traditional: '媒體', pinyin: 'méitǐ', zhuyin: 'ㄇㄟˊ ㄊㄧˇ', meaning: 'truyền thông', partOfSpeech: 'danh từ', exampleSentence: '媒體的影響力很大。', exampleMeaning: 'Sức ảnh hưởng của truyền thông rất lớn.' },
          { id: 'w4-1-5', traditional: '標題', pinyin: 'biāotí', zhuyin: 'ㄅㄧㄠ ㄊㄧˊ', meaning: 'tiêu đề', partOfSpeech: 'danh từ', exampleSentence: '標題太誇張了。', exampleMeaning: 'Tiêu đề quá phóng đại.' },
          { id: 'w4-1-6', traditional: '事件', pinyin: 'shìjiàn', zhuyin: 'ㄕˋ ㄐㄧㄢˋ', meaning: 'sự kiện', partOfSpeech: 'danh từ', exampleSentence: '這個事件引起關注。', exampleMeaning: 'Sự kiện này gây chú ý.' },
          { id: 'w4-1-7', traditional: '真相', pinyin: 'zhēnxiàng', zhuyin: 'ㄓㄣ ㄒㄧㄤˋ', meaning: 'sự thật', partOfSpeech: 'danh từ', exampleSentence: '我們要了解真相。', exampleMeaning: 'Chúng ta cần hiểu sự thật.' },
          { id: 'w4-1-8', traditional: '假新聞', pinyin: 'jiǎ xīnwén', zhuyin: 'ㄐㄧㄚˇ ㄒㄧㄣ ㄨㄣˊ', meaning: 'tin giả', partOfSpeech: 'danh từ', exampleSentence: '假新聞是一個嚴重的問題。', exampleMeaning: 'Tin giả là một vấn đề nghiêm trọng.' },
          { id: 'w4-1-9', traditional: '客觀', pinyin: 'kèguān', zhuyin: 'ㄎㄜˋ ㄍㄨㄢ', meaning: 'khách quan', partOfSpeech: 'tính từ', exampleSentence: '報導要客觀。', exampleMeaning: 'Đưa tin phải khách quan.' },
          { id: 'w4-1-10', traditional: '主觀', pinyin: 'zhǔguān', zhuyin: 'ㄓㄨˇ ㄍㄨㄢ', meaning: 'chủ quan', partOfSpeech: 'tính từ', exampleSentence: '不要太主觀。', exampleMeaning: 'Đừng quá chủ quan.' },
          { id: 'w4-1-11', traditional: '消息', pinyin: 'xiāoxi', zhuyin: 'ㄒㄧㄠ ㄒㄧ˙', meaning: 'tin tức, thông tin', partOfSpeech: 'danh từ', exampleSentence: '你聽到什麼消息嗎？', exampleMeaning: 'Bạn nghe tin gì chưa?' },
          { id: 'w4-1-12', traditional: '傳播', pinyin: 'chuánbō', zhuyin: 'ㄔㄨㄢˊ ㄅㄛ', meaning: 'truyền bá, lan truyền', partOfSpeech: 'động từ', exampleSentence: '消息傳播得很快。', exampleMeaning: 'Tin tức lan truyền rất nhanh.' },
          { id: 'w4-1-13', traditional: '查證', pinyin: 'cházhèng', zhuyin: 'ㄔㄚˊ ㄓㄥˋ', meaning: 'xác minh', partOfSpeech: 'động từ', exampleSentence: '要先查證再分享。', exampleMeaning: 'Phải xác minh trước khi chia sẻ.' },
          { id: 'w4-1-14', traditional: '觀點', pinyin: 'guāndiǎn', zhuyin: 'ㄍㄨㄢ ㄉㄧㄢˇ', meaning: 'quan điểm', partOfSpeech: 'danh từ', exampleSentence: '每個人都有不同的觀點。', exampleMeaning: 'Mỗi người đều có quan điểm khác nhau.' },
        ],
      },
      {
        id: 'b4-l1-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g4-1-1', pattern: '據...報導/表示 (theo...đưa tin/cho biết)',
            explanation: '"據" = theo, căn cứ. Dùng để dẫn nguồn thông tin.',
            examples: [
              { sentence: '據報導，這次地震很嚴重。', pinyin: 'Jù bàodǎo, zhè cì dìzhèn hěn yánzhòng.', meaning: 'Theo bản tin, trận động đất lần này rất nghiêm trọng.' },
              { sentence: '據記者表示，事件還在調查中。', pinyin: 'Jù jìzhě biǎoshì, shìjiàn hái zài diàochá zhōng.', meaning: 'Theo phóng viên cho biết, sự kiện vẫn đang điều tra.' },
            ],
          },
          {
            id: 'g4-1-2', pattern: '並非...而是... (không phải...mà là...)',
            explanation: '"並非...而是..." = không phải...mà là... Phủ định trang trọng hơn "不是".',
            examples: [
              { sentence: '這並非事實，而是假新聞。', pinyin: 'Zhè bìngfēi shìshí, érshì jiǎ xīnwén.', meaning: 'Đây không phải sự thật, mà là tin giả.' },
              { sentence: '問題並非出在記者，而是出在媒體。', pinyin: 'Wèntí bìngfēi chū zài jìzhě, érshì chū zài méitǐ.', meaning: 'Vấn đề không phải ở phóng viên, mà là ở truyền thông.' },
            ],
          },
          {
            id: 'g4-1-3', pattern: '不免/難免 (khó tránh khỏi)',
            explanation: '"不免/難免" = khó tránh khỏi. Diễn tả điều không thể tránh.',
            examples: [
              { sentence: '看到假新聞，不免讓人擔心。', pinyin: 'Kàndào jiǎ xīnwén, bùmiǎn ràng rén dānxīn.', meaning: 'Thấy tin giả, khó tránh khỏi lo lắng.' },
              { sentence: '媒體報導難免有主觀的觀點。', pinyin: 'Méitǐ bàodǎo nánmiǎn yǒu zhǔguān de guāndiǎn.', meaning: 'Đưa tin truyền thông khó tránh khỏi quan điểm chủ quan.' },
            ],
          },
        ],
      },
      {
        id: 'b4-l1-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e4-1-1', type: 'multiple-choice', question: '"報導" nghĩa là gì?', options: ['bản tin', 'quảng cáo', 'phim ảnh', 'âm nhạc'], correctAnswer: 'bản tin' },
          { id: 'e4-1-2', type: 'multiple-choice', question: '"假新聞" nghĩa là gì?', options: ['tin nóng', 'tin giả', 'tin hay', 'tin mới'], correctAnswer: 'tin giả' },
          { id: 'e4-1-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___報導，這次事件很嚴重。(Theo bản tin)', options: ['據', '被', '把', '給'], correctAnswer: '據' },
          { id: 'e4-1-4', type: 'matching', question: 'Nối từ truyền thông', options: ['記者|phóng viên', '媒體|truyền thông', '標題|tiêu đề', '真相|sự thật'], correctAnswer: ['記者|phóng viên', '媒體|truyền thông', '標題|tiêu đề', '真相|sự thật'] },
          { id: 'e4-1-5', type: 'sentence-order', question: 'Sắp xếp: "Phải xác minh trước khi chia sẻ"', options: ['要', '先', '查證', '再', '分享'], correctAnswer: ['要', '先', '查證', '再', '分享'] },
          { id: 'e4-1-6', type: 'fill-blank', question: '消息傳___得很快。(Tin tức lan truyền rất nhanh)', correctAnswer: '播' },
          { id: 'e4-1-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '報導要客觀', options: ['Đưa tin phải khách quan', 'Phóng viên rất giỏi', 'Tin tức rất hay', 'Truyền thông rất lớn'], correctAnswer: 'Đưa tin phải khách quan' },
          { id: 'e4-1-8', type: 'multiple-choice', question: '"客觀" nghĩa là gì?', options: ['chủ quan', 'khách quan', 'lạc quan', 'bi quan'], correctAnswer: 'khách quan' },
          { id: 'e4-1-9', type: 'matching', question: 'Nối từ tin tức', options: ['消息|thông tin', '傳播|lan truyền', '查證|xác minh', '觀點|quan điểm'], correctAnswer: ['消息|thông tin', '傳播|lan truyền', '查證|xác minh', '觀點|quan điểm'] },
          { id: 'e4-1-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '記者', options: ['媒體', '記者', '標題', '事件'], correctAnswer: '記者' },
        ],
      },
      {
        id: 'b4-l1-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r4-1-1', type: 'multiple-choice', question: 'Phiên âm của "媒體" là gì?', options: ['méitǐ', 'méitī', 'mèitǐ', 'méitì'], correctAnswer: 'méitǐ' },
          { id: 'r4-1-2', type: 'fill-blank', question: '這___非事實，而是假新聞。(Đây không phải sự thật)', correctAnswer: '並' },
          { id: 'r4-1-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['新聞|tin tức', '報導|bản tin', '假新聞|tin giả', '客觀|khách quan'], correctAnswer: ['新聞|tin tức', '報導|bản tin', '假新聞|tin giả', '客觀|khách quan'] },
        ],
      },
    ],
  },

  // ===== BÀI 2: 環保與生活 =====
  {
    id: 'b4-l2', number: 2, title: 'Bảo vệ môi trường và cuộc sống', titleChinese: '環保與生活',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      {
        id: 'b4-l2-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w4-2-1', traditional: '環保', pinyin: 'huánbǎo', zhuyin: 'ㄏㄨㄢˊ ㄅㄠˇ', meaning: 'bảo vệ môi trường', partOfSpeech: 'danh từ', exampleSentence: '環保很重要。', exampleMeaning: 'Bảo vệ môi trường rất quan trọng.' },
          { id: 'w4-2-2', traditional: '汙染', pinyin: 'wūrǎn', zhuyin: 'ㄨ ㄖㄢˇ', meaning: 'ô nhiễm', partOfSpeech: 'danh từ/động từ', exampleSentence: '空氣汙染越來越嚴重。', exampleMeaning: 'Ô nhiễm không khí ngày càng nghiêm trọng.' },
          { id: 'w4-2-3', traditional: '回收', pinyin: 'huíshōu', zhuyin: 'ㄏㄨㄟˊ ㄕㄡ', meaning: 'tái chế', partOfSpeech: 'động từ', exampleSentence: '垃圾要分類回收。', exampleMeaning: 'Rác phải phân loại tái chế.' },
          { id: 'w4-2-4', traditional: '減碳', pinyin: 'jiǎntàn', zhuyin: 'ㄐㄧㄢˇ ㄊㄢˋ', meaning: 'giảm carbon', partOfSpeech: 'động từ', exampleSentence: '減碳是全球的目標。', exampleMeaning: 'Giảm carbon là mục tiêu toàn cầu.' },
          { id: 'w4-2-5', traditional: '溫室效應', pinyin: 'wēnshì xiàoyìng', zhuyin: 'ㄨㄣ ㄕˋ ㄒㄧㄠˋ ㄧㄥˋ', meaning: 'hiệu ứng nhà kính', partOfSpeech: 'danh từ', exampleSentence: '溫室效應導致地球暖化。', exampleMeaning: 'Hiệu ứng nhà kính dẫn đến trái đất nóng lên.' },
          { id: 'w4-2-6', traditional: '節能', pinyin: 'jiénéng', zhuyin: 'ㄐㄧㄝˊ ㄋㄥˊ', meaning: 'tiết kiệm năng lượng', partOfSpeech: 'động từ', exampleSentence: '節能減碳人人有責。', exampleMeaning: 'Tiết kiệm năng lượng giảm carbon, ai cũng có trách nhiệm.' },
          { id: 'w4-2-7', traditional: '綠能', pinyin: 'lǜnéng', zhuyin: 'ㄌㄩˋ ㄋㄥˊ', meaning: 'năng lượng xanh', partOfSpeech: 'danh từ', exampleSentence: '臺灣正在發展綠能。', exampleMeaning: 'Đài Loan đang phát triển năng lượng xanh.' },
          { id: 'w4-2-8', traditional: '永續', pinyin: 'yǒngxù', zhuyin: 'ㄩㄥˇ ㄒㄩˋ', meaning: 'bền vững', partOfSpeech: 'tính từ', exampleSentence: '永續發展很重要。', exampleMeaning: 'Phát triển bền vững rất quan trọng.' },
          { id: 'w4-2-9', traditional: '塑膠', pinyin: 'sùjiāo', zhuyin: 'ㄙㄨˋ ㄐㄧㄠ', meaning: 'nhựa', partOfSpeech: 'danh từ', exampleSentence: '少用塑膠袋。', exampleMeaning: 'Ít dùng túi nhựa.' },
          { id: 'w4-2-10', traditional: '限制', pinyin: 'xiànzhì', zhuyin: 'ㄒㄧㄢˋ ㄓˋ', meaning: 'hạn chế', partOfSpeech: 'động từ', exampleSentence: '政府限制使用塑膠。', exampleMeaning: 'Chính phủ hạn chế sử dụng nhựa.' },
          { id: 'w4-2-11', traditional: '資源', pinyin: 'zīyuán', zhuyin: 'ㄗ ㄩㄢˊ', meaning: 'tài nguyên', partOfSpeech: 'danh từ', exampleSentence: '地球的資源有限。', exampleMeaning: 'Tài nguyên trái đất có hạn.' },
          { id: 'w4-2-12', traditional: '排放', pinyin: 'páifàng', zhuyin: 'ㄆㄞˊ ㄈㄤˋ', meaning: 'phát thải', partOfSpeech: 'động từ', exampleSentence: '減少碳排放。', exampleMeaning: 'Giảm phát thải carbon.' },
          { id: 'w4-2-13', traditional: '生態', pinyin: 'shēngtài', zhuyin: 'ㄕㄥ ㄊㄞˋ', meaning: 'sinh thái', partOfSpeech: 'danh từ', exampleSentence: '保護生態環境。', exampleMeaning: 'Bảo vệ môi trường sinh thái.' },
          { id: 'w4-2-14', traditional: '意識', pinyin: 'yìshí', zhuyin: 'ㄧˋ ㄕˊ', meaning: 'ý thức', partOfSpeech: 'danh từ', exampleSentence: '環保意識越來越高。', exampleMeaning: 'Ý thức bảo vệ môi trường ngày càng cao.' },
        ],
      },
      {
        id: 'b4-l2-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g4-2-1', pattern: '一旦...就... (một khi...thì...)',
            explanation: '"一旦...就..." = một khi...thì... Diễn tả hậu quả nếu điều kiện xảy ra.',
            examples: [
              { sentence: '一旦環境被破壞，就很難恢復。', pinyin: 'Yīdàn huánjìng bèi pòhuài, jiù hěn nán huīfù.', meaning: 'Một khi môi trường bị phá hủy, thì rất khó hồi phục.' },
              { sentence: '一旦資源用完，就沒有了。', pinyin: 'Yīdàn zīyuán yòng wán, jiù méiyǒu le.', meaning: 'Một khi tài nguyên dùng hết, thì không còn nữa.' },
            ],
          },
          {
            id: 'g4-2-2', pattern: '為了...而... (vì...mà...)',
            explanation: '"為了...而..." = vì...mà... Diễn tả mục đích dẫn đến hành động.',
            examples: [
              { sentence: '為了保護環境而少用塑膠。', pinyin: 'Wèile bǎohù huánjìng ér shǎo yòng sùjiāo.', meaning: 'Vì bảo vệ môi trường mà ít dùng nhựa.' },
              { sentence: '為了下一代而努力減碳。', pinyin: 'Wèile xià yī dài ér nǔlì jiǎntàn.', meaning: 'Vì thế hệ sau mà nỗ lực giảm carbon.' },
            ],
          },
          {
            id: 'g4-2-3', pattern: '不得不 (buộc phải, không thể không)',
            explanation: '"不得不" = buộc phải. Diễn tả sự miễn cưỡng.',
            examples: [
              { sentence: '我們不得不面對氣候變遷。', pinyin: 'Wǒmen bùdébù miànduì qìhòu biànqiān.', meaning: 'Chúng ta buộc phải đối mặt biến đổi khí hậu.' },
              { sentence: '政府不得不限制排放量。', pinyin: 'Zhèngfǔ bùdébù xiànzhì páifàngliàng.', meaning: 'Chính phủ buộc phải hạn chế lượng phát thải.' },
            ],
          },
        ],
      },
      {
        id: 'b4-l2-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e4-2-1', type: 'multiple-choice', question: '"汙染" nghĩa là gì?', options: ['sạch sẽ', 'ô nhiễm', 'xanh', 'đẹp'], correctAnswer: 'ô nhiễm' },
          { id: 'e4-2-2', type: 'multiple-choice', question: '"永續" nghĩa là gì?', options: ['tạm thời', 'bền vững', 'nhanh chóng', 'chậm rãi'], correctAnswer: 'bền vững' },
          { id: 'e4-2-3', type: 'multiple-choice', question: 'Chọn từ đúng: 一___環境被破壞，就很難恢復。', options: ['旦', '次', '回', '個'], correctAnswer: '旦' },
          { id: 'e4-2-4', type: 'matching', question: 'Nối từ môi trường', options: ['回收|tái chế', '減碳|giảm carbon', '節能|tiết kiệm NL', '塑膠|nhựa'], correctAnswer: ['回收|tái chế', '減碳|giảm carbon', '節能|tiết kiệm NL', '塑膠|nhựa'] },
          { id: 'e4-2-5', type: 'sentence-order', question: 'Sắp xếp: "Chúng ta buộc phải đối mặt biến đổi khí hậu"', options: ['我們', '不得不', '面對', '氣候', '變遷'], correctAnswer: ['我們', '不得不', '面對', '氣候', '變遷'] },
          { id: 'e4-2-6', type: 'fill-blank', question: '環保___識越來越高。(Ý thức bảo vệ MT ngày càng cao)', correctAnswer: '意' },
          { id: 'e4-2-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '節能減碳人人有責', options: ['Tiết kiệm NL giảm carbon ai cũng có trách nhiệm', 'Mọi người đều dùng nhựa', 'Ô nhiễm rất nghiêm trọng', 'Tái chế rất quan trọng'], correctAnswer: 'Tiết kiệm NL giảm carbon ai cũng có trách nhiệm' },
          { id: 'e4-2-8', type: 'multiple-choice', question: '"排放" nghĩa là gì?', options: ['hấp thụ', 'phát thải', 'tiết kiệm', 'tái chế'], correctAnswer: 'phát thải' },
          { id: 'e4-2-9', type: 'matching', question: 'Nối từ sinh thái', options: ['溫室效應|hiệu ứng nhà kính', '綠能|NL xanh', '資源|tài nguyên', '生態|sinh thái'], correctAnswer: ['溫室效應|hiệu ứng nhà kính', '綠能|NL xanh', '資源|tài nguyên', '生態|sinh thái'] },
          { id: 'e4-2-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '汙染', options: ['回收', '汙染', '節能', '減碳'], correctAnswer: '汙染' },
        ],
      },
      {
        id: 'b4-l2-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r4-2-1', type: 'multiple-choice', question: 'Phiên âm của "溫室效應" là gì?', options: ['wēnshì xiàoyìng', 'wénshì xiàoyìng', 'wēnshì xiāoyìng', 'wēnshí xiàoyìng'], correctAnswer: 'wēnshì xiàoyìng' },
          { id: 'r4-2-2', type: 'fill-blank', question: '為了保護環境___少用塑膠。(Vì bảo vệ MT mà ít dùng nhựa)', correctAnswer: '而' },
          { id: 'r4-2-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['汙染|ô nhiễm', '永續|bền vững', '限制|hạn chế', '排放|phát thải'], correctAnswer: ['汙染|ô nhiễm', '永續|bền vững', '限制|hạn chế', '排放|phát thải'] },
        ],
      },
    ],
  },

  // ===== BÀI 3: 科技改變生活 =====
  {
    id: 'b4-l3', number: 3, title: 'Công nghệ thay đổi cuộc sống', titleChinese: '科技改變生活',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      {
        id: 'b4-l3-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w4-3-1', traditional: '人工智慧', pinyin: 'réngōng zhìhuì', zhuyin: 'ㄖㄣˊ ㄍㄨㄥ ㄓˋ ㄏㄨㄟˋ', meaning: 'trí tuệ nhân tạo (AI)', partOfSpeech: 'danh từ', exampleSentence: '人工智慧改變了世界。', exampleMeaning: 'AI đã thay đổi thế giới.' },
          { id: 'w4-3-2', traditional: '網路', pinyin: 'wǎnglù', zhuyin: 'ㄨㄤˇ ㄌㄨˋ', meaning: 'mạng internet', partOfSpeech: 'danh từ', exampleSentence: '沒有網路很不方便。', exampleMeaning: 'Không có internet rất bất tiện.' },
          { id: 'w4-3-3', traditional: '社群媒體', pinyin: 'shèqún méitǐ', zhuyin: 'ㄕㄜˋ ㄑㄩㄣˊ ㄇㄟˊ ㄊㄧˇ', meaning: 'mạng xã hội', partOfSpeech: 'danh từ', exampleSentence: '社群媒體影響很大。', exampleMeaning: 'Mạng xã hội ảnh hưởng rất lớn.' },
          { id: 'w4-3-4', traditional: '數位', pinyin: 'shùwèi', zhuyin: 'ㄕㄨˋ ㄨㄟˋ', meaning: 'kỹ thuật số, digital', partOfSpeech: 'tính từ', exampleSentence: '數位時代來了。', exampleMeaning: 'Thời đại kỹ thuật số đã đến.' },
          { id: 'w4-3-5', traditional: '資訊', pinyin: 'zīxùn', zhuyin: 'ㄗ ㄒㄩㄣˋ', meaning: 'thông tin', partOfSpeech: 'danh từ', exampleSentence: '資訊傳播很快。', exampleMeaning: 'Thông tin truyền bá rất nhanh.' },
          { id: 'w4-3-6', traditional: '隱私', pinyin: 'yǐnsī', zhuyin: 'ㄧㄣˇ ㄙ', meaning: 'quyền riêng tư', partOfSpeech: 'danh từ', exampleSentence: '要保護個人隱私。', exampleMeaning: 'Phải bảo vệ quyền riêng tư cá nhân.' },
          { id: 'w4-3-7', traditional: '創新', pinyin: 'chuàngxīn', zhuyin: 'ㄔㄨㄤˋ ㄒㄧㄣ', meaning: 'sáng tạo, đổi mới', partOfSpeech: 'danh từ/động từ', exampleSentence: '臺灣的科技創新很厲害。', exampleMeaning: 'Sáng tạo công nghệ Đài Loan rất giỏi.' },
          { id: 'w4-3-8', traditional: '取代', pinyin: 'qǔdài', zhuyin: 'ㄑㄩˇ ㄉㄞˋ', meaning: 'thay thế', partOfSpeech: 'động từ', exampleSentence: '機器人會取代人類嗎？', exampleMeaning: 'Robot có thay thế con người không?' },
          { id: 'w4-3-9', traditional: '依賴', pinyin: 'yīlài', zhuyin: 'ㄧ ㄌㄞˋ', meaning: 'phụ thuộc', partOfSpeech: 'động từ', exampleSentence: '我們太依賴手機了。', exampleMeaning: 'Chúng ta quá phụ thuộc điện thoại.' },
          { id: 'w4-3-10', traditional: '應用', pinyin: 'yìngyòng', zhuyin: 'ㄧㄥˋ ㄩㄥˋ', meaning: 'ứng dụng', partOfSpeech: 'danh từ/động từ', exampleSentence: '科技的應用很廣泛。', exampleMeaning: 'Ứng dụng công nghệ rất rộng rãi.' },
          { id: 'w4-3-11', traditional: '虛擬', pinyin: 'xūnǐ', zhuyin: 'ㄒㄩ ㄋㄧˇ', meaning: 'ảo, ảo', partOfSpeech: 'tính từ', exampleSentence: '虛擬世界越來越真實。', exampleMeaning: 'Thế giới ảo ngày càng chân thực.' },
          { id: 'w4-3-12', traditional: '發達', pinyin: 'fādá', zhuyin: 'ㄈㄚ ㄉㄚˊ', meaning: 'phát triển, tiên tiến', partOfSpeech: 'tính từ', exampleSentence: '臺灣科技很發達。', exampleMeaning: 'Công nghệ Đài Loan rất phát triển.' },
          { id: 'w4-3-13', traditional: '便利', pinyin: 'biànlì', zhuyin: 'ㄅㄧㄢˋ ㄌㄧˋ', meaning: 'tiện lợi', partOfSpeech: 'tính từ', exampleSentence: '科技讓生活更便利。', exampleMeaning: 'Công nghệ giúp cuộc sống tiện lợi hơn.' },
          { id: 'w4-3-14', traditional: '風險', pinyin: 'fēngxiǎn', zhuyin: 'ㄈㄥ ㄒㄧㄢˇ', meaning: 'rủi ro', partOfSpeech: 'danh từ', exampleSentence: '新科技也有風險。', exampleMeaning: 'Công nghệ mới cũng có rủi ro.' },
        ],
      },
      {
        id: 'b4-l3-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g4-3-1', pattern: '隨著...的發展 (theo sự phát triển của...)',
            explanation: '"隨著...的發展" = theo sự phát triển. Chỉ sự thay đổi song song.',
            examples: [
              { sentence: '隨著科技的發展，生活越來越便利。', pinyin: 'Suízhe kējì de fāzhǎn, shēnghuó yuèláiyuè biànlì.', meaning: 'Theo sự phát triển công nghệ, cuộc sống ngày càng tiện lợi.' },
              { sentence: '隨著網路的發展，資訊傳播更快了。', pinyin: 'Suízhe wǎnglù de fāzhǎn, zīxùn chuánbō gèng kuài le.', meaning: 'Theo sự phát triển internet, thông tin lan truyền nhanh hơn.' },
            ],
          },
          {
            id: 'g4-3-2', pattern: '一方面...另一方面... (một mặt...mặt khác...)',
            explanation: '"一方面...另一方面..." = một mặt...mặt khác... Trình bày hai khía cạnh.',
            examples: [
              { sentence: '科技一方面帶來便利，另一方面也帶來風險。', pinyin: 'Kējì yī fāngmiàn dàilái biànlì, lìng yī fāngmiàn yě dàilái fēngxiǎn.', meaning: 'Công nghệ một mặt mang lại tiện lợi, mặt khác cũng mang lại rủi ro.' },
              { sentence: '社群媒體一方面讓人交友，另一方面讓人依賴。', pinyin: 'Shèqún méitǐ yī fāngmiàn ràng rén jiāoyǒu, lìng yī fāngmiàn ràng rén yīlài.', meaning: 'MXH một mặt giúp kết bạn, mặt khác khiến người ta phụ thuộc.' },
            ],
          },
          {
            id: 'g4-3-3', pattern: '在...的同時 (đồng thời khi...)',
            explanation: '"在...的同時" = đồng thời khi. Hai sự việc xảy ra cùng lúc.',
            examples: [
              { sentence: '在享受便利的同時，也要注意隱私。', pinyin: 'Zài xiǎngshòu biànlì de tóngshí, yě yào zhùyì yǐnsī.', meaning: 'Đồng thời khi tận hưởng sự tiện lợi, cũng cần chú ý quyền riêng tư.' },
              { sentence: '在發展科技的同時，不能忽略環保。', pinyin: 'Zài fāzhǎn kējì de tóngshí, bùnéng hūlüè huánbǎo.', meaning: 'Đồng thời khi phát triển công nghệ, không thể bỏ qua bảo vệ môi trường.' },
            ],
          },
        ],
      },
      {
        id: 'b4-l3-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e4-3-1', type: 'multiple-choice', question: '"人工智慧" nghĩa là gì?', options: ['robot', 'trí tuệ nhân tạo', 'máy tính', 'điện thoại'], correctAnswer: 'trí tuệ nhân tạo' },
          { id: 'e4-3-2', type: 'multiple-choice', question: '"取代" nghĩa là gì?', options: ['hỗ trợ', 'thay thế', 'bổ sung', 'giảm bớt'], correctAnswer: 'thay thế' },
          { id: 'e4-3-3', type: 'multiple-choice', question: 'Chọn từ đúng: 科技一___面帶來便利，另一方面也帶來風險。', options: ['方', '邊', '部', '半'], correctAnswer: '方' },
          { id: 'e4-3-4', type: 'matching', question: 'Nối từ công nghệ', options: ['網路|internet', '社群媒體|mạng xã hội', '數位|kỹ thuật số', '隱私|quyền riêng tư'], correctAnswer: ['網路|internet', '社群媒體|mạng xã hội', '數位|kỹ thuật số', '隱私|quyền riêng tư'] },
          { id: 'e4-3-5', type: 'sentence-order', question: 'Sắp xếp: "Chúng ta quá phụ thuộc điện thoại"', options: ['我們', '太', '依賴', '手機', '了'], correctAnswer: ['我們', '太', '依賴', '手機', '了'] },
          { id: 'e4-3-6', type: 'fill-blank', question: '科技讓生活更___利。(Công nghệ giúp cuộc sống tiện lợi hơn)', correctAnswer: '便' },
          { id: 'e4-3-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '數位時代來了', options: ['Thời đại kỹ thuật số đã đến', 'Máy tính rất đắt', 'Internet rất chậm', 'Điện thoại hỏng rồi'], correctAnswer: 'Thời đại kỹ thuật số đã đến' },
          { id: 'e4-3-8', type: 'multiple-choice', question: '"創新" nghĩa là gì?', options: ['cũ kỹ', 'sáng tạo, đổi mới', 'sao chép', 'bắt chước'], correctAnswer: 'sáng tạo, đổi mới' },
          { id: 'e4-3-9', type: 'matching', question: 'Nối từ ứng dụng', options: ['創新|sáng tạo', '應用|ứng dụng', '虛擬|ảo', '風險|rủi ro'], correctAnswer: ['創新|sáng tạo', '應用|ứng dụng', '虛擬|ảo', '風險|rủi ro'] },
          { id: 'e4-3-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '人工智慧', options: ['網路', '人工智慧', '社群媒體', '數位'], correctAnswer: '人工智慧' },
        ],
      },
      {
        id: 'b4-l3-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r4-3-1', type: 'multiple-choice', question: 'Phiên âm của "隱私" là gì?', options: ['yǐnsī', 'yìnsī', 'yǐnshī', 'yīnsī'], correctAnswer: 'yǐnsī' },
          { id: 'r4-3-2', type: 'fill-blank', question: '在享受便利的同___，也要注意隱私。(Đồng thời khi tận hưởng sự tiện lợi)', correctAnswer: '時' },
          { id: 'r4-3-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['依賴|phụ thuộc', '取代|thay thế', '發達|phát triển', '便利|tiện lợi'], correctAnswer: ['依賴|phụ thuộc', '取代|thay thế', '發達|phát triển', '便利|tiện lợi'] },
        ],
      },
    ],
  },

  // ===== BÀI 4: 職場生活 =====
  {
    id: 'b4-l4', number: 4, title: 'Cuộc sống nơi làm việc', titleChinese: '職場生活',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      {
        id: 'b4-l4-vocab', title: 'Từ vựng mới', type: 'vocabulary',
        vocabulary: [
          { id: 'w4-4-1', traditional: '職場', pinyin: 'zhíchǎng', zhuyin: 'ㄓˊ ㄔㄤˇ', meaning: 'nơi làm việc', partOfSpeech: 'danh từ', exampleSentence: '職場生活不容易。', exampleMeaning: 'Cuộc sống nơi làm việc không dễ.' },
          { id: 'w4-4-2', traditional: '面試', pinyin: 'miànshì', zhuyin: 'ㄇㄧㄢˋ ㄕˋ', meaning: 'phỏng vấn', partOfSpeech: 'danh từ/động từ', exampleSentence: '明天要去面試。', exampleMeaning: 'Ngày mai phải đi phỏng vấn.' },
          { id: 'w4-4-3', traditional: '履歷', pinyin: 'lǚlì', zhuyin: 'ㄌㄩˇ ㄌㄧˋ', meaning: 'hồ sơ xin việc, CV', partOfSpeech: 'danh từ', exampleSentence: '請寄你的履歷。', exampleMeaning: 'Xin gửi CV của bạn.' },
          { id: 'w4-4-4', traditional: '薪水', pinyin: 'xīnshuǐ', zhuyin: 'ㄒㄧㄣ ㄕㄨㄟˇ', meaning: 'lương', partOfSpeech: 'danh từ', exampleSentence: '薪水還不錯。', exampleMeaning: 'Lương cũng được.' },
          { id: 'w4-4-5', traditional: '加班', pinyin: 'jiābān', zhuyin: 'ㄐㄧㄚ ㄅㄢ', meaning: 'tăng ca', partOfSpeech: 'động từ', exampleSentence: '今天又要加班。', exampleMeaning: 'Hôm nay lại phải tăng ca.' },
          { id: 'w4-4-6', traditional: '升遷', pinyin: 'shēngqiān', zhuyin: 'ㄕㄥ ㄑㄧㄢ', meaning: 'thăng chức', partOfSpeech: 'động từ', exampleSentence: '他終於升遷了。', exampleMeaning: 'Anh ấy cuối cùng cũng thăng chức.' },
          { id: 'w4-4-7', traditional: '同事', pinyin: 'tóngshì', zhuyin: 'ㄊㄨㄥˊ ㄕˋ', meaning: 'đồng nghiệp', partOfSpeech: 'danh từ', exampleSentence: '同事們都很友善。', exampleMeaning: 'Các đồng nghiệp đều rất thân thiện.' },
          { id: 'w4-4-8', traditional: '主管', pinyin: 'zhǔguǎn', zhuyin: 'ㄓㄨˇ ㄍㄨㄢˇ', meaning: 'quản lý, sếp', partOfSpeech: 'danh từ', exampleSentence: '主管要求很高。', exampleMeaning: 'Sếp yêu cầu rất cao.' },
          { id: 'w4-4-9', traditional: '離職', pinyin: 'lízhí', zhuyin: 'ㄌㄧˊ ㄓˊ', meaning: 'nghỉ việc', partOfSpeech: 'động từ', exampleSentence: '他決定離職了。', exampleMeaning: 'Anh ấy quyết định nghỉ việc.' },
          { id: 'w4-4-10', traditional: '創業', pinyin: 'chuàngyè', zhuyin: 'ㄔㄨㄤˋ ㄧㄝˋ', meaning: 'khởi nghiệp', partOfSpeech: 'động từ', exampleSentence: '年輕人想創業。', exampleMeaning: 'Người trẻ muốn khởi nghiệp.' },
          { id: 'w4-4-11', traditional: '壓力', pinyin: 'yālì', zhuyin: 'ㄧㄚ ㄌㄧˋ', meaning: 'áp lực', partOfSpeech: 'danh từ', exampleSentence: '工作壓力很大。', exampleMeaning: 'Áp lực công việc rất lớn.' },
          { id: 'w4-4-12', traditional: '福利', pinyin: 'fúlì', zhuyin: 'ㄈㄨˊ ㄌㄧˋ', meaning: 'phúc lợi', partOfSpeech: 'danh từ', exampleSentence: '公司的福利很好。', exampleMeaning: 'Phúc lợi công ty rất tốt.' },
          { id: 'w4-4-13', traditional: '經驗', pinyin: 'jīngyàn', zhuyin: 'ㄐㄧㄥ ㄧㄢˋ', meaning: 'kinh nghiệm', partOfSpeech: 'danh từ', exampleSentence: '他有豐富的經驗。', exampleMeaning: 'Anh ấy có kinh nghiệm phong phú.' },
          { id: 'w4-4-14', traditional: '專業', pinyin: 'zhuānyè', zhuyin: 'ㄓㄨㄢ ㄧㄝˋ', meaning: 'chuyên nghiệp, chuyên ngành', partOfSpeech: 'danh từ/tính từ', exampleSentence: '他很專業。', exampleMeaning: 'Anh ấy rất chuyên nghiệp.' },
        ],
      },
      {
        id: 'b4-l4-grammar', title: 'Ngữ pháp', type: 'grammar',
        grammar: [
          {
            id: 'g4-4-1', pattern: '儘管...但是/還是... (mặc dù...nhưng/vẫn...)',
            explanation: '"儘管...但是..." = mặc dù...nhưng... Nhượng bộ trang trọng.',
            examples: [
              { sentence: '儘管薪水不高，但是他還是很喜歡這份工作。', pinyin: 'Jǐnguǎn xīnshuǐ bù gāo, dànshì tā háishi hěn xǐhuān zhè fèn gōngzuò.', meaning: 'Mặc dù lương không cao, nhưng anh ấy vẫn rất thích công việc này.' },
              { sentence: '儘管壓力很大，他還是堅持下去。', pinyin: 'Jǐnguǎn yālì hěn dà, tā háishi jiānchí xiàqù.', meaning: 'Mặc dù áp lực rất lớn, anh ấy vẫn kiên trì tiếp tục.' },
            ],
          },
          {
            id: 'g4-4-2', pattern: '與其...寧可... (thà...chứ không...)',
            explanation: '"與其...寧可..." = thà...chứ không muốn... Biểu thị sự lựa chọn kiên quyết.',
            examples: [
              { sentence: '與其繼續加班，我寧可離職。', pinyin: 'Yǔqí jìxù jiābān, wǒ nìngkě lízhí.', meaning: 'Thà nghỉ việc, chứ không muốn tiếp tục tăng ca.' },
              { sentence: '與其做不喜歡的工作，寧可創業。', pinyin: 'Yǔqí zuò bù xǐhuān de gōngzuò, nìngkě chuàngyè.', meaning: 'Thà khởi nghiệp, chứ không muốn làm việc không thích.' },
            ],
          },
          {
            id: 'g4-4-3', pattern: '在...方面 (về mặt..., trong lĩnh vực...)',
            explanation: '"在...方面" = về mặt... Chỉ định lĩnh vực cụ thể.',
            examples: [
              { sentence: '在專業方面，他很有經驗。', pinyin: 'Zài zhuānyè fāngmiàn, tā hěn yǒu jīngyàn.', meaning: 'Về mặt chuyên nghiệp, anh ấy rất có kinh nghiệm.' },
              { sentence: '在福利方面，這家公司很不錯。', pinyin: 'Zài fúlì fāngmiàn, zhè jiā gōngsī hěn búcuò.', meaning: 'Về mặt phúc lợi, công ty này rất tốt.' },
            ],
          },
        ],
      },
      {
        id: 'b4-l4-exercise', title: 'Bài tập', type: 'exercise',
        exercises: [
          { id: 'e4-4-1', type: 'multiple-choice', question: '"面試" nghĩa là gì?', options: ['phỏng vấn', 'thi viết', 'thi vấn đáp', 'họp'], correctAnswer: 'phỏng vấn' },
          { id: 'e4-4-2', type: 'multiple-choice', question: '"履歷" nghĩa là gì?', options: ['bằng cấp', 'CV/hồ sơ xin việc', 'hợp đồng', 'thư giới thiệu'], correctAnswer: 'CV/hồ sơ xin việc' },
          { id: 'e4-4-3', type: 'multiple-choice', question: 'Chọn từ đúng: ___管薪水不高，但是他還是很喜歡這份工作。', options: ['儘', '即', '雖', '既'], correctAnswer: '儘' },
          { id: 'e4-4-4', type: 'matching', question: 'Nối từ công việc', options: ['薪水|lương', '加班|tăng ca', '升遷|thăng chức', '離職|nghỉ việc'], correctAnswer: ['薪水|lương', '加班|tăng ca', '升遷|thăng chức', '離職|nghỉ việc'] },
          { id: 'e4-4-5', type: 'sentence-order', question: 'Sắp xếp: "Anh ấy có kinh nghiệm phong phú"', options: ['他', '有', '豐富的', '經驗'], correctAnswer: ['他', '有', '豐富的', '經驗'] },
          { id: 'e4-4-6', type: 'fill-blank', question: '年輕人想___業。(Người trẻ muốn khởi nghiệp)', correctAnswer: '創' },
          { id: 'e4-4-7', type: 'listening', question: 'Nghe và chọn nghĩa đúng', questionAudio: '今天又要加班', options: ['Hôm nay lại phải tăng ca', 'Hôm nay nghỉ làm', 'Hôm nay thăng chức', 'Hôm nay họp'], correctAnswer: 'Hôm nay lại phải tăng ca' },
          { id: 'e4-4-8', type: 'multiple-choice', question: '"福利" nghĩa là gì?', options: ['phúc lợi', 'phạt', 'thuế', 'nợ'], correctAnswer: 'phúc lợi' },
          { id: 'e4-4-9', type: 'matching', question: 'Nối từ nghề nghiệp', options: ['同事|đồng nghiệp', '主管|sếp', '專業|chuyên nghiệp', '經驗|kinh nghiệm'], correctAnswer: ['同事|đồng nghiệp', '主管|sếp', '專業|chuyên nghiệp', '經驗|kinh nghiệm'] },
          { id: 'e4-4-10', type: 'listening', question: 'Nghe và chọn từ đúng', questionAudio: '面試', options: ['履歷', '面試', '加班', '離職'], correctAnswer: '面試' },
        ],
      },
      {
        id: 'b4-l4-review', title: 'Ôn tập', type: 'review',
        exercises: [
          { id: 'r4-4-1', type: 'multiple-choice', question: 'Phiên âm của "履歷" là gì?', options: ['lǚlì', 'lùlì', 'lǚlí', 'lǜlì'], correctAnswer: 'lǚlì' },
          { id: 'r4-4-2', type: 'fill-blank', question: '在專業___面，他很有經驗。(Về mặt chuyên nghiệp)', correctAnswer: '方' },
          { id: 'r4-4-3', type: 'matching', question: 'Ôn tập từ vựng', options: ['職場|nơi làm việc', '薪水|lương', '創業|khởi nghiệp', '壓力|áp lực'], correctAnswer: ['職場|nơi làm việc', '薪水|lương', '創業|khởi nghiệp', '壓力|áp lực'] },
        ],
      },
    ],
  },

  // ===== BÀI 5-12: PLACEHOLDER =====
  {
    id: 'b4-l5', number: 5, title: 'Giáo dục và tương lai', titleChinese: '教育與未來',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l5-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l5-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l5-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l5-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l6', number: 6, title: 'Kinh tế và thương mại', titleChinese: '經濟與商業',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l6-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l6-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l6-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l6-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l7', number: 7, title: 'Quan hệ xã hội', titleChinese: '人際關係',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l7-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l7-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l7-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l7-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l8', number: 8, title: 'Sức khỏe và thể dục', titleChinese: '健康與運動',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l8-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l8-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l8-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l8-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l9', number: 9, title: 'Du lịch và trải nghiệm', titleChinese: '旅遊與體驗',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l9-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l9-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l9-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l9-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l10', number: 10, title: 'Nghệ thuật và giải trí', titleChinese: '藝術與娛樂',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l10-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l10-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l10-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l10-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l11', number: 11, title: 'Đa văn hóa và hội nhập', titleChinese: '多元文化與融合',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l11-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l11-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l11-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l11-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
  {
    id: 'b4-l12', number: 12, title: 'Ước mơ và mục tiêu', titleChinese: '夢想與目標',
    unlocked: false, completed: false, xpReward: 40,
    sections: [
      { id: 'b4-l12-vocab', title: 'Từ vựng mới', type: 'vocabulary', vocabulary: [] },
      { id: 'b4-l12-grammar', title: 'Ngữ pháp', type: 'grammar', grammar: [] },
      { id: 'b4-l12-exercise', title: 'Bài tập', type: 'exercise', exercises: [] },
      { id: 'b4-l12-review', title: 'Ôn tập', type: 'review', exercises: [] },
    ],
  },
];
