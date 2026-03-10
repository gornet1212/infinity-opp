import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect } from 'react';
import { 
  Plus, 
  Minus, 
  MessageCircle, 
  Trash2,
  Tag,
  ChevronUp,
  ChevronDown,
  User,
  Building2,
  Phone,
  ShoppingCart,
  X,
  Maximize2,
  Minimize2,
  Search
} from 'lucide-react';

// --- 資料庫 ---
const DATA = {
  mask: {
    label: "面膜紙",
    subCategories: ["面膜紙", "精華面膜紙"],
    items: {
      "面膜紙": [
        { id: "PM-001", name: "牛奶美顏面膜紙", price: 24, type: "normal" },
        { id: "PM-002", name: "玫瑰保濕面膜紙", price: 24, type: "normal" },
        { id: "PM-003", name: "甘菊藍防敏面膜紙", price: 24, type: "normal" },
        { id: "PM-004", name: "青瓜舒緩面膜紙", price: 24, type: "normal" },
        { id: "PM-005", name: "膠原蛋白面膜紙", price: 24, type: "normal" },
        { id: "PM-006", name: "檸檬草消炎面膜紙", price: 24, type: "normal" },
        { id: "PM-007", name: "純植物收毛孔面膜紙", price: 24, type: "normal" },
        { id: "PM-008", name: "熊果素激白面膜紙", price: 24, type: "normal" },
        { id: "PM-009", name: "MERCURY水凝面膜紙", price: 24, type: "normal" },
      ],
      "精華面膜紙": [
        { id: "EM-01", name: "左旋維他命C/ 牛奶 美白面膜紙", price: 28, type: "serum" },
        { id: "EM-02", name: "魚骨膠原 / 咖啡因 抗皺面膜紙", price: 28, type: "serum" },
        { id: "EM-03", name: "透明質酸 / 維他命B5 面膜紙", price: 28, type: "serum" },
        { id: "EM-04", name: "輔酵素Q10 / 維他命E 抗氧面膜紙", price: 28, type: "serum" },
      ]
    }
  },
  retail: {
    label: "客貨裝",
    subCategories: ["葡聚糖系列", "海洋注氧系列"],
    items: {
      "葡聚糖系列": [
        { id: "CMG-001", name: "葡聚糖修護潔膚凝膠", price: 172 },
        { id: "CMG-002", name: "葡聚糖修護潔面乳", price: 162 },
        { id: "CMG-003", name: "葡聚糖健膚水", price: 172 },
        { id: "CMG-004", name: "葡聚糖修護面膜", price: 172 },
        { id: "CMG-005", name: "葡聚糖防護日霜", price: 162 },
        { id: "CMG-006", name: "葡聚糖修護晚霜", price: 172 },
        { id: "CMG-007", name: "葡聚糖再生肌膚精華素", price: 208 },
        { id: "CMG-008", name: "葡聚糖修護眼霜", price: 208 },
      ],
      "海洋注氧系列": [
        { id: "O2-001", name: "海洋注氧卸妝油", price: 200 },
        { id: "O2-002", name: "海洋注氧卸妝液", price: 172 },
        { id: "O2-003", name: "海洋注氧深層淨膚凝膠", price: 162 },
        { id: "O2-004", name: "海洋注氧磨砂凝膠", price: 150 },
        { id: "O2-005", name: "海洋注氧保濕液", price: 184 },
        { id: "O2-006", name: "海洋注氧面膜", price: 208 },
        { id: "O2-007", name: "海洋注氧喚膚霜", price: 230 },
        { id: "O2-008", name: "海洋注氧眼部精華液", price: 172 },
        { id: "O2-009", name: "海洋注氧精華液", price: 162 },
      ]
    }
  },
  salon: {
    label: "美容院裝",
    subCategories: ["潔面", "爽膚水", "磨砂去死皮", "按摩", "離子啫喱", "底霜", "面膜", "眼部及唇部", "暗瘡黑頭", "精華", "面霜", "身體護理", "減肥"],
    items: {
      "潔面": [
        { id: "S-004", name: "MERCURY植物滋潤卸妝油", price: 260 },
        { id: "RC-001", name: "維他命C美白卸妝潔面奶", price: 174 },
        { id: "RC-002", name: "玫瑰保濕卸妝潔面奶", price: 174 },
        { id: "RC-003", name: "甘菊藍防敏卸妝潔面奶", price: 174 },
        { id: "RC-004", name: "青瓜舒緩卸妝潔面奶", price: 174 },
        { id: "RC-005", name: "膠原蛋白卸妝潔面奶", price: 174 },
        { id: "RC-006", name: "檸檬草消炎卸妝潔面奶", price: 174 },
        { id: "RC-007", name: "純植物收毛孔卸妝潔面奶", price: 174 },
        { id: "RC-009", name: "MERCURY水凝卸妝潔面奶", price: 184 },
        { id: "CG-003", name: "MERCURY水凝潔面啫喱", price: 196 },
        { id: "CG-004", name: "膠原蛋白潔面啫喱", price: 184 },
      ],
      "爽膚水": [
        { id: "FR-001", name: "維他命C美白爽膚水", price: 174 },
        { id: "FR-002", name: "玫瑰保濕爽膚水", price: 174 },
        { id: "FR-003", name: "甘菊藍防敏爽膚水", price: 174 },
        { id: "FR-004", name: "青瓜舒緩爽膚水", price: 174 },
        { id: "FR-005", name: "膠原蛋白爽膚水", price: 174 },
        { id: "FR-006", name: "檸檬草消炎爽膚水", price: 174 },
        { id: "FR-007", name: "純植物收毛孔爽膚水", price: 174 },
        { id: "FR-009", name: "MERCURY水凝爽膚水", price: 184 },
      ],
      "磨砂去死皮": [
        { id: "SP-001", name: "維他命C美白磨砂膏", price: 184 },
        { id: "SP-002", name: "玫瑰保濕磨砂膏", price: 184 },
        { id: "SP-003", name: "膠原蛋白磨砂膏", price: 184 },
        { id: "SP-004", name: "檸檬草消炎磨砂膏", price: 184 },
        { id: "SP-005", name: "淨白亮肌去死皮液", price: 208 },
        { id: "SP-006", name: "植物身體美白磨砂", price: 184 },
        { id: "SPG-001", name: "膠原蛋白磨砂啫喱", price: 184 },
        { id: "SPG-002", name: "青瓜保濕磨砂啫喱", price: 184 },
      ],
      "按摩": [
        { id: "MC-001", name: "維他命C美白按摩膏", price: 184 },
        { id: "MC-002", name: "玫瑰保濕按摩膏", price: 184 },
        { id: "MC-003", name: "甘菊藍防敏按摩膏", price: 184 },
        { id: "MC-004", name: "青瓜舒緩按摩膏", price: 184 },
        { id: "MC-005", name: "膠原蛋白按摩膏", price: 184 },
        { id: "MC-006", name: "檸檬草消炎按摩膏", price: 184 },
        { id: "MC-007", name: "純植物收毛孔按摩膏", price: 184 },
        { id: "MC-009", name: "MERCURY水凝按摩膏", price: 208 },
        { id: "MG-003", name: "膠原蛋白按摩啫喱", price: 184 },
        { id: "MG-004", name: "MERCURY水凝按摩啫喱", price: 208 },
        { id: "FMO-001", name: "香薰通淋巴面部按摩油", price: 234 },
        { id: "FMO-002", name: "香薰舒緩面部按摩油", price: 234 },
        { id: "FMO-003", name: "香薰抗氧化面部按摩油", price: 234 },
      ],
      "離子啫喱": [
        { id: "IG-001", name: "維他命B5美白離子啫喱", price: 230 },
        { id: "IG-002", name: "玫瑰保濕離子啫喱", price: 230 },
        { id: "IG-003", name: "甘菊藍防敏離子啫喱", price: 230 },
        { id: "IG-004", name: "青瓜舒緩離子啫喱", price: 230 },
        { id: "IG-005", name: "膠原蛋白離子啫喱", price: 230 },
        { id: "IG-006", name: "檸檬草消炎離子啫喱", price: 230 },
        { id: "IG-007", name: "純植物收毛孔離子啫喱", price: 230 },
        { id: "IG-009", name: "MERCURY水凝離子啫喱", price: 230 },
      ],
      "底霜": [
        { id: "BC-001", name: "細緻毛孔控油底霜", price: 230 },
        { id: "BC-004", name: "玫瑰保濕底霜", price: 230 },
      ],
      "面膜": [
        { id: "FCM-001", name: "熊果素激白面膜", price: 254 },
        { id: "FCM-002", name: "淨白保濕面膜", price: 254 },
        { id: "FCM-003", name: "甘菊藍防敏面膜", price: 230 },
        { id: "FCM-004", name: "活細胞舒緩面膜", price: 254 },
        { id: "FCM-005", name: "骨膠原能量面膜", price: 254 },
        { id: "FCM-006", name: "冰極暗瘡消炎面膜", price: 254 },
        { id: "FCM-007", name: "純植物收毛孔面膜", price: 230 },
        { id: "FCM-009", name: "MERCURY水凝面膜", price: 254 },
      ],
      "眼部及唇部": [
        { id: "EM-001", name: "膠原蛋白修護眼膜", price: 230 },
        { id: "ECG-001", name: "胡蘿蔔緊緻眼啫喱", price: 230 },
        { id: "ECG-002", name: "純中草藥馬尾草眼霜", price: 230 },
        { id: "LM-001", name: "維他命E修護唇膜", price: 180 },
        { id: "LM-002", name: "DPHP高保濕去紋唇膜", price: 180 },
        { id: "LM-003", name: "紅沒藥醇護理唇膜", price: 180 },
      ],
      "暗瘡黑頭": [
        { id: "SDC-001", name: "暗瘡消炎水(有粉)", price: 176 },
        { id: "SDC-002", name: "暗瘡消炎水(無粉)", price: 148 },
        { id: "SDC-003", name: "暗瘡膏", price: 208 },
        { id: "SDC-004", name: "去黑頭油脂液", price: 256 },
      ],
      "精華": [
        { id: "EE-001", name: "MERCURY活細胞精華液", price: 300 },
        { id: "EE-002", name: "玫瑰保濕精華液", price: 300 },
        { id: "EE-003", name: "維他命C美白精華液", price: 300 },
      ],
      "面霜": [
        { id: "DC-001", name: "維他命C美白面霜", price: 230 },
        { id: "DC-002", name: "骨膠原蛋白面霜", price: 230 },
        { id: "DC-003", name: "甘菊藍防敏面霜", price: 230 },
        { id: "DC-004", name: "防曬淨白面霜", price: 346 },
        { id: "DC-005", name: "純植物收毛孔面霜", price: 242 },
        { id: "DC-006", name: "MERCURY水凝面霜", price: 276 },
      ],
      "身體護理": [
        { id: "EMO-001", name: "青檸橙花香薰按摩油", price: 260 },
        { id: "EMO-002", name: "香薰舒緩身體按摩油", price: 260 },
        { id: "EMO-003", name: "香薰排毒減肥護理油", price: 260 },
        { id: "EMO-004", name: "香薰消水腫護理油", price: 260 },
        { id: "EMO-006", name: "推背淋巴香薰按摩油", price: 260 },
        { id: "MO-001", name: "維他命E按摩油", price: 196 },
        { id: "MO-002", name: "玫瑰草按摩油", price: 196 },
        { id: "MO-003", name: "白蘭花按摩油", price: 196 },
        { id: "MO-004", name: "舒筋活絡按摩油", price: 196 },
        { id: "BT-011", name: "香薰胸部提升啫喱", price: 300 },
        { id: "BT-012", name: "香薰胸部收緊啫喱", price: 300 },
        { id: "BT-013", name: "活性豐胸多元精華乳霜", price: 576 },
      ],
      "減肥": [
        { id: "BT-001", name: "辣椒熱能減肥膏(普通型)", price: 208 },
        { id: "BT-002", name: "辣椒熱能減肥膏(特強型)", price: 230 },
        { id: "BT-003", name: "薄荷咖啡因子減肥膏", price: 184 },
        { id: "BT-004", name: "去蜂窩橙皮紋膏", price: 300 },
        { id: "BT-007", name: "辣椒熱能減肥啫喱(普通型)", price: 208 },
        { id: "BT-008", name: "辣椒熱能減肥啫喱(特強型)", price: 230 },
        { id: "BT-009", name: "冰極凍身收緊啫喱", price: 208 },
        { id: "BT-010", name: "薄荷咖啡因子減肥啫喱", price: 230 },
        { id: "BT-014", name: "胡椒薑排毒去水腫啫喱", price: 360 },
        { id: "AS-005", name: "MERCURY排毒香薰鹽", price: 150 },
        { id: "AS-006", name: "MERCURY減肥香薰鹽", price: 150 },
      ]
    }
  }
};

const WHATSAPP_NUMBER = "94980098";

const App = () => {
  const [activeTab, setActiveTab] = useState('mask');
  const [activeSubTab, setActiveSubTab] = useState('');
  const [cart, setCart] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomScale, setZoomScale] = useState(1); // 比例尺狀態
  
  const [customerInfo, setCustomerInfo] = useState({
    company: '',
    contact: '',
    phone: ''
  });

  useEffect(() => {
    setActiveSubTab(DATA[activeTab].subCategories[0]);
  }, [activeTab]);

  const MASK_TIERS = {
    normal: [{ qty: 1000, price: 5 }, { qty: 500, price: 5.5 }, { qty: 100, price: 6 }, { qty: 20, price: 8 }],
    serum: [{ qty: 1000, price: 8 }, { qty: 500, price: 9.5 }, { qty: 100, price: 12 }, { qty: 20, price: 14 }]
  };

  const getMaskPriceInfo = useCallback((q, type) => {
    const tiers = MASK_TIERS[type];
    const currentTier = tiers.find(t => q >= t.qty);
    const nextTier = [...tiers].reverse().find(t => q < t.qty);
    return {
      currentPrice: currentTier ? currentTier.price : (type === 'normal' ? 24 : 28),
      nextTierQty: nextTier ? nextTier.qty : null,
      nextTierPrice: nextTier ? nextTier.price : null,
      diff: nextTier ? nextTier.qty - q : 0
    };
  }, []);

  const cartSummary = useMemo(() => {
    const rawItems = [];
    let stats = { salonHalfTotal: 0, retailTotal: 0, retailCount: 0, maskNormalCount: 0, maskSerumCount: 0 };

    Object.entries(cart).forEach(([id, qty]) => {
      if (qty <= 0) return;
      let product = null;
      let categoryKey = '';
      for (const [key, data] of Object.entries(DATA)) {
        for (const catItems of Object.values(data.items)) {
          const found = catItems.find(i => i.id === id || i.name === id);
          if (found) { product = found; categoryKey = key; break; }
        }
        if (product) break;
      }

      if (product) {
        rawItems.push({ ...product, categoryKey, qty });
        if (categoryKey === 'salon') stats.salonHalfTotal += (product.price / 2) * qty;
        else if (categoryKey === 'retail') {
          stats.retailTotal += product.price * qty;
          stats.retailCount += qty;
        } else if (categoryKey === 'mask') {
          if (product.type === 'normal') stats.maskNormalCount += qty;
          else stats.maskSerumCount += qty;
        }
      }
    });

    const nInfo = getMaskPriceInfo(stats.maskNormalCount, 'normal');
    const sInfo = getMaskPriceInfo(stats.maskSerumCount, 'serum');

    const itemsList = rawItems.map(item => {
      let unitPrice = item.price;
      if (item.categoryKey === 'salon') unitPrice = item.price / 2;
      else if (item.categoryKey === 'mask') {
        unitPrice = item.type === 'normal' ? nInfo.currentPrice : sInfo.currentPrice;
      }
      return { ...item, unitPrice, subtotal: unitPrice * item.qty };
    });

    return { itemsList, stats, nInfo, sInfo };
  }, [cart, getMaskPriceInfo]);

  const promos = useMemo(() => {
    const { stats, itemsList, nInfo } = cartSummary;
    let salonLabel = "";
    let salonDeduct = 0;
    let salonPercent = 0;
    const totalVal = stats.salonHalfTotal; // 已揀貨品嘅總半價貨值

    // --- 美容院裝終極優惠邏輯 ---
    if (totalVal >= 2300) {
      salonLabel = "已享有 $1600 送 $700 優惠";
      salonDeduct = 700;
      salonPercent = 100;
    } else if (totalVal >= 1600) {
      const freeRemain = 2300 - totalVal;
      salonLabel = `已扣減 $700，仲可以揀多 $${freeRemain.toFixed(2)} 免費貨`;
      salonDeduct = totalVal - 1600; // 超過1600嘅部分全部扣減(即係免費攞)
      salonPercent = 100;
    } else if (totalVal >= 1100) {
      // 介乎 1100 - 1600 之間，目標升級去 1600
      salonLabel = `已有 $800 優惠，仲差 $${(1600 - totalVal).toFixed(2)} 升級 $700 優惠`;
      salonDeduct = 200;
      salonPercent = (totalVal / 1600) * 100;
    } else if (totalVal >= 800) {
      const freeRemain = 1000 - totalVal;
      salonLabel = `已扣減 $200，仲可以揀多 $${Math.max(0, freeRemain).toFixed(2)} 免費貨`;
      salonDeduct = totalVal - 800; // 超過800嘅部分全部扣減(即係免費攞)
      salonPercent = 100;
    } else {
      salonLabel = `美容院裝 (半價再送) 仲差 $${(800 - totalVal).toFixed(2)} 攞 $200 貨`;
      salonDeduct = 0;
      salonPercent = (totalVal / 800) * 100;
    }

    const retailDiscount = stats.retailCount >= 6 ? stats.retailTotal * 0.2 : 0;
    const retailFinal = stats.retailTotal - retailDiscount;
    const maskTotal = itemsList.filter(i => i.categoryKey === 'mask').reduce((acc, i) => acc + i.subtotal, 0);

    // 實付金額 = 總貨值 - 扣減金額
    const finalTotal = Math.max(0, stats.salonHalfTotal - salonDeduct) + retailFinal + maskTotal;
    const totalSaving = salonDeduct + retailDiscount;

    const progress = [
      { id: 'salon', show: stats.salonHalfTotal > 0, label: `美容院裝 (貨值:$${totalVal.toFixed(2)})`, current: salonLabel, percent: Math.min(100, salonPercent), color: 'bg-rose-500' },
      { id: 'retail', show: stats.retailCount > 0, label: '客貨裝 (6件8折)', current: stats.retailCount >= 6 ? '已享 8 折' : `還差 ${6 - stats.retailCount} 件享折`, percent: Math.min(100, (stats.retailCount / 6) * 100), color: 'bg-emerald-500' },
      { id: 'mask_n', show: stats.maskNormalCount > 0, label: `面膜 (${stats.maskNormalCount}張)`, current: nInfo.nextTierQty ? `差 ${nInfo.diff} 張每片 $${nInfo.nextTierPrice.toFixed(2)}` : `已享最低價`, percent: Math.min(100, (stats.maskNormalCount / (nInfo.nextTierQty || 1000)) * 100), color: 'bg-blue-500' }
    ].filter(p => p.show);

    return { grandTotal: finalTotal, totalSaving, progress };
  }, [cartSummary]);

  const updateQty = useCallback((id, val) => {
    const n = val === "" ? 0 : parseInt(val);
    setCart(prev => ({ ...prev, [id]: Math.max(0, n) }));
  }, []);

  const IsolatedInput = React.memo(({ id, initialQty, onUpdate, isMini }) => {
    const [inputValue, setInputValue] = useState(initialQty === 0 ? "" : initialQty.toString());
    useLayoutEffect(() => { setInputValue(initialQty === 0 ? "" : initialQty.toString()); }, [initialQty]);
    const handleChange = (e) => setInputValue(e.target.value);
    const handleBlur = () => onUpdate(id, inputValue);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onUpdate(id, inputValue);
            e.target.blur();
        }
    };
    return (
      <input 
        type="number" pattern="\d*" inputMode="numeric"
        value={inputValue} placeholder="0"
        onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown}
        className={`mobile-input ${isMini ? 'w-12 text-[16px] text-white' : 'w-14 text-[18px] text-black'} text-center bg-transparent font-black focus:outline-none`} 
      />
    );
  });

  const QuantitySelector = ({ id, qty, isMini = false }) => (
    <div className={`flex items-center rounded-xl border ${isMini ? 'bg-white/10 border-white/20 p-0.5' : 'bg-gray-50 border-gray-200 p-1'}`}>
      <button onClick={() => updateQty(id, (qty || 0) - 1)} className={`${isMini ? 'w-9 h-9 text-white/70' : 'w-12 h-12 text-gray-500'} flex items-center justify-center active:bg-black/10 rounded-lg transition-colors`}>
        <Minus size={isMini ? 14 : 20}/>
      </button>
      <IsolatedInput id={id} initialQty={qty || 0} onUpdate={updateQty} isMini={isMini} />
      <button onClick={() => updateQty(id, (qty || 0) + 1)} className={`${isMini ? 'w-9 h-9 text-white/70' : 'w-12 h-12 text-gray-500'} flex items-center justify-center active:bg-black/10 rounded-lg transition-colors`}>
        <Plus size={isMini ? 14 : 20}/>
      </button>
    </div>
  );

  const handleFinalOrder = () => {
    let msg = `INFINITY CHEMICAL 訂單確認：\n`;
    msg += `------------------------------------------\n`;
    msg += `公司：${customerInfo.company || '未提供'}\n`;
    msg += `聯絡人：${customerInfo.contact || '未提供'}\n`;
    msg += `電話：${customerInfo.phone || '未提供'}\n`;
    msg += `------------------------------------------\n`;
    msg += `貨號 | 產品名稱 | 單價 | 數量 | 小計\n`;
    msg += `------------------------------------------\n`;
    
    cartSummary.itemsList.forEach(i => { 
      msg += `${i.id || 'N/A'} | ${i.name} | ${i.unitPrice.toFixed(2)} | ${i.qty} | ${i.subtotal.toFixed(2)}\n`; 
    });

    if (promos.totalSaving > 0) {
      msg += `------------------------------------------\n`;
      msg += `優惠已扣減：-HK$ ${promos.totalSaving.toFixed(2)}\n`;
    }

    msg += `------------------------------------------\n`;
    msg += `應付總額：HK$ ${promos.grandTotal.toFixed(2)}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
  };

  const hasItems = Object.values(cart).some(v => v > 0);

  // --- 購物清單組件 ---
  const CartContent = ({ isSidebar = false }) => (
    <div className={`space-y-8 ${isSidebar ? 'p-0' : 'px-8 pb-12'}`}>
      <div id="customer-form" className="space-y-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-inner">
        <div className="text-[12px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
          <Tag size={16} /> 聯絡資料 (可選)
        </div>
        <div className="space-y-4">
          <div className="relative group">
              <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400" />
              <input type="text" placeholder="公司名稱" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base focus:border-emerald-500 outline-none placeholder:text-slate-600 text-white" value={customerInfo.company} onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})} />
          </div>
          <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400" />
              <input type="text" placeholder="聯絡人姓名" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base focus:border-emerald-500 outline-none placeholder:text-slate-600 text-white" value={customerInfo.contact} onChange={(e) => setCustomerInfo({...customerInfo, contact: e.target.value})} />
          </div>
          <div className="relative group">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400" />
              <input type="tel" placeholder="電話號碼" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base focus:border-emerald-500 outline-none placeholder:text-slate-600 text-white" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Maximize2 size={16} className="text-blue-400" /> 優惠詳情
        </div>
        {promos.progress.map(p => (
          <div key={p.id} className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[14px] font-extrabold text-white tracking-wide">{p.label}</span>
              <span className="text-[12px] font-bold text-emerald-400 text-right">{p.current}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full ${p.color} transition-all duration-1000 shadow-[0_0_15px_rgba(244,63,94,0.3)]`} style={{ width: `${p.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-white/10 pb-2 flex items-center gap-2">
          <ShoppingCart size={16} /> 已選購產品 ({cartSummary.itemsList.length})
        </div>
        <div className="space-y-4">
          {cartSummary.itemsList.map(i => (
            <div key={i.id || i.name} className="bg-white/5 p-5 rounded-2xl flex items-center justify-between gap-4 border border-white/5 shadow-lg">
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-black text-base truncate mb-1">{i.name}</span>
                <span className="text-[12px] text-slate-400 font-mono tracking-tight font-bold">單價 ${i.unitPrice.toFixed(2)} | 小計 ${i.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3">
                 <QuantitySelector id={i.id || i.name} qty={i.qty} isMini={true} />
                 <button onClick={() => updateQty(i.id || i.name, 0)} className="text-slate-500 hover:text-rose-400 p-2 transition-all active:scale-90">
                  <Trash2 size={20} />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 antialiased font-sans pb-40 lg:pb-0 transition-all duration-300" style={{ fontSize: `${zoomScale * 100}%` }}>
      
      {/* 比例尺拉桿 - 定位喺頂部 */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] group">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur shadow-xl border border-slate-200 rounded-full px-4 py-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <Minimize2 size={14} className="text-slate-400" />
           <input 
             type="range" min="0.8" max="1.5" step="0.05" 
             value={zoomScale} 
             onChange={(e) => setZoomScale(parseFloat(e.target.value))}
             className="w-32 accent-rose-500 cursor-pointer"
           />
           <Maximize2 size={14} className="text-slate-400" />
           <span className="text-[10px] font-black text-slate-600 w-8">{Math.round(zoomScale * 100)}%</span>
        </div>
      </div>

      <header className="sticky top-0 bg-white/95 backdrop-blur-lg z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center mb-5">
            <h1 className="font-serif tracking-widest text-3xl font-black italic text-slate-900">INFINITY</h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <Search size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">比例尺: {Math.round(zoomScale * 100)}%</span>
              </div>
              <span className="text-[10px] tracking-[0.3em] text-slate-400 font-bold uppercase border border-slate-200 px-3 py-1.5 rounded-full">Chemical Trading</span>
            </div>
          </div>
          <nav className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth">
            {Object.entries(DATA).map(([k, v]) => (
              <button key={k} onClick={() => setActiveTab(k)} className={`pb-4 text-sm tracking-[0.25em] relative whitespace-nowrap transition-all uppercase ${activeTab === k ? 'text-black font-extrabold scale-110' : 'text-slate-400 font-bold hover:text-slate-600'}`}>
                {v.label}
                {activeTab === k && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black rounded-t-full shadow-[0_-4px_10px_rgba(0,0,0,0.1)]" />}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-[118px] z-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
          {DATA[activeTab].subCategories.map(c => (
            <button key={c} onClick={() => setActiveSubTab(c)} className={`px-6 py-2.5 rounded-full text-[12px] font-black whitespace-nowrap border shadow-sm transition-all duration-300 ${activeSubTab === c ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-xl' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12" style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top left', width: `${100/zoomScale}%` }}>
        {/* 左邊：產品清單 (加大字體版) */}
        <div className="flex-1 space-y-5">
          {(DATA[activeTab].items[activeSubTab] || []).map((item) => (
            <div key={item.id || item.name} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center hover:shadow-xl transition-all duration-500 group">
              <div className="flex-1 pr-6">
                {item.id && <span className="text-[11px] font-mono text-slate-400 block mb-2 tracking-widest font-bold group-hover:text-rose-400 transition-colors">{item.id}</span>}
                <h4 className="text-[18px] font-black leading-tight text-slate-900 mb-2">{item.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-black text-slate-400">$</span>
                  {activeTab === 'salon' ? (
                    <div className="flex items-center gap-4">
                      <span className="text-rose-500 font-mono text-base line-through decoration-rose-600 decoration-2 italic opacity-50">
                        {item.price.toFixed(2)}
                      </span>
                      <span className="text-slate-900 font-mono text-xl font-black tracking-tighter bg-yellow-100/80 px-2 rounded-md">
                        {(item.price/2).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-900 font-mono text-xl font-black tracking-tighter">
                      {item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <QuantitySelector id={item.id || item.name} qty={cart[item.id || item.name] || 0} />
            </div>
          ))}
        </div>

        {/* 右邊：電腦版側欄購物車 (加大字體版) */}
        <div className="hidden lg:block w-[450px] shrink-0">
          <div className="sticky top-48 bg-slate-900 text-white rounded-[3rem] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
                    <ShoppingCart size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">落單清單</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                <CartContent isSidebar={true} />
            </div>

            <div className="pt-8 border-t border-white/10 mt-8 space-y-6">
                <div className="flex justify-between items-end">
                    <span className="text-[12px] text-slate-500 font-black uppercase tracking-[0.3em]">應付總額</span>
                    <span className="text-4xl font-mono font-black text-white leading-none tracking-tighter">
                        <span className="text-lg font-sans mr-2 text-slate-500">HK$</span>
                        {promos.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
                <button onClick={handleFinalOrder} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/40 active:scale-95 py-6 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 transition-all duration-300">
                    <MessageCircle size={24} /> WhatsApp 落單
                </button>
            </div>
          </div>
        </div>
      </main>

      {/* 手機版底部抽屜 (加大字體版) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[60] transition-all duration-500 ease-out transform ${hasItems ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="max-w-2xl mx-auto px-4 pb-10">
          <div className="bg-slate-900 text-white rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden">
            <div className="relative">
                <button onClick={() => setIsExpanded(!isExpanded)} className="w-full py-6 flex flex-col items-center gap-2 active:bg-white/5 transition-colors">
                    <div className="w-16 h-2 bg-white/20 rounded-full mb-1" />
                    <div className="text-[12px] tracking-[0.25em] font-black text-slate-400 uppercase flex items-center gap-3">
                        {isExpanded ? '收起清單' : '落單及填寫資料'} 
                        {isExpanded ? <ChevronDown size={18} className="animate-bounce" /> : <ChevronUp size={18} className="animate-bounce" />}
                    </div>
                </button>
                {isExpanded && (
                    <button onClick={() => setIsExpanded(false)} className="absolute right-8 top-6 p-3 bg-white/10 rounded-full text-white/50 active:scale-90">
                        <X size={20} />
                    </button>
                )}
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-y-auto custom-scrollbar ${isExpanded ? 'max-h-[80vh]' : 'max-h-0'}`}>
                <CartContent isSidebar={false} />
            </div>
            <div className="px-12 py-10 bg-black/40 backdrop-blur-md flex items-center justify-between border-t border-white/10 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-500 font-black uppercase tracking-[0.25em] mb-1">應付總額</span>
                <span className="text-3xl font-mono font-black text-white tracking-tighter leading-none">
                  {promos.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button 
                onClick={handleFinalOrder} 
                className="bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 px-10 py-6 rounded-3xl font-black text-base flex items-center gap-4 active:scale-95 transition-all duration-300"
              >
                <MessageCircle size={22} /> 落單
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .mobile-input { font-size: 18px !important; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        * { -webkit-tap-highlight-color: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        
        /* 比例尺 Slider 樣式 */
        input[type=range] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
          background: #e2e8f0;
          border-radius: 10px;
        }
        input[type=range]::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f43f5e;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -7px;
          box-shadow: 0 4px 10px rgba(244,63,94,0.3);
        }
      `}</style>
    </div>
  );
};

export default App;
