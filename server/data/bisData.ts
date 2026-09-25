import { BISStandard, BISScheme, BISLaboratory, BISCitation } from '../../src/types/bis.js';

export const BIS_STANDARDS: BISStandard[] = [
  {
    id: 'is-302-2-21',
    standardNumber: 'IS 302-2-21:2018',
    title: 'Safety of Household and Similar Electrical Appliances — Part 2-21: Particular Requirements for Stationary Storage Water Heaters',
    year: 2018,
    edition: 'Second Revision',
    status: 'Current',
    category: 'Electrical & Electronics',
    scope: 'Deals with the safety of electric stationary storage water heaters for household and similar purposes, intended for heating water below boiling temperature, rated voltage not exceeding 250 V for single-phase appliances and 480 V for other appliances. Covers electric geysers, unvented/vented water heaters, and thermal storage tanks.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Electrical Appliances (Quality Control) Order, 2023',
      ministry: 'Ministry of Heavy Industries & Ministry of Consumer Affairs, Food & Public Distribution',
      effectiveDate: '2023-09-05',
      gazetteRef: 'S.O. 3925(E), The Gazette of India'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['electric water heater', 'geyser', 'storage water heater', 'household appliance', 'heating element', 'thermostat', 'pressure relief valve', 'electrical safety', 'leakage current', 'dielectric strength'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4',
        title: 'General Requirements & Classification',
        pageNumber: 8,
        content: 'Appliances shall be constructed so that in normal use they function safely so as to cause no danger to persons or surroundings, even in case of carelessness.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7',
        title: 'Marking and Instructions',
        pageNumber: 12,
        content: 'Appliances shall be marked with rated voltage (V), rated power input (W), rated capacity in litres, rated pressure in megapascals (MPa), water resistance degree (IPX4 minimum for bathroom geysers), and the BIS Standard Mark (ISI).',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 13',
        title: 'Electric Strength and Leakage Current at Operating Temperature',
        pageNumber: 21,
        content: 'At operating temperature, the leakage current shall not exceed 0.75 mA for Class I portable appliances and 1.0 mA or 1 mA/kW for stationary appliances. The insulation is subjected to test voltage of 1000 V to 1250 V for 1 minute.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 19',
        title: 'Abnormal Operation & Dry-Heating Protection',
        pageNumber: 29,
        content: 'Appliance is operated without water (dry test). The thermal cut-out must trip safely without flame, emission of molten metal, or toxic gas, and prevent tank rupture.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 22.101',
        title: 'Pressure Relief and Vacuum Protection',
        pageNumber: 36,
        content: 'Closed storage water heaters must be fitted with a pressure-relief valve set to operate at a pressure not exceeding rated pressure. Must endure hydrostatic test pressure at 1.5 times rated pressure without leakage.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Hydrostatic Pressure Test (1.5x Rated Pressure without tank deformation)',
      'Leakage Current and Dielectric Strength Test at Operating Temperature',
      'Abnormal Dry-Heating Operation (Thermal cut-out actuation test)',
      'Resistance to Moisture & Water Ingress (IPX4 spray test)',
      'Standing Loss / Thermal Energy Efficiency test (as per BEE/IS 2082)',
      'Corrosion Resistance of Inner Tank and Sacrificial Magnesium Anode inspection'
    ],
    requiredDocuments: [
      'Factory layout and manufacturing machinery details (forming, welding, polyurethane foaming)',
      'In-house laboratory test equipment list (high voltage tester, pressure bench, leakage tester)',
      'Calibration certificates for pressure gauges, multimeters, and temperature sensors',
      'Test report from a BIS-recognized laboratory for prototype approval',
      'Quality Control Plan (Scheme of Inspection and Testing - SIT acceptance)',
      'Declaration of raw materials (CRCA steel, SS304/316L, enamel coating specifications)'
    ],
    relatedStandards: ['IS 302-1:2024', 'IS 2082:2018', 'IS 368:2014', 'IS 4159:2002'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/302-2-21',
    lastUpdated: '2024-04-15'
  },
  {
    id: 'is-302-1',
    standardNumber: 'IS 302-1:2024',
    title: 'Safety of Household and Similar Electrical Appliances — Part 1: General Requirements',
    year: 2024,
    edition: 'Seventh Revision',
    status: 'Current',
    category: 'Electrical & Electronics',
    scope: 'General requirements for the safety of electrical appliances for household and similar purposes, their rated voltage being not more than 250 V for single-phase and 480 V for other appliances. Serves as the master foundational safety standard for all Part 2 series appliances.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Omnibus Electrical Appliances (Quality Control) Order, 2024',
      ministry: 'Ministry of Heavy Industries',
      effectiveDate: '2024-03-01',
      gazetteRef: 'S.O. 1124(E)'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['household appliances', 'general electrical safety', 'insulation', 'earthing', 'heating', 'creepage distances', 'clearance', 'fire resistance'],
    keyClauses: [
      {
        clauseNumber: 'Clause 8',
        title: 'Protection against Access to Live Parts',
        pageNumber: 15,
        content: 'Appliances shall be constructed and enclosed so that there is adequate protection against accidental contact with live parts using test probe B of IS 1401.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 11',
        title: 'Heating Test',
        pageNumber: 22,
        content: 'During normal use, appliances and their surroundings shall not attain excessive temperature. Thermocouple measurements on cords, switches, and insulation.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 27',
        title: 'Provision for Earthing',
        pageNumber: 48,
        content: 'Accessible metal parts of Class I appliances that may become live in event of insulation failure shall be permanently and reliably connected to an earthing terminal with resistance < 0.1 ohm.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 30',
        title: 'Resistance to Heat and Fire',
        pageNumber: 55,
        content: 'External parts of non-metallic material and insulating materials supporting electrical connections shall be resistant to ignition and spread of fire (Glow-wire test at 750°C/850°C and ball pressure test).',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Earth continuity test (< 0.1 Ω at 25 A current)',
      'Glow-wire flammability test for polymeric enclosures (IS 11000)',
      'Moisture resistance (humidity chamber 93% RH for 48 hours)',
      'Mechanical strength (spring-operated impact hammer test 0.5 J)'
    ],
    requiredDocuments: [
      'Circuit schematic diagram and bill of materials (critical components list)',
      'Component conformity certificates (ISI marked plugs, cords, switches)',
      'Factory quality manual and test personnel competency records'
    ],
    relatedStandards: ['IS 302-2-21:2018', 'IS 302-2-3:2021', 'IS 302-2-14:2020', 'IS 302-2-30:2022'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/302-1',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'is-17526',
    standardNumber: 'IS 17526:2021',
    title: 'Stainless Steel Vacuum Flasks / Insulated Containers — Specification',
    year: 2021,
    edition: 'First Edition',
    status: 'Current',
    category: 'Consumer & Toys',
    scope: 'Covers requirements for vacuum insulated stainless steel flasks, double-walled bottles, thermal carafes, and insulated water containers intended for storage of hot and cold beverages. Specifies food-contact grade material requirements, thermal retention, drop resistance, stopper leakage, and corrosion testing.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Cookware, Utensils and Insulated Flasks (Quality Control) Order, 2023',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      effectiveDate: '2024-09-01',
      gazetteRef: 'S.O. 3629(E), DPIIT Notification'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['stainless steel bottle', 'vacuum flask', 'insulated bottle', 'water container', 'thermal insulation', 'food grade', 'SS 304', 'leak proof', 'hot and cold'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4.1',
        title: 'Material Requirements',
        pageNumber: 3,
        content: 'Inner container and all metal parts in contact with beverage shall be manufactured from austenitic stainless steel grades SS 304 (Grade X04Cr19Ni9 or Grade X07Cr18Ni9) conforming to IS 6911. Gaskets and seals shall be food grade silicone or polypropylene conforming to IS 9845.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5.2',
        title: 'Thermal Performance / Temperature Retention',
        pageNumber: 5,
        content: 'When filled with boiling water at 95°C and kept in ambient temperature of 20°C ± 2°C, the water temperature after 6 hours shall not be less than 70°C for flasks > 0.5 L capacity, and after 24 hours not less than 45°C.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5.4',
        title: 'Leakage Test',
        pageNumber: 6,
        content: 'The flask shall be filled with water to 90% of capacity at 80°C, stopper tightened, inverted or placed horizontally for 15 minutes. There shall be no sign of liquid leakage or weeping.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5.5',
        title: 'Impact and Drop Resistance Test',
        pageNumber: 7,
        content: 'Filled with cold water to rated capacity, dropped from a height of 1.2 metres onto a concrete floor onto base and side. The vacuum insulation shall remain intact and no rupture or leakage.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 8',
        title: 'Marking and BIS Standard Mark',
        pageNumber: 8,
        content: 'Each flask shall be indelibly stamped or laser etched with manufacturer name, nominal capacity, grade of stainless steel, country of origin, and BIS Standard Mark with CM/L licence number.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Chemical Composition of Stainless Steel (Spectrometer test for Cr 17.5-19.5%, Ni 8.0-10.5%)',
      'Thermal Performance retention test (6 hours and 24 hours)',
      'Leakage test under inverted orientation with hot liquid',
      'Overall migration test for plastic stoppers and silicone gaskets as per IS 9845',
      'Corrosion resistance test (5% NaCl boiling salt solution immersion for 24 hours)'
    ],
    requiredDocuments: [
      'Mill test certificate (MTC) of raw stainless steel coils/sheets confirming IS 6911 grade SS304',
      'Food grade compliance certificates for polymer caps, stoppers, and food-grade silicone seals',
      'Laser marking machine and hydraulic deep drawing / vacuum pumping machine verification',
      'Spectrometer or wet chemical analysis facility setup details'
    ],
    relatedStandards: ['IS 6911:2017', 'IS 14756:2022', 'IS 9845:1998', 'IS 10146:1982'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/17526',
    lastUpdated: '2024-06-01'
  },
  {
    id: 'is-14756',
    standardNumber: 'IS 14756:2022',
    title: 'Stainless Steel Cookware and Utensils — Specification',
    year: 2022,
    edition: 'Third Revision',
    status: 'Current',
    category: 'Mechanical & Metal',
    scope: 'Prescribes the requirements for stainless steel cookware, including saucepans, frying pans, boiling pans, casseroles, handis, thalis, and food storage containers. Specifies grade of stainless steel, base thickness, thermal conductivity base attachments (sandwich bottom), handle attachment strength, and resistance to staining.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Cookware and Utensils (Quality Control) Order, 2023',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      effectiveDate: '2024-09-01',
      gazetteRef: 'S.O. 3629(E)'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['cookware', 'stainless steel utensils', 'pots', 'pans', 'sandwich bottom', 'food safety', 'handle fatigue', 'staining resistance'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4',
        title: 'Material of Construction',
        pageNumber: 3,
        content: 'Body and lid shall be made from stainless steel grade SS 304 or austenitic grades conforming to IS 6911. Minimum base thickness specified based on diameter.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 6.3',
        title: 'Handle Attachment Strength & Thermal Insulation',
        pageNumber: 7,
        content: 'Handles shall withstand bending moment and fatigue cycle test without loosening, and handle temperature during cooking shall not exceed 55°C for plastics or 65°C for metals.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7.1',
        title: 'Resistance to Staining & Burning',
        pageNumber: 9,
        content: 'Cookware subjected to food acid simulant test (citric acid and vinegar boil) without pitting, tarnishing, or discoloration.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Spectrographic material composition verification (Cr & Ni percentages)',
      'Handle fatigue test (15,000 cycles with weighted load)',
      'Thermal shock resistance test (heating to 200°C and quenching in water)',
      'Pitting and acid corrosion resistance test'
    ],
    requiredDocuments: [
      'Raw material purchase invoices and MTCs',
      'Drawings showing cookware profile, dimensions, and handle fixing rivets/welds',
      'Routine testing logbook and gauge calibration records'
    ],
    relatedStandards: ['IS 6911:2017', 'IS 17526:2021', 'IS 2347:2017'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/14756',
    lastUpdated: '2024-02-15'
  },
  {
    id: 'is-2347',
    standardNumber: 'IS 2347:2017',
    title: 'Domestic Pressure Cookers — Specification',
    year: 2017,
    edition: 'Fifth Revision',
    status: 'Current',
    category: 'Mechanical & Metal',
    scope: 'Covers requirements for domestic pressure cookers manufactured from aluminium alloys or stainless steel with internal working pressure up to 100 kPa (1 bar). Details mandatory safety valves, metallic safety plugs, gasket release systems (GRS), burst pressure testing, and drop tests.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Domestic Pressure Cooker (Quality Control) Order, 2020',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      effectiveDate: '2021-02-01',
      gazetteRef: 'S.O. 297(E)'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['pressure cooker', 'safety valve', 'gasket release system', 'burst pressure', 'working pressure', 'domestic kitchen', 'whistle vent weight'],
    keyClauses: [
      {
        clauseNumber: 'Clause 5.1',
        title: 'Operating Pressure & Vent Weight',
        pageNumber: 4,
        content: 'Normal working pressure shall be 100 kPa ± 10 kPa. Weight valve shall reliably vent excess steam without sticking.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5.3',
        title: 'Secondary Safety Device (Safety Valve/Fusible Plug)',
        pageNumber: 6,
        content: 'Secondary safety device must operate between 130 kPa and 200 kPa if the primary vent tube is blocked.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 6.4',
        title: 'Hydrostatic Burst Pressure Test',
        pageNumber: 9,
        content: 'Body and lid assembly shall withstand hydrostatic pressure of not less than 3 times operating pressure (300 kPa) without rupture or violent opening.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Hydrostatic proof pressure test (200 kPa for 1 minute)',
      'Burst pressure test (> 300 kPa)',
      'Operating pressure verification and steam venting cycle test',
      'Safety plug fusion test and GRS gasket release actuation',
      'Drop test of assembled cooker from 1.0 m'
    ],
    requiredDocuments: [
      'Pressure vessel design calculation sheet and safety margin verification',
      'Material test reports for aluminium alloy IS 21 or stainless steel IS 6911',
      'Safety valve calibration test rig calibration data'
    ],
    relatedStandards: ['IS 21:1992', 'IS 6911:2017', 'IS 7466:1994'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/2347',
    lastUpdated: '2023-11-20'
  },
  {
    id: 'is-16102-1',
    standardNumber: 'IS 16102 (Part 1):2012',
    title: 'Self-Ballasted LED Lamps for General Lighting Services — Part 1: Safety Requirements',
    year: 2012,
    edition: 'First Edition (RA 2017)',
    status: 'Current',
    category: 'Electrical & Electronics',
    scope: 'Specifies the safety and interchangeability requirements for self-ballasted LED lamps for general lighting services having a rated wattage up to 60 W, rated voltage > 50 V up to 250 V, with B22d, E27 or GU10 caps.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Electronics and Information Technology Goods (Compulsory Registration) Order',
      ministry: 'Ministry of Electronics and Information Technology (MeitY)',
      effectiveDate: '2015-05-07',
      gazetteRef: 'MeitY S.O. 2905(E)'
    },
    scheme: 'Scheme II (CRS - Electronics)',
    keywords: ['led bulb', 'self ballasted led lamp', 'b22d', 'e27', 'lighting safety', 'creepage', 'insulation resistance', 'photobiological safety'],
    keyClauses: [
      {
        clauseNumber: 'Clause 6',
        title: 'Interchangeability and Lamp Caps',
        pageNumber: 5,
        content: 'Lamp caps shall comply with dimensional gauges for B22d or E27 as per IS 9249 / IEC 60061.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 8',
        title: 'Insulation Resistance and Electric Strength after Humidity',
        pageNumber: 7,
        content: 'Insulation resistance between live parts and accessible parts shall be > 4 MΩ after 48h humidity treatment, and withstand 4000 V AC flash test.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 12',
        title: 'Fault Conditions Test',
        pageNumber: 11,
        content: 'Components (capacitors, diodes) short-circuited one at a time. The lamp must not catch fire, emit flammable gas, or expose live parts.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Cap torque and mechanical strength test (3.0 Nm torque for B22d)',
      'Electric strength flash test (4 kV)',
      'Fault condition simulation test',
      'Creepage distance and clearance measurement (> 6.3 mm for reinforced insulation)',
      'Photobiological safety as per IS 16108 (Blue light hazard evaluation)'
    ],
    requiredDocuments: [
      'Test report from MeitY/BIS recognized test lab (CRS Scheme II)',
      'Critical Component List (CCL) with safety certificates for driver IC, MOSFET, enclosure plastic',
      'Trademark authorization letter and Affidavit cum Undertaking'
    ],
    relatedStandards: ['IS 16102 (Part 2):2012', 'IS 16108:2012', 'IS 15885 (Part 2/Sec 13):2012'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/16102-1',
    lastUpdated: '2023-12-01'
  },
  {
    id: 'is-16046-2',
    standardNumber: 'IS 16046 (Part 2):2018 / IEC 62133-2:2017',
    title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes — Safety Requirements for Portable Sealed Secondary Lithium Cells and Batteries',
    year: 2018,
    edition: 'Second Revision',
    status: 'Current',
    category: 'Electrical & Electronics',
    scope: 'Specifies requirements and tests for the safe operation of portable sealed secondary lithium cells and batteries containing non-acid electrolyte, under intended use and reasonably foreseeable misuse. Covers lithium-ion pouch cells, cylindrical 18650/21700 cells, battery packs for mobile phones, laptops, power banks, and portable tools.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Compulsory Registration Order for Batteries',
      ministry: 'Ministry of Electronics and Information Technology (MeitY)',
      effectiveDate: '2020-03-14',
      gazetteRef: 'MeitY S.O. 1230(E)'
    },
    scheme: 'Scheme II (CRS - Electronics)',
    keywords: ['lithium battery', 'li-ion cell', '18650', 'battery pack', 'power bank', 'thermal abuse', 'external short circuit', 'overcharge protection', 'drop test'],
    keyClauses: [
      {
        clauseNumber: 'Clause 7.2.1',
        title: 'Continuous Charging at Constant Voltage',
        pageNumber: 12,
        content: 'Fully charged cells subjected to continuous charge at manufacturer specified voltage for 7 days. Must not vent, rupture, smoke or catch fire.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7.3.1',
        title: 'External Short-Circuit Test',
        pageNumber: 15,
        content: 'Fully charged cell/battery shorted with external resistance < 100 mΩ at 55°C. Must not catch fire or explode.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7.3.4',
        title: 'Thermal Abuse (Hot Box Test)',
        pageNumber: 18,
        content: 'Cell placed in gravity convection oven heated to 130°C ± 2°C at rate of 5°C/min and kept for 30 minutes. Must not explode or catch fire.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7.3.6',
        title: 'Overcharge of Battery Pack',
        pageNumber: 21,
        content: 'Battery pack charged with power supply providing 2.0x recommended charging current. Internal protection circuit (BMS) must disconnect charging safely.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Thermal abuse oven test (130°C for 30 min)',
      'External short-circuit at 20°C and 55°C',
      'Crush and mechanical impact test',
      'Forced internal short-circuit test (for cylindrical and prismatic cells)',
      'Drop test of battery pack from 1.0 m height onto concrete'
    ],
    requiredDocuments: [
      'Cell construction datasheet and separator specification',
      'Battery Management System (BMS) schematic and dual protection circuit description',
      'Test report from NABL/BIS accredited laboratory under CRS portal'
    ],
    relatedStandards: ['IS 16046 (Part 1):2018 (Nickel systems)', 'IS 16270:2014', 'UN 38.3'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/16046-2',
    lastUpdated: '2024-05-10'
  },
  {
    id: 'is-9873-1',
    standardNumber: 'IS 9873 (Part 1):2019',
    title: 'Safety of Toys — Part 1: Safety Aspects Related to Mechanical and Physical Properties',
    year: 2019,
    edition: 'Third Revision',
    status: 'Current',
    category: 'Consumer & Toys',
    scope: 'Applies to all toys intended for use in play by children under 14 years of age. Details safety requirements for small parts (choking hazard in children under 36 months), sharp edges, points, projecting parts, cords, acoustics, folding mechanisms, and magnetic toys.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Toys (Quality Control) Order, 2020',
      ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      effectiveDate: '2021-01-01',
      gazetteRef: 'S.O. 858(E)'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['toys', 'children play', 'small parts', 'choking hazard', 'sharp edges', 'mechanical safety', 'toy qco', 'isi mark on toys'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4.3',
        title: 'Small Parts Cylinder (Choking Hazard)',
        pageNumber: 7,
        content: 'Toys for children under 36 months shall not fit entirely within the small parts test cylinder of 31.7 mm diameter and 57.1 mm truncated angle.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 4.7',
        title: 'Edges and Points',
        pageNumber: 11,
        content: 'Accessible edges, corners, and points shall not present hazard of laceration or puncture using sharp edge and sharp point testers.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5',
        title: 'Drop, Impact, Torque, and Tension Abuse Tests',
        pageNumber: 18,
        content: 'Toy subjected to drop test (5 drops from 850 mm), torque test (0.45 Nm), and tension test (70 N). Post-test, no small hazardous parts or sharp points shall detach.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Small parts test cylinder verification',
      'Sharp edge and sharp point instrumental testing',
      'Mechanical tension, torque, and compression tests',
      'Acoustic level measurement for sound-emitting toys (< 85 dBA)',
      'Heavy metal migration test as per IS 9873 (Part 3) (Lead, Cadmium, Arsenic, Mercury limits)'
    ],
    requiredDocuments: [
      'Age classification rationale and warning label artwork',
      'Scheme I manufacturing licence application via Manakonline',
      'Raw material food-grade / phthalate-free polymer test reports'
    ],
    relatedStandards: ['IS 9873 (Part 2):2017 (Flammability)', 'IS 9873 (Part 3):2020 (Migration of Certain Elements)', 'IS 15644:2006 (Electric Toys)'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/9873-1',
    lastUpdated: '2024-03-15'
  },
  {
    id: 'is-10500',
    standardNumber: 'IS 10500:2012',
    title: 'Drinking Water — Specification (Second Revision)',
    year: 2012,
    edition: 'Second Revision (Reaffirmed 2020)',
    status: 'Current',
    category: 'Food, Water & Agriculture',
    scope: 'Prescribes the quality requirements and permissible limits for drinking water intended for human consumption. Covers physical, chemical, toxic, and bacteriological parameters including pH, TDS, Turbidity, Hardness, Heavy metals (Lead, Arsenic, Chromium), and microbial contamination (E. coli, Coliforms).',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Packaged Drinking Water & Mineral Water QCO',
      ministry: 'Food Safety and Standards Authority of India (FSSAI) & Ministry of Consumer Affairs',
      effectiveDate: 'Mandatory under Food Safety Regulations & BIS Act',
      gazetteRef: 'Joint FSSAI/BIS mandatory certification mandate'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['drinking water', 'potable water', 'water quality', 'tds', 'ph', 'hardness', 'heavy metals', 'e coli', 'purified water', 'fluoride'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4',
        title: 'Organoleptic and Physical Parameters (Table 1)',
        pageNumber: 3,
        content: 'pH: 6.5 to 8.5; Turbidity: Max 1 NTU (Permissible up to 5 NTU); Total Dissolved Solids (TDS): Max 500 mg/L (Permissible up to 2000 mg/L).',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5',
        title: 'General Parameters Concerning Substances Undesirable in Excessive Amounts (Table 2)',
        pageNumber: 4,
        content: 'Total Hardness: Max 200 mg/L; Calcium: Max 75 mg/L; Magnesium: Max 30 mg/L; Chlorides: Max 250 mg/L; Sulphates: Max 200 mg/L; Nitrate: Max 45 mg/L; Fluoride: Max 1.0 mg/L (1.5 mg/L in absence of alternate source).',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 6',
        title: 'Toxic Substances and Heavy Metals (Table 3)',
        pageNumber: 5,
        content: 'Lead (Pb): Max 0.01 mg/L; Arsenic (As): Max 0.01 mg/L; Mercury (Hg): Max 0.001 mg/L; Chromium: Max 0.05 mg/L; Cadmium: Max 0.003 mg/L.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7',
        title: 'Bacteriological Quality (Table 6)',
        pageNumber: 7,
        content: 'E. coli and coliform organisms shall not be detectable in any 100 ml sample (0 organisms per 100 ml).',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Inductively Coupled Plasma Mass Spectrometry (ICP-MS) for heavy metals',
      'Gas Chromatography (GC-MS) for pesticide residue screening',
      'Membrane Filtration / Multiple Tube Fermentation for E. coli & Coliforms',
      'Spectrophotometry for Fluoride, Nitrate, and Turbidity'
    ],
    requiredDocuments: [
      'Water source hydrogeological survey report',
      'Treatment system schematic (sand filter, carbon filter, RO, UV, ozonator)',
      'In-house microbiology and chemical testing laboratory setup and lab chemist qualifications'
    ],
    relatedStandards: ['IS 14543:2024 (Packaged Drinking Water)', 'IS 13428:2005 (Packaged Natural Mineral Water)', 'IS 3025 (Methods of Sampling and Test for Water)'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/10500',
    lastUpdated: '2024-01-20'
  },
  {
    id: 'is-1786',
    standardNumber: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification',
    year: 2008,
    edition: 'Fourth Revision (Reaffirmed 2018)',
    status: 'Current',
    category: 'Civil & Structural',
    scope: 'Covers the technical requirements of deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600. Specifies chemical limits for Carbon, Sulphur, Phosphorus, yield stress, tensile strength, elongation, and bend/rebend properties.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Steel and Steel Products (Quality Control) Order, 2020',
      ministry: 'Ministry of Steel',
      effectiveDate: '2020-05-01',
      gazetteRef: 'S.O. 1673(E)'
    },
    scheme: 'Scheme I (ISI Mark)',
    keywords: ['tmt steel bars', 'rebars', 'fe 500d', 'fe 550d', 'reinforcement steel', 'tensile strength', 'yield stress', 'construction steel', 'rib pattern'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4',
        title: 'Chemical Composition Limits',
        pageNumber: 4,
        content: 'For Fe 500D: Carbon max 0.25%, Sulphur max 0.040%, Phosphorus max 0.040%, S+P combined max 0.075%.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 8',
        title: 'Mechanical Properties',
        pageNumber: 7,
        content: 'Fe 500D: 0.2% Proof Stress min 500 N/mm², Tensile strength min 565 N/mm² (TS/YS ratio >= 1.10), Total Elongation at maximum force min 5%, percentage elongation min 16%.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 9',
        title: 'Bend and Rebend Tests',
        pageNumber: 9,
        content: 'Bar bent through 180° around mandrel without crack or rupture on tension face. Rebend test after aging at 100°C for 30 minutes.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'Optical Emission Spectroscopy (OES) for C, S, P, Mn, Si content',
      'Universal Testing Machine (UTM) for Yield Stress, Ultimate Tensile Strength, and Elongation',
      'Mandrel Bend and Rebend testing',
      'Nominal mass per metre and rib area projection measurement'
    ],
    requiredDocuments: [
      'Blast furnace / Induction furnace heat logs and continuous casting details',
      'Quenching (TMT) system parameters and water pressure calibration log',
      'Roller brand marking drawings with ISI mark and grade embossed every 1.5 m'
    ],
    relatedStandards: ['IS 2062:2011 (Structural Steel)', 'IS 432:1982 (Mild Steel Bars)', 'IS 1608:2005 (Tensile Testing)'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/1786',
    lastUpdated: '2023-08-10'
  },
  {
    id: 'is-14111',
    standardNumber: 'IS 14111:2023',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking',
    year: 2023,
    edition: 'Second Revision',
    status: 'Current',
    category: 'Jewellery & Hallmarking',
    scope: 'Prescribes the standards for fineness of gold and gold alloys used in jewellery and artefacts, and specifies the official marks to be applied during hallmarking by recognized Assaying and Hallmarking Centres (AHCs). Mandates the 3 hallmarking symbols: BIS Logo, Purity & Fineness, and 6-digit alphanumeric HUID.',
    isMandatoryQCO: true,
    qcoDetails: {
      orderName: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020',
      ministry: 'Ministry of Consumer Affairs, Food & Public Distribution',
      effectiveDate: 'Mandatory in 343+ notified districts since 2021',
      gazetteRef: 'S.O. 503(E) and subsequent amendments'
    },
    scheme: 'Hallmarking',
    keywords: ['gold hallmarking', 'huid', '22k916', '18k750', 'bis hallmark', 'gold jewellery', 'assaying centre', 'fineness', 'carat'],
    keyClauses: [
      {
        clauseNumber: 'Clause 4',
        title: 'Permitted Fineness and Carat Grades',
        pageNumber: 3,
        content: 'Hallmarking is permitted in 6 standard purity grades: 24K (999 fineness), 23K (958 fineness), 22K (916 fineness), 20K (833 fineness), 18K (750 fineness), and 14K (585 fineness).',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 5',
        title: 'Hallmarking Signs (The 3 Mandatory Marks)',
        pageNumber: 5,
        content: '1. BIS Standard Mark (Triangular logo); 2. Purity in Carat and Fineness (e.g., 22K916); 3. 6-digit alphanumeric Hallmark Unique Identification (HUID) laser engraved on each article.',
        isMandatory: true
      },
      {
        clauseNumber: 'Clause 7',
        title: 'Assaying Methods (Fire Assay)',
        pageNumber: 8,
        content: 'Fineness determined by fire assay (cupellation method) as per IS 1418, which is the international referee method with accuracy of 0.5 parts per thousand.',
        isMandatory: true
      }
    ],
    testingRequirements: [
      'X-Ray Fluorescence (XRF) non-destructive initial screening',
      'Fire Assay (Cupellation) as per IS 1418 for definitive gold fineness verification',
      'Laser marking machine traceability check on the BIS Hallmarking Portal'
    ],
    requiredDocuments: [
      'Jeweller Registration Certificate from BIS (portal instant registration for MSME/jewellers)',
      'AHC Assaying competence audit records as per IS 15820',
      'Daily laser engraving logbook cross-referenced with generated HUIDs'
    ],
    relatedStandards: ['IS 1418:2009 (Assaying of Gold by Fire Assay)', 'IS 15820:2009 (Requirements for AHC)', 'IS 2112:2023 (Silver Hallmarking)'],
    sourceUrl: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/is-details/14111',
    lastUpdated: '2024-05-01'
  }
];

export const BIS_SCHEMES: BISScheme[] = [
  {
    id: 'scheme-1',
    name: 'Scheme I — Product Certification Scheme (ISI Mark)',
    code: 'Scheme I',
    type: 'Standard Mark Licence',
    description: 'The flagship BIS product certification scheme granting a licence to use the Standard Mark (ISI mark) on products conforming to relevant Indian Standards. Applicable to both mandatory QCO goods and voluntary standards.',
    applicableProducts: ['Electric geysers & appliances (IS 302)', 'Stainless steel cookware (IS 14756, IS 17526)', 'Pressure cookers (IS 2347)', 'TMT steel bars (IS 1786)', 'Packaged drinking water (IS 10500, IS 14543)', 'Cement, LPG cylinders, toys, automotive tires'],
    eligibility: 'Manufacturers with operational in-house manufacturing and testing infrastructure conforming to the Scheme of Inspection and Testing (SIT).',
    governingRegulation: 'BIS (Conformity Assessment) Regulations, 2018 — Scheme I',
    steps: [
      {
        stepNumber: 1,
        title: 'Determine Applicable Standard & Pre-requisites',
        description: 'Identify the exact Indian Standard, obtain copy of standard and SIT from Manakonline, verify whether QCO applies.',
        documentsRequired: ['Indian Standard document', 'Scheme of Inspection and Testing (SIT)'],
        timeline: '1-2 Days'
      },
      {
        stepNumber: 2,
        title: 'Establish Manufacturing & In-house Testing Facilities',
        description: 'Install required manufacturing machinery and testing instruments specified in the SIT. Ensure calibration by NABL-accredited calibration labs.',
        documentsRequired: ['List of manufacturing machinery', 'List of testing equipment with calibration records', 'Competency certificates of testing personnel'],
        timeline: '2-4 Weeks'
      },
      {
        stepNumber: 3,
        title: 'Online Application on Manakonline',
        description: 'Submit Form-I on the BIS Manakonline portal with required documents, test reports, factory layout, and application fee.',
        documentsRequired: ['Business registration / MSME Udyam', 'Factory license', 'Raw material test certificates', 'Process flow chart'],
        timeline: '2-5 Days'
      },
      {
        stepNumber: 4,
        title: 'Preliminary Factory Audit & Sample Drawing',
        description: 'BIS inspecting officer visits the factory, assesses quality management, witnesses complete testing of product, and draws samples for independent lab testing.',
        documentsRequired: ['Factory audit checklist', 'Sample dispatch note'],
        timeline: '7-15 Days'
      },
      {
        stepNumber: 5,
        title: 'Independent Testing at BIS Recognized Lab',
        description: 'Samples tested at Central / Regional / Recognized BIS laboratory. Test report uploaded directly to Manakonline.',
        documentsRequired: ['BIS Laboratory Test Report (Pass status)'],
        timeline: '15-30 Days'
      },
      {
        stepNumber: 6,
        title: 'Grant of Licence & CM/L Number',
        description: 'Upon satisfactory factory inspection and passing test report, BIS grants Certification Marks Licence (CM/L) allowing use of ISI mark.',
        documentsRequired: ['Licence document', 'Performance Bank Guarantee / Marking fee payment'],
        timeline: '3-7 Days'
      }
    ],
    feesOverview: 'Application fee: Rs. 1,000 | Audit fee: Rs. 7,000/man-day | Annual licence fee: Rs. 1,000 | Marking fee based on production volume (special 50% concession for MSMEs and Women entrepreneurs).',
    applicationPortal: 'https://www.manakonline.in',
    sourceUrl: 'https://bis.gov.in/index.php/product-certification/product-certification-scheme/'
  },
  {
    id: 'scheme-2',
    name: 'Scheme II — Compulsory Registration Scheme (CRS)',
    code: 'Scheme II',
    type: 'Self-Declaration of Conformity for IT & Electronics',
    description: 'Registration scheme for electronics and IT goods notified by MeitY, MNRE, and MoHI. Based on self-declaration of conformity supported by independent testing in BIS-recognized laboratories without mandatory pre-grant factory inspection.',
    applicableProducts: ['LED lamps and drivers (IS 16102)', 'Lithium-ion cells & batteries (IS 16046)', 'Laptops, tablets, smartphones (IS 13252)', 'Power adapters, set top boxes, smart watches', 'Solar photovoltaic modules and inverters'],
    eligibility: 'Domestic or foreign manufacturers of electronic & IT products listed in the CRO schedules.',
    governingRegulation: 'BIS (Conformity Assessment) Regulations, 2018 — Scheme II',
    steps: [
      {
        stepNumber: 1,
        title: 'Sample Testing in BIS Recognized Lab',
        description: 'Manufacturer sends sample to a BIS recognized laboratory in India for testing against the relevant safety standard.',
        documentsRequired: ['Product test sample', 'Critical Component List (CCL)', 'Schematics & User Manual'],
        timeline: '2-4 Weeks'
      },
      {
        stepNumber: 2,
        title: 'Receive Test Report',
        description: 'Lab uploads the passing test report to the CRS portal with unique test report number (valid for 90 days for registration filing).',
        documentsRequired: ['BIS Lab Test Report'],
        timeline: '2-3 Days'
      },
      {
        stepNumber: 3,
        title: 'Online Application on CRS Portal',
        description: 'Submit registration application on crsbis.in with test report, brand authorization letter, and undertaking.',
        documentsRequired: ['Trademark registration certificate', 'Authorized Indian Representative (AIR) for foreign applicants', 'Affidavit cum Undertaking'],
        timeline: '1-3 Days'
      },
      {
        stepNumber: 4,
        title: 'Scrutiny & Grant of Registration (R-Number)',
        description: 'BIS scrutinizes the application and issues Registration Number (e.g., R-XXXXXXXX) allowing the Standard Mark with IS number and R-number.',
        documentsRequired: ['Registration Certificate'],
        timeline: '10-20 Days'
      }
    ],
    feesOverview: 'Application fee: Rs. 43,000 for domestic brand / model series + lab testing fees payable directly to laboratory.',
    applicationPortal: 'https://www.crsbis.in',
    sourceUrl: 'https://bis.gov.in/index.php/product-certification/compulsory-registration-scheme/'
  },
  {
    id: 'scheme-hallmarking',
    name: 'Hallmarking Scheme for Gold & Silver Jewellery',
    code: 'Hallmarking',
    type: 'Assaying and Hallmarking Certification',
    description: 'Mandatory hallmarking scheme for gold jewellery and artefacts in notified districts of India to protect consumers against adulteration and ensure specified purity.',
    applicableProducts: ['Gold jewellery and artefacts (14K, 18K, 20K, 22K, 23K, 24K as per IS 14111)', 'Silver jewellery and artefacts (as per IS 2112)'],
    eligibility: 'Jewellers selling gold jewellery to consumers must register with BIS. Registration is free and granted online with zero fee for micro-enterprises.',
    governingRegulation: 'Bureau of Indian Standards (Hallmarking) Regulations, 2018',
    steps: [
      {
        stepNumber: 1,
        title: 'Jeweller Online Registration',
        description: 'Jeweller registers on Manakonline Hallmarking portal. Registration is automatic and instant with GSTIN/PAN.',
        documentsRequired: ['GSTIN Certificate', 'PAN card', 'Address proof of showroom/workshop'],
        timeline: 'Same Day'
      },
      {
        stepNumber: 2,
        title: 'Submission of Jewellery to BIS Recognized AHC',
        description: 'Jeweller deposits manufactured jewellery to a recognized Assaying & Hallmarking Centre with delivery challan.',
        documentsRequired: ['Hallmarking request challan with piece counts and declared purity'],
        timeline: '1 Day'
      },
      {
        stepNumber: 3,
        title: 'XRF Testing, Fire Assay & HUID Laser Inscription',
        description: 'AHC tests samples via XRF and fire assay. Each piece is laser marked with 3 marks including unique 6-digit alphanumeric HUID.',
        documentsRequired: ['AHC Test Certificate', 'HUID generation log on BIS Portal'],
        timeline: '1-2 Days'
      },
      {
        stepNumber: 4,
        title: 'Return to Jeweller & Sale to Consumer',
        description: 'Jeweller collects hallmarked items. Consumers can verify HUID using the BIS CARE mobile app before purchasing.',
        documentsRequired: ['Sale invoice showing hallmark breakdown'],
        timeline: 'Immediate'
      }
    ],
    feesOverview: 'Jeweller registration fee: Rs. 0 (Free). Hallmarking fee per gold article paid to AHC: Rs. 45 + GST. Silver article: Rs. 35 + GST.',
    applicationPortal: 'https://www.manakonline.in',
    sourceUrl: 'https://bis.gov.in/index.php/hallmarking-overview/'
  },
  {
    id: 'scheme-fmcs',
    name: 'Foreign Manufacturers Certification Scheme (FMCS)',
    code: 'FMCS',
    type: 'Overseas Manufacturer Certification',
    description: 'Scheme allowing overseas manufacturers outside India to use the standard ISI Mark on their products exported to India, ensuring they meet the same stringent standards as domestic manufacturers.',
    applicableProducts: ['All products covered under Scheme I and mandatory Quality Control Orders'],
    eligibility: 'Foreign manufacturing units outside India with complete manufacturing facilities and in-house testing.',
    governingRegulation: 'BIS (Conformity Assessment) Regulations, 2018 — Scheme I (FMCS)',
    steps: [
      {
        stepNumber: 1,
        title: 'Appoint Authorized Indian Representative (AIR)',
        description: 'Foreign applicant must nominate an AIR who is a resident of India legally responsible for compliance.',
        documentsRequired: ['Nomination letter', 'AIR Indian identity and office address proof'],
        timeline: '1 Week'
      },
      {
        stepNumber: 2,
        title: 'Application Submission to FMCD at BIS HQ',
        description: 'Submit physical and online application with full technical documentation to Foreign Manufacturers Certification Department (FMCD), New Delhi.',
        documentsRequired: ['Complete dossier', 'Quality manual', 'Test facilities details', 'AIR agreement'],
        timeline: '2-4 Weeks'
      },
      {
        stepNumber: 3,
        title: 'On-site Overseas Factory Audit',
        description: 'BIS delegation visits foreign factory to verify production lines, in-house testing, and draw independent samples.',
        documentsRequired: ['Audit travel clearance', 'Factory inspection log'],
        timeline: '4-8 Weeks'
      },
      {
        stepNumber: 4,
        title: 'Sample Testing in Indian Recognized Lab & Licence Grant',
        description: 'Drawn samples dispatched to India for testing. Upon compliance, Performance Bank Guarantee submitted and licence granted.',
        documentsRequired: ['Passing lab test report', 'USD 10,000 Performance Bank Guarantee'],
        timeline: '4-6 Weeks'
      }
    ],
    feesOverview: 'Application fee: USD 1,000 | Audit fee: Daily inspector charges + travel/stay + marking fee in foreign currency.',
    applicationPortal: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/fmcd/',
    sourceUrl: 'https://bis.gov.in/index.php/fmcs/'
  }
];

export const BIS_LABORATORIES: BISLaboratory[] = [
  {
    id: 'lab-cl-sahibabad',
    name: 'BIS Central Laboratory (CL Sahibabad)',
    type: 'Central Lab',
    state: 'Uttar Pradesh',
    city: 'Ghaziabad / Delhi NCR',
    address: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area, Ghaziabad, UP - 201010',
    contactEmail: 'cl@bis.gov.in',
    phone: '+91-120-4177100',
    nablAccreditationNo: 'TC-5120',
    validUntil: '2028-06-30',
    productCategories: ['Electrical Appliances', 'Chemicals & Plastics', 'Mechanical', 'Food & Drinking Water', 'Safety Helmets & Toys'],
    testedStandards: ['IS 302-2-21:2018', 'IS 302-1:2024', 'IS 17526:2021', 'IS 14756:2022', 'IS 2347:2017', 'IS 10500:2012', 'IS 9873-1:2019'],
    keyTests: ['High Voltage Dielectric & Leakage Current', 'Thermal Abuse and Dry Heat', 'Hydrostatic Burst Pressure Test', 'ICP-MS Heavy Metal Analysis', 'Toy Mechanical Safety Tests'],
    sourceUrl: 'https://bis.gov.in/index.php/laboratory-overview/'
  },
  {
    id: 'lab-wrol-mumbai',
    name: 'BIS Western Regional Office Laboratory (WROL)',
    type: 'Regional Lab',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: 'Manakalaya, E-9, MIDC, Behind Marol Telephone Exchange, Andheri (East), Mumbai - 400093',
    contactEmail: 'wrol@bis.gov.in',
    phone: '+91-22-28329295',
    nablAccreditationNo: 'TC-5121',
    validUntil: '2027-12-31',
    productCategories: ['Electrical & Electronics', 'Chemicals', 'Textiles', 'Consumer Products', 'Packaged Water'],
    testedStandards: ['IS 302-2-21:2018', 'IS 16102-1:2012', 'IS 10500:2012', 'IS 17526:2021', 'IS 14756:2022'],
    keyTests: ['LED Photometry & Safety', 'Stainless steel food contact migration', 'Water microbiological testing', 'Flammability & Glow wire testing'],
    sourceUrl: 'https://bis.gov.in/index.php/laboratory-overview/'
  },
  {
    id: 'lab-srol-chennai',
    name: 'BIS Southern Regional Office Laboratory (SROL)',
    type: 'Regional Lab',
    state: 'Tamil Nadu',
    city: 'Chennai',
    address: 'CIT Campus, IV Cross Road, Taramani, Chennai - 600113',
    contactEmail: 'srol@bis.gov.in',
    phone: '+91-44-22541442',
    nablAccreditationNo: 'TC-5122',
    validUntil: '2027-09-30',
    productCategories: ['Electrical Cables & Conductors', 'Pumps & Motors', 'Steel & Metals', 'Food & Water'],
    testedStandards: ['IS 1786:2008', 'IS 302-2-21:2018', 'IS 4984:2016', 'IS 10500:2012'],
    keyTests: ['Universal Tensile & Bend Testing (UTM)', 'Submersible pump energy efficiency', 'Polymer hydrostatic pressure'],
    sourceUrl: 'https://bis.gov.in/index.php/laboratory-overview/'
  },
  {
    id: 'lab-erol-kolkata',
    name: 'BIS Eastern Regional Office Laboratory (EROL)',
    type: 'Regional Lab',
    state: 'West Bengal',
    city: 'Kolkata',
    address: '1/14, C.I.T. Scheme VII M, V.I.P. Road, Kankurgachi, Kolkata - 700054',
    contactEmail: 'erol@bis.gov.in',
    phone: '+91-33-23207080',
    nablAccreditationNo: 'TC-5123',
    validUntil: '2028-03-31',
    productCategories: ['Steel & Metallurgy', 'Pressure Cookers & Cookware', 'Chemicals', 'Tea & Food'],
    testedStandards: ['IS 1786:2008', 'IS 2347:2017', 'IS 14756:2022', 'IS 10500:2012'],
    keyTests: ['Spectrometry of Steel & Alloys', 'Pressure cooker safety plug and burst tests', 'Chemical titration and purity'],
    sourceUrl: 'https://bis.gov.in/index.php/laboratory-overview/'
  },
  {
    id: 'lab-nrol-mohali',
    name: 'BIS Northern Regional Office Laboratory (NROL)',
    type: 'Regional Lab',
    state: 'Punjab',
    city: 'Mohali / Chandigarh',
    address: 'Plot No. 4-A, Sector 27-B, Madhya Marg, Chandigarh / Mohali Complex - 160019',
    contactEmail: 'nrol@bis.gov.in',
    phone: '+91-172-2650206',
    nablAccreditationNo: 'TC-5124',
    validUntil: '2028-01-31',
    productCategories: ['Agricultural Equipment', 'Electrical Appliances', 'Food Products', 'Steel Tubes'],
    testedStandards: ['IS 302-2-21:2018', 'IS 1786:2008', 'IS 10500:2012'],
    keyTests: ['Electric motor endurance', 'Water heater thermostat verification', 'Tensile and hardness testing'],
    sourceUrl: 'https://bis.gov.in/index.php/laboratory-overview/'
  },
  {
    id: 'lab-erda-vadodara',
    name: 'ERDA — Electrical Research and Development Association',
    type: 'Recognized Lab (NABL)',
    state: 'Gujarat',
    city: 'Vadodara',
    address: 'ERDA Road, GIDC, Makarpura, Vadodara, Gujarat - 390010',
    contactEmail: 'services@erda.org',
    phone: '+91-265-3043128',
    nablAccreditationNo: 'TC-5389',
    validUntil: '2027-11-15',
    productCategories: ['Electrical & Electronics', 'LED Lighting', 'Transformers', 'Switchgear', 'Solar Inverters'],
    testedStandards: ['IS 302-2-21:2018', 'IS 302-1:2024', 'IS 16102-1:2012', 'IS 16046-2:2018'],
    keyTests: ['High Voltage & Impulse Test', 'Ingress Protection (IPX4 to IP68)', 'LED Photobiological & Lumens Depreciation', 'Environmental Climatic Chamber Tests'],
    sourceUrl: 'https://www.erda.org'
  },
  {
    id: 'lab-shriram-delhi',
    name: 'Shri Ram Institute for Industrial Research (SRI)',
    type: 'Recognized Lab (NABL)',
    state: 'Delhi',
    city: 'New Delhi',
    address: '19, University Road, Delhi - 110007',
    contactEmail: 'sridlhi@srirr.org',
    phone: '+91-11-27667267',
    nablAccreditationNo: 'TC-5044',
    validUntil: '2027-08-31',
    productCategories: ['Stainless Steel & Cookware', 'Chemicals & Polymers', 'Toys', 'Food Contact Materials', 'Drinking Water'],
    testedStandards: ['IS 17526:2021', 'IS 14756:2022', 'IS 9873-1:2019', 'IS 10500:2012'],
    keyTests: ['Overall migration of plastics/silicones (IS 9845)', 'Food-grade stainless steel chemical analysis', 'Toy heavy metals (IS 9873 Part 3)', 'Gas chromatography of water pesticides'],
    sourceUrl: 'https://www.shriraminstitute.org'
  },
  {
    id: 'lab-tuv-bengaluru',
    name: 'TÜV SÜD South Asia Testing Laboratory',
    type: 'Recognized Lab (NABL)',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: 'No. A 151, 2nd C Main, Peenya 2nd Stage, Bengaluru - 560058',
    contactEmail: 'info.in@tuvsud.com',
    phone: '+91-80-67456666',
    nablAccreditationNo: 'TC-5712',
    validUntil: '2028-05-30',
    productCategories: ['Electronics & IT Goods (CRS)', 'Batteries & Cells', 'Audio/Video Equipment', 'Electrical Safety'],
    testedStandards: ['IS 16046-2:2018', 'IS 16102-1:2012', 'IS 13252-1:2010'],
    keyTests: ['Lithium-ion battery external short circuit & thermal abuse', 'EMC / EMI emission testing', 'Drop and mechanical shock tests'],
    sourceUrl: 'https://www.tuvsud.com/en-in'
  }
];

export const HALLMARKING_PURITY_TABLE = [
  { grade: '24K', fineness: '999', finenessPercent: '99.9% pure gold', standardMark: '24K999', useCase: 'Gold bullion, investment coins, special high-purity jewellery' },
  { grade: '23K', fineness: '958', finenessPercent: '95.8% pure gold', standardMark: '23K958', useCase: 'Traditional Indian jewellery crafted for heirloom value' },
  { grade: '22K', fineness: '916', finenessPercent: '91.6% pure gold', standardMark: '22K916', useCase: 'Most widely purchased gold jewellery across India' },
  { grade: '20K', fineness: '833', finenessPercent: '83.3% pure gold', standardMark: '20K833', useCase: 'Lightweight and daily wear durable jewellery' },
  { grade: '18K', fineness: '750', finenessPercent: '75.0% pure gold', standardMark: '18K750', useCase: 'Diamond studded jewellery, high durability modern designs' },
  { grade: '14K', fineness: '585', finenessPercent: '58.5% pure gold', standardMark: '14K585', useCase: 'Fashion jewellery, gemstone rings, entry-level gold' }
];
