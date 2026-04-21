import { useState } from 'react';

import configData from '../content/configurator.json';

const GARMENTS = configData.garments || [];
const DECORATIONS = configData.decorations || [];
const PLACEMENTS = configData.placements || [];

const COMMON_COLORS = configData.colors ? configData.colors.map(c => c.name) : [];
const COLOR_MAPPING = configData.colors ? configData.colors.reduce((acc, c) => {
  acc[c.name] = c.value;
  return acc;
}, {}) : {};

const GarmentIcon = ({ garment, className = "w-6 h-6" }) => {
  const g = String(garment).toLowerCase();
  
  if (g.includes('hat')) {
    // Baseball cap (Mingcute Solid)
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="currentColor" d="M14.085 5H14a8 8 0 0 0-8 7.9l-3.614 2.81a1.01 1.01 0 0 0-.093 1.497a1.52 1.52 0 0 0 1.1.457c.22.001.436-.042.655-.066c.272-.03.717-.052 1.546.316c1.064.473 2.143 1.008 3.128 1.393c1.018.397 2.072.693 3.215.693c2.224 0 4.477-1.112 7.334-3.864a39 39 0 0 0 1.828-.141A1 1 0 0 0 22 15v-2a8 8 0 0 0-5-7.418V5.5a1.5 1.5 0 0 0-2.915-.5M5.563 15.774L7.5 14.266c3.087 1.155 5.845 1.743 8.73 1.882C14.415 17.573 13.08 18 11.936 18c-.793 0-1.584-.204-2.488-.557c-.936-.365-1.857-.83-3.043-1.357a7 7 0 0 0-.843-.312Z"/>
      </svg>
    );
  }
  if (g.includes('polo')) {
    // Polo Shirt (GameIcons)
    return (
      <svg className={className} viewBox="0 0 512 512">
        <path fill="currentColor" d="M256 33.978c-12.67 0-25.34 2.52-38.01 7.535c1.27 3.61 3.864 7.593 8.373 12.102C232.68 59.93 242.613 66.83 256 73.847c13.386-7.018 23.32-13.916 29.637-20.232c4.51-4.51 7.103-8.492 8.373-12.102c-12.67-5.016-25.34-7.535-38.01-7.535M201.88 49.1l-16.144 8.073c1.306 5.74 4.437 13.84 9.752 21.813c6.26 9.39 15.44 18.664 27.082 25.695l18.475-18.473c-11.317-6.394-20.465-12.923-27.408-19.866c-5.34-5.34-9.265-11.148-11.756-17.24zm108.24 0c-2.492 6.092-6.417 11.9-11.757 17.24c-6.943 6.944-16.09 13.473-27.408 19.867l18.475 18.474c11.64-7.03 20.823-16.305 27.082-25.694c5.315-7.973 8.446-16.072 9.752-21.813zm-140.6 17.775l-36.918 9.23l-71.875 71.873L112 199.252l9.637-9.637l16.738-16.738L128 467.977c76.448 13.61 193.653 13.173 256 0l-10.375-295.1L400 199.252l51.273-51.274l-71.875-71.873l-36.92-9.23c-2.243 7.068-5.946 14.53-10.99 22.095c-8.768 13.152-21.853 26.254-39.463 35.06l-5.802 2.9L265 105.706v122.27h-18v-122.27l-21.223 21.222l-5.802-2.9c-17.61-8.806-30.695-21.908-39.463-35.06c-5.044-7.566-8.747-15.027-10.99-22.095zM48 160.705l-19.273 19.273L80 231.252l19.273-19.274zm416 0l-51.273 51.273L432 231.252l51.273-51.274z"/>
      </svg>
    );
  }
  if (g.includes('hoodie') || g.includes('sweatshirt')) {
    // Hoodie (GameIcons)
    return (
      <svg className={className} viewBox="0 0 512 512">
        <path fill="currentColor" d="M256 25c-6.6 0-16.1 3.77-26.1 10.69c-9.9 6.92-20.3 16.69-29.6 27.09c-8.4 9.52-15.9 19.56-21.5 28.35c5-2.29 10-4.34 15.1-6.17l.9-.41c20.2-8.78 40.6-13.25 61.1-13.25c20.5-.02 41 4.37 61.3 13.26l.8.35c5.1 1.84 10.2 3.91 15.2 6.22c-5.6-8.79-13.1-18.83-21.5-28.35c-9.3-10.4-19.7-20.17-29.6-27.09C272.1 28.77 262.6 25 256 25m0 67.23c-16.3 0-32.5 2.37-48.2 7.1c1 16.67 5.3 36.37 13 51.87c8.8 17.6 20.5 28.6 35.2 28.6s26.4-11 35.2-28.6c7.7-15.5 12-35.2 13-51.87c-15.7-4.73-31.9-7.1-48.2-7.1m-66 13.67c-7.1 3.1-14.1 6.7-20.8 10.9c1.3 19.1 10.4 34.5 24.8 45.7c5.7 4.5 12.3 8.2 19.5 11c-3.3-4.4-6.2-9.3-8.7-14.3c-8.4-16.6-13.2-35.7-14.8-53.3m132 0c-1.6 17.6-6.4 36.7-14.8 53.3c-2.5 5.1-5.5 10-8.8 14.5c7.4-2.9 14.1-6.6 19.9-11.2c14.2-11.2 23.2-26.6 24.5-45.7c-6.7-4.2-13.7-7.8-20.8-10.9m-131.4 76.2c-23.4 3.6-46.8 9.2-70.3 16.7L93.42 427l31.18 10.4l26.5-198.6l17.9 1.8L155.6 442c23.6 5.7 62.1 9 100.4 9s76.8-3.3 100.4-9L343 240.6l17.9-1.8l26.5 198.6l31.1-10.3l-26.8-228.3c-23.4-7.4-46.7-13.1-70-16.7c-4.1 2.6-8.4 4.8-12.9 6.8c-3.3 11.9-2.9 26 0 39.1c3.7 16.7 11.7 31.8 17.6 37.6l-12.8 12.8c-10.1-10.2-18.1-27.1-22.4-46.4c-2.6-11.7-3.8-24.4-2.2-36.7c-10.4 2.3-21.5 3.2-33 2.5c-11.5.7-22.6-.3-33-2.6c1.6 12.3.4 25-2.2 36.8c-4.3 19.3-12.3 36.2-22.4 46.4l-12.8-12.8c5.9-5.8 13.9-20.9 17.6-37.6c2.9-13.2 3.3-27.3 0-39.3q-6.6-2.85-12.6-6.6m10.2 154.4h110.4l17.6 77.5l-17.6 4l-14.4-63.5h-81.6L200.8 418l-17.6-4zM91.28 445.2l-2.23 18.9c.05-.3.69 1.7 3.98 4.3c3.4 2.6 8.67 5.3 13.77 7.1c5.1 1.6 10.1 2.2 12.4 2l2.9-22zm329.42 0l-30.8 10.3l2.9 22c2.3.2 7.3-.4 12.4-2c5.1-1.8 10.4-4.5 13.8-7.1c3.3-2.6 3.9-4.6 3.9-4.3zm-266.3 15l-1.3 19.2v.1c.5.5 2.1 1.7 4.5 2.9c4.8 2.4 13 4.8 23.1 6.8c20.1 3.8 47.7 5.8 75.3 5.8s55.2-2 75.3-5.8c10.1-2 18.3-4.4 23.1-6.8c2.4-1.2 4-2.4 4.5-2.9v-.1l-1.3-19.2c-26.5 6.1-63.9 8.8-101.6 8.8s-75.1-2.7-101.6-8.8"/>
      </svg>
    );
  }
  if (g.includes('jacket')) {
    // Jacket (Tabler)
    return (
      <svg className={className} viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="m16 3l-4 5l-4-5"/>
          <path d="M12 19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.172a2 2 0 0 1 .586-1.414l.828-.828A2 2 0 0 0 6 7.172V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.172a2 2 0 0 0 .586 1.414l.828.828A2 2 0 0 1 20 10.828V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2"/>
          <path d="M20 13h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3M4 17h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H4m8 6V8"/>
        </g>
      </svg>
    );
  }
  if (g.includes('long sleeve')) {
    // Long Sleeve T-Shirt (Lucide)
    return (
      <svg className={className} viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M6 19H3c-.6 0-1-.4-1-1V6c0-1.1.8-2.3 1.9-2.6L8 2a4 4 0 0 0 8 0l4.1 1.4C21.2 3.7 22 4.9 22 6v12c0 .6-.4 1-1 1h-3"/>
          <path d="M18 8v13c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V8"/>
        </g>
      </svg>
    );
  }
  // Short Sleeve T-Shirt (FA6 Solid)
  return (
    <svg className={className} viewBox="0 0 640 512">
      <path fill="currentColor" d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3l126.2 105.1c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0z"/>
    </svg>
  );
};

const HAT_EQUIVALENTS = {
  'XS': '6 7/8',
  'S': '7 - 7 1/8',
  'M': '7 1/4 - 7 3/8',
  'L': '7 1/2 - 7 5/8',
  'XL': '7 3/4 - 7 7/8',
  '2XL': '8',
  '3XL': '8 1/8',
  '4XL': '8 1/4'
};

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
const KIDS_SIZES = ['2T', '3T', '4T', '5T', 'YXS', 'YS', 'YM', 'YL', 'YXL'];

const getSizingConfig = (garment) => {
  if (garment === 'Hat: Snapback') {
    return [{ label: 'Unisex', sizes: ['Kiddos', 'Adult'] }];
  }
  if (garment === 'Hat') {
    return [{ label: 'Unisex', sizes: STANDARD_SIZES }];
  }
  return [
    { label: 'Guys', sizes: STANDARD_SIZES },
    { label: 'Ladies', sizes: STANDARD_SIZES },
    { label: 'Kiddos', sizes: KIDS_SIZES }
  ];
};

const cloneObj = (obj) => JSON.parse(JSON.stringify(obj || {}));

export default function CustomBuild() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileReceiptOpen, setIsMobileReceiptOpen] = useState(false);
  const [selections, setSelections] = useState({
    garments: [], 
    sizing: {}, 
    colorAllocations: {}, 
    decoration: '',
    placements: [],
    customer: { name: '', email: '', phone: '' }
  });

  const toggleGarment = (g) => {
    setSelections(prev => {
      const isSelected = prev.garments.includes(g);
      const newGarments = isSelected ? prev.garments.filter(x => x !== g) : [...prev.garments, g];
      return { ...prev, garments: newGarments };
    });
    if (currentStep < 2) setCurrentStep(2);
  };

  const updateSizing = (garment, gender, size, qty) => {
    setSelections(prev => {
      const newState = { ...prev };
      if (!newState.sizing[garment]) newState.sizing[garment] = {};
      if (!newState.sizing[garment][gender]) newState.sizing[garment][gender] = {};
      
      newState.sizing[garment][gender][size] = qty;
      return newState;
    });
  };

  const proceedToColors = () => {
    setSelections(prev => {
      const newColorAllocs = { ...prev.colorAllocations };
      
      prev.garments.forEach(g => {
         const sz = prev.sizing[g] || {};
         const hasSizes = Object.values(sz).some(gen => Object.values(gen).some(q => parseInt(q) > 0));
         
         // Initialize color allocations if none exist for this garment
         if (hasSizes && (!newColorAllocs[g] || newColorAllocs[g].length === 0)) {
           newColorAllocs[g] = [{
             id: Date.now().toString() + Math.random().toString(),
             color: '',
             customColor: '',
             sizes: cloneObj(sz)
           }];
         }
      });
      return { ...prev, colorAllocations: newColorAllocs };
    });
    setCurrentStep(3);
  };

  // --- CORE COLOR ALLOCATION LOGIC ---

  const getRemainingCalculations = (state, garment) => {
    const total = cloneObj(state.sizing[garment]);
    const allocs = state.colorAllocations[garment] || [];
    
    // Create tracking structure for remaining
    const remaining = cloneObj(total);
    
    allocs.forEach(alloc => {
      Object.keys(alloc.sizes || {}).forEach(gen => {
        Object.keys(alloc.sizes[gen]).forEach(sz => {
          const qtyAllocated = parseInt(alloc.sizes[gen][sz]) || 0;
          if (remaining[gen] && remaining[gen][sz]) {
            remaining[gen][sz] = Math.max(0, parseInt(remaining[gen][sz]) - qtyAllocated);
          }
        });
      });
    });

    const hasRem = Object.values(remaining).some(gen => Object.values(gen).some(q => q > 0));
    return { remaining, hasRem };
  };

  const processAutoAppends = (prevState, modifiedGarment) => {
     const { remaining, hasRem } = getRemainingCalculations(prevState, modifiedGarment);
     let rows = [...(prevState.colorAllocations[modifiedGarment] || [])];
     
     // Clean up unused rows if quantities are fully allocated
     if (!hasRem) {
       rows = rows.filter(r => {
         const hasAnySize = Object.values(r.sizes || {}).some(gen => Object.values(gen).some(q => parseInt(q) > 0));
         const isUnused = r.color === '' && !hasAnySize;
         return !isUnused;
       });
       
       // Fallback in edge cases where all rows were somehow unused
       if (rows.length === 0) {
          rows = [...(prevState.colorAllocations[modifiedGarment] || [])];
       }
     }

     const lastRow = rows[rows.length - 1];
     
     // Only append if there are remaining sizes AND the last row has been "used" (has a color selected)
     if (hasRem && lastRow && lastRow.color !== '') {
        rows.push({
           id: Date.now().toString() + Math.random().toString(),
           color: '',
           customColor: '',
           sizes: cloneObj(remaining)
        });
     }

     return {
        ...prevState,
        colorAllocations: { ...prevState.colorAllocations, [modifiedGarment]: rows }
     };
  };

  const updateAllocationColor = (garment, id, colorVal) => {
    setSelections(prev => {
       const rows = [...(prev.colorAllocations[garment] || [])];
       const idx = rows.findIndex(r => r.id === id);
       if (idx > -1) rows[idx] = { ...rows[idx], color: colorVal };
       
       let newState = { ...prev, colorAllocations: { ...prev.colorAllocations, [garment]: rows } };
       return processAutoAppends(newState, garment);
    });
  };

  const updateAllocationCustomColor = (garment, id, textValue) => {
    setSelections(prev => {
       const rows = [...(prev.colorAllocations[garment] || [])];
       const idx = rows.findIndex(r => r.id === id);
       if (idx > -1) rows[idx] = { ...rows[idx], customColor: textValue };
       return { ...prev, colorAllocations: { ...prev.colorAllocations, [garment]: rows } };
    });
  };

  const updateAllocationSizing = (garment, id, gender, size, qty) => {
    setSelections(prev => {
       const rows = [...(prev.colorAllocations[garment] || [])];
       const idx = rows.findIndex(r => r.id === id);
       if (idx > -1) {
          const newSizes = { ...rows[idx].sizes };
          if (!newSizes[gender]) newSizes[gender] = {};
          newSizes[gender][size] = qty;
          rows[idx] = { ...rows[idx], sizes: newSizes };
       }
       let newState = { ...prev, colorAllocations: { ...prev.colorAllocations, [garment]: rows } };
       return processAutoAppends(newState, garment);
    });
  };

  const updateCustomer = (field, value) => {
     setSelections(prev => ({
        ...prev,
        customer: { ...(prev.customer || {}), [field]: value }
     }));
  };

  // View logic config builder
  const getActiveSizingConfig = (garment) => {
    const baseConfig = getSizingConfig(garment);
    const total = selections.sizing[garment] || {};
    return baseConfig.map(cat => {
       const activeSizes = cat.sizes.filter(size => parseInt(total[cat.label]?.[size] || 0) > 0);
       return { ...cat, sizes: activeSizes };
    }).filter(cat => cat.sizes.length > 0);
  };


  // --- REST OF FLOW ---

  const togglePlacement = (p) => {
    setSelections(prev => {
      const isSelected = prev.placements.includes(p);
      const newPl = isSelected ? prev.placements.filter(x => x !== p) : [...prev.placements, p];
      return { ...prev, placements: newPl };
    });
  };

  const getQty = (garment, gender, size) => {
    return selections.sizing[garment]?.[gender]?.[size] || '';
  };

  const hasPlacementOptions = selections.garments.some(g => !g.startsWith('Hat'));

  const isStep3Complete = () => {
    // True if NO garment has remaining items
    return !selections.garments.some(g => {
       const { hasRem } = getRemainingCalculations(selections, g);
       return hasRem;
    });
  };

  const generateMailto = () => {
    const email = "jeff@919designs.net";
    const subject = "New Custom Build Request";
    let body = `==== NEW CUSTOM BUILD SPECS ====\n\n`;
    
    body += `--- CONTACT INFO ---\n`;
    body += `Name: ${selections.customer?.name || ''}\n`;
    body += `Email: ${selections.customer?.email || ''}\n`;
    body += `Phone: ${selections.customer?.phone || ''}\n\n`;
    
    body += `GARMENTS SELECTED: ${selections.garments.join(', ') || 'None'}\n\n`;
    
    selections.garments.forEach(g => {
      body += `--- ${g.toUpperCase()} ---\n`;
      const allocs = selections.colorAllocations[g] || [];
      const config = getSizingConfig(g);
      
      if (allocs.length === 0) {
        body += `No details specified.\n\n`;
        return;
      }

      allocs.forEach((alloc, index) => {
         // Check if this block has any quantity entered
         const hasSizes = Object.values(alloc.sizes).some(gen => Object.values(gen).some(q => parseInt(q) > 0));
         if (!hasSizes) return;
         
         const cName = alloc.color === 'Other' ? (alloc.customColor || 'Other') : (alloc.color || 'Unspecified Color');
         body += `\n> COLORWAY ${index + 1}: ${cName}\n`;
         
         config.forEach(category => {
            let catHasSizes = false;
            category.sizes.forEach(size => {
               const q = alloc.sizes[category.label]?.[size];
               if (q && parseInt(q) > 0) {
                 const sizeLabel = g === 'Hat' ? `${size} (${HAT_EQUIVALENTS[size]})` : size;
                 body += `  - ${category.label !== 'Unisex' ? category.label + ' ' : ''}${sizeLabel}: ${q}\n`;
                 catHasSizes = true;
               }
            });
         });
      });
      body += `\n`;
    });

    body += `DECORATION METHOD: ${selections.decoration || 'Not specified'}\n\n`;
    if (hasPlacementOptions) {
      body += `GRAPHIC PLACEMENT: ${selections.placements.join(', ') || 'Not specified'}\n\n`;
    }

    body += `================================\n`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Extract receipt card so it can be used in both desktop split-view and mobile overlay
  const receiptCard = (
    <div className="relative w-full max-w-sm bg-surface border-t-[12px] border-t-primary border-l border-r border-b border-outline/30 p-8 shadow-2xl flex flex-col font-mono text-sm z-10 transition-all">
      <div className="text-center border-b border-outline/20 pb-6 mb-8">
        <h2 className="font-black tracking-[0.3em] uppercase text-xl text-on-surface mb-2">919 Designs</h2>
        <p className="text-sm text-outline tracking-[0.4em] uppercase text-center flex-1">Custom Order Creation Summary</p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <span className="text-primary text-sm font-black tracking-widest uppercase block mb-1">Garments Selected</span>
          <p className="text-on-surface font-bold text-sm tracking-widest uppercase">{selections.garments.length ? selections.garments.join(' | ') : 'AWAITING INPUT...'}</p>
        </div>

        {selections.garments.map(g => {
          const allocs = selections.colorAllocations[g] || [];
          const config = getSizingConfig(g);
          return (
            <div key={`receipt-${g}`} className="border-l-[3px] border-outline/30 pl-4 py-1">
              <span className="text-on-surface font-black tracking-widest uppercase text-sm block mb-2">{g}</span>
              
              {allocs.length === 0 ? (
                 <span className="text-sm text-outline italic">No specs generated.</span>
              ) : (
                 allocs.map((alloc, idx) => {
                    const hasSizes = Object.values(alloc.sizes).some(gen => Object.values(gen).some(q => parseInt(q) > 0));
                    if (!hasSizes) return null;
                    
                    const cName = alloc.color === 'Other' ? (alloc.customColor || 'Other') : (alloc.color || 'Unspecified Color');

                    return (
                       <div key={`rec-alloc-${alloc.id}`} className="mb-4 last:mb-0">
                          <span className="text-sm text-on-surface block mb-2 bg-surface-variant p-2 italic border-l-2 border-primary">
                             [C{idx+1}] {cName}
                          </span>
                          <div className="text-sm text-on-surface flex flex-col gap-1 pl-2 border-l border-outline/20">
                             {config.map(category => {
                                const sizes = category.sizes.map(s => {
                                   const q = alloc.sizes[category.label]?.[s];
                                   const label = g === 'Hat' ? `${s}(${HAT_EQUIVALENTS[s]})` : s;
                                   return q > 0 ? `${label}: ${q}` : null;
                                }).filter(Boolean);
                                
                                if (sizes.length === 0) return null;
                                return (
                                   <div key={`rec-sz-${category.label}`} className="flex flex-col mb-1 last:mb-0">
                                      {category.label !== 'Unisex' && <span className="text-sm opacity-60 uppercase font-black">{category.label}</span>}
                                      <span className="font-mono tracking-wider text-sm leading-tight">{sizes.join(', ')}</span>
                                   </div>
                                );
                             })}
                          </div>
                       </div>
                    )
                 })
              )}
            </div>
          )
        })}

        <div className="border-t border-outline/20 pt-6">
          <span className="text-primary text-sm font-black tracking-widest uppercase block mb-1">Graphics Style</span>
          <p className="text-on-surface font-bold text-sm tracking-widest uppercase">{selections.decoration || 'AWAITING INPUT...'}</p>
        </div>

        {hasPlacementOptions && (
           <div>
              <span className="text-primary text-sm font-black tracking-widest uppercase block mb-1">Zoning</span>
              <p className="text-on-surface font-bold text-sm tracking-widest uppercase">{selections.placements.length ? selections.placements.join(' | ') : 'AWAITING INPUT...'}</p>
           </div>
        )}
      </div>
      
      <div className="mt-12 pt-6 border-t border-outline/20 flex justify-between items-center opacity-40 text-sm font-black tracking-widest uppercase">
        <span>{new Date().toISOString().split('T')[0]}</span>
        <span>{selections.customer?.name || 'Customer Name'}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Left Column */}
      <div className="w-full md:w-[60%] p-6 md:p-12 xl:p-24 flex flex-col justify-start pb-32 md:pb-12 md:h-[calc(100vh-4rem)] md:overflow-y-auto no-scrollbar">
        <div className="text-sm tracking-[0.3em] text-outline font-bold uppercase mb-4 md:mb-8 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-primary"></span>
          Configure
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase text-on-surface leading-none tracking-tighter mb-12 relative text-shadow-sm">
          Start Your<br />Custom Build
        </h1>

        {/* --- STEP 1: GARMENTS --- */}
        <div className={`flex flex-col gap-4 w-full mb-12 transition-all duration-300 ${currentStep >= 1 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
           <div className="flex justify-between items-center border-b border-outline pb-4">
              <span className="text-sm font-bold tracking-widest text-on-surface uppercase">
                01. Garment Types <span className="text-outline font-normal text-sm ml-2">(Select all that apply)</span>
              </span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GARMENTS.map(g => {
                const isActive = selections.garments.includes(g);
                return (
                  <button 
                    key={g} 
                    onClick={() => toggleGarment(g)}
                    className={`relative p-6 border text-left transition-all duration-200 ease-out flex items-center justify-between
                      ${isActive 
                        ? 'border-primary bg-primary text-on-primary ring-1 ring-primary transform scale-[1.02] shadow-[0_0_15px_rgba(145,40,37,0.3)] z-10' 
                        : 'border-outline/40 bg-surface-variant text-on-surface hover:border-outline'
                      }
                    `}
                  >
                    <span className={`block font-black text-sm uppercase tracking-widest transition-colors`}>{g}</span>
                    {isActive && <span className="material-symbols-outlined ml-2">check_circle</span>}
                  </button>
                )
              })}
           </div>
        </div>

        {/* --- STEP 2: SIZING --- */}
        <div className={`flex flex-col gap-4 w-full mb-12 transition-all duration-300 ${currentStep >= 2 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
           <div className="flex justify-between items-center border-b border-outline pb-4">
              <span className="text-sm font-bold tracking-widest text-on-surface uppercase">02. Total Quantities & Sizes</span>
           </div>
           {currentStep >= 2 && selections.garments.length === 0 && (
             <span className="text-outline text-sm py-4 uppercase tracking-widest">No garments selected.</span>
           )}
           {currentStep >= 2 && selections.garments.map(garment => {
             const config = getSizingConfig(garment);
             return (
               <div key={garment} className="p-6 md:p-8 bg-surface-variant border border-outline/40 mb-6 shadow-sm">
                 <h3 className="text-on-surface font-black uppercase tracking-widest mb-6 border-b border-outline/20 pb-4 text-xl flex items-center gap-3">
                   <GarmentIcon garment={garment} className="w-8 h-8 text-[#EEE7D4]" />
                   {garment} 
                 </h3>
                 
                 {config.map(category => (
                   <div key={category.label} className="mb-10 last:mb-0">
                     <h4 className="text-on-surface text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-outline rounded-full"></span>
                        {category.label}
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                       {category.sizes.map(size => {
                         const qty = getQty(garment, category.label, size);
                         const isActive = qty && qty > 0;
                         const topLabel = size;
                         const bottomLabel = garment === 'Hat' ? HAT_EQUIVALENTS[size] : null;
                         
                         return (
                           <div key={size} className={`flex items-stretch border transition-all duration-200 
                             ${isActive 
                                ? 'border-primary ring-1 ring-primary transform scale-[1.02] shadow-[0_4px_10px_rgba(145,40,37,0.2)] bg-surface z-10' 
                                : 'border-outline/40 bg-background hover:border-outline'
                             }`}
                           >
                             <div className={`flex flex-col items-center justify-center w-[45%] border-r transition-colors duration-200 flex-shrink-0 px-2
                               ${isActive ? 'border-primary bg-primary text-on-primary font-black' : 'border-outline/40 text-on-surface font-bold'}
                             `}>
                               <span className={bottomLabel ? "text-sm tracking-widest leading-none mt-1" : "text-sm tracking-widest"}>{topLabel}</span>
                               {bottomLabel && <span className="text-sm opacity-70 mt-1 mb-1 font-mono tracking-tighter text-center">{bottomLabel}</span>}
                             </div>
                             <div className="w-2/3 flex items-center px-2 min-w-0">
                               <input 
                                 type="number"
                                 min="0"
                                 placeholder="QTY"
                                 value={qty}
                                 onChange={(e) => updateSizing(garment, category.label, size, e.target.value)}
                                 className={`w-full bg-transparent border-none text-center font-mono text-xl focus:outline-none transition-colors 
                                  ${isActive ? 'text-on-surface font-bold' : 'text-on-surface/40'}`}
                               />
                             </div>
                           </div>
                         )
                       })}
                     </div>
                   </div>
                 ))}
               </div>
             )
           })}
           {currentStep === 2 && selections.garments.length > 0 && (
             <button onClick={proceedToColors} className="bg-primary hover:bg-primary/80 text-on-primary w-full py-5 px-8 mt-2 font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 flex justify-between items-center group shadow-lg">
                <span>Next</span> 
                <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
             </button>
           )}
        </div>

        {/* --- STEP 3: COLORS/STYLES (MULTI ALLOCATOR) --- */}
        <div className={`flex flex-col gap-4 w-full mb-12 transition-all duration-300 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
           <div className="flex justify-between items-center border-b border-outline pb-4">
              <span className="text-sm font-bold tracking-widest text-on-surface uppercase">03. Target Colorways & Breakdowns</span>
           </div>
           
           {currentStep >= 3 && selections.garments.map(garment => {
              const allocs = selections.colorAllocations[garment] || [];
              const activeConfig = getActiveSizingConfig(garment);
              const { remaining, hasRem } = getRemainingCalculations(selections, garment);

              return (
                 <div key={garment} className={`mb-12 transition-all duration-300 ${hasRem ? 'border-[3px] border-primary p-6 bg-primary/5 shadow-lg' : 'border border-transparent'}`}>
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-on-surface font-black uppercase tracking-widest text-2xl flex items-center gap-3">
                        <GarmentIcon garment={garment} className="w-10 h-10 text-[#EEE7D4] drop-shadow-md" />
                        {garment}
                      </h3>
                      {hasRem && (
                        <div className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 animate-pulse">
                           Incomplete Allocation
                        </div>
                      )}
                   </div>

                   {/* Render Each Color Allocation Block */}
                   {allocs.map((alloc, idx) => (
                     <div key={alloc.id} className="flex flex-col mb-6 bg-surface-variant p-6 border border-outline/40 shadow-sm relative transition-all duration-300 animate-scale-up origin-top">
                       <span className="absolute -top-3 -left-3 bg-primary text-on-primary font-black w-8 h-8 flex items-center justify-center text-sm shadow-lg">{idx + 1}</span>
                       <label className="text-sm uppercase tracking-widest text-on-surface font-bold mb-3">{garment} Colorway {idx + 1}</label>
                       
                       <div className={`relative mb-6 p-2 transition-all duration-300 ${!alloc.color ? 'ring-[3px] ring-primary bg-primary/10' : ''}`}>
                         {!alloc.color && (
                           <span className="text-primary text-sm uppercase font-black tracking-widest mb-2 block animate-pulse">
                             Action Required: Select a Colorway
                           </span>
                         )}
                         <div className="relative">
                           {alloc.color && (
                             <span 
                               className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-surface/50 shadow-[0_1px_4px_rgba(0,0,0,0.5)] z-10"
                               style={{ background: COLOR_MAPPING[alloc.color] || 'transparent' }}
                             ></span>
                           )}
                           <select 
                             value={alloc.color || ''}
                             onChange={(e) => updateAllocationColor(garment, alloc.id, e.target.value)}
                             className={`w-full bg-background border border-outline/50 p-4 ${alloc.color ? 'pl-12' : 'pl-5'} pr-12 text-on-surface text-lg appearance-none focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all duration-200 font-bold tracking-wide`}
                           >
                             <option value="" disabled>Select a color...</option>
                             {COMMON_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                           <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                         </div>
                       </div>
                       
                       {alloc.color === 'Other' && (
                         <div className="mb-6 animate-scale-up origin-top">
                            <label className="text-sm uppercase tracking-widest text-on-surface font-bold mb-2 block">Specify Custom Color</label>
                            <input 
                              type="text" 
                              placeholder={`e.g. Vintage Wash Navy`} 
                              value={alloc.customColor || ''}
                              onChange={(e) => updateAllocationCustomColor(garment, alloc.id, e.target.value)}
                              className="w-full bg-background border border-outline/50 p-4 text-on-surface text-base focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all duration-200 placeholder:text-outline"
                            />
                         </div>
                       )}

                       {/* Sizing inner grid for this colorway */}
                       <div className="bg-background/40 p-4 border border-outline/20">
                          <label className="text-sm uppercase tracking-widest text-on-surface font-bold mb-4 block">Assign quantities to this colorway</label>
                          {activeConfig.map(category => (
                             <div key={category.label} className="mb-4 last:mb-0">
                               <h4 className="text-on-surface text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-outline rounded-full"></span>
                                  {category.label}
                               </h4>
                               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                 {category.sizes.map(size => {
                                   const qty = alloc.sizes[category.label]?.[size] || '';
                                   const remQty = remaining[category.label]?.[size] || 0;
                                   const isActive = qty && parseInt(qty) > 0;
                                   const isExhausted = !isActive && remQty === 0;

                                   return (
                                     <div key={size} className={`flex items-stretch border transition-all duration-200 
                                       ${isActive 
                                          ? 'border-primary ring-1 ring-primary transform scale-[1.02] bg-surface z-10' 
                                          : isExhausted 
                                            ? 'border-outline/20 bg-background/50 opacity-40 cursor-not-allowed'
                                            : 'border-outline/40 bg-background hover:border-outline'
                                       }`}
                                     >
                                       <div className={`flex flex-col items-center justify-center w-[45%] border-r transition-colors duration-200 flex-shrink-0 px-2
                                         ${isActive ? 'border-primary bg-primary text-on-primary font-black' : 'border-outline/40 text-on-surface font-bold'}
                                       `}>
                                         <span className="text-sm tracking-wide">{size}</span>
                                       </div>
                                       <div className="w-[55%] flex flex-col items-center justify-center px-1">
                                         <input 
                                           type="number"
                                           min="0"
                                           max={parseInt(qty || 0) + remQty} // Cannot exceed total assigned in Step 2 bounds
                                           placeholder="0"
                                           value={qty}
                                           disabled={isExhausted}
                                           onChange={(e) => updateAllocationSizing(garment, alloc.id, category.label, size, e.target.value)}
                                           className={`w-full bg-transparent border-none text-center font-mono text-lg focus:outline-none transition-colors 
                                            ${isActive ? 'font-bold' : ''} ${remQty !== 0 ? 'text-primary' : (isActive ? 'text-on-surface' : 'text-on-surface/40')}`}
                                         />
                                       </div>
                                     </div>
                                   )
                                 })}
                               </div>
                             </div>
                          ))}
                       </div>

                     </div>
                   ))}
                   
                   {/* Missing Allocation Block Warnings */}
                   {hasRem && (
                      <div className="p-4 border-2 border-dashed border-primary/40 bg-primary/5 text-center mt-4">
                         <span className="text-sm uppercase tracking-widest text-primary font-bold block mb-2">Unallocated Quantities Detected!</span>
                         <span className="text-sm text-on-surface tracking-wider block">Modify the quantities above or select a new color to auto-generate another allocation block.</span>
                      </div>
                   )}
                 </div>
              )
           })}

           {currentStep === 3 && (
             <div className="mt-8 transition-all duration-300">
               {!isStep3Complete() && (
                 <p className="text-primary font-bold text-center uppercase tracking-widest text-sm mb-4">
                   Please select a color and quantity for all items to proceed.
                 </p>
               )}
               <button 
                  onClick={() => setCurrentStep(4)} 
                  disabled={!isStep3Complete()}
                  className={`w-full py-5 px-8 font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 flex justify-between items-center group
                    ${isStep3Complete() 
                      ? 'bg-primary hover:bg-primary/80 text-on-primary shadow-lg cursor-pointer' 
                      : 'border-2 border-outline/30 bg-transparent text-outline/60 cursor-not-allowed'}
                  `}
               >
                  <span>Proceed to Prep</span> 
                  <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">
                    {isStep3Complete() ? 'arrow_forward' : 'lock'}
                  </span>
               </button>
             </div>
           )}
        </div>

        {/* --- STEP 4 & 5: DECOR & PLACEMENT --- */}
        <div className={`flex flex-col gap-4 w-full mb-12 transition-all duration-300 ${currentStep >= 4 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
           <div className="flex justify-between items-center border-b border-outline pb-4">
              <span className="text-sm font-bold tracking-widest text-on-surface uppercase">04. Graphics Style</span>
           </div>
           
           {currentStep >= 4 && (
             <>
              <div className="mb-6">
                <label className="text-sm uppercase tracking-widest text-on-surface/80 font-bold mb-4 block">Graphics Style</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {DECORATIONS.map(d => {
                    const isActive = selections.decoration === d;
                    return (
                      <button 
                        key={d} 
                        onClick={() => setSelections({...selections, decoration: d})}
                        className={`p-5 border text-center transition-all duration-200 flex flex-col items-center justify-center gap-3
                          ${isActive 
                            ? 'border-primary bg-primary text-on-primary ring-1 ring-primary transform scale-[1.02] shadow-[0_4px_10px_rgba(145,40,37,0.2)] z-10' 
                            : 'border-outline/40 bg-surface-variant text-on-surface hover:border-outline'
                          }`}
                      >
                        <span className={`w-12 h-12 flex items-center justify-center text-current opacity-90`}>
                           {d === 'Embroidered' ? (
                              <svg viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8">
                                <path d="m61.67 119.8l-12.69 68.3c-5.47 29.6-1.02 60.1 12.69 86.8h51.03V119.8zm68.63 0v115.6h2.9c6.2 0 11.2-5.1 11.2-11.3V119.8zm31.8 0v104.3c0 15.9-12.9 28.8-28.9 28.8h-2.9v81.7h14.9v-59.7h19.6s7.6-15.3 13.6-27.7c4.7-9.2 14.1-15.1 24.5-15.1h80.2c15 0 27.2 12.1 27.2 27.1v91.5H25.95l10.57 68.5H455.1l10.5-63.1l-21.1-236.3zm310.1 23.4c-4.9.4-8.5 4.7-8 9.5l4.3 47.4c.4 4.8 4.7 8.4 9.5 8c4.9-.4 8.4-4.8 8-9.6l-4.2-47.3c-.4-4.5-4.2-8-8.7-8zm-86.8.1c21.7 0 39.2 17.5 39.2 39.2s-17.5 39.2-39.2 39.2s-39.2-17.5-39.2-39.2s17.5-39.2 39.2-39.2m0 17.5c-11.9 0-21.7 9.8-21.7 21.7c0 12 9.8 21.7 21.7 21.7s21.7-9.7 21.7-21.7c0-11.9-9.8-21.7-21.7-21.7m0 89.9c26.6 0 48.2 21.7 48.2 48.2c0 26.6-21.6 48.2-48.2 48.2s-48.2-21.6-48.2-48.2c0-26.5 21.6-48.2 48.2-48.2m0 17.6c-16.9 0-30.6 13.7-30.6 30.6s13.7 30.5 30.6 30.5s30.5-13.6 30.5-30.5s-13.6-30.6-30.5-30.6M92.71 287.8v17.6h20.09v-17.6zM36.52 438.9v26.5H454.9v-26.5z"/>
                              </svg>
                           ) : d === 'Patch' ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
                                <path d="M12 7l3 8h-6z" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                              </svg>
                           ) : (
                              <span className="material-symbols-outlined text-[32px]">print</span>
                           )}
                        </span>
                        <span className={`block text-sm uppercase tracking-widest font-black leading-tight mt-1`}>{d}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {hasPlacementOptions && (
                <div className="mb-6 border-t border-outline/20 pt-6">
                  <label className="text-sm uppercase tracking-widest text-on-surface/80 font-bold mb-4 block">Graphic Placement (Shirts & Outerwear Only - Check all that apply)</label>
                  <div className="flex flex-wrap gap-3">
                    {PLACEMENTS.map(p => {
                      const isActive = selections.placements.includes(p);
                      return (
                        <button 
                          key={p} 
                          onClick={() => togglePlacement(p)}
                          className={`py-3 px-5 border text-sm font-bold uppercase tracking-widest transition-all duration-200 
                            ${isActive 
                              ? 'border-primary bg-primary text-on-primary transform scale-[1.02] shadow-sm' 
                              : 'border-outline/40 bg-surface-variant text-on-surface hover:border-outline'
                            }`}
                        >
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
             </>
           )}
           
           {currentStep >= 4 && (
             <div className="mt-12 border-t border-outline/20 pt-8">
                <h3 className="text-on-surface font-black uppercase tracking-widest mb-6 border-b border-outline/20 pb-4 text-xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">contact_mail</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                     <label className="text-sm uppercase tracking-widest text-on-surface/80 font-bold mb-2 block">Full Name</label>
                     <input type="text" value={selections.customer?.name || ''} onChange={e => updateCustomer('name', e.target.value)} className="w-full bg-background border border-outline/40 focus:border-primary p-3 text-on-surface outline-none" placeholder="Your Name" />
                  </div>
                  <div>
                     <label className="text-sm uppercase tracking-widest text-on-surface/80 font-bold mb-2 block">Email Address</label>
                     <input type="email" value={selections.customer?.email || ''} onChange={e => updateCustomer('email', e.target.value)} className="w-full bg-background border border-outline/40 focus:border-primary p-3 text-on-surface outline-none" placeholder="you@example.com" />
                  </div>
                  <div>
                     <label className="text-sm uppercase tracking-widest text-on-surface/80 font-bold mb-2 block">Phone Number</label>
                     <input type="tel" value={selections.customer?.phone || ''} onChange={e => updateCustomer('phone', e.target.value)} className="w-full bg-background border border-outline/40 focus:border-primary p-3 text-on-surface outline-none" placeholder="(555) 123-4567" />
                  </div>
                </div>

                 {(() => {
                    const isNameValid = (selections.customer?.name || '').trim().length > 1;
                    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selections.customer?.email || '');
                    const isPhoneValid = (selections.customer?.phone || '').replace(/\D/g, '').length >= 10;
                    const isCustomerValid = isNameValid && isEmailValid && isPhoneValid;
                    
                    if (!isCustomerValid) {
                       return (
                         <div className="w-full">
                           <button disabled className="bg-background border-2 border-primary/20 text-primary/40 w-full py-8 tracking-[0.4em] uppercase font-black text-center transition-all duration-300 block text-xl rounded-sm cursor-not-allowed border-dashed">
                              SUBMIT
                           </button>
                           <p className="text-primary text-xs uppercase tracking-widest text-center mt-3 font-bold">Complete your contact info to submit</p>
                         </div>
                       );
                    }
                    
                    return (
                      <a href={generateMailto()} className="bg-primary hover:bg-primary/90 text-on-primary w-full py-8 tracking-[0.4em] uppercase font-black text-center transition-all duration-300 block shadow-[0_8px_32px_rgba(145,40,37,0.4)] hover:shadow-primary/40 hover:-translate-y-1 text-xl rounded-sm border border-black/20">
                         SUBMIT
                      </a>
                    );
                 })()}
             </div>
           )}
        </div>

      </div>

      {/* Right Column (Dynamic Spec Sheet) */}
      <div className="hidden lg:flex w-full lg:w-[40%] bg-surface-variant/30 flex-col items-center justify-start p-6 md:p-12 h-[calc(100vh-4rem)] border-l border-outline/20 relative overflow-y-auto no-scrollbar">
        {receiptCard}
      </div>

      {/* Mobile Receipt Toggle */}
      <button 
        onClick={() => setIsMobileReceiptOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 z-40 bg-primary hover:bg-primary/90 text-on-primary w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(145,40,37,0.5)] flex items-center justify-center transition-transform hover:scale-105 border border-black/20"
      >
        <span className="material-symbols-outlined text-3xl">receipt_long</span>
      </button>

      {/* Mobile Receipt Overlay */}
      {isMobileReceiptOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileReceiptOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-surface-variant shadow-[0_0_64px_rgba(0,0,0,0.8)] border-l border-outline/30 flex flex-col animate-scale-up origin-right">
            <div className="p-4 flex justify-between items-center border-b border-outline/20 bg-surface z-20">
              <span className="text-on-surface font-black uppercase tracking-widest text-sm flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">receipt_long</span>
                 Order Spec
              </span>
              <button 
                onClick={() => setIsMobileReceiptOpen(false)}
                className="w-10 h-10 bg-surface-variant flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors border border-outline/20 hover:border-primary/50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex-grow overflow-y-auto w-full flex justify-center items-start">
               {receiptCard}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
