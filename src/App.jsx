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
  Minimize2
} from 'lucide-react';

// --- 完整資料庫 (對照你的最新清單) ---
const DATA = {
  mask: {
    label: "面膜紙",
    subCategories: ["面膜紙", "精華面膜紙"],
    items: {
      "面膜紙": [
        { id: "PM-001", name: "牛奶美顏面膜紙", price: 24.00, type: "normal" },
        { id: "PM-002", name: "玫瑰保濕面膜紙", price: 24.00, type: "normal" },
        { id: "PM-003", name: "甘菊藍防敏面膜紙", price: 24.00, type: "normal" },
        { id: "PM-004", name: "青瓜舒緩面膜紙", price: 24.00, type: "normal" },
        { id: "PM-005", name: "膠原蛋白面膜紙", price: 24.00, type: "normal" },
        { id: "PM-006", name: "檸檬草消炎面膜紙", price: 24.00, type: "normal" },
        { id: "PM-007", name: "純植物收毛孔面膜紙", price: 24.00, type: "normal" },
        { id: "PM-008", name: "熊果素激白面膜紙", price: 24.00, type: "normal" },
        { id: "PM-009", name: "MERCURY水凝面膜紙", price: 24.00, type: "normal" },
      ],
      "精華面膜紙": [
        { id: "EM-01", name: "左旋維他命C/ 牛奶 美白面膜紙", price: 28.00, type: "serum" },
        { id: "EM-02", name: "魚骨膠原 / 咖啡因 抗皺面膜紙", price: 28.00, type: "serum" },
        { id: "EM-03", name: "透明質酸 / 維他命B5 面膜紙", price: 28.00, type: "serum" },
        { id: "EM-04", name: "輔酵素Q10 / 維他命E 抗氧面膜紙", price: 28.00, type: "serum" },
      ]
    }
  },
  retail: {
    label: "客貨裝",
    subCategories: ["葡聚糖系列", "海洋注氧系列"],
    items: {
      "葡聚糖系列": [
        { id: "CMG-001", name: "葡聚糖修護潔膚凝膠", price: 172.00 },
        { id: "CMG-002", name: "葡聚糖修護潔面乳", price: 162.00 },
        { id: "CMG-003", name: "葡聚糖健膚水", price: 172.00 },
        { id: "CMG-004", name: "葡聚糖修護面膜", price: 172.00 },
        { id: "CMG-005", name: "葡聚糖防護日霜", price: 162.00 },
        { id: "CMG-006", name: "葡聚糖修護晚霜", price: 172.00 },
        { id: "CMG-007", name: "葡聚糖再生肌膚精華素", price: 208.00 },
        { id: "CMG-008", name: "葡聚糖修護眼霜", price: 208.00 },
      ],
      "海洋注氧系列": [
        { id: "O2-001", name: "海洋注氧卸妝油", price: 200.00 },
        { id: "O2-002", name: "海洋注氧卸妝液", price: 172.00 },
        { id: "O2-003", name: "海洋注氧深層淨膚凝膠", price: 162.00 },
        { id: "O2-004", name: "海洋注氧磨砂凝膠", price: 150.00 },
        { id: "O2-005", name: "海洋注氧保濕液", price: 184.00 },
        { id: "O2-006", name: "海洋注氧面膜", price: 208.00 },
        { id: "O2-007", name: "海洋注氧喚膚霜", price: 230.00 },
        { id: "O2-008", name: "海洋注氧眼部精華液", price: 172.00 },
        { id: "O2-009", name: "海洋注氧精華液", price: 162.00 },
      ]
    }
  },
  salon: {
    label: "美容院裝",
    subCategories: ["潔面", "爽膚水", "磨砂去死皮", "按摩", "離子啫喱", "底霜", "面膜", "眼部及唇部", "暗瘡黑頭", "精華", "面霜", "身體護理", "減肥"],
    items: {
      "潔面": [
        { id: "S-004", name: "MERCURY植物滋潤卸妝油", price: 260.00 },
        { id: "RC-001", name: "維他命C美白卸妝潔面奶", price: 174.00 },
        { id: "RC-002", name: "玫瑰保濕卸妝潔面奶", price: 174.00 },
        { id: "RC-003", name: "甘菊藍防敏卸妝潔面奶", price: 174.00 },
        { id: "RC-004", name: "青瓜舒緩卸妝潔面奶", price: 174.00 },
        { id: "RC-005", name: "膠原蛋白卸妝潔面奶", price: 174.00 },
        { id: "RC-006", name: "檸檬草消炎卸妝潔面奶", price: 174.00 },
        { id: "RC-007", name: "純植物收毛孔卸妝潔面奶", price: 174.00 },
        { id: "RC-009", name: "MERCURY水凝卸妝潔面奶", price: 184.00 },
        { id: "CG-003", name: "MERCURY水凝潔面啫喱", price: 196.00 },
        { id: "CG-004", name: "膠原蛋白潔面啫喱", price: 184.00 },
      ],
      "爽膚水": [
        { id: "FR-001", name: "維他命C美白爽膚水", price: 174.00 },
        { id: "FR-002", name: "玫瑰保濕爽膚水", price: 174.00 },
        { id: "FR-003", name: "甘菊藍防敏爽膚水", price: 174.00 },
        { id: "FR-004", name: "青瓜舒緩爽膚水", price: 174.00 },
        { id: "FR-005", name: "膠原蛋白爽膚水", price: 174.00 },
        { id: "FR-006", name: "檸檬草消炎爽膚水", price: 174.00 },
        { id: "FR-007", name: "純植物收毛孔爽膚水", price: 174.00 },
        { id: "FR-009", name: "MERCURY水凝爽膚水", price: 184.00 },
      ],
      "磨砂去死皮": [
        { id: "SP-001", name: "維他命C美白磨砂膏", price: 184.00 },
        { id: "SP-002", name: "玫瑰保濕磨砂膏", price: 184.00 },
        { id: "SP-003", name: "膠原蛋白磨砂膏", price: 184.00 },
        { id: "SP-004", name: "檸檬草消炎磨砂膏", price: 184.00 },
        { id: "SP-005", name: "淨白亮肌去死皮液", price: 208.00 },
        { id: "SP-006", name: "植物身體美白磨砂", price: 184.00 },
        { id: "SPG-001", name: "膠原蛋白磨砂啫喱", price: 184.00 },
        { id: "SPG-002", name: "青瓜保濕磨砂啫喱", price: 184.00 },
      ],
      "按摩": [
        { id: "MC-001", name: "維他命C美白按摩膏", price: 184.00 },
        { id: "MC-002", name: "玫瑰保濕按摩膏", price: 184.00 },
        { id: "MC-003", name: "甘菊藍防敏按摩膏", price: 184.00 },
        { id: "MC-004", name: "青瓜舒緩按摩膏", price: 184.00 },
        { id: "MC-005", name: "膠原蛋白按摩膏", price: 184.00 },
        { id: "MC-006", name: "檸檬草消炎按摩膏", price: 184.00 },
        { id: "MC-007", name: "純植物收毛孔按摩膏", price: 184.00 },
        { id: "MC-009", name: "MERCURY水凝按摩膏", price: 208.00 },
        { id: "MG-003", name: "膠原蛋白按摩啫喱", price: 184.00 },
        { id: "MG-004", name: "MERCURY水凝按摩啫喱", price: 208.00 },
        { id: "FMO-001", name: "香薰通淋巴面部按摩油", price: 234.00 },
        { id: "FMO-002", name: "香薰舒緩面部按摩油", price: 234.00 },
        { id: "FMO-003", name: "香薰抗氧化面部按摩油", price: 234.00 },
      ],
      "離子啫喱": [
        { id: "IG-001", name: "維他命B5美白離子啫喱", price: 230.00 },
        { id: "IG-002", name: "玫瑰保濕離子啫喱", price: 230.00 },
        { id: "IG-003", name: "甘菊藍防敏離子啫喱", price: 230.00 },
        { id: "IG-004", name: "青瓜舒緩離子啫喱", price: 230.00 },
        { id: "IG-005", name: "膠原蛋白離子啫喱", price: 230.00 },
        { id: "IG-006", name: "檸檬草消炎離子啫喱", price: 230.00 },
        { id: "IG-007", name: "純植物收毛孔離子啫喱", price: 230.00 },
        { id: "IG-009", name: "MERCURY水凝離子啫喱", price: 230.00 },
      ],
      "底霜": [
        { id: "BC-001", name: "熊果素/維他命C底霜", price: 230.00 },
        { id: "BC-002", name: "膠原蛋白底霜", price: 230.00 },
        { id: "BC-003", name: "細緻毛孔控油底霜", price: 230.00 },
        { id: "BC-004", name: "玫瑰保濕底霜", price: 230.00 },
      ],
      "面膜": [
        { id: "FCM-001", name: "熊果素激白面膜", price: 254.00 },
        { id: "FCM-002", name: "淨白保濕面膜", price: 254.00 },
        { id: "FCM-003", name: "甘菊藍防敏面膜", price: 230.00 },
        { id: "FCM-004", name: "活細胞舒緩面膜", price: 254.00 },
        { id: "FCM-005", name: "骨膠原能量面膜", price: 254.00 },
        { id: "FCM-006", name: "冰極暗瘡消炎面膜", price: 254.00 },
        { id: "FCM-007", name: "純植物收毛孔面膜", price: 230.00 },
        { id: "FCM-009", name: "MERCURY水凝面膜", price: 254.00 },
      ],
      "眼部及唇部": [
        { id: "EM-001", name: "膠原蛋白修護眼膜", price: 230.00 },
        { id: "ECG-001", name: "胡蘿蔔緊緻眼啫喱", price: 230.00 },
        { id: "ECG-002", name: "純中草藥馬尾草眼霜", price: 230.00 },
        { id: "LM-001", name: "維他命E修護唇膜", price: 180.00 },
        { id: "LM-002", name: "DPHP高保濕去紋唇膜", price: 180.00 },
        { id: "LM-003", name: "紅沒藥醇護理唇膜", price: 180.00 },
      ],
      "暗瘡黑頭": [
        { id: "SDC-001", name: "暗瘡消炎水(有粉)", price: 176.00 },
        { id: "SDC-002", name: "暗瘡消炎水(無粉)", price: 148.00 },
        { id: "SDC-003", name: "暗瘡膏", price: 208.00 },
        { id: "SDC-004", name: "去黑頭油脂液", price: 256.00 },
      ],
      "精華": [
        { id: "EE-001", name: "MERCURY活細胞精華液", price: 300.00 },
        { id: "EE-002", name: "玫瑰保濕精華液", price: 300.00 },
        { id: "EE-003", name: "維他命C美白精華液", price: 300.00 },
      ],
      "面霜": [
        { id: "DC-001", name: "維他命C美白面霜", price: 230.00 },
        { id: "DC-002", name: "骨膠原蛋白面霜", price: 230.00 },
        { id: "DC-003", name: "甘菊藍防敏面霜", price: 230.00 },
        { id: "DC-004", name: "防曬淨白面霜", price: 346.00 },
        { id: "DC-005", name: "純植物收毛孔面霜", price: 242.00 },
        { id: "DC-006", name: "MERCURY水凝面霜", price: 276.00 },
      ],
      "身體護理": [
        { id: "EMO-001", name: "青檸橙花香薰按摩油", price: 260.00 },
        { id: "EMO-002", name: "香薰舒緩身體按摩油", price: 260.00 },
        { id: "EMO-003", name: "香薰排毒減肥護理油", price: 260.00 },
        { id: "EMO-004", name: "香薰消水腫護理油", price: 260.00 },
        { id: "EMO-006", name: "推背淋巴香薰按摩油", price: 260.00 },
        { id: "MO-001", name: "維他命E按摩油", price: 196.00 },
        { id: "MO-002", name: "玫瑰草按摩油", price: 196.00 },
        { id: "MO-003", name: "白蘭花按摩油", price: 196.00 },
        { id: "MO-004", name: "舒筋活絡按摩油", price: 196.00 },
        { id: "BT-011", name: "香薰胸部提升啫喱", price: 300.00 },
        { id: "BT-012", name: "香薰胸部收緊啫喱", price: 300.00 },
        { id: "BT-013", name: "活性豐胸多元精華乳霜", price: 576.00 },
      ],
      "減肥": [
        { id: "BT-001", name: "辣椒熱能減肥膏(普通型)", price: 208.00 },
        { id: "BT-002", name: "辣椒熱能減肥膏(特強型)", price: 230.00 },
        { id: "BT-003", name: "薄荷咖啡因子減肥膏", price: 184.00 },
        { id: "BT-004", name: "去蜂窩橙皮紋膏", price: 300.00 },
        { id: "BT-007", name: "辣椒熱能減肥啫喱(普通型)", price: 208.00 },
        { id: "BT-008", name: "辣椒熱能減肥啫喱(特強型)", price: 230.00 },
        { id: "BT-009", name: "冰極凍身收緊啫喱", price: 208.00 },
        { id: "BT-010", name: "薄荷咖啡因子減肥啫喱", price: 230.00 },
        { id: "BT-014", name: "胡椒薑排毒去水腫啫喱", price: 360.00 },
        { id: "AS-005", name: "MERCURY排毒香薰鹽", price: 150.00 },
        { id: "AS-006", name: "MERCURY減肥香薰鹽", price: 150.00 },
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
  const [zoomScale, setZoomScale] = useState(1); 
  
  const [customerInfo, setCustomerInfo] = useState({ company: '', contact: '', phone: '' });

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
        else if (categoryKey === 'retail') { stats.retailTotal += product.price * qty; stats.retailCount += qty; }
        else if (categoryKey === 'mask') { if (product.type === 'normal') stats.maskNormalCount += qty; else stats.maskSerumCount += qty; }
      }
    });
    const nInfo = getMaskPriceInfo(stats.maskNormalCount, 'normal');
    const sInfo = getMaskPriceInfo(stats.maskSerumCount, 'serum');
    const itemsList = rawItems.map(item => {
      let unitPrice = item.price;
      if (item.categoryKey === 'salon') unitPrice = item.price / 2;
      else if (item.categoryKey === 'mask') { unitPrice = item.type === 'normal' ? nInfo.currentPrice : sInfo.currentPrice; }
      return { ...item, unitPrice, subtotal: unitPrice * item.qty };
    });
    return { itemsList, stats, nInfo, sInfo };
  }, [cart, getMaskPriceInfo]);

  const promos = useMemo(() => {
    const { stats, itemsList, nInfo, sInfo } = cartSummary;
    let salonLabel = "", salonDeduct = 0, salonPercent = 0;
    const totalVal = stats.salonHalfTotal;

    // --- 美容院裝優化邏輯 (鎖死 $800 / $1600) ---
    if (totalVal >= 2300) { salonLabel = "已享有 $1600 送 $700 優惠"; salonDeduct = 700; salonPercent = 100; }
    else if (totalVal >= 1600) { salonLabel = `已扣減 $700，仲可以揀多 $${(2300 - totalVal).toFixed(2)} 免費貨`; salonDeduct = totalVal - 1600; salonPercent = 100; }
    else if (totalVal >= 1000) { salonLabel = `已享 $200 優惠，仲差 $${(1600 - totalVal).toFixed(2)} 享 $700 優惠`; salonDeduct = 200; salonPercent = (totalVal / 1600) * 100; }
    else if (totalVal >= 800) { salonLabel = `已扣減 $200，仲可以揀多 $${(1000 - totalVal).toFixed(2)} 免費貨`; salonDeduct = totalVal - 800; salonPercent = 100; }
    else { salonLabel = `仲差 $${(800 - totalVal).toFixed(2)} 享 $800 送 $200 優惠`; salonDeduct = 0; salonPercent = (totalVal / 800) * 100; }

    const retailDiscount = stats.retailCount >= 6 ? stats.retailTotal * 0.2 : 0;
    const retailFinal = stats.retailTotal - retailDiscount;
    const maskTotal = itemsList.filter(i => i.categoryKey === 'mask').reduce((acc, i) => acc + i.subtotal, 0);
    const finalTotal = Math.max(0, stats.salonHalfTotal - salonDeduct) + retailFinal + maskTotal;
    const totalSaving = salonDeduct + retailDiscount;

    const progress = [
      { id: 'salon', show: stats.salonHalfTotal > 0, label: `美容院裝 (貨值:$${totalVal.toFixed(2)})`, current: salonLabel, percent: Math.min(100, salonPercent), color: 'bg-rose-500' },
      { id: 'retail', show: stats.retailCount > 0, label: '客貨裝 (6件8折)', current: stats.retailCount >= 6 ? '已享 8 折' : `還差 ${6 - stats.retailCount} 件享折`, percent: Math.min(100, (stats.retailCount / 6) * 100), color: 'bg-emerald-500' },
      { id: 'mask_n', show: stats.maskNormalCount > 0, label: `一般面膜 (${stats.maskNormalCount}張)`, current: nInfo.nextTierQty ? `差 ${nInfo.diff} 張每片 $${nInfo.nextTierPrice.toFixed(2)}` : `已享最低價`, percent: Math.min(100, (stats.maskNormalCount / (nInfo.nextTierQty || 1000)) * 100), color: 'bg-blue-500' },
      { id: 'mask_s', show: stats.maskSerumCount > 0, label: `精華面膜 (${stats.maskSerumCount}張)`, current: sInfo.nextTierQty ? `差 ${sInfo.diff} 張每片 $${sInfo.nextTierPrice.toFixed(2)}` : `已享最低價`, percent: Math.min(100, (stats.maskSerumCount / (sInfo.nextTierQty || 1000)) * 100), color: 'bg-indigo-500' }
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
    return (
      <input 
        type="number" pattern="\d*" inputMode="numeric"
        value={inputValue} placeholder="0"
        onChange={(e) => setInputValue(e.target.value)} 
        onBlur={() => onUpdate(id, inputValue)}
        onKeyDown={(e) => { if (e.key === 'Enter') { onUpdate(id, inputValue); e.target.blur(); } }}
        className={`mobile-input ${isMini ? 'w-10 lg:w-12 text-[14px] lg:text-[18px]' : 'w-12 lg:w-16 text-[16px] lg:text-[22px]'} text-center bg-transparent font-black focus:outline-none text-slate-900`} 
      />
    );
  });

  const QuantitySelector = ({ id, qty, isMini = false }) => (
    <div className={`flex items-center rounded-xl border ${isMini ? 'bg-white/10 border-white/20 p-1' : 'bg-gray-100 border-gray-200 p-1.5 lg:p-2'}`}>
      <button onClick={() => updateQty(id, (qty || 0) - 1)} className={`${isMini ? 'w-8 h-8 lg:w-10 lg:h-10 text-white/70' : 'w-10 h-10 lg:w-14 lg:h-14 text-gray-500'} flex items-center justify-center active:bg-black/10 rounded-lg`}><Minus size={isMini ? 16 : 22}/></button>
      <IsolatedInput id={id} initialQty={qty || 0} onUpdate={updateQty} isMini={isMini} />
      <button onClick={() => updateQty(id, (qty || 0) + 1)} className={`${isMini ? 'w-8 h-8 lg:w-10 lg:h-10 text-white/70' : 'w-10 h-10 lg:w-14 lg:h-14 text-gray-500'} flex items-center justify-center active:bg-black/10 rounded-lg`}><Plus size={isMini ? 16 : 22}/></button>
    </div>
  );

  const handleFinalOrder = () => {
    let msg = `INFINITY CHEMICAL 訂單確認：\n------------------------------------------\n公司：${customerInfo.company || '未提供'}\n聯絡人：${customerInfo.contact || '未提供'}\n電話：${customerInfo.phone || '未提供'}\n------------------------------------------\n`;
    cartSummary.itemsList.forEach(i => { msg += `${i.id || 'N/A'} | ${i.name} | ${i.unitPrice.toFixed(2)} | ${i.qty} | ${i.subtotal.toFixed(2)}\n`; });
    if (promos.totalSaving > 0) msg += `------------------------------------------\n優惠已扣減：-HK$ ${promos.totalSaving.toFixed(2)}\n`;
    msg += `------------------------------------------\n應付總額：HK$ ${promos.grandTotal.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
  };

  const hasItems = Object.values(cart).some(v => v > 0);

  const CartContent = ({ isSidebar = false }) => (
    <div className={`space-y-6 lg:space-y-8 ${isSidebar ? 'p-0' : 'px-6 lg:px-10 pb-12'}`}>
      <div className="space-y-4 bg-white/5 p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] border border-white/10 shadow-inner">
        <div className="text-[12px] lg:text-[14px] font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-2 lg:mb-4"><Tag size={16} /> 聯絡資料 (可選)</div>
        <div className="space-y-3 lg:space-y-5">
          <input type="text" placeholder="公司名稱" className="w-full bg-black/40 border border-white/10 rounded-xl lg:rounded-2xl py-3 lg:py-5 px-4 text-sm lg:text-lg text-white outline-none focus:border-emerald-500" value={customerInfo.company} onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})} />
          <input type="text" placeholder="聯絡人姓名" className="w-full bg-black/40 border border-white/10 rounded-xl lg:rounded-2xl py-3 lg:py-5 px-4 text-sm lg:text-lg text-white outline-none focus:border-emerald-500" value={customerInfo.contact} onChange={(e) => setCustomerInfo({...customerInfo, contact: e.target.value})} />
          <input type="tel" placeholder="電話號碼" className="w-full bg-black/40 border border-white/10 rounded-xl lg:rounded-2xl py-3 lg:py-5 px-4 text-sm lg:text-lg text-white outline-none focus:border-emerald-500" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
        </div>
      </div>
      <div className="space-y-4 lg:space-y-6">
        <div className="text-[12px] lg:text-[16px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Maximize2 size={18} className="text-blue-400" /> 優惠進度</div>
        {promos.progress.map(p => (
          <div key={p.id} className="space-y-3 lg:space-y-4 bg-white/5 p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-white/5">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[13px] lg:text-[18px] font-extrabold text-white tracking-wide">{p.label}</span>
              <span className="text-[11px] lg:text-[14px] font-bold text-emerald-400 text-right">{p.current}</span>
            </div>
            <div className="h-2 lg:h-3 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${p.color} transition-all duration-1000`} style={{ width: `${p.percent}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="space-y-4 lg:space-y-6">
        <div className="text-[12px] lg:text-[16px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-white/10 pb-2 flex items-center gap-2"><ShoppingCart size={20} /> 已選產品 ({cartSummary.itemsList.length})</div>
        <div className="space-y-3 lg:space-y-5">
          {cartSummary.itemsList.map(i => (
            <div key={i.id || i.name} className="bg-white/5 p-4 lg:p-6 rounded-xl lg:rounded-2xl flex items-center justify-between gap-4 border border-white/5 shadow-xl">
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white font-black text-[14px] lg:text-[20px] truncate mb-1">{i.name}</span>
                <span className="text-[11px] lg:text-[15px] text-slate-400 font-mono font-bold">單價 ${i.unitPrice.toFixed(2)} | 小計 ${i.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                 <QuantitySelector id={i.id || i.name} qty={i.qty} isMini={true} />
                 <button onClick={() => updateQty(i.id || i.name, 0)} className="text-slate-600 hover:text-rose-400 transition-colors"><Trash2 size={24} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 antialiased font-sans transition-all duration-300">
      
      {/* 比例尺調整 (只喺電腦版顯示) */}
      <div className="fixed top-6 right-10 z-[100] hidden lg:block">
        <div className="bg-white/90 backdrop-blur shadow-2xl border border-slate-200 rounded-full px-6 py-3 flex items-center gap-4 hover:scale-105 transition-all">
           <Minimize2 size={16} className="text-slate-400" />
           <input type="range" min="0.8" max="1.5" step="0.05" value={zoomScale} onChange={(e) => setZoomScale(parseFloat(e.target.value))} className="w-40 accent-rose-500 cursor-pointer" />
           <Maximize2 size={16} className="text-slate-400" />
           <span className="text-[12px] font-black text-rose-500 w-10 text-center">{Math.round(zoomScale * 100)}%</span>
        </div>
      </div>

      <header className="sticky top-0 bg-white/95 backdrop-blur-lg z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-4 lg:py-8">
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <h1 className="font-serif tracking-widest text-2xl lg:text-5xl font-black italic text-slate-900">INFINITY</h1>
            <span className="text-[8px] lg:text-[14px] tracking-[0.3em] text-slate-400 font-bold uppercase border border-slate-200 px-3 py-1 lg:px-6 lg:py-3 rounded-full">Chemical Trading</span>
          </div>
          <nav className="flex gap-6 lg:gap-14 overflow-x-auto no-scrollbar scroll-smooth">
            {Object.entries(DATA).map(([k, v]) => (
              <button key={k} onClick={() => setActiveTab(k)} className={`pb-2 lg:pb-5 text-[12px] lg:text-[22px] tracking-[0.2em] relative whitespace-nowrap transition-all uppercase ${activeTab === k ? 'text-black font-extrabold' : 'text-slate-400 font-bold hover:text-slate-600'}`}>
                {v.label}
                {activeTab === k && <div className="absolute bottom-0 left-0 w-full h-1 lg:h-2 bg-rose-500 rounded-t-full shadow-[0_-4px_10px_rgba(244,63,94,0.3)]" />}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-[95px] lg:top-[160px] z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-3 lg:py-6 flex gap-3 lg:gap-5 overflow-x-auto no-scrollbar">
          {DATA[activeTab].subCategories.map(c => (
            <button key={c} onClick={() => setActiveSubTab(c)} className={`px-4 py-2 lg:px-10 lg:py-4 rounded-full text-[11px] lg:text-[18px] font-black whitespace-nowrap border shadow-sm transition-all duration-300 ${activeSubTab === c ? 'bg-slate-900 text-white border-slate-900 scale-105 shadow-xl' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>{c}</button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-10 py-6 lg:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16" style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top left', width: `${100/zoomScale}%` }}>
        <div className="flex-1 space-y-4 lg:space-y-8">
          {(DATA[activeTab].items[activeSubTab] || []).map((item) => (
            <div key={item.id || item.name} className="bg-white p-5 lg:p-10 rounded-2xl lg:rounded-[3rem] border border-slate-100 shadow-md flex justify-between items-center hover:shadow-2xl transition-all duration-500">
              <div className="flex-1 pr-4 lg:pr-10">
                {item.id && <span className="text-[10px] lg:text-[14px] font-mono text-slate-400 block mb-1 lg:mb-3 tracking-widest font-bold uppercase">{item.id}</span>}
                <h4 className="text-[15px] lg:text-[28px] font-black leading-tight text-slate-900 mb-2 lg:mb-4">{item.name}</h4>
                <div className="flex items-center gap-3 lg:gap-6">
                  <span className="text-[11px] lg:text-[16px] font-black text-slate-400">$</span>
                  {activeTab === 'salon' ? (
                    <div className="flex items-center gap-4 lg:gap-8">
                      <span className="text-rose-500 font-mono text-sm lg:text-2xl line-through decoration-rose-600 decoration-2 italic opacity-40">{item.price.toFixed(2)}</span>
                      <span className="text-slate-900 font-mono text-lg lg:text-3xl font-black tracking-tighter bg-yellow-100 px-2 lg:px-4 rounded-xl shadow-inner">{(item.price/2).toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-slate-900 font-mono text-lg lg:text-3xl font-black tracking-tighter">{item.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <QuantitySelector id={item.id || item.name} qty={cart[item.id || item.name] || 0} />
            </div>
          ))}
        </div>

        {/* 右邊：電腦版側欄購物車 */}
        <div className="hidden lg:block w-[550px] shrink-0">
          <div className="sticky top-60 bg-slate-900 text-white rounded-[4rem] p-12 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col max-h-[calc(100vh-280px)]">
            <div className="flex items-center gap-6 mb-12 border-b border-white/10 pb-10">
                <div className="bg-rose-500 p-5 rounded-2xl shadow-2xl shadow-rose-500/40"><ShoppingCart size={36} className="text-white" /></div>
                <h3 className="text-4xl font-black tracking-tight">落單清單</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4"><CartContent isSidebar={true} /></div>
            <div className="pt-12 border-t border-white/10 mt-12 space-y-10">
                <div className="flex justify-between items-end">
                    <span className="text-[16px] text-slate-500 font-black uppercase tracking-[0.4em]">應付總額</span>
                    <span className="text-6xl font-mono font-black text-white leading-none tracking-tighter"><span className="text-2xl font-sans mr-3 text-slate-500">HK$</span>{promos.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <button onClick={handleFinalOrder} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl active:scale-95 py-10 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-6 transition-all duration-300"><MessageCircle size={36} /> WhatsApp 落單</button>
            </div>
          </div>
        </div>
      </main>

      {/* 手機版彈出層：最高層級 Z-9999 */}
      <div 
        className={`lg:hidden fixed inset-0 z-[9999] bg-slate-950 transition-transform duration-500 ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center bg-slate-900 shadow-xl">
            <h3 className="text-white text-xl font-black flex items-center gap-2"><ShoppingCart className="text-rose-500" /> 落單詳情</h3>
            <button onClick={() => setIsExpanded(false)} className="bg-white/10 p-3 rounded-full text-white active:bg-rose-500 shadow-lg"><X size={28} /></button>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-950 py-6"><CartContent isSidebar={false} /></div>
          <div className="p-6 bg-slate-900 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">應付總額</span>
                <span className="text-3xl font-mono font-black text-white">HK$ {promos.grandTotal.toFixed(2)}</span>
              </div>
              <button onClick={handleFinalOrder} className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95">WhatsApp 送出</button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部迷你 Bar：Z-900 */}
      <div className={`lg:hidden fixed bottom-6 inset-x-4 z-[900] transition-all duration-500 ${hasItems && !isExpanded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} 
          className="w-full bg-slate-900 text-white rounded-full py-5 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 flex items-center justify-between active:scale-95 active:bg-slate-800 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-full relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-white text-rose-500 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-rose-500">{cartSummary.itemsList.length}</span>
            </div>
            <span className="text-[14px] font-black tracking-widest uppercase text-slate-200">查看清單 / 落單</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-mono font-black text-white">HK$ {promos.grandTotal.toFixed(2)}</span>
            <ChevronUp size={28} className="text-rose-500 animate-bounce" />
          </div>
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .mobile-input { font-size: 16px !important; }
        @media (min-width: 1024px) { .mobile-input { font-size: 22px !important; } }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        * { -webkit-tap-highlight-color: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        input[type=range]::-webkit-slider-runnable-track { height: 10px; background: #f1f5f9; border-radius: 10px; }
        input[type=range]::-webkit-slider-thumb { height: 28px; width: 28px; background: #f43f5e; margin-top: -9px; -webkit-appearance: none; border-radius: 50%; shadow: 0 5px 15px rgba(244,63,94,0.4); }
      `}</style>
    </div>
  );
};

export default App;
