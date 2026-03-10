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
  Phone
} from 'lucide-react';

// --- 完整資料庫整合 ---
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
        { id: "BC-001", name: "熊果素/維他命C底霜", price: 230 },
        { id: "BC-002", name: "膠原蛋白底霜", price: 230 },
        { id: "BC-003", name: "細緻毛孔控油底霜", price: 230 },
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
  
  // 客戶資料狀態
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
    let salonTarget = 800;
    let salonDeduct = 0;
    
    if (stats.salonHalfTotal >= 2300) {
      salonLabel = "已享有 $1600 送 $700 優惠";
      salonTarget = 2300;
      salonDeduct = 700;
    } else if (stats.salonHalfTotal >= 1600) {
      salonLabel = `重有 $${(2300 - stats.salonHalfTotal).toFixed(0)} 嘅貨免費送出`;
      salonTarget = 2300;
      salonDeduct = 0;
    } else if (stats.salonHalfTotal >= 800) {
      salonLabel = `已有 $800 送 $200 優惠，仲差 $${(1600 - stats.salonHalfTotal).toFixed(0)} 升級`;
      salonTarget = 1600;
      salonDeduct = 200;
    } else {
      salonLabel = `$800 送 $200 優惠提示：重有 $${(800 - stats.salonHalfTotal).toFixed(0)} 貨可以攞`;
      salonTarget = 800;
      salonDeduct = 0;
    }

    const retailDiscount = stats.retailCount >= 6 ? stats.retailTotal * 0.2 : 0;
    const retailFinal = stats.retailTotal - retailDiscount;
    const maskTotal = itemsList.filter(i => i.categoryKey === 'mask').reduce((acc, i) => acc + i.subtotal, 0);

    const finalTotal = Math.max(0, stats.salonHalfTotal - salonDeduct) + retailFinal + maskTotal;
    const totalSaving = salonDeduct + retailDiscount;

    const progress = [
      { id: 'salon', show: stats.salonHalfTotal > 0, label: '美容院裝 (半價再送)', current: salonLabel, percent: Math.min(100, (stats.salonHalfTotal / salonTarget) * 100), color: 'bg-rose-500' },
      { id: 'retail', show: stats.retailCount > 0, label: '客貨裝 (6件8折)', current: stats.retailCount >= 6 ? '已享 8 折' : `還差 ${6 - stats.retailCount} 件享折`, percent: Math.min(100, (stats.retailCount / 6) * 100), color: 'bg-emerald-500' },
      { id: 'mask_n', show: stats.maskNormalCount > 0, label: `面膜 (${stats.maskNormalCount}張)`, current: nInfo.nextTierQty ? `差 ${nInfo.diff} 張每片 $${nInfo.nextTierPrice}` : `已享最低價`, percent: Math.min(100, (stats.maskNormalCount / (nInfo.nextTierQty || 1000)) * 100), color: 'bg-blue-500' }
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
    return (
      <input 
        type="number" pattern="\d*" inputMode="numeric"
        value={inputValue} placeholder="0"
        onChange={handleChange} onBlur={handleBlur}
        className={`mobile-input ${isMini ? 'w-10 text-[13px] text-white' : 'w-12 text-[15px] text-black'} text-center bg-transparent font-black focus:outline-none`} 
      />
    );
  });

  const QuantitySelector = ({ id, qty, isMini = false }) => (
    <div className={`flex items-center rounded-lg border ${isMini ? 'bg-white/10 border-white/10 p-0' : 'bg-gray-50 border-gray-100 p-0.5'}`}>
      <button onClick={() => updateQty(id, (qty || 0) - 1)} className={`${isMini ? 'w-8 h-8 text-white/50' : 'w-10 h-10 text-gray-400'} flex items-center justify-center active:bg-white/10 rounded-l-md`}>
        <Minus size={isMini ? 14 : 16}/>
      </button>
      <IsolatedInput id={id} initialQty={qty || 0} onUpdate={updateQty} isMini={isMini} />
      <button onClick={() => updateQty(id, (qty || 0) + 1)} className={`${isMini ? 'w-8 h-8 text-white/50' : 'w-10 h-10 text-gray-400'} flex items-center justify-center active:bg-white/10 rounded-r-md`}>
        <Plus size={isMini ? 14 : 16}/>
      </button>
    </div>
  );

  const handleFinalOrder = () => {
    if (!customerInfo.company || !customerInfo.contact || !customerInfo.phone) {
        if (!isExpanded) setIsExpanded(true);
        setTimeout(() => {
          document.getElementById('customer-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
    }

    let msg = `INFINITY CHEMICAL 訂單確認：\n`;
    msg += `------------------------------------------\n`;
    msg += `公司：${customerInfo.company}\n`;
    msg += `聯絡人：${customerInfo.contact}\n`;
    msg += `電話：${customerInfo.phone}\n`;
    msg += `------------------------------------------\n`;
    msg += `貨號 | 產品名稱 | 單價 | 數量 | 小計\n`;
    msg += `------------------------------------------\n`;
    
    cartSummary.itemsList.forEach(i => { 
      msg += `${i.id || 'N/A'} | ${i.name} | ${i.unitPrice.toFixed(1)} | ${i.qty} | ${i.subtotal.toFixed(1)}\n`; 
    });

    if (promos.totalSaving > 0) {
      msg += `------------------------------------------\n`;
      msg += `優惠已扣減：-HK$ ${promos.totalSaving.toFixed(1)}\n`;
    }

    msg += `------------------------------------------\n`;
    msg += `應付總額：HK$ ${promos.grandTotal.toFixed(1)}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
  };

  const hasItems = Object.values(cart).some(v => v > 0);

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black antialiased font-sans pb-40">
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-5 pt-4 pb-1">
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-serif tracking-[0.2em] text-xl font-black italic">INFINITY</h1>
            <span className="text-[7px] tracking-[0.2em] text-gray-400 font-bold uppercase border border-gray-100 px-2 py-0.5 rounded">Chemical Trading</span>
          </div>
          <nav className="flex gap-6 overflow-x-auto no-scrollbar pb-1">
            {Object.entries(DATA).map(([k, v]) => (
              <button key={k} onClick={() => setActiveTab(k)} className={`pb-2 text-[11px] tracking-widest relative whitespace-nowrap transition-all ${activeTab === k ? 'text-black font-black' : 'text-gray-400 font-medium'}`}>
                {v.label}
                {activeTab === k && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-gray-50/50 overflow-x-auto no-scrollbar border-b border-gray-50 sticky top-[95px] z-40">
        <div className="max-w-4xl mx-auto px-5 py-2 flex gap-2">
          {DATA[activeTab].subCategories.map(c => (
            <button key={c} onClick={() => setActiveSubTab(c)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap border transition-all ${activeSubTab === c ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(DATA[activeTab].items[activeSubTab] || []).map((item, idx) => (
            <div key={item.id || item.name} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
              <div className="flex-1 pr-3">
                {item.id && <span className="text-[8px] font-mono text-gray-300 block mb-0.5">{item.id}</span>}
                <h4 className="text-[12px] font-bold leading-tight text-gray-800">{item.name}</h4>
                <div className="mt-1">
                  <span className="text-gray-900 font-mono text-xs font-black">$ {activeTab === 'salon' ? (item.price/2).toFixed(1) : item.price.toFixed(1)}</span>
                </div>
              </div>
              <QuantitySelector id={item.id || item.name} qty={cart[item.id || item.name] || 0} />
            </div>
          ))}
        </div>
      </main>

      <div className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-500 ${hasItems ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-lg mx-auto px-4 pb-6">
          <div className="bg-neutral-900 text-white rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full py-4 flex flex-col items-center gap-1 active:bg-white/5">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
              <div className="text-[9px] tracking-widest font-bold text-gray-500 uppercase mt-1 flex items-center gap-1">
                {isExpanded ? '收起清單' : '填寫資料及落單'} 
                {isExpanded ? <ChevronDown size={12}/> : <ChevronUp size={12}/>}
              </div>
            </button>

            <div className={`transition-all duration-300 overflow-y-auto ${isExpanded ? 'max-h-[70vh]' : 'max-h-0'}`}>
              <div className="px-8 pb-8 space-y-6">
                
                <div id="customer-form" className="space-y-4 bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} className="text-emerald-500" /> 請填寫聯絡資料
                  </div>
                  
                  <div className="space-y-3">
                    <div className="relative">
                        <Building2 size={14} className="absolute left-3 top-3.5 text-gray-500" />
                        <input 
                            type="text"
                            placeholder="公司名稱 *"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-emerald-500 outline-none transition-colors"
                            value={customerInfo.company}
                            onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                        <User size={14} className="absolute left-3 top-3.5 text-gray-500" />
                        <input 
                            type="text"
                            placeholder="聯絡人姓名 *"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-emerald-500 outline-none transition-colors"
                            value={customerInfo.contact}
                            onChange={(e) => setCustomerInfo({...customerInfo, contact: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                        <Phone size={14} className="absolute left-3 top-3.5 text-gray-500" />
                        <input 
                            type="tel"
                            placeholder="電話號碼 *"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs focus:border-emerald-500 outline-none transition-colors"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        />
                    </div>
                  </div>
                </div>

                {promos.progress.map(p => (
                  <div key={p.id} className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[11px] font-bold text-white whitespace-nowrap">{p.label}</span>
                      <span className="text-[10px] font-medium text-emerald-400 text-right">{p.current}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${p.color} transition-all duration-700`} style={{ width: `${p.percent}%` }} />
                    </div>
                  </div>
                ))}

                <div className="space-y-3">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1">已選清單</div>
                  {cartSummary.itemsList.map(i => (
                    <div key={i.id || i.name} className="bg-white/5 p-3 rounded-2xl flex items-center justify-between gap-4">
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-gray-100 font-bold text-[11px] truncate">{i.name}</span>
                        <span className="text-[9px] text-gray-500 mt-0.5">單價: ${i.unitPrice.toFixed(1)} | 小計: ${i.subtotal.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <QuantitySelector id={i.id || i.name} qty={i.qty} isMini={true} />
                         <button onClick={() => updateQty(i.id || i.name, 0)} className="text-gray-400 hover:text-rose-500 p-2 active:scale-90"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-white/5 flex items-center justify-between border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">應付總額</span>
                <span className="text-2xl font-mono font-black text-white">HK$ {promos.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 1 })}</span>
              </div>
              <button 
                onClick={handleFinalOrder} 
                className={`${(!customerInfo.company || !customerInfo.contact || !customerInfo.phone) ? 'bg-gray-700 opacity-50' : 'bg-emerald-500 shadow-emerald-500/20'} text-white px-8 py-4 rounded-2xl font-black text-[14px] flex items-center gap-2 shadow-lg active:scale-95 transition-all`}
              >
                <MessageCircle size={18} /> WhatsApp 落單
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .mobile-input { font-size: 16px !important; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
};

export default App;
