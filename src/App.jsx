import React, { useState } from 'react';
import { Copy, Check, FileText, Printer } from 'lucide-react';

const ProposalLetterAppPDF = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [copied, setCopied] = useState(false);
  const [proposalLetter, setProposalLetter] = useState(null);

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerAge: '',
    propertyType: '一般住宅',
    buildingAge: '',
    landArea: '',
    location: '',
    inheritanceRisk: false,
    inheritanceDate: '',
    currentSituation: '',
  });

  const [selectedMerits, setSelectedMerits] = useState({
    taxPlanning: true,
    inheritanceSimplification: true,
    highPrice: false,
    timeAllowance: false,
    managementRelief: true,
  });

  const meritsOptions = {
    taxPlanning: '相続税対策',
    inheritanceSimplification: '相続手続き簡素化',
    highPrice: '高い売却価格',
    timeAllowance: '時間的余裕の確保',
    managementRelief: '維持管理の負担軽減',
  };

  const detectProblems = () => {
    const problems = [];
    const age = parseInt(formData.buildingAge) || 0;

    if (formData.inheritanceRisk && age > 30) {
      problems.push('相続税路線価の高騰');
    }
    if (age > 40) {
      problems.push('解体費・建築費の高騰');
    }
    if (formData.propertyType === '賃貸マンション' || formData.propertyType === '賃貸ビル') {
      problems.push('立ち退きリスク・入居者対応の複雑さ');
    }
    if (formData.inheritanceRisk) {
      problems.push('相続問題・複数相続人対応');
    }

    return problems;
  };

  const generateProposal = () => {
    if (!formData.ownerName || !formData.location) {
      alert('お名前と所在地は入力してください');
      return;
    }

    const problems = detectProblems();
    const merits = Object.keys(selectedMerits)
      .filter(key => selectedMerits[key])
      .map(key => meritsOptions[key]);

    const letter = generateLetterContent(problems, merits);

    setProposalLetter({
      owner: formData.ownerName,
      location: formData.location,
      propertyType: formData.propertyType,
      content: letter,
      generatedAt: new Date().toLocaleString('ja-JP'),
    });

    setActiveTab('preview');
  };

  const generateLetterContent = (problems, merits) => {
    const age = parseInt(formData.buildingAge) || 0;
    const inheritanceNote = formData.inheritanceRisk
      ? `${formData.inheritanceDate}年以内の相続を見据えた対策が重要です。`
      : '';

    let content = `拝啓

いつもお世話になっております。
株式会社メトロス開発 営業4部の尾崎文吾と申します。

この度は、${formData.ownerName}様がお持ちの${formData.location}の物件に関しまして、
重要なご提案があり、ご連絡させていただきました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【${formData.ownerName}様のご状況を拝察いたします】

ご所有の${formData.propertyType}は、築${age}年を経過した物件でいらっしゃいます。
${inheritanceNote}

特に以下のようなお悩みがあるのではないでしょうか。

`;

    if (problems.length > 0) {
      content += `◆ 現在の課題点\n`;
      problems.forEach((problem, idx) => {
        content += `  ${idx + 1}. ${problem}\n`;
      });
    }

    content += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【メトロス開発がご提案する解決策】

メトロス開発は、大手デベロッパーとの信頼関係を活かし、
${formData.ownerName}様の大切な資産を『最高価値』へと導くお手伝いをさせていただきます。

私たちは、単に物件を売却するのではなく、以下の点を重視しています：

◆ 売却を通じて実現できるメリット

`;

    merits.forEach((merit, idx) => {
      content += `  ${idx + 1}. ${merit}\n`;
    });

    content += `
特に、${formData.location}という立地は再開発の候補地として
非常に高い価値を持っています。

都市の再開発が進む中、今が『売却のベストタイミング』である可能性が高いのです。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【次のステップ】

この度は、${formData.ownerName}様のご状況を詳しくお聞きし、
最適な提案をさせていただきたく存じます。

初回のご相談は、完全無料・秘密厳守でございます。
ご都合のよい日時でお目にかかり、
じっくりとお話しさせていただきたいと考えております。

${formData.currentSituation ? `
ご状況から伺える『${formData.currentSituation}』といったお悩みも、
私たちならば適切にご対応できる体制を整えております。
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【株式会社メトロス開発について】

メトロス開発は、首都圏369棟以上の再開発実績を誇る、
業界のパイオニアです。

大手デベロッパー（伊藤忠都市開発、野村不動産、東急不動産、大和ハウス工業ほか）
との確かな信頼関係のもと、地権者様の資産価値を最大化させることに
専門特化しています。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.ownerName}様とお目にかかれることを心待ちにしております。

何かご不明な点やご質問ございましたら、
いつでもお気軽にお声がけください。

誠心誠意、対応させていただきます。

敬具

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社メトロス開発  営業4部
営業コンサルタント  尾崎 文吾

📱 お気軽にご連絡ください
📧 メール・電話でのご相談も承ります

本資料は個人情報を含むため、秘密厳守いたします。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    return content;
  };

  // ブラウザ標準の印刷機能を使う（canvas撮影に頼らないため、スマホでも確実に動作する）
  const printPDF = () => {
    window.print();
  };

  const copyToClipboard = () => {
    if (proposalLetter) {
      navigator.clipboard.writeText(proposalLetter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMeritChange = (key) => {
    setSelectedMerits({ ...selectedMerits, [key]: !selectedMerits[key] });
  };

  const newProposal = () => {
    setFormData({
      ownerName: '',
      ownerAge: '',
      propertyType: '一般住宅',
      buildingAge: '',
      landArea: '',
      location: '',
      inheritanceRisk: false,
      inheritanceDate: '',
      currentSituation: '',
    });
    setProposalLetter(null);
    setActiveTab('input');
  };

  const problems = detectProblems();

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '100vh', padding: '15px' }}>
      {/* 印刷時専用のスタイル：印刷（PDF保存）のときは、pdf-print-area だけを表示し、
          それ以外（入力フォームやボタンなど）はすべて非表示にする */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #pdf-print-area, #pdf-print-area * {
            visibility: visible;
          }
          #pdf-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: #ffffff !important;
            color: #000000 !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '22px', fontWeight: 'bold' }}>
          📨 再開発提案手紙
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
          尾崎文吾 | メトロス開発営業4部
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <button
          onClick={() => setActiveTab('input')}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: activeTab === 'input' ? '#1e40af' : '#1e293b',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📝 情報入力
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          disabled={!proposalLetter}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: activeTab === 'preview' ? '#1e40af' : '#1e293b',
            color: proposalLetter ? '#fff' : '#64748b',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: proposalLetter ? 'pointer' : 'not-allowed',
            opacity: proposalLetter ? 1 : 0.5,
          }}
        >
          👁️ プレビュー
        </button>
      </div>

      {activeTab === 'input' && (
        <div>
          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#60a5fa' }}>
              📛 お名前 <span style={{ color: '#ef4444' }}>※必須</span>
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="山田太郎"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '4px',
                color: '#e2e8f0',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#60a5fa' }}>
                🎂 年齢
              </label>
              <input
                type="number"
                name="ownerAge"
                value={formData.ownerAge}
                onChange={handleInputChange}
                placeholder="65"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#60a5fa' }}>
                🏢 物件種類
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              >
                <option>一般住宅</option>
                <option>賃貸マンション</option>
                <option>賃貸ビル</option>
                <option>商業ビル</option>
                <option>駐車場</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#60a5fa' }}>
                📅 築年数
              </label>
              <input
                type="number"
                name="buildingAge"
                value={formData.buildingAge}
                onChange={handleInputChange}
                placeholder="45"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px', color: '#60a5fa' }}>
                📐 敷地面積（㎡）
              </label>
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                placeholder="300"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#60a5fa' }}>
              📍 所在地 <span style={{ color: '#ef4444' }}>※必須</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="東京都渋谷区道玄坂1-2-3"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '4px',
                color: '#e2e8f0',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', color: '#60a5fa' }}>
              <input
                type="checkbox"
                name="inheritanceRisk"
                checked={formData.inheritanceRisk}
                onChange={(e) => setFormData({ ...formData, inheritanceRisk: e.target.checked })}
                style={{ cursor: 'pointer' }}
              />
              相続対象物件
            </label>
            {formData.inheritanceRisk && (
              <input
                type="number"
                name="inheritanceDate"
                value={formData.inheritanceDate}
                onChange={handleInputChange}
                placeholder="相続予定まで何年以内か"
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            )}
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#60a5fa' }}>
              💭 現在の状況・悩み
            </label>
            <textarea
              name="currentSituation"
              value={formData.currentSituation}
              onChange={handleInputChange}
              placeholder="例：親が高齢で管理が心配..."
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '4px',
                color: '#e2e8f0',
                fontSize: '13px',
                minHeight: '80px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {problems.length > 0 && (
            <div style={{ backgroundColor: '#7c2d12', padding: '12px', borderRadius: '6px', marginBottom: '12px', borderLeft: '4px solid #f97316' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#fbbf24' }}>
                🚨 検出された課題点:
              </div>
              {problems.map((problem, idx) => (
                <div key={idx} style={{ fontSize: '12px', color: '#fed7aa', marginBottom: '4px' }}>
                  ✓ {problem}
                </div>
              ))}
            </div>
          )}

          <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#fbbf24' }}>
              ✨ 提案するメリット（複数選択可）
            </div>
            {Object.keys(meritsOptions).map(key => (
              <label
                key={key}
                style={{
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  padding: '6px',
                  backgroundColor: selectedMerits[key] ? '#1e3a8a' : 'transparent',
                  borderRadius: '4px',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedMerits[key]}
                  onChange={() => handleMeritChange(key)}
                  style={{ cursor: 'pointer' }}
                />
                {meritsOptions[key]}
              </label>
            ))}
          </div>

          <button
            onClick={generateProposal}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ✨ 手紙を作成する
          </button>
        </div>
      )}

      {activeTab === 'preview' && proposalLetter && (
        <div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '12px',
            fontSize: '12px',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#60a5fa' }}>
              {proposalLetter.owner}様への提案手紙
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px' }}>
              {proposalLetter.location} | {proposalLetter.propertyType}
            </div>
          </div>

          {/* 印刷（PDF保存）されるのはこの部分だけ */}
         <div id="pdf-print-area" style={{ display: 'none' }}>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '14px', fontFamily: 'serif' }}>
              {proposalLetter.content}
            </div>
            <div style={{ marginTop: '40px', fontSize: '12px', color: '#666', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
              <div>生成日時：{proposalLetter.generatedAt}</div>
              <div>株式会社メトロス開発 営業4部 尾崎文吾</div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '12px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6',
              fontSize: '12px',
              color: '#cbd5e1',
              maxHeight: '500px',
              overflowY: 'auto',
              fontFamily: 'monospace',
            }}
          >
            {proposalLetter.content}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '10px',
                backgroundColor: copied ? '#10b981' : '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {copied ? '✓ コピー完了' : '📋 コピー'}
            </button>
            <button
              onClick={printPDF}
              style={{
                padding: '10px',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Printer size={16} /> 印刷/PDF保存
            </button>
          </div>

          <button
            onClick={newProposal}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ➕ 次の手紙を作成
          </button>
        </div>
      )}
    </div>
  );
};

export default ProposalLetterAppPDF;
