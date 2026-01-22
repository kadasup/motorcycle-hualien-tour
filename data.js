const tourData = {
    date: "2026/1/24（六）- 2026/1/25（日）",
    D1: [
        {
            time: "08:30",
            location: "台灣中油北投直營店",
            highlight: "【集合點】 檢查車況、加油、領隊宣達安全事項。",
            guide: "請準時集合，裝備穿戴整齊。",
            type: "ride",
            distance: "起點",
            map: "https://www.google.com/maps/place/%E5%8F%B0%E7%81%A3%E4%B8%AD%E6%B2%B9+%E5%8C%97%E6%8A%95%E7%9B%B4%E7%87%9F%E7%AB%99/@25.1193242,121.5022006,17z/"
        },
        {
            time: "09:00",
            location: "劉家肉粽",
            highlight: "【美食】 馳名石門肉粽，北海岸必吃補給站。",
            guide: "店口方便臨停，買了就走或現場快速用餐。",
            type: "food",
            distance: "28 km",
            map: "https://www.google.com/maps/place/%E5%8A%89%E5%AE%B6%E8%82%89%E7%B2%BD%E5%AF%8C%E5%9F%BA%E5%BA%97/@25.2873502,121.531404,17z/"
        },
        {
            time: "11:00",
            location: "北關海潮公園",
            highlight: "【景點】 蘭陽八景之一，看龜山島與火車。",
            guide: "停車場寬廣平整，非常好停。",
            type: "spot",
            image: "beiguan.png",
            distance: "65 km",
            map: "北關海潮公園"
        },
        {
            time: "12:00",
            location: "頭城老街",
            highlight: "【美食】 阿宗芋冰城、頭城木瓜王、頂埔阿嬤蔥油餅。",
            guide: "門口路寬，適合新手暫停。",
            type: "food",
            image: "toucheng.jpg",
            distance: "8 km",
            map: "頭城老街"
        },
        {
            time: "13:30",
            location: "蘇澳/南方澳",
            highlight: "【美食】 阿英小吃（魚雜小吃）",
            guide: "港區斜坡多，停車注意側柱穩固。",
            type: "food",
            image: "suao.jpg",
            distance: "35 km",
            map: "南方澳漁港"
        },
        {
            time: "16:00",
            location: "和平 DAKA",
            highlight: "【景點】 蘇花改中繼站，最後油料補給。",
            guide: "柏油路面極佳，車友集結地。",
            type: "spot",
            image: "heping_daka.png",
            distance: "30 km",
            map: "台泥DAKA園區"
        },
        {
            time: "17:30",
            location: "清水斷崖",
            highlight: "【景點】 匯德步道，拍下重機首航美照。",
            guide: "有重機專屬/大車位。",
            type: "spot",
            image: "qingshui.png",
            distance: "20 km",
            map: "清水斷崖"
        },
        {
            time: "19:00",
            location: "南濱公園",
            highlight: "【美食】 玉里橋頭臭豆腐 (花蓮店)。",
            guide: "公園停車場巨大，免找車位。",
            type: "food",
            image: "nanbin.jpg",
            distance: "25 km",
            map: "https://www.google.com/maps/place/%E7%8E%89%E9%87%8C%E6%A9%8B%E9%A0%AD%E8%87%AD%E8%B1%86%E8%85%90-%E8%8A%B1%E8%93%AE%E5%BA%97/@23.9678722,121.6081029,17z/"
        },
        {
            time: "21:00",
            location: "住宿：花蓮阿羅國際青年旅舍",
            highlight: "花蓮縣花蓮市富吉路58-3號、逛東大門夜市。",
            guide: "往返市區非常便利。",
            type: "stay",
            image: "hostel.jpg",
            distance: "3 km",
            map: "花蓮阿羅國際青年旅舍"
        }
    ],
    D2: [
        {
            time: "09:00",
            location: "府前食坊",
            highlight: "【美食】終極蛋餅、焗烤南瓜捲",
            guide: "花蓮縣政府斜對面。行政區路段路邊皆是白線且路幅極大，完全沒有停車壓力。",
            type: "food",
            distance: "起點",
            map: "府前食坊"
        },
        {
            time: "10:30",
            location: "鳳林鎮",
            highlight: "往南騎行約 30 分，享受縱谷平直道路。",
            guide: "道路筆直，適合新手感受動力。",
            type: "ride",
            image: "fenglin.png",
            distance: "30 km",
            map: "鳳林鎮"
        },
        {
            time: "11:30",
            location: "鳳林美食",
            highlight: "【美食】 鳳林韭菜臭豆腐。",
            guide: "鄉間路寬，路邊停車壓力極小。",
            type: "food",
            image: "fenglin_food.jpg",
            distance: "2 km",
            map: "https://www.google.com/maps/place/%E9%B3%B3%E6%9E%97+%E6%B8%B8%E7%BF%81+%E9%9F%AD%E8%8F%9C%E8%87%AD%E8%B1%86%E8%85%90/@23.743364,121.4476448,17z/"
        },
        {
            time: "13:30",
            location: "洄瀾灣",
            highlight: "【景點】 星巴克貨櫃門市、貨櫃市集。",
            guide: "停車空間極大，適合練習取景。",
            type: "spot",
            image: "starbucks.png",
            distance: "25 km",
            map: "星巴克 (洄瀾門市)"
        },
        {
            time: "15:00",
            location: "四八高地 / 柴魚博物館",
            highlight: "【景點】 俯瞰七星潭月牙灣全景。",
            guide: "停車點在奇萊鼻燈塔旁空地。",
            type: "spot",
            image: "si8.png",
            distance: "12 km",
            map: "四八高地"
        },
        {
            time: "16:30",
            location: "新城老街",
            highlight: "【美食】 佳興冰果室 (檸檬汁)。",
            guide: "老街路邊暫停，買完即走。",
            type: "food",
            image: "xincheng.jpg",
            distance: "15 km",
            map: "新城老街"
        },
        {
            time: "17:30",
            location: "啟程北返",
            highlight: "經蘇花改返回台北。",
            guide: "注意回程體力，可在和平休息。",
            type: "ride",
            distance: "150 km"
        }
    ],
    riders: [
        {
            name: "羅總工程師",
            bio: "【水蜜桃大車隊創隊元老】專業領隊，熱愛重機文化。此次旅行的發起者，負責帶領兄弟們征服花蓮的海岸線。",
            image: "rider1.jpg",
            tag: "領隊"
        },
        {
            name: "黃經理",
            bio: "【水蜜桃大車隊創隊元老】全能選手，跑步、騎車樣樣會，樣樣來，參加過台灣不少體育活動（包含世壯運）及國外馬拉松賽事。",
            image: "rider2.jpg",
            tag: "隊員1號"
        },
        {
            name: "林菜鳥",
            bio: "20年前，台灣正風行自行車時創立【水蜜桃大車隊】，後來年紀增長懶的自己踩，改換跑道跟一般的中年大叔興趣一樣，開車、騎重機",
            image: "rider3.jpg",
            tag: "隊員2號"
        }
    ]
};
