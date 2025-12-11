'use client'

import React, { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

export default function NamePicker() {
  const initialNames = [
    "อนันทพร กันกา",
    "ฐิติญาณ์ ไกรสูงเนิน",
    "ณัฐวัลย์ ปิ่นวัฒนชัย",
    "พิมพ์สินี ฉันทวิชานนท์",
    "ชนิศา สร้อยพุต",
    "จารุณี ศรีมงคลถาวร",
    "กิติยาพร มณีสุขเกษม",
    "พิศชนก ใบลี",
    "สาลินี นวนขนาย",
    "กณิศนันท์ อรรถกูล",
    "วิภาพร ทองอร่าม",
    "อาทิตยา เกิมขุนทด",
    "ณัฐธยาน์ ด้วงบัว",
    "ปพัชรา เชิดชู",
    "พงศ์ศิริ สีวันนา",
    "ศิริลักษณ์ ทองเหลา",
    "รุ่งรัตน์ โคตรกว้าง",
    "ดารุณี ดีหลาย",
    "นุชรา เอี่ยมสุภาพงษ์",
    "ศักดา ศรีรัตน์",
    "จิตติมา ผ่องแผ้ว",
    "ลัดดาวัลย์ สถาพรวลัยรัตน์",
    "ภานุพงศ์ สารีบุตร",
    "นคร ดาศักดิ์",
    "พรพิมล อินสเพียร",
    "ลักษณ์สุดา อุปภักดี",
    "อัมพิกา ใจรื่น",
    "กฤตยากร จันทาโลก",
    "นฤมล แก้วสะแสน",
    "พายัพ ภูครองหิน",
    "สฤษดิ์ กลัดแก้วกล้า",
    "ณัฐพล ภูเดช พขร.",
    "บุญเที่ยง ศิลา พขร.",
    "ณัฐพงษ์ ทองมาก",
    "กัมพล ทวีแปลง พขร.",
    "นิธิ บุญสอน พขร.",
    "ประเวียร จำปาเรือง พขร.",
    "ณัฐวัฒน์ มีศรีสรรค์",
    "เพชรแท้ พรมศร",
    "ธนา หลีเกษม",
    "กรกฤติเดช กรอบทอง",
    "นฤเมศร ปุณณะการี",
    "มงคล ภูฆัง",
    "จุฑามาศ พรหมเพ็ชร",
    "อภิชาติ กลางบน",
    "ชนาธิป พริ้งเพราะ",
    "วิกรานต์ สังข์เสนาะ",
    "ดรัณญณัฐ เตมีประเสริฐกิจ",
    "จะเร สำราญ",
    "สิทธิพงษ์ วิริยะพันธ์"
  ];

  const [names, setNames] = useState(initialNames);
  const [inputName, setInputName] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<Array<{name: string, time: string}>>([]);
  const [availableNames, setAvailableNames] = useState(initialNames);
  const [spinningName, setSpinningName] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    color: string;
  }>>([]);
  const [showNameList, setShowNameList] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (showFireworks) {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 1 + Math.random() * 1,
          color: ['#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#FCD34D', '#F59E0B'][Math.floor(Math.random() * 6)]
        });
      }
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setShowFireworks(false);
        setParticles([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  const addName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      const newName = inputName.trim();
      setNames([...names, newName]);
      setAvailableNames([...availableNames, newName]);
      setInputName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter(n => n !== nameToRemove));
    setAvailableNames(availableNames.filter(n => n !== nameToRemove));
  };

  const pickRandom = () => {
    if (availableNames.length === 0) {
      alert('ไม่มีชื่อที่จะสุ่มแล้ว! กด Reset เพื่อเริ่มใหม่');
      return;
    }

    setIsSpinning(true);
    setCurrentName('');
    
    let counter = 0;
    let speed = 100;
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setSpinningName(names[randomIndex]);
      counter++;
      
      if (counter > 15) {
        speed += 20;
      }
      
      if (counter > 25) {
        clearInterval(spinInterval);
        
        const finalIndex = Math.floor(Math.random() * availableNames.length);
        const picked = availableNames[finalIndex];
        
        setTimeout(() => {
          setCurrentName(picked);
          setSpinningName('');
          setIsSpinning(false);
          setShowFireworks(true);
          
          const newHistory = [...history, {
            name: picked,
            time: new Date().toLocaleString('th-TH')
          }];
          setHistory(newHistory);
          
          setAvailableNames(availableNames.filter(n => n !== picked));
        }, 300);
      }
    }, speed);
  };

  const reset = () => {
    setAvailableNames([...names]);
    setCurrentName('');
    setHistory([]);
    setShowFireworks(false);
  };

  // Filter names based on search text
  const filteredNames = names.filter(name => 
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-6 overflow-auto relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-red-500/10"></div>
      
      {/* Shooting stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-80"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `shootingStar ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 6px 2px rgba(251, 191, 36, 0.8), 0 0 12px 4px rgba(251, 191, 36, 0.4)'
            }}
          />
        ))}
        
        {/* Slower, larger meteors */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`meteor-large-${i}`}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `shootingStarLarge ${6 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
              boxShadow: '0 0 8px 3px rgba(251, 146, 60, 0.8), 0 0 16px 6px rgba(251, 146, 60, 0.3)'
            }}
          />
        ))}
      </div>
      
      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-yellow-400 rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 2 + 2 + 's'
            }}
          />
        ))}
      </div>
      
      <div className="w-full flex flex-col max-w-5xl mx-auto relative z-10 min-h-screen">
        {/* Header */}
        <div className="text-center mb-6 flex-shrink-0 relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            {/* Logo with enhanced design */}
            <div className="mx-auto mb-6 w-28 h-28 sm:w-32 sm:h-32 relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl animate-pulse opacity-75"></div>
              {/* Inner container */}
              <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20"></div>
                <img 
                  src="./174931.jpg"
                  alt="Logo" 
                  className="w-full h-full object-contain relative z-10 p-2"
                />
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
            </div>

            {/* Title with enhanced styling */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-3 drop-shadow-2xl tracking-wide leading-tight">
                🎁 ระบบสุ่มรายชื่อผู้โชคดี
              </h1>
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                OUTING 2568 By TARF
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <div className="text-xl animate-bounce">🏆</div>
                <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-yellow-400"></div>
              </div>
            </div>

            {/* Location and status */}
            <div className="bg-gradient-to-r from-gray-800/60 via-gray-700/60 to-gray-800/60 border border-yellow-400/30 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-yellow-300 text-lg font-bold mb-2 tracking-wide">
                📍 ณ เดอะเโรน่า แอท ทับลาน
              </p>
              <div className="flex justify-center items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>READY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span>2568</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case Opening Area */}
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border-2 border-yellow-400 rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 flex flex-col items-center justify-center overflow-hidden h-80 w-full">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-2xl animate-pulse"></div>
          
          {/* Golden particles for celebration */}
          {showFireworks && particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-4 h-4 rounded-full animate-ping"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: '#FCD34D',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                boxShadow: '0 0 10px #FCD34D'
              }}
            />
          ))}

          {/* Case opening slot machine effect */}
          {isSpinning && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-20 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent transform -translate-y-1/2 animate-pulse"></div>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-yellow-400 rounded-full opacity-30 animate-bounce"
                  style={{
                    width: Math.random() * 8 + 4 + 'px',
                    height: Math.random() * 8 + 4 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 0.5 + 's',
                    animationDuration: Math.random() * 1 + 0.5 + 's'
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center relative z-20 px-4 w-full max-w-4xl">
            {isSpinning ? (
              <div className="space-y-4">
                {/* Slot machine style spinning */}
                <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2 animate-pulse break-words drop-shadow-lg">
                    {spinningName}
                  </div>
                  <div className="text-yellow-300 text-base sm:text-lg font-medium animate-pulse">
                    🎰 กรุณารอสักครู่... 🎰
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </div>
            ) : currentName ? (
              <div className="animate-fadeIn space-y-6">
                {/* Legendary drop effect */}
                <div className="flex justify-center gap-1 sm:gap-2 mb-4 flex-wrap">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="text-2xl sm:text-3xl animate-bounce"
                      style={{
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      ⭐
                    </div>
                  ))}
                </div>
                
                {/* Winner display */}
                <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400 rounded-xl p-4 sm:p-6 backdrop-blur-sm max-w-2xl mx-auto">
                  <div className="text-yellow-400 text-xs sm:text-sm font-bold mb-2 tracking-wider">★ ผู้โชคดี ★</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 break-words drop-shadow-lg overflow-hidden">
                    {currentName}
                  </div>
                  <div className="text-yellow-300 text-xs sm:text-sm font-medium">
                    🏆 ยินดีด้วย! 🏆
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl mb-4 animate-pulse">📦</div>
                <div className="text-lg sm:text-xl text-yellow-300 font-medium">
                  กดเพื่อสุ่มรายชื่อ
                </div>
                <div className="text-sm text-gray-400">
                  {availableNames.length} รายชื่อกำลังรอคุณอยู่
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 flex-shrink-0">
          <button
            onClick={pickRandom}
            disabled={isSpinning || availableNames.length === 0}
            className="w-full sm:flex-1 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 border-2 border-yellow-400"
          >
            {isSpinning ? '🎰 OPENING...' : '🎁 สุ่มรายชื่อกันเลย ลุย'}
          </button>
          <button
            onClick={reset}
            className="w-full sm:w-auto px-6 py-4 bg-gray-800 border-2 border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-gray-500 font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-gray-600/50"
          >
            <RotateCcw size={20} />
            RESET
          </button>
        </div>

        <div className="text-center text-yellow-300 mb-4 bg-gray-800/80 border-2 border-yellow-400/50 rounded-lg p-3 shadow-xl flex-shrink-0 backdrop-blur-sm h-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold tracking-wider">
              ITEMS IN CASE: <span className="text-xl font-bold text-yellow-400">{availableNames.length}</span> / {names.length}
            </div>
            <div className="text-xs text-gray-400">
              {availableNames.length === 0 ? 'Case is empty! Reset to refill.' : 'Ready to open!'}
            </div>
          </div>
        </div>

        {/* Drop History */}
        <div className="bg-gray-800/80 border-2 border-yellow-400/50 rounded-lg shadow-xl p-4 mb-4 flex-shrink-0 h-80 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-yellow-400 tracking-wider">🏆 DROP HISTORY</h2>
          </div>
          
          {history.length === 0 ? (
            <p className="text-gray-400 text-center py-8 text-sm">No drops yet... Open your first case!</p>
          ) : (
            <div className="space-y-2 h-64 overflow-y-auto">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                >
                  <span className="font-bold text-yellow-300 text-sm break-words">
                    ⭐ {item.name}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Case Inventory */}
        <div className="bg-gray-800/80 border-2 border-yellow-400/50 rounded-lg shadow-xl p-4 backdrop-blur-sm">
          <button 
            onClick={() => setShowNameList(!showNameList)}
            className="w-full flex items-center justify-between text-lg font-bold text-yellow-400 mb-4 hover:text-yellow-300 transition-colors tracking-wider"
          >
            <span>รายชื่อ ({names.length} รายการ)</span>
            {showNameList ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showNameList && (
            <div className="animate-fadeIn">
              {/* Search Filter */}
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/30">
                <h3 className="text-base font-bold text-blue-400 mb-3 tracking-wider">🔍 FILTER NAMES</h3>
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Search names..."
                  className="w-full px-3 py-2 bg-gray-700 border border-blue-400/50 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all text-sm text-white placeholder-gray-400"
                />
                {filterText && (
                  <div className="mt-2 text-xs text-blue-300">
                    Found {filteredNames.length} of {names.length} names
                  </div>
                )}
              </div>

              {/* Add Item */}
              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
                <h3 className="text-base font-bold text-yellow-400 mb-3 tracking-wider">➕ ADD NEW ITEM</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter item name..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-yellow-400/50 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm text-white placeholder-gray-400"
                  />
                  <button
                    onClick={addName}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg hover:from-yellow-400 hover:to-orange-400 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <Plus size={16} />
                    ADD
                  </button>
                </div>
              </div>

              {/* Item Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-max">
                {filteredNames.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-400">
                    {filterText ? `No names found matching "${filterText}"` : 'No names available'}
                  </div>
                ) : (
                  filteredNames.map((name, index) => {
                    const originalIndex = names.indexOf(name);
                    const isPicked = !availableNames.includes(name);
                    const isHighlighted = filterText && name.toLowerCase().includes(filterText.toLowerCase());
                    
                    return (
                      <div
                        key={originalIndex}
                        className={`bg-gradient-to-r from-gray-700 to-gray-800 border-2 px-3 py-2 rounded-lg flex items-center justify-between transition-all ${
                          isPicked 
                            ? 'opacity-40 border-gray-600 bg-gradient-to-r from-gray-800 to-gray-900' 
                            : isHighlighted && filterText
                            ? 'border-blue-400/70 hover:border-blue-400 hover:from-blue-500/10 hover:to-purple-500/10'
                            : 'border-yellow-400/50 hover:border-yellow-400 hover:from-yellow-500/10 hover:to-orange-500/10'
                        }`}
                      >
                        <span className={`font-bold text-sm ${
                          isPicked 
                            ? 'line-through text-gray-500' 
                            : isHighlighted && filterText
                            ? 'text-blue-300'
                            : 'text-yellow-300'
                        }`}>
                          {isPicked ? '🔒' : isHighlighted && filterText ? '🔍' : '⭐'} {name}
                        </span>
                        <button
                          onClick={() => removeName(name)}
                          className="text-gray-500 hover:text-red-400 ml-2 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Clear filter button */}
              {filterText && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setFilterText('')}
                    className="px-4 py-2 bg-gray-700 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 hover:border-gray-400 font-medium text-sm transition-all"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}