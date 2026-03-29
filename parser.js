// parser.js - 专门负责清洗和解析名单
const NameParser = {
    parse: function(rawText) {
        if (!rawText) return [];

        // 1. 按换行、空格、逗号、顿号等常见分隔符初步拆分
        let lines = rawText.split(/[\s,，、\n\r]+/);

        return lines
            .map(item => {
                // 2. 精细化清洗：
                // 剔除开头的数字和符号（如 "1.张三" -> "张三", "①李四" -> "李四"）
                // 同时也剔除末尾可能存在的干扰字符
                return item.replace(/^[0-9一二三四五六七八九十①②③④⑤⑥⑦⑧⑨⑩\W]+/, "")
                           .trim();
            })
            // 3. 过滤掉清洗后变成空的字符串
            .filter(name => name.length >= 1);
    }
};