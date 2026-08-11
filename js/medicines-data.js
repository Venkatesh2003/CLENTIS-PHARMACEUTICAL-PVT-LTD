// Clentis Pharmaceutical Pvt Ltd — Medicine Database
// Extracted from: Clentis Price List (June 2026).pdf
// Total: 135 medicines across all segments

const DEFAULT_MEDICINES = [
  // ═══════════════════════════════════════════
  // ORTHOPEDIC SEGMENT
  // ═══════════════════════════════════════════
  { id: 1, brand: "ACICORD P", composition: "Aceclofenac 100mg + Paracetamol 325mg", segment: "Orthopedic", packing: "1×10 Blister", mrp: "44.06" },
  { id: 2, brand: "ACICORD SP", composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", segment: "Orthopedic", packing: "1×10 Blister", mrp: "99.00" },
  { id: 3, brand: "ACICORD MR", composition: "Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "85.00" },
  { id: 4, brand: "ACICORD PLUS", composition: "Aceclofenac 100mg + Paracetamol 325mg + Trypchymotrypsin 1.5 Lac IU", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "160.00" },
  { id: 5, brand: "ACICORD TH8", composition: "Aceclofenac 100mg + Thiocolchicoside 8mg", segment: "Orthopedic", packing: "Upcoming", mrp: "-" },
  { id: 6, brand: "ACICORD TRIO 8", composition: "Aceclofenac 100mg + Paracetamol 325mg + Thiocolchicoside 8mg", segment: "Orthopedic", packing: "Upcoming", mrp: "-" },
  { id: 7, brand: "MAXZEN SP", composition: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "115.00" },
  { id: 8, brand: "BRUTOCLEN", composition: "Trypsin 48mg + Bromelain 90mg + Rutoside Trihydrate 100mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "220.00" },
  { id: 9, brand: "CLENMOXIB 2", composition: "Palmocoxib 2mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "225.00" },
  { id: 10, brand: "CLENCAL Tab", composition: "Calcium Citrate 1000mg + Vitamin D3 200 IU + Magnesium Hydroxide 100mg + Zinc Sulphate Mono Hydrate 4mg", segment: "Orthopedic", packing: "1×15 Blister", mrp: "192.18" },
  { id: 11, brand: "COXIZEN MR", composition: "Etoricoxib 60mg + Thiocolchicoside 4mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "243.75" },
  { id: 12, brand: "COXIZEN TP", composition: "Etoricoxib 60mg + Tolperisone 150mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "209.00" },
  { id: 13, brand: "CISCAL FRAC", composition: "Cissus Quandrigularis 500mg + Calcium Citrate Malate 500mg + L-Methylfolate 0.5mg + Methylcobalamin 750mcg + Moringa Oleifera 100mg + Pyridoxal 5 Phosphate 0.3mg + Vit D3 1000 IU", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "212.66" },
  { id: 14, brand: "CLEN-JOINT PLUS", composition: "Undenatured Collagen Peptide Type II 40mg + Rosehip 250mg + Sodium Hyaluronate 30mg + Chondroitin 200mg + Vit C 35mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "320.30" },
  { id: 15, brand: "FEBULIN 40", composition: "Febuxostat 40mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "148.00" },
  { id: 16, brand: "TOFACLEN 5", composition: "Tofacitinib 5mg", segment: "Orthopedic", packing: "1×10 Alu-Alu", mrp: "309.37" },

  // ═══════════════════════════════════════════
  // ANTIBIOTIC SEGMENT
  // ═══════════════════════════════════════════
  { id: 17, brand: "ARVACLAV 625", composition: "Amoxycillin 500mg + Potassium Clavulanate 125mg", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "195.50" },
  { id: 18, brand: "AZENAC 500", composition: "Azithromycin 500mg", segment: "Antibiotic", packing: "1×5 Blister", mrp: "126.73" },
  { id: 19, brand: "CEFUCORD 500", composition: "Cefuroxime 500mg", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "549.37" },
  { id: 20, brand: "CEFPOTEL 200", composition: "Cefpodoxime 200mg", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "206.25" },
  { id: 21, brand: "CEFPOTEL O", composition: "Cefpodoxime 200mg + Ofloxacin 200mg", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "253.12" },
  { id: 22, brand: "CEFPOTEL CV", composition: "Cefpodoxime 200mg + Potassium Clavulanate 125mg", segment: "Antibiotic", packing: "1×10 Strip", mrp: "299.06" },
  { id: 23, brand: "CEFICLEN 200 LB", composition: "Cefixime 200mg + Lactic Acid Bacillus Spores 60millions", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "164.06" },
  { id: 24, brand: "CEFICLEN O", composition: "Cefixime 200mg + Ofloxacin 200mg", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "150.00" },
  { id: 26, brand: "FARONAC 200", composition: "Faropenem 200mg", segment: "Antibiotic", packing: "Upcoming", mrp: "-" },
  { id: 27, brand: "RUDOX LB Caps", composition: "Doxycycline 100mg + Lactic Acid Caps", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "145.00" },
  { id: 28, brand: "ZENOCLAV 625 LB", composition: "Amoxycillin 500mg + Potassium Clavulanate 125mg + Lactic Acid Bacillus Spores 60millions", segment: "Antibiotic", packing: "1×10 Alu-Alu", mrp: "225.00" },

  // ═══════════════════════════════════════════
  // GASTRO SEGMENT
  // ═══════════════════════════════════════════
  { id: 29, brand: "DROTALIN M", composition: "Drotaverine 80mg + Mefenamic Acid 250mg", segment: "Gastro", packing: "1×10 Blister", mrp: "92.81" },
  { id: 30, brand: "ESOCLEN 40", composition: "Esomeprazole 40mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "95.00" },
  { id: 31, brand: "ESOCLEN DSR", composition: "Esomeprazole 40mg + Domperidone 30mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "117.18" },
  { id: 32, brand: "ESOMAX DSR", composition: "Esomeprazole 40mg + Domperidone 30mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "107.81" },
  { id: 33, brand: "LANSOCLEN MD", composition: "Lansoprazole 15mg MD Kid Tab", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "115.00" },
  { id: 34, brand: "RABOLIN DSR", composition: "Rabeprazole 20mg + Domperidone 30mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "105.00" },
  { id: 35, brand: "RABOLIN LSR", composition: "Rabeprazole 20mg + Levosulpride 75mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "184.68" },
  { id: 36, brand: "ROMPAN 40", composition: "Pantoprazole 40mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "70.31" },
  { id: 37, brand: "ROMPAN DSR", composition: "Pantoprazole 40mg + Domperidone 30mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "101.25" },
  { id: 38, brand: "ROMCHOLIC 300", composition: "Ursodeoxycholic Acid 300mg", segment: "Gastro", packing: "1×10 Alu-Alu", mrp: "410.00" },

  // ═══════════════════════════════════════════
  // RESPIRATORY SEGMENT
  // ═══════════════════════════════════════════
  { id: 39, brand: "BILAZEN 20", composition: "Bilastin 20mg", segment: "Respiratory", packing: "1×10 Alu-Alu", mrp: "154.00" },
  { id: 40, brand: "BILAZEN M", composition: "Bilastin 20mg + Montelukast 10mg", segment: "Respiratory", packing: "1×10 Alu-Alu", mrp: "135.93" },
  { id: 41, brand: "DANBRO 200 SR", composition: "Acebrophylline 200mg SR Tab", segment: "Respiratory", packing: "1×10 Alu-Alu", mrp: "285.00" },
  { id: 42, brand: "DANBRO ACE", composition: "N-Acetylcysteine 600mg + Acebrophylline 100mg", segment: "Respiratory", packing: "Upcoming", mrp: "-" },
  { id: 43, brand: "MONTRIL AL", composition: "Montelukast 10mg + Levocetirizine 5mg + Ambroxol 75mg", segment: "Respiratory", packing: "Upcoming", mrp: "-" },
  { id: 44, brand: "MONTRIL FX", composition: "Montelukast 10mg + Fexofenadine 120mg", segment: "Respiratory", packing: "1×10 Alu-Alu", mrp: "185.00" },
  { id: 45, brand: "MONTRIL LC", composition: "Montelukast 10mg + Levocetirizine 5mg", segment: "Respiratory", packing: "1×10 Alu-Alu", mrp: "145.31" },
  { id: 46, brand: "NANOLEVO 5", composition: "Levocetirizine 5mg", segment: "Respiratory", packing: "1×10 Blister", mrp: "35.00" },

  // ═══════════════════════════════════════════
  // MISC. SEGMENT
  // ═══════════════════════════════════════════
  { id: 47, brand: "AMITRON M", composition: "Amitriptyline 10mg + Methylcobalamin 1500mcg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "215.62" },
  { id: 48, brand: "MITHYTRON 10", composition: "Amitriptyline 10mg + Methylcobalamin 1500mcg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "230.00" },
  { id: 49, brand: "ARYXONE 250", composition: "Naproxen 250mg + Domperidone 10mg", segment: "Miscellaneous", packing: "1×10 Blister", mrp: "110.00" },
  { id: 50, brand: "ARYXONE 500", composition: "Naproxen 500mg + Domperidone 10mg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 52, brand: "CITICLEN P", composition: "Citicoline 500mg + Piracetam 800mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "670.00" },
  { id: 53, brand: "CLENFER XT Tab", composition: "Ferrous Ascorbate 100mg + Folic Acid 1.5mg + Zinc 22.5mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "98.43" },
  { id: 54, brand: "CLENFER PLUS", composition: "Ferrous Bisglycinate 60mg + Zinc Bisglycinate 15mg + Folic Acid 1mg + Methylcobalamin 500mcg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 56, brand: "FSP 10", composition: "Flunarizine 10mg + Propranolol 40mg", segment: "Miscellaneous", packing: "1×10 Blister", mrp: "79.00" },
  { id: 57, brand: "FLORACOX", composition: "Lactobacillus acidophilus 500million + Lactobacillus rhamnosus 1 Billion + Saccharomyces boulardii 30 Million + Bifidobacterium Lactis 275 million + Lactobacillus Longum 1 Billion + Clostridium butyricum 2 Million + Bacillus clausii spores 2 Billion + Fructooligosaccharides 100mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "151.26" },
  { id: 58, brand: "FLAZA 6", composition: "Deflazacort 6mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "121.87" },
  { id: 59, brand: "FLUMIREX M", composition: "Flupentixol + Melitracen", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "110.00" },
  { id: 60, brand: "GABITAZ M", composition: "Gabapentin 300mg + Methylcobalamin 500mcg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 61, brand: "GABITAZ 100NT", composition: "Gabapentin 100mg + Nortriptyline 10mg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 62, brand: "GABITAZ 400NT", composition: "Gabapentin 400mg + Nortriptyline 10mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "255.00" },
  { id: 63, brand: "ITROPRIT 100", composition: "Itraconazole 100mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "178.00" },
  { id: 64, brand: "ITROPRIT 200", composition: "Itraconazole 200mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "252.00" },
  { id: 65, brand: "LEVETAZ 500", composition: "Levetiracetam 500mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "138.70" },
  { id: 66, brand: "MYOTIS FORTE", composition: "Myo-Inositol 550mg + D-Chiro Inositol 13.8mg + Metformin 500mg + L-Methyl Folate Calcium 0.5mg + Methylcobalamin 750mcg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 67, brand: "NEUROCLEN LC", composition: "Levo-carnitine 500mg + Methylcobalamin 1500mcg + Folic Acid 1.5mg", segment: "Miscellaneous", packing: "Upcoming", mrp: "-" },
  { id: 68, brand: "NEUROZEN M", composition: "Pregabalin 75mg (SR) + Methylcobalamin 750mcg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "210.00" },
  { id: 69, brand: "NEUROZEN NT", composition: "Pregabalin 75mg (SR) + Nortriptyline 10mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "217.00" },
  { id: 70, brand: "NEUROZEN GOLD", composition: "Pregabalin 75mg (SR) + Methylcobalamin 1500mcg + Nortriptyline 10mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "249.48" },
  { id: 71, brand: "PREDNILONE 8", composition: "Methylprednisolone 8mg", segment: "Miscellaneous", packing: "1×10 Alu-Alu", mrp: "59.00" },
  { id: 72, brand: "L-ARGITIS PLUS Sachet", composition: "L-Arginine 3gm + DHA 10% 200mg + Proanthocyanidin 75mg + Cyanocobalamin 2.2mcg + Vitamin B6 2mg + Folic Acid 300mcg", segment: "Miscellaneous", packing: "10×5gm Sachet", mrp: "69.00" },

  // ═══════════════════════════════════════════
  // SOFT GELATIN SEGMENT
  // ═══════════════════════════════════════════
  { id: 73, brand: "CALAZEN D3 CAPS", composition: "Cholecalciferol 60000 IU", segment: "Soft Gelatin", packing: "1×4 Blister", mrp: "117.00" },
  { id: 74, brand: "CLENCAL K2-7", composition: "Calcium Calcitriol 0.25mcg + Calcium Carbonate 250mg + Vit. K2-7 45mcg + Methylcobalamin 750mcg + Elemental Magnesium 50mg + Elemental Boron 1.5mg + Elemental Zinc 7.5mg", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "235.00" },
  { id: 75, brand: "CLENCAL D3 MAX", composition: "Calcitriol 0.25mcg + Calcium Carbonate 500mg + Omega-3 fatty acid 300mg + Methylcobalamin 1500mcg + Folic Acid 400mcg + Boron 1.5mg", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "254.06" },
  { id: 76, brand: "IMMUZEN GOLD", composition: "Methylcobalamin 1500mcg + ALA 100mg + Pyridoxine 3mg + Folic Acid 1.5mg + Vit D3 1000 IU", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "268.00" },
  { id: 77, brand: "LYCORIN FORTE", composition: "Calcium Calcitriol 0.25mcg + Calcium Citrate Malate 500mg + Vit. K2-7 45mcg + Methylcobalamin 1500mcg + Zinc Oxide 7.5mg + Magnesium Oxide 20mg + L-Methyl Folate 800mcg", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "247.00" },
  { id: 78, brand: "LYCORIN Z", composition: "Methylcobalamin 5000mcg + Vit. A 2500 I.U. + Vit. C 50mg + Vit. E 10 I.U. + Sodium Selenate 70mcg + Zinc Sulphate Monohydrate 27.45mcg + Lycopene 6% 7.5mg", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "142.36" },
  { id: 79, brand: "NUROCLEN FORTE", composition: "Methylcobalamin 1500mcg + L-MethylFolate 1mg + Pyridoxal 5 Phosphate 0.5mg + DHA 40% 200mg + Vitamin D3 2000 IU", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "200.00" },
  { id: 80, brand: "RELIPRIX CAPS", composition: "Lycopene + Vit. A + Vit. C + Vit E + Zinc Sulphate + L-Glutamic Acid", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "177.00" },
  { id: 81, brand: "SUPER Q10", composition: "CoEnzyme Q10 + Omega 3 Fatty Acid (EPA & DHA) + Green Tea Extract + L-Carnitine + Lycopene + Cyanocobalamin + Biotin + Vit.B1 + Vit.B2 + Zinc Capsule", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "569.60" },
  { id: 82, brand: "ZYNOPLEX G", composition: "Ginseng With Multivitamin And Multimineral Soft Gel Capsules", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "155.71" },
  { id: 83, brand: "ZYNOPLEX 12G", composition: "12G Formula (SoftGel in Drug)", segment: "Soft Gelatin", packing: "1×10 Blister", mrp: "233.43" },

  // ═══════════════════════════════════════════
  // LIQUID SEGMENT (Syrup / Dry Syrup / Suspension)
  // ═══════════════════════════════════════════
  { id: 84, brand: "ANTAZEN", composition: "Aluminium Hydroxide 291mg + Magnesium Hydroxide 98mg + Oxetacaine 10mg", segment: "Liquid", packing: "200ml CTN", mrp: "206.25" },
  { id: 85, brand: "ALKAPRIX", composition: "Disodium Hydrogen Citrate IP 1.4gm", segment: "Liquid", packing: "100ml Label", mrp: "102.18" },
  { id: 86, brand: "CLENFATE SYP", composition: "Sodium Alginate 250mg + Sodium Bicarbonate 133.5mg + Calcium Carbonate 80mg", segment: "Liquid", packing: "150ml CTN", mrp: "151.00" },
  { id: 87, brand: "CLENDOM O", composition: "Magaldrate 540mg + Simethicone 20mg + Oxetacaine 10mg", segment: "Liquid", packing: "170ml Label", mrp: "175.00" },
  { id: 88, brand: "CLENFER XT Syp", composition: "Ferric Ammonium Citrate 110mg + Folic Acid 150mcg + Cyanocobalamin 7.5mcg + Zinc Sulphate 10mg + Sorbitol Solution 70%", segment: "Liquid", packing: "200ml CTN", mrp: "149.00" },
  { id: 89, brand: "CALAZEN D3 NANO", composition: "Vitamin D3 oral Solution 60000 IU", segment: "Liquid", packing: "4×5ml CTN", mrp: "75.00" },
  { id: 90, brand: "CLENZYME SYP", composition: "Digestive Enzyme Syrup", segment: "Liquid", packing: "200ml CTN", mrp: "133.47" },
  { id: 91, brand: "CLENCOF DX SYP", composition: "Dextromethorphan 10mg + Phenylephrine 5mg + CPM 2mg", segment: "Liquid", packing: "100ML Label", mrp: "96.56" },
  { id: 92, brand: "CLENCOF LS", composition: "Ambroxol 30mg + Guaiphenesin 50mg + Levosalbutamol 1mg", segment: "Liquid", packing: "100ML CTN", mrp: "110.62" },
  { id: 93, brand: "VELTIZEN LS", composition: "Ambroxol 30mg + Guaiphenesin 50mg + Levosalbutamol 1mg", segment: "Liquid", packing: "100ML CTN", mrp: "140.00" },
  { id: 94, brand: "CYPROLIN", composition: "Cyproheptadine 2mg + Tri-Choline Citrate 65%-275mg", segment: "Liquid", packing: "200ml CTN", mrp: "160.00" },
  { id: 95, brand: "INDICOLD", composition: "Paracetamol 250mg + CPM 2mg + Phenylephrine 5mg", segment: "Liquid", packing: "60ml CTN", mrp: "49.50" },
  { id: 96, brand: "MASLAX Syp", composition: "Sodium Picosulfate 3.33mg + Liquid Paraffin 1.25ml + Milk Of Magnesia 3.75ml", segment: "Liquid", packing: "170ml Label", mrp: "168.75" },
  { id: 97, brand: "MEFACLEN", composition: "Mefenamic Acid 100mg + Paracetamol 250mg", segment: "Liquid", packing: "60ml CTN", mrp: "60.00" },
  { id: 98, brand: "MONTRIL LC Syp", composition: "Montelukast 4mg + Levocetirizine 2.5mg", segment: "Liquid", packing: "60ml CTN", mrp: "98.00" },
  { id: 99, brand: "RELIPRIX SYP", composition: "Lycopene + Multivitamin Syrup", segment: "Liquid", packing: "200ml CTN", mrp: "160.00" },
  { id: 100, brand: "SUKROHEAL O", composition: "Sucralfate 1000mg + Oxetacaine 20mg", segment: "Liquid", packing: "200ml CTN", mrp: "274.00" },

  // ═══════════════════════════════════════════
  // DRY SYRUP
  // ═══════════════════════════════════════════
  { id: 101, brand: "CEFPOTEL 50 DS", composition: "Cefpodoxime 50mg", segment: "Dry Syrup", packing: "Upcoming", mrp: "-" },
  { id: 102, brand: "CEFPOTEL 100 DS", composition: "Cefpodoxime 100mg", segment: "Dry Syrup", packing: "Upcoming", mrp: "-" },
  { id: 103, brand: "CEFPOTEL 50CV DS", composition: "Cefpodoxime 50mg + Clavulanic Acid 31.25mg", segment: "Dry Syrup", packing: "Upcoming", mrp: "-" },
  { id: 104, brand: "CEFPOTEL 100CV DS", composition: "Cefpodoxime 100mg + Clavulanic Acid 62.50mg", segment: "Dry Syrup", packing: "Upcoming", mrp: "-" },
  { id: 105, brand: "ZENOCLAV 457 DS", composition: "Amoxycillin 400mg + Clavulanic Acid 57mg", segment: "Dry Syrup", packing: "Upcoming", mrp: "-" },

  // ═══════════════════════════════════════════
  // OINTMENT SEGMENT
  // ═══════════════════════════════════════════
  { id: 106, brand: "CLOBICIN O", composition: "Itraconazole 1% w/w + Ofloxacin IP 0.75% + Ornidazole IP 2% w/w + Clobetasol Propionate IP 0.05% + Methyl Paraben IP 0.2% w/w + Propyl Paraben 0.02% w/w", segment: "Ointment", packing: "15gm CTN", mrp: "99.00" },
  { id: 107, brand: "DICLOCIN", composition: "Linseed Oil 3% + Diclofenac Diethylamine 1.16% + Methyl Salicylate 10% + Menthol Bold Crystal 5% + Benzyl Alcohol 1%", segment: "Ointment", packing: "30gm CTN", mrp: "108.90" },
  { id: 108, brand: "LULIMOX 15gm", composition: "Luliconazole 1%", segment: "Ointment", packing: "15gm CTN", mrp: "165.00" },
  { id: 109, brand: "LULIMOX 30gm", composition: "Luliconazole 1%", segment: "Ointment", packing: "30gm CTN", mrp: "330.00" },
  { id: 110, brand: "MUPIBAC", composition: "Mupirocin 2% w/w", segment: "Ointment", packing: "5GM CTN", mrp: "105.93" },

  // ═══════════════════════════════════════════
  // INJECTION SEGMENT
  // ═══════════════════════════════════════════
  { id: 111, brand: "CLENTAZ", composition: "Ceftriaxone 250mg + Tazobactam 31.25mg", segment: "Injection", packing: "Vial", mrp: "90.00" },
  { id: 112, brand: "CEFOCLEN S 1.5gm", composition: "Cefoperazone 1gm + Sulbactam 500mg", segment: "Injection", packing: "Vial", mrp: "299.26" },
  { id: 113, brand: "MEROSHUT 1GM", composition: "Meropenem 1gm", segment: "Injection", packing: "Vial", mrp: "1017.75" },
  { id: 114, brand: "ROMPAN 40 Inj", composition: "Pantoprazole 40mg Injection", segment: "Injection", packing: "Vial", mrp: "57.48" },

  // ═══════════════════════════════════════════
  // CARDIO AND DIABETIC SEGMENT
  // ═══════════════════════════════════════════
  { id: 115, brand: "FORTEMET SR 500", composition: "Metformin 500mg (SR)", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "21.00" },
  { id: 116, brand: "GLIMETAZ MF1", composition: "Glimepiride 1mg + Metformin 500mg (SR)", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "84.37" },
  { id: 117, brand: "GLIMETAZ MF2", composition: "Glimepiride 2mg + Metformin 500mg (SR)", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "95.62" },
  { id: 118, brand: "GLIMETAZ M FORTE 1", composition: "Glimepiride 1mg + Metformin 1000mg (SR)", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "100.00" },
  { id: 119, brand: "GLIMETAZ M FORTE 2", composition: "Glimepiride 2mg + Metformin 1000mg (SR)", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "110.00" },
  { id: 120, brand: "GLIMETAZ VG1", composition: "Glimepiride 1mg + Metformin 500mg (SR) + Voglibose 0.2mg", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "105.00" },
  { id: 121, brand: "GLIMETAZ VG2", composition: "Glimepiride 2mg + Metformin 500mg (SR) + Voglibose 0.2mg", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "155.00" },
  { id: 122, brand: "GLIMETAZ PG1", composition: "Glimepiride 1mg + Metformin 500mg (SR) + Pioglitazone 15mg", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "75.00" },
  { id: 123, brand: "GLIMETAZ PG2", composition: "Glimepiride 2mg + Metformin 500mg (SR) + Pioglitazone 15mg", segment: "Cardio & Diabetic", packing: "1×10 Blister", mrp: "98.43" },
  { id: 124, brand: "RANOCLEN 500", composition: "Ranolazine 500mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "179.00" },
  { id: 125, brand: "ROSUCLEN 10", composition: "Rosuvastatin 10mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "192.00" },
  { id: 126, brand: "ROSUCLEN F", composition: "Rosuvastatin 20mg + Fenofibrate 160mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "230.00" },
  { id: 127, brand: "ROSUCLEN GOLD 10", composition: "Rosuvastatin 10mg + Clopidogrel 75mg + Aspirin 75mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "160.00" },
  { id: 128, brand: "ROSUCLEN GOLD 20", composition: "Rosuvastatin 20mg + Clopidogrel 75mg + Aspirin 75mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "245.00" },
  { id: 129, brand: "TICACLEN 90", composition: "Ticagrelor 90mg", segment: "Cardio & Diabetic", packing: "1×14 Blister", mrp: "499.00" },
  { id: 130, brand: "TELCOZEN 40", composition: "Telmisartan 40mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "67.80" },
  { id: 131, brand: "TELCOZEN H", composition: "Telmisartan 40mg + Hydrochlorothiazide 12.5mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "85.00" },
  { id: 132, brand: "TELCOZEN CH", composition: "Telmisartan 40mg + Chlorthalidone 12.5mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "115.00" },
  { id: 133, brand: "TELCOZEN AM", composition: "Telmisartan 40mg + Amlodipine 5mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "118.50" },
  { id: 134, brand: "TELCOZEN 40 CL", composition: "Telmisartan 40mg + Cilnidipine 10mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "103.12" },
  { id: 135, brand: "TELCOZEN AMH", composition: "Telmisartan 40mg + Amlodipine 5mg + Hydrochlorothiazide 12.5mg", segment: "Cardio & Diabetic", packing: "1×10 Alu-Alu", mrp: "98.43" },
];

const SUPABASE_URL = 'https://zikexvdxeuollfvaofqk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Z3RNDp4A8Vg5RB56fLwT9w_1wkSWahx';

let clentisMedicinesCache = [];
let clentisPresetsCache = [];
let clentisSupabase = null;
let clentisUsingSupabase = false;

function normalizeMedicine(row) {
  return {
    id: Number(row.id),
    brand: row.brand,
    composition: row.composition,
    segment: row.segment,
    packing: row.packing || '-',
    mrp: row.mrp || '-'
  };
}

function normalizePreset(row) {
  return {
    id: Number(row.id),
    doctorName: row.doctor_name || row.doctorName,
    medicineIds: row.medicine_ids || row.medicineIds || [],
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt
  };
}

function initLocalMedicines() {
  const stored = localStorage.getItem('clentis_medicines');
  if (!stored) {
    localStorage.setItem('clentis_medicines', JSON.stringify(DEFAULT_MEDICINES));
  }
  clentisMedicinesCache = JSON.parse(localStorage.getItem('clentis_medicines')) || [];
  clentisPresetsCache = JSON.parse(localStorage.getItem('clentis_presets') || '[]');
}

async function initClentisData() {
  initLocalMedicines();

  if (!window.supabase) {
    console.warn('Supabase library not loaded. Using browser storage fallback.');
    return false;
  }

  try {
    clentisSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

    const { data: medicines, error: medicinesError } = await clentisSupabase
      .from('medicines')
      .select('*')
      .order('id', { ascending: true });

    if (medicinesError) throw medicinesError;

    if (!medicines || medicines.length === 0) {
      const rows = DEFAULT_MEDICINES.map(m => ({
        id: m.id,
        brand: m.brand,
        composition: m.composition,
        segment: m.segment,
        packing: m.packing || '-',
        mrp: m.mrp || '-'
      }));
      const { error: seedError } = await clentisSupabase.from('medicines').upsert(rows, { onConflict: 'id' });
      if (seedError) throw seedError;
      clentisMedicinesCache = [...DEFAULT_MEDICINES];
    } else {
      clentisMedicinesCache = medicines.map(normalizeMedicine);
    }

    const { data: presets, error: presetsError } = await clentisSupabase
      .from('presets')
      .select('*')
      .order('updated_at', { ascending: false });

    if (presetsError) throw presetsError;

    clentisPresetsCache = (presets || []).map(normalizePreset);
    clentisUsingSupabase = true;
    localStorage.setItem('clentis_medicines', JSON.stringify(clentisMedicinesCache));
    localStorage.setItem('clentis_presets', JSON.stringify(clentisPresetsCache));
    return true;
  } catch (error) {
    console.error('Supabase sync failed. Using browser storage fallback.', error);
    clentisUsingSupabase = false;
    return false;
  }
}

function initMedicines() {
  initLocalMedicines();
}

function getMedicines() {
  return clentisMedicinesCache.length ? clentisMedicinesCache : DEFAULT_MEDICINES;
}

async function saveMedicines(medicines) {
  clentisMedicinesCache = [...medicines].sort((a, b) => a.id - b.id);
  localStorage.setItem('clentis_medicines', JSON.stringify(clentisMedicinesCache));

  if (!clentisUsingSupabase || !clentisSupabase) return;

  const rows = clentisMedicinesCache.map(m => ({
    id: m.id,
    brand: m.brand,
    composition: m.composition,
    segment: m.segment,
    packing: m.packing || '-',
    mrp: m.mrp || '-'
  }));

  const { error } = await clentisSupabase.from('medicines').upsert(rows, { onConflict: 'id' });
  if (error) throw error;
}

async function deleteMedicineById(id) {
  clentisMedicinesCache = clentisMedicinesCache.filter(m => m.id !== id);
  localStorage.setItem('clentis_medicines', JSON.stringify(clentisMedicinesCache));

  if (!clentisUsingSupabase || !clentisSupabase) return;

  const { error } = await clentisSupabase.from('medicines').delete().eq('id', id);
  if (error) throw error;
}

async function resetMedicinesToDefault() {
  clentisMedicinesCache = [...DEFAULT_MEDICINES];
  localStorage.setItem('clentis_medicines', JSON.stringify(clentisMedicinesCache));

  if (!clentisUsingSupabase || !clentisSupabase) return;

  const { error: deleteError } = await clentisSupabase.from('medicines').delete().gte('id', 0);
  if (deleteError) throw deleteError;
  await saveMedicines(clentisMedicinesCache);
}

function getNextId() {
  const medicines = getMedicines();
  return medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
}

function getPresets() {
  return clentisPresetsCache;
}

async function savePresets(presets) {
  clentisPresetsCache = [...presets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  localStorage.setItem('clentis_presets', JSON.stringify(clentisPresetsCache));

  if (!clentisUsingSupabase || !clentisSupabase) return;

  const rows = clentisPresetsCache.map(p => ({
    id: p.id,
    doctor_name: p.doctorName,
    medicine_ids: p.medicineIds,
    created_at: p.createdAt,
    updated_at: p.updatedAt
  }));

  const { error } = await clentisSupabase.from('presets').upsert(rows, { onConflict: 'id' });
  if (error) throw error;
}

async function deletePresetById(id) {
  clentisPresetsCache = clentisPresetsCache.filter(p => p.id !== id);
  localStorage.setItem('clentis_presets', JSON.stringify(clentisPresetsCache));

  if (!clentisUsingSupabase || !clentisSupabase) return;

  const { error } = await clentisSupabase.from('presets').delete().eq('id', id);
  if (error) throw error;
}
